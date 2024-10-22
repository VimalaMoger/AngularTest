import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';


//Creating SearchItem model
interface SearchItem {
  artistName: string;
  artistId: number;
  trackName: string;
}

@Injectable({ providedIn: 'root' })
export class SearchService {
  apiRoot: string = "https://itunes.apple.com/search";
  results: SearchItem[];

  constructor(private http: HttpClient) {
    this.results = [];
  }

 async search(term: string) {
    console.log("GET AS PROMISE");
    let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20`;   
    var promise = new Promise((resolve, reject) => { //inner function takes two arguments
      this.http.get<any>(apiURL)
      .subscribe((data) => {    
          if(data){ 
            resolve(data.results);
            for (let i = 0; i < data.results.length ; i++) {
              this.results[i] = { artistId : data.results[i]['artistId'], artistName : data.results[i]['artistName'],
              trackName : data.results[i]['trackName']};  
            }  
          }
          else
            reject('error');
      })
    });  
   const res = await promise.then(   //promise chaining
    (res) => {
      console.log(this.results);
      console.log(res);
    },       
    (err) => console.error(err)
  ).catch((err) => console.error(err)); 
  } 
} 

export class SearchComponent{
  loading: boolean = false;

 constructor(
   public itunes: SearchService,
   private route: ActivatedRoute,
   private router: Router
 ) {
   this.route.params.subscribe(params => {
     console.log(params);
     if (params["term"]) {
       this.doSearch(params["term"]);
     }
   });
 }

 doSearch(term: string) {
   this.loading = true;
   this.itunes.search(term).then(_ => (this.loading = false));
 }

 onSearch(term: string) {
   this.router.navigate(["search", { term: term }]);
 }
}

const routes:Routes = [
	{path: '', redirectTo: 'home', pathMatch: 'full'},
	{path: 'find', redirectTo: 'search'}, 
	{path: 'search/:term', component: SearchComponent},
  {path: 'search', component: SearchComponent}
];

@Component({
  selector: 'app-http-i-tunes-api',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './http-i-tunes-api.component.html',
  styleUrl: './http-i-tunes-api.component.css'
})
export class HttpITunesApiComponent {

}

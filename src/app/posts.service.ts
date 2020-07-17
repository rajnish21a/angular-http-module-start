import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({ providedIn: "root" })
export class PostService {

  constructor(private http:HttpClient){}

  createAndStore(title: string, content: string) {
    const postData: Post = {title:title,content:content};
    this.http
    .post<{name:Post}>(
      'https://ng-deep-dive.firebaseio.com/posts.json',
      postData
    )
    .subscribe(responseData => {
      console.log(responseData);
    });

  }


  fetchPost(){
    let searchQuery = new HttpParams();
    searchQuery = searchQuery.append('print','pretty');
    searchQuery = searchQuery.append('custom','key');
    return this.http.get<{[s:string]: Post}>('https://ng-deep-dive.firebaseio.com/posts.json',{
      headers: new HttpHeaders({
        'custom-query':'hello'
      }),
      //params: new HttpParams().set('print','pretty');
      params: searchQuery
    })
    .pipe(map((responseData)=>{
      const postArray = [];
      for(let key in responseData){
        if(responseData.hasOwnProperty(key)){
          postArray.push({...responseData[key],id:key});
        }
      }
      return postArray;
    }
    ),
    catchError(errorRes=>{
      return throwError(errorRes);
    }))
  }


  clearPosts(){
    return this.http.delete<any>('https://ng-deep-dive.firebaseio.com/posts.json');
  }
}

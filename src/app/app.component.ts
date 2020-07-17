import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostService } from './posts.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts:Post[] = [];
  isFetching = false;
  error = null;

  constructor(private http: HttpClient, private _postsService: PostService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this._postsService.createAndStore(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
    this._postsService.clearPosts().subscribe(()=>{
      this.loadedPosts = [];
    },error=>{
      this.isFetching = false;
      this.error=error;
    });
  }

  fetchPosts() {
    this.isFetching = true;
    // Send Http request
    this._postsService.fetchPost().subscribe(
    (responseData:Post[])=>{
      this.isFetching = false;
      console.log(responseData);
      this.loadedPosts = responseData;
    },error=>{
      this.isFetching = false;
      this.error=error;
    });
  }

  onErrorHandle(){
    this.error=null;
  }

}

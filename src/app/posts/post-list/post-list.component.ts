import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../post.service';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  // posts = [
  //   {titles: 'First post', content: 'this is first post content'},
  //   {titles: 'second post', content: 'this is second post content'},
  //   {titles: 'third post', content: 'this is third post content'},
  // ]

  // @Input()
  posts: Post[] = [];
  private postSub: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit(): void {
    this.posts = this.postsService.getPosts();
    this.postSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}

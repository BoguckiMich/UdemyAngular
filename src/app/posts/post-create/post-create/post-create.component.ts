import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Post } from '../../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  private mode = 'create';
  private postId: string;
  post: Post;
  isLoading = false;
  // @Output ()
  // postCreated = new EventEmitter<Post>(); //potrzebne do wyemitowania property do innego component

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // const post:Post= {
    // title: form.value.title, to tylko w przypadku emittowania
    // content: form.value.content}
    // this.postCreated.emit(post)//tym emitujemy to property
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
    }
    form.resetForm();
  }
  // onAddPost(two way binding version){
  //   const post:Post= {
  //     title: this.enteredTitle,
  //     content:this.enteredContent}
  //   this.postCreated.emit(post)//tym emitujemy to property
  // }
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getSinglePost(this.postId).subscribe((postData) => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
          };
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
}

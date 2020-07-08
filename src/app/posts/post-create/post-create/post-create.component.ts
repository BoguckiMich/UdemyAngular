import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Post } from '../../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../../post.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';
  // @Output ()
  // postCreated = new EventEmitter<Post>(); //potrzebne do wyemitowania property do innego component

  constructor(public postsSerivce: PostsService) {}

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // const post:Post= {
    // title: form.value.title, to tylko w przypadku emittowania
    // content: form.value.content}
    // this.postCreated.emit(post)//tym emitujemy to property
    this.postsSerivce.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
  // onAddPost(two way binding version){
  //   const post:Post= {
  //     title: this.enteredTitle,
  //     content:this.enteredContent}
  //   this.postCreated.emit(post)//tym emitujemy to property
  // }
}

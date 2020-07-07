import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Post } from "../../post.model"
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  @Output ()
  postCreated = new EventEmitter<Post>(); //potrzebne do wyemitowania property do innego component


  onAddPost(form: NgForm){
    if (form.invalid){
      return;
    }
    const post:Post= {
      title: form.value.title,
      content: form.value.content}
    this.postCreated.emit(post)//tym emitujemy to property
  }
  // onAddPost(two way binding version){
  //   const post:Post= {
  //     title: this.enteredTitle,
  //     content:this.enteredContent}
  //   this.postCreated.emit(post)//tym emitujemy to property
  // }

  constructor() { }

  ngOnInit(): void {
  }

}

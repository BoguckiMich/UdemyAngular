import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Post } from '../../post.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { mimeType } from './mime-type.validator';

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
  form: FormGroup;
  imagePreview: string;
  // @Output ()
  // postCreated = new EventEmitter<Post>(); //potrzebne do wyemitowania property do innego component

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    // const post:Post= {
    // title: form.value.title, to tylko w przypadku emittowania
    // content: form.value.content}
    // this.postCreated.emit(post)//tym emitujemy to property
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(this.form.value.title, this.form.value.content);
    } else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content
      );
    }
    this.form.reset();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  // onAddPost(two way binding version){
  //   const post:Post= {
  //     title: this.enteredTitle,
  //     content:this.enteredContent}
  //   this.postCreated.emit(post)//tym emitujemy to property
  // }
  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
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
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
          });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
}

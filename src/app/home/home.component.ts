import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ContractService } from '../contract.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todoList: string[] = [];
  isLoadingResults = true;
  isWannaEdit = -1;
  todoForm!: FormGroup;
  editForm!: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    // private contract: ContractService
  ) { }

  ngOnInit(): void {
    this.api.getTodoList()
      .subscribe((res: any) => {
        this.todoList = res;
        console.log("on init: " + this.todoList);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    this.todoForm = this.formBuilder.group({
      'todo' : [null, Validators.required]
    });
    this.editForm = this.formBuilder.group({
      'todo' : [null, Validators.required]
    });
  }

  onFormSubmit(): void {
    this.isLoadingResults = true;
    console.log("new todo: " + JSON.stringify(this.todoForm.value));
    this.api.addTodo(this.todoForm.value.todo)
      .subscribe((res: any) => {
          this.todoList.push(this.todoForm.value.todo);
          window.alert("on pending tx: " + res);
          this.isLoadingResults = false;
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

  wannaEdit(index: number): void {
    this.isWannaEdit = index;
  }

  onEditSubmit(): void {
    this.isLoadingResults = true;
    console.log("edit todo: " + JSON.stringify(this.editForm.value));
    this.api.updateTodo(this.isWannaEdit, this.editForm.value.todo)
      .subscribe((res: any) => {
          this.todoList[this.isWannaEdit] = this.editForm.value.todo;
          window.alert("on pending tx: " + res);
          this.isLoadingResults = false;
          this.isWannaEdit = -1;
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
          this.isWannaEdit = -1;
        });
  }

  onDeleteSubmit(index: number): void {
    this.isLoadingResults = true;
    this.api.deleteTodo(index)
      .subscribe((res: any) => {
          this.todoList.splice(index, 1);
          window.alert("on pending tx: " + res);
          this.isLoadingResults = false;
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}

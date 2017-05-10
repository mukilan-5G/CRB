import { Component } from "@angular/core";
import { NavController, AlertController } from 'ionic-angular';
import { Todos } from '../../providers/todos';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  todos: any;
 
  constructor(public navCtrl: NavController, public todoService: Todos, public alertCtrl: AlertController) {
 
  }
 
  ionViewDidLoad(){
 
    this.todoService.getTodos().then((data) => {
      this.todos = data;
    });
 
  }
 
  createTodo(){
 
    let prompt = this.alertCtrl.create({
      title: 'Add',
      message: 'Please add a conference room?',
      inputs: [
        {
          name: 'name',
          placeholder: 'Conference Room Name'
        },
        {
          name: 'image',
          placeholder: 'Please upload an image of the Conference Room?',
          type: 'file'
        },        
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.todoService.createTodo({name: data.name, image: data.image, is_booked: 0});
          }
        }
      ]
    });
 
    prompt.present();
 
  }
 
  updateTodo(todo){
 
    let prompt = this.alertCtrl.create({
      title: todo.name,
      message: 'Book the room',
      inputs: [
        {
          name: 'start_time',
          placeholder: 'choose start time',
          type: 'time'
        },
        {
          name: 'end_time',
          placeholder: 'choose end time',
          type: 'time'
        },
        {
          name: 'reason',
          type: 'text'
        },               
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.todoService.updateTodo({
              _id: todo._id,
              _rev: todo._rev,
              name: todo.name,
              is_booked: 1,
              start_time: data.start_time,
              end_time: data.end_time,
              reason: data.reason
            });
          }
        }
      ]
    });
 
    prompt.present();
  }
 
  deleteTodo(todo){
    this.todoService.deleteTodo(todo);
  }
 
}
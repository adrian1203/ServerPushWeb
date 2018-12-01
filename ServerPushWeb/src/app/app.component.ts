import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Person } from './app.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ServerPushWeb';
  person :Person;
  people : Person [];

  constructor(public appService: AppService) { }

  ngOnInit() {
    this.appService
  }

  simpleGet(){
    this.person= new Person();
    this.appService.simpleGet().subscribe((res=>{
      this.person=res;
    }))
  }

  getPerson(){
    this.people=new Array<Person>();
    this.appService.getPeople().subscribe((res=>{
      this.people=res;
    }))
    //this.people.push(new Person('fff', 66));

  }

  postPerson(){
    let personPost = new Person('Name', 13);
    this.appService.postPerson(personPost)
  }

}


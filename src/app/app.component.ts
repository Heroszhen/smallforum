import { Component,OnInit } from '@angular/core';
import { MyservicesService } from './myservices.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'smallforum';
  isconnected:boolean;
  
  constructor(private ms : MyservicesService){
	this.isconnected = false;
  }
  
  ngOnInit(){
	
  }
  

}

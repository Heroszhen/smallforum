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
	this.ms.checkConnection();
	this.isconnected = this.ms.isconnected$.getValue()[0];
  }
  
  ngOnInit(){
	this.ms.isconnected$.subscribe((data)=>{
		this.isconnected = data[0];
	});
  }
  
  logout(){
	this.ms.deleteCookie("user");
	this.ms.isconnected$.next([false]);
  }

}

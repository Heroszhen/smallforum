import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MyservicesService } from '../../myservices.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	userid;
	isconnected:boolean = false;
  constructor(private acrouter:ActivatedRoute,private ms:MyservicesService,private router:Router) { 
	if(this.ms.isconnected$.getValue()[0] == true)this.isconnected = true;
	this.acrouter.params.subscribe(params => {
		this.userid = params["id"];alert(this.userid);
		//this.getThesubject(this.subjectid);
    });
    
  }

  ngOnInit() {
	this.ms.isconnected$.subscribe((data)=>{
		this.isconnected = data[0];
	});
  }

}

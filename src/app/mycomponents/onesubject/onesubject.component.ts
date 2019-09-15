import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MyservicesService } from '../../myservices.service';


@Component({
  selector: 'app-onesubject',
  templateUrl: './onesubject.component.html',
  styleUrls: ['./onesubject.component.css']
})
export class OnesubjectComponent implements OnInit {
	subjectid:any;
	isconnected;
	thesubject:any = "";
	allresponses;
	createresponse = {
		"userid":"",
		"name":"",
		"subjectid":"",
		"content":""
	};
  constructor(private acrouter:ActivatedRoute,private ms:MyservicesService) { 
	this.acrouter.params.subscribe(params => {
		this.subjectid = params["id"];
		this.getThesubject(this.subjectid);
    });
    if(this.ms.isconnected$.getValue()[0] == true)this.isconnected = true;
  }

  ngOnInit() {
  }
	
	getThesubject(id){
		this.ms.getQuery("getonesubject/"+id).subscribe((data)=>{
			if(data != null && Object.keys(data).length != 0){
				if(data["response"]=="done"){
					this.thesubject = data["data"];
					this.allresponses = data["data2"];
				}
			}
		});
	}
	
	onSubmit(){
		var user = JSON.parse(this.ms.getCookie("user"));
		this.createresponse.userid = user._id;
		this.createresponse.name = user.name;
		this.createresponse.subjectid = this.subjectid;
		this.ms.postQuery("addoneresponse",this.createresponse).subscribe((data)=>{
			if(data != null && Object.keys(data).length != 0){
				if(data["response"] == "done"){console.log(data);
					this.createresponse.content = '';
					this.allresponses = data["data"];
				}
			}
		});
	}
}

import { Component, OnInit , ViewChild ,ElementRef } from '@angular/core';
import { MyservicesService } from '../../myservices.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
	isconnected = false;
	showhelps = true;
	@ViewChild('mybtn1',{static: true})mybtn1:ElementRef;
	@ViewChild('mybtn2',{static: true})mybtn2:ElementRef;
	showsubjects = true;
	allsubjects:any;
	createsubject = {
		"user":"",
		"name":"",
		"titile":"",
		"content":"",
		"created":"",
	};
  constructor(private ms:MyservicesService) { 
	if(this.ms.isconnected$.getValue()[0] == true)this.isconnected = true;
	this.getAllSubjects();
  }

  ngOnInit() {
	this.ms.isconnected$.subscribe((data)=>{
		this.isconnected = data[0];
	});
  }

	displayhelps(){
		//console.log(this.mybtn1.nativeElement.textContent);
		if(this.showhelps == true){
			this.showhelps = false;
			this.mybtn1.nativeElement.textContent = '+';
		}else{
			this.showhelps = true;
			this.mybtn1.nativeElement.textContent = '-';
		}
	}
	
	displaysubjecthelps(){
		if(this.showsubjects == true){
			this.showsubjects = false;
			this.mybtn2.nativeElement.textContent = '+';
		}else{
			this.showsubjects = true;
			this.mybtn2.nativeElement.textContent = '-';
		}
	}
	
	getAllSubjects(){
		this.ms.getQuery("getallsubjects").subscribe((data)=>{
			if(data != null && Object.keys(data).length != 0){
				if(data["response"]=="done"){
					this.allsubjects = data["data"];
				}
			}
		});
	}
	
	onSubmit(){
		var user = JSON.parse(this.ms.getCookie("user"));
		this.createsubject.user = user.email;
		this.createsubject.name = user.name;
		var d = new Date();
		var month = d.getMonth() + 1;
		var tody = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+" "+d.getDate()+"/"+month+"/"+d.getFullYear();
		alert(tody);
		this.createsubject.titile = '';
		this.createsubject.content = '';
	}
}

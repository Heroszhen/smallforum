import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { MyservicesService } from '../../myservices.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	noform;
	id;
	loginform = {
		"email":"",
		"pwd":"",
	};
	logupform = {
		"name":"",
		"email":"",
		"pwd":"",
	};
	msgalert1 = "<div></div>";
	msgalert2 = "<div></div>";
  constructor(private ms:MyservicesService,private acroute : ActivatedRoute,private router:Router) { 
	if(this.ms.isconnected$.getValue()[0] == true)this.router.navigate(['/']);
	this.acroute.params.subscribe((params)=>{
		if(params.id == 0|| params.id == 1 || params.id == 2){
			this.id = params.id;
			
		}
		if(params.id == undefined)this.id = 0;
	});
	this.msgalert1 = "<div></div>";
	this.msgalert2 = "<div></div>";
  }

  ngOnInit() {
	
  }

	changeid(id){
		this.id = id;
		this.msgalert1 = "<div></div>";
		this.msgalert2 = "<div></div>";
	}
	
	onSubmit1(){
		this.ms.postQuery("login",this.loginform).subscribe((data)=>{
			if(data != null && Object.keys(data).length != 0){
				if(data["response"] == "done"){
					var user = data["data"];
					this.ms.setCookie("user",user);
					this.ms.checkConnection();
					this.router.navigate(['/']);
				}
				else this.msgalert2 = "<div class='alert alert-danger'>Erreur</div>";
			}
		});
	}
	
	onSubmit2(){
		this.ms.postQuery("logup",this.logupform).subscribe((data)=>{
			if(data != null && Object.keys(data).length != 0){
				if(data["response"] == "done")this.msgalert2 = "<div class='alert alert-success'>Votre inscription a été faite avec succès</div>";
				else this.msgalert2 = "<div class='alert alert-danger'>Mail existant</div>";
			}
		});
	}
}

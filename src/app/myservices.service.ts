import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyservicesService {
	urldb = "http://localhost:3333/";
	isconnected$ = new BehaviorSubject([false]);
  constructor(private http:HttpClient) { }
  
  //mongodb
  postQuery(url,query:any){
	return this.http.post(this.urldb+''+url,query);
  }
  
  getQuery(url){
	return this.http.get(this.urldb+''+url);
  }
  
  checkConnection(){
	if(this.getCookie("user") != "no")this.isconnected$.next([true]);
	else this.isconnected$.next([false]);
  }
  
	//cookies
	setCookie(name,valuejson){console.log(valuejson);
		document.cookie = name+"="+JSON.stringify(valuejson);  
		//JSON.stringify(valuejson)
    }
    
    getCookie(name){
		var myarray = document.cookie.split("; ");
		for(var i =0; i<myarray.length;i++){
		  var courantarray = myarray[i].split('=');
		  if(courantarray[0] == name){
			return courantarray[1];
		  }
		}
		return "no";
    }
    
    deleteCookie(name){
      document.cookie = name+'=;max-age=-99';
    }
}

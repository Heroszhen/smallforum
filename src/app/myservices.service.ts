import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyservicesService {
	urldb = "http://localhost:3333/";
  constructor(private http:HttpClient) { }
  
  //mongodb
  postQuery(url,query:any){
	return this.http.post(this.urldb+''+url,query);
  }
}

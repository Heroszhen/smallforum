import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MyservicesService } from './myservices.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './mycomponents/home/home.component';
import { SubjectsComponent } from './mycomponents/subjects/subjects.component';
import { OnesubjectComponent } from './mycomponents/onesubject/onesubject.component';
import { ProfileComponent } from './mycomponents/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SubjectsComponent,
    OnesubjectComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [MyservicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

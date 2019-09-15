import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './mycomponents/home/home.component';
import { SubjectsComponent } from './mycomponents/subjects/subjects.component';
import { OnesubjectComponent } from './mycomponents/onesubject/onesubject.component';
import { ProfileComponent } from './mycomponents/profile/profile.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'home/:id', component: HomeComponent },
	{ path: 'subjects', component: SubjectsComponent },
	{ path: 'onesubject/:id', component: OnesubjectComponent },
	{ path: 'profile/:id', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

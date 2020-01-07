import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WAPageHomeComponent } from '../components/pages/home/wa-page-home.component';


const routes: Routes = [
	{path: '', component: WAPageHomeComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class UFMWebAppRoutingModule { }
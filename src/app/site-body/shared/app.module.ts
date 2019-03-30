import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AdPlaceholderComponent } from './ad-placeholder/ad.placeholder';
import { AppLoaderComponent } from './site-loader/app.loader';
import { PostCardComponent } from './post-card/post.card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from '../../app-routing.module';
import { MaterialModule } from '../shared/mat.module';
import { TimeSincePipe } from '../../pipes/time.since.pipe';


@NgModule({
	declarations: [
		AdPlaceholderComponent,
		AppLoaderComponent,
		PostCardComponent,
		TimeSincePipe
	],
	imports: [
		BrowserModule,
		MatProgressSpinnerModule,
		AppRoutingModule,
		MaterialModule
	],
	providers: [

	],
	exports: [
		AdPlaceholderComponent,
		AppLoaderComponent,
		PostCardComponent,
		TimeSincePipe
	]
})

export class SharedModule { }
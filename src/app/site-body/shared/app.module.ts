import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AdPlaceholderComponent } from './ad-placeholder/ad.placeholder';
import { AppLoaderComponent } from './site-loader/app.loader';
import { PostCardComponent } from './post-card/post.card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from '../../app-routing.module';
import { MaterialModule } from '../shared/mat.module';
import { TimeSincePipe } from '../../pipes/time.since.pipe';
import { MultiStringPipe } from '../../pipes/mutistring.pipe';
import { ObjectKeysPipeModule } from '../../pipes/object-keys/app.module';
import { ClubInfoPipe } from '../../pipes/club-info.pipe';
import { TeamInfoPipe } from '../../pipes/team-info.pipe';
import { FutCardPlayerImagePipe } from '../../pipes/fut-card-player-image.pipe';


@NgModule({
	declarations: [
		AdPlaceholderComponent,
		AppLoaderComponent,
		PostCardComponent,
		TimeSincePipe,
		MultiStringPipe,
		ClubInfoPipe,
		TeamInfoPipe,
		FutCardPlayerImagePipe
	],
	imports: [
		BrowserModule,
		MatProgressSpinnerModule,
		AppRoutingModule,
		MaterialModule,
		ObjectKeysPipeModule
	],
	providers: [

	],
	exports: [
		AdPlaceholderComponent,
		AppLoaderComponent,
		PostCardComponent,
		TimeSincePipe,
		MultiStringPipe,
		ClubInfoPipe,
		TeamInfoPipe,
		FutCardPlayerImagePipe
	]
})

export class SharedModule { }
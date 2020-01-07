// Angular Modules
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Service
import { WAImageLoaderDirective } from './image-loader.directive';

@NgModule({
    imports: [HttpClientModule],
    declarations: [WAImageLoaderDirective],
    exports: [WAImageLoaderDirective]
})
export class WAImageLoaderDirectiveModule { }
import { CollideModule } from './collide/collide.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RaytracerComponent } from './raytracer/raytracer.component';

@NgModule({
  declarations: [
    AppComponent,
    RaytracerComponent
  ],
  imports: [
    BrowserModule,
    CollideModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

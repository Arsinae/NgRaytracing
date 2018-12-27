import { CollideModule } from './collide/collide.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RoledenComponentModule } from 'roleden-component';

import { AppComponent } from './app.component';
import { RaytracerComponent } from './raytracer/raytracer.component';
import { ObjectManagementComponent } from './object-management/object-management.component';

@NgModule({
  declarations: [
    AppComponent,
    RaytracerComponent,
    ObjectManagementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CollideModule,
    RoledenComponentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

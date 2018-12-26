import { ConeService } from './cone.service';
import { CylinderService } from './cylinder.service';
import { SphereService } from './sphere.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SphereService,
    CylinderService,
    ConeService
  ],
  declarations: []
})
export class CollideModule { }

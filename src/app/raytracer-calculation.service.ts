import { FormClass, Ray } from './raytracer/dataClass';
import { HyperboleService } from './collide/hyperbole.service';
import { ConeService } from './collide/cone.service';
import { Injectable } from '@angular/core';

import { SphereService } from './collide/sphere.service';
import { CylinderService } from './collide/cylinder.service';
import { ColorCalculationService } from './color-calculation.service';

@Injectable({
  providedIn: 'root'
})
export class RaytracerCalculationService {

  constructor(private color: ColorCalculationService) { }

  // Search if there is a collision between a ray and one object depending his type
  // Return the collision data (vector distance & object collided)
  searchCollision(collide, object, cameraPos, lineVector) {
    let pointObj: Number;
    if (object.type === 'sphere') {
      pointObj = SphereService.collide(object, cameraPos, lineVector);
    } else if (object.type === 'cylinder') {
      pointObj = CylinderService.collide(object, cameraPos, lineVector);
    } else if (object.type === 'cone') {
      pointObj = ConeService.collide(object, cameraPos, lineVector);
    } else if (object.type === 'hyperbole') {
      pointObj = HyperboleService.collide(object, cameraPos, lineVector);
    }
    if (pointObj !== -1) {
      collide = (collide.t === -1 || (collide.t !== -1 && pointObj < collide.t)) ? {t: pointObj, object: object} : collide;
    }
    return collide;
  }

  // Search for 1 pixel on 4 if there is an intersection between an object and the vector camera/pixel
  // The camera is set in {0, 0, -600} and the plane start at (-300, -200, 0)
  printImage(ctx, objectList: Array<FormClass>, light) {
    const step = 1;
    const camera = new Ray();
    camera.pos = {x: 0, y: 0, z: -600};
    const imageData = ctx.getImageData(0, 0, 600, 400);
    for (let y = -200; y < 200; y += step) {
      for (let x = -300; x < 300; x += step) {
        camera.ray = {x: x, y: y, z: 600};
        let collide: {t: number, object: FormClass} = {t: -1, object: new FormClass()};
        for (const object of objectList) {
          collide = this.searchCollision(collide, object, camera.pos, camera.ray);
        }
        if (collide.t !== -1) {
          this.color.calculatePixelColor(imageData, collide, light, camera, {x : x, y: y});
        }
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }
}

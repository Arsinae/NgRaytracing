import { Injectable } from '@angular/core';
import { ColorCalculationService } from '../color/color-calculation.service';
import { FormClass, Ray } from './dataClass';

@Injectable({
  providedIn: 'root'
})
export class RaytracerCalculationService {

  constructor(private color: ColorCalculationService) { }

  // Search if there is a collision between a ray and one object depending his type
  // Return the collision data (vector distance & object collided)
  searchCollision(collide, object: FormClass, cameraPos, lineVector) {
    const pointObj: Number = object.collide(cameraPos, lineVector);
    if (pointObj !== -1) {
      collide = (collide.t === -1 || (collide.t !== -1 && pointObj < collide.t)) ? {t: pointObj, object: object} : collide;
    }
    return collide;
  }

  // Search for 1 pixel on 4 if there is an intersection between an object and the vector camera/pixel
  // The camera is set in {0, 0, -600} and the plane start at (-300, -200, 0)
  printImage(ctx, objectList: Array<FormClass>, light) {
    const step = 1;
    const aliasing = 8;
    const camera = new Ray();
    camera.pos = {x: 0, y: 0, z: -600};
    const imageData = ctx.getImageData(0, 0, 600, 400);
    for (let y = -200; y < 200; y += step) {
      for (let x = -300; x < 300; x += step) {
        const color = [];
        const index = (y + 200) * 600 * 4 + (x + 300) * 4;
        for (let i = 0; i < aliasing * aliasing; i++) {
          camera.ray = {
            x: x * aliasing + i % aliasing,
            y: y * aliasing + i / aliasing,
            z: 600
          };
          let collide: {t: number, object: FormClass} = {t: -1, object: new FormClass()};
          for (const object of objectList) {
            collide = this.searchCollision(collide, object, camera.pos, camera.ray);
          }
          if (collide.t >= 1) {
            color.push(this.color.calculatePixelColor(collide, light, camera, objectList));
          }
        }
        this.color.applyColor(imageData, index, color);
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }
}

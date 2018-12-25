import { CollideModule } from './collide/collide.module';
import { Injectable } from '@angular/core';
import { SphereService } from './collide/sphere.service';

@Injectable({
  providedIn: 'root'
})
export class RaytracerCalculationService {

  constructor() { }

  // Search for 1 pixel on 4 if there is an intersection between an object and the vector camera/pixel
  // The camera is set in {0, 0, -600} and the plane start at (-300, -200, 0)
  printImage(ctx, objectList) {
    const step = 2;
    ctx.fillStyle = 'black';
    ctx.rect(0, 0, 600, 400);
    ctx.fill();
    ctx.beginPath();
    const cameraPos = {x: 0, y: 0, z: -600};
    for (let y = -200; y < 200; y += step) {
      for (let x = -300; x < 300; x += step) {
        const lineVector = {x: x, y: y, z: 600};
        let inter = -1;
        for (const object of objectList) {
          if (object.type === 'sphere') {
            const pointObj = SphereService.collide(object, cameraPos, lineVector);
            if (pointObj !== -1) {
              inter = (inter === -1) ? pointObj : Math.min(pointObj, inter);
            }
          }
        }
        if (inter !== -1) {
          ctx.fillStyle = 'red';
          ctx.rect(x + 300, y + 200, step, step);
          ctx.fill();
        }
      }
    }
  }
}

import { CollideModule } from './collide.module';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: CollideModule
})
export class SphereService {

  static sphereDelta(a, b, c, delta) {
    const t1 = (-b + Math.sqrt(delta)) / (2 * a);
    const t2 = (-b - Math.sqrt(delta)) / (2 * a);
    if (t1 < 0 && t2 < 0) {
      return (-1);
    } else if (t1 < t2 && t1 >= 0) {
      return t1;
    } else {
      return t2;
    }
  }

  static collide(object, camera, vector) {
    const a = Math.pow(vector.x, 2) + Math.pow(vector.y, 2) + Math.pow(vector.z, 2);
    const b = 2 * (vector.x * (camera.x - object.pos.x) + vector.y * (camera.y - object.pos.y) + vector.z * (camera.z - object.pos.z));
    const c = Math.pow(object.pos.x, 2) + Math.pow(object.pos.y, 2) + Math.pow(object.pos.z, 2)
    + Math.pow(camera.x, 2) + Math.pow(camera.y, 2) + Math.pow(camera.z, 2)
    - 2 * (object.pos.x * camera.x + object.pos.y * camera.y + object.pos.z * camera.z) - Math.pow(object.r, 2);
    const delta = Math.pow(b, 2) - 4 * a * c;
    if (delta < 0) {
      return -1;
    } else {
      return SphereService.sphereDelta(a, b, c, delta);
    }
  }

  constructor() { }
}

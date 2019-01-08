import { Injectable } from '@angular/core';
import { Ray } from './../raytracer/dataClass';

@Injectable({
  providedIn: 'root'
})
export class CylinderService {

  static cylinderDelta(a, b, c, delta) {
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
    const a = Math.pow(vector.x, 2) + Math.pow(vector.z, 2);
    const b = 2 * (vector.x * (camera.x - object.pos.x) + vector.z * (camera.z - object.pos.z));
    const c = Math.pow(object.pos.x, 2) + Math.pow(object.pos.z, 2)
    + Math.pow(camera.x, 2) + Math.pow(camera.z, 2)
    - 2 * (object.pos.x * camera.x + object.pos.z * camera.z) - Math.pow(object.r, 2);
    const delta = Math.pow(b, 2) - 4 * a * c;
    if (delta < 0) {
      return -1;
    } else {
      const t = CylinderService.cylinderDelta(a, b, c, delta);
      const intersectionY = camera.y + vector.y * t;
      return (intersectionY <= object.size + object.pos.y && intersectionY >= object.pos.y) ? t : -1;
    }
  }

  static normal(object, impact) {
    const normal = new Ray();
    normal.pos = object.pos;
    normal.ray.x = impact.x - normal.pos.x;
    normal.ray.y = 0;
    normal.ray.z = impact.z - normal.pos.z;
    return (normal);
  }

  constructor() { }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConeService {

  static coneDelta(a, b, c, delta) {
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
    const tan = Math.pow(object.r, 2) / Math.pow(object.size, 2);
    const a = Math.pow(vector.x, 2) + Math.pow(vector.z, 2) - Math.pow(vector.y, 2) * tan;
    const b = 2 * (vector.x * (camera.x - object.pos.x) + vector.z * (camera.z - object.pos.z)
    - vector.y * (camera.y - object.pos.y) * tan);
    const c = Math.pow(camera.x - object.pos.x, 2) + Math.pow(camera.z - object.pos.z, 2)
    - (Math.pow(camera.y - object.pos.y, 2) * tan);
    const delta = Math.pow(b, 2) - 4 * a * c;
    if (delta < 0) {
      return -1;
    } else {
      const t = ConeService.coneDelta(a, b, c, delta);
      const intersectionY = camera.y + vector.y * t;
      return (intersectionY <= object.size + object.pos.y && intersectionY >= object.pos.y) ? t : -1;
    }
  }

  constructor() { }
}

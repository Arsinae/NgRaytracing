import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HyperboleService {

  static hyperboleDelta(a, b, c, delta) {
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
    const r = Math.pow(object.r, 2);
    const angle = Math.pow(object.center, 2);
    const a = Math.pow(vector.x, 2) / angle + Math.pow(vector.z, 2) / angle - Math.pow(vector.y, 2) / r;
    const b = 2 * (vector.x * (camera.x - object.pos.x) / angle + vector.z * (camera.z - object.pos.z) / angle
    - vector.y * (camera.y - object.pos.y) / r);
    const c = Math.pow(camera.x - object.pos.x, 2) / angle + Math.pow(camera.z - object.pos.z, 2) / angle
    - (Math.pow(camera.y - object.pos.y, 2) / r + 1);
    const delta = Math.pow(b, 2) - 4 * a * c;
    if (delta < 0) {
      return -1;
    } else {
      const t = HyperboleService.hyperboleDelta(a, b, c, delta);
      const intersectionY = camera.y + vector.y * t;
      return (intersectionY <= object.pos.y + (object.size / 2) && intersectionY >= object.pos.y - (object.size / 2)) ? t : -1;
    }
  }

  constructor() { }
}

import { FormClass, Ray } from './../raytracer/dataClass';

export class Hyperbole extends FormClass {

  public type = 'hyperbole';

  constructor() {
    super();
  }

  private delta(a, b, c, delta) {
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

  collide(camera, vector) {
    const r = Math.pow(this.r, 2);
    const angle = Math.pow(this.center, 2);
    const a = Math.pow(vector.x, 2) / angle + Math.pow(vector.z, 2) / angle - Math.pow(vector.y, 2) / r;
    const b = 2 * (vector.x * (camera.x - this.pos.x) / angle + vector.z * (camera.z - this.pos.z) / angle
    - vector.y * (camera.y - this.pos.y) / r);
    const c = Math.pow(camera.x - this.pos.x, 2) / angle + Math.pow(camera.z - this.pos.z, 2) / angle
    - (Math.pow(camera.y - this.pos.y, 2) / r + 1);
    const delta = Math.pow(b, 2) - 4 * a * c;
    if (delta < 0) {
      return -1;
    } else {
      const t = this.delta(a, b, c, delta);
      const intersectionY = camera.y + vector.y * t;
      return intersectionY <= this.pos.y + (this.size / 2) && intersectionY >= this.pos.y - (this.size / 2) ? t : -1;
    }
  }

  normal(impact) {
    const normal = new Ray();
    normal.pos = this.pos;
    normal.ray.x = (impact.x - normal.pos.x) / Math.pow(this.center, 2);
    normal.ray.y = (impact.y - normal.pos.y) / Math.pow(this.r, 2);
    normal.ray.z = (impact.z - normal.pos.z) / Math.pow(this.center, 2);
    return (normal);
  }

}

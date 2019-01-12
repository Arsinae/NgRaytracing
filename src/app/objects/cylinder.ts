import { FormClass, Ray } from './../raytracer/dataClass';

export class Cylinder extends FormClass {

  public type = 'cylinder';

  constructor() {
    super();
  }

  private delta(a, b, c, delta) {
    const t1 = (-b + Math.sqrt(delta)) / (2 * a);
    const t2 = (-b - Math.sqrt(delta)) / (2 * a);
    if (t1 < 1 && t2 < 1) {
      return (-1);
    } else if (t1 < t2 && t1 >= 1) {
      return t1;
    } else {
      return t2;
    }
  }

  collide(camera, vector) {
    const a = Math.pow(vector.x, 2) + Math.pow(vector.z, 2);
    const b = 2 * (vector.x * (camera.x - this.pos.x) + vector.z * (camera.z - this.pos.z));
    const c = Math.pow(this.pos.x, 2) + Math.pow(this.pos.z, 2)
    + Math.pow(camera.x, 2) + Math.pow(camera.z, 2)
    - 2 * (this.pos.x * camera.x + this.pos.z * camera.z) - Math.pow(this.r, 2);
    const delta = Math.pow(b, 2) - 4 * a * c;
    if (delta < 0) {
      return -1;
    } else {
      const t = this.delta(a, b, c, delta);
      const intersectionY = camera.y + vector.y * t;
      return (intersectionY <= this.size + this.pos.y && intersectionY >= this.pos.y) ? t : -1;
    }
  }

  normal(impact) {
    const normal = new Ray();
    normal.pos = this.pos;
    normal.ray.x = impact.x - normal.pos.x;
    normal.ray.y = 0;
    normal.ray.z = impact.z - normal.pos.z;
    return (normal);
  }
}

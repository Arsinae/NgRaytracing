import { FormClass, Ray } from './../raytracer/dataClass';

export class Sphere extends FormClass {

  public type = 'sphere';

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
    const a = Math.pow(vector.x, 2) + Math.pow(vector.y, 2) + Math.pow(vector.z, 2);
    const b = 2 * (vector.x * (camera.x - this.pos.x) + vector.y * (camera.y - this.pos.y) + vector.z * (camera.z - this.pos.z));
    const c = Math.pow(this.pos.x, 2) + Math.pow(this.pos.y, 2) + Math.pow(this.pos.z, 2)
    + Math.pow(camera.x, 2) + Math.pow(camera.y, 2) + Math.pow(camera.z, 2)
    - 2 * (this.pos.x * camera.x + this.pos.y * camera.y + this.pos.z * camera.z) - Math.pow(this.r, 2);
    const delta = Math.pow(b, 2) - 4 * a * c;
    if (delta < 0) {
      return -1;
    } else {
      return this.delta(a, b, c, delta);
    }
  }

  normal(impact) {
    const normal = new Ray();
    normal.pos = this.pos;
    normal.ray.x = impact.x - normal.pos.x;
    normal.ray.y = impact.y - normal.pos.y;
    normal.ray.z = impact.z - normal.pos.z;
    return normal;
  }
}

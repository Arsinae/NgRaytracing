import { FormClass, Ray, Position } from './../raytracer/dataClass';

export class Plane extends FormClass {

  public type = 'plane';
  public vector = new Position();

  constructor() {
    super();
    this.vector.y = 1;
    this.vector.z = 1;
  }

  collide(camera, vector) {
    const tmp = (this.vector.x * vector.x) + (this.vector.y * vector.y) + (this.vector.z * vector.z);
    if (tmp === 0) {
      return -1;
    }
    let t = this.pos.x * this.vector.x + this.pos.y * this.vector.y + this.pos.z * this.vector.z
    - camera.x * this.vector.x - camera.y * this.vector.y - camera.z * this.vector.z;
    t = t / tmp;
    return (t <= 0) ? -1 : t;
  }

  normal(impact) {
    const normal = new Ray();
    normal.pos = this.pos;
    normal.ray.x = -this.pos.x;
    normal.ray.y = -this.pos.y;
    normal.ray.z = -this.pos.z;
    return normal;
  }

}

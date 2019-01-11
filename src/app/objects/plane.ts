import { FormClass, Ray, Position } from './../raytracer/dataClass';

export class Plane extends FormClass {

  public type = 'plane';
  public vector = new Position();

  constructor() {
    super();
  }

  collide(camera, vector) {
    let t = -((this.pos.x * (camera.x - this.vector.x)) + (this.pos.y * (camera.y - this.vector.y))
    + (this.pos.z * (camera.z - this.vector.z)) + this.center);
    const tmp = (camera.x * vector.x) + (camera.y * vector.y) + (camera.z * vector.y);
    if (tmp === 0) {
      return -1;
    }
    t = t / tmp;
    return (t <= 0) ? -1 : t;
  }

  normal(impact) {
    const normal = new Ray();
    normal.pos = this.pos;
    normal.ray.x = this.pos.x;
    normal.ray.y = this.pos.y;
    normal.ray.z = this.pos.z;
    return normal;
  }

}

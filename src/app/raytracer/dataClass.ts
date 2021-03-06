export class Position {
  public x = 0;
  public y = 0;
  public z = 600;

  constructor() {
  }
}

class Color {
  public r = 0;
  public g = 0;
  public b = 255;
  public a = 1;
}

export class FormClass {

  public type = 'sphere'; // Can be sphere, cylinder, cone, hyperbole
  public pos = new Position(); // Position of the object; {0, 0, 0} is the center
  public r = 500; // Radius of the object
  public size = 500; // Size of the object
  public center = 250; // Size of the center for the Hyperbole
  public color = new Color();

  constructor() {
  }

  collide(camera, vector) {
    return -1;
  }

  normal(impact) {
    return new Ray();
  }

  copy(object: FormClass) {
    this.pos = object.pos;
    this.r = object.r;
    this.size = object.size;
    this.center = object.center;
    this.color = object.color;
  }
}

export class Light {

  public pos = new Position();

  constructor() {
    this.pos.z = 0;
  }
}

export class Ray {

  public pos = new Position();
  public ray = new Position();
}

export class LightRay {

  public ray = new Position();
  public impact = new Position();
}

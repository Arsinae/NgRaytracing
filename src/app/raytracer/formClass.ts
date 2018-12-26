class Position {
  public x = 0;
  public y = 0;
  public z = 0;

  constructor() {
  }
}

class Color {
  public r = 255;
  public g = 0;
  public b = 0;
  public a = 0;
}

export class FormClass {

  public type = 'sphere'; // Can be sphere, cylinder, cone, hyperbole
  public pos = new Position(); // Position of the object; {0, 0, 0} is the center
  public r = 50; // Radius of the object
  public size = 100; // Size of the object
  public center = 25; // Size of the center for the Hyperbole
  public color = new Color();

  constructor() {
  }
}

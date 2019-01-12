import { HslService } from './../color/hsl.service';
import { FormClass, Light } from './../raytracer/dataClass';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShadowService {

  constructor(private colorConverter: HslService) { }

  checkShadow(objectList: Array<FormClass>, ref: FormClass, light: Light, impact) {
    const t = -1;
    const ray = {x: impact.x - light.pos.x, y: impact.y - light.pos.y, z: impact.z - light.pos.z};
    for (const object of objectList) {
      if (object !== ref) {
        const collide = object.collide(light.pos, ray);
        if (collide !== -1 && collide < 1) {
          return collide;
        }
      }
    }
    return t;
  }

  calculateShadowColor(color) {
    const hsl = this.colorConverter.rgbToHsl(color);
    hsl.l = 0.1;
    const newColor = this.colorConverter.hslToRgb(hsl);
    return newColor;
  }
}

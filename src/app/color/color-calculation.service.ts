import { Injectable } from '@angular/core';
import { Ray, Light, LightRay, FormClass } from '../raytracer/dataClass';
import { HslService } from './hsl.service';
import { ShadowService } from './../shadow/shadow.service';

@Injectable({
  providedIn: 'root'
})
export class ColorCalculationService {

  constructor(private colorConverter: HslService, private shadow: ShadowService) { }

  private getLightRay(light: Light, collide, camera: Ray) {
    const ray = new LightRay();
    ray.impact.x = camera.pos.x + camera.ray.x * collide.t;
    ray.impact.y = camera.pos.y + camera.ray.y * collide.t;
    ray.impact.z = camera.pos.z + camera.ray.z * collide.t;
    ray.ray.x = light.pos.x - ray.impact.x;
    ray.ray.y = light.pos.y - ray.impact.y;
    ray.ray.z = light.pos.z - ray.impact.z;
    return ray;
  }

  private getNormal(lightray, object: FormClass) {
    return object.normal(lightray.impact);
  }

  private  calculateDistance(ray) {
    const dist = ray.x * ray.x + ray.y * ray.y + ray.z * ray.z;
    return dist;
  }

  private calculateCos(lightray, normal) {
    let cos = (lightray.x * normal.x) + (lightray.y * normal.y) + (lightray.z * normal.z);
    cos /= (Math.sqrt(this.calculateDistance(lightray) * this.calculateDistance(normal)));
    return cos;
  }

  private calculateColor(color, cos, t) {
    const hsl = this.colorConverter.rgbToHsl(color);
    const angleFactor = (cos + 1) / 2;
    const distFactor = Math.max(t - 1, 1);
    hsl.l = Math.min(Math.max(hsl.l * angleFactor / distFactor, hsl.l / 3), 1);
    const rgb = this.colorConverter.hslToRgb(hsl);
    /* const newColor = {
      r: color.r * cos,
      g: color.g * cos,
      b: color.b * cos,
    }; */
    return rgb;
  }

  private calculatePlanCheck(object, camera: Ray, t: number, cos) {
    const x = camera.pos.x + camera.ray.x * t + 5000;
    const y = camera.pos.y + camera.ray.y * t + 5000;
    if ((x % object.size * 2 < object.size && y % object.size * 2 < object.size)
    || (x % object.size * 2 >= object.size && y % object.size * 2 >= object.size)) {
      return this.calculateColor(object.color, cos, t);
    } else {
      return ({r: 0, g: 0, b: 0});
    }
  }

  calculatePixelColor(collide: {t: number, object: FormClass}, light, camera: Ray, objectList) {
    const lightRay = this.getLightRay(light, collide, camera);
    const shadow = this.shadow.checkShadow(objectList, collide.object, light, lightRay.impact);
    const normal = this.getNormal(lightRay, collide.object); // calculate normal
    const cos = this.calculateCos(lightRay.ray, normal.ray); // calculate cosinus
    const color = (collide.object.type === 'plane') ? this.calculatePlanCheck(collide.object, camera, collide.t, cos)
    : this.calculateColor(collide.object.color, cos, collide.t); // calculate luminosity
    return (shadow === -1) ? color : this.shadow.calculateShadowColor(color);
  }

  applyColor(imageData, index, colorArr) {
    const newColor = {r: 0, g: 0, b: 0};
    for (const color of colorArr) {
      newColor.r += color.r;
      newColor.g += color.g;
      newColor.b += color.b;
    }
    newColor.r /= colorArr.length;
    newColor.g /= colorArr.length;
    newColor.b /= colorArr.length;
    imageData.data[index] = newColor.r > 255 ? 255 : newColor.r;
    imageData.data[index + 1] = newColor.g > 255 ? 255 : newColor.g;
    imageData.data[index + 2] = newColor.b > 255 ? 255 : newColor.b;
  }
}

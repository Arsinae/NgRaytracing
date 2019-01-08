import { Injectable } from '@angular/core';
import { SphereService } from './collide/sphere.service';
import { CylinderService } from './collide/cylinder.service';
import { ConeService } from './collide/cone.service';
import { HyperboleService } from './collide/hyperbole.service';
import { Ray, Light, LightRay, FormClass } from './raytracer/dataClass';

@Injectable({
  providedIn: 'root'
})
export class ColorCalculationService {

  constructor() { }

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

  private getNormal(lightray, object) {
    if (object.type === 'sphere') {
     return SphereService.normal(object, lightray.impact);
    } else if (object.type === 'cylinder') {
      return CylinderService.normal(object, lightray.impact);
    } else if (object.type === 'cone') {
      return ConeService.normal(object, lightray.impact);
    } else if (object.type === 'hyperbole') {
      return HyperboleService.normal(object, lightray.impact);
    }
    return new LightRay();
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

  calculatePixelColor(imageData, collide: {t: number, object: FormClass}, light, camera: Ray, pixel) {
    const lightRay = this.getLightRay(light, collide, camera);
    const normal = this.getNormal(lightRay, collide.object); // calculate normal
    const cos = this.calculateCos(lightRay.ray, normal.ray); // calculate cosinus
    // calculate luminosity
    const index = (pixel.y + 200) * 600 * 4 + (pixel.x + 300) * 4;
    console.log(cos);
    const color = {
      r: collide.object.color.r * cos,
      g: collide.object.color.g * cos,
      b: collide.object.color.b * cos,
    };
    imageData.data[index] = color.r > 255 ? 255 : color.r;
    imageData.data[index + 1] = color.g > 255 ? 255 : color.g;
    imageData.data[index + 2] = color.b > 255 ? 255 : color.b;
  }
}

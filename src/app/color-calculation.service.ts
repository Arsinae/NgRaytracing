import { Ray, Light, LightRay, FormClass } from './raytracer/dataClass';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorCalculationService {

  constructor() { }

  private getLightRay(light: Light, collide: {t: number, object: FormClass}, camera: Ray) {
    const ray = new LightRay();
    ray.impact.x = camera.pos.x + camera.ray.x * collide.t;
    ray.impact.y = camera.pos.y + camera.ray.y * collide.t;
    ray.impact.z = camera.pos.z + camera.ray.z * collide.t;
    ray.ray.x = light.pos.x - ray.impact.x;
    ray.ray.y = light.pos.y - ray.impact.y;
    ray.ray.z = light.pos.z - ray.impact.z;
    return ray;
  }

  calculatePixelColor(imageData, collide, light, camera: Ray, pixel) {
    const lightRay = this.getLightRay(light, collide, camera);
    const index = (pixel.y + 200) * 600 * 4 + (pixel.x + 300) * 4;
    imageData.data[index] = collide.object.color.r;
    imageData.data[index + 1] = collide.object.color.g;
    imageData.data[index + 2] = collide.object.color.b;
  }
}

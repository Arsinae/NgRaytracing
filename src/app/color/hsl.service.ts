import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HslService {

  constructor() { }

  calcSaturation(minValue, maxValue, luminance) {
    if (luminance < 50) {
      return Math.round((maxValue - minValue) / (maxValue + minValue) * 100);
    } else {
      return Math.round((maxValue - minValue) / (2 - maxValue - minValue) * 100);
    }
  }

  calcHue(ratio, minValue, maxValue) {
    if (ratio.r === maxValue) {
      return Math.round((ratio.g - ratio.b) / (maxValue - minValue) * 60);
    } else if (ratio.g === maxValue) {
      return Math.round((2 + (ratio.b - ratio.r) / (maxValue - minValue)) * 60);
    } else {
      return Math.round((4 + (ratio.r - ratio.g) / (maxValue - minValue)) * 60);
    }
}

  rgbToHsl(color) {
    const ratio = {r: color.r / 255, g: color.g / 255, b: color.b / 255};
    const minValue = Math.min(ratio.r, ratio.g, ratio.b);
    const maxValue = Math.max(ratio.r, ratio.g, ratio.b);
    const luminance = Math.round((minValue + maxValue) / 2 * 100);
    let saturation = 0;
    let hue = 0;
    if (minValue !== maxValue) {
      saturation = this.calcSaturation(minValue, maxValue, luminance);
      hue = this.calcHue(ratio, minValue, maxValue);
    }
    return {h: hue, s: saturation / 100, l: luminance / 100};
  }

  hslToRgb(color) {
    const c = (1 - Math.abs(2 * color.l - 1)) * color.s;
    const x = c * (1 - Math.abs((color.h / 60) % 2 - 1));
    const m = color.l - c / 2;
    let prime = {r: 0, g: 0, b: 0};
    if (color.h < 60 || color.h === 360) {
      prime = {r: c, g: x, b: 0};
    } else if (color.h < 120) {
      prime = {r: x, g: c, b: 0};
    } else if (color.h < 180) {
      prime = {r: 0, g: c, b: x};
    } else if (color.h < 240) {
      prime = {r: 0, g: x, b: c};
    } else if (color.h < 300) {
      prime = {r: x, g: 0, b: c};
    } else  {
      prime = {r: c, g: 0, b: x};
    }
    return {r: Math.round((prime.r + m) * 255),
      g: Math.round((prime.g + m) * 255),
      b: Math.round((prime.b + m) * 255)
    };
}
}

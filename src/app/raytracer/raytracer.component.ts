import { FormClass, Light } from './dataClass';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RaytracerCalculationService } from '../raytracer-calculation.service';

@Component({
  selector: 'app-raytracer',
  templateUrl: './raytracer.component.html',
  styleUrls: ['./raytracer.component.scss']
})
export class RaytracerComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvas;

  objectList: Array<FormClass> = [
    {type: 'sphere', pos: {x: 0, y: 0, z: 200}, r: 20, center: 20, size: 3, color: {r: 255, g: 0, b: 0, a: 0}},
    {type: 'cylinder', pos: {x: 300, y: -50, z: 150}, r: 50, center: 20, size: 102, color: {r: 0, g: 0, b: 255, a: 0}}
  ];

  light = new Light();

  constructor(private raytracer: RaytracerCalculationService) { }

  ngOnInit() {
    this.canvas.nativeElement.width = 600;
    this.canvas.nativeElement.height = 400;
    this.resetScreen();
  }

  async ngAfterViewInit() {
    this.renderData();
  }

  resetScreen() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.rect(0, 0, 600, 400);
    ctx.fill();
  }

  renderData() {
    this.resetScreen();
    const promise = new Promise((resolve, reject) => {
      const ctx = this.canvas.nativeElement.getContext('2d');
      setTimeout(() => {
        resolve();
        this.raytracer.printImage(ctx, this.objectList, this.light);
      }, 0);
    });
    promise.then(() => {
    });
  }

}

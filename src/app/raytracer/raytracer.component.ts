import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RaytracerCalculationService } from './raytracer-calculation.service';
import { Sphere } from './../objects/sphere';
import { FormClass, Light } from './dataClass';
import {AlertService } from 'roleden-component';

@Component({
  selector: 'app-raytracer',
  templateUrl: './raytracer.component.html',
  styleUrls: ['./raytracer.component.scss']
})
export class RaytracerComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvas;

  objectList: Array<FormClass> = [
    new Sphere()
  ];

  light = new Light();

  constructor(private raytracer: RaytracerCalculationService, private alertService: AlertService) { }

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

  downloadImage() {
    console.log('download');
    this.canvas.nativeElement.toBlob((blob) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'raytracing.png';
      document.body.appendChild(a);
      a.click();
    });
  }

}

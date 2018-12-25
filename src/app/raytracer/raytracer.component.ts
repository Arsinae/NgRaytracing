import { Component, OnInit, ViewChild } from '@angular/core';
import { RaytracerCalculationService } from '../raytracer-calculation.service';

@Component({
  selector: 'app-raytracer',
  templateUrl: './raytracer.component.html',
  styleUrls: ['./raytracer.component.scss']
})
export class RaytracerComponent implements OnInit {

  @ViewChild('canvas') canvas;

  objectList = [{type: 'sphere', pos: {x: 0, y: 0, z: 200}, r: 20}, {type: 'sphere', pos: {x: 300, y: -50, z: 150}, r: 50}];

  constructor(private raytracer: RaytracerCalculationService) { }

  ngOnInit() {
    this.canvas.nativeElement.width = 600;
    this.canvas.nativeElement.height = 400;
    const ctx = this.canvas.nativeElement.getContext('2d');
    this.raytracer.printImage(ctx, this.objectList);
  }

}

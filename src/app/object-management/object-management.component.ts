import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormClass, Light } from '../raytracer/dataClass';
import { Sphere } from '../objects/sphere';
import { Hyperbole } from './../objects/hyperbole';
import { Cone } from './../objects/cone';
import { Cylinder } from '../objects/cylinder';
import { Plane } from '../objects/plane';

@Component({
  selector: 'app-object-management',
  templateUrl: './object-management.component.html',
  styleUrls: ['./object-management.component.scss']
})
export class ObjectManagementComponent implements OnInit {

  @Input() objectList: Array<FormClass> = [];
  @Input() light: Light = new Light();

  @Output() objectListChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() LightChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  changeType(newType, index) {
    let newObj: FormClass;
    if (newType === 'sphere') {
      newObj = new Sphere();
    } else if (newType === 'cylinder') {
      newObj = new Cylinder();
    } else if (newType === 'cone') {
      newObj = new Cone();
    } else if (newType === 'hyperbole') {
      newObj = new Hyperbole();
    } else if (newType === 'plane') {
      newObj = new Plane();
    }
    newObj.copy(this.objectList[index]);
    this.objectList[index] = newObj;
  }

  deleteObject(index) {
    this.objectList.splice(index, 1);
    this.objectListChange.emit(this.objectList);
  }

  addObject() {
    this.objectList.push(new Sphere());
    this.objectListChange.emit(this.objectList);
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormClass } from './../raytracer/formClass';

@Component({
  selector: 'app-object-management',
  templateUrl: './object-management.component.html',
  styleUrls: ['./object-management.component.scss']
})
export class ObjectManagementComponent implements OnInit {

  @Input() objectList: Array<FormClass> = [];

  @Output() objectListChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  deleteObject(index) {
    this.objectList.splice(index, 1);
    this.objectListChange.emit(this.objectList);
  }

  addObject() {
    this.objectList.push(new FormClass());
    this.objectListChange.emit(this.objectList);
  }

}

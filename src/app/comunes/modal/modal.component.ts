import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() texto: string;
  @Input() parametro: any;
  @Output() action: EventEmitter<any> = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  setAction(action) {
    if (this.parametro) {
      this.action.emit({action: action, parametro: this.parametro});
    } else {
      this.action.emit({action: action});
    }
  }

}

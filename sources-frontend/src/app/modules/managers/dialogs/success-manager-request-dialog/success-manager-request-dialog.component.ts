import {Component} from '@angular/core';
import {DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-success-manager-request-dialog',
  templateUrl: './success-manager-request-dialog.component.html',
  styleUrls: ['./success-manager-request-dialog.component.css']
})
export class SuccessManagerRequestDialogComponent {


  constructor(
    public ref: DynamicDialogRef,
  ) {

  }

  onClose() {
    this.ref.close();
  }
}

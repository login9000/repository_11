import {Component, Input} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {FormArray} from "@angular/forms";
import {NonStandardElement, NonStandardElementFile, OrderDetails} from "../../models/OrderDetails";
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {PROJECT_URL} from "../../../../core/constants/api-url";

@Component({
  selector: 'app-non-standard-element-viewer',
  templateUrl: './non-standard-element-viewer.component.html',
  styleUrls: ['./non-standard-element-viewer.component.css']
})
export class NonStandardElementViewerComponent {

  @Input() nonStandardElements?: NonStandardElement[]
  @Input() nonStandardElementFiles?: NonStandardElementFile[] | undefined

  constructor(
    public dialogConfig: DynamicDialogConfig,
    public orderService: OrderService
  ) {
    if (!!this.dialogConfig.data?.nonStandardElements) {
      this.nonStandardElements = this.dialogConfig.data.nonStandardElements;
    }
    if (!!this.dialogConfig.data?.nonStandardElementFiles) {
      this.nonStandardElementFiles = this.dialogConfig.data.nonStandardElementFiles;
    }
  }

  get nonStandardElementsFromForm() {
    return this.orderService.nonStandardElementsForm.get('nonStandardElements') as FormArray;
  }

  get nonStandardElementPhotos() {
    return this.orderService.nonStandardElementsForm.get('nonStandardElementPhotos') as FormArray;
  }

  openFileInNewTab(photo: NonStandardElementFile) {
    const url = PROJECT_URL+photo.link;
    window.open(url, '_blank');
  }
}

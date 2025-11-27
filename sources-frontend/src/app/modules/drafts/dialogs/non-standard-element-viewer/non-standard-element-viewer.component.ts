import { Component, Input } from '@angular/core';
import { DraftService } from "../../draft.service";
import { FormArray, FormGroup } from "@angular/forms";
import { NonStandardElement, NonStandardElementFile, OrderDetails } from "../../../orders/models/OrderDetails";
import { DynamicDialogConfig } from "primeng/dynamicdialog";
import { PROJECT_URL } from "../../../../core/constants/api-url";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    public draftService: DraftService
  ) {
    if (!!this.dialogConfig.data?.nonStandardElements) {
      this.nonStandardElements = this.dialogConfig.data.nonStandardElements;
    }
    if (!!this.dialogConfig.data?.nonStandardElementFiles) {
      this.nonStandardElementFiles = this.dialogConfig.data.nonStandardElementFiles;
    }
  }

  get nonStandardElementsFromForm() {
    return this.draftService.nonStandardElementsForm.get('nonStandardElements') as FormArray;
  }

  get nonStandardElementPhotos() {
    return this.draftService.nonStandardElementsForm.get('nonStandardElementPhotos') as FormArray;
  }

  openFileInNewTab(photo: NonStandardElementFile) {
    const url = PROJECT_URL + photo.link;
    window.open(url, '_blank');
  }
}

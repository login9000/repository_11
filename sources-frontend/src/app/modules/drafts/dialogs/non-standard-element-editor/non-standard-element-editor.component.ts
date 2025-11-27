import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { AppService } from "../../../../app.service";
import { DraftService } from "../../draft.service";
import { Message, MessageService } from "primeng/api";
import { ErrorTranslator } from "../../../../core/error-handle/ErrorTranslator";
import { concatMap, forkJoin, Observable } from "rxjs";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { API_URL, PROJECT_URL } from "../../../../core/constants/api-url";

export interface NonStandardElement {
  id?: string
  description: string
  quantity: number
}

export interface NonStandardElementPhoto {
  link?: string
  file_name?: string
}

@Component({
  selector: 'app-non-standard-element-editor',
  templateUrl: './non-standard-element-editor.component.html',
  styleUrls: ['./non-standard-element-editor.component.css'],
  providers: [MessageService]
})
export class NonStandardElementEditorComponent implements OnInit {
  selectedFile: File | undefined;
  messages: Message[] | undefined;
  errorMessages: Message[] | undefined;
  @Input() elements: NonStandardElement[] = [];
  @Input() photos: NonStandardElementPhoto[] = [];
  @Input() draftId: string | undefined;

  constructor(
    public dialogConfig: DynamicDialogConfig,
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public appService: AppService,
    public draftService: DraftService,
    private messageService: MessageService) {

    if (!!this.dialogConfig.data?.nonStandardElements) {
      this.elements = this.dialogConfig.data.nonStandardElements;
    }
    if (!!this.dialogConfig.data?.nonStandardElementFiles) {
      this.photos = this.dialogConfig.data.nonStandardElementFiles;
    }
    if (!!this.dialogConfig.data?.draftId) {
      this.draftId = this.dialogConfig.data.draftId;
    }
  }

  ngOnInit() {
    if (this.draftService.nonStandardElementsForm.get('nonStandardElements').value.length == 0) {
      this.addNonStandardElement('', null);
    }
  }

  get nonStandardElements() {
    return this.draftService.nonStandardElementsForm.get('nonStandardElements') as FormArray;
  }

  get nonStandardElementPhotos() {
    return this.draftService.nonStandardElementsForm.get('nonStandardElementPhotos') as FormArray;
  }

  addNonStandardElement(description?: string, quantity?: number) {
    this.nonStandardElements.push(
      this.fb.group({
        description: [description || '', Validators.required],
        quantity: [quantity || '', Validators.compose([Validators.required, Validators.min(1)])],
      })
    );
  }

  addNonStandardElementPhoto(link?: string, file_name?: string) {
    this.nonStandardElementPhotos.push(
      this.fb.group({
        link: [link],
        file_name: [file_name],
      })
    );
  }

  removePhoto(i: number, event: any) {
    event.stopPropagation();
    this.draftService.deletePhotoFromNonStandardAddition(this.nonStandardElementPhotos.controls[i].value['link'], this.draftId)
      .subscribe({
        next: (v) => {
          this.nonStandardElementPhotos.removeAt(i);
        },
        error: (error) => {
          this.messages = [{
            severity: 'error',
            summary: 'Ошибка',
            detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
          }]
        }
      })
  }

  addToOrder() {
    if (this.nonStandardElements.length > 0 || this.nonStandardElementPhotos.length > 0) {
      this.draftService.showRequestedWindow = true;
    }
    this.ref.close(true)
  }

  onFileSelected(event: any) {
    const inputElement = event.target;
    if (inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
      this.draftService.uploadPhotoForNonStandardAddition(this.selectedFile).subscribe({
        next: (v) => {
          const link: string = v.response
          const file_name = link.split('/').pop();
          this.addNonStandardElementPhoto(link, file_name)
        },
        error: (error) => {
          this.errorMessages = [{
            severity: 'error',
            summary: 'Ошибка',
            detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
          }]
        }
      })
    }
  }

  clearForm() {
    const observables: Observable<any>[] = [];
    if (this.nonStandardElementPhotos.controls.length > 0) {
      for (let i = 0; i < this.nonStandardElementPhotos.controls.length; i++) {
        const control = this.nonStandardElementPhotos.controls[i];
        let observable = this.draftService.deletePhotoFromNonStandardAddition(control.value['link']);
        observables.push(observable);
      }
      forkJoin(observables)
        .pipe(
          concatMap(() => {
            this.nonStandardElements.clear();
            this.nonStandardElementPhotos.clear();
            this.draftService.nonStandardElementsForm.reset();
            return [];
          })
        )
        .subscribe({
          next: (v) => {
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
            });
          }
        })
    } else {
      this.nonStandardElements.clear();
      this.nonStandardElementPhotos.clear();
      this.draftService.nonStandardElementsForm.reset();
    }
  }

  removeNonStandardElement(i: number) {
    this.nonStandardElements.removeAt(i);
  }

  saveChanges() {
    this.draftService.saveNonStandardElementsChanges({
      draft_id: this.draftId,
      goods_non_standard_addition: this.nonStandardElements.value,
      files_non_standard_addition: this.nonStandardElementPhotos.value
    }).subscribe({
      next: (v) => {
        this.ref.close(true)
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
        });
      }
    })
  }

  openFileInNewTab(i: number) {
    const url = PROJECT_URL + this.nonStandardElementPhotos.controls[i].value['link'];
    window.open(url, '_blank');
  }
}

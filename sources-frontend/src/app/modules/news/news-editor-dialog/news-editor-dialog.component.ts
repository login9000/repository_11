import {Component, OnInit} from '@angular/core';
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NewsService} from "../services/news.service";
import {Message} from "primeng/api";
import {ErrorTranslator} from "../../../core/error-handle/ErrorTranslator";

@Component({
  selector: 'app-news-editor-dialog',
  templateUrl: './news-editor-dialog.component.html',
  styleUrls: ['./news-editor-dialog.component.css']
})
export class NewsEditorDialogComponent implements OnInit {

  newsForm: FormGroup
  messages:  Message[] | undefined

  constructor(
    public ref: DynamicDialogRef,
    private newsService: NewsService
  ) {
  }

  ngOnInit(): void {
    this.initForm()
  }


  onClose() {
    this.ref.close(this.newsForm.value);
  }

  private initForm() {
    this.newsForm = new FormGroup({
      header: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required),
    })
  }

  save() {
    this.newsService.addNews(this.newsForm.value.header, this.escapeNewlines(this.newsForm.value.text))
      .subscribe({
        next: (v) => {
          this.ref.close(v)
        },
        error: (error) => {
          this.messages = [
            { severity: 'error', summary: 'Ошибка', detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000 },
          ];
        }
      })
  }

  private escapeNewlines(input: string): string {
    // Заменяем каждый символ новой строки на экранированный вариант
    const escapedString = input.replace(/\n/g, '\\n');
    return escapedString;
  }


}

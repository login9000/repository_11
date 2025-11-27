import { Injectable } from '@angular/core';
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() {
  }

  downloadFile(url: string, fileName: string, messageService: MessageService) {
    fetch(url)
      .then(responce => responce.status === 200 ? responce.blob() : Promise.reject('SOMETHING_WENT_WRONG'))
      .then(blob => {
		var rnd = String(Math.random()).replace('.', '');
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.style.display = 'none';
        a.href = url+'?'+rnd;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => messageService.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Попробуйте еще раз'
      }));
  }
}

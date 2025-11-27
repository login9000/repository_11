import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() {
  }

  downloadFile(url: string, fileName: string) { 
    var rnd = String(Math.random()).replace('.', '');
    const link = document.createElement('a'); 
    link.href = url+'?'+rnd;
    link.target = '_blank'; 
    link.download = fileName; 
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

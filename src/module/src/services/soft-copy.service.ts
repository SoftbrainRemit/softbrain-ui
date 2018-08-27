import { Injectable } from '@angular/core';

@Injectable()
export class SoftCopyService {

  constructor() { }

  public copy(data: any) {
    if (data) {
      const ta: HTMLTextAreaElement = document.createElement('textarea');
      ta.style.fontSize = '12pt';
      ta.style.border = '0';
      ta.style.padding = '0';
      ta.style.margin = '0';
      ta.style.position = 'absolute';
      const yPosition = window.pageYOffset || document.documentElement.scrollTop;
      ta.style.top = yPosition + 'px';
      ta.style.left = '-9999px';
      ta.setAttribute('readonly', '');
      document.body.appendChild(ta);
      ta.value = data;
      ta.select();
      ta.setSelectionRange(0, ta.value.length);
      document.execCommand('copy');
      ta.blur();
      window.getSelection().removeAllRanges();
      document.body.removeChild(ta);
    }
  }

}

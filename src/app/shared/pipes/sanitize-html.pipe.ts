import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizationService } from '@angular/platform-browser';


@Pipe({
  name: 'appSanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizationService) {}

   transform(v: string) {
      return this.sanitizer.bypassSecurityTrustHtml(v);
   }

}

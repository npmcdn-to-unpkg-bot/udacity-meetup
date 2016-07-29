import { Component, OnInit, Input, HostListener, ViewChild, ElementRef, Renderer } from '@angular/core';
import { SELECT_DIRECTIVES } from '../../forks/ng2-select/select';
import { DATEPICKER_DIRECTIVES } from 'ng2-bootstrap';
import * as moment from 'moment';
import { MapsAPILoader } from 'angular2-google-maps/core';

declare var google: any;

@Component({
  moduleId: module.id,
  selector: 'app-input',
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.css'],
  directives: [SELECT_DIRECTIVES, DATEPICKER_DIRECTIVES]
})
export class InputComponent implements OnInit {
  @Input() tabIndex:number;
  @Input() type:string;
  @Input() name:string;
  @Input() data;
  @ViewChild('inputElement') inputElement;
  @ViewChild('selectElement') selectElement;
  
  public inputLength: number = 0;
  public inputFocused: boolean = false;
  public inputId: string;
  public dateModel;
  public inputModel;
  private showDatepicker: boolean = false;
  
  constructor(private element: ElementRef, private renderer: Renderer, private _loader: MapsAPILoader) {}

  public setFocus(delay:number):void {
    if (this.type === 'select') {
      this.selectElement.setFocus(delay);
    } else {
      setTimeout( () => { // wait for animation if needed
        this.renderer.invokeElementMethod(
          this.inputElement.nativeElement, 'focus', []);
      }, delay);
    }
    
  }

  public ngOnInit():void {
    this.inputId = this.name + Math.floor((Math.random() * 100000) + 1);
    if (this.type === 'datepicker') { // Datepicker
      document.addEventListener("click", (event) => this.checkOutsideClicked(event) );
    }
    if (this.name === 'Location') {
      console.log('test test');
      this.autocomplete();
    }
    
  }

  public onDatepickerSelection(newDate):void { // Datepicker
    this.inputModel = moment(newDate).format('MMMM D, YYYY');
    this.inputLength = this.inputModel.length;
  }

  public hidePopup():void { // Datepicker
    this.showDatepicker = false;
  }

  public getBase64() {
    let filesSelected = this.inputElement.nativeElement.files;
    if (filesSelected.length > 0) {
      let fileToLoad = filesSelected[0];
      let fileReader = new FileReader();
      fileReader.onload = (fileLoadedEvent) => {
          let item = fileLoadedEvent.target;
          let base64 = item['result'];
          console.log(item);
      }
      fileReader.readAsDataURL(fileToLoad);
    }
  }

  private autocomplete() {
    this._loader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete( this.inputElement.nativeElement, {});
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
          let place = autocomplete.getPlace();
          console.log(place);
      });
    });
  }

  private checkOutsideClicked(event) {		
		if (event.target !== this.element.nativeElement && !this.element.nativeElement.contains(event.target)) {
			this.hidePopup();
		}
	}

  private onFocus():void {
    this.inputFocused = true;
    this.showPopup();
  }

  private onBlur():void {
    this.inputFocused = false;
  }

  private onInput(newInput:string):void {
    this.inputLength = newInput.length;
    if (this.type === 'datepicker' && moment(newInput).isValid() ) {
      this.dateModel = newInput;
    }
  }

  private showPopup():void { // Datepicker
    this.showDatepicker = true;
  }
  
}

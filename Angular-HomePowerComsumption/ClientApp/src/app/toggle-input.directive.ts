import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appToggleInput]'
})
export class ToggleInputDirective {

    constructor(private el: ElementRef) { }
    @Input() toggleDiv: string;
    @Input() toggleInput: boolean;

    @HostListener('click', ['$event']) onClick($event) {
        this.el.nativeElement.parent.remove();
    }

}

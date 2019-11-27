import { Input, Component, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html'
})

export class SpinnerComponent {

    private _isShow: boolean = false;

    @Input()
    set isShow(isShow: boolean) {
        this._isShow = isShow;
    }
}

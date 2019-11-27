import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from "rxjs";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { Category } from "../category.model";
import { CategoryRest } from "../category.rest.service";
import { CategoryFormGroup } from "./form.model";
import { Rest } from "../../rest.model";

@AutoUnsubscribe()
@Component({
    templateUrl: './edit.component.html'
})

export class EditComponent {

    private current: Category;

    private currentName: string;

    private category: Category;

    private formGroup: CategoryFormGroup = new CategoryFormGroup();

    private formSubmitted: boolean = false;

    private isEdit: boolean = false;

    /**
     * Список подписок
     */
    private subscriptions: Subscription = new Subscription();

    constructor(
        private rest: CategoryRest,
        private router: Router,
        private activeRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.subscriptions.add(
            this.activeRoute.params.subscribe(params => {
                if (params.id !== undefined) {
                    this.isEdit = true;
                    this.rest.get(params.id)
                        .toPromise()
                        .then((data: Rest) => {
                            if (data.code === 200 && data.message) {
                                this.category = data.message;
                                this.formGroup.get('name').setValue(this.category.name);
                            }
                        });
                }
            })
        );
    }

    ngOnDestroy() { }

    submitForm(form: NgForm) {
        this.formSubmitted = true;
        if (this.formGroup.valid) {
            this.category = this.category ? this.category : new Category();
            this.category.name = form.value.name;

            if (!this.isEdit) {
                this.rest.add(this.category, (res) => {
                    if (res.code && res.code === 200) {
                        this.router.navigateByUrl('/category');
                    }
                });
            } else {
                this.rest.update(this.category, (res) => {
                    if (res.code && res.code === 200) {
                        this.router.navigateByUrl('/category');
                    }
                });
            }
        }
    }
}
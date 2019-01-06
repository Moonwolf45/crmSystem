import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

import { AuthService } from "../shared/services/auth.service";
import { MaterialService } from "../shared/classes/material.service";


@Component({
    selector: 'app-registration-page',
    templateUrl: './registration-page.component.html',
    styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit, OnDestroy {

    form: FormGroup;
    aSub: Subscription;

    constructor(private auth: AuthService, private router: Router) {}

    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6)])
        });
    }

    ngOnDestroy() {
        if (this.aSub) {
            this.aSub.unsubscribe();
        }
    }

    submit() {
        this.form.disable();
        this.aSub = this.auth.registration(this.form.value).subscribe(() => {
            this.router.navigate(['/login'], {
                queryParams: {
                    registered: true
                }
            });
        }, error => {
            MaterialService.toast(error.error.message);
            this.form.enable();
        });
    }
}

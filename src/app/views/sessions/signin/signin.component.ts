import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouteConfigLoadStart, ResolveStart, RouteConfigLoadEnd, ResolveEnd } from '@angular/router';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    animations: [SharedAnimations]
})
export class SigninComponent implements OnInit {
    loading: boolean;
    loadingText: string;
    signinForm: UntypedFormGroup;
    logindataresponse: any
    clinicname: any

    constructor(
        private fb: UntypedFormBuilder,
        private auth: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.clinicname = localStorage.getItem("clinicname");
        console.log("loginid", this.clinicname);


        this.router.events.subscribe(event => {
            if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
                this.loadingText = 'Loading Dashboard Module...';

                this.loading = true;
            }
            if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
                this.loading = false;
            }
        });

        this.signinForm = this.fb.group({
            email: [
                '',
                [
                    Validators.required,
                    //   Validators.minLength(3)
                    Validators.email, // Ensures a valid email format
                    Validators.pattern(
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ // Additional custom email pattern
                    )
                ]
            ],
            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(6),
                    // Validators.pattern(
                    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
                    // )
                ]
            ],
        });
    }
    errorMessage: string | null = null;
    signin() {
        // Check if form is valid before proceeding
        if (this.signinForm.invalid) {
            this.signinForm.markAllAsTouched(); // Highlight invalid fields
            return;
        }

        this.loading = true;
        this.loadingText = 'Signing in...';

        // const { email, password } = this.signinForm.value; // Extract form values
        console.log('emailpas', this.signinForm.value.email, this.signinForm.value.password);

        this.auth.signin(this.signinForm.value.email, this.signinForm.value.password).subscribe(data => {
            console.log("the data inside the check login", data);

            if (data.response === 'succeeded') {
                console.log('testing')
                // Save user details in local storage
                this.logindataresponse = data;
                console.log("clinicname", data.user.clinicname);

                localStorage.setItem('email', this.signinForm.value.email);
                localStorage.setItem('email', this.signinForm.value.password);

                localStorage.setItem('login_clinic_id', this.logindataresponse.user.id);  
                localStorage.setItem('clinic_name', this.logindataresponse.user.clinicname);
                localStorage.setItem('clinic_mobile', this.logindataresponse.user.mobile);
                this.router.navigateByUrl('/dashboard/v1');
                console.log("clinicid",this.logindataresponse.user.id);
                


                // Navigate to the dashboard
            }
            else {
                this.loading = false; // Stop loading indicator
                // alert('Sign-in failed: Invalid email or password');
                this.errorMessage = 'Invalid email or password';
            }

            this.loading = false; // Stop loading indicator
        },
            (error) => {
                console.error("Error during login:", error);
                this.errorMessage = 'Invalid Credential. Please try again later.';
                this.loading = false; // Stop loading indicator
            }
        );
    }


    // this.signinForm = this.fb.group({
    //     email: ['test@example.com', Validators.required],
    //     password: ['1234', Validators.required]
    // });

    // signin() {
    //     this.loading = true;
    //     this.loadingText = 'Sigining in...';
    //     this.auth.signin(this.signinForm.value)
    //         .subscribe(res => {
    //             this.router.navigateByUrl('/dashboard/v1');
    //             this.loading = false;
    //         });
    // }




}

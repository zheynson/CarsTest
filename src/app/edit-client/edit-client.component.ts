import {Component, OnInit} from '@angular/core';
import {CarOwner} from '../models/car-owner';
import {SearchService} from '../services/search.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  public prov = false;

  private editUser: CarOwner;


  constructor(private service: SearchService, private router: Router, public route: ActivatedRoute) {
  }

  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      lastNameControl: new FormControl('', [
        Validators.required,
        Validators.minLength(2)]),

      firstNameControl: new FormControl('', [
        Validators.required,
        Validators.minLength(2)]),

      fatherNameControl: new FormControl('', [
        Validators.required,
        Validators.minLength(2)]),

      carNumberControl: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^[QWERTYUIOPASDFGHJKLZXCVBNM]{2}\d{4}(?<!000)[QWERTYUIOPASDFGHJKLZXCVBNM]{2}$/ui),
      ]),

      carMarkControl: new FormControl('', [
        Validators.required,
        Validators.minLength(2)]),

      carModelControl: new FormControl('', [
        Validators.required,
        Validators.minLength(2)]),

      carYearControl: new FormControl('', [
        Validators.required,
        Validators.min(1998),
        Validators.max(2021)])
    });

    console.log(this.route);

    if (this.route.snapshot.params.id) {
      this.service.searchUser(this.route.snapshot.params.id).subscribe((t) => {
        this.form.controls.lastNameControl.setValue(t.lastName);
        this.form.controls.firstNameControl.setValue(t.firstName);
        this.form.controls.fatherNameControl.setValue(t.fatherName);
        this.form.controls.carNumberControl.setValue(t.cars[0].stateNumber);
        this.form.controls.carMarkControl.setValue(t.cars[0].modelName);
        this.form.controls.carModelControl.setValue(t.cars[0].brandName);
        this.form.controls.carYearControl.setValue(t.cars[0].yearProduction);

        if (this.route.snapshot.routeConfig.path === 'prev/:id') {
          this.form.controls.lastNameControl.disable();
          this.form.controls.firstNameControl.disable();
          this.form.controls.fatherNameControl.disable();
          this.form.controls.carNumberControl.disable();
          this.form.controls.carMarkControl.disable();
          this.form.controls.carModelControl.disable();
          this.form.controls.carYearControl.disable();
          console.log(this.route);
        }

        this.editUser = t;
      });
    }
  }

  submit(): void {
    this.router.navigate(['/']);

    const user: CarOwner = {
      id: +this.route.snapshot.params.id,
      firstName: this.form.value.firstNameControl,
      lastName: this.form.value.lastNameControl,
      fatherName: this.form.value.fatherNameControl,
      cars: [
        {
          stateNumber: this.form.value.carNumberControl,
          brandName: this.form.value.carMarkControl,
          modelName: this.form.value.carModelControl,
          yearProduction: this.form.value.carYearControl
        }]
    };

    if (!this.route.snapshot.params.id) {
      this.service.postUser(user)
        .subscribe(() => {
          this.service.search();
        });
    } else {
      this.service.editUser(user).subscribe((t) => {
        this.service.search();
      });
    }

  }

}

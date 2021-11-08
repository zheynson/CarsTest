import {Component, OnInit} from '@angular/core';
import {CarOwner} from '../models/car-owner';
import {SearchService} from '../services/search.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  private editUser: CarOwner;

  array: any = [];

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


      array: new FormArray([])
    });

    if (!this.route.snapshot.params.id) {
      this.array = this.form.get('array') as FormArray;
      this.addCar();
    } else {
      this.array = this.form.get('array') as FormArray;
    }

    if (this.route.snapshot.params.id) {
      this.service.searchUser(this.route.snapshot.params.id).subscribe((t) => {
        this.form.controls.lastNameControl.setValue(t.lastName);
        this.form.controls.firstNameControl.setValue(t.firstName);
        this.form.controls.fatherNameControl.setValue(t.fatherName);

        t.cars.forEach(item => {
          this.addCar(item.stateNumber, item.brandName, item.modelName, item.yearProduction);
        });

        if (this.route.snapshot.routeConfig.path === 'prev/:id') {
          this.form.disable();
          this.array.disable();
        }

        this.editUser = t;
      });
    }
  }

  addCar(carNumber = '', carMark = '', carModel = '', carYear: any = ''): any {
    const car: any = new FormGroup({
      carNumberControl: new FormControl(carNumber, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^[QWERTYUIOPASDFGHJKLZXCVBNM]{2}\d{4}(?<!000)[QWERTYUIOPASDFGHJKLZXCVBNM]{2}$/ui),
      ]),

      carMarkControl: new FormControl(carMark, [
        Validators.required,
        Validators.minLength(2)]),

      carModelControl: new FormControl(carModel, [
        Validators.required,
        Validators.minLength(2)]),

      carYearControl: new FormControl(carYear, [
        Validators.required,
        Validators.min(1998),
        Validators.max(2021)])
    });
    this.array.push(car);
  }

  deleteCar(id: number): void {
    this.array.removeAt(id);
  }

  submit(): void {
    this.router.navigate(['/']);

    const cars = this.array.value.map(item => {
      return {
        stateNumber: item.carNumberControl,
        brandName: item.carMarkControl,
        modelName: item.carModelControl,
        yearProduction: item.carYearControl,
      };
    });

    const user: CarOwner = {
      id: +this.route.snapshot.params.id,
      firstName: this.form.value.firstNameControl,
      lastName: this.form.value.lastNameControl,
      fatherName: this.form.value.fatherNameControl,
      cars: cars
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-heroes-detail',
  templateUrl: './heroes-detail.component.html',
  styleUrls: ['./heroes-detail.component.scss']
})
export class HeroesDetailComponent implements OnInit {

  families = ["Marvel", "DC"];
  types = ["Heroe", "Villano"]

  public createForm: any;
 
  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.createFormGroup();
  }

  createFormGroup() {
    this.createForm = this.fb.group({
      name: [''],
      family: [''],
      type: ['']
    })
  }

  createOrEdit() {

  }

}

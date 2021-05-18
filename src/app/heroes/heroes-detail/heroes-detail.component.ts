import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from 'src/app/shared/models/hero';
import { tap } from 'rxjs/operators';
import { HeroService } from 'src/app/core/http/hero.service';

@Component({
  selector: 'app-heroes-detail',
  templateUrl: './heroes-detail.component.html',
  styleUrls: ['./heroes-detail.component.scss'],
})
export class HeroesDetailComponent implements OnInit {
  families = ['Marvel', 'DC'];
  types = ['Heroe', 'Villano'];

  heroTitle: string = 'Nuevo Heroe/Villano';
  heroId: number = 0;
  buttonText: string = 'Crear';

  public createForm: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private heroService: HeroService
  ) {
    this.route.params.subscribe((response) => {
      this.heroId = response.id;
    });
  }

  ngOnInit() {
    this.createFormGroup();
  }

  createFormGroup() {
    this.createForm = this.fb.group({
      name: [''],
      family: [''],
      type: [''],
    });
    if (this.heroId) this.getHeroOrVillian();
  }

  getHeroOrVillian() {
    this.heroTitle = 'Editar Heroe/Villano';
    this.buttonText = 'Editar'
    this.heroService
      .getHero(this.heroId)
      .pipe(
        tap((hero: Hero) => {
          this.fillForm(hero);
        })
      )
      .subscribe();
  }

  fillForm(hero: Hero) {
    this.createForm = this.fb.group({
      name: [hero.name],
      family: [hero.family],
      type: [hero.type],
    });
    console.log("🚀 ~ file: heroes-detail.component.ts ~ line 66 ~ HeroesDetailComponent ~ fillForm ~ this.createForm", this.createForm)
  }

  createOrEdit() {}
}

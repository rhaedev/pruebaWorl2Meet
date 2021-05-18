import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from 'src/app/shared/models/hero';
import { tap } from 'rxjs/operators';
import { HeroService } from 'src/app/core/http/hero.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  heroes: Hero[] = []

  public createForm: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private heroService: HeroService,
    private snackBar: MatSnackBar
  ) {
    this.route.params.subscribe((response) => {
      this.heroId = response.id;
    });
  }

  ngOnInit() {
    this.createFormGroup();
    this.getHeroes();
  }

  getHeroes() {
    this.heroService.getHeroes().pipe(tap(result => this.heroes = result)).subscribe();
  }

  createFormGroup() {
    this.createForm = this.fb.group({
      id: [''],
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
      id: [hero.id],
      name: [hero.name],
      family: [hero.family],
      type: [hero.type],
    });
  }

  createOrEdit() {
    let hero: Hero = this.createForm.value;
    if(this.heroId) {
      this.heroService.update(hero).pipe(tap(result => {
        this.openSnackBar(
          `Editado el ${this.createForm.value.type}: ${this.createForm.value.name}`
        );
        this.router.navigate(['/heroes']);
      })).subscribe();
    } else {
      hero.id = this.heroes[this.heroes.length - 1].id + 1;
      this.heroService.create(hero).pipe(tap(result => {
        this.openSnackBar(
          `Añadido un nuevo ${this.createForm.value.type}: ${this.createForm.value.name}`
        );
        this.router.navigate(['/heroes']);
      })).subscribe();
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Cerrar", {
      duration: 2000,
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }
}

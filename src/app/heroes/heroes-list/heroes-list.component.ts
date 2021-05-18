import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { HeroService } from 'src/app/core/http/hero.service';
import { DialogComponent } from 'src/app/shared/material/dialog/dialog.component';
import { Hero } from 'src/app/shared/models/hero';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss'],
})
export class HeroesListComponent implements OnInit {
  dataSourceHeroes: any;
  displayedColumns: string[] = ['id', 'name', 'family', 'type', 'buttons'];

  @ViewChild(MatPaginator, { static: false }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort, { static: false }) sort: MatSort | undefined;

  constructor(
    private heroesService: HeroService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getHeroesAndVillians();
  }

  getHeroesAndVillians() {
    this.heroesService
      .getHeroes()
      .pipe(
        tap((response) => {
          console.log(response);
          this.dataSourceHeroes = new MatTableDataSource(response);
          this.dataSourceHeroes.paginator = this.paginator;
          this.dataSourceHeroes.sort = this.sort;
        })
      )
      .subscribe();
  }

  createNewHeroOrVillian() {
    console.log('HOla');
    this.router.navigate(['/heroes/new']);
  }

  editHeroOrVillian(id: number) {
    console.log("🚀 ~ file: heroes-list.component.ts ~ line 58 ~ HeroesListComponent ~ editHeroOrVillian ~ id", id)
    this.router.navigate(['/heroes/edit/' + id]);
  }

  deleteHero(hero: Hero) {
    this.heroesService
      .delete(hero.id)
      .pipe(
        tap((data) => {
          this.snackBar.open(
            `Eliminado el registro de ${hero.name}`,
            'Cerrar',
            {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );
          this.getHeroesAndVillians();
        })
      )
      .subscribe();
  }

  deleteHeroModal(hero: Hero) {
    const dialogRef = this.dialog
      .open(DialogComponent, {
        data: {
          message: `¿Estas seguro de borrar a ${hero.name}?`,
          buttonText: {
            ok: 'Borrar',
            cancel: 'No',
          },
        },
      })
      .afterClosed()
      .subscribe((result: any) => {
        if (result) this.deleteHero(hero);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceHeroes.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceHeroes.paginator) {
      this.dataSourceHeroes.paginator.firstPage();
    }
  }
}

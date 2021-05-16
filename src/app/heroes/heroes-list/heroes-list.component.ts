import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { HeroService } from 'src/app/core/http/hero.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss'],
})
export class HeroesListComponent implements OnInit {
  dataSourceHeroes:any;
  displayedColumns: string[] = ['id', 'name', 'family', 'type'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator | undefined;
  @ViewChild(MatSort, { static: false }) sort: MatSort | undefined;

  constructor(private heroesService: HeroService, private router: Router) {
  }

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
    console.log('HOla')
    this.router.navigate(["/heroes/new"]);
  }

  editHeroOrVillian(id: number) {
    this.router.navigate(["/heroes/edit/" + id]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceHeroes.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceHeroes.paginator) {
      this.dataSourceHeroes.paginator.firstPage();
    }
  }
}

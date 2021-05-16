import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { HeroesDetailComponent } from './heroes-detail/heroes-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeroesListComponent,
    HeroesDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list' },
      { path: 'list', component: HeroesListComponent },
      { path: 'new', component: HeroesDetailComponent },
      { path: ':id', component: HeroesDetailComponent },
      { path: '**', redirectTo: 'list' }
    ])
  ]
})
export class HeroesModule { }

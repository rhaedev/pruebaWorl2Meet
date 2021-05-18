import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { DialogComponent } from './material/dialog/dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DialogComponent
  ],
  exports: [
    DialogComponent,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  entryComponents: [
    DialogComponent
  ]
})

export class SharedModule {
}
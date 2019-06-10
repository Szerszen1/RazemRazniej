import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SpecificRecipePage } from './specific-recipe.page';

const routes: Routes = [
  {
    path: '',
    component: SpecificRecipePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SpecificRecipePage]
})
export class SpecificRecipePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const marerialArray = [MatButtonModule, MatIconModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, marerialArray],
  exports: [marerialArray],
})
export class MaterialModule {}

import { FormsModule } from '@angular/forms';
import { CustomMaterialModule } from './../custom-material/custom-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent, DialogDataExampleDialog, ModalChangeStatus } from './home/home.component';
import { AddComponent } from './modal/add/add.component';


@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    AddComponent,
    DialogDataExampleDialog,
    ModalChangeStatus],
  imports: [
    FormsModule,
    CommonModule,
    MemberRoutingModule,
    CustomMaterialModule
  ],
  exports: [
    AddComponent
  ],
  entryComponents: [DialogDataExampleDialog, ModalChangeStatus]
})
export class MemberModule { }

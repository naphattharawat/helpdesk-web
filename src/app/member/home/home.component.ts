import { HelpdeskService } from './../helpdesk.service';
import { AddComponent } from './../modal/add/add.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as _ from 'lodash';
import { JwtHelperService } from '@auth0/angular-jwt';
export interface DialogData {
  id: any;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  id: any;
  device: any = 'LINE';
  tel: any;
  contact: any;
  assign: any;
  status: any;
  isH4U: any;
  isQ4U: any;
  isHIS: any;
  isMMIS: any;
  detail: any;
  dataSource = [];
  displayedColumns: string[] = ['no', 'device', 'subject', 'detail', 'tel', 'contact', 'owner', 'status'];
  token: any;
  decoded: any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  countWait: any;
  countProcess: any;
  countPass: any;
  countRemove: any;
  pageSizeOptions = [10, 20, 50, 100];
  limit = 20;
  offset = 0;
  total: any;
  order = 'asc';
  constructor(
    public dialog: MatDialog,
    private helpdeskService: HelpdeskService) {
    this.token = localStorage.getItem('token');
    this.decoded = this.jwtHelper.decodeToken(this.token);
  }

  ngOnInit() {
    this.getList();
  }

  changePage(e) {
    this.limit = e.pageSize;
    this.offset = e.pageIndex * this.limit;
    this.getList();
    console.log(e);

  }

  sortData(e) {
    console.log(e);
    this.order = e.direction;
    this.getList();

  }
  async getList() {
    try {
      const rs: any = await this.helpdeskService.getList(this.limit, this.offset, this.order);
      // console.log(rs);
      if (rs.ok) {
        this.dataSource = rs.rows;
        this.total = rs.total;
      } else {
        console.log(rs.error);

      }
      await this.getCount();
    } catch (error) {
      console.log(error);
    }
  }
  async getCount() {
    try {
      const rs: any = await this.helpdeskService.getCount();
      if (rs.ok) {
        const total = rs.rows;
        const idx = _.findIndex(total, { status_id: 1 });
        if (idx > -1) {
          this.countProcess = total[idx].count;
        } else {
          this.countProcess = 0;
        }
        const idx2 = _.findIndex(total, { status_id: 2 });
        if (idx2 > -1) {
          this.countWait = total[idx2].count;
        } else {
          this.countWait = 0;
        }
        const idx3 = _.findIndex(total, { status_id: 3 });
        if (idx3 > -1) {
          this.countPass = total[idx3].count;
        } else {
          this.countPass = 0;
        }
        const idx4 = _.findIndex(total, { status_id: 4 });
        if (idx4 > -1) {
          this.countRemove = total[idx4].count;
        } else {
          this.countRemove = 0;
        }
      } else {
        console.log(rs.error);

      }
    } catch (error) {
      console.log(error);
    }
  }



  openDialog(): void {
    const dialogRef = this.dialog.open(DialogDataExampleDialog, {
      width: '70%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      console.log('The dialog was closed');
      if (result) {
        this.device = result.device;
        this.tel = result.tel;
        this.contact = result.contact;
        this.assign = result.assign;
        this.status = result.status;
        this.isH4U = result.isH4U;
        this.isQ4U = result.isQ4U;
        this.isHIS = result.isHIS;
        this.isMMIS = result.isMMIS;
        this.detail = result.detail;
        await this.save();
      }
    });
  }

  async save() {
    try {
      const subject = await this.convertCheckBox();
      const obj = {
        subject,
        device: this.device,
        detail: this.detail,
        tel: this.tel,
        contact: this.contact,
        status_id: this.status,
        assign: this.assign,
        create_id: this.decoded.id
      };
      const rs: any = await this.helpdeskService.save(obj);
      if (rs.ok) {

      } else {
        console.log(rs.error);

      }
      await this.getList();

    } catch (error) {
      console.log(error);

    }


  }

  convertCheckBox() {
    const subject = [];
    if (this.isH4U) {
      subject.push('H4U');
    }
    if (this.isQ4U) {
      subject.push('Q4U');
    }
    if (this.isHIS) {
      subject.push('HIS');
    }
    if (this.isMMIS) {
      subject.push('MMIS');
    }
    return subject.join(',');
  }

  openChangeStatus(id) {
    console.log(id);

    const dialogRef = this.dialog.open(ModalChangeStatus, {
      width: '70%',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      const id = result.id;
      const status = result.status;
      console.log('change status');
      if (status === '1' || status === '3') {
        this.updateStatusProcess(id, status);
      } else {
        this.updateStatus(id, status);
      }
      // if (result) {
      //   console.log(result);
      //   this.device = result.device;
      //   this.tel = result.tel;
      //   this.tel = result.tel;
      //   this.contact = result.contact;
      //   this.assign = result.assign;
      //   this.status = result.status;
      // }
    });
  }
  async updateStatus(id, status) {
    try {
      const rs = await this.helpdeskService.update(id, { status_id: status });
      console.log(rs);
      this.getList();
    } catch (error) {
      console.log(error);

    }
  }

  async updateStatusProcess(id, status) {
    try {

      const data = {
        status_id: status,
        process_id: this.decoded.id
      };
      const rs = await this.helpdeskService.update(id, data);
      this.getList();
    } catch (error) {
      console.log(error);

    }
  }
}


@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
})
export class DialogDataExampleDialog {
  device = 'TEL';
  isH4U: any;
  isQ4U: any;
  isHIS: any;
  isMMIS: any;
  tel: any;
  contact: any;

}


@Component({
  selector: 'modal-change-status',
  templateUrl: 'modal-change-status.html',
})
export class ModalChangeStatus {
  id: any;
  constructor(
    public dialogRef: MatDialogRef<ModalChangeStatus>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }


}

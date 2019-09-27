import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { HelpdeskService } from '../helpdesk.service';
import * as moment from 'moment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  countWait: any;
  countProcess: any;
  countPass: any;
  countRemove: any;



  typeChart: any = 'line';
  dataChart: any;
  dataChart2: any;
  optionsChart: any;
  period: any;
  constructor(
    private helpdeskService: HelpdeskService
  ) { }

  ngOnInit() {
    this.getData();
    this.typeChart = 'line';   ////// สามารถกำหนดเป็น 'line','bar','radar','pie','doughnut','polarArea','bubble','scatter'
    this.optionsChart = {
      responsive: true,
      maintainAspectRatio: false
    };
    const month = moment().get('month') + 1;
    let year = moment().get('year');
    if (month >= 10) {
      year += 1;
    }

    this.period = `${year}`;
  }

  getData() {
    this.getCount();
    this.getCountUser();
    this.getSubject();
  }
  onChangePeriod(e) {
    this.period = e.value;
    this.getData();
  }

  async getCountUser() {
    try {
      const rs: any = await this.helpdeskService.getCountUser(this.period);
      if (rs.ok) {
        const labels = [];
        const data = [];
        for (const i of rs.rows) {
          labels.push(i.nickname);
          data.push(i.count);
        }
        this.dataChart = {
          labels,
          datasets: [
            {
              label: 'จำนวนการติดต่อ/คน',
              data,
              backgroundColor: ['#1abc9c', '#3498db', '#9b59b6', '#bdc3c7', '#f39c12', '#1abc9c', '#3498db']
            }
          ]
        };
      } else {
        console.log(rs.error);

      }
    } catch (error) {
      console.log(error);

    }
  }
  async getCount() {
    try {
      const rs: any = await this.helpdeskService.getCount(this.period);
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

  async getSubject() {
    try {
      const rs: any = await this.helpdeskService.getList(100000, 0, 'desc', this.period);
      if (rs.ok) {
        const data = [];
        for (const i of rs.rows) {
          const split = i.subject.split(',');
          if (split.length > 1) {
            for (const s of split) {
              const idx = _.findIndex(data, { subject: s });
              if (idx > -1) {
                data[idx].count += 1;
              } else {
                data.push({
                  subject: s,
                  count: 1
                });
              }
            }
          } else {
            const idx2 = _.findIndex(data, { subject: i.subject });
            if (idx2 > -1) {
              data[idx2].count += 1;
            } else {
              data.push({
                subject: i.subject,
                count: 1
              });
            }
          }
        }
        const labels = [];
        const datas = [];
        for (const i of data) {
          labels.push(i.subject);
          datas.push(i.count);
        }
        this.dataChart2 = {
          labels,
          datasets: [
            {
              label: 'จำนวนการติดต่อ/เรื่อง',
              data: datas,
              backgroundColor: ['#1abc9c', '#3498db', '#9b59b6', '#bdc3c7', '#f39c12', '#1abc9c', '#3498db']
            }
          ]
        };
      } else {
        console.log(rs.error);

      }
    } catch (error) {
      console.log(error);

    }
  }

}

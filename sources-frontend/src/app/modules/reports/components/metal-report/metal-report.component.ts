import {Component, OnInit} from '@angular/core';
import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';
import {DialogService} from "primeng/dynamicdialog";
import {ReportService} from "../../reports.service";

@Component({
  selector: 'app-metal-report',
  templateUrl: './metal-report.component.html',
  styleUrls: ['./metal-report.component.css'],
  providers: [
    DialogService
  ]
})
export class MetalReportComponent implements OnInit {
  warehouseTitle: string;
  reportData: any[] = []
  headers: string[] = []
  tableData: any[] = []
  reportDate: string = '';

  constructor(
    public dialogService: DialogService,
    private reportService: ReportService
  ) {
    registerLocaleData(localeRu, 'ru');
  }

  ngOnInit(): void {
    this.reportService.getMetalReport()
      .subscribe(data => {
        this.reportData = data['response']
        let reportDataItems = this.reportData['data'];
        this.reportDate = this.reportData['date']
        this.headers = reportDataItems[0]
        for (let i = 1; i < reportDataItems.length; i++) {
          this.tableData.push(reportDataItems[i])
        }
      })
  }


  getBackgroundColor(colorCode: string) {
    return `rgb(${colorCode})`
  }

  getTextColor(colorCode: string) {
    // Определение цвета текста в зависимости от цвета фона
    return colorCode === '244,248,244' || colorCode === '244,248,244' || colorCode === '222,208,208' ? 'black' : 'white';
  }
}

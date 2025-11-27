import {Component} from '@angular/core';
import {Counterparty} from "../../../counterparties/models/Counterparty";
import {MessageService, PrimeNGConfig} from "primeng/api";
import {CALENDAR_RU_LOCALE} from "../../../../core/locale/CalendareRuLocale";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../../../core/constants/api-url";
import {DateUtils} from "../../../../shared/DateUtils";
import {CounterpartyService} from "../../../counterparties/services/counterparty.service";
import {FileService} from "../../../../shared/services/file.service";

@Component({
  selector: 'app-mutual-settlement-report',
  templateUrl: './mutual-settlement-report.component.html',
  styleUrls: ['./mutual-settlement-report.component.css'],
  providers: [MessageService]
})
export class MutualSettlementReportComponent {

  counterparties: Counterparty[]
  formats: any[] = [
    {name: 'pdf', value: 'pdf'},
    {name: 'xls', value: 'xls'},
  ]
  selectedCounterparty: Counterparty
  period: any;
  fileFormat: any = {name: 'pdf', value: 'pdf'};

  constructor(
    private primengConfig: PrimeNGConfig,
    private counterpartyService: CounterpartyService,
    private http: HttpClient,
    private fileService: FileService,
    private messageService: MessageService

  ) {
    const currentDate = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);
    this.period = [oneMonthAgo, currentDate];
    this.primengConfig.setTranslation(CALENDAR_RU_LOCALE);
    this.counterpartyService.findAll().subscribe({
      next: (response) => {
        this.counterparties = response.response.counterparties.data
          .filter(c => c.is_confirmed === '1')
          .map(
            (counterparty) => {
              counterparty.fullname = counterparty.fullname.replace(/&quot;/g, '"');
              counterparty.counterparty_id = counterparty.counterparty_id || counterparty.application_id;
              return counterparty;
            })
      }
    })
  }

  buildReport() {
    this.http.get<any>(API_URL + 'download_mutual_settlements', {
      params: {
        counterparty_id: this.selectedCounterparty?.counterparty_id || '',
        period_dates: DateUtils.formatDate(this.period[0]) + ' ' + DateUtils.formatDate(this.period[1]),
        file_format: this.fileFormat.value,
      },
	  "withCredentials": true
    }).subscribe({
      next: (response) => {
        let url = response.response.link;
        const filename = url.replace(/.*?\/([^\/]+\.(pdf|xlsx?))/, '$1');
        this.fileService.downloadFile(url, filename);
      }
    })
  }
}

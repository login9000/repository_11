import {Component, Input, OnInit} from '@angular/core';
import {ManagerInput} from "../../models/input/ManagerInput";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ManagerMessageDialogComponent} from "../../dialogs/managermessage-dialog/manager-message-dialog.component";
import {
  ProductSearchDialogComponent
} from "../../../products/dialog/product-search-dialog/product-search-dialog.component";
import {AppService} from "../../../../app.service";
import {ManagerMessageUtil} from "../../ManagerMessageUtil";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-manager-card',
  templateUrl: './manager-card.component.html',
  styleUrls: ['./manager-card.component.css'],
  providers: [
    DialogService,
  ]
})
export class ManagerCardComponent implements OnInit{

  manager: ManagerInput | undefined;
  @Input() showMessageButton: boolean = false;
  @Input() messageService: MessageService
  ref: DynamicDialogRef | undefined;
  
  constructor(
    public dialogService: DialogService,
    public appService: AppService,
  ) {
  }

  ngOnInit(): void {
    this.manager = {
      id: 1,
      first_name: 'Константин',
      last_name: 'Константинопольский',
      email: 'k.kosntaninopolsy@sokrof.ru',
    }
  }

  onShowManagerMessageDialog() {
    {
      this.ref = this.dialogService.open(ManagerMessageDialogComponent, {
        header: 'Ваш менеджер',
        width: '450px',
        contentStyle: {overflow: 'auto'},
        baseZIndex: 10000
      });
      this.ref.onClose.subscribe((response: any) => {
        if (response) {
          ManagerMessageUtil.showSuccessMessage(this.dialogService)
        }
      });
    }
  }

}

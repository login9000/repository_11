import {
  SuccessManagerRequestDialogComponent
} from "./dialogs/success-manager-request-dialog/success-manager-request-dialog.component";
import {DialogService} from "primeng/dynamicdialog";

export class ManagerMessageUtil {
   public static showSuccessMessage(dialogService: DialogService): void {
     dialogService.open(SuccessManagerRequestDialogComponent, {
       header: '',
       width: '500px',
       contentStyle: {overflow: 'auto'},
       baseZIndex: 10000
     });
   }
}

import { Component, OnInit } from "@angular/core";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { EmployeeService } from "../../services/employee.service";
import { Employee } from "../../models/input/Employee";
import { EmployeeEditorDialogComponent } from "../../dialogs/employee-editor-dialog/employee-editor-dialog.component";
import { MessageService } from "primeng/api";
import { ErrorTranslator } from "../../../../core/error-handle/ErrorTranslator";

@Component({
    selector: 'app-employees-list',
    templateUrl: './employees-list.component.html',
    styleUrls: ['./employees-list.component.css'],
    providers: [MessageService, DialogService],
})
export class EmployeesListComponent implements OnInit {
    ref: DynamicDialogRef | undefined;
    public globalThis = globalThis;

    constructor(
        public employeeService: EmployeeService,
        public dialogService: DialogService,
        private messageService: MessageService
    ) {
    }

    ngOnInit(): void {
        this.getEmployees();
    }

    private getEmployees() {
        globalThis.stateLoadAllEmployes = '';
        this.employeeService.findAll()
            .subscribe({
                next: (response) => {
                    globalThis.stateLoadAllEmployes = 'loaded';
                    this.employeeService.employees = response                           
                },
                error: (error) => {
                    globalThis.stateLoadAllEmployes = 'error';
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Ошибка',
                        detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 30000
                    })
                }
            })
    }

    updateEmployee(employee: Employee) {
        this.ref = this.dialogService.open(EmployeeEditorDialogComponent, {
            header: "Изменить данные",
            width: '40%',
            style: {
                overflowY: 'none'
            },
            data: {
                employee: employee
            },
            baseZIndex: 10000
        });

        this.ref.onClose.subscribe(result => {
            if (result) {
                this.getEmployees();
            }
        })
    }

}

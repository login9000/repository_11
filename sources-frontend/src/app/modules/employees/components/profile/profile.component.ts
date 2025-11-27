import { Component, ElementRef, ViewChild } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { EmployeeService } from "../../services/employee.service";
import { Employee } from "../../models/input/Employee";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { EmployeeEditorDialogComponent } from "../../dialogs/employee-editor-dialog/employee-editor-dialog.component";
import { MailEditorDialogComponent } from "../../dialogs/mail-editor-dialog/mail-editor-dialog.component";
import {
    ManagerMessageDialogComponent
} from "../../../managers/dialogs/managermessage-dialog/manager-message-dialog.component";
import { AppService } from "../../../../app.service";
import { BehaviorSubject } from "rxjs";
import { MessageService } from "primeng/api";
import { ErrorTranslator } from "../../../../core/error-handle/ErrorTranslator";
import { API_URL, PROJECT_URL } from "../../../../core/constants/api-url";
import { ManagerMessageUtil } from "../../../managers/ManagerMessageUtil";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    providers: [MessageService, DialogService],
})
export class ProfileComponent {

    @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
    employee: Employee = undefined
    ref: DynamicDialogRef | undefined;
    employees: Employee[] = [];
    delegationTarget: Employee = undefined
    selectedFile$: BehaviorSubject<File> = new BehaviorSubject<File>(null);

    constructor(
        public dialogService: DialogService,
        public appService: AppService,
        private messageService: MessageService,
        private employeeService: EmployeeService,
        private http: HttpClient
    ) {
        this.employeeService.getEmployee()
        this.selectedFile$.subscribe(() => {
            this.uploadPhoto()
        })
        this.employeeService.findAll().subscribe(
            (data) => {
                this.employees = data
            }
        )
        if (this.appService?.sessionConfig?.delegation_fio && this.appService?.sessionConfig?.delegation_user_myid) {
            this.delegationTarget = {
                fio: this.appService?.sessionConfig?.delegation_fio,
                fio2: this.appService?.sessionConfig?.delegation_fio,
                user_myid: this.appService?.sessionConfig?.delegation_user_myid
            }
        }
    }

    createEmployee() {
        this.ref = this.dialogService.open(EmployeeEditorDialogComponent, {
            header: "Добавить сотрудника",
            width: '40%',
            style: {
                overflowY: 'none'
            },
            baseZIndex: 10000
        });
        this.ref.onClose.subscribe((response: any) => {
            if (response) {
                this.employeeService.employees.push(response.response)
            }
        })
    }

    showEmailEditorDialog() {
        this.ref = this.dialogService.open(MailEditorDialogComponent, {
            header: "Смена почты",
            style: {
                overflowY: 'none'
            },
            data: {
                mode: 'email',
            },
            baseZIndex: 10000
        });

        this.ref.onClose.subscribe((response: any) => {
            this.appService.getSessionConfig()
        })
    }

    showManagerMessageDialog() {
        {
            this.ref = this.dialogService.open(ManagerMessageDialogComponent, {
                header: 'Ваш менеджер',
                width: '450px',
                contentStyle: { overflow: 'auto' },
                baseZIndex: 10000
            });
            this.ref.onClose.subscribe((response: any) => {
                if (response) {
                    ManagerMessageUtil.showSuccessMessage(this.dialogService)
                    this.employeeService.getEmployee()
                }
            });
        }
    }


    onFileChange(event: any) {
        this.selectedFile$.next(event.target.files[0]);
    }

    private uploadPhoto() {
        if (this.selectedFile$.value !== null) {
            this.employeeService.uploadPhoto(this.selectedFile$.value)
                .subscribe({
                    next: (v) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Успешно',
                            detail: 'Фотография загружена на сервер'
                        });
                        this.appService.sessionConfig.photo = v.response;
                    },
                    error: (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Ошибка',
                            detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
                        });
                    }
                })
        } else {
            console.warn('Выберите файл для загрузки');
        }
    }

    openFileInput() {
        this.fileInput.nativeElement.click();
    }

    deleteAvatar() {
        this.appService.sessionConfig.photo = '';
        this.http.delete(API_URL + 'delete_avatar', {
        "headers": {
            "X-CSRF-TOKEN": globalThis.csrfToken
        },
        "withCredentials": true
        })
        .subscribe({
            next: response => {
            //globalThis.stateLoadAddresses = 'loaded';
            
            },
            error: error => {
            //globalThis.stateLoadAddresses = 'error';
            this.messageService.add({ 
                severity: 'error', 
                summary: 'Ошибка', 
                detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 30000 
            });
            }
        });
    }

    protected readonly URL = PROJECT_URL;

    delegateNotification() {
        let id = this.delegationTarget?.user_myid || '';
        this.employeeService.delegateNotification(id)
            .subscribe({
                next: (v) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Успешно',
                        detail: !!id ? 'Уведомления делегированы другому сотруднику' : 'Делегирование уведомлений отключено'
                    });
                },
                error: (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Ошибка',
                        detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
                    })
                }
            })
    }
}

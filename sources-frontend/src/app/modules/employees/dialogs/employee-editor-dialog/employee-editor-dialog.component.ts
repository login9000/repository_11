import { AppService } from "../../../../app.service";
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Employee } from "../../models/input/Employee";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EmployeeService } from "../../services/employee.service";
import { EmployeeRequest } from "../../models/output/EmployeeRequest";
import { Message, MessageService } from "primeng/api";
import { ErrorTranslator } from "../../../../core/error-handle/ErrorTranslator";

@Component({
  selector: 'app-order-list-filters',
  templateUrl: './employee-editor-dialog.component.html',
  styleUrls: ['./employee-editor-dialog.component.css'],
})
export class EmployeeEditorDialogComponent {
  employees: Employee[] = [];
  employeeForm: FormGroup = new FormGroup({})
  messages: Message[];
  showPassword: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    public ref: DynamicDialogRef,
    public appService: AppService,
    public dialogConfig: DynamicDialogConfig) {
    this.initForm()
    this.employeeService.findAll().subscribe(
      (data) => {
        this.employees = data
      }
    )
    this.messages = []
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  private initForm() {
    const employee: Employee = this.dialogConfig.data?.employee;
    
    if (employee) {
    }
    this.employeeForm = new FormGroup({
      firstName: new FormControl(employee ? employee?.fio.split(' ')[1] : '', Validators.required),
      secondName: new FormControl(employee ? employee?.fio.split(' ')[0] : '', Validators.required),
      patronymic: new FormControl(employee ? employee?.fio.split(' ')[2] : '', Validators.required),
      phone: new FormControl(employee ? employee?.phone : '', Validators.required),
      email: new FormControl(employee ? employee?.email : '', Validators.required),
      delegation_user_myid: new FormControl(employee ? employee?.delegation_user_myid : ''),
      password: new FormControl(''),
      confirmedPassword: new FormControl(''),
      isBanned: new FormControl({ value: employee ? employee?.is_banned === '1' : '', disabled: !employee }),
    })
  }


  onConfirm() {
    if (this.employeeForm.valid && this.employeeForm.controls['password'].value !==
      this.employeeForm.controls['confirmedPassword'].value) {
      this.messages = [{
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Введенные пароли не совпадают'
      }]
    } else if (!!this.dialogConfig.data) {
      if (this.employeeForm.controls['password'].value.length > 10) {
        this.messages = [{
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Пароль не может превышать длину в 10 символов'
        }]
        return
      }
      this.updateEmployee()
    } else {
      if (this.employeeForm.controls['password'].value.length > 10) {
        this.messages = [{
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Пароль не может превышать длину в 10 символов'
        }]
        return
      }
      this.createEmployee()
    }
  }


  private createEmployee() {
    let value = this.employeeForm.value;
    const employeeRequest: EmployeeRequest = {
      fio: value.secondName + ' ' + value.firstName + ' ' + value.patronymic,
      email: value.email,
      phone: value.phone.replace(/\s/g, ''),
      pass1: value.password,
      pass2: value.confirmedPassword,
    }
    this.employeeService.create(employeeRequest)
      .subscribe({
        next: (data) => {
          if (data.response) {
            this.ref.close(data)
          }
        },
        error: (error) => {
          this.messages = [{
            severity: 'error',
            summary: 'Ошибка',
            detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
          }]
        }
      })

  }

  private updateEmployee() {
    let value = this.employeeForm.value;
    const employeeRequest: EmployeeRequest = {
      fio: value.secondName + ' ' + value.firstName + ' ' + value.patronymic,
      email: value.email,
      phone: value.phone.replace(/\s/g, ''),
      pass1: value.password,
      pass2: value.confirmedPassword,
      user_myid_employee: this.dialogConfig.data.employee.user_myid,
      delegation_user_myid: value.delegation_user_myid,
      is_banned: value.isBanned ? '1' : '',
    }
    this.employeeService.update(employeeRequest).subscribe(
      {
        next: (data) => {
          if (data.response) {
            this.ref.close(data)
          }
        },
        error: (error) => {
          this.messages = [{
            severity: 'error',
            summary: 'Ошибка',
            detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
          }]
        }
      })
  }
}

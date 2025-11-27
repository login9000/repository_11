import { Component } from '@angular/core';
import {AppService} from "../../../../app.service";

@Component({
  selector: 'app-manager-avatar-and-name',
  templateUrl: './manager-avatar-and-name.component.html',
  styleUrls: ['./manager-avatar-and-name.component.css']
})
export class ManagerAvatarAndNameComponent {

  constructor(
    public appService: AppService
  ) {
  }

}

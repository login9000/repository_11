import { Component } from '@angular/core';
import {AppService} from "../../../../app.service";

@Component({
  selector: 'app-sokrof-responsible-avatar-and-name',
  templateUrl: './sokrof-responsible-avatar-and-name.component.html',
  styleUrls: ['./sokrof-responsible-avatar-and-name.component.css']
})
export class SokrofResponsibleAvatarAndNameComponent {

  constructor(
    public appService: AppService
  ) {
  }

}

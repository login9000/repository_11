import {Component, OnInit} from '@angular/core';
import {UserDesktopService} from "../../../user-desktop/services/user-desktop.service";
import {Router} from "@angular/router";
import {AppService} from "../../../../app.service";
import {NewsItem, NewsResponse} from "../../models/input/NewsResponse";

@Component({
  selector: 'app-news-preview',
  templateUrl: './news-preview.component.html',
  styleUrls: ['./news-preview.component.css']
})
export class NewsPreviewComponent implements OnInit {
  
  public globalThis = globalThis;

  constructor(
    public desktopService: UserDesktopService,
    private router: Router,
    private appService: AppService
  ) {
  }

  ngOnInit(): void {
  }

  goToNews(news: NewsItem) {
    let value = this.appService.fakeSocketData$.value;
    if (news.is_unread === '1') {
      value.news.number_unread = value.news.number_unread > 0 ? value.news.number_unread - 1 : 0;
      this.appService.fakeSocketData$.next(value);
    }
    this.router.navigate(['/news/page', {id: news.id}]);
  }
}

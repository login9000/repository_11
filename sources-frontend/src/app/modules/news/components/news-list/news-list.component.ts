import {Component, OnDestroy, OnInit} from '@angular/core';
import {NewsItem} from "../../models/input/NewsResponse";
import {NewsService} from "../../services/news.service";
import {PaginatorState} from "primeng/paginator";
import {AppService} from "../../../../app.service";
import {DialogService} from "primeng/dynamicdialog";
import {NewsEditorDialogComponent} from "../../news-editor-dialog/news-editor-dialog.component";
import {NewsUtils} from "../../NewsUtils";
import {Router} from "@angular/router";
import { MessageService } from "primeng/api";
import { ErrorTranslator } from "../../../../core/error-handle/ErrorTranslator";

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
  providers: [MessageService, DialogService]
})
export class NewsListComponent implements OnInit, OnDestroy {
  news: NewsItem[] = [];
  currentPage: number = 1
  pageSize: number = 12
  first: number = 0
  lastPage: number = 0
  public globalThis = globalThis;

  constructor(
    private newsService: NewsService,
    public appService: AppService,
    private router: Router,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.getAllNews();
    this.appService.fakeSocketData$.subscribe(data => {
      for (let i = data?.news?.data.length - 1; i >= 0; i--){
        const news1 = data?.news?.data[i];
        this.news.unshift({
          id: news1.id,
          date: news1.date,
          header: news1.header,
          text: NewsUtils.replaceNewlinesWithBr(news1.text),
          is_unread: news1.is_unread
        })
      }
    })
  }

  ngOnDestroy(): void {
    // this.appService.fakeSocketData.unsubscribe()
  }

  private getAllNews() {
    globalThis.stateLoadAllNews = '';
    this.newsService.getAllNews(this.currentPage).subscribe({
        next: (response) => {
          globalThis.stateLoadAllNews = 'loaded';
          this.news = response?.data
          this.news.forEach(news => {
            news.text = NewsUtils.replaceNewlinesWithBr(news.text)
          })
          this.lastPage = response.pagination_max_page      
        },
        error: (error) => {
          globalThis.stateLoadAllNews = 'error';
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 30000
          })
        }
      }
    );
  }

  readAll() {
    this.newsService.markAllNewsAsRead()
      .subscribe({
        next: () => {
          const fakeData = this.appService.fakeSocketData$.getValue()
          fakeData.news.number_unread = 0
          this.news.forEach(news => {
            news.is_unread = ''
          })
          this.appService.fakeSocketData$.next(fakeData)
        }
      })
  }

  onPageChange($event: PaginatorState) {
    this.first = $event.first;
    this.currentPage = $event.page + 1;
    this.getAllNews();
  }

  protected readonly frameElement = frameElement;

  loadNews() {
    this.currentPage += 1;
    this.first += this.pageSize;
    this.newsService.getAllNews(this.currentPage).subscribe(response => {
        this.news.push(...response?.data)
        this.lastPage = response.pagination_max_page
      }
    );
  }
  goToNews(news: NewsItem) {
    let value = this.appService.fakeSocketData$.value;
    if (news.is_unread === '1') {
      value.news.number_unread = value.news.number_unread > 0 ? value.news.number_unread - 1 : 0;
      this.appService.fakeSocketData$.next(value);
    }
    this.router.navigate(['/news/page', {id: news.id}]);
  }

  openNewsEditor() {
    const ref = this.dialogService.open(NewsEditorDialogComponent, {
      header: 'Добавление новости',
      width: '800px',
      height: 'auto',
      style: {
        overflowY: 'none'
      },
      baseZIndex: 10000
    });
    ref.onClose.subscribe((response: NewsItem) => {
      if (response) {
        this.getAllNews();
        const fakeData = this.appService.fakeSocketData$.getValue()
        fakeData.news.number_unread += 1
        this.appService.fakeSocketData$.next(fakeData)
      }
    });
  }
}

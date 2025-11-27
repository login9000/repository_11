import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {NewsService} from "../../services/news.service";
import {NewsItem} from "../../models/input/NewsResponse";
import {NewsUtils} from "../../NewsUtils";

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {
  public theNews: NewsItem = {};

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: Params) => {
      this.newsService.getById(params.get('id'))
        .subscribe(theNews => {
          this.theNews = theNews
          this.theNews.text = NewsUtils.replaceNewlinesWithBr(this.theNews.text)
        })
    });
  }

}

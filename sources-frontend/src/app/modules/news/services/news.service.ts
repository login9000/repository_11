import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, of} from "rxjs";
import {NewsItem, NewsResponse} from "../models/input/NewsResponse";
import {API_URL} from "../../../core/constants/api-url";

@Injectable({
  providedIn: 'root',
})
export class NewsService {

  constructor(
    private http: HttpClient
  ) {
  }

  getById(id: number | string): Observable<NewsItem> {
    return this.http.get<any>(API_URL+'get_news', {
      params: {
        id: id
      },
	  "withCredentials": true
    }).pipe(
      map(res => res.response)
    )
  }

  getAllNews(page: number): Observable<NewsResponse> {
    return this.http.get<any>(API_URL+'get_all_news', {
      params: {
        page: page
      },
	  "withCredentials": true
    })
      .pipe(map(res => res.response));
  }

  markAllNewsAsRead(): Observable<any> {
    return this.http.put(API_URL+'mark_all_news_as_read', {}, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true})
  }

  addNews(header: string, text: string): Observable<NewsItem> {
    return this.http.post<NewsItem>(API_URL+'add_news', {
      header: header,
      text: text
    }, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true})
  }
}

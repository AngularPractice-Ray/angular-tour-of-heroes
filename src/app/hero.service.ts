import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';

// Service 用來和後端溝通
// Service 可注入到任何地方，範例注入到 AppModule - providers
// Angular 會建立一個 HeroServide 實體並可分享到任何 class
// 未建立 Service 前，可用指令先指定注入點: ng g s hero --module=app
@Injectable()
export class HeroService {

  constructor() { }

  // 取得資料
  getHeroes(): Observable<Hero[]> {
    return of(HEROES);
  }
}

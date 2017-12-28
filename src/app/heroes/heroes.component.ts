import { Hero } from './../hero';
import { Component, OnInit } from '@angular/core';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  // 英雄清單
  heroes: Hero[];
  // 被選取英雄
  selectedHero: Hero;

  // 注入 Service
  constructor(private heroService: HeroService) { }

  // 初始化
  // HTTP request 從這裏叫用
  ngOnInit() {
    // 取得英雄清單
    this.getHeroes();
  }

  // 選擇英雄
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  // 取得英雄清單
  getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
  }

}

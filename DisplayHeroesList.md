[TOC]

## Display a Heroes List

In this page, you'll expand the Tour of Heroes app to display a list of heroes, and allow users to select a hero and display the hero's details.
### 假資料 Create mock heroes
建立假資料，模擬資料從 Server 來。
Create a file called mock-heroes.ts in the src/app/ folder. Define a HEROES constant as an array of ten heroes and export it. The file should look like this.
src/app/mock-heroes.ts
```typescript
import { Hero } from './hero';

export const HEROES: Hero[] = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];
```
#### 匯入 heroes

在 HeroesComponent 匯入假資料 HERORS 
src/app/heroes/heroes.component.ts (import HEROES)
```typescript
import { HEROES } from '../mock-heroes';
```
Add a heroes property to the class that exposes these heroes for binding.
```typescript      
heroes = HEROES;
```
### 清單用 *ngFor
```html
<li *ngFor="let hero of heroes">
```
The *ngFor is Angular's repeater directive. 重複列表中每個元素的主要元素。
In this example
- <li> is the host element
- heroes is the list from the HeroesComponent class.
- hero holds the current hero object for each iteration through the list. 
  **Don't forget the asterisk (*)** in front of ngFor. It's a critical part of the syntax.
  After the browser refreshes, the list of heroes appears.
> asterisk(*) Angular 設計，會新增或刪除 DOM 物件的 directive 都會加上此語法。

### Style the heroes
方便使用多個在不同地方重複使用的自定義 css，Angular 設計 @Component.styles 陣列 或是多個樣式檔 identified in the @Component.styleUrls 陣列。
在 CLI 產生 HeroesComponent 時就會產生空的 heroes.component.css stylesheet 並且在 HeroesComponent 表示如下 
src/app/heroes/heroes.component.ts (@Component)

```typescript
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
```
Styles and stylesheets identified in @Component metadata are scoped to that specific component. The heroes.component.css styles apply only to the HeroesComponent and don't affect the outer HTML or the HTML in any other component.
### Master/Detail
When the user clicks a hero in the master list, the component should display the selected hero's details at the bottom of the page.
In this section, you'll listen for the hero item click event and update the hero detail.
### 事件綁定 Add a click event binding
範例 Add a click event binding to the <li> like this:
heroes.component.html (template excerpt)
```html
<li *ngFor="let hero of heroes" (click)="onSelect(hero)">
```
當點擊 <li> 時，就可以叫用在 HerorsComponent 的方法 onSelect()
#### Add the click event handler

改名 hero property to selectedHero but don't assign it.
新增方法 onSelect(), which assigns the clicked hero from the template to the component's selectedHero.
src/app/heroes/heroes.component.ts (onSelect)
```typescript
selectedHero: Hero;

onSelect(hero: Hero): void {
  this.selectedHero = hero;
}
```
### Update the details template
The template still refers to the component's old hero property which no longer exists. Rename hero to selectedHero.
heroes.component.html (selected hero details)
```html
<h2>{{ selectedHero.name | uppercase }} Details</h2>
<div><span>id: </span>{{selectedHero.id}}</div>
<div>
  <label>name:
    <input [(ngModel)]="selectedHero.name" placeholder="name">
  </label>
</div>
```
### 隱藏 Hide empty details with *ngIf
出現錯誤訊息
```tex
HeroesComponent.html:3 ERROR TypeError: Cannot read property 'name' of undefined
```
Now click one of the list items. The app seems to be working again. The heroes appear in a list and details about the clicked hero appear at the bottom of the page.
#### What happened?

When the app starts, the selectedHero is undefined by design.
Binding expressions in the template that refer to properties of selectedHero — expressions like {{selectedHero.name}} — must fail because there is no selected hero.
#### The fix

The component should only display the selected hero details if the selectedHero exists.
Wrap the hero detail HTML in a <div>. Add Angular's *ngIf directive to the <div> and set it to selectedHero.
Don't forget the asterisk (*) in front of ngIf. It's a critical part of the syntax.
src/app/heroes/heroes.component.html (*ngIf)
```html
<div *ngIf="selectedHero">
  <h2>{{ selectedHero.name | uppercase }} Details</h2>
  <div><span>id: </span>{{selectedHero.id}}</div>
  <div>
    <label>name:
      <input [(ngModel)]="selectedHero.name" placeholder="name">
    </label>
  </div>
</div>
```
After the browser refreshes, the list of names reappears. The details area is blank. Click a hero and its details appear.
#### Why it works

When selectedHero is undefined, the ngIf removes the hero detail from the DOM. There are no selectedHero bindings to worry about.
When the user picks a hero, selectedHero has a value and ngIf puts the hero detail into the DOM.
### 使用 [class.some-css-class] 
It's difficult to identify the selected hero in the list when all <li> elements look alike.
If the user clicks "Magneta", that hero should render with a distinctive but subtle background color like this:
￼ 
That selected hero coloring is the work of the .selected CSS class in the styles you added earlier. You just have to apply the .selected class to the <li> when the user clicks it.
The Angular class binding makes it easy to add and remove a CSS class conditionally. Just add [class.some-css-class]="some-condition" to the element you want to style.
Add the following [class.selected] binding to the <li> in the HeroesComponent template:
heroes.component.html (toggle the 'selected' CSS class)
```html
[class.selected]="hero === selectedHero"
```
When the current row hero is the same as the selectedHero, Angular adds the selected CSS class. When the two heroes are different, Angular removes the class.
The finished <li> looks like this:
heroes.component.html (list item hero)
```html
<li *ngFor="let hero of heroes"
  [class.selected]="hero === selectedHero"
  (click)="onSelect(hero)">
  <span class="badge">{{hero.id}}</span> {{hero.name}}
</li>
```
### Final code review
Your app should look like this live example / download example. 
Here are the code files discussed on this page, including the HeroesComponent styles.

src/app/heroes/heroes.component.ts
src/app/heroes/heroes.component.html
src/app/heroes/heroes.component.css


```typescript
	1.	import { Component, OnInit } from '@angular/core';
	2.	import { Hero } from '../hero';
	3.	import { HEROES } from '../mock-heroes';
	4.	 
	5.	@Component({
	6.	  selector: 'app-heroes',
	7.	  templateUrl: './heroes.component.html',
	8.	  styleUrls: ['./heroes.component.css']
	9.	})
	10.	export class HeroesComponent implements OnInit {
	11.	 
	12.	  heroes = HEROES;
	13.	 
	14.	  selectedHero: Hero;
	15.	 
	16.	 
	17.	  constructor() { }
	18.	 
	19.	  ngOnInit() {
	20.	  }
	21.	 
	22.	  onSelect(hero: Hero): void {
	23.	    this.selectedHero = hero;
	24.	  }
	25.	}
    
```

### Summary
The Tour of Heroes app displays a list of heroes in a Master/Detail view.
The user can select a hero and see that hero's details.
You used *ngFor to display a list.
You used *ngIf to conditionally include or exclude a block of HTML.
You can toggle a CSS style class with a class binding.
Display a Heroes List
Create mock heroes
Displaying heroes
List heroes with *ngFor
Style the heroes
Master/Detail
Add a click event binding
Add the click event handler
Update the details template
Hide empty details with *ngIf
Style the selected hero
Final code review
Summary
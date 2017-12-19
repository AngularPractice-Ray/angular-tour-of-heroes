[TOC]

---

## The Hero Editor

 Next you will create a new component to display hero information and place that component in the application shell.
### 建立新元件 Create the heroes component
Using the Angular CLI, 產生新元件命名為 heroes
```cmd
ng generate component heroes
```
The CLI creates a new folder, src/app/heroes/ and generates the three files of the HeroesComponent.
The HeroesComponent class file is as follows:
app/heroes/heroes.component.ts (initial version)
  ```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
  ```
**@Component**

- 一 decorator function 讓 Angular 用來指定對應的 metadata 給該元件
- 需從 Angualr core library 匯入

The CLI generated three metadata properties:

1. selector— the components CSS element selector
2. templateUrl— the location of the component's template file.
3. styleUrls— the location of the component's private CSS styles.

> metadata: Angular needs to know how the pieces of your application fit together and what other files and libraries the app requires. This information is called metadata

**'app-heroes'** 
對應到在父組件的頁面模板，用來標示這個組件的 HTML 元素名稱。代表 HeroesComponent

**ngOnInit** 
Angular 在建立此 component 後會快速呼叫 ngOnInit，一些初始邏輯就可放在裡面。

**export**
有 export，這個 component class 才能在其他地方 import。（如同 AppModule)



#### 新增 Add a hero property
heroes.component.ts (hero property)
```typescript
hero = 'Windstorm';
```

#### 顯示 Show the hero
heroes.component.html

```html
{{hero}}
```
#### Show the HeroesComponent view
在 AppComponent 外殼顯示 HeroesComponent，打開 src/app/app.component.html，並加入 <app-heroes>
```html
<h1>{{title}}</h1>
<app-heroes></app-heroes>
```

---

### 建立類別 Create a Hero class

在 src/app 資料夾底下新增 Hero.ts

src/app/hero.ts
```typescript
export class Hero {
  id: number;
  name: string;
}
```
到 HeroesComponent 匯入 Hero 類別，並重構如下
src/app/heroes/heroes.component.ts
```typescript
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  constructor() { }

  ngOnInit() {
  }

}
```
#### Show the hero object
heroes.component.html (HeroesComponent's template)
```html
<h2>{{ hero.name }} Details</h2>
<div><span>id: </span>{{hero.id}}</div>
<div><span>name: </span>{{hero.name}}</div>
```
#### Format with the UppercasePipe

變大寫

```html
<h2>{{ hero.name | uppercase }} Details</h2>
```


---

### Pipes

Angular 提供 Pipes 可以轉換字串，比如 金額、日期，不同樣式的表示，也可以建立自己的 pipe。

---

### 雙向繫結 Two-way binding
重構 HeroesComponent template 如下
src/app/heroes/heroes.component.html (HeroesComponent's template)
```html
<div>
  <label>name:
      <input [(ngModel)]="hero.name" placeholder="name">
  </label>
</div>
```
**[(ngModel)]** Angular's two-way data binding 語法 

***The missing FormsModule***

當加入 [(ngModel)] 後會看到一段 error 如下
```css
Template parse errors:
Can't bind to 'ngModel' since it isn't a known property of 'input'.
```
因為 ngModel 不是預設使用，它是屬於 FormsModule。

### AppModule

#### metadata 說明

因為 Angular 需要知道應用程式各個部件如何組合以及需要哪些檔案和 libraies，這樣的資訊就叫做 metadata。
除了在 component classes 會加入 @Component decorators，其他關鍵性 metadata 都在 @NgModule decorators 
重要的是 @NgModuledecorator 表示最高層級的 AppModule class，Angular CLI 產生專案就會將 AppModule class 放在 src/app/app.module.ts。在這個地方我們要選擇性地加入 FormsModule。

#### Import FormsModule

Open AppModule (app.module.ts) and import the FormsModule symbol from the @angular/forms library. 
app.module.ts (FormsModule symbol import)
```typescript
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

// @NgModule metadata's imports array,
// which contains a list of external modules that the app needs.
imports: [
  BrowserModule,
  FormsModule
],
```
#### Declare HeroesComponent

所有 component 必須宣告在一個 NgModule，當使用 Angular CLI 建立 Component 時，就自動在 AppModule 裡面宣告
Open src/app/app.module.ts and find HeroesComponent imported near the top. 
```typescript
import { HeroesComponent } from './heroes/heroes.component';
```

The HeroesComponent is declared in the @NgModule.declarations array. 
```typescript
declarations: [
  AppComponent,
  HeroesComponent
],   
```


### Summary
•	You used the CLI to create a second HeroesComponent.
•	You displayed the HeroesComponent by adding it to the AppComponent shell. 
•	You applied the UppercasePipe to format the name.
•	You used two-way data binding with the ngModel directive.
•	You learned about the AppModule.
•	You imported the FormsModule in the AppModule so that Angular would recognize and apply the ngModel directive. 
•	You learned the importance of declaring components in the AppModule and appreciated that the CLI declared it for you.
•	The Hero Editor
•	Create the heroes component
•	Add a hero property
•	Show the hero
•	Show the HeroesComponent view
•	Create a Hero class
•	Show the hero object
•	Format with the UppercasePipe
•	Edit the hero
•	Two-way binding
•	The missing FormsModule
•	AppModule
•	Import FormsModule
•	Declare HeroesComponent
•	Final code review
•	Summary

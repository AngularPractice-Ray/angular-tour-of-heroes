[TOC]

## Services

本章重點

1. 透過 service 取資料
2. 異步處理
3. service 包 service 

### 為什麼用 services？
現實世界的運作

- Components 職責在顯示資料，不要直接碰觸或保存資料。
- Services 職責在於向 server 請求取得資料，以便在不同的 class 之間可以分享使用。

接下來會建立一 HeroService 假裝從 Service 取得資料，並且從 HeroesComponent constructor 注入到 HeroesComponent。以下兩個動作：

1.	在 HeroService 傳送 message.
  2.在 MessagesComponent 顯示傳送來的 message.
### 建立 service
使用 Angular CLI 產生
```cmd
1. ng generate service hero
2. 建立 service 同時，也在 AppModule 的 provider 提供此 service
ng generate service hero --module=app 
```

src/app/hero.service.ts (new service)
```typescript
import { Injectable } from '@angular/core';

@Injectable() // <==== 下面說明
export class HeroService {

  constructor() { }

}
```

### @Injectable() services

The @Injectable() decorator 

- 讓 Angular 得知此 service 本身可能會注入依賴關係。
- 預設空的，但Angular指導手冊強列建議保留，檢查的 linter 也會強制要求。

### service

#### 取資料

HeroService 可從任何地方取得資料，例如：a web service, local storage, or a mock data source。資料取得不需要在 Components 實作，這也代表 Components 不用知道 Services 運作，兩個職責可以分離。

範例假資料匯入 Import the Hero and HEROES.

```typescript
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
```
新增方法 getHeroes 回傳資料
```typescript
getHeroes(): Hero[] {
  return HEROES;
}
```

#### Provide the HeroService

想讓 Angular 將 Service 注入到 HeroesComponet 使用，必須先在 依賴注入系統 提供Service。下面列出幾個地方可以提供：HeroesComponent, AppComponent, AppModule；每個方式各有優缺。

範例使用最普遍的方式，提供在 AppModule，此動作也可以在一開始建立 services 的時候讓 CLI 來自動完成

```cmd
ng generate service hero --module=app
```

如果一開始沒用 CLI 建立，則打開 AppModule class, 匯入 HeroService 並新增在 @NgModule.providers 陣列中
src/app/app.module.ts (providers)

```typescript
providers: [ HeroService, MessageService ],
```

#### @NgModule.providers

此 providers 陣列會讓 Angular 知道去建立一個 對應的 services 實體，並可注入在任何 class 中。

### 在 Component 使用 service 

#### 匯入 service

用 HeroService 替代 HEROES import
src/app/heroes/heroes.component.ts (import HeroService)
```typescript
import { HeroService } from '../hero.service';
```

Replace the the definition of the heroes property with a simple declaration.
```typescript
heroes: Hero[];
```

#### 注入（Inject）service

在 constructor 加入一個私有參數，型別 HeroService。
```typescript
constructor(private heroService: HeroService) { }
```

當 Angualr 創建一個 HeroesComponent，依賴注入系統會設置一個 HeroService 單一實體到參數 heroService。
#### 取得 service 資料

在 Component 建立方法從 service 取得資料
```typescript
getHeroes(): void {
  this.heroes = this.heroService.getHeroes();
}
```

#### 在 ngOnInit 叫用初始化方法

每個 component ／directive 都有其生命週期，在叫用 constructor 創建 component/directive 後，Angular 會再依序叫用 hook methods。請參照 [Lifecycle Hooks](https://angular.io/guide/lifecycle-hooks)。簡易重點：

- constructor 只將 constructor parameters 指向 properties，做簡易的初始化。
- 接著 Angular 叫用 ngOnChanges，設置（重置）資料綁定到 Input properties。
- 接著 Angualr 叫用 ngOnInit，顯示 資料綁定 properties 並且設置 directive/component 之後才初始化。

因此，所有要初始叫用的方法都要放到 ngOnInit（lifecycle hook method）

```typescript
ngOnInit() {
  this.getHeroes();
}
```

> 記得 typescript 在執行時期還是要轉成 javascript。那在 javascript 的 hoisting，會將"變數宣告" 跟 "函式宣告式" 往上提之後，再設值。

### Observable data
HeroService.getHeroes() 方法有一個同步簽章，意味著 HeroService 可以同步獲取 heroes。 所以當 HeroesComponent 叫用 getHeroes()，就好像可以同步獲取 heroes 一樣。
```typescript
this.heroes = this.heroService.getHeroes();
```

**這個方式在現實 app 不會 work!**

範例可以 work 的原因在於 service 是直接回傳假資料，但現實 app 是需要等待從遠端異步操作取得資料，所以 HeroService 必須等待 server 回應，換句話說，getHeroes() 無法立即回傳資料，而且 browser 在等待 service 同時也並不會被鎖住。因此，HeroService.getHeroes 必須用一個『可以帶callback』、『可以回傳 Promise』或『可以回傳一個 Observable』 的**異步簽章**。

在此範例，由於最後將使用 Angular HttpClient.get 方法來獲取 heroes 加之 HttpClient.get() 會傳回一個Observable，因此，HeroService.getHeroes() 將傳回 Observable。

#### Question: What is Observable data?

Observable 是 RxJS library 裡面其中一個關鍵 class。And ???

#### Observable HeroService

在下一個教學 HTTP，你將會學到用 Angular's HttpClient methods 回傳 RxJS Observables。在此範例，你將會模擬在 server 使用 RxJS 的 of() function 取得資料。

在 HeroService file and import the Observable 和 of from RxJS.

src/app/hero.service.ts (Observable imports)

```typescript
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
```

替換 getHeroes method
```typescript
getHeroes(): Observable<Hero[]> {
  return of(HEROES);
}
```
#### of() 

of(HEROES) 會回傳一個 Observable<Hero[]>
在下一章，你將會叫用 HttpClient.get<Hero[]>() （同樣回傳 Observable<Hero[]>，來源自 HTTP response）。

#### Observable.subscribe()

現在 HeroService.getHeroes 不再回傳 Hero[]，而是回傳 Observable<Hero[]>，與之對應叫用該 service 的 HeroesComponent 就需要做調整，更新 getHeroes 方法如下：

hero.component.ts (Observable)
hero.component.ts (Original)

```typescript
getHeroes(): void {
  this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
}
```

Observable.subscribe() 關鍵區別：
之前版本，component 的 heroes 屬性指向 Hero[]，此同步處理只能在（1）server 立即傳回資料（2） 在等待 server 回應前，browser UI 都是凍結情形下，才能成功。然而，當 HeroService 向遠端 server 發出請求時是不會 work的。

新的版本，在 component 所要指向的屬性，等待的是 Observable<T[]>，透過 Observable.subscribe 傳送 T[] 到 callback，在裡面才設置好 component 屬性資料。如此異步處理，當 HeroService 向遠端 server 發出請求時才會讓 屬性=資料 work。

### service-in-service and inject it to component

擴充實做 MessagesComponent 顯示來自 MessageService 傳來的 Message 訊息，需要：

- MessageService 注入到 HeroService
- MessagesComponent 顯示 HeroService 成功傳送的 heroes 訊息

In this section you will 
•	add a MessagesComponent that displays app messages at the bottom of the screen.
•	create an injectable, app-wide MessageService for sending messages to be displayed
•	inject MessageService into the HeroService
•	display a message when HeroService fetches heroes successfully.
#### Create MessagesComponent

```cmd
ng generate component messages
```

修改頁面，/src/app/app.component.html
```html
<h1>{{title}}</h1>
<app-heroes></app-heroes>
<app-messages></app-messages>
```

#### Create the MessageService

```cmd
ng generate service message --module=app
```

添加內容，公開 messages 和兩個公開方法，/src/app/message.service.ts

```typescript      
import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
	messages: string[] = [];
	 
	add(message: string) {
		this.messages.push(message);
	}
	 
	clear() {
		this.messages = [];
    }
}
```
#### Service inject into the HeroService

/src/app/hero.service.ts (import MessageService)
```typescript
import { MessageService } from './message.service';
```
constructor 宣告 private messageService property. 
```typescript
constructor(private messageService: MessageService) { }
```
**This is a typical "service-in-service" scenario**: 將 MessageService 注入到 HeroService，HeroService 再注入 HeroesComponent。
#### 從 HeroService 傳送 message

Modify the getHeroes method to send a message when the heroes are fetched.

```typescript
getHeroes(): Observable<Hero[]> {
  // Todo: send the message _after_ fetching the heroes
  this.messageService.add('HeroService: fetched heroes');
  return of(HEROES);
}
```
#### 顯示從 HeroService 來的 message

MessagesComponent 負責顯示所有訊息
/src/app/messages/messages.component.ts (import MessageService)
```typescript
import { MessageService } from '../message.service';
```
constructor 注入 MessageService，為了綁定到頁面上所以使用 public messageService property。
```typescript
constructor(public messageService: MessageService) {}
```
***需公開 component properties，Angular 才能綁定***
#### 綁定到 MessageService

src/app/messages/messages.component.html
```html
<div *ngIf="messageService.messages.length">

  <h2>Messages</h2>
  <button class="clear"
          (click)="messageService.clear()">clear</button>
  <div *ngFor='let message of messageService.messages'> {{message}} </div>

</div>
```

此頁面直接綁定 component 的 messageService。

- The *ngIf only displays the messages area if there are messages to show.
- An *ngFor presents the list of messages in repeated <div> elements.
- An Angular event binding binds the button's click event to MessageService.clear().
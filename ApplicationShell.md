[TOC]
---
## The Application Shell
### 安裝 Install the Angular CLI

```cmd
npm install -g @angular/cli
```

### 建立 Create a new application
使用 CLI command 指令建立專案 angular-tour-of-heroes.
```cmd
ng new angular-tour-of-heroes
```

### 服務 Serve the application

為應用程式提供服務

```cmd
cd angular-tour-of-heroes
ng serve --open
```

- ng serve command 建置 app、啟動開發 server，監控來源資料夾並在檔案有更新時做重新建置
- --open 會開啟瀏覽器 http://localhost:4200/

### 元件 Angular components
預設專案由 AppComonent 控制。元件是 Angular 應用程序的基本構建塊，用來顯示頁面資料，監聽使用者輸入還有輸入動作。

### 修改 Change the application title
打開 src/app 資料夾，AppComponent 分散為下方三種檔案：
1. app.component.ts— the component class code, written in TypeScript. 
2. app.component.html— the component template, written in HTML.
3. app.component.css— the component's private CSS styles.

打開元件類別檔案 app.component.ts 並修改 title
```typescript
title = 'Tour of Heroes’;
```

打開元件頁面檔案 app.component.html 並替換內容

```html
<h1>{{title}}</h1>
```

- {{}} Angular 綁定值的語法

完整 code 如下：

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
}
```
### 樣式 Add application styles
預設 css 是空的，請打開 src/styles.css（公用樣式檔） 並替換內容

```css      
	1.	/* Application-wide Styles */
	2.	h1 {
	3.	  color: #369;
	4.	  font-family: Arial, Helvetica, sans-serif;
	5.	  font-size: 250%;
	6.	}
	7.	h2, h3 {
	8.	  color: #444;
	9.	  font-family: Arial, Helvetica, sans-serif;
	10.	  font-weight: lighter;
	11.	}
	12.	body {
	13.	  margin: 2em;
	14.	}
	15.	body, input[text], button {
	16.	  color: #888;
	17.	  font-family: Cambria, Georgia;
	18.	}
	19.	/* everywhere else */
	20.	* {
	21.	  font-family: Arial, Helvetica, sans-serif;
	22.	}
```

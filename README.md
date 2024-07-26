# [Next 記帳小工具](https://nextjs-practice-liart-eight.vercel.app/)

註冊登入帳號密碼，提供個人收入以及支出紀錄。

# 目錄

- [功能說明](#功能說明)
- [技術架構](#技術架構)

# 功能說明

- 使用者可創建個人帳號密碼或是選擇使用 Google 帳號進行登入
- 連接資料庫，紀錄保存個人帳號收入以及支出信息
- 保留使用者登入直到使用者關閉分頁或登出個人帳號

# 技術架構

- 前端框架：React、Next.js、TypeScript、Tailwind
- 後端串接：Firebase
- 資料庫：Firestore
- 部署：Vercel
- 版本控制：GitHub
- 其他套件：react-toastify

# 使用說明

此專案使用[Next.js](https://nextjs.org/)框架，並使用[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)建立專案。

## 專案建置

### 快速開始

確認 node 版本

```bash
node -v

// v20.11.1
```

確認 git 版本

```bash
git -v

// git version 2.43.0.windows.1
```

```bash
npx create-next-app@latest
```

連接 GitHub

````bash
// 以 main 來取代原本的 master
git branch -M main

// 連接遠端Github
git remote add origin https://github.com/angelc1997/bootcamp-next-project.git

// 推送至正式版本
git push -u origin main

// 以develop分支進行程式碼開發與更新
git branch develop

```


### 啟動伺服器

```bash
npm run dev
````

使用瀏覽器開啟[http://localhost:3000](http://localhost:3000)

### 機密資訊 .env.local

### 安裝

firebase 串接

```bash
npm i firebase

```

react-toastify 套件

```bash
npm i react-toastify

### 部署至 Vercel

```

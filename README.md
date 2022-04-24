<h2 align="center"><a href="https://reposearching.netlify.app/">Demo</a></h2>

![gif](https://res.cloudinary.com/dhawohjee/image/upload/v1650803945/other/org_repo_-_Google_Chrome_2022-04-24_20-34-53__kt8edr.gif)

## 架構
將 App 分為 Herder 與 Main 兩個區塊，useFetchRepo 讀取 API 並將獲取資料及狀態 ( loading , error... ) 回傳至 App ，如果搜尋字串、篩選器或是頁數有變動，則觸發 useFetchRepo 中的 useEffect 並再次讀取。 Infinite Scroll 利用 IntersectionObserver web API 觀察最底部的 element ，如果進入視窗的範圍則將頁數增加。以下為簡易架構圖。

<p align="center">
  <img src="https://res.cloudinary.com/dhawohjee/image/upload/v1650816775/other/repo.drawio_1_n0t12j.png" />
</p>

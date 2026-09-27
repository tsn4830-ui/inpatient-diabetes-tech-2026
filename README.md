# 住院糖尿病科技臨床實戰

39 張繁體中文 PPT-style 網頁投影片，供醫師教學。

**光田新陳代謝科｜曾士婷醫師**

- 正式網站：https://inpatient-diabetes-tech-2026.pages.dev/
- PDF：https://inpatient-diabetes-tech-2026.pages.dev/inpatient-diabetes-technology.pdf
- 主要來源：Olsen MT, et al. _An International Position Statement on Practical Approaches for Inpatient Continuous Glucose Monitoring, Insulin Pumps, and Automated Insulin Delivery Systems in Adults_. Diabetes Care. 2026. DOI: [10.2337/dci26-0091](https://doi.org/10.2337/dci26-0091).
- 同篇論文補充資料：[10.2337/figshare.32648427](https://doi.org/10.2337/figshare.32648427)，簡要摘要其原則；新增的 9 項原圖表來自主 PDF。

## 使用

左右方向鍵、Page Up/Down、Home/End、上一張／下一張；手機水平滑動換頁。目錄可跳頁，網址 `#8` 可直接開第 8 張。「教學備註」另行展開，預設不投影。全螢幕使用瀏覽器 Fullscreen API；不支援時會提示使用瀏覽器功能。

「PDF 講義」下載固定 39 頁版本；「列印」可另存 PDF，版面 16:9，一張投影片一頁，請開啟背景圖形並關閉瀏覽器頁首頁尾。桌面採 1280 × 720 投影畫布，手機直向改為可閱讀的單欄版面。

## 內容與來源

- `site/index.html`：全部投影片內容、完整引用與頁碼。
- `site/styles.css`：投影、手機、列印樣式。
- `site/script.js`：互動操作。
- `site/slides.json`：內容資料與教學備註。
- `speaker-notes.md`：逐頁備註。
- `source-map.md`：來源頁碼對照。

上傳 PDF 第 1 頁為 graphical abstract，第 2–14 頁對應原文頁碼 1–13。每張頁尾附 PDF／原文頁碼。保留原文建議分級；E 為專家意見。以非重症住院成人為適用範圍，不能直接外推兒童。保留中文教學重繪，新增原 PDF 全部 9 項圖表（Graphical abstract、Figure 1–3、Table 1–5），每項各自獨立成頁並可放大。未散布完整原始 PDF。既有個人 logo 由使用者技能資產取得，未捏造醫院 logo。此教學整理不代表學會或醫院另行背書。

## 本機預覽

無需安裝套件或編譯：

```sh
python3 -m http.server 8765 --directory site
```

開啟 http://localhost:8765 。透過 HTTP 預覽可載入 JSON 備註；直接以 file:// 開啟時瀏覽器可能限制備註載入。

## Cloudflare Pages

本次以已登入的 Wrangler **Direct Upload** 發布；GitHub 保存同版原始碼。此專案沒有宣稱已啟用 Git push 自動部署。

```sh
npx wrangler login
npx wrangler pages deploy site --project-name inpatient-diabetes-tech-2026 --branch main
```

要改用 Git 整合自動部署：

1. Cloudflare → Workers & Pages → Create application → Pages → Connect to Git。
2. 選此 GitHub repository，production branch 選 `main`。
3. Framework 選 None；Build command 留空；Build output directory 填 `site`；Root directory 留空。
4. Save and Deploy。若網址改變，更新 `index.html` 的 canonical／Open Graph、QR code 與此 README。

Cloudflare 的 Direct Upload 專案不能原地切換為 Git integration；需建立新的 Git 整合專案。也可為目前專案另外配置自己的 CI。

官方說明：[Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/)、[Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/)、[Static HTML](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)。

## GitHub Pages（備用）

已附手動觸發的 `.github/workflows/pages.yml`。在 GitHub Settings → Pages 選 GitHub Actions，再於 Actions 手動執行 Deploy GitHub Pages，即可部署 `site/`。首次使用者需有設定 Pages 的權限。此備用流程與 Cloudflare 無關，不需 Cloudflare 密鑰。

## 更新與驗證

同步修改 `index.html` 和 `slides.json` 的內容與備註，更新來源對照及講義。發布前檢查所有 39 張內容、來源、手機橫向溢出、鍵盤／滑動、目錄、全螢幕、PDF 頁數及下載連結。網站無後端、不收集病人資料、不依賴 CDN 字體。

原文版權歸 ADA／EASD 等原權利人；既有 logo 權利歸原權利人。未替第三方素材授予新的使用權。

## 原文圖表與免費圖片

新增 9 張原圖表頁後共 39 張。網站上方「圖表索引」可直接跳轉全部原圖表；點原圖可放大並以 +/− 調整，Esc 關閉。圖片保留完整英文標籤、標題及圖說。

新增 2 張免費授權照片（CGM、pump／infusion set），詳見 `image-credits.md` 與網站 `images-and-sources.html`。`original-figures.json` 紀錄 PDF 頁碼、擷取區域與插入章節，範圍單位為 PDF point。

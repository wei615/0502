let capture;
let overlayGraphics;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全螢幕畫布
  background('#2f6690'); // 設定背景顏色
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始影像，僅顯示在畫布上

  // 建立與視訊畫面相同大小的圖形
  overlayGraphics = createGraphics(capture.width, capture.height);
  drawOverlayGraphics(); // 繪製 overlayGraphics 的內容
}

function draw() {
  background('#2f6690'); // 確保背景顏色持續更新
  let x = (width - capture.width) / 2; // 計算影像的水平中心位置
  let y = (height - capture.height) / 2; // 計算影像的垂直中心位置

  // 繪製攝影機影像
  image(capture, x, y, capture.width, capture.height);

  // 繪製 overlayGraphics 在視訊畫面上方
  image(overlayGraphics, x, y, capture.width, capture.height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時，調整畫布大小
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 更新影像大小

  // 更新 overlayGraphics 的大小
  overlayGraphics = createGraphics(capture.width, capture.height);
  drawOverlayGraphics(); // 重新繪製 overlayGraphics 的內容
}

function drawOverlayGraphics() {
  overlayGraphics.background(0); // 設定背景為黑色
  overlayGraphics.noStroke();

  overlayGraphics.push(); // 儲存當前繪圖設定
  overlayGraphics.translate(overlayGraphics.width, 0); // 將畫布的原點移到右上角
  overlayGraphics.scale(-1, 1); // 水平翻轉畫布

  // 每隔 20 繪製一個圓
  for (let y = 0; y < overlayGraphics.height; y += 20) {
    for (let x = 0; x < overlayGraphics.width; x += 20) {
      // 從 capture 中取得相對應位置的顏色
      let col = capture.get(x, y);
      overlayGraphics.fill(col); // 設定圓的顏色
      overlayGraphics.ellipse(x + 10, y + 10, 15, 15); // 繪製圓，中心點偏移 10
    }
  }

  overlayGraphics.pop(); // 恢復繪圖設定
}

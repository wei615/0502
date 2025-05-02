let capture;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全螢幕畫布
  background('#2f6690'); // 設定背景顏色
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始影像，僅顯示在畫布上
}

function draw() {
  background('#2f6690'); // 確保背景顏色持續更新
  let x = (width - capture.width) / 2; // 計算影像的水平中心位置
  let y = (height - capture.height) / 2; // 計算影像的垂直中心位置
  image(capture, x, y, capture.width, capture.height); // 在畫布上繪製影像
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時，調整畫布大小
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 更新影像大小
}

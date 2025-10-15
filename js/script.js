import { HorizontalLoopSlider } from "./modules/HorizontalLoopSlider.js";

// オプションなしでの使用
// new HorizontalLoopSlider('.js-loop-slider');

// カスタムオプションでの使用
const slider = new HorizontalLoopSlider('.js-loop-slider', {
  speed: 80, // スライド速度（px/秒）
});

const sliderParallax = new HorizontalLoopSlider('.js-loop-slider-parallax ', {
  speed: 80, // スライド速度（px/秒）
  parallax: true // パララックスを有効化
});



import { HorizontalLoopSlider } from "./modules/HorizontalLoopSlider.js";

// オプションなしでの使用
// new HorizontalLoopSlider('.js-loop-slider');

// カスタムオプションでの使用
const slider = new HorizontalLoopSlider('.js-loop-slider', {
  speed: 60, // スライド速度（px/秒）
  // direction: 'left' // 左方向にスライド（デフォルト）
});

const sliderReverse = new HorizontalLoopSlider('.js-loop-slider-reverse', {
  speed: 60, // スライド速度（px/秒）
  direction: 'right' // 右方向にスライド
});

const sliderParallax = new HorizontalLoopSlider('.js-loop-slider-parallax', {
  speed: 60, // スライド速度（px/秒）
  parallax: true, // パララックスを有効化
  // direction: 'left' // 左方向にスライド（デフォルト）
});

const sliderParallaxReverse = new HorizontalLoopSlider('.js-loop-slider-parallax-reverse', {
  speed: 60, // スライド速度（px/秒）
  parallax: true, // パララックスを有効化
  direction: 'right' // 右方向にスライド
});



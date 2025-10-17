# Horizontal Loop Slider

GSAPを使用した、水平方向に無限ループする画像スライダーです。パララックス効果やレスポンシブ対応、方向切り替えなどの機能を備えています。

## 特徴

- **無限ループ**: 途切れることなく連続してスライドが流れる
- **パララックス効果**: 画像に視差効果を追加可能（オプション）
- **双方向対応**: 左右どちらの方向にもスライド可能
- **レスポンシブ**: SP時は自動的に速度が半分になる
- **オプション設定**: 速度や方向、パララックスの有無を自由に設定

## 依存関係

- [GSAP 3.x](https://greensock.com/gsap/)

## HTML構造

```html
<div class="p-loop-slider">
  <div class="p-loop-slider__wrapper js-loop-slider">
    <div class="p-loop-slider__item js-loop-slide">
      <img src="images/img_01.jpg" alt="" width="1200" height="500">
    </div>
    <div class="p-loop-slider__item js-loop-slide">
      <img src="images/img_02.jpg" alt="" width="1200" height="500">
    </div>
    <div class="p-loop-slider__item js-loop-slide">
      <img src="images/img_03.jpg" alt="" width="1200" height="500">
    </div>
    <!-- 必要な分だけスライドを追加 -->
  </div>
</div>
```

**クラス名：**
- `.js-loop-slider`: スライダーの初期化に使用するセレクタ
- `.js-loop-slide`: 各スライドアイテムに必須のクラス
- その他のクラス（`.p-loop-slider`など）：CSS用のクラス

## 基本的な使用方法

```javascript
import { HorizontalLoopSlider } from "./modules/HorizontalLoopSlider.js";

// シンプルな使用
new HorizontalLoopSlider('.js-loop-slider');

// オプション付きで使用
new HorizontalLoopSlider('.js-loop-slider', {
  speed: 60,
  parallax: true,
  direction: 'left'
});
```

## オプション

| オプション | 型 | デフォルト | 説明 |
|------------|-----|-----------|------|
| `speed` | number | `50` | スライドの移動速度（px/秒）※SP時は自動的に半分の速度 |
| `parallax` | boolean | `false` | パララックス効果の有効/無効 |
| `direction` | string | `'left'` | スライド方向（`'left'` または `'right'`） |

## レスポンシブ対応

- **PC（768px以上）**: 指定した`speed`で動作
- **SP（767px以下）**: 自動的に`speed`の50%の速度で動作
- **リサイズ時**: デバイス判定が変わると自動で速度も切り替わり

## パララックス効果について

- `parallax: true`を設定すると、スライド方向とは逆方向に画像が移動する視差効果が追加されます
- 左方向スライダー：画像が右方向にパララックス
- 右方向スライダー：画像が左方向にパララックス（逆方向の視差効果）

### パララックス効果の大きさについて

パララックス効果の強さは、画像がスライドアイテムからはみ出す幅の大きさによって決まります。<br>
スライドアイテムからはみ出す幅が大きいほど、視差効果が大きくなります。

## スライドアイテムのサイズとマージン設定

スライドアイテムのサイズ（幅・高さ）とアイテム間のマージンは、CSSで自由に設定できます。

```scss
.p-loop-slider__item {
  width: 22vw;        // スライドアイテムの横幅
  height: 22vw;       // スライドアイテムの高さ
  margin-right: 1vw;  // アイテム間のマージン
}
```



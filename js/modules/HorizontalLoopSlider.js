// import { gsap } from "gsap"; // モジュール版を使用する場合は有効化

export class HorizontalLoopSlider {
  constructor(selector, options = {}) {
    this.wrapper = document.querySelector(selector);
    if (!this.wrapper) return;

    this.items = Array.from(this.wrapper.querySelectorAll(".js-loop-slide"));
    if (!this.items.length) return;

    // デフォルトオプション設定
    this.options = {
      speed: 50, // スライドのループ速度（px/秒）
      parallax: false, // パララックスの有効/無効
      direction: 'left', // スライド方向 ('left' または 'right')
      ...options
    };

    this.speed = this.options.speed;
    this.tween = null;
    this.rafId = null;
    this._resizeTimer = null;

    this.isSP = window.matchMedia('(max-width: 767px)').matches; // SP判定

    // SP時は速度を半分にする
    if (this.isSP) {
      this.speed = this.options.speed * 0.5;
    }

    this.setup(); // ループの初期設定

    // パララックスの制御
    if (this.options.parallax) {
      this.animateParallax = this.animateParallax.bind(this);
      this.rafId = requestAnimationFrame(this.animateParallax);
    } else {
      this.wrapper.classList.add('no-parallax');
    }

    // 方向に応じたクラス付与
    if (this.options.direction === 'right') {
      this.wrapper.classList.add('direction-reverse');
    }

    // SP時はリサイズイベントを監視しない
    if (!this.isSP) {
      this._debouncedResize = this._debouncedResize.bind(this);
      window.addEventListener("resize", this._debouncedResize);
    }
  }

  // リサイズ時のデバウンス処理
  _debouncedResize() {
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(() => {
      const oldIsSP = this.isSP;
      this.isSP = window.matchMedia('(max-width: 767px)').matches;
      
      // 速度を再設定
      if (oldIsSP !== this.isSP) {
        this.speed = this.isSP ? this.options.speed * 0.5 : this.options.speed;
      }
      
      this.setup();
    }, 300);
  }

  setup() {
    if (this.tween) this.tween.kill();

    // ループが途切れないようスライドを複製
    if (this.wrapper.children.length === this.items.length) {
      this.items.forEach((item) => {
        const clone = item.cloneNode(true);
        this.wrapper.appendChild(clone);
      });
    }

    this.items = Array.from(this.wrapper.querySelectorAll(".js-loop-slide"));

    // 各スライドの幅合計（margin含む）を取得
    this.totalWidth = this.items.reduce((sum, item) => {
      const style = window.getComputedStyle(item);
      const width = item.offsetWidth;
      const marginRight = parseFloat(style.marginRight || 0);
      return sum + width + marginRight;
    }, 0);

    // 方向に応じて初期位置を設定
    if (this.options.direction === 'right') {
      gsap.set(this.wrapper, { x: -(this.totalWidth / 2) });
    } else {
      gsap.set(this.wrapper, { x: 0 });
    }

    // 方向に応じてアニメーション方向を設定
    const moveDistance = this.options.direction === 'right' 
      ? `+=${this.totalWidth / 2}` 
      : `-=${this.totalWidth / 2}`;

    this.tween = gsap.to(this.wrapper, {
      x: moveDistance,
      duration: (this.totalWidth / 2) / this.speed,
      ease: "none",
      repeat: -1,
    });
  }

  animateParallax() {
    const winWidth = window.innerWidth;

    this.items.forEach((item) => {
      const img = item.querySelector("img");
      if (!img) return;

      const rect = item.getBoundingClientRect();
      const itemWidth = rect.width;
      const centerX = rect.left + itemWidth / 2;
      const imgWidth = img.offsetWidth;
      const offsetRange = imgWidth - itemWidth;

      // 画面に入っているかどうかの判定
      const visibleStart = -itemWidth * 0.5;
      const visibleEnd = winWidth + itemWidth * 0.5;
      const isVisible = centerX > visibleStart && centerX < visibleEnd;

      if (!isVisible) {
        gsap.set(img, { x: 0 });
        return;
      }

      // 方向に応じてパララックスを調整
      let translateX;
      
      if (this.options.direction === 'right') {
        const parallaxStart = -itemWidth;
        const parallaxEnd = winWidth + itemWidth;
        let ratio = (centerX - parallaxStart) / (parallaxEnd - parallaxStart);
        ratio = gsap.utils.clamp(0, 1, ratio);
        translateX = -ratio * offsetRange;
      } else {
        const parallaxStart = winWidth + itemWidth;
        const parallaxEnd = -itemWidth;
        let ratio = (parallaxStart - centerX) / (parallaxStart - parallaxEnd);
        ratio = gsap.utils.clamp(0, 1, ratio);
        translateX = ratio * offsetRange;
      }

      gsap.set(img, { x: translateX });
    });

    this.rafId = requestAnimationFrame(this.animateParallax);
  }

  // インスタンス破棄
  destroy() {
    if (this.tween) this.tween.kill();
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (!this.isSP) {
      window.removeEventListener("resize", this._debouncedResize);
      clearTimeout(this._resizeTimer);
    }
  }
}
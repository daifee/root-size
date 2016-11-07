'use strict';

/**
 * 使用rem作为布局单位，动态设置根元素字体大小单位，实现弹性布局。
 */

/**
 * 设计稿宽度 = 750px
 * 布局宽度 = device-width
 * 布局要还原设计稿，所以两者的比例要相同
 * 使用rem布局可以全局控制布局
 *
 * 为方便计算，假设：
 * 布局宽度 = 设计稿宽度 * rootSize
 * 即：rootSize = 布局宽度 / 设计稿宽度
 *
 * 假设：device-width = 375px
 * rootSize = 0.5px
 *
 * 又因为rootSize不能小于12px，且为方便计算
 * 将rootSize设定为：rootSize = 布局宽度 / 设计稿宽度 * 100
 * 然后在实际布局中将设计稿的值缩小100倍
 */

var win = window;
var docEl = document.documentElement;
var designWidth = parseInt(docEl.getAttribute('data-design-width')) || 750;
var maxLayoutWidth = parseInt(docEl.getAttribute('data-max-layout-width')) || 750;

var rootSize = void 0,
    layoutWidth = void 0,
    preLayoutWidth = void 0,
    timer = void 0;

// 某些设备rem转px比例不正确
function ratioHack() {
  docEl.style.fontSize = '20px';

  var body = void 0,
      loadedBody = void 0;
  var div = document.createElement('div');
  div.style.border = '1rem solid transparent';
  div.style.width = '0';
  div.style.borderLeft = '.5px solid transparent';
  div.style.borderRight = '.5px solid transparent';

  if (document.body) {
    loadedBody = true;
    body = document.body;
  } else {
    loadedBody = false;
    body = document.createElement('body');
    docEl.appendChild(body);
  }

  body.appendChild(div);
  win.RATIO_HACK = 40 / div.offsetHeight;

  // remove body
  if (loadedBody) {
    body.removeChild(div);
  } else {
    docEl.removeChild(body);
  }
}

// 设置根元素字体大小
function setRootSize(designWidth, maxLayoutWidth) {
  layoutWidth = docEl.getBoundingClientRect().width;

  // 限制最大
  if (maxLayoutWidth && layoutWidth > maxLayoutWidth) {
    layoutWidth = maxLayoutWidth;
  }

  // 避免不必要的计算
  if (layoutWidth === preLayoutWidth) {
    return;
  }
  preLayoutWidth = layoutWidth;

  // 逻辑
  rootSize = layoutWidth / designWidth * 100 * win.RATIO_HACK;

  docEl.style.fontSize = rootSize + 'px';

  win.rootSize = rootSize;
}

// 执行
ratioHack();
setRootSize(designWidth, maxLayoutWidth);

// 自动调整
win.addEventListener('resize', function () {
  clearTimeout(timer);
  timer = setTimeout(setRootSize, 300);
});

win.addEventListener('orientationchange', function () {
  clearTimeout(timer);
  timer = setTimeout(setRootSize, 300);
});
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


const win = window;
const docEl = document.documentElement;
const DESIGN_WIDTH = parseInt(docEl.getAttribute('data-design-width')) || 750;
const MAX_LAYOUT_WIDTH = parseInt(docEl.getAttribute('data-max-layout-width')) || 750;

const defaultWidth = 360;
let layoutWidth;
// 正常情况ratio=1，存在bug的设备ratio!=1
// ratio = rootSize / (layoutWidth / DESIGN_WIDTH * 100)
let ratio = 1;
let preLayoutWidth;
let timer;



function setRootSize() {
  let rootSize = layoutWidth / DESIGN_WIDTH * 100 * ratio;

  docEl.style.fontSize = rootSize + 'px';
}


// 创建一个临时的`<div/>`检测ratio是否“准确”
function checkRatio() {
  let body, loadedBody;
  let div = document.createElement('div');
  // `DESIGN_WIDTH / 100 + 'rem'`（例如：7.5rem）应该满屏，即等于layoutWidth
  div.style.width = DESIGN_WIDTH / 100 + 'rem';

  if (document.body) {
    loadedBody = true;
    body = document.body;
  } else {
    loadedBody = false;
    body = document.createElement('body');
    docEl.appendChild(body);
  }

  body.appendChild(div);

  let realWith = div.offsetWidth || defaultWidth;
  ratio = layoutWidth / realWith;

  // remove body
  if (loadedBody) {
    body.removeChild(div);
  } else {
    docEl.removeChild(body);
  }

  return ratio;
}


// 设置根元素字体大小
export default function rootSize() {
  layoutWidth = docEl.getBoundingClientRect().width || defaultWidth;

  // 限制布局宽度
  if (layoutWidth > MAX_LAYOUT_WIDTH) {
    layoutWidth = MAX_LAYOUT_WIDTH;
  }

  // layoutWidth不变，避免不必要的计算
  if (layoutWidth === preLayoutWidth) {
    return;
  }
  preLayoutWidth = layoutWidth;

  // 设置
  setRootSize();

  // 如果ratio!==1，重新设置rootSize
  if (checkRatio() !== 1) {
    setRootSize();
  }
}


rootSize();
// 自动调整
win.addEventListener('resize', () => {
  clearTimeout(timer);
  timer = setTimeout(rootSize, 300);
});

win.addEventListener('orientationchange', () => {
  clearTimeout(timer);
  timer = setTimeout(rootSize, 300);
});


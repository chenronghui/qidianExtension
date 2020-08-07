import './main.css';
import html from './main.html';

function createDocument(txt) {
  const template = `<div class='child'>${txt}</div>`;
  const doc = new DOMParser().parseFromString(template, 'text/html');
  const div = doc.querySelector('.child');
  return div.firstChild;
}

document.body.appendChild(createDocument(html));

function $(id) {
  return document.getElementById(id);
}

const pageReg = /page=(\d+)/;
const matchArr = window.location.search.match(pageReg);
const wrapper = $('extension');
const input = $('pageNum');
const pre = $('pre');
const next = $('next');
const go = $('go');

function setPosition({ left, top }) {
  localStorage.setItem('left', left);
  localStorage.setItem('top', top);
  wrapper.style.left = `${left}px`;
  wrapper.style.top = `${top}px`;
}

if (matchArr) {
  setPosition({
    left: localStorage.getItem('left'),
    top: localStorage.getItem('top'),
  });

  let mousedownFlag = false;
  let wrapperleft = 0;
  let wrapperTop = 0;
  let x; let y;
  const pageNum = matchArr[1];
  input.value = pageNum;

  wrapper.addEventListener('mousedown', (event) => {
    mousedownFlag = true;
    x = event.clientX;
    y = event.clientY;
    wrapperleft = wrapper.offsetLeft;
    wrapperTop = wrapper.offsetTop;
  });

  document.addEventListener('mousemove', (event) => {
    if (mousedownFlag) {
      const left = wrapperleft + (event.clientX - x);
      const top = wrapperTop + (event.clientY - y);
      setPosition({
        left,
        top,
      });
    }
  });

  document.addEventListener('mouseup', () => {
    mousedownFlag = false;
  });

  pre.addEventListener('click', () => {
    window.location.href = window.location.href.replace(/page=(\d+)/, (s, s1) => `page=${Math.max(+s1 - 1, 0)}`);
  });

  next.addEventListener('click', () => {
    window.location.href = window.location.href.replace(/page=(\d+)/, (s, s1) => `page=${+s1 + 1}`);
  });

  go.addEventListener('click', () => {
    if (input.value) {
      window.location.href = window.location.href.replace(/page=(\d+)/, () => `page=${Math.max(input.value, 0)}`);
    }
  });

  input.addEventListener('keydown', (event) => {
    if (+event.keyCode === 13 && input.value) {
      go.click();
    }
  });
} else {
  wrapper.style.display = 'none';
}

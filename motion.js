const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const timers = new Set();
let observer;
let pendingStart;
let introFinish;

function later(callback, delay) {
  const timer = setTimeout(() => { timers.delete(timer); callback(); }, delay);
  timers.add(timer);
}

// Keep the complete text in the layout and accessibility tree while revealing glyphs.
function prepareTyping(element, step = 40) {
  if (element.classList.contains('typed')) return;
  if (!element.hasAttribute('aria-label')) element.setAttribute('aria-label', [...element.childNodes].map(node => node.textContent + (node.nodeType === 1 ? ' ' : '')).join('').replace(/\s+/g, ' ').trim());
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  let index = 0;
  for (const node of nodes) {
    const fragment = document.createDocumentFragment();
    for (const word of node.textContent.split(/(\s+)/)) {
      if (!word) continue;
      if (/^\s+$/.test(word)) { fragment.append(document.createTextNode(word)); continue; }
      const wordSpan = document.createElement('span');
      wordSpan.className = 'type-word';
      wordSpan.setAttribute('aria-hidden', 'true');
      for (const character of [...word]) {
        const letter = document.createElement('span');
        letter.className = 'type-char';
        letter.textContent = character;
        letter.style.setProperty('--letter-delay', `${index++ * step}ms`);
        wordSpan.append(letter);
      }
      fragment.append(wordSpan);
    }
    node.replaceWith(fragment);
  }
  element.dataset.typeDuration = String(index * step);
  element.classList.add('typed');
}

function playTyping(element) {
  element.classList.add('is-writing');
  later(() => element.classList.add('is-written'), Number(element.dataset.typeDuration) + 80);
}

export function initMotion(root) {
  observer?.disconnect();
  for (const timer of timers) clearTimeout(timer);
  timers.clear();
  if (pendingStart) document.removeEventListener('djuk:intro-done', pendingStart);
  if (reducedMotion.matches) return;

  const headings = root.querySelectorAll('.retro-hero h1, .retro-story h2, .retro-visit h2, .hero h1, .section-heading h2, .story h2, .page-intro h1, .catalog-heading h1, .product-details h1, .product-editorial h2');
  headings.forEach(el => prepareTyping(el, el.closest('.hero') ? 70 : 34));
  const reveals = root.querySelectorAll('.hero-model, .category-card, .product-card, .story-image, .section-description, .product-editorial-photo');
  reveals.forEach(el => {
    el.classList.add('motion-ready');
    const siblings = [...el.parentElement.children];
    el.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(el), 3) * 55}ms`);
  });
  const reveal = element => {
    if (element.classList.contains('typed')) playTyping(element);
    else element.classList.add('motion-visible');
  };
  pendingStart = () => {
    pendingStart = null;
    if (reducedMotion.matches) return;
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -16px 0px' });
    [...headings, ...reveals].forEach(el => observer.observe(el));
  };
  if (document.documentElement.classList.contains('intro-pending')) {
    document.addEventListener('djuk:intro-done', pendingStart, { once: true });
  } else pendingStart();
}

function rememberIntro() {
  try { sessionStorage.setItem('djuk.retro.intro.seen', '1'); } catch { /* The page still works without storage. */ }
}

export async function startIntro() {
  const html = document.documentElement;
  const intro = document.querySelector('#brand-intro');
  if (!html.classList.contains('intro-pending')) return;
  const button = intro.querySelector('button');
  let finished = false;
  let revealTimer;
  const finish = (immediate = false) => {
    if (finished) return;
    finished = true;
    clearTimeout(window.djukIntroFallback);
    rememberIntro();
    html.classList.add('intro-leaving');
    const remove = () => {
      const restoreFocus = intro.contains(document.activeElement);
      html.classList.remove('intro-pending', 'intro-leaving');
      intro.hidden = true;
      document.dispatchEvent(new Event('djuk:intro-done'));
      if (restoreFocus) document.querySelector('#main').focus({ preventScroll: true });
      introFinish = null;
    };
    if (immediate) remove();
    else revealTimer = setTimeout(remove, 380);
  };
  introFinish = () => {
    if (finished) {
      clearTimeout(revealTimer);
      html.classList.remove('intro-pending', 'intro-leaving');
      intro.hidden = true;
      document.dispatchEvent(new Event('djuk:intro-done'));
    } else finish(true);
  };
  button.addEventListener('click', () => finish(), { once: true });
  intro.addEventListener('keydown', event => {
    if (event.key === 'Escape') finish(true);
    if (event.key === 'Tab') { event.preventDefault(); button.focus(); }
  });
  if (reducedMotion.matches) { finish(true); return; }
  prepareTyping(intro.querySelector('.intro-title'), 65);
  // Intro timing is separate from route animations so navigation cannot cancel it.
  intro.querySelector('.intro-title').classList.add('is-writing');
  intro.focus({ preventScroll: true });
  const hero = document.querySelector('.retro-hero-art img, .gallery-main img');
  const ready = Promise.allSettled([document.fonts.ready, hero?.decode()]);
  await Promise.all([
    new Promise(resolve => setTimeout(resolve, 1450)),
    Promise.race([ready, new Promise(resolve => setTimeout(resolve, 2600))])
  ]);
  finish();
}

// Keyboard users can reach a card before it is revealed by scrolling.
document.addEventListener('focusin', event => {
  const element = event.target.closest('.motion-ready');
  if (element) { element.classList.add('motion-visible'); observer?.unobserve(element); }
});
reducedMotion.addEventListener('change', () => {
  if (!reducedMotion.matches) return;
  introFinish?.();
  observer?.disconnect();
  document.querySelectorAll('.typed').forEach(el => el.classList.add('is-written'));
  document.querySelectorAll('.motion-ready').forEach(el => el.classList.add('motion-visible'));
});

import { initMotion, startIntro } from './motion.js';
const icons = {
  search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  bag:'<path d="M5 7h14l1 14H4L5 7Z"/><path d="M9 9V5a3 3 0 0 1 6 0v4"/>',
  heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
  arrow:'<path d="M3 12h18m-6-6 6 6-6 6"/>',
  down:'<path d="M12 3v18m-6-6 6 6 6-6"/>',
  close:'<path d="m5 5 14 14M19 5 5 19"/>',
  menu:'<path d="M3 7h18M3 16h18"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  minus:'<path d="M5 12h14"/>',
  pin:'<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  star:'<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  spark:'<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z"/>'
};
const svg = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.arrow}</svg>`;
const money = amount => new Intl.NumberFormat('pl-PL',{style:'currency',currency:'PLN',maximumFractionDigits:0}).format(amount);
const products = [
  {id:'rhythm-black',name:'Komplet Rhythm',category:'komplety',categoryName:'Komplety',color:'Czarny',hex:'#20201f',image:'hero.webp',alternate:'hero-alternate.webp',cutout:true,price:249,tag:'NOWOŚĆ',group:'rhythm',description:'Twój codzienny rytm, Twoje zasady. Czarny komplet z długim rękawem i dopasowanymi legginsami. Prosta forma, złoty akcent i sylwetka, która gra pierwsze skrzypce.',details:['Komplet: góra z długim rękawem i legginsy','Dopasowany krój, wysoki stan','Subtelny detal w kolorze złota']},
  {id:'rhythm-chocolate',name:'Komplet Rhythm',category:'komplety',categoryName:'Komplety',color:'Czekoladowy',hex:'#5c372d',image:'chocolate.webp',alternate:'chocolate-alternate.webp',price:249,tag:'NOWOŚĆ',group:'rhythm',description:'Głęboka czekolada w total looku. Komplet z długim rękawem i legginsami, który łączy wyrazistą sylwetkę z prostotą codziennego stroju. Wystarczą ulubione sneakersy.',details:['Komplet: góra z długim rękawem i legginsy','Dopasowany krój, wysoki stan','Czekoladowy odcień i złoty akcent']},
  {id:'form-black',name:'Legginsy Form',category:'legginsy',categoryName:'Legginsy',color:'Czarny',hex:'#20201f',image:'leggings.webp',alternate:'leggings-alternate.webp',price:129,tag:'ESSENTIAL',group:'form',description:'Baza, do której wracasz. Czarne legginsy z wysokim stanem i delikatnym złotym akcentem. Noś je z dopasowaną górą albo przełam sylwetkę luźną koszulą.',details:['Legginsy z wysokim stanem','Długa, dopasowana nogawka','Góra i buty na zdjęciu są elementem stylizacji']},
  {id:'cargo-black',name:'Kombinezon Cargo',category:'kombinezony',categoryName:'Kombinezony',color:'Czarny',hex:'#20201f',image:'cargo.webp',alternate:'cargo-alternate.webp',price:289,tag:'NEW LOOK',group:'cargo',description:'Cała stylizacja w jednym ruchu. Kombinezon inspirowany stylem utility: kieszenie cargo, zaznaczona talia i złote detale. Wyrazisty charakter, bez zbędnych dodatków.',details:['Krój bez rękawów','Zapięcie na zamek i regulacja w talii','Kieszenie cargo oraz zwężane nogawki']}
];
const productStories = {
  'rhythm-black': {
    title: 'Jeden komplet.<br>Wiele planów.',
    paragraphs: ['Czerń porządkuje całą stylizację, a złoty suwak przy bluzie dodaje jej delikatnego kontrastu. Luźniejsza góra równoważy dopasowane nogawki — razem tworzą prostą, wyrazistą sylwetkę.', 'Noś zestaw z białymi sneakersami i dużą torbą. Gdy chcesz zmienić charakter stroju, dodaj długi płaszcz lub noś bluzę osobno z ulubionymi jeansami.'],
    styling: 'Na co dzień połącz komplet z białymi sneakersami. Na chłodniejszy dzień dodaj płaszcz o prostej linii. Złota biżuteria podkreśli drobny detal przy bluzie.',
    tags: ['Total black', 'Złoty detal', 'Razem lub osobno']
  },
  'rhythm-chocolate': {
    title: 'Czekolada.<br>Na co dzień.',
    paragraphs: ['Głęboki brąz daje spokojniejszy efekt niż czerń, a nadal pozwala zbudować pełną stylizację w jednym kolorze. Prosta bluza i dopasowane legginsy tworzą zestaw, który nie potrzebuje wielu dodatków.', 'Połącz go z kremowym płaszczem, jasnymi butami albo beżową torbą. Obie części możesz też rozdzielić: brązowa góra dobrze wygląda z denimem, a legginsy z dłuższą koszulą.'],
    styling: 'Czekoladowy odcień zestaw z ecru, beżem lub jasnym denimem. Wybierz proste dodatki i pozwól, by kolor zestawu pozostał najważniejszy.',
    tags: ['Czekoladowy brąz', 'Jeden kolor', 'Na co dzień']
  },
  'form-black': {
    title: 'Prosta baza.<br>Twój pomysł.',
    paragraphs: ['Wysoki stan i długa, dopasowana nogawka tworzą czystą linię sylwetki. Mała blaszka w kolorze złota jest jedynym akcentem — resztę stylizacji wybierasz Ty.', 'Z dopasowaną górą uzyskasz spójny, sportowy look. Obszerna koszula lub dłuższa marynarka zmieni proporcje i nada całości bardziej miejski charakter.'],
    styling: 'Łącz z dłuższą koszulą, bluzą lub marynarką oversize. Wysoki stan dobrze współgra też z krótszą górą. Na zdjęciach pokazujemy przykładową stylizację — produkt obejmuje same legginsy.',
    tags: ['Wysoki stan', 'Czysta linia', 'Baza garderoby']
  },
  'cargo-black': {
    title: 'Gotowa stylizacja.<br>W jednym ruchu.',
    paragraphs: ['Kieszenie z klapami, złote zapięcia i wyraźnie zaznaczona talia nadają kombinezonowi użytkowy charakter. Góra bez rękawów równoważy swobodniejszą linię nogawek.', 'Wybierz białe sneakersy na dzień albo cięższe buty, kiedy chcesz mocniejszego efektu. Pod spód możesz dodać cienki, dopasowany longsleeve — zmienisz stylizację bez zmiany całej garderoby.'],
    styling: 'Na dzień wybierz sneakersy i prostą torbę. W chłodniejszą pogodę dodaj pod spód cienki longsleeve, a na wierzch krótką kurtkę. Złote dodatki połączą się z detalami kombinezonu.',
    tags: ['Kieszenie cargo', 'Zaznaczona talia', 'Złote akcenty']
  }
};
const categoryDescriptions = {
  komplety: 'Dwie części, jeden pomysł na styl. Noś je razem albo łącz z tym, co już masz w szafie.',
  legginsy: 'Dopasowana baza, która daje wiele możliwości. Od sportowej góry po obszerną koszulę.',
  kombinezony: 'Pełna stylizacja w jednym kroku. Wyraziste detale, zaznaczona talia i Twój charakter.'
};
const categories={komplety:'Komplety',legginsy:'Legginsy',kombinezony:'Kombinezony'};
const productById = id => products.find(p=>p.id===id);
const safe = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const readStorage=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback;}catch{return fallback;}};
const storedCart=readStorage('djuk.retro.cart',[]);
let cart=Array.isArray(storedCart)?storedCart.filter(x=>x&&productById(x.id)&&['XS','S','M','L'].includes(x.size)&&Number.isInteger(x.qty)&&x.qty>0&&x.qty<=10):[];
const storedFavorites=readStorage('djuk.retro.favorites',[]);
let favorites=new Set(Array.isArray(storedFavorites)?storedFavorites.filter(id=>productById(id)):[]);
let selectedSize=null;
let selectedGallery='full';
let sortOrder='featured';
let panelMode=null;
let toastTimer;
const main=document.querySelector('#main');
const panel=document.querySelector('#panel');
const modal=document.querySelector('#modal');
const persist=()=>{try{localStorage.setItem('djuk.retro.cart',JSON.stringify(cart));localStorage.setItem('djuk.retro.favorites',JSON.stringify([...favorites]));}catch{showToast('Zmiany są dostępne do zamknięcia tej karty.');}updateCartCount();};
const count=()=>cart.reduce((sum,item)=>sum+item.qty,0);
const total=()=>cart.reduce((sum,item)=>sum+productById(item.id).price*item.qty,0);
function updateCartCount(){document.querySelectorAll('[data-cart-count]').forEach(el=>el.textContent=count());}
function hydrateIcons(root=document){root.querySelectorAll('[data-icon]').forEach(el=>{el.innerHTML=svg(el.dataset.icon);});}
function showToast(text){clearTimeout(toastTimer);const el=document.querySelector('#toast');el.textContent=text;el.classList.add('visible');toastTimer=setTimeout(()=>el.classList.remove('visible'),3000);}
function favoriteButton(p){return `<button class="favorite-button" data-action="favorite" data-id="${p.id}" aria-label="${favorites.has(p.id)?'Usuń z ulubionych':'Dodaj do ulubionych'}: ${p.name}, ${p.color}" aria-pressed="${favorites.has(p.id)}">${svg('heart')}</button>`;}
function productCard(p){return `<article class="product-card">${favoriteButton(p)}<a class="product-photo ${p.cutout?'cutout':''}" href="#/produkt/${p.id}" aria-label="${p.name}, ${p.color}, ${money(p.price)}"><img src="./assets/${p.image}" alt="${p.name} — ${p.color.toLowerCase()}" loading="lazy" width="768" height="1152"><img class="product-alternate" src="./assets/${p.alternate}" alt="" aria-hidden="true" loading="lazy" width="1024" height="1536"><span class="product-tag">${p.tag}</span></a><div class="product-info"><div><h3><a href="#/produkt/${p.id}">${p.name}</a></h3><p>${p.color}</p></div><span class="price">${money(p.price)}</span></div><div class="card-colors"><span class="color-dot" style="--swatch:${p.hex}" title="${p.color}"></span>${p.group==='rhythm'?`<span class="color-dot" style="--swatch:${p.hex==='#20201f'?'#5c372d':'#20201f'}" title="Drugi wariant kolorystyczny"></span>`:''}</div></article>`;}
function categoryCard(name,key,image){return `<a class="category-card" href="#/kolekcja/${key}"><div class="category-photo"><img src="./assets/${image}" alt="Kolekcja ${name.toLowerCase()} Djuk Collection" loading="lazy" width="768" height="1152"></div><div class="category-info"><h3>${name}</h3><span>Odkryj kolekcję</span>${svg('arrow')}</div><p class="category-description">${categoryDescriptions[key]}</p></a>`;}
function breadcrumb(items){return `<nav class="breadcrumbs" aria-label="Okruszki"><a href="#/">Strona główna</a>${items.map(([label,url])=>`<span aria-hidden="true">/</span>${url?`<a href="${url}">${label}</a>`:`<span aria-current="page">${label}</span>`}`).join('')}</nav>`;}
function home(){return `<section class="retro-hero"><div class="retro-hero-copy"><p class="eyebrow">DOBRZE BYĆ SOBĄ.</p><h1 aria-label="Djuk Collection">Djuk.</h1><span class="retro-collection">COLLECTION</span><p class="retro-tagline">Stare dobre inspiracje.<br>Twoje nowe ulubione.</p><p class="retro-description">Komplety, legginsy i kombinezony z charakterem.<br>Projektowane i szyte w Polsce.</p><a class="pill" href="#/kolekcja">Odkryj kolekcję ${svg('arrow')}</a><span class="retro-flower" aria-hidden="true">✿</span></div><div class="retro-hero-art"><div class="retro-art-heading"><span>MAŁE RZECZY. WIELKI STYL.</span><span aria-hidden="true">✳</span></div><img src="./assets/retro-collage.webp" alt="Dekoracyjna ilustracja retro: ubrania i dodatki w pastelowych kolorach" width="1024" height="1280" fetchpriority="high"><a href="#kategorie" data-action="scroll-categories">Znajdź coś dla siebie ${svg('down')}</a></div></section>
<section class="section retro-products"><div class="section-heading"><h2>Nowe ulubione</h2><a class="text-link" href="#/kolekcja">Cała kolekcja ${svg('arrow')}</a></div><p class="section-description">Trochę klasyki, trochę charakteru. Wybierz swój zestaw na dziś.</p><div class="product-grid">${products.map(productCard).join('')}</div></section>
<div class="retro-ribbon"><span>Uszyte w Polsce</span><i aria-hidden="true">✿</i><span>Do noszenia po swojemu</span><i aria-hidden="true">✿</i><span>Djuk Collection</span></div>
<section class="section retro-story"><div class="retro-story-photo"><img src="./assets/retro-campaign.webp" alt="Czekoladowy komplet Rhythm w stylizacji na tle różowego studia" width="1024" height="1280" loading="lazy"></div><div class="retro-story-copy"><p class="eyebrow">DOBRY STYL NIE MA DATY WAŻNOŚCI</p><h2>Po swojemu.<br>Po prostu.</h2><p>Lubimy rzeczy, do których się wraca. Czerń, czekoladowy brąz, złoty detal. Proste kroje, które możesz nosić razem albo łączyć z tym, co już masz w szafie.</p><a class="text-link" href="#/o-nas">Poznaj Djuk Collection ${svg('arrow')}</a><a class="retro-feature" href="#/produkt/rhythm-chocolate"><span class="retro-feature-flower" aria-hidden="true">✿</span><span><small>NASZ POMYSŁ NA DZIŚ</small><strong>Czekoladowy<br>total look.</strong><span>Zobacz komplet Rhythm ${svg('arrow')}</span></span></a></div></section>
<section class="section retro-categories" id="kategorie"><div class="section-heading"><h2>Co dziś wybierasz?</h2></div><div class="category-grid">${categoryCard('Komplety','komplety','chocolate.webp')}${categoryCard('Legginsy','legginsy','leggings.webp')}${categoryCard('Kombinezony','kombinezony','cargo.webp')}</div></section>
<section class="retro-visit"><span aria-hidden="true">✳</span><div><p class="eyebrow">WPADNIJ DO NAS</p><h2>Poznajmy się na żywo.</h2><p>Ptak Fashion City, Rzgów · Pasaż Centralny, stoisko 39</p></div><a class="pill" href="#/kontakt">Kontakt i współpraca ${svg('arrow')}</a></section>`;}
function catalog(category='',isFavorites=false){
  const validCategory=categories[category]?category:'';
  let list=products.filter(p=>(!validCategory||p.category===validCategory)&&(!isFavorites||favorites.has(p.id)));
  if(sortOrder==='price-asc')list.sort((a,b)=>a.price-b.price);
  if(sortOrder==='price-desc')list.sort((a,b)=>b.price-a.price);
  const title=isFavorites?'Twoje ulubione.':categories[validCategory]?categories[validCategory]+'.':'Znajdź swój rytm.';
  return `${breadcrumb([[isFavorites?'Ulubione':categories[validCategory]||'Kolekcja']])}<div class="catalog-heading"><h1>${title}</h1><p>${isFavorites?'Rzeczy, które wpadły Ci w oko. Zapisane tutaj na kolejny raz.':(categoryDescriptions[validCategory] || 'Wyraziste formy, czerń i czekoladowy brąz. Wybierz gotowy zestaw albo pojedynczy element, który dopasujesz do swojej garderoby.')}</p></div><div class="catalog-toolbar"><div class="filter-tabs">${isFavorites?'<a class="filter-tab" href="#/kolekcja">Wróć do kolekcji</a>':`<a class="filter-tab ${!validCategory?'active':''}" href="#/kolekcja" ${!validCategory?'aria-current="page"':''}>Wszystko</a>${Object.entries(categories).map(([key,label])=>`<a class="filter-tab ${key===validCategory?'active':''}" href="#/kolekcja/${key}" ${key===validCategory?'aria-current="page"':''}>${label}</a>`).join('')}`}</div><label class="sort-control">Sortuj<select id="sort" aria-label="Sortowanie produktów"><option value="featured" ${sortOrder==='featured'?'selected':''}>Polecane</option><option value="price-asc" ${sortOrder==='price-asc'?'selected':''}>Cena: od najniższej</option><option value="price-desc" ${sortOrder==='price-desc'?'selected':''}>Cena: od najwyższej</option></select></label></div><section class="section catalog-products"><p class="catalog-summary">${list.length} ${list.length===1?'produkt':'produkty'} · kolekcja pokazowa</p>${list.length?`<div class="product-grid">${list.map(productCard).join('')}</div>`:`<div class="empty-state">${svg('heart')}<h2>Jeszcze nic tutaj nie ma.</h2><p>Kliknij serce przy produkcie, który Ci się podoba.</p><a class="pill" href="#/kolekcja">Odkryj kolekcję ${svg('arrow')}</a></div>`}</section>`;
}
function galleryViews(p) {
  return [
    {key:'full',image:p.image,label:'Cała sylwetka',cutout:p.cutout},
    {key:'alternate',image:p.alternate,label:'Inne ujęcie'},
    {key:'detail',image:p.image,label:'Zbliżenie na detale',detail:true,cutout:p.cutout}
  ];
}
function selectGallery(viewKey) {
  const p=productById(currentRoute()[1]);
  if(!p) return;
  const views=galleryViews(p);
  const index=views.findIndex(view=>view.key===viewKey);
  if(index<0) return;
  const view=views[index];
  selectedGallery=viewKey;
  const frame=document.querySelector('.gallery-main');
  const image=frame.querySelector('img');
  frame.classList.toggle('detail',!!view.detail);
  frame.classList.toggle('cutout',!!view.cutout);
  image.src='./assets/'+view.image;
  image.alt=p.name+', '+p.color.toLowerCase()+' — '+view.label.toLowerCase();
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
    image.getAnimations().forEach(animation=>animation.cancel());
    image.animate([{opacity:.3},{opacity:1}],{duration:280,easing:'ease-out'});
  }
  document.querySelectorAll('.gallery-thumb').forEach(el=>{
    el.classList.toggle('active',el.dataset.view===viewKey);
    el.setAttribute('aria-pressed',String(el.dataset.view===viewKey));
  });
  document.querySelector('.gallery-caption').textContent=view.label;
  document.querySelector('.gallery-count').textContent=(index+1)+' / '+views.length;
}
function stepGallery(delta) {
  const p=productById(currentRoute()[1]);
  if(!p) return;
  const views=galleryViews(p), index=views.findIndex(view=>view.key===selectedGallery);
  selectGallery(views[(index+delta+views.length)%views.length].key);
}
function productEditorial(p) {
  const story=productStories[p.id];
  return `<section class="product-editorial"><div class="product-editorial-photo"><img src="./assets/${p.alternate}" alt="${p.name} — drugie ujęcie w kolorze ${p.color.toLowerCase()}" loading="lazy" width="1024" height="1536"></div><div class="product-editorial-copy"><p class="eyebrow">BLIŻEJ DETALI / DJUK COLLECTION</p><h2>${story.title}</h2>${story.paragraphs.map(text=>'<p>'+text+'</p>').join('')}<div class="style-tags">${story.tags.map(tag=>'<span>'+tag+'</span>').join('')}</div></div></section>`;
}
function productPage(p){
  const siblings=products.filter(item=>item.group===p.group);
  return `${breadcrumb([['Kolekcja','#/kolekcja'],[p.categoryName,'#/kolekcja/'+p.category],[p.name]])}<section class="product-layout"><div class="product-gallery"><button class="gallery-main ${p.cutout?'cutout':''}" data-action="zoom" data-id="${p.id}" aria-label="Powiększ zdjęcie produktu"><img src="./assets/${p.image}" alt="${p.name}, kolor ${p.color.toLowerCase()}" width="1024" height="1536" fetchpriority="high"><span class="zoom-label">${svg('plus')}</span></button><div class="gallery-thumbs" aria-label="Widoki produktu">${galleryViews(p).map((view,i)=>`<button class="gallery-thumb ${view.detail?'detail':''} ${view.cutout?'cutout':''} ${i===0?'active':''}" data-action="gallery" data-view="${view.key}" aria-label="${view.label}" aria-pressed="${i===0}"><img src="./assets/${view.image}" alt="${view.label}" loading="lazy"></button>`).join('')}</div><div class="gallery-controls"><span class="gallery-caption" aria-live="polite">Cała sylwetka</span><div><button class="gallery-prev" data-action="gallery-step" data-delta="-1" aria-label="Poprzednie zdjęcie">${svg('arrow')}</button><span class="gallery-count">1 / 3</span><button data-action="gallery-step" data-delta="1" aria-label="Następne zdjęcie">${svg('arrow')}</button></div></div></div><div class="product-details"><p class="eyebrow">DJUK COLLECTION / ${p.tag}</p><h1>${p.name}</h1><p class="product-price">${money(p.price)}</p><p class="demo-price">Cena przykładowa · produkt w wersji pokazowej</p><p class="product-description">${p.description}</p><p class="option-label">Kolor <span>${p.color}</span></p><div class="swatches">${siblings.map(s=>`<a class="swatch ${s.id===p.id?'active':''}" style="--swatch:${s.hex}" href="#/produkt/${s.id}" aria-label="Kolor: ${s.color}" ${s.id===p.id?'aria-current="true"':''}></a>`).join('')}</div><div class="option-label">Wybierz rozmiar <button class="size-guide-button" data-action="size-guide">Jak dobrać rozmiar?</button></div><div class="sizes" role="group" aria-label="Rozmiar">${['XS','S','M','L'].map(size=>`<button class="size-button" data-action="size" data-size="${size}" aria-pressed="false">${size}</button>`).join('')}</div><p class="size-error" id="size-error" aria-live="polite"></p><div class="buy-actions"><button class="pill" data-action="add-to-cart" data-id="${p.id}">Dodaj do koszyka ${svg('arrow')}</button>${favoriteButton(p)}</div><p class="product-note">${svg('check')} Wersja pokazowa — bez płatności i składania zamówień</p><details open><summary>O produkcie</summary><ul>${p.details.map(d=>`<li>${d}</li>`).join('')}</ul></details><details><summary>Jak nosić?</summary><p>${productStories[p.id].styling}</p></details><details><summary>Rozmiar i dopasowanie</summary><p>Rozmiary w tej prezentacji są przykładowe. Przed zakupem skontaktuj się z nami, aby potwierdzić wymiary i dostępność konkretnego modelu.</p><p><a class="text-link" href="tel:+48660444614">Zapytaj o rozmiar ${svg('arrow')}</a></p></details><details><summary>Materiał i pielęgnacja</summary><p>Dokładny skład i zalecenia pielęgnacji zostaną uzupełnione dla gotowej kolekcji. Zawsze sprawdzaj instrukcję na metce danego produktu.</p></details><details><summary>Zakupy i dostępność</summary><p>Oglądasz projekt nowego sklepu. Zdjęcia, modele i ceny służą prezentacji. Informacje o aktualnej ofercie uzyskasz bezpośrednio od Djuk Collection.</p><p><a class="text-link" href="#/kontakt">Skontaktuj się z nami ${svg('arrow')}</a></p></details></div></section>${productEditorial(p)}<section class="section related"><div class="section-heading"><h2>To też Twój klimat.</h2><a class="text-link" href="#/kolekcja">Cała kolekcja ${svg('arrow')}</a></div><div class="product-grid">${products.filter(item=>item.id!==p.id).map(productCard).join('')}</div></section>`;
}
function about(){return `${breadcrumb([['O nas']])}<section class="page-intro"><p class="eyebrow">POZNAJ DJUK COLLECTION</p><h1>Tworzymy tutaj.<br>Ty nosisz po swojemu.</h1></section><section class="section story about-story"><div class="story-image"><img src="./assets/chocolate.webp" alt="Stylizacja Djuk Collection w kolorze czekoladowym" width="768" height="1152"></div><div><p class="eyebrow">Z POLSKI, Z CHARAKTEREM</p><h2>Moda blisko<br>Ciebie.</h2><p>Djuk Collection to polski producent odzieży damskiej. Projektujemy i szyjemy w Polsce, łącząc kobiece kroje z detalami, które nadają stylizacji charakter.</p><p>Znajdziesz nas w Ptak Fashion City w Rzgowie — Pasaż Centralny, stoisko 39. Zapraszamy do poznania kolekcji na żywo oraz do współpracy z butikami.</p><a class="pill" href="#/kontakt">Poznajmy się ${svg('arrow')}</a></div></section><div class="brand-strip"><span>${svg('pin')} Szyjemy w Polsce</span><span>${svg('spark')} Kolekcje z charakterem</span><span>${svg('bag')} Współpraca z butikami</span></div><section class="section"><div class="section-heading"><h2>Znajdź coś dla siebie.</h2><a class="text-link" href="#/kolekcja">Odkryj kolekcję ${svg('arrow')}</a></div><div class="product-grid">${products.map(productCard).join('')}</div></section>`;}
function contact(){return `${breadcrumb([['Kontakt']])}<section class="page-intro"><p class="eyebrow">BĄDŹMY W KONTAKCIE</p><h1>Porozmawiajmy.</h1><p>Chcesz poznać kolekcję, zapytać o dostępność lub nawiązać współpracę? Jesteśmy tutaj.</p></section><section class="contact-layout"><div><div class="contact-block"><h3>NAPISZ DO NAS</h3><a href="mailto:djukcom@gmail.com">djukcom@gmail.com ${svg('arrow')}</a></div><div class="contact-block"><h3>ZADZWOŃ</h3><a href="tel:+48660444614">+48 660 444 614 ${svg('arrow')}</a></div><div class="contact-block"><h3>ODWIEDŹ NAS</h3><p>Ptak Fashion City<br>Pasaż Centralny, stoisko 39<br>Rzemieślnicza 35, 95-030 Rzgów</p><a class="text-link" href="https://www.google.com/maps/search/?api=1&query=Ptak+Fashion+City+Rzemie%C5%9Blnicza+35+Rzg%C3%B3w" target="_blank" rel="noopener noreferrer">Otwórz mapę ${svg('arrow')}</a></div></div><div class="contact-card"><p class="eyebrow">DLA BUTIKÓW</p><h2>Zróbmy razem<br>coś dobrego.</h2><p>Prowadzisz butik odzieżowy? Zapraszamy do kontaktu w sprawie współpracy hurtowej i aktualnej kolekcji Djuk Collection.</p><a class="pill" href="mailto:djukcom@gmail.com?subject=Wsp%C3%B3%C5%82praca%20hurtowa">Zapytaj o współpracę ${svg('arrow')}</a></div></section>`;}
function cartItem(item){const p=productById(item.id);return `<article class="cart-item"><a class="cart-item-photo ${p.cutout?'cutout':''}" href="#/produkt/${p.id}"><img src="./assets/${p.image}" alt="${p.name}, ${p.color}"></a><div class="cart-item-content"><h3><a href="#/produkt/${p.id}">${p.name}</a></h3><p>${p.color} / Rozmiar ${item.size}</p><span class="price">${money(p.price*item.qty)}</span><div class="cart-item-bottom"><div class="quantity" aria-label="Liczba sztuk"><button data-action="quantity" data-id="${p.id}" data-size="${item.size}" data-delta="-1" aria-label="Zmniejsz liczbę sztuk" ${item.qty===1?'disabled':''}>−</button><span aria-label="${item.qty} sztuk">${item.qty}</span><button data-action="quantity" data-id="${p.id}" data-size="${item.size}" data-delta="1" aria-label="Zwiększ liczbę sztuk" ${item.qty===10?'disabled':''}>+</button></div><button class="remove-item" data-action="remove" data-id="${p.id}" data-size="${item.size}">Usuń</button></div></div></article>`;}
function cartPage(){return `${breadcrumb([['Koszyk']])}<section class="page-intro"><p class="eyebrow">TWÓJ WYBÓR</p><h1>Koszyk<span style="color:var(--muted)"> (${count()})</span></h1></section>${cart.length?`<section class="cart-page"><div>${cart.map(cartItem).join('')}<a class="text-link" href="#/kolekcja">Wróć do kolekcji ${svg('arrow')}</a></div><div class="cart-page-summary"><h2>Podsumowanie</h2><div class="subtotal"><span>Produkty</span><span>${money(total())}</span></div><p>To koszyk pokazowy. Nie pobieramy płatności i nie przyjmujemy zamówień przez tę stronę.</p><button class="pill" data-action="preview-order">Zobacz podsumowanie ${svg('arrow')}</button></div></section>`:`<div class="empty-state"><h2>Zrób miejsce na nowe.</h2><p>Twój koszyk jest pusty. Znajdź coś w swoim stylu.</p><a class="pill" href="#/kolekcja">Odkryj kolekcję ${svg('arrow')}</a></div>`}`;}
function currentRoute(){return location.hash.replace(/^#\/?/,'').split('/');}
function render({scroll=true}={}){
  closePanel();closeModal();selectedSize=null;selectedGallery='full';
  const [route,slug]=currentRoute();let html;let title;
  if(!route){html=home();title='Twoje nowe ulubione';}
  else if(route==='kolekcja'){html=catalog(slug);title=categories[slug]||'Nowa kolekcja';}
  else if(route==='ulubione'){html=catalog('',true);title='Twoje ulubione';}
  else if(route==='produkt'&&productById(slug)){const p=productById(slug);html=productPage(p);title=p.name+' — '+p.color;}
  else if(route==='o-nas'){html=about();title='O nas';}
  else if(route==='kontakt'){html=contact();title='Kontakt';}
  else if(route==='koszyk'){html=cartPage();title='Koszyk';}
  else{html='<section class="empty-state"><h1>Nie ma tu tej strony.</h1><p>Wróć do kolekcji i znajdź coś w swoim stylu.</p><a class="pill" href="#/kolekcja">Odkryj kolekcję</a></section>';title='Nie znaleziono strony';}
  main.innerHTML=html;document.title=`${title} — Djuk Collection · Retro`;
  document.querySelectorAll('.desktop-nav a').forEach(a=>{if(a.hash===location.hash)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  updateCartCount();if(scroll){window.scrollTo({top:0,behavior:'instant'});main.focus({preventScroll:true});}
  initMotion(main);
}
function syncLock(){document.body.classList.toggle('locked',panel.open||modal.open);}
function openPanel(mode){panelMode=mode;renderPanel();if(!panel.open)panel.showModal();syncLock();if(mode==='search')requestAnimationFrame(()=>document.querySelector('#search-input')?.focus());}
function closePanel(){if(panel.open)panel.close();panelMode=null;document.querySelector('[data-action="menu"]').setAttribute('aria-expanded','false');syncLock();}
function renderPanel(){let content='';
  const heading=(title)=>`<div class="panel-heading"><h2>${title}</h2><button class="icon-button" data-action="close-panel" aria-label="Zamknij panel">${svg('close')}</button></div>`;
  if(panelMode==='cart')content=`${heading(`Twój koszyk (${count()})`)}${cart.length?`<div class="panel-body">${cart.map(cartItem).join('')}</div><div class="panel-bottom"><div class="subtotal"><span>Razem</span><span>${money(total())}</span></div><p>Wersja pokazowa. Ceny przykładowe, bez płatności.</p><a class="pill" href="#/koszyk">Przejdź do koszyka ${svg('arrow')}</a><button class="pill outline" data-action="close-panel">Kontynuuj przeglądanie</button></div>`:`<div class="panel-empty">${svg('bag')}<h3>Jeszcze chwila dla Ciebie.</h3><p>Twój koszyk jest pusty.<br>Odkryj kolekcję i wybierz swój styl.</p><a class="pill" href="#/kolekcja">Odkryj kolekcję ${svg('arrow')}</a></div>`}`;
  if(panelMode==='search')content=`${heading('Czego szukasz?')}<label class="search-input-wrap"><span class="sr-only" hidden>Nazwa, kolor lub kategoria</span><input id="search-input" class="search-input" type="search" placeholder="Komplet, legginsy, czekolada…" aria-label="Nazwa, kolor lub kategoria" autocomplete="off">${svg('search')}</label><p class="search-hint" id="search-count" aria-live="polite">Odkryj kolekcję</p><div class="search-results" id="search-results">${searchResults('')}</div>`;
  if(panelMode==='menu')content=`${heading('Djuk Collection')}<nav class="mobile-links" aria-label="Menu główne"><button data-action="search">Szukaj produktów</button><a href="#/kolekcja">Nowości</a><a href="#/kolekcja/komplety">Komplety</a><a href="#/kolekcja/legginsy">Legginsy</a><a href="#/kolekcja/kombinezony">Kombinezony</a><a href="#/ulubione">Ulubione</a><a href="#/o-nas">O nas</a><a href="#/kontakt">Kontakt</a></nav>`;
  document.querySelector('#panel-content').innerHTML=`<div class="panel-inner">${content}</div>`;
}
const normalize=text=>text.toLocaleLowerCase('pl-PL').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ł/g,'l');
function searchResults(query){const terms=normalize(query.trim()).split(/\s+/).filter(Boolean);const found=products.filter(p=>terms.every(term=>normalize(`${p.name} ${p.categoryName} ${p.color} ${p.description}`).includes(term)));if(!found.length)return `<div class="empty-state"><h2 style="font-size:27px">Szukamy dalej?</h2><p>Brak produktów dla „${safe(query)}”. Spróbuj wpisać kolor lub kategorię.</p></div>`;return found.map(p=>`<a class="search-result" href="#/produkt/${p.id}"><img src="./assets/${p.image}" alt="${p.name}, ${p.color}"><div><h3>${p.name}</h3><p>${p.color} · ${money(p.price)}</p></div></a>`).join('');}
function openModal(html,{zoom=false}={}){document.querySelector('#modal-content').innerHTML=`<button class="icon-button modal-close" data-action="close-modal" aria-label="Zamknij">${svg('close')}</button>${html}`;modal.classList.toggle('zoom-modal',zoom);if(!modal.open)modal.showModal();syncLock();}
function closeModal(){if(modal.open)modal.close();syncLock();}
function refreshCart(){persist();if(panel.open&&panelMode==='cart')renderPanel();if(currentRoute()[0]==='koszyk'){main.innerHTML=cartPage();updateCartCount();}}
function toggleFavorite(id){if(!productById(id))return;const p=productById(id);if(favorites.has(id)){favorites.delete(id);showToast('Usunięto z ulubionych');}else{favorites.add(id);showToast('Zapisano w ulubionych');}persist();document.querySelectorAll(`[data-action="favorite"][data-id="${id}"]`).forEach(el=>{el.setAttribute('aria-pressed',String(favorites.has(id)));el.setAttribute('aria-label',`${favorites.has(id)?'Usuń z ulubionych':'Dodaj do ulubionych'}: ${p.name}, ${p.color}`);});if(currentRoute()[0]==='ulubione')main.innerHTML=catalog('',true);}
document.addEventListener('click',event=>{
  const anchor=event.target.closest('a');
  if(anchor&&anchor.getAttribute('href')?.startsWith('#/')&&panel.open&&anchor.hash===location.hash)closePanel();
  const button=event.target.closest('[data-action]');if(!button)return;
  const {action,id,size,delta,view}=button.dataset;
  switch(action){
    case 'skip':event.preventDefault();main.focus();break;
    case 'search':openPanel('search');break;
    case 'cart':openPanel('cart');break;
    case 'menu':openPanel('menu');button.setAttribute('aria-expanded','true');break;
    case 'close-panel':closePanel();break;
    case 'close-modal':closeModal();break;
    case 'favorite':toggleFavorite(id);break;
    case 'scroll-categories':event.preventDefault();document.querySelector('#kategorie')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});break;
    case 'size':selectedSize=size;document.querySelectorAll('.size-button').forEach(el=>{el.classList.toggle('selected',el.dataset.size===size);el.setAttribute('aria-pressed',String(el.dataset.size===size));});document.querySelector('#size-error').textContent='';break;
    case 'add-to-cart':{
      if(!selectedSize){document.querySelector('#size-error').textContent='Wybierz rozmiar, aby dodać produkt do koszyka.';document.querySelector('.size-button')?.focus();break;}
      const existing=cart.find(item=>item.id===id&&item.size===selectedSize);
      if(existing&&existing.qty>=10){showToast('Maksymalnie 10 sztuk jednego wariantu.');break;}
      if(existing)existing.qty++;else cart.push({id,size:selectedSize,qty:1});persist();openPanel('cart');break;
    }
    case 'quantity':{const item=cart.find(item=>item.id===id&&item.size===size);if(item)item.qty=Math.max(1,Math.min(10,item.qty+Number(delta)));refreshCart();const scope=panel.open?panel:main;scope.querySelector(`[data-action="quantity"][data-id="${id}"][data-size="${size}"][data-delta="${delta}"]:not(:disabled)`)?.focus();break;}
    case 'remove':cart=cart.filter(item=>!(item.id===id&&item.size===size));refreshCart();showToast('Usunięto produkt z koszyka');break;
    case 'gallery':selectGallery(view);break;
    case 'gallery-step':stepGallery(Number(delta));break;
    case 'zoom':{const p=productById(id);const view=galleryViews(p).find(v=>v.key===selectedGallery);openModal(`<div class="zoom-frame ${view.detail?'detail':''}"><img src="./assets/${view.image}" alt="${p.name} — ${view.label}"></div>`,{zoom:true});break;}
    case 'size-guide':openModal(`<div class="modal-inner"><p class="eyebrow">DOBRE DOPASOWANIE</p><h2>Twój rozmiar,<br>Twój komfort.</h2><p>Wybierz rozmiar, który zwykle nosisz. Aby potwierdzić dopasowanie, zapytaj nas o wymiary konkretnego modelu.</p><table class="size-table"><caption>Przykładowe oznaczenia rozmiarów</caption><thead><tr><th>Rozmiar</th><th>Oznaczenie EU</th></tr></thead><tbody><tr><td>XS</td><td>34</td></tr><tr><td>S</td><td>36</td></tr><tr><td>M</td><td>38</td></tr><tr><td>L</td><td>40</td></tr></tbody></table><p>To orientacyjne oznaczenia, a nie tabela wymiarów produktów. Dokładne wymiary zostaną dodane do gotowej oferty.</p><a class="text-link" href="tel:+48660444614">Zapytaj o rozmiar ${svg('arrow')}</a></div>`);break;
    case 'preview-order':openModal(`<div class="modal-inner"><p class="eyebrow">TWÓJ WYBÓR</p><h2>Wygląda dobrze.</h2><p>Podsumowanie Twojego koszyka pokazowego.</p><div class="order-lines">${cart.map(item=>{const p=productById(item.id);return `<div class="order-line"><span>${p.name}<br><small>${p.color} / ${item.size} / ${item.qty} szt.</small></span><span>${money(p.price*item.qty)}</span></div>`;}).join('')}</div><div class="subtotal"><span>Razem</span><span>${money(total())}</span></div><div class="notice">To prezentacja sklepu. Żadne zamówienie nie zostało złożone. Płatności są wyłączone.</div><a class="pill" href="#/kontakt">Zapytaj o aktualną ofertę ${svg('arrow')}</a></div>`);break;
  }
});
document.addEventListener('input',event=>{if(event.target.id==='search-input'){const query=event.target.value;document.querySelector('#search-results').innerHTML=searchResults(query);document.querySelector('#search-count').textContent=query.trim()?'Wyniki wyszukiwania':'Odkryj kolekcję';}});
document.addEventListener('change',event=>{if(event.target.id==='sort'){sortOrder=event.target.value;const[,category]=currentRoute();main.innerHTML=catalog(category,currentRoute()[0]==='ulubione');document.querySelector('#sort').focus();}});
for(const dialog of [panel,modal]){
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom){dialog===panel?closePanel():closeModal();}}});
  dialog.addEventListener('close',()=>{if(dialog===panel){panelMode=null;document.querySelector('[data-action="menu"]').setAttribute('aria-expanded','false');}syncLock();});
}
window.addEventListener('hashchange',()=>render());
window.addEventListener('storage',event=>{if(event.key==='djuk.retro.cart'||event.key==='djuk.retro.favorites')location.reload();});
document.addEventListener('keydown',event=>{if(!event.target.closest('.product-gallery'))return;if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();stepGallery(event.key==='ArrowLeft'?-1:1);}});
hydrateIcons();document.querySelector('#year').textContent=new Date().getFullYear();render({scroll:false});startIntro();

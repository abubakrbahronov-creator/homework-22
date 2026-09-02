/* ============================================================
   SHOP.CO — логика страницы
   ============================================================ */
(function () {
  'use strict';

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------------- данные ---------------- */
  const PRODUCTS = [
    { id:'p1', group:'new', name:'T-shirt with Tape Details', cat:'t-shirts', style:'casual',
      price:120, old:null, rate:4.5, img:'img/tshirt-tape.png',
      desc:'Свободная хлопковая футболка с фирменными лентами по бокам. Плотность 220 г/м².' },
    { id:'p2', group:'new', name:'Skinny Fit Jeans', cat:'jeans', style:'casual',
      price:240, old:260, rate:3.5, img:'img/jeans-skinny.png',
      desc:'Зауженные джинсы из эластичного денима, средняя посадка, классический синий.' },
    { id:'p3', group:'new', name:'Checkered Shirt', cat:'shirts', style:'formal',
      price:180, old:null, rate:4.5, img:'img/shirt-checkered.png',
      desc:'Рубашка в клетку из мягкой фланели. Отложной воротник, пуговицы из натурального рога.' },
    { id:'p4', group:'new', name:'Sleeve Striped T-shirt', cat:'t-shirts', style:'casual',
      price:130, old:160, rate:4.5, img:'img/tshirt-striped.png',
      desc:'Оранжевая футболка с контрастными полосами на рукавах. 100% органический хлопок.' },
    { id:'p5', group:'top', name:'Vertical Striped Shirt', cat:'shirts', style:'formal',
      price:212, old:232, rate:5.0, img:'img/shirt-vertical.png',
      desc:'Рубашка в вертикальную полоску приталенного кроя — база для офисного гардероба.' },
    { id:'p6', group:'top', name:'Courage Graphic T-shirt', cat:'t-shirts', style:'party',
      price:145, old:null, rate:4.0, img:'img/tshirt-graphic.png',
      desc:'Футболка с авторским принтом. Печать водными красками, не трескается при стирке.' },
    { id:'p7', group:'top', name:'Loose Fit Bermuda Shorts', cat:'shorts', style:'gym',
      price:80, old:null, rate:3.0, img:'img/shorts-bermuda.png',
      desc:'Свободные джинсовые бермуды длиной до колена. Два боковых и два задних кармана.' },
    { id:'p8', group:'top', name:'Faded Skinny Jeans', cat:'jeans', style:'party',
      price:210, old:null, rate:4.5, img:'img/jeans-faded.png',
      desc:'Чёрные джинсы с эффектом выцветания. Узкий крой, высокая посадка.' },
    { id:'p9', group:'new', name:'Relaxed Striped Shirt', cat:'shirts', style:'casual',
      price:175, old:220, rate:4.5, img:'img/shirt-vertical.png',
      desc:'Рубашка в полоску свободного кроя со стойкой. Лён с хлопком, дышит в жару.' },
    { id:'p10', group:'new', name:'Denim Bermuda Shorts', cat:'shorts', style:'casual',
      price:110, old:null, rate:4.0, img:'img/shorts-bermuda.png',
      desc:'Джинсовые бермуды с потёртостями. Длина до колена, пять карманов.' },
    { id:'p11', group:'top', name:'Tape Detail Tee (Black)', cat:'t-shirts', style:'formal',
      price:195, old:245, rate:4.5, img:'img/tshirt-tape.png',
      desc:'Плотная чёрная футболка с фирменными лентами на рукавах и принтом на груди.' },
    { id:'p12', group:'top', name:'Flannel Checked Shirt', cat:'shirts', style:'gym',
      price:95, old:120, rate:4.0, img:'img/shirt-checkered.png',
      desc:'Фланелевая рубашка в клетку. Мягкая, тёплая, с накладным карманом.' }
  ];

  const REVIEWS = [
    { name:'Sarah M.',  rate:5, text:'"I\'m blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I\'ve bought has exceeded my expectations."' },
    { name:'Alex K.',   rate:5, text:'"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."' },
    { name:'James L.',  rate:5, text:'"As someone who\'s always on the lookout for unique fashion pieces, I\'m thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."' },
    { name:'Mooen',     rate:5, text:'"The quality of the fabric is outstanding and the fit is exactly as described. Delivery took only two days — I\'ll definitely order again."' },
    { name:'Olga R.',   rate:4, text:'"Отличный магазин: размерная сетка совпадает, вещи приходят аккуратно упакованными. Единственное — хотелось бы больше расцветок."' },
    { name:'Karim D.',  rate:5, text:'"Customer support helped me exchange a size within a day. That kind of service is rare — this is now my default store for basics."' }
  ];

  const money = n => '$' + n.toLocaleString('en-US');

  function starsHTML(rate) {
    let out = '';
    for (let i = 1; i <= 5; i++) {
      const cls = rate >= i ? 'on' : (rate >= i - 0.5 ? 'half' : '');
      out += `<i class="${cls}"></i>`;
    }
    return `<span class="stars">${out}</span>`;
  }

  /* ---------------- уведомления ---------------- */
  const toasts = $('#toasts');
  function toast(msg) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    toasts.appendChild(el);
    setTimeout(() => {
      el.classList.add('out');
      el.addEventListener('animationend', () => el.remove(), { once:true });
    }, 2200);
  }

  /* ---------------- рендер карточек ---------------- */
  function cardHTML(p) {
    const off = p.old ? `<span class="off">-${Math.round((1 - p.price / p.old) * 100)}%</span>` : '';
    const tag = p.old ? '<span class="card__tag">SALE</span>' : '';
    return `
      <article class="card" data-id="${p.id}" tabindex="0">
        <div class="card__media">
          ${tag}
          <img src="${p.img}" alt="${p.name}" loading="lazy" width="295" height="298">
          <button class="card__add" data-add="${p.id}">Add to Cart</button>
        </div>
        <h3 class="card__title">${p.name}</h3>
        <div class="rating">${starsHTML(p.rate)}<span><b>${p.rate.toFixed(1)}</b>/5</span></div>
        <div class="price">${money(p.price)}${p.old ? `<del>${money(p.old)}</del>${off}` : ''}</div>
      </article>`;
  }

  const state = { filter:null, expanded:{ new:false, top:false } };

  function visible(group) {
    let list = PRODUCTS.filter(p => p.group === group);
    const f = state.filter;
    if (f && f !== 'all') {
      list = PRODUCTS.filter(p => p.group === group && (
        p.cat === f || p.style === f || (f === 'sale' && p.old)
      ));
    }
    return state.expanded[group] || state.filter ? list : list.slice(0, 4);
  }

  function render() {
    [['new', '#gridNew'], ['top', '#gridTop']].forEach(([group, sel]) => {
      const list = visible(group);
      const grid = $(sel);
      grid.innerHTML = list.length
        ? list.map(cardHTML).join('')
        : '<p class="grid__empty">В этой категории пока нет товаров.</p>';

      const btn = $(`[data-more="${group}"]`);
      const total = PRODUCTS.filter(p => p.group === group).length;
      btn.hidden = !!state.filter || total <= 4;
      btn.textContent = state.expanded[group] ? 'Show Less' : 'View All';
    });
  }

  document.addEventListener('click', e => {
    const more = e.target.closest('[data-more]');
    if (more) {
      const g = more.dataset.more;
      state.expanded[g] = !state.expanded[g];
      render();
    }
  });

  /* ---------------- фильтры ---------------- */
  function applyFilter(value, label) {
    state.filter = value === 'all' ? null : value;
    state.expanded = { new:false, top:false };
    render();
    $$('.style-card').forEach(c => c.classList.toggle('is-active', c.dataset.filter === state.filter));
    toast(state.filter ? `Фильтр: ${label}` : 'Фильтр сброшен');
    $('#new-arrivals').scrollIntoView({ behavior:'smooth', block:'start' });
  }

  $$('[data-filter]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const v = el.dataset.filter;
      const label = el.textContent.trim();
      closeAll();                       // закрываем меню/оверлей до прокрутки
      if (state.filter === v) { applyFilter('all', ''); return; }
      applyFilter(v, label);
    });
  });

  /* ---------------- корзина ---------------- */
  const CART_KEY = 'shopco.cart.v1';
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (_) { cart = []; }

  const saveCart = () => { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (_) {} };

  function addToCart(id, size) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return;
    const key = id + '|' + (size || 'M');
    const found = cart.find(i => i.key === key);
    if (found) found.qty++;
    else cart.push({ key, id, size: size || 'M', qty:1 });
    saveCart(); drawCart();
    toast(`${p.name} — добавлено в корзину`);
  }

  function changeQty(key, delta) {
    const item = cart.find(i => i.key === key);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(i => i.key !== key);
    saveCart(); drawCart();
  }

  function removeItem(key) {
    cart = cart.filter(i => i.key !== key);
    saveCart(); drawCart();
    toast('Товар удалён');
  }

  function drawCart() {
    const body = $('#cartBody');
    const qty = cart.reduce((s, i) => s + i.qty, 0);
    const total = cart.reduce((s, i) => {
      const p = PRODUCTS.find(x => x.id === i.id);
      return s + (p ? p.price * i.qty : 0);
    }, 0);

    body.innerHTML = cart.length ? cart.map(i => {
      const p = PRODUCTS.find(x => x.id === i.id);
      if (!p) return '';
      return `
        <div class="cart-item">
          <img src="${p.img}" alt="${p.name}">
          <div>
            <b>${p.name}</b>
            <small>Размер: ${i.size}</small>
            <div class="price">${money(p.price * i.qty)}</div>
            <div class="qty">
              <button data-qty="-1" data-key="${i.key}" aria-label="Меньше">−</button>
              <span>${i.qty}</span>
              <button data-qty="1" data-key="${i.key}" aria-label="Больше">+</button>
            </div>
          </div>
          <button class="rm" data-rm="${i.key}" aria-label="Удалить">&times;</button>
        </div>`;
    }).join('') : '<p class="cart__empty">Корзина пуста.<br>Выберите что-нибудь из новинок 🙂</p>';

    $('#cartQty').textContent = qty;
    $('#cartTotal').textContent = money(total);
    $('#checkout').disabled = !cart.length;

    const badge = $('#cartCount');
    badge.textContent = qty;
    badge.hidden = qty === 0;
  }

  $('#cartBody').addEventListener('click', e => {
    const q = e.target.closest('[data-qty]');
    if (q) return changeQty(q.dataset.key, Number(q.dataset.qty));
    const r = e.target.closest('[data-rm]');
    if (r) return removeItem(r.dataset.rm);
  });

  $('#checkout').addEventListener('click', () => {
    if (!cart.length) return;
    const total = cart.reduce((s, i) => {
      const p = PRODUCTS.find(x => x.id === i.id);
      return s + (p ? p.price * i.qty : 0);
    }, 0);
    cart = []; saveCart(); drawCart(); closeAll();
    toast(`Заказ на ${money(total)} оформлен. Спасибо!`);
  });

  /* ---------------- панели / оверлей ---------------- */
  const overlay = $('#overlay');
  const cartEl  = $('#cart');
  const navEl   = $('#nav');

  const lock   = () => document.body.classList.add('locked');
  const unlock = () => document.body.classList.remove('locked');

  function openCart() { cartEl.classList.add('open'); cartEl.setAttribute('aria-hidden','false'); overlay.classList.add('show'); lock(); }
  function closeCart() { cartEl.classList.remove('open'); cartEl.setAttribute('aria-hidden','true'); }
  function openNav()  { navEl.classList.add('open'); overlay.classList.add('show'); lock(); $('#burger').setAttribute('aria-expanded','true'); }
  function closeNav() { navEl.classList.remove('open'); $('#burger').setAttribute('aria-expanded','false'); }
  function closeModal(){ $('#modal').classList.remove('open'); $('#modal').setAttribute('aria-hidden','true'); }

  function closeAll() {
    closeCart(); closeNav(); closeModal();
    overlay.classList.remove('show'); unlock();
  }

  $('#cartBtn').addEventListener('click', openCart);
  $('#cartClose').addEventListener('click', closeAll);
  $('#burger').addEventListener('click', openNav);
  $('#navClose').addEventListener('click', closeAll);
  overlay.addEventListener('click', closeAll);
  $('#modal').addEventListener('click', e => { if (e.target.id === 'modal') closeAll(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });

  /* ---------------- карточка товара (модалка) ---------------- */
  const SIZES = ['XS','S','M','L','XL'];

  function openProduct(id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return;
    $('#modalBox').innerHTML = `
      <button class="modal__close" data-close>&times;</button>
      <div class="pv">
        <div class="pv__img"><img src="${p.img}" alt="${p.name}"></div>
        <div>
          <h3>${p.name}</h3>
          <div class="rating">${starsHTML(p.rate)}<span><b>${p.rate.toFixed(1)}</b>/5</span></div>
          <div class="price">${money(p.price)}${p.old ? `<del>${money(p.old)}</del><span class="off">-${Math.round((1-p.price/p.old)*100)}%</span>` : ''}</div>
          <p class="desc">${p.desc}</p>
          <strong style="font-size:14px">Choose Size</strong>
          <div class="pv__sizes">${SIZES.map((s,i)=>`<button data-size="${s}" class="${i===2?'on':''}">${s}</button>`).join('')}</div>
          <button class="btn btn--dark btn--block" data-buy="${p.id}">Add to Cart</button>
        </div>
      </div>`;
    $('#modal').classList.add('open');
    $('#modal').setAttribute('aria-hidden','false');
    overlay.classList.add('show'); lock();
  }

  $('#modalBox').addEventListener('click', e => {
    if (e.target.closest('[data-close]')) return closeAll();
    const s = e.target.closest('[data-size]');
    if (s) {
      $$('[data-size]', $('#modalBox')).forEach(b => b.classList.remove('on'));
      s.classList.add('on');
      return;
    }
    const buy = e.target.closest('[data-buy]');
    if (buy) {
      const size = ($('[data-size].on', $('#modalBox')) || {}).dataset?.size || 'M';
      addToCart(buy.dataset.buy, size);
      closeAll();
    }
  });

  document.addEventListener('click', e => {
    const add = e.target.closest('[data-add]');
    if (add) { e.stopPropagation(); addToCart(add.dataset.add); return; }
    const card = e.target.closest('.card');
    if (card) openProduct(card.dataset.id);
  });

  document.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const card = e.target.closest?.('.card');
    if (card) openProduct(card.dataset.id);
  });

  /* ---------------- поиск ---------------- */
  const searchForms = $$('form[data-search]');

  function runSearch(form) {
    const input = $('input', form);
    const box = $('.search__results', form);
    const q = input.value.trim().toLowerCase();
    if (!q) { box.hidden = true; return; }

    const found = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) || p.cat.includes(q) || p.style.includes(q)
    ).slice(0, 6);

    box.innerHTML = found.length
      ? found.map(p => `
          <button type="button" class="search__item" data-go="${p.id}">
            <img src="${p.img}" alt="">
            <span><b>${p.name}</b><span>${money(p.price)}</span></span>
          </button>`).join('')
      : '<p class="search__empty">Ничего не найдено</p>';
    box.hidden = false;
  }

  searchForms.forEach(form => {
    const input = $('input', form);
    const box = $('.search__results', form);

    form.addEventListener('submit', e => e.preventDefault());   // не перезагружаем страницу
    input.addEventListener('input', () => runSearch(form));
    input.addEventListener('focus', () => runSearch(form));

    box.addEventListener('click', e => {
      const b = e.target.closest('[data-go]');
      if (!b) return;
      box.hidden = true;
      input.value = '';
      closeAll();
      openProduct(b.dataset.go);
    });
  });

  document.addEventListener('click', e => {
    if (e.target.closest('form[data-search]')) return;
    searchForms.forEach(f => { $('.search__results', f).hidden = true; });
  });

  $('#searchToggle').addEventListener('click', () => {
    const s = $('.search--desktop');
    s.classList.toggle('show');
    if (s.classList.contains('show')) $('input', s).focus();
  });

  /* ---------------- выпадающее меню ---------------- */
  $$('.has-drop > .nav__link').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const li = btn.parentElement;
      const open = li.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.has-drop')) $$('.has-drop').forEach(d => d.classList.remove('open'));
  });

  /* ---------------- отзывы: карусель ---------------- */
  const track = $('#revTrack');
  const viewport = $('#revViewport');
  track.innerHTML = REVIEWS.map(r => `
    <article class="review">
      ${starsHTML(r.rate)}
      <h3 class="review__name">${r.name}
        <span class="check"><svg viewBox="0 0 12 12"><path d="M2 6.3l2.6 2.6L10 3.5" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      </h3>
      <p>${r.text}</p>
    </article>`).join('');

  let index = 0;
  function step() {
    const first = track.querySelector('.review');
    if (!first) return 0;
    return first.getBoundingClientRect().width + 20;
  }
  function maxIndex() {
    const perView = Math.max(1, Math.floor(viewport.clientWidth / step()));
    return Math.max(0, REVIEWS.length - perView);
  }
  function go(i) {
    index = Math.min(Math.max(i, 0), maxIndex());
    track.style.transform = `translateX(${-index * step()}px)`;
  }
  $('#revPrev').addEventListener('click', () => go(index - 1));
  $('#revNext').addEventListener('click', () => go(index + 1));
  window.addEventListener('resize', () => go(index));

  // drag / swipe
  let startX = 0, dragging = false;
  viewport.addEventListener('pointerdown', e => {
    dragging = true; startX = e.clientX;
    viewport.classList.add('dragging');
    viewport.setPointerCapture(e.pointerId);
  });
  viewport.addEventListener('pointerup', e => {
    if (!dragging) return;
    dragging = false;
    viewport.classList.remove('dragging');
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
  });
  viewport.addEventListener('pointercancel', () => { dragging = false; viewport.classList.remove('dragging'); });

  /* ---------------- рассылка ---------------- */
  $('#newsForm').addEventListener('submit', e => {
    e.preventDefault();
    const email = $('#newsEmail');
    const ok = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email.value.trim());
    $('#newsError').hidden = ok;
    email.closest('.field').classList.toggle('invalid', !ok);
    if (!ok) { email.focus(); return; }
    email.value = '';
    toast('Спасибо! Мы отправили письмо с подтверждением.');
  });
  $('#newsEmail').addEventListener('input', () => {
    $('#newsError').hidden = true;
    $('#newsEmail').closest('.field').classList.remove('invalid');
  });

  /* ---------------- прочее ---------------- */
  $('.topbar__close').addEventListener('click', () => $('#topbar').classList.add('is-hidden'));
  $('#accountBtn').addEventListener('click', () => toast('Личный кабинет — скоро :)'));
  $$('[data-open="signup"]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    toast('Промокод на 20%: WELCOME20');
  }));

  $$('[data-scroll]').forEach(b => b.addEventListener('click', () => {
    $(b.dataset.scroll).scrollIntoView({ behavior:'smooth', block:'start' });
  }));

  // тень у шапки при скролле
  const header = $('#header');
  const onScroll = () => header.classList.toggle('is-stuck', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  // анимация счётчиков в hero
  const counters = $$('.stat dt');
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      const target = Number(en.target.dataset.count);
      const t0 = performance.now(), dur = 1200;
      (function tick(now) {
        const k = Math.min((now - t0) / dur, 1);
        const val = Math.round(target * (1 - Math.pow(1 - k, 3)));
        en.target.textContent = val.toLocaleString('en-US') + '+';
        if (k < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }, { threshold:.4 });
  counters.forEach(c => io.observe(c));

  /* ---------------- старт ---------------- */
  render();
  drawCart();
  go(0);
})();

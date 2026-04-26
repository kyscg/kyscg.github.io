(function () {

  async function fetchCoverUrl(title, author, localPath) {
    if (localPath) return localPath;
    return null;
  }

  function ratingColor(ratingStr) {
    var val = parseFloat(ratingStr);
    if (isNaN(val)) return '#d65d0e';
    if (val <= 1)   return '#cc241d'; // gruvbox bright red
    if (val < 4)    return '#d79921'; // gruvbox bright yellow
    return '#98971a';                 // gruvbox bright green
  }

  function buildProgressBar() {
    const el = document.querySelector('.books-progress');
    if (!el) return;

    const match = el.textContent.trim().match(/^(\d+)\s*\/\s*(\d+)$/);
    if (!match) return;

    const read  = parseInt(match[1], 10);
    const total = parseInt(match[2], 10);
    const pct   = Math.min(100, Math.round((read / total) * 100));

    el.innerHTML =
      '<div class="books-progress-header">' +
        '<span class="books-progress-label">reading progress</span>' +
        '<span class="books-progress-count">' + read + ' / ' + total + '</span>' +
      '</div>' +
      '<div class="books-progress-track" role="progressbar"' +
          ' aria-valuenow="' + read + '" aria-valuemin="0" aria-valuemax="' + total + '">' +
        '<div class="books-progress-fill" id="books-progress-fill" style="width:0%"></div>' +
      '</div>';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        var fill = document.getElementById('books-progress-fill');
        if (fill) fill.style.width = pct + '%';
      });
    });
  }

  function buildGrid(sections) {
    const wrapper = document.createElement('div');
    wrapper.id = 'books-grid-wrapper';

    const grid = document.createElement('div');
    grid.id = 'books-grid';
    wrapper.appendChild(grid);

    const panel = document.createElement('div');
    panel.id = 'books-panel';
    panel.setAttribute('aria-hidden', 'true');
    panel.innerHTML =
      '<div id="books-panel-header">' +
        '<div id="books-panel-meta"></div>' +
        '<button id="books-panel-close" aria-label="Close review">&#215;</button>' +
      '</div>' +
      '<div id="books-panel-body"></div>';

    sections[0].el.parentNode.insertBefore(wrapper, sections[0].el);
    sections.forEach(s => { s.el.style.display = 'none'; });

    let activeId = null;

    function closePanel() {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
      if (activeId !== null) {
        const prev = document.querySelector('.books-card[data-id="' + activeId + '"]');
        if (prev) prev.classList.remove('active');
        activeId = null;
      }
      if (panel.parentNode === grid) grid.removeChild(panel);
    }

    function lastCardInRow(clickedCard) {
      const cards = Array.from(grid.querySelectorAll('.books-card'));
      const rowTop = clickedCard.offsetTop;
      let last = clickedCard;
      for (const card of cards) {
        if (card.offsetTop === rowTop) last = card;
      }
      return last;
    }

    function openPanel(section, clickedCard) {
      const meta = panel.querySelector('#books-panel-meta');
      const body = panel.querySelector('#books-panel-body');
      const coverSrc = section.coverUrl;

      meta.innerHTML =
        (coverSrc
          ? '<img class="books-panel-cover" src="' + coverSrc + '" alt="Cover of ' + section.title + '">'
          : '<div class="books-panel-cover-ph"></div>') +
        '<div class="books-panel-info">' +
          '<a class="books-panel-title" href="' + section.link + '" target="_blank" rel="noopener">' + section.title + '</a>' +
          '<div class="books-panel-author">' + section.author + '</div>' +
          '<div class="books-panel-rating" style="color:' + ratingColor(section.rating) + '">' + section.rating + '</div>' +
        '</div>';

      const clone = section.el.cloneNode(true);
      const heading = clone.querySelector('h4');
      if (heading) heading.remove();
      body.innerHTML = clone.innerHTML;

      const anchor = lastCardInRow(clickedCard);
      anchor.insertAdjacentElement('afterend', panel);

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          panel.classList.add('open');
          panel.setAttribute('aria-hidden', 'false');
          panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
      });
    }

    panel.querySelector('#books-panel-close').addEventListener('click', closePanel);

    // Stagger cards into view when the grid scrolls into the viewport
    function observeGrid() {
      if (!('IntersectionObserver' in window)) {
        grid.querySelectorAll('.books-card-hidden').forEach(function (c) {
          c.classList.remove('books-card-hidden');
          c.classList.add('books-card-visible');
        });
        return;
      }
      var obs = new IntersectionObserver(function (entries, o) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          o.unobserve(entry.target);
          var cards = entry.target.querySelectorAll('.books-card-hidden');
          cards.forEach(function (card, i) {
            setTimeout(function () {
              card.classList.remove('books-card-hidden');
              card.classList.add('books-card-visible');
            }, i * 80);
          });
        });
      }, { threshold: 0.05 });
      obs.observe(grid);
    }
    observeGrid();

    sections.forEach(function (section, i) {
      const card = document.createElement('div');
      card.className = 'books-card books-card-hidden';
      card.setAttribute('data-id', i);
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', section.title + ' by ' + section.author + ' — click to read review');

      card.innerHTML =
        '<div class="books-cover-wrap">' +
          '<div class="books-spinner" id="books-spinner-' + i + '"></div>' +
          '<div class="books-rating-badge" style="background:' + ratingColor(section.rating) + '">' + section.rating + '</div>' +
        '</div>' +
        '<div class="books-card-meta">' +
          '<div class="books-card-title">' + section.title + '</div>' +
          '<div class="books-card-author">' + section.author + '</div>' +
        '</div>';

      function toggle() {
        if (activeId === i) { closePanel(); return; }
        grid.querySelectorAll('.books-card').forEach(function (c) { c.classList.remove('active'); });
        card.classList.add('active');
        activeId = i;
        openPanel(section, card);
      }

      card.addEventListener('click', toggle);
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      });

      grid.appendChild(card);

      fetchCoverUrl(section.title, section.author, section.localCover).then(function (url) {
        section.coverUrl = url;
        const spinner = document.getElementById('books-spinner-' + i);
        const wrap = card.querySelector('.books-cover-wrap');
        if (spinner) spinner.remove();
        if (url) {
          const img = document.createElement('img');
          img.src = url;
          img.alt = 'Cover of ' + section.title;
          img.className = 'books-cover-img';
          wrap.insertBefore(img, wrap.querySelector('.books-rating-badge'));
        } else {
          const ph = document.createElement('div');
          ph.className = 'books-cover-ph';
          wrap.insertBefore(ph, wrap.querySelector('.books-rating-badge'));
        }
      });
    });
  }

  function parseSections() {
    return Array.from(document.querySelectorAll('.book-section')).map(function (el) {
      return {
        el,
        title:      el.dataset.title,
        author:     el.dataset.author,
        rating:     el.dataset.rating,
        link:       el.dataset.link,
        localCover: el.dataset.cover || null,
        coverUrl:   null,
      };
    });
  }

  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = [
      '#books-grid-wrapper { margin: 0 0 2rem; }',

      '#books-grid {',
      '  display: grid;',
      '  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));',
      '  gap: 1.5rem;',
      '}',

      '.books-progress { margin-bottom: 2rem; }',
      '.books-progress-header {',
      '  display: flex; justify-content: space-between; align-items: baseline;',
      '  margin-bottom: 0.4rem;',
      '}',
      '.books-progress-label {',
      '  font-family: "Triplicate T4", "Courier New", monospace;',
      '  font-size: 0.78em; text-transform: uppercase; letter-spacing: 0.05em; color: #928374;',
      '}',
      '.books-progress-count {',
      '  font-family: "Triplicate T4", "Courier New", monospace;',
      '  font-size: 0.85em; color: #d65d0e; font-weight: bold;',
      '}',
      '.books-progress-track {',
      '  width: 100%; height: 6px; background: #ebdbb2; border-radius: 3px; overflow: hidden;',
      '}',
      '.books-progress-fill {',
      '  height: 100%; background: #d65d0e; border-radius: 3px; transition: width 0.6s ease;',
      '}',

      '.books-card { cursor: pointer; display: flex; flex-direction: column; outline: none; }',
      '.books-card-hidden { opacity: 0; transform: translateY(10px); }',
      '.books-card-visible { animation: books-enter 0.35s ease forwards; }',
      '@keyframes books-enter {',
      '  from { opacity: 0; transform: translateY(10px); }',
      '  to   { opacity: 1; transform: translateY(0); }',
      '}',

      '.books-cover-wrap {',
      '  position: relative; background: #ebdbb2; border: 2px solid #d5c4a1;',
      '  aspect-ratio: 2 / 3; overflow: hidden;',
      '  transition: border-color 0.2s ease, transform 0.15s ease;',
      '}',
      '.books-card:hover .books-cover-wrap,',
      '.books-card:focus-visible .books-cover-wrap {',
      '  border-color: #d65d0e; transform: translateY(-3px);',
      '}',
      '.books-card.active .books-cover-wrap { border-color: #d65d0e; border-width: 3px; }',

      '.books-cover-img {',
      '  position: absolute; inset: 0; width: 100%; height: 100%;',
      '  object-fit: cover; display: block;',
      '}',
      '.books-cover-ph {',
      '  position: absolute; inset: 0;',
      '  background: linear-gradient(90deg, #ebdbb2 25%, #d5c4a1 50%, #ebdbb2 75%);',
      '  background-size: 200% 100%;',
      '  animation: books-shimmer 1.6s ease-in-out infinite;',
      '}',

      '.books-rating-badge {',
      '  position: absolute; top: 6px; right: 6px;',
      '  background: #d65d0e; color: #fbf1c7;',
      '  font-size: 11px; font-family: "Triplicate T4", "Courier New", monospace;',
      '  font-weight: bold; padding: 2px 6px; line-height: 1.4; z-index: 2;',
      '}',

      '.books-spinner {',
      '  position: absolute; inset: 0;',
      '  background: linear-gradient(90deg, #ebdbb2 25%, #d5c4a1 50%, #ebdbb2 75%);',
      '  background-size: 200% 100%;',
      '  animation: books-shimmer 1.6s ease-in-out infinite;',
      '}',
      '@keyframes books-shimmer {',
      '  0%   { background-position: 200% 0; }',
      '  100% { background-position: -200% 0; }',
      '}',

      '.books-card-meta { padding: 8px 0 4px; }',
      '.books-card-title { font-size: 0.85em; font-weight: bold; color: #282828; line-height: 1.3; margin-bottom: 2px; }',
      '.books-card-author { font-size: 0.78em; color: #928374; font-style: italic; }',

      '#books-panel {',
      '  grid-column: 1 / -1; overflow: hidden; max-height: 0;',
      '  border-left: 4px solid #d65d0e; background: #fbf1c7;',
      '  transition: max-height 0.45s ease, padding 0.3s ease, margin 0.3s ease;',
      '  margin: 0;',
      '}',
      '#books-panel.open { max-height: 3000px; padding: 1.5rem 2rem; margin: 0.5rem 0; }',

      '#books-panel-header {',
      '  display: flex; justify-content: space-between; align-items: flex-start;',
      '  border-bottom: 1px solid #d5c4a1; padding-bottom: 0.75rem; margin-bottom: 1.25rem;',
      '}',
      '#books-panel-meta { display: flex; gap: 1rem; align-items: flex-start; }',

      '.books-panel-cover {',
      '  width: 60px; height: 90px; object-fit: cover;',
      '  border: 1px solid #d5c4a1; flex-shrink: 0; display: block;',
      '}',
      '.books-panel-cover-ph { width: 60px; height: 90px; background: #d5c4a1; flex-shrink: 0; }',

      '.books-panel-info { display: flex; flex-direction: column; gap: 3px; }',
      '.books-panel-title { font-size: 1.3em; font-weight: normal; color: #282828; text-decoration: none; }',
      '.books-panel-title:hover { color: #427b58; text-decoration: underline; }',
      '.books-panel-author { font-size: 0.9em; color: #928374; font-style: italic; }',
      '.books-panel-rating {',
      '  font-size: 0.8em; font-family: "Triplicate T4", "Courier New", monospace;',
      '  color: #d65d0e; font-weight: bold;',
      '}',

      '#books-panel-close {',
      '  background: none; border: 1px solid #d5c4a1; color: #928374;',
      '  font-size: 18px; width: 28px; height: 28px; cursor: pointer;',
      '  display: flex; align-items: center; justify-content: center;',
      '  flex-shrink: 0; line-height: 1;',
      '  transition: color 0.15s, border-color 0.15s;',
      '}',
      '#books-panel-close:hover { color: #d65d0e; border-color: #d65d0e; }',

      '#books-panel-body {',
      '  font-size: 0.92em; line-height: 1.7; color: #3c3836;',
      '  max-height: 60vh; overflow-y: auto; padding-right: 1rem;',
      '}',
      '#books-panel-body p { text-align: justify; }',
      '#books-panel-body::-webkit-scrollbar { width: 6px; }',
      '#books-panel-body::-webkit-scrollbar-track { background: #ebdbb2; }',
      '#books-panel-body::-webkit-scrollbar-thumb { background: #928374; }',
      '#books-panel-body::-webkit-scrollbar-thumb:hover { background: #d65d0e; }',
    ].join('\n');
    document.head.appendChild(style);
  }

  document.addEventListener('DOMContentLoaded', function () {
    const sections = parseSections();
    if (!sections.length) return;
    injectStyles();
    buildProgressBar();
    buildGrid(sections);
  });
})();

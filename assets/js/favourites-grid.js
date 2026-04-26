(function () {

  function buildCallout() {
    // Find all <p> nodes that are siblings before the first .fav-section
    var firstSection = document.querySelector('.fav-section');
    if (!firstSection) return;

    var parent = firstSection.parentNode;
    var paras = [];
    var node = firstSection.previousSibling;

    while (node) {
      if (node.nodeType === 1 && node.tagName === 'P') paras.unshift(node);
      node = node.previousSibling;
    }
    if (!paras.length) return;

    // Build callout wrapper
    var callout = document.createElement('div');
    callout.className = 'fav-callout';

    var toggle = document.createElement('button');
    toggle.className = 'fav-callout-toggle';
    toggle.setAttribute('aria-expanded', 'false');

    var body = document.createElement('div');
    body.className = 'fav-callout-body';

    // Move all found paragraphs into the callout body
    paras.forEach(function (p) {
      body.appendChild(p);
    });

    var chevron = document.createElement('span');
    chevron.className = 'fav-callout-chevron';
    chevron.innerHTML = '&#9654;';

    toggle.appendChild(chevron);
    toggle.appendChild(document.createTextNode('\u00a0a note on this list'));

    toggle.addEventListener('click', function () {
      var open = callout.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    callout.appendChild(toggle);
    callout.appendChild(body);
    parent.insertBefore(callout, firstSection);
  }

  function buildSections() {
    var sections = document.querySelectorAll('.fav-section');
    if (!sections.length) return;

    sections.forEach(function (sec) {
      var sectionName = sec.dataset.section || '';
      var books = sec.querySelectorAll('.fav-book');
      if (!books.length) return;

      var h2 = sec.querySelector('h2');
      if (h2) h2.style.display = 'none';
      books.forEach(function (b) { b.style.display = 'none'; });

      var header = document.createElement('div');
      header.className = 'fav-section-header';
      header.innerHTML =
        '<span class="fav-section-label">' + sectionName + '</span>' +
        '<div class="fav-section-rule"></div>' +
        '<span class="fav-section-count">' + books.length + ' books</span>';
      sec.insertBefore(header, sec.firstChild);

      var grid = document.createElement('div');
      grid.className = 'fav-grid';
      sec.appendChild(grid);

      books.forEach(function (bookEl, i) {
        var title  = bookEl.dataset.title  || '';
        var author = bookEl.dataset.author || '';
        var cover  = bookEl.dataset.cover  || '';

        var card = document.createElement('div');
        card.className = 'fav-card fav-card-hidden';

        var coverWrap = document.createElement('div');
        coverWrap.className = 'fav-cover';

        if (cover) {
          var img = document.createElement('img');
          img.src = cover;
          img.alt = title;
          img.loading = 'lazy';
          coverWrap.appendChild(img);
          // Shimmer shown until image loads
          var shimmer = document.createElement('div');
          shimmer.className = 'fav-cover-ph';
          coverWrap.appendChild(shimmer);
          img.addEventListener('load',  function () { shimmer.remove(); });
          img.addEventListener('error', function () { shimmer.remove(); });
        } else {
          var ph = document.createElement('div');
          ph.className = 'fav-cover-ph';
          coverWrap.appendChild(ph);
        }

        var overlay = document.createElement('div');
        overlay.className = 'fav-overlay';
        overlay.innerHTML =
          '<div class="fav-overlay-title">' + title + '</div>' +
          (author ? '<div class="fav-overlay-author">' + author + '</div>' : '');
        coverWrap.appendChild(overlay);

        card.appendChild(coverWrap);
        grid.appendChild(card);
      });

      // Stagger cards into view when their grid scrolls into viewport
      observeGrid(grid);
    });
  }

  function observeGrid(grid) {
    if (!('IntersectionObserver' in window)) {
      // Fallback: just show everything
      grid.querySelectorAll('.fav-card-hidden').forEach(function (c) {
        c.classList.remove('fav-card-hidden');
        c.classList.add('fav-card-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        var cards = entry.target.querySelectorAll('.fav-card-hidden');
        cards.forEach(function (card, i) {
          setTimeout(function () {
            card.classList.remove('fav-card-hidden');
            card.classList.add('fav-card-visible');
          }, i * 35);
        });
      });
    }, { threshold: 0.05 });

    observer.observe(grid);
  }

  function injectStyles() {
    var style = document.createElement('style');
    style.textContent = [

      // Callout
      '.fav-callout {',
      '  margin-bottom: 2rem;',
      '  border-left: 3px solid #d65d0e;',
      '}',
      '.fav-callout-toggle {',
      '  display: flex; align-items: center;',
      '  background: none; border: none; cursor: pointer; padding: 0.4rem 0.75rem;',
      '  font-family: "Triplicate T4", "Courier New", monospace;',
      '  font-size: 0.78em; color: #928374; letter-spacing: 0.03em;',
      '  transition: color 0.15s;',
      '}',
      '.fav-callout-toggle:hover { color: #d65d0e; }',
      '.fav-callout-chevron {',
      '  display: inline-block; font-size: 0.6em; margin-right: 0.4em;',
      '  transition: transform 0.25s ease; transform-origin: center;',
      '}',
      '.fav-callout.open .fav-callout-chevron { transform: rotate(90deg); }',
      '.fav-callout-body {',
      '  max-height: 0; overflow: hidden;',
      '  transition: max-height 0.4s ease;',
      '}',
      '.fav-callout.open .fav-callout-body { max-height: 1000px; }',
      '.fav-callout-body p {',
      '  font-size: 0.88em; color: #665c54;',
      '  line-height: 1.7; padding: 0.5rem 0.75rem 0.75rem;',
      '  margin: 0;',
      '}',

      // Section layout
      '.fav-section { margin-bottom: 2.5rem; }',
      '.fav-section-header {',
      '  display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;',
      '}',
      '.fav-section-label {',
      '  font-family: "Triplicate T4", "Courier New", monospace;',
      '  font-size: 0.7em; font-weight: bold; text-transform: uppercase;',
      '  letter-spacing: 0.15em; white-space: nowrap;',
      '  color: #fbf1c7; background: #d65d0e; padding: 3px 10px;',
      '}',
      '.fav-section-rule { flex: 1; height: 1px; background: #d5c4a1; }',
      '.fav-section-count {',
      '  font-family: "Triplicate T4", "Courier New", monospace;',
      '  font-size: 0.68em; color: #928374; white-space: nowrap;',
      '}',

      // Grid
      '.fav-grid {',
      '  display: grid;',
      '  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));',
      '  gap: 0.75rem;',
      '}',

      // Card entrance animation
      '.fav-card { display: flex; flex-direction: column; }',
      '.fav-card-hidden { opacity: 0; transform: translateY(10px); }',
      '.fav-card-visible {',
      '  animation: fav-enter 0.35s ease forwards;',
      '}',
      '@keyframes fav-enter {',
      '  from { opacity: 0; transform: translateY(10px); }',
      '  to   { opacity: 1; transform: translateY(0); }',
      '}',

      // Cover
      '.fav-cover {',
      '  position: relative; aspect-ratio: 2/3;',
      '  background: #ebdbb2; border: 1px solid #d5c4a1; overflow: hidden;',
      '  transition: border-color 0.2s ease, transform 0.15s ease;',
      '}',
      '.fav-card:hover .fav-cover {',
      '  border-color: #d65d0e; transform: translateY(-3px);',
      '}',
      '.fav-cover img {',
      '  position: absolute; inset: 0;',
      '  width: 100%; height: 100%; object-fit: cover; display: block;',
      '}',

      // Shimmer placeholder
      '.fav-cover-ph {',
      '  position: absolute; inset: 0;',
      '  background: linear-gradient(90deg, #ebdbb2 25%, #d5c4a1 50%, #ebdbb2 75%);',
      '  background-size: 200% 100%;',
      '  animation: fav-shimmer 1.6s ease-in-out infinite;',
      '}',
      '@keyframes fav-shimmer {',
      '  0%   { background-position: 200% 0; }',
      '  100% { background-position: -200% 0; }',
      '}',

      // Overlay
      '.fav-overlay {',
      '  position: absolute; bottom: 0; left: 0; right: 0;',
      '  background: rgba(40,40,40,0.9); padding: 6px 7px;',
      '  opacity: 0; transform: translateY(4px);',
      '  transition: opacity 0.2s ease, transform 0.2s ease;',
      '  pointer-events: none;',
      '}',
      '.fav-card:hover .fav-overlay { opacity: 1; transform: translateY(0); }',
      '.fav-overlay-title {',
      '  font-size: 10px; font-weight: bold; color: #fbf1c7; line-height: 1.3;',
      '  display: -webkit-box; -webkit-line-clamp: 3;',
      '  -webkit-box-orient: vertical; overflow: hidden;',
      '}',
      '.fav-overlay-author {',
      '  font-size: 9px; color: #a89984; margin-top: 2px; font-style: italic;',
      '  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;',
      '}',

    ].join('\n');
    document.head.appendChild(style);
  }

  document.addEventListener('DOMContentLoaded', function () {
    injectStyles();
    buildCallout();
    buildSections();
  });

})();

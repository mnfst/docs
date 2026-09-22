// Docs switcher on the logo.
// Every logo link gets a chevrons icon, and a click opens a menu listing the
// two Manifest doc sites: this one (Gateway, marked active) and the
// Self-Healing docs. The theme re-renders the header on navigation, so the
// icon is re-added whenever it goes missing.
(function () {
  var MENU_ID = 'docs-switcher-menu';
  var CHEVRON_CLASS = 'docs-switcher-chevron';
  var SELF_HEALING_URL = 'https://docs.manifest.build';

  var CHEVRONS_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>';
  var CHECK_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
  var EXTERNAL_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>';

  function logoLinks() {
    var links = [];
    document.querySelectorAll('img.nav-logo').forEach(function (img) {
      var a = img.closest('a');
      if (a && links.indexOf(a) === -1) links.push(a);
    });
    return links;
  }

  function ensureChevrons() {
    logoLinks().forEach(function (a) {
      a.classList.add('docs-switcher-trigger');
      a.setAttribute('aria-haspopup', 'menu');
      if (a.querySelector('.' + CHEVRON_CLASS)) return;
      var span = document.createElement('span');
      span.className = CHEVRON_CLASS;
      span.innerHTML = CHEVRONS_SVG;
      a.appendChild(span);
    });
  }

  function buildMenu() {
    var menu = document.createElement('div');
    menu.id = MENU_ID;
    menu.setAttribute('role', 'menu');
    menu.hidden = true;
    menu.innerHTML =
      '<div class="docs-switcher-item is-active" role="menuitem" aria-current="true">' +
      '<span>Manifest Gateway Docs</span>' + CHECK_SVG +
      '</div>' +
      '<a class="docs-switcher-item" role="menuitem" href="' + SELF_HEALING_URL + '">' +
      '<span>Manifest Self-Healing Docs</span>' + EXTERNAL_SVG +
      '</a>';
    document.body.appendChild(menu);
    return menu;
  }

  function getMenu() {
    return document.getElementById(MENU_ID) || buildMenu();
  }

  function openMenu(trigger) {
    var menu = getMenu();
    var r = trigger.getBoundingClientRect();
    menu.style.top = Math.round(r.bottom + 8) + 'px';
    menu.style.left = Math.round(r.left) + 'px';
    menu.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    var menu = document.getElementById(MENU_ID);
    if (menu) menu.hidden = true;
    logoLinks().forEach(function (a) {
      a.setAttribute('aria-expanded', 'false');
    });
  }

  // Capture phase, so the theme's router never sees the logo click.
  document.addEventListener(
    'click',
    function (e) {
      var trigger = e.target.closest('.docs-switcher-trigger');
      if (trigger) {
        e.preventDefault();
        e.stopPropagation();
        var menu = document.getElementById(MENU_ID);
        if (menu && !menu.hidden) closeMenu();
        else openMenu(trigger);
        return;
      }
      if (!e.target.closest('#' + MENU_ID)) closeMenu();
    },
    true
  );

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', closeMenu);
  window.addEventListener('scroll', closeMenu, true);

  var scheduled = null;
  function schedule() {
    if (scheduled) return;
    scheduled = setTimeout(function () {
      scheduled = null;
      ensureChevrons();
    }, 150);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureChevrons);
  } else {
    ensureChevrons();
  }

  new MutationObserver(schedule).observe(document.body, {
    childList: true,
    subtree: true,
  });
})();

// Cloud / Self-hosted content toggle.
// Pages opt in by including a .deploy-mode-toggle control and wrapping
// mode-specific content in [data-deploy="cloud"] / [data-deploy="selfhosted"].
// The chosen mode lives as a class on <html>, so it survives SPA navigation,
// and in localStorage, so it survives visits. Without JS no class is set and
// every section stays visible.
//
// Companions:
// - a dynamic stylesheet hides table-of-contents entries that point at
//   headings living inside a wrapper the current mode hides;
// - a fixed copy of the toggle fades in next to the Documentation tab as soon
//   as the inline toggle slides under the header bar;
// - the theme keeps its own navbar hidden on this layout, so we render the
//   Book a call button ourselves, fixed top right.
(function () {
  var STORAGE_KEY = 'manifest-deploy-mode';
  var TOC_STYLE_ID = 'deploy-mode-toc-style';
  var FLOATING_CLASS = 'deploy-mode-toggle--floating';
  var TAB_GAP = 40;
  var HEADER_FALLBACK = 48;

  function apply(mode) {
    document.documentElement.classList.remove('deploy-cloud', 'deploy-selfhosted');
    document.documentElement.classList.add('deploy-' + mode);
  }

  var saved = 'cloud';
  try {
    saved = localStorage.getItem(STORAGE_KEY) || 'cloud';
  } catch (e) {}
  apply(saved === 'selfhosted' ? 'selfhosted' : 'cloud');

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-deploy-mode]');
    if (!btn) return;
    var mode = btn.getAttribute('data-deploy-mode') === 'selfhosted' ? 'selfhosted' : 'cloud';
    apply(mode);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch (e) {}
  });

  // Hide TOC links to headings that the current mode hides. Rules are
  // generated from the actual wrappers on the page, so any future tagged
  // section is covered without touching this script.
  function syncToc() {
    var style = document.getElementById(TOC_STYLE_ID);
    if (!style) {
      style = document.createElement('style');
      style.id = TOC_STYLE_ID;
      document.head.appendChild(style);
    }
    var rules = [];
    ['cloud', 'selfhosted'].forEach(function (visibleMode) {
      var hiddenMode = visibleMode === 'cloud' ? 'selfhosted' : 'cloud';
      document
        .querySelectorAll('[data-deploy="' + hiddenMode + '"] [id]')
        .forEach(function (el) {
          rules.push(
            'html.deploy-' + visibleMode + ' a[href="#' + el.id + '"]{display:none}'
          );
        });
    });
    var css = rules.join('\n');
    if (style.textContent !== css) style.textContent = css;
  }

  // The Documentation tab in the top bar, used to anchor the floating toggle
  // and to measure the header height the inline toggle slides under.
  function topTab() {
    var tab = document.querySelector('.navbar-link');
    if (tab && tab.getBoundingClientRect().width > 0) return tab;
    return null;
  }

  function positionFloating(floating) {
    var tab = topTab();
    if (tab) {
      floating.style.left = Math.round(tab.getBoundingClientRect().right + TAB_GAP) + 'px';
      floating.classList.add('is-anchored');
    } else {
      floating.style.left = '';
      floating.classList.remove('is-anchored');
    }
  }

  function headerHeight() {
    var tab = topTab();
    if (!tab) return HEADER_FALLBACK;
    var bottom = Math.round(tab.getBoundingClientRect().bottom);
    return bottom > 0 && bottom < 200 ? bottom : HEADER_FALLBACK;
  }

  // Keep exactly one floating copy of the inline toggle, faded in while the
  // inline one sits under the header or above the viewport. Click handling is
  // the delegated listener above, so the clone needs no wiring of its own.
  var observer = null;
  var observedEl = null;

  function syncFloating() {
    var inline = document.querySelector('.deploy-mode-toggle:not(.' + FLOATING_CLASS + ')');
    var floating = document.querySelector('.' + FLOATING_CLASS);

    if (!inline) {
      if (floating) floating.remove();
      if (observer) {
        observer.disconnect();
        observer = null;
        observedEl = null;
      }
      return;
    }

    if (!floating) {
      floating = inline.cloneNode(true);
      floating.classList.add(FLOATING_CLASS);
      document.body.appendChild(floating);
    }
    positionFloating(floating);

    // React re-creates the content DOM on hydration and navigation, so the
    // node we observed may be detached. Re-observe the live one, with the
    // header band excluded from the intersection root: the floating copy
    // appears the moment the inline toggle slides under the header, not once
    // it leaves the whole viewport.
    if (observedEl !== inline) {
      if (observer) observer.disconnect();
      observer = new IntersectionObserver(
        function (entries) {
          var current = document.querySelector('.' + FLOATING_CLASS);
          if (!current) return;
          current.classList.toggle('is-visible', !entries[0].isIntersecting);
        },
        { rootMargin: '-' + headerHeight() + 'px 0px 0px 0px' }
      );
      observer.observe(inline);
      observedEl = inline;
    }
  }

  // The theme keeps its navbar hidden on this layout, so the docs.json CTA
  // never shows. Render our own Book a call button, fixed top right.
  function ensureBookCall() {
    if (document.querySelector('.docs-book-call')) return;
    var a = document.createElement('a');
    a.className = 'docs-book-call';
    a.href = 'https://calendly.com/sebastien-manifest/30min';
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = 'Book a call';
    document.body.appendChild(a);
  }

  var scheduled = null;
  function syncAll() {
    syncToc();
    syncFloating();
    ensureBookCall();
  }

  function schedule() {
    if (scheduled) return;
    scheduled = setTimeout(function () {
      scheduled = null;
      syncAll();
    }, 150);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncAll);
  } else {
    syncAll();
  }

  window.addEventListener('resize', schedule);

  // Mintlify is a SPA: re-run when the page content re-renders.
  new MutationObserver(schedule).observe(document.body, {
    childList: true,
    subtree: true,
  });
})();

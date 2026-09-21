// Prevent tab clicks from adding hash to URL and causing scroll jumps
document.addEventListener('click', function(e) {
  var tab = e.target.closest('[role="tab"]');
  if (tab) {
    // Let Mintlify handle the tab switch, then strip the hash
    requestAnimationFrame(function() {
      var scrollY = window.scrollY;
      history.replaceState(null, '', window.location.pathname);
      window.scrollTo(0, scrollY);
    });
  }
});

// On page load, if there's a tab hash, strip it and prevent jump
if (window.location.hash && document.querySelector('[role="tab"]')) {
  var scrollY = window.scrollY;
  history.replaceState(null, '', window.location.pathname);
  window.scrollTo(0, scrollY);
}

// Keep the primary Manifest product visible from the Gateway documentation.
// Mintlify re-renders the navbar during client-side navigation, so create the
// link outside the theme-owned tree and restore it if that tree changes.
(function () {
  function ensureSelfHealingLink() {
    if (document.querySelector('.docs-self-healing')) return;

    var link = document.createElement('a');
    link.className = 'docs-self-healing';
    link.href = 'https://docs.manifest.build';
    link.setAttribute('aria-label', 'Open the Manifest Self-Healing documentation');
    link.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M8 6h9v2H8z"></path>' +
      '<path d="M20 2H6C4.35 2 3 3.35 3 5v14c0 1.65 1.35 3 3 3h15v-2H6c-.55 0-1-.45-1-1s.45-1 1-1h14c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1m-6 14H6c-.35 0-.69.07-1 .18V5c0-.55.45-1 1-1h13v12z"></path>' +
      '</svg><span>Manifest Self-Healing</span>';
    document.body.appendChild(link);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureSelfHealingLink);
  } else {
    ensureSelfHealingLink();
  }

  new MutationObserver(ensureSelfHealingLink).observe(document.body, {
    childList: true,
    subtree: true,
  });
})();

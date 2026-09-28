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

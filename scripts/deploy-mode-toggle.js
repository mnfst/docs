// Cloud / Self-hosted content toggle.
// Pages opt in by including a .deploy-mode-toggle control and wrapping
// mode-specific content in [data-deploy="cloud"] / [data-deploy="selfhosted"].
// The chosen mode lives as a class on <html>, so it survives SPA navigation,
// and in localStorage, so it survives visits. Without JS no class is set and
// every section stays visible.
(function () {
  function apply(mode) {
    document.documentElement.classList.remove('deploy-cloud', 'deploy-selfhosted');
    document.documentElement.classList.add('deploy-' + mode);
  }

  var saved = 'cloud';
  try {
    saved = localStorage.getItem('manifest-deploy-mode') || 'cloud';
  } catch (e) {}
  apply(saved === 'selfhosted' ? 'selfhosted' : 'cloud');

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-deploy-mode]');
    if (!btn) return;
    var mode = btn.getAttribute('data-deploy-mode') === 'selfhosted' ? 'selfhosted' : 'cloud';
    apply(mode);
    try {
      localStorage.setItem('manifest-deploy-mode', mode);
    } catch (e) {}
  });
})();

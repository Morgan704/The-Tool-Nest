<script>
// reset.js — universal reset for Tool Nest
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.reset-btn');
  if (!btn) return;
  e.preventDefault();

  // pick a sensible scope: nearest tool wrapper or the whole document
  const scope =
    btn.closest('.tool-wrap, .tool-center, main, body') || document;

  // 1) Reset forms if present
  scope.querySelectorAll('form').forEach(f => f.reset());

  // 2) Clear inputs & textareas
  scope.querySelectorAll('input, textarea, select').forEach(el => {
    const t = (el.type || '').toLowerCase();
    if (t === 'checkbox' || t === 'radio') el.checked = false;
    else if (t === 'file') el.value = '';
    else if (el.tagName === 'SELECT') el.selectedIndex = 0;
    else el.value = '';
  });

  // 3) Clear common output/preview/result containers
  const clearTargets = scope.querySelectorAll(
    '[id*="output"],[class*="output"],' +
    '[id*="result"],[class*="result"],' +
    '[id*="preview"],[class*="preview"],' +
    '#qrCode,#passwordOutput,#out,#outDiv'
  );
  clearTargets.forEach(n => n.innerHTML = '');

  // 4) Revoke any blob previews (images, videos)
  scope.querySelectorAll('img,video').forEach(m => {
    if (m.src && m.src.startsWith('blob:')) {
      try { URL.revokeObjectURL(m.src); } catch(_) {}
      m.removeAttribute('src');
    }
  });

  // 5) Clear canvases (e.g., QR tools)
  scope.querySelectorAll('canvas').forEach(c => {
    const w = c.width; c.width = 1; c.width = w; // quick clear trick
    const ctx = c.getContext && c.getContext('2d');
    if (ctx) { ctx.clearRect(0,0,c.width,c.height); }
  });

  // 6) Word-counter metric spans (if present)
  ['wcWords','wcChars','wcSentences','wcParas','wcTime'].forEach(id => {
    const el = scope.querySelector('#' + id);
    if (el) el.textContent = '0';
  });
});
</script>

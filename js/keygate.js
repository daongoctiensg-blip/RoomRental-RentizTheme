(function () {
  const KEY_HASH = '27a8254db0d2ea815a170223d2ab2fd3472d3f9d4f98d28de6052dc303cf999a';
  const SESSION_FLAG = 'roomRentalUnlocked';

  if (sessionStorage.getItem(SESSION_FLAG) === '1') return;

  async function sha256(text) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  const overlay = document.createElement('div');
  overlay.id = 'keyGateOverlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:#23281f;display:flex;align-items:center;justify-content:center;z-index:9999;font-family:system-ui,sans-serif;';
  overlay.innerHTML = `
    <div style="background:#fff;padding:28px;border-radius:10px;width:280px;text-align:center;">
      <div style="font-weight:600;margin-bottom:12px;">Nhập mã truy cập</div>
      <input id="keyGateInput" type="password" style="width:100%;padding:8px 10px;border:1px solid #ccc;border-radius:6px;font-size:15px;box-sizing:border-box;">
      <div id="keyGateError" style="color:#a33;font-size:12px;margin-top:6px;display:none;">Mã không đúng</div>
      <button id="keyGateSubmit" style="margin-top:12px;width:100%;padding:9px;background:#3c5b42;color:#fff;border:none;border-radius:6px;font-size:14px;cursor:pointer;">Vào</button>
    </div>
  `;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  const input = document.getElementById('keyGateInput');
  const errEl = document.getElementById('keyGateError');

  async function trySubmit() {
    const val = input.value;
    const hash = await sha256(val);
    if (hash === KEY_HASH) {
      sessionStorage.setItem(SESSION_FLAG, '1');
      overlay.remove();
      document.body.style.overflow = '';
    } else {
      errEl.style.display = 'block';
      input.value = '';
      input.focus();
    }
  }

  document.getElementById('keyGateSubmit').addEventListener('click', trySubmit);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') trySubmit(); });
  input.focus();
})();

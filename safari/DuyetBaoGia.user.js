// ==UserScript==
// @name         Duyệt Báo Giá (Safari)
// @namespace    trithucnguyen97.duyet-bao-gia
// @version      1.0.0
// @description  Phân tích & duyệt báo giá trên CRM Đại Dương / Hải Âu. Phần phân tích tự cập nhật từ GitHub (đã ký số).
// @match        https://quanly.baobidaiduong.com/*
// @match        https://crm.bangkeohaiau.com/*
// @run-at       document-idle
// @inject-into  content
// @grant        GM.getValue
// @grant        GM.setValue
// @updateURL    https://raw.githubusercontent.com/trithucnguyen97/duyet-bao-gia/main/safari/DuyetBaoGia.user.js
// @downloadURL  https://raw.githubusercontent.com/trithucnguyen97/duyet-bao-gia/main/safari/DuyetBaoGia.user.js
// ==/UserScript==

(async function () {
  'use strict';
  if (window.__ddbgSafariLoader) return;
  window.__ddbgSafariLoader = true;
  var BASE = "https://raw.githubusercontent.com/trithucnguyen97/duyet-bao-gia/main/";
  var PUBKEY = {"kty":"EC","crv":"P-256","x":"5UUgv-x1U2bmlV1nRdB1LgfAlK0-ioYqyxyvMRJTYTs","y":"qmL9rOBGKQUftnLRViKmeoHck5NG4iNFgb7OO2zuiwg"};

  // ---- lưu trữ: bộ nhớ riêng của Userscripts (trang web không đọc được); thiếu GM thì dùng localStorage
  var hasGM = typeof GM !== 'undefined' && GM && GM.getValue;
  var store = {
    get: async function (k) { if (hasGM) return await GM.getValue(k, null); try { return JSON.parse(localStorage.getItem('ddbg_us_' + k) || 'null'); } catch (e) { return null; } },
    set: async function (k, v) { if (hasGM) return GM.setValue(k, v); try { localStorage.setItem('ddbg_us_' + k, JSON.stringify(v)); } catch (e) {} }
  };

  function banner(html, reload) {
    var b = document.getElementById('ddbg-us-bar'); if (b) b.remove();
    b = document.createElement('div'); b.id = 'ddbg-us-bar';
    b.style.cssText = 'position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:2147483000;background:#1e3a8a;color:#fff;padding:10px 14px;border-radius:10px;font:13px/1.4 -apple-system,Segoe UI,Roboto,sans-serif;box-shadow:0 6px 24px rgba(0,0,0,.25);max-width:calc(100vw - 32px)';
    b.innerHTML = html;
    if (reload) { var r = document.createElement('button'); r.textContent = 'Tải lại trang'; r.style.cssText = 'margin-left:8px;background:#fff;color:#1e3a8a;border:0;border-radius:6px;padding:4px 10px;font-weight:600;cursor:pointer'; r.onclick = function () { location.reload(); }; b.appendChild(r); }
    var x = document.createElement('a'); x.textContent = 'Để sau'; x.href = '#'; x.style.cssText = 'color:#c7d2fe;margin-left:10px'; x.onclick = function (e) { e.preventDefault(); b.remove(); }; b.appendChild(x);
    (document.body || document.documentElement).appendChild(b);
  }
  function cmpVer(a, b) { a = String(a).split('.').map(Number); b = String(b).split('.').map(Number); for (var i = 0; i < 3; i++) { var d = (a[i] || 0) - (b[i] || 0); if (d) return d; } return 0; }
  function hex(buf) { return Array.prototype.map.call(new Uint8Array(buf), function (x) { return ('0' + x.toString(16)).slice(-2); }).join(''); }
  function b64(s) { var bin = atob(s), u = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u; }
  var keyP = null;
  function key() { return keyP || (keyP = crypto.subtle.importKey('jwk', Object.assign({ ext: true }, PUBKEY), { name: 'ECDSA', namedCurve: 'P-256' }, false, ['verify'])); }
  // Kiểm SHA-256 + chữ ký trên (version + "\n" + bundle) — giống bản Chrome
  async function verified(entry) {
    var bytes = new TextEncoder().encode(entry.code);
    if (hex(await crypto.subtle.digest('SHA-256', bytes)) !== entry.sha256) return false;
    var head = new TextEncoder().encode(entry.version + '\n');
    var data = new Uint8Array(head.length + bytes.length); data.set(head); data.set(bytes, head.length);
    return crypto.subtle.verify({ name: 'ECDSA', hash: 'SHA-256' }, await key(), b64(entry.sig), data);
  }

  // ---- cầu nối cho phần phân tích (chạy trong trang): lưu cài đặt; OCR không có trên Safari
  window.addEventListener('ddbg-us-req', async function (e) {
    var d; try { d = JSON.parse(e.detail); } catch (x) { return; }
    var msg = d.msg || {}, res = null;
    try {
      if (msg.type === 'ddbg:storageGet') res = Object.assign({}, msg.keys || {}, (await store.get('settings')) || {});
      else if (msg.type === 'ddbg:storageSet') { await store.set('settings', Object.assign((await store.get('settings')) || {}, msg.items || {})); res = { ok: true }; }
      else if (msg.type === 'ddbg:ocr') res = { ok: false, error: 'OCR ảnh chưa hỗ trợ trên Safari — dùng Chrome để so giá khách bằng ảnh, hoặc gõ giá khách vào ô "Giá khách".' };
      else res = { ok: false, error: 'Không hỗ trợ trên Safari' };
    } catch (err) { res = { ok: false, error: String(err && err.message || err) }; }
    window.dispatchEvent(new CustomEvent('ddbg-us-res', { detail: JSON.stringify({ id: d.id, res: res }) }));
  });
  var PAGE_HOST = '(' + function () {
    function send(msg) {
      return new Promise(function (resolve) {
        var id = Math.random().toString(36).slice(2);
        function on(e) { var d; try { d = JSON.parse(e.detail); } catch (x) { return; } if (d.id !== id) return; window.removeEventListener('ddbg-us-res', on); resolve(d.res); }
        window.addEventListener('ddbg-us-res', on);
        window.dispatchEvent(new CustomEvent('ddbg-us-req', { detail: JSON.stringify({ id: id, msg: msg }) }));
      });
    }
    return {
      send: send,
      storageGet: function (keys) { return send({ type: 'ddbg:storageGet', keys: keys }); },
      storageSet: function (items) { return send({ type: 'ddbg:storageSet', items: items }); },
      onHostEvent: function (fn) { document.addEventListener('ddbg-host', function (e) { try { fn(JSON.parse(e.detail)); } catch (x) {} }); }
    };
  }.toString() + ')()';
  function inject(code) {
    var s = document.createElement('script');
    s.textContent = code;
    (document.head || document.documentElement).appendChild(s);
    s.remove();
  }
  function run(entry) { inject('(function (__DDBG_HOST__) {\n' + entry.code + '\n})(' + PAGE_HOST + ');'); }

  // Cầu nối ghi giá deal vào bảng của trang (bridge.js của bản Chrome)
  inject("// Đại Dương - Duyệt Báo Giá: cầu nối chạy trong ngữ cảnh trang (world: MAIN)\n// Content script không thấy được dữ liệu React của trang, nên phần này nhận lệnh qua CustomEvent\n// và ghi dealValue / dealPercent thẳng vào bản ghi sản phẩm của bảng hàng hóa (giống \"Set deal cho BG\").\n(function () {\n  'use strict';\n  function findRows() {\n    var tables = document.querySelectorAll('table');\n    for (var i = 0; i < tables.length; i++) {\n      var table = tables[i];\n      if (table.closest('.ddbg-detail') || table.closest('.ddbg-rowdetail')) continue;\n      var ths = Array.prototype.filter.call(table.querySelectorAll('thead th'), function (th) { return !th.classList.contains('ant-table-cell-scrollbar'); });\n      var ok = false;\n      for (var j = 0; j < ths.length; j++) if (ths[j].textContent.trim() === 'Giá thực bán') { ok = true; break; }\n      if (!ok) continue;\n      var container = table.closest('.ant-table') || table.parentElement;\n      var rows = Array.prototype.slice.call(container.querySelectorAll('.ant-table-body tr.ant-table-row'));\n      if (!rows.length) rows = Array.prototype.slice.call(container.querySelectorAll('tbody tr.ant-table-row'));\n      if (rows.length) return rows;\n    }\n    return [];\n  }\n  function recordOf(tr) {\n    var key = Object.keys(tr).find(function (k) { return k.indexOf('__reactFiber$') === 0; });\n    var f = key ? tr[key] : null, hops = 0;\n    while (f && hops < 20) {\n      var p = f.memoizedProps;\n      if (p && p.record && typeof p.record === 'object' && ('dealValue' in p.record || 'price' in p.record)) return p.record;\n      f = f.return; hops++;\n    }\n    return null;\n  }\n  window.addEventListener('ddbg:setDeal', function (e) {\n    var out = { ok: false, done: [], failed: [] };\n    try {\n      var d = JSON.parse(e.detail || '{}');\n      var rows = findRows();\n      (d.items || []).forEach(function (it) {\n        var tr = rows.find(function (r) { var rec = recordOf(r); return rec && rec.id === it.productId; });\n        if (!tr) tr = rows[it.idx - 1];\n        var rec = tr ? recordOf(tr) : null;\n        if (!rec) { out.failed.push(it.idx); return; }\n        if (it.dealValue !== undefined && it.dealValue !== null) rec.dealValue = it.dealValue;\n        if (it.dealPercent !== undefined && it.dealPercent !== null) rec.dealPercent = it.dealPercent;\n        out.done.push(it.idx);\n      });\n      out.ok = true;\n    } catch (err) { out.error = String(err && err.message || err); }\n    window.dispatchEvent(new CustomEvent('ddbg:setDealDone', { detail: JSON.stringify(out) }));\n  });\n  window.__ddbgBridgeReady = true;\n  window.dispatchEvent(new CustomEvent('ddbg:bridgeReady'));\n})();\n");

  var cached = await store.get('payload');
  if (cached && !(await verified(cached).catch(function () { return false; }))) cached = null;
  if (cached) run(cached);

  try {
    var vr = await fetch(BASE + 'version.json?t=' + Date.now(), { cache: 'no-store' });
    if (!vr.ok) throw new Error('HTTP ' + vr.status);
    var v = await vr.json();
    if (!cached || cmpVer(v.version, cached.version) > 0) {
      var br = await fetch(BASE + v.file + '?v=' + encodeURIComponent(v.version), { cache: 'no-store' });
      if (!br.ok) throw new Error('HTTP ' + br.status + ' khi tải ' + v.file);
      var entry = { version: v.version, sha256: v.sha256, sig: v.sig, code: new TextDecoder().decode(await br.arrayBuffer()) };
      if (!(await verified(entry))) throw new Error('Sai chữ ký — bỏ qua bản tải về');
      await store.set('payload', entry);
      if (!cached) run(entry);
      else banner('🔄 Duyệt Báo Giá có bản mới <b>v' + v.version + '</b>. Tải lại trang để dùng' + (/\/update\//.test(location.pathname) ? ' (bấm "Cập nhật" lưu giá trước nếu đang sửa dở)' : '') + '.', true);
    }
  } catch (err) {
    if (!cached) banner('⚠ Duyệt Báo Giá chưa tải được phần phân tích: ' + String(err && err.message || err).replace(/</g, '&lt;'), true);
  }
})();

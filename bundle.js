/* Duyệt Báo Giá — phần ruột v2.0.2 (tải từ GitHub, đã ký; build 2026-10-29T03:08:04.983Z) */
(function () {
  'use strict';
  if (window.__ddbgPayload) return;
  window.__ddbgPayload = "2.0.2";
  var DDBG_VERSION = "2.0.2";
  try { document.documentElement.setAttribute('data-ddbg-payload', DDBG_VERSION); } catch (e) {}
  (function () {
    var css = "/* Đại Dương - Duyệt Báo Giá */\n:root {\n  --ddbg-blue: #2563eb;\n  --ddbg-red: #dc2626;\n  --ddbg-orange: #d97706;\n  --ddbg-green: #16a34a;\n  --ddbg-gray: #6b7280;\n  --ddbg-border: #e5e7eb;\n  --ddbg-bg: #ffffff;\n}\n\n/* Thanh phân tích chèn trên bảng danh sách */\n.ddbg-bar { border: 1px solid #bfdbfe; background: #f8fbff; border-radius: 10px; padding: 8px 12px; margin: 8px 0 10px; font-size: 13px; color: #111827; }\n.ddbg-bar-head { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; font-size: 14px; }\n.ddbg-bar-head label { display: flex; align-items: center; gap: 4px; font-size: 12px; }\n.ddbg-btn { border: 1px solid var(--ddbg-border); background: #fff; border-radius: 6px; padding: 4px 10px; cursor: pointer; font-size: 12px; }\n.ddbg-btn:hover { background: #eef2ff; }\n.ddbg-primary, button.ddbg-primary, .ddbg-pt button.ddbg-primary, .ddbg-bar button.ddbg-primary { background: var(--ddbg-blue) !important; color: #fff !important; border-color: var(--ddbg-blue) !important; }\n.ddbg-btn, button.ddbg-btn { color: #111827; line-height: 1.4; }\n.ddbg-grow { flex: 1; }\n.ddbg-settings { padding: 8px 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }\n.ddbg-settings label { display: flex; flex-direction: column; gap: 3px; font-size: 12px; color: var(--ddbg-gray); }\n.ddbg-settings input { border: 1px solid var(--ddbg-border); border-radius: 6px; padding: 4px 8px; }\n.ddbg-summary { padding: 4px 0; }\n.ddbg-pill { border-radius: 999px; padding: 3px 10px; background: #f3f4f6; font-size: 12px; }\n.ddbg-pill.ddbg-warn { background: #fef3c7; color: #92400e; }\n.ddbg-pill.ddbg-danger { background: #fee2e2; color: #991b1b; }\n.ddbg-pill.ddbg-info { background: #e0f2fe; color: #075985; }\n.ddbg-pill.ddbg-ok { background: #dcfce7; color: #166534; }\n.ddbg-pill.ddbg-cat { background: #ede9fe; color: #4c1d95; }\n.ddbg-pillrow { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; padding: 3px 0; }\n.ddbg-rowchip.ddbg-cat { background: #ede9fe; color: #4c1d95; }\n.ddbg-pill-btn { cursor: pointer; border: 1px solid transparent; user-select: none; }\n.ddbg-pill-btn:hover { filter: brightness(.95); }\n.ddbg-pill-active { border-color: var(--ddbg-blue); box-shadow: 0 0 0 2px rgba(37,99,235,.25); }\n.ddbg-progress { color: var(--ddbg-blue); font-size: 12px; }\n\n/* Dòng chi tiết chèn dưới dòng báo giá */\n.ddbg-rowdetail > td { background: #f8fbff !important; padding: 8px 12px !important; }\n.ddbg-inline { font-size: 13px; color: #111827; }\n.ddbg-inline .ddbg-stats { grid-template-columns: repeat(9, 1fr); }\n.ddbg-row-action > td:first-child { box-shadow: inset 3px 0 0 var(--ddbg-orange); }\n.ddbg-row-ready > td:first-child { box-shadow: inset 3px 0 0 var(--ddbg-green); }\n.ddbg-rowchip-more { background: #e0e7ff; color: #3730a3; cursor: pointer; }\n.ddbg-rowflags { cursor: pointer; }\n\n/* Card */\n.ddbg-card { border: 1px solid var(--ddbg-border); border-radius: 10px; padding: 10px 12px; margin-bottom: 8px; background: #fff; }\n.ddbg-card-action { border-left: 4px solid var(--ddbg-orange); }\n.ddbg-card-head { display: flex; align-items: center; gap: 8px; cursor: pointer; }\n.ddbg-code { font-weight: 700; color: var(--ddbg-blue); text-decoration: none; }\n.ddbg-code:hover { text-decoration: underline; }\n.ddbg-status { background: #eef2ff; color: #3730a3; border-radius: 4px; padding: 1px 6px; font-size: 11px; }\n.ddbg-status-change { background: #fee2e2; color: #991b1b; }\n.ddbg-amount { margin-left: auto; font-weight: 700; }\n.ddbg-toggle { color: var(--ddbg-gray); font-size: 11px; }\n.ddbg-card-name { font-weight: 600; margin-top: 4px; }\n.ddbg-card-meta { color: var(--ddbg-gray); font-size: 12px; margin-top: 2px; }\n.ddbg-card-flags { margin-top: 6px; display: flex; flex-wrap: wrap; gap: 4px; }\n.ddbg-card-body { margin-top: 8px; border-top: 1px dashed var(--ddbg-border); padding-top: 8px; }\n\n/* Chip */\n.ddbg-chip { border-radius: 4px; padding: 2px 7px; font-size: 11px; line-height: 16px; white-space: nowrap; }\n.ddbg-chip.ddbg-danger { background: #fee2e2; color: #991b1b; }\n.ddbg-chip.ddbg-warn { background: #fef3c7; color: #92400e; }\n.ddbg-chip.ddbg-info { background: #e0f2fe; color: #075985; }\n.ddbg-chip.ddbg-ok { background: #dcfce7; color: #166534; }\n\n/* Stats */\n.ddbg-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin: 6px 0 8px; }\n.ddbg-stat { background: #f9fafb; border-radius: 8px; padding: 6px 8px; }\n.ddbg-stat-label { color: var(--ddbg-gray); font-size: 11px; }\n.ddbg-stat-value { font-weight: 700; font-size: 13px; }\n.ddbg-stat-main { grid-column: span 2; background: #eff6ff; border: 1px solid #bfdbfe; }\n.ddbg-stat-big { font-size: 20px; }\n.ddbg-green { color: var(--ddbg-green) !important; }\n.ddbg-red { color: var(--ddbg-red) !important; }\n.ddbg-orange { color: var(--ddbg-orange) !important; }\n.ddbg-bold { font-weight: 700; }\n.ddbg-muted { color: var(--ddbg-gray); font-size: 11px; }\n\n/* Table */\n.ddbg-table { width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 8px; }\n.ddbg-table th, .ddbg-table td { border-bottom: 1px solid var(--ddbg-border); padding: 4px 6px; vertical-align: top; text-align: left; }\n.ddbg-table th { background: #f3f4f6; font-weight: 600; white-space: nowrap; }\n.ddbg-table .r { text-align: right; white-space: nowrap; }\n.ddbg-table tfoot td { font-weight: 600; background: #f9fafb; }\n.ddbg-table .ddbg-name { min-width: 180px; }\n.ddbg-row-danger td { background: #fff1f2; }\n.ddbg-row-warn td { background: #fffbeb; }\n\n/* Cột đôi */\n.ddbg-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }\n.ddbg-h { font-weight: 700; margin-bottom: 4px; }\n.ddbg-msg { background: #f9fafb; border-radius: 6px; padding: 5px 8px; margin-bottom: 4px; font-size: 12px; white-space: pre-wrap; }\n.ddbg-checklist { list-style: none; padding: 0; margin: 0 0 6px; }\n.ddbg-checklist li { padding: 2px 0; font-size: 12px; }\n.ddbg-ok-item { color: var(--ddbg-green); }\n.ddbg-bad-item { color: var(--ddbg-red); font-weight: 600; }\n.ddbg-ready { display: inline-block; border-radius: 6px; padding: 3px 10px; font-weight: 700; font-size: 12px; }\n.ddbg-ready-yes { background: #dcfce7; color: #166534; }\n.ddbg-ready-no { background: #fee2e2; color: #991b1b; }\n\n/* Nhãn trong dòng của bảng danh sách */\n.ddbg-rowflags { display: flex; flex-wrap: wrap; gap: 3px; margin-top: 3px; }\n.ddbg-rowchip { border-radius: 3px; padding: 0 5px; font-size: 10px; line-height: 15px; font-weight: 500; white-space: nowrap; }\n.ddbg-rowchip.ddbg-danger { background: #fee2e2; color: #991b1b; }\n.ddbg-rowchip.ddbg-warn { background: #fef3c7; color: #92400e; }\n.ddbg-rowchip.ddbg-ok { background: #dcfce7; color: #166534; }\n.ddbg-rowchip-ln { font-weight: 700; }\n\n/* Panel trang chi tiết */\n.ddbg-detail { border: 1px solid #bfdbfe; background: #f8fbff; border-radius: 10px; padding: 10px 14px; margin: 8px 0 14px; font-size: 13px; color: #111827; }\n.ddbg-detail-head { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 6px; font-size: 14px; }\n.ddbg-detail .ddbg-stats { grid-template-columns: repeat(9, 1fr); }\n@media (max-width: 1300px) { .ddbg-detail .ddbg-stats { grid-template-columns: repeat(5, 1fr); } }\n\n/* Chỉnh giá */\n.ddbg-pt { margin-top: 10px; border: 1px solid #fde68a; background: #fffbeb; border-radius: 8px; padding: 8px 10px; }\n.ddbg-pt-bar { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 6px; }\n.ddbg-pt-bar select, .ddbg-pt-bar input, .ddbg-pt input { border: 1px solid var(--ddbg-border); border-radius: 6px; padding: 4px 6px; font-size: 12px; background: #fff; }\n.ddbg-pt .ddbg-table { background: #fff; }\n.ddbg-msgline { color: var(--ddbg-green); font-weight: 600; min-height: 4px; }\n.ddbg-msgline:not(:empty) { padding: 4px 0; }\n\n/* Popup + toast */\n.ddbg-modal { position: fixed; inset: 0; background: rgba(17,24,39,.45); z-index: 100000; display: flex; align-items: center; justify-content: center; }\n.ddbg-modal-box { background: #fff; border-radius: 12px; width: 640px; max-width: 94vw; max-height: 85vh; overflow: auto; box-shadow: 0 20px 60px rgba(0,0,0,.3); padding: 16px 18px; font-size: 13px; color: #111827; }\n.ddbg-modal-title { font-size: 16px; font-weight: 700; margin-bottom: 10px; }\n.ddbg-modal-body { margin-bottom: 14px; }\n.ddbg-modal-actions { display: flex; justify-content: flex-end; gap: 8px; }\n.ddbg-toast { position: fixed; right: 20px; bottom: 20px; z-index: 100001; background: #166534; color: #fff; padding: 10px 14px; border-radius: 8px; font-size: 13px; box-shadow: 0 8px 24px rgba(0,0,0,.25); opacity: 0; transform: translateY(10px); transition: all .25s; max-width: 420px; }\n.ddbg-toast-warn { background: #92400e; }\n.ddbg-toast-danger { background: #991b1b; }\n.ddbg-toast-show { opacity: 1; transform: translateY(0); }\n\n/* Quét toàn bộ */\n.ddbg-scanopts { border-top: 1px dashed var(--ddbg-border); padding: 8px 0; }\n.ddbg-scan-row { display: flex; flex-wrap: wrap; gap: 8px 12px; align-items: center; padding: 4px 0; font-size: 12px; }\n.ddbg-scan-row label { display: flex; align-items: center; gap: 4px; }\n.ddbg-scan-row input[type=\"number\"] { border: 1px solid var(--ddbg-border); border-radius: 6px; padding: 3px 6px; }\n.ddbg-scan { margin-top: 6px; }\n.ddbg-scan-head { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; padding: 6px 0; }\n.ddbg-scan-head select { border: 1px solid var(--ddbg-border); border-radius: 6px; padding: 3px 6px; font-size: 12px; }\n.ddbg-scan .ddbg-table { background: #fff; }\n\n/* OCR ảnh khách + so sánh giá */\n.ddbg-ocr { margin-top: 10px; border: 1px solid #c7d2fe; background: #f5f7ff; border-radius: 8px; padding: 8px 10px; }\n.ddbg-ocr .ddbg-h { margin-top: 0; }\n.ddbg-ocr-bar { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 6px; }\n.ddbg-ocr-thumbs { display: flex; flex-wrap: wrap; gap: 10px; margin: 4px 0 8px; }\n.ddbg-ocr-thumb { display: flex; flex-direction: column; gap: 3px; font-size: 11px; max-width: 220px; cursor: pointer; }\n.ddbg-ocr-thumb img { max-width: 220px; max-height: 120px; border: 1px solid var(--ddbg-border); border-radius: 6px; background: #fff; object-fit: contain; }\n.ddbg-ocr-table { background: #fff; }\n.ddbg-ocr-table select { max-width: 260px; border: 1px solid var(--ddbg-border); border-radius: 6px; padding: 3px 4px; font-size: 12px; background: #fff; }\n.ddbg-ocr-table input[type=\"number\"] { border: 1px solid var(--ddbg-border); border-radius: 6px; padding: 3px 6px; font-size: 12px; text-align: right; }\n.ddbg-ocr-sum { margin-top: 6px; font-size: 12.5px; }\n.ddbg-ocr-raw { background: #fff; border: 1px dashed var(--ddbg-border); border-radius: 6px; padding: 6px 8px; font-size: 12px; max-height: 220px; overflow: auto; margin-top: 4px; }\n\n/* Xem trước theo công cụ chỉnh giá */\n.ddbg-preview { outline: 2px dashed #f59e0b; outline-offset: 4px; border-radius: 8px; }\n.ddbg-preview-bar { background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px; padding: 6px 10px; margin: 6px 0; font-size: 12.5px; }\n\n/* Đồng bộ giá carton */\n.ddbg-syncbar { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; background: #fff7ed; border: 1px solid #fdba74; border-radius: 8px; padding: 6px 10px; margin: 6px 0; font-size: 12.5px; }\n.ddbg-syncbar span { flex: 1; min-width: 240px; }\n\n.ddbg-hiddenrow > td { background: #fff8e6 !important; padding: 6px 12px !important; font-size: 12px; }\n.ddbg-hiddenrow .ddbg-btn { margin-left: 6px; }\n/* Thu gọn thanh phân tích trang danh sách */\n.ddbg-mini { display: none; font-size: 12px; margin-top: 4px; cursor: pointer; color: #374151; }\n.ddbg-bar-collapsed .ddbg-mini { display: block; }\n.ddbg-bar-collapsed #ddbg-summary, .ddbg-bar-collapsed #ddbg-scan, .ddbg-bar-collapsed #ddbg-settings,\n.ddbg-bar-collapsed #ddbg-scanopts, .ddbg-bar-collapsed .ddbg-bar-help { display: none !important; }\n.ddbg-bar-collapsed { padding-top: 6px; padding-bottom: 6px; }\n/* Dòng nhắc tải lại trang sau khi extension tự reload */\n.ddbg-devreload { position: fixed; left: 50%; bottom: 16px; transform: translateX(-50%); z-index: 2147483000; background: #1e3a8a; color: #fff; padding: 10px 14px; border-radius: 10px; font-size: 13px; box-shadow: 0 6px 24px rgba(0,0,0,.25); max-width: calc(100vw - 32px); }\n.ddbg-devreload button { margin-left: 8px; background: #fff; color: #1e3a8a; border: 0; border-radius: 6px; padding: 4px 10px; font-weight: 600; cursor: pointer; }\n.ddbg-devreload a { color: #c7d2fe; margin-left: 8px; }\n.ddbg-settings label.ddbg-chk { flex-direction: row; align-items: center; gap: 6px; grid-column: 1 / -1; }\n.ddbg-nocost { flex-basis: 100%; color: #b45309 !important; font-weight: 600; }\n";
    var s = document.getElementById('ddbg-style');
    if (!s) { s = document.createElement('style'); s.id = 'ddbg-style'; (document.head || document.documentElement).appendChild(s); }
    s.textContent = css;
  })();

  // Cầu nối tới phần vỏ (background) — phần ruột chạy trong USER_SCRIPT world, không gọi trực tiếp chrome.storage
  var HOST = {
    send: function (msg) {
      return new Promise(function (resolve, reject) {
        try {
          chrome.runtime.sendMessage(msg, function (res) {
            var le = chrome.runtime && chrome.runtime.lastError;
            if (le) reject(new Error(le.message)); else resolve(res);
          });
        } catch (e) { reject(e); }
      });
    },
    storageGet: function (defaults) { return HOST.send({ type: 'ddbg:storageGet', area: 'sync', keys: defaults }); },
    storageSet: function (items) { return HOST.send({ type: 'ddbg:storageSet', area: 'sync', items: items }); },
    onHostEvent: function (fn) {
      document.addEventListener('ddbg-host', function (e) { try { fn(JSON.parse(e.detail)); } catch (x) {} });
    }
  };

// ===== po.js =====

var DDBG_PO = (function () {
  'use strict';

  var WATERPROOF_FACE = { 0: 0, 1: 1, 2: 2, 3: 1, 4: 1 };

  function evalArith(expr) {
    var s = String(expr).replace(/\s+/g, '');
    if (!/^[\d.+\-*/()]+$/.test(s)) throw new Error('Công thức không hợp lệ: ' + expr);
    var pos = 0;
    function peek() { return s[pos]; }
    function num() {
      var m = /^\d+(\.\d+)?/.exec(s.slice(pos));
      if (!m) throw new Error('Công thức lỗi: ' + expr);
      pos += m[0].length; return parseFloat(m[0]);
    }
    function factor() {
      if (peek() === '(') { pos++; var v = exprP(); if (peek() !== ')') throw new Error('Thiếu ngoặc'); pos++; return v; }
      if (peek() === '-') { pos++; return -factor(); }
      if (peek() === '+') { pos++; return factor(); }
      return num();
    }
    function term() {
      var v = factor();
      while (peek() === '*' || peek() === '/') { var op = s[pos++]; var r = factor(); v = op === '*' ? v * r : v / r; }
      return v;
    }
    function exprP() {
      var v = term();
      while (peek() === '+' || peek() === '-') { var op = s[pos++]; var r = term(); v = op === '+' ? v + r : v - r; }
      return v;
    }
    var out = exprP();
    if (pos !== s.length) throw new Error('Công thức lỗi: ' + expr);
    return out;
  }

  function substitute(formula, vars) {
    return String(formula)
      .replace(/khoTam/g, vars.khoTam).replace(/daiTam/g, vars.daiTam)
      .replace(/D/g, vars.D).replace(/R/g, vars.R).replace(/C/g, vars.C);
  }

  function calcKhoTamDaiTamPO(p) {
    var ct = p.cartonType || {};
    if (!ct.poDaiTamFormula || !ct.poKhoTamFormula) throw new Error('Loại thùng chưa cấu hình công thức PO');
    var vars = { D: +p.length || 0, R: +p.width || 0, C: +p.height || 0, khoTam: +p.khoTam || 0, daiTam: +p.daiTam || 0 };
    var daiTam = evalArith(substitute(ct.poDaiTamFormula, vars));
    var khoTam = evalArith(substitute(ct.poKhoTamFormula, vars));
    var code = ct.code || '';
    if (code.indexOf('A1') >= 0 || code === 'A1-NAPCHOM') {
      if (+p.layer === 3) khoTam += 2; else if (+p.layer === 5) khoTam += 4; else if (+p.layer === 7) khoTam += 10;
    }
    return { daiTam: daiTam, khoTam: khoTam };
  }

  function timDaoChatVaKhoMay(provider, khoTam) {
    var widths = String(provider.kho || '').split(',').map(function (x) { return +String(x).trim(); }).filter(function (x) { return x > 0; });
    var best = 0, out = 0, kho = 0, maxOut = provider.code === 'CL' ? 6 : 5;
    widths.forEach(function (u) {
      for (var d = 1; d <= maxOut; d++) {
        var h = (khoTam * d + 20) / u;
        if (h > best && h <= 1) { best = h; out = d; kho = u; }
      }
    });
    return { out: out, kho: kho, usage: best };
  }


  function toInt(x) { return parseInt(String(x), 10); }
  function getNumberRoll(t, jumboName) {
    var n = jumboName || '';
    if (t > 300 || n.indexOf('dột') >= 0) return 1;
    if (n.indexOf('điện') >= 0) return 10;
    if (n.indexOf('xốp') >= 0) return toInt(240 / t);
    if (t === 23) return 12;
    if (t === 12) return 24;
    return toInt(300 / t);
  }
  function calcTapeCost(opts) {
    var t = +opts.tapeHeight, n = +opts.tapeWeight || 0, a = +opts.tapeLength || 0, i = +opts.quantity || 0;
    var s = Object.assign({}, opts.jumbo), l = Object.assign({}, opts.bangKeoCore), c = opts.calcBy;
    if (!(t > 0) || !s.name || !(s.length > 0) || !(l.length > 0)) throw new Error('Thiếu bản rộng / jumbo / lõi');
    s.length -= (+s.delta || 0);
    s.weight = toInt((s.length - (+s.delta || 0)) / s.length * s.weight);
    var f = s;
    var isMic = s.name.indexOf('Mic') >= 0;
    if (isMic && t === 48) { t = 47; if (n >= 1.4) f.cost -= 5e4; if (n >= 5) f.cost = 2e5; }
    var d = f.length * f.height / f.weight;                  // m2 / kg
    if (isMic) f.height -= 20;
    var h = l;
    var pRolls = toInt(f.height / t);                         // số cuộn 1 tay (cắt theo bản rộng)
    if (isMic && t === 47) pRolls = 27;
    var m = getNumberRoll(t, s.name);                         // số cuộn / cây
    var g = (l.weight / l.length) * t / 1e3;                  // khối lượng lõi 1 cuộn
    var A;
    if (c === 'WEIGHT') { A = n / m; var y = A - g; a = y * d / t; }
    else { n = t * a / d; A = n + g; }
    if (!(a > 0)) throw new Error('Không tính được số mét 1 cuộn');
    var w = f.length / a * pRolls;                            // số cuộn thành phẩm từ 1 jumbo
    var x = f.price / w;                                      // giá keo 1 cuộn
    var core1 = h.price / toInt(h.length / t);                // giá lõi 1 cuộn
    var E = (+f.cost || 0) / w;                               // gia công 1 cuộn
    var C = x + E + core1;                                    // giá thành phẩm 1 cuộn
    var S = toInt(m * C);                                     // giá vốn 1 cây (T)
    return { ok: true, costPrice: S, numberCase: m, soCuon1Tay: pRolls, costPerRoll: toInt(S / m), giaKeo: x, giaLoi: core1, giaGiaCong: E,
      somet1cuon: a, tongcannang: toInt(i * A), tongsocay: i / m, giaCongNo: Math.max(S, S / 0.88), code: 'IDBAOGIA_T' + S + '_R' + toInt(S / m) };
  }
  function tapeCost(p) {
    try {
      if (!p.jumbo || !p.bangKeoCore) return { ok: false, reason: !p.jumbo ? 'chưa chọn chất liệu (jumbo)' : 'chưa chọn lõi' };
      var height = +p.height || 0;
      if (!height) {
        var mm = String(p.name || '').match(/(\d+(?:\.\d+)?)\s*mm/i);
        if (mm) height = +mm[1];
      }
      var weight = +p.weight || 0, meter = +p.meter || 0;
      if (!weight && !meter) {
        var kg = String(p.name || '').match(/(\d+(?:\.\d+)?)\s*kg/i); if (kg) weight = +kg[1];
        var mt = String(p.name || '').match(/(\d+(?:\.\d+)?)\s*m(\s|$|-)/i); if (!weight && mt) meter = +mt[1];
      }
      if (!height) return { ok: false, reason: 'chưa có bản rộng (mm)' };
      if (!weight && !meter) return { ok: false, reason: 'chưa có khối lượng (kg) hoặc số mét' };
      var calcBy = p.calcBy || (weight ? 'WEIGHT' : 'METER');
      var jumbo = p.jumbo, jp = +p.jumboPrice || 0, jNow = +(p.jumbo && p.jumbo.price) || 0;
      if (jp > 0 && (!jNow || (jp > jNow * 0.5 && jp < jNow * 1.5))) jumbo = Object.assign({}, p.jumbo, { price: jp });
      var r = calcTapeCost({ tapeHeight: height, tapeWeight: weight, tapeLength: meter, quantity: +p.quantity || 0, jumbo: jumbo, bangKeoCore: p.bangKeoCore, calcBy: calcBy });
      r.jumboPriceUsed = jumbo.price;
      r.height = height; r.weight = weight; r.meter = meter; r.calcBy = calcBy;
      return r;
    } catch (e) { return { ok: false, reason: e.message }; }
  }

  function round(n) { return Math.round(n); }

  /**
   * Tính PO giấy tấm cho một báo giá.
   * @param o báo giá (có opportunityProducts với cartonStruct.provider, cartonType)
   * @param opts { taxPercent, dealPercent, bidLookup(providerId, structId) -> bid|null }
   * @returns { providers: [...], carton: {subTotal, vat, total}, other: {cost}, byProduct: {productId: {...}}, errors: [] }
   */
  function isStockItem(p) { return !p.productType || p.productType === 'OTHER'; }
  function importCost(p, opts) {
    if (isStockItem(p) && !(opts && opts.useStockImportPrice)) return 0;
    return +p.importPrice || 0;
  }

  function compute(o, opts) {
    opts = opts || {};
    var taxPercent = opts.taxPercent === undefined ? 8 : +opts.taxPercent;
    var products = (o.opportunityProducts || []).filter(function (p) { return !p.isDeleted; });
    var groups = {}, errors = [], byProduct = {}, otherCost = 0, otherRows = [];

    products.forEach(function (p) {
      var qty = +p.quantity || 0;
      var isCarton = p.productType === 'CARTON' && p.cartonStruct && p.cartonType;
      var provider = isCarton && p.cartonStruct.provider;
      if (!isCarton || !provider || !provider.kho) {
        if (p.productType === 'BANG_KEO' && opts.tapeRecalc !== false) {   // Hải Âu: dùng giá vốn CRM đã tính (tapeRecalc = false)
          var tc = tapeCost(p);
          if (tc.ok) {
            var ct = tc.costPerRoll * qty;
            otherCost += ct;
            otherRows.push({ product: p, cost: ct, reason: 'Băng keo: ' + tc.code });
            byProduct[p.id] = { source: 'tape', unitCost: tc.costPerRoll, cost: ct, tape: tc };
            return;
          }
          byProduct[p.id] = { source: 'importPrice', unitCost: +p.importPrice || 0, cost: (+p.importPrice || 0) * qty, tapeError: tc.reason };
          otherCost += (+p.importPrice || 0) * qty;
          otherRows.push({ product: p, cost: (+p.importPrice || 0) * qty, reason: 'Băng keo: ' + tc.reason });
          return;
        }
        var uc = importCost(p, opts), c = uc * qty;
        otherCost += c;
        otherRows.push({ product: p, cost: c, reason: !isCarton ? 'Không phải thùng carton' : 'NCC chưa có khổ xả' });
        byProduct[p.id] = { source: 'importPrice', unitCost: uc, cost: c };
        return;
      }
      var g = groups[provider.id];
      if (!g) g = groups[provider.id] = { provider: provider, rows: [], subTotal: 0, meter: 0, tamLon: 0 };
      try {
        var sz = calcKhoTamDaiTamPO(p);
        var face = WATERPROOF_FACE[+p.waterProofFace] || 0;
        var chongTham = face * (+provider.chongThamPrice || 0);
        var priceSource = 'BG';
        var cartonPrice = +p.cartonPrice > 0 ? +p.cartonPrice : 0;
        if (!cartonPrice) { cartonPrice = (+p.cartonStruct.price || 0) + chongTham; priceSource = 'NCC'; }
        var bid = opts.bidLookup ? opts.bidLookup(provider.id, p.cartonStruct.id) : null;
        var bidApplied = false;
        if (bid && bid.status === 'CONFIRM' && +bid.confirmPrice > 0 && +bid.confirmPrice + chongTham < cartonPrice) { cartonPrice = +bid.confirmPrice + chongTham; bidApplied = true; priceSource = 'bid'; }
        var origin = cartonPrice - chongTham;
        var code = (p.cartonType && p.cartonType.code) || '';
        var N = qty;
        if (code === 'A1-2M') N *= 2;
        var lines = [{ length: sz.daiTam, width: sz.khoTam, N: N }];
        if (code === 'A1-4M') {
          N *= 2;
          lines = [{ length: (+p.width || 0) + 40, width: sz.khoTam, N: N }, { length: (+p.length || 0) + 40, width: sz.khoTam, N: N }];
        }
        var prodCost = 0, prodRows = [];
        lines.forEach(function (ln) {
          var dk = timDaoChatVaKhoMay(provider, ln.width);
          if (!dk.out) throw new Error('Không tìm được khổ máy cho khổ tấm ' + ln.width);
          var tamLon = Math.ceil(ln.N / dk.out);
          var sheetPrice = round(ln.length * dk.kho * cartonPrice / 1e6);
          var total = sheetPrice * tamLon;
          var row = {
            product: p, name: 'Tấm carton K' + dk.kho + '*' + ln.length, struct: p.cartonStruct.name || p.cartonStruct.code,
            length: ln.length, width: ln.width, kho: dk.kho, out: dk.out, usage: dk.usage,
            tamNho: ln.N, tamLon: tamLon, meter: ln.length * tamLon / 1000,
            originPrice: origin, chongTham: chongTham, cartonPrice: cartonPrice, bidApplied: bidApplied, priceSource: priceSource,
            sheetPrice: sheetPrice, smallSheetPrice: sheetPrice / dk.out, total: total
          };
          prodRows.push(row); g.rows.push(row);
          g.subTotal += total; g.meter += row.meter; g.tamLon += tamLon;
          prodCost += total;
        });
        var small = prodRows[0].smallSheetPrice * (code === 'A1-2M' ? 2 : 1) * (code === 'A1-4M' ? 2 : 1);
        byProduct[p.id] = {
          source: 'po', provider: provider, cost: prodCost, unitCost: qty ? prodCost / qty : 0,
          smallSheetPrice: small, rows: prodRows,
          dealPrice: function (pct) { return pct >= 100 ? 0 : Math.ceil(small / (1 - pct / 100)); }
        };
      } catch (e) {
        errors.push((p.name || 'SP') + ': ' + e.message);
        var c2 = (+p.importPrice || 0) * qty;
        otherCost += c2;
        otherRows.push({ product: p, cost: c2, reason: e.message });
        byProduct[p.id] = { source: 'importPrice', unitCost: +p.importPrice || 0, cost: c2, error: e.message };
      }
    });

    var providers = Object.keys(groups).map(function (k) {
      var g = groups[k];
      g.vat = round(g.subTotal * taxPercent / 100);
      g.total = g.subTotal + g.vat;
      return g;
    });
    var subTotal = providers.reduce(function (s, g) { return s + g.subTotal; }, 0);
    var vat = providers.reduce(function (s, g) { return s + g.vat; }, 0);
    return {
      providers: providers, taxPercent: taxPercent,
      carton: { subTotal: subTotal, vat: vat, total: subTotal + vat },
      other: { cost: otherCost, rows: otherRows },
      materialCost: subTotal + otherCost,          // giá vốn NVL trước VAT
      materialTotal: subTotal + vat + otherCost,   // tổng thanh toán NVL (sau VAT giấy tấm)
      byProduct: byProduct, errors: errors
    };
  }

  return { compute: compute, importCost: importCost, isStockItem: isStockItem, calcKhoTamDaiTamPO: calcKhoTamDaiTamPO, timDaoChatVaKhoMay: timDaoChatVaKhoMay, evalArith: evalArith, calcTapeCost: calcTapeCost, tapeCost: tapeCost };
})();


// ===== content.js =====

(function () {
  'use strict';

  var PAYLOAD_VER = typeof DDBG_VERSION !== 'undefined' ? DDBG_VERSION : 'dev';
  var API_BASE = location.protocol + '//' + location.hostname + ':8080/v1/admin';
  var IS_HAIAU = /bangkeohaiau\.com$/i.test(location.hostname);
  var TAPE_RECALC = true;
  var FALLBACK_VERSION = '1.3.8';
  var PREFIX = 'ddbg';

  var DEFAULT_SETTINGS = {
    lowMarkup: 10,            // % lãi trên giá vốn thấp hơn mức này -> "Biên thấp"
    roundStep: 1,             // làm tròn giá mới khi chỉnh giá (1 = đồng, 10, 100...)
    commissionMinAmount: 20000000, // deal công ty >= số tiền này mà chưa có HH thu mua -> cảnh báo
    staleDays: 7,             // deal treo quá số ngày này -> "Treo lâu"
    commentLimit: 30,         // số bình luận tải mỗi khách
    defaultDealPercent: 25,   // % deal mặc định khi khách/sản phẩm chưa có % deal
    floorDealPercent: 15,     // mốc % deal sàn: giá mốc = NVL ÷ (1 − mốc); lợi nhuận = giá bán − giá mốc
    scanStep: 100,            // mỗi lần bấm "+100" quét thêm bao nhiêu báo giá
    onlyActionable: false,    // "Chỉ deal cần xử lý" (giá trị chung cho các tab chưa đặt riêng)
    onlyByTab: {},            // nhớ riêng theo tab danh sách; tab "Duyệt lên đơn" mặc định KHÔNG tick
    listBarCollapsed: false,  // thanh "Phân tích báo giá" ở trang danh sách đang thu gọn
    useStockImportPrice: false // SP tồn kho (loại "Khác"): KHÔNG dùng giá nhập đồng bộ từ PM bán hàng Nhanh.vn (không chính xác)
  };
  var settings = Object.assign({}, DEFAULT_SETTINGS);

  function loadSettings() {
    return new Promise(function (resolve) {
      try {
        HOST.storageGet(DEFAULT_SETTINGS).then(function (v) {
          settings = Object.assign({}, DEFAULT_SETTINGS, v || {});
          resolve(settings);
        }, function () { resolve(settings); });
      } catch (e) { resolve(settings); }
    });
  }
  function saveSettings() {
    try { HOST.storageSet(settings).catch(function () {}); } catch (e) {}
  }

  var QUOTE_STATUS = {
    DRAFF: 'Bản thảo', PENDING_PRICE: 'Chờ xin giá', CONFIRMED: 'Đã xác nhận',
    SEND_2_CUSOMTER: 'Đã gửi', NEGOTIATE: 'Thương lượng', APPROVE: 'Duyệt lên đơn',
    SUCCESS: 'Thành công', REJECT: 'Thất bại'
  };
  var OPP_STATUS = {
    CONTACT: 'Liên hệ khách hàng', QUOTE: 'Báo giá', NEGOTIATE: 'Thương lượng',
    SEND_SAMPLE: 'Gửi mẫu', SUCCESS: 'Thành công', FAIL: 'Thất bại'
  };
  var CHANGE_STATUS = { PENDING: 'Chờ duyệt thay đổi', REJECT: 'Thay đổi bị từ chối', APPROVE: 'Thay đổi đã duyệt' };
  var TAB_TO_STATUSES = {
    'Tất cả': ['APPROVE', 'CONFIRMED', 'DRAFF', 'NEGOTIATE', 'PENDING_PRICE'],
    'Bản thảo': ['DRAFF'], 'Chờ xin giá': ['PENDING_PRICE'], 'Đã xác nhận': ['CONFIRMED'],
    'Đã gửi': ['SEND_2_CUSOMTER'], 'Thương lượng': ['NEGOTIATE'], 'Duyệt lên đơn': ['APPROVE'],
    'Thành công': ['SUCCESS'], 'Thất bại': ['REJECT']
  };
  var CLOSED = { SUCCESS: 1, REJECT: 1 };

  var KW_CUSTOMER_PRICE_HIGH = [
    'giá cao', 'cao quá', 'cao hơn', 'chê giá', 'đối thủ', 'bên khác', 'rẻ hơn', 'giảm giá', 'xin giảm',
    'mất khách', 'thương lượng', 'deal lại', 'không chốt', 'ko chốt', 'hủy', 'huỷ', 'so sánh', 'cạnh tranh',
    'giá tốt hơn', 'cân đối giá', 'hỗ trợ giá', 'giá chưa deal', 'bớt'
  ];
  var KW_SALES_ASK = [
    'xin giá', 'xin lại giá', 'chào lại', 'cho em giá', 'báo giá', 'cân đối', 'xin báo giá', 'duyệt', 'sếp'
  ];
  var KW_REVIEW_PRICE = [/\d{3,}/, /\/m2/i, /c:\d+/i, /giá/i, /bán/i, /deal/i, /đã thêm/i, /free/i, /miễn/i];
  var COMPETITOR_RE = /đối thủ|doi thu|giá khách|gia khach|bảng giá khách|khách đang lấy|khach dang lay|giá bên kia|ncc cũ|nhà cung cấp cũ|giá cũ của khách/i;
  var CUT_PCT_RE = /(?:giảm|giam|thấp hơn|thap hon|dưới|duoi|rẻ hơn|re hon|bớt|bot|trừ|tru)\s*(?:đi\s*|xuống\s*)?(?:đối thủ\s*|giá khách\s*)?(\d+(?:[.,]\d+)?)\s*%/i;
  var EQUAL_COMP_RE = /(?:bằng|theo|như|ngang)\s*(?:với\s*)?(?:giá\s*)?(?:đối thủ|giá khách|khách đang lấy)/i;
  function parseCompetitorCut(text) {
    text = String(text || '');
    if (!COMPETITOR_RE.test(text)) return null;
    var m = CUT_PCT_RE.exec(text);
    if (m) return +m[1].replace(',', '.');
    if (EQUAL_COMP_RE.test(text)) return 0;
    return null;
  }
  var KW_REQUOTE_ASK = [/chào lại/i, /báo lại/i, /gửi lại/i, /chào khách/i, /báo khách/i, /báo cho khách/i, /trả lời khách/i, /hỏi lại khách/i, /hỏi khách/i, /cân đối lại/i, /chào giá/i];

  var CATEGORIES = [
    { key: 'CARTON', label: 'Thùng carton' }, { key: 'OFFSET', label: 'Thùng offset (tuantu)' }, { key: 'BANG_KEO', label: 'Băng keo' }, { key: 'XOP_HOI', label: 'Xốp hơi' },
    { key: 'MANG_PE', label: 'Màng PE' }, { key: 'BANG_KEO_IN', label: 'Băng keo in' }, { key: 'OTHER', label: 'Khác' }
  ];
  function productCategory(p) {
    var t = p.productType || '', n = lower(p.name);
    if (t === 'CARTON_OFFSET') return 'OFFSET';
    if (t === 'CARTON') return 'CARTON';
    if (t === 'PE') return 'MANG_PE';   // Hải Âu: màng PE tính giá qua máy tính PE
    if (t === 'BANG_KEO_IN' || /băng keo in|bang keo in/.test(n)) return 'BANG_KEO_IN';
    if (/xốp hơi|xop hoi|xốp khí|bubble/.test(n)) return 'XOP_HOI';
    if (/màng pe|mang pe|màng co|cuộn pe|\bpe\b/.test(n)) return 'MANG_PE';
    if (t === 'BANG_KEO' || /băng keo|bang keo|băng dính/.test(n)) return 'BANG_KEO';
    if (/thùng|carton|hộp/.test(n)) return 'CARTON';
    return 'OTHER';
  }
  var TUANTU_RE = /https?:\/\/(?:sale\.)?tuantu\.com\.vn\/[^\s"'<>)]*/gi;
  function findTuantuLinks(texts) {
    var links = {};
    texts.forEach(function (t) { var m = String(t || '').match(TUANTU_RE); if (m) m.forEach(function (l) { links[l] = 1; }); });
    return Object.keys(links);
  }
  function categoryLabel(key) { var c = CATEGORIES.find(function (x) { return x.key === key; }); return c ? c.label : key; }

  function fmt(n) {
    if (n === null || n === undefined || isNaN(n)) return '-';
    return Math.round(n).toLocaleString('vi-VN');
  }
  function pct(n, d) {
    if (n === null || n === undefined || isNaN(n)) return '-';
    return n.toFixed(d === undefined ? 1 : d) + '%';
  }
  function esc(s) {
    return String(s === null || s === undefined ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function stripHtml(s) { return String(s || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(); }
  function lower(s) { return String(s || '').toLowerCase(); }
  function containsAny(text, kws) {
    var t = lower(text);
    for (var i = 0; i < kws.length; i++) {
      var k = kws[i];
      if (k instanceof RegExp) { if (k.test(t)) return k.source; }
      else if (t.indexOf(k) >= 0) return k;
    }
    return null;
  }
  function daysAgo(ts) {
    if (!ts) return null;
    var ms = ts > 1e12 ? ts : ts * 1000;
    return Math.floor((Date.now() - ms) / 86400000);
  }
  function dateStr(ts) {
    if (!ts) return '';
    var d = new Date(ts > 1e12 ? ts : ts * 1000);
    return ('0' + d.getDate()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' + d.getFullYear();
  }
  function isCompany(name) {
    var n = lower(name);
    return /^(công ty|cong ty|cty|c\.ty|hộ kinh doanh|hkd|doanh nghiệp|dntn|tập đoàn)/.test(n) || /\b(tnhh|cổ phần|co\.,? ?ltd|jsc|corp)\b/.test(n);
  }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function debounce(fn, ms) {
    var t; return function () { clearTimeout(t); var a = arguments, s = this; t = setTimeout(function () { fn.apply(s, a); }, ms); };
  }

  function getToken() {
    try { return (JSON.parse(localStorage.getItem('UserStore') || '{}').token) || ''; } catch (e) { return ''; }
  }
  function getCurrentUser() {
    try { return JSON.parse(localStorage.getItem('UserStore') || '{}').info || {}; } catch (e) { return {}; }
  }
  function getVersion() {
    var header = document.querySelector('.app-header');
    var m = header && header.textContent.match(/v(\d+\.\d+\.\d+)/);
    return m ? m[1] : FALLBACK_VERSION;
  }
  function api(path, params) {
    var url = API_BASE + path;
    if (params) {
      var q = [];
      Object.keys(params).forEach(function (k) {
        var v = params[k];
        if (v === undefined || v === null || v === '') return;
        if (Array.isArray(v)) v.forEach(function (x) { q.push(encodeURIComponent(k + '[]') + '=' + encodeURIComponent(x)); });
        else q.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
      });
      if (q.length) url += (url.indexOf('?') >= 0 ? '&' : '?') + q.join('&');
    }
    return fetch(url, { headers: { token: getToken(), version: getVersion() } })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (!j || j.status === false) throw new Error((j && j.message) || 'API lỗi');
        return j.data;
      });
  }
  var TYPE_MAP = { PRODUCT: 'OTHER' };
  function normalizeOpp(o) {
    ((o && o.opportunityProducts) || []).forEach(function (p) {
      if (!p.productType && p.type) p.productType = TYPE_MAP[p.type] || p.type;
    });
    return o;
  }
  function fetchOpportunities(statuses, page, limit) {
    return api('/opportunity', { page: page || 1, limit: limit || 100, search: '', type: 2, quoteStatuses: statuses })
      .then(function (d) { ((d && d.opportunities) || []).forEach(normalizeOpp); return d; });
  }
  function fetchOpportunity(id) { return api('/opportunity/' + id).then(normalizeOpp); }
  function fetchPrintCount(id) { return api('/opportunity/' + id + '/print/count').then(function (d) { return d.count || 0; }).catch(function () { return null; }); }
  var commentCache = {};
  function fetchComments(customerId) {
    if (!customerId) return Promise.resolve([]);
    if (commentCache[customerId]) return commentCache[customerId];
    commentCache[customerId] = api('/fileAttach', { page: 1, limit: settings.commentLimit, customerId: customerId })
      .then(function (d) { return (d && d.fileAttaches) || []; })
      .catch(function () { return []; });
    return commentCache[customerId];
  }
  var taxPercentCache = null;
  function fetchTaxPercent() {
    if (taxPercentCache !== null) return Promise.resolve(taxPercentCache);
    return api('/configuration').then(function (d) {
      var c = ((d && d.configurations) || []).find(function (x) { return x.param === 'TAX_PERCENT'; });
      taxPercentCache = c ? +c.value : 8;
      return taxPercentCache;
    }).catch(function () { return 8; });
  }
  var bidCache = {};
  function fetchBidsFor(o) {
    var products = (o.opportunityProducts || []).filter(function (p) { return p.productType === 'CARTON' && p.cartonStruct && p.cartonStruct.provider; });
    var pairs = {}, custPairs = {};
    products.forEach(function (p) {
      var pid = p.cartonStruct.provider.id, sid = p.cartonStruct.id;
      pairs[pid + ':' + sid] = { pid: pid, sid: sid };
      if (o.customer && o.customer.id) custPairs[o.customer.id + ':' + pid] = { cid: o.customer.id, pid: pid };
    });
    var jobs = [];
    Object.keys(custPairs).forEach(function (k) {
      if (bidCache[k] !== undefined) return;
      var v = custPairs[k];
      jobs.push(api('/bid/last', { customerId: v.cid, providerId: v.pid }).then(function (d) { bidCache[k] = Array.isArray(d) ? d : []; }).catch(function () { bidCache[k] = []; }));
    });
    Object.keys(pairs).forEach(function (k) {
      if (bidCache[k] !== undefined) return;
      var v = pairs[k];
      jobs.push(api('/bid/last', { providerId: v.pid, cartonStructIds: [v.sid] }).then(function (d) { bidCache[k] = Array.isArray(d) ? d : []; }).catch(function () { bidCache[k] = []; }));
    });
    return Promise.all(jobs).then(function () {
      return function bidLookup(providerId, structId) {
        var cid = o.customer && o.customer.id;
        var list = (cid && bidCache[cid + ':' + providerId]) || [];
        var b = list.find(function (x) { return x.cartonStruct && x.cartonStruct.id === structId; });
        if (!b) { var l2 = bidCache[providerId + ':' + structId] || []; b = l2[0] || null; }
        return b || null;
      };
    });
  }
  function enrich(o) {
    return Promise.all([fetchComments(o.customer && o.customer.id), fetchPrintCount(o.id), fetchTaxPercent(), fetchBidsFor(o)])
      .then(function (r) {
        var po = null;
        try { po = DDBG_PO.compute(o, { taxPercent: r[2], bidLookup: r[3], useStockImportPrice: settings.useStockImportPrice, tapeRecalc: TAPE_RECALC }); } catch (e) { po = null; }
        return analyze(o, r[0], r[1], po);
      });
  }
  function mapLimit(items, limit, fn) {
    var i = 0, results = new Array(items.length);
    function next() {
      if (i >= items.length) return Promise.resolve();
      var idx = i++;
      return Promise.resolve(fn(items[idx], idx)).then(function (r) { results[idx] = r; return next(); });
    }
    var workers = [];
    for (var w = 0; w < Math.min(limit, items.length); w++) workers.push(next());
    return Promise.all(workers).then(function () { return results; });
  }

  function dialog(opts) {
    return new Promise(function (resolve) {
      var old = document.getElementById(PREFIX + '-modal'); if (old) old.remove();
      var wrap = el('div', PREFIX + '-modal'); wrap.id = PREFIX + '-modal';
      wrap.innerHTML = '<div class="' + PREFIX + '-modal-box">' +
        '<div class="' + PREFIX + '-modal-title">' + esc(opts.title || 'Thông báo') + '</div>' +
        '<div class="' + PREFIX + '-modal-body">' + (opts.html || esc(opts.message || '')) + '</div>' +
        '<div class="' + PREFIX + '-modal-actions">' +
        (opts.cancelText !== null ? '<button class="' + PREFIX + '-btn" data-act="cancel">' + esc(opts.cancelText || 'Đóng') + '</button>' : '') +
        '<button class="' + PREFIX + '-btn ' + PREFIX + '-primary" data-act="ok">' + esc(opts.okText || 'OK') + '</button>' +
        '</div></div>';
      function close(v) { wrap.remove(); document.removeEventListener('keydown', onKey); resolve(v); }
      function onKey(e) { if (e.key === 'Escape') close(false); if (e.key === 'Enter') close(true); }
      wrap.addEventListener('click', function (e) {
        var b = e.target.closest('[data-act]');
        if (b) close(b.getAttribute('data-act') === 'ok');
        else if (e.target === wrap) close(false);
      });
      document.addEventListener('keydown', onKey);
      document.body.appendChild(wrap);
      var okBtn = wrap.querySelector('[data-act="ok"]'); if (okBtn) okBtn.focus();
    });
  }
  function notify(message, level) {
    var t = el('div', PREFIX + '-toast ' + PREFIX + '-toast-' + (level || 'ok'), esc(message));
    document.body.appendChild(t);
    setTimeout(function () { t.classList.add(PREFIX + '-toast-show'); }, 10);
    setTimeout(function () { t.classList.remove(PREFIX + '-toast-show'); setTimeout(function () { t.remove(); }, 300); }, 3500);
  }

  function flag(level, text, detail) { return { level: level, text: text, detail: detail || '' }; }
  var LEVEL_SCORE = { danger: 30, warn: 10, info: 2, ok: 0 };

  function floorPct() { var v = +settings.floorDealPercent; return (v > 0 && v < 100) ? v : 15; }
  function floorLabel() { return 'mốc ' + floorPct() + '%'; }
  function floorPrice(nvlUnit, isTapePrint) {
    if (!(nvlUnit > 0)) return 0;
    return isTapePrint ? Math.ceil(nvlUnit) : Math.ceil(nvlUnit / (1 - floorPct() / 100));
  }

  function targetDealPercent(o, p) {
    if (p && +p.dealPercent > 0) return +p.dealPercent;
    if (o.customer && +o.customer.dealPercent > 0) return +o.customer.dealPercent;
    return +settings.defaultDealPercent || 0;
  }

  function analyzeProducts(o, po, costUnknown) {
    var products = (o.opportunityProducts || []).filter(function (p) { return !p.isDeleted; });
    var rows = [], totalCost = 0, totalSale = 0, totalCommission = 0, totalProfit = 0, totalNvl = 0, totalBase = 0;
    var dealNvl = 0, dealSale = 0, tapeCount = 0;   // % deal "từ NVL lên" chỉ tính trên SP không phải băng keo
    var costedSale = 0, noCostCount = 0, noCostSale = 0;   // LN / % deal chỉ tính trên SP có giá vốn
    var flags = [];
    products.forEach(function (p, idx) {
      var qty = +p.quantity || 0;
      var cost = DDBG_PO.importCost(p, settings);
      var ignoredImport = DDBG_PO.isStockItem(p) && !settings.useStockImportPrice && +p.importPrice > 0;   // giá nhập Nhanh.vn bị bỏ qua
      var isShipping = DDBG_PO.isStockItem(p) && /vận chuyển|van chuyen|ship|giao hàng/i.test(p.name || '');
      var bp = po && po.byProduct[p.id];
      var nvlUnit = bp && bp.source === 'po' ? bp.unitCost : cost;   // giá NVL / sản phẩm theo PO (trước VAT)
      var nvlFromPO = !!(bp && bp.source === 'po');
      var cat = productCategory(p);
      var isTapePrint = cat === 'BANG_KEO_IN' && p.productType !== 'BANG_KEO';   // in qua màn "Băng keo" thường -> tính như băng keo thường                        // băng keo in: importPrice = giá vốn 1 cuộn (NVL + gia công) từ "Set chiết giá"
      var isTape = TAPE_RECALC && p.productType === 'BANG_KEO'; // băng keo thường: giá vốn 1 cuộn (R) tính lại như màn "Tính giá băng keo"
      var isTapeCrm = false;
      var tape = isTape ? DDBG_PO.tapeCost(p) : null;
      var tapeNote = '';
      if (isTape) {
        if (tape.ok) { nvlUnit = tape.costPerRoll; cost = tape.costPerRoll; tapeNote = tape.code + ' · ' + tape.numberCase + ' cuộn/cây · ' + (tape.calcBy === 'WEIGHT' ? tape.weight + ' kg' : tape.meter + ' m') + ' × ' + tape.height + 'mm · keo ' + fmt(tape.giaKeo) + ' + lõi ' + fmt(tape.giaLoi) + ' + gia công ' + fmt(tape.giaGiaCong); }
        else if (+p.totalRoll > 0 && +p.importPrice > 0) { nvlUnit = Math.round(+p.importPrice / +p.totalRoll); cost = nvlUnit; tapeNote = 'ước tính = giá nhập/cây ÷ ' + p.totalRoll + ' (' + tape.reason + ')'; }
        else tapeNote = tape.reason;
      }
      var isPE = p.productType === 'PE';   // Hải Âu: giá vốn từ máy tính màng PE (đã gồm nhựa + lõi) -> như băng keo: giá mốc = giá vốn
      if (isTape && cat === 'BANG_KEO_IN') tapeNote = 'băng keo in nhập qua màn băng keo thường: giá vốn chưa gồm tiền in · ' + tapeNote;
      var useMarkup = isTapePrint || isTape || isTapeCrm || isPE;                           // băng keo: % lợi nhuận trên giá vốn (giá = vốn × (1 + %))
      var costInvalid = !nvlFromPO && !useMarkup && +p.price > 0 && nvlUnit > +p.price * 3;
      if (costInvalid) nvlUnit = 0;
      if (costUnknown) { nvlUnit = 0; cost = 0; nvlFromPO = false; costInvalid = false; tape = null; isTape = false; }  // deal offset: không có giá vốn trong hệ thống
      var tPct = targetDealPercent(o, p);
      var dealPO = nvlFromPO ? bp.dealPrice(tPct) : 0;                 // giá deal tính từ NVL lên
      var baseUnit = floorPrice(nvlUnit, useMarkup);                   // giá ở mốc % sàn (VD 15%)
      var priced = +p.price > 0;   // SP chưa có giá bán: không trừ giá vốn vào lợi nhuận (đã có cờ "chưa có giá bán")
      if (priced) { totalNvl += nvlUnit * qty; totalBase += baseUnit * qty; }
      if (useMarkup) tapeCount++; else if (priced) { dealNvl += nvlUnit * qty; }
      var suggest = +p.prePrice || +p.suggestPrice || 0;
      var deal = +p.dealValue || 0;
      var sale = +p.price || 0;
      var hh = +p.commissionPrice || 0;
      var disc = +p.discount || 0;
      if (costInvalid) cost = 0;
      var markup = (cost > 0 && sale > 0) ? (sale - cost) / cost * 100 : null;
      var margin = (cost > 0 && sale > 0) ? (sale - cost) / sale * 100 : null;
      var lineCost = cost * qty, lineSale = sale * qty;
      var lineProfit = (p.profit !== undefined && p.profit !== null && p.profit !== 0) ? +p.profit : (lineSale - lineCost - hh * qty);
      totalCost += lineCost; totalSale += lineSale; totalCommission += hh * qty; totalProfit += lineProfit;
      var hasCost = nvlUnit > 0;
      if (hasCost) costedSale += lineSale;
      else if (lineSale > 0 && !costUnknown) { noCostCount++; noCostSale += lineSale; }
      if (!useMarkup && hasCost) dealSale += lineSale;

      var actualDealPct = (sale > 0 && nvlUnit > 0) ? (useMarkup ? (sale - nvlUnit) / nvlUnit * 100 : (sale - nvlUnit) / sale * 100) : null;
      var pf = [];
      var label = 'SP' + (idx + 1);
      if (sale <= 0) pf.push(flag('danger', label + ': chưa có giá bán'));
      if (costUnknown) {
        flags = flags.concat(pf);
        rows.push({ idx: idx + 1, dims: productDims(p), name: p.name || '', type: p.productType || '', unit: p.unit || '', qty: qty, cost: 0, suggest: suggest, deal: deal, dealPercent: +p.dealPercent || 0,
          id: p.id, nvlUnit: 0, nvlFromPO: false, costInvalid: false, targetPct: tPct, dealPO: 0, actualDealPct: null, baseUnit: 0, lineProfitBase: 0, category: cat, isTapePrint: false, isTapeRoll: false, tapeInfo: '',
          provider: '', sale: sale, hh: hh, discount: disc, markup: null, margin: null, lineCost: 0, lineSale: lineSale, lineProfit: 0, flags: pf, struct: p.cartonStructCode || '' });
        return;
      }
      if (costInvalid) pf.push(flag('info', label + ': giá nhập nghi sai đơn vị, bỏ qua', 'Giá nhập ' + fmt(+p.importPrice) + ' > 3× giá bán ' + fmt(sale)));
      var st0 = p.cartonStruct, prov0 = st0 && st0.provider;
      var paperChanged = !!(p.productType === 'CARTON' && +p.cartonPrice > 0 && st0 && ((+p.cartonPrice < +st0.price) || (prov0 && +st0.updatedAt < +prov0.lastUpdatePrice)));
      var structPrice = st0 ? +st0.price || 0 : 0;
      if (paperChanged) pf.push(flag('warn', label + ': giá giấy đã thay đổi, cần đồng bộ', 'BG ' + fmt(+p.cartonPrice) + '/m² → hiện tại ' + fmt(structPrice) + '/m²' + (+p.cartonPrice < structPrice ? ' (+' + pct((structPrice - +p.cartonPrice) / +p.cartonPrice * 100, 1) + ')' : ' (NCC cập nhật giá sau khi chọn giấy)') + '. Trang sẽ không cho Cập nhật cho đến khi "Đồng bộ giá carton mới".'));
      if (nvlFromPO && sale > 0 && sale < nvlUnit) pf.push(flag('danger', label + ': bán dưới giá NVL (PO)', fmt(sale) + ' < NVL ' + fmt(nvlUnit)));
      if (nvlFromPO && dealPO > 0 && sale > 0 && sale < dealPO) pf.push(flag('warn', label + ': dưới giá deal ' + tPct + '% từ NVL', fmt(sale) + ' < ' + fmt(dealPO) + ' (NVL ' + fmt(nvlUnit) + ')'));
      if (!useMarkup && baseUnit > 0 && sale > 0 && sale < baseUnit) pf.push(flag('danger', label + ': bán dưới giá ' + floorLabel(), fmt(sale) + ' < ' + fmt(baseUnit)));
      if (isTape) {
        if (!tape.ok) pf.push(flag(nvlUnit > 0 ? 'warn' : 'danger', label + ': băng keo chưa tính được giá vốn', tape.reason));
      }
      if (isTape || isTapePrint) {
        var jNow = p.jumbo ? +p.jumbo.price || 0 : 0, jBg = +p.jumboPrice || 0;
        if (jNow > 0 && jBg > 0 && jNow > jBg * 1.005) pf.push(flag('warn', label + ': giá jumbo đã tăng ' + pct((jNow - jBg) / jBg * 100, 0) + ', cần tính lại giá vốn', 'Lúc báo giá ' + fmt(jBg) + ' → hiện tại ' + fmt(jNow) + ' (' + esc((p.jumbo && (p.jumbo.code || p.jumbo.name)) || '') + '). Giá vốn đang tính theo giá lúc báo giá.'));
      }
      if (isTapePrint) {
        if (!(+p.importPrice > 0)) pf.push(flag('danger', label + ': băng keo in chưa tính giá vốn', 'Mở "Tính giá băng keo in" → Set chiết giá'));
        if (!(+p.jumboPrice > 0)) pf.push(flag('warn', label + ': chưa chọn chất liệu in (jumbo)'));
        if (!(+p.trucAmQuantity > 0) && !(+p.trucDuongQuantity > 0)) pf.push(flag('warn', label + ': chưa chọn trục âm / trục dương'));
        if (!String(p.kieuIn || p.printType || '').trim()) pf.push(flag('warn', label + ': chưa chọn kiểu in'));
        else if (!(+p.moneyPrint > 0)) pf.push(flag('warn', label + ': có kiểu in nhưng chưa có tiền in màu'));
        if (!(+p.bangKeoCorePrice > 0)) pf.push(flag('info', label + ': chưa có giá lõi'));
        if (!(+p.moneyGiaCong > 0)) pf.push(flag('info', label + ': chưa có tiền gia công cắt'));
      }
      if (!(nvlUnit > 0) && !costInvalid && !(isTape && !tape.ok) && !(isTapePrint && !(+p.importPrice > 0))) {
        if (isShipping) pf.push(flag('info', label + ': phí vận chuyển, không tính vào LN', ignoredImport ? 'Bỏ qua giá nhập ' + fmt(+p.importPrice) + ' đ đồng bộ từ PM bán hàng' : ''));
        else if (ignoredImport) pf.push(flag('warn', label + ': hàng tồn kho, chưa có giá vốn', 'Không dùng giá nhập ' + fmt(+p.importPrice) + ' đ đồng bộ từ PM bán hàng (Nhanh.vn). Muốn tính LN: thêm lại SP bằng nút Flexo / Băng keo / Băng keo in để hệ thống tính giá vốn.'));
        else if (DDBG_PO.isStockItem(p) && !settings.useStockImportPrice) pf.push(flag('warn', label + ': hàng tồn kho, chưa có giá vốn', 'SP chọn theo mã hàng, không có giá vốn trong CRM. Thêm lại bằng nút Flexo / Băng keo / Băng keo in để tính.'));
        else pf.push(flag('warn', label + ': chưa có giá vốn'));
      }
      if (sale > 0 && cost > 0 && sale < cost) pf.push(flag('danger', label + ': bán dưới giá vốn' + (useMarkup ? ' (chiết giá)' : ''), fmt(sale) + ' < vốn ' + fmt(cost)));
      if (deal > 0 && sale > 0 && sale < deal) pf.push(flag('warn', label + ': bán thấp hơn giá deal', fmt(sale) + ' < deal ' + fmt(deal) + ' (' + (p.dealPercent || 0) + '%)'));
      if (markup !== null && markup < settings.lowMarkup && sale >= cost) pf.push(flag('warn', label + ': biên thấp (lãi ' + pct(markup, 0) + ')'));
      if (disc > 0) pf.push(flag('info', label + ': có giảm giá ' + disc + '%'));
      flags = flags.concat(pf);

      rows.push({
        idx: idx + 1, dims: productDims(p), name: p.name || '', type: p.productType || '', unit: p.unit || '',
        qty: qty, cost: cost, suggest: suggest, deal: deal, dealPercent: +p.dealPercent || 0,
        id: p.id, nvlUnit: nvlUnit, nvlFromPO: nvlFromPO, costInvalid: costInvalid, targetPct: tPct, dealPO: dealPO, actualDealPct: actualDealPct,
        category: cat, isTapePrint: useMarkup, isTapeRoll: isTape,
        tapeInfo: isTape ? tapeNote : isTapeCrm ? ('giá vốn CRM tính lúc báo giá · jumbo ' + fmt(+p.jumboPrice) + ' · gia công ' + fmt(+p.moneyGiaCong)) : isTapePrint ? ('jumbo ' + fmt(+p.jumboPrice) + ' · lõi ' + fmt(+p.bangKeoCorePrice) + ' · trục âm ' + (+p.trucAmQuantity || 0) + ' / dương ' + (+p.trucDuongQuantity || 0) + ' · ' + (p.kieuIn || 'chưa chọn kiểu in') + ' · in ' + fmt(+p.moneyPrint) + ' · gia công ' + fmt(+p.moneyGiaCong)) : '',
        baseUnit: baseUnit, lineProfitBase: sale > 0 && hasCost ? (sale - baseUnit) * qty : 0, hasCost: hasCost, ignoredImport: ignoredImport, stockItem: DDBG_PO.isStockItem(p),
        provider: bp && bp.provider ? (bp.provider.shortName || bp.provider.code) : '',
        paperChanged: paperChanged, structPrice: structPrice, cartonPrice: +p.cartonPrice || 0,
        sale: sale, hh: hh, discount: disc, markup: markup, margin: margin,
        lineCost: lineCost, lineSale: lineSale, lineProfit: lineProfit, flags: pf,
        struct: p.cartonStructCode || (p.cartonStruct && p.cartonStruct.name) || ''
      });
    });
    var profitPO = costUnknown ? 0 : costedSale - totalNvl;      // Lợi nhuận gộp = giá bán − giá nhập NVL (đều trước VAT)
    var profitBase = costUnknown ? 0 : costedSale - totalBase;   // Lợi nhuận tính từ mốc % deal sàn = giá bán − giá mốc
    var profitAfterHH = profitBase - totalCommission;           // sau khi trừ hoa hồng thu mua
    return {
      rows: rows, count: products.length, flags: flags,
      totalCost: totalCost, totalSale: totalSale, totalCommission: totalCommission,
      totalProfit: (o.totalProfit && o.totalProfit !== 0) ? +o.totalProfit : totalProfit,
      markup: totalCost > 0 ? (totalSale - totalCost) / totalCost * 100 : null,
      margin: totalSale > 0 ? (totalSale - totalCost) / totalSale * 100 : null,
      totalNvl: totalNvl, profitPO: profitPO, profitAfterHH: profitAfterHH, totalBase: totalBase, profitBase: profitBase, costUnknown: !!costUnknown,
      dealPctPO: !costUnknown && dealSale > 0 && dealNvl > 0 ? (dealSale - dealNvl) / dealSale * 100 : null,   // chỉ SP không phải băng keo
      markupPO: totalNvl > 0 ? (costedSale - totalNvl) / totalNvl * 100 : null,
      costedSale: costedSale, noCostCount: noCostCount, noCostSale: noCostSale,
      tapeCount: tapeCount, tapeOnly: tapeCount > 0 && tapeCount === rows.length
    };
  }

  function analyzeComments(o, comments) {
    var threads = (comments || []).filter(function (c) { return c.opportunity && c.opportunity.id === o.id; });
    var me = (getCurrentUser().name || '').trim();
    var meRole = getCurrentUser().role || {};
    var salesName = (o.customer && o.customer.staff && o.customer.staff.name) || (o.staff && o.staff.name !== me && o.staff.name) || '';
    var msgs = [];
    threads.forEach(function (t) {
      msgs.push({ by: (t.staff && t.staff.name) || '', text: t.description || '', at: t.createdAt, root: true, url: t.url || '' });
      (t.children || []).forEach(function (c) {
        msgs.push({ by: (c.staff && c.staff.name) || '', text: c.description || '', at: c.createdAt, root: false, url: c.url || '' });
      });
    });
    msgs.sort(function (a, b) { return (a.at || 0) - (b.at || 0); });
    var isSales = function (m) {
      if (!m.by) return false;
      if (me && m.by === me && (meRole.isAdmin || meRole.isSupervisor || !meRole.isSale)) return false; // người đang đăng nhập (sếp) không bao giờ là sale
      return salesName ? m.by === salesName : (!me || m.by !== me);
    };
    var last = msgs[msgs.length - 1] || null;
    var lastReview = null, lastSales = null;
    msgs.forEach(function (m) { if (isSales(m)) lastSales = m; else if (m.by) lastReview = m; });

    var flags = [];
    var customerKw = null, customerKwAt = null, customerKwReply = null, customerKwHandled = false;
    msgs.forEach(function (m) {
      if (isSales(m)) { var kw = containsAny(m.text, KW_CUSTOMER_PRICE_HIGH); if (kw) { customerKw = kw; customerKwAt = m.at; customerKwReply = null; } }
      else if (m.by && customerKwAt && m.at >= customerKwAt) customerKwReply = m;
    });
    var commentTimes = {}; msgs.forEach(function (m) { if (m.at) commentTimes[m.at] = 1; });
    var editedAfter = function (ts) {
      if (!ts) return false;
      if ((o.opportunityProducts || []).some(function (p) { return !p.isDeleted && p.updatedAt && p.updatedAt > ts; })) return true;
      return !!(o.updatedAt && o.updatedAt > ts && !commentTimes[o.updatedAt]);
    };
    if (customerKwAt) customerKwHandled = !!(customerKwReply && editedAfter(customerKwAt));
    var competitorCut = null;
    msgs.forEach(function (m) {
      if (isSales(m) || !m.by) return;
      var c = parseCompetitorCut(m.text);
      if (c !== null) competitorCut = { pct: c, at: m.at, by: m.by, text: m.text };
    });
    if (competitorCut) competitorCut.applied = editedAfter(competitorCut.at);

    var waitingReview = last && isSales(last) && containsAny(last.text, KW_SALES_ASK);
    if (waitingReview) flags.push(flag('danger', 'Sales đang chờ trả lời', '"' + last.text.slice(0, 90) + '"'));

    var reQuoted = false, notUpdatedAfterReview = false, waitingSales = false, requoteAsk = null, salesAfterAsk = null;
    if (lastReview) {
      reQuoted = !!containsAny(lastReview.text, KW_REVIEW_PRICE);
      requoteAsk = containsAny(lastReview.text, KW_REQUOTE_ASK);
      if (reQuoted || requoteAsk) {
        salesAfterAsk = msgs.filter(function (m) { return isSales(m) && m.at > lastReview.at; }).pop() || null;
        var bgEdited = editedAfter(lastReview.at);
        var days = Math.floor((Date.now() / 1000 - lastReview.at) / 86400);
        if (salesAfterAsk) {
          flags.push(flag('info', 'Sales đã phản hồi sau khi sếp ' + (requoteAsk ? 'yêu cầu chào lại' : 'cho giá'), dateStr(salesAfterAsk.at) + ': "' + salesAfterAsk.text.slice(0, 90) + '"'));
        } else if (!bgEdited) {
          waitingSales = true; notUpdatedAfterReview = true;
          flags.push(flag('warn', 'Chờ sales chào lại — hỏi sales đã chào lại chưa?', 'Sếp ' + (requoteAsk ? 'yêu cầu "' + lastReview.text.slice(0, 60) + '"' : 'cho giá') + ' ' + dateStr(lastReview.at) + (days > 0 ? ' (' + days + ' ngày trước)' : '') + '; sales chưa phản hồi, BG chưa sửa'));
        } else {
          flags.push(flag('info', 'BG đã sửa sau khi sếp ' + (requoteAsk ? 'yêu cầu chào lại' : 'cho giá') + ', sales chưa xác nhận', 'Sếp ' + dateStr(lastReview.at) + ' → BG sửa ' + dateStr(o.updatedAt)));
        }
      }
    }
    return {
      count: msgs.length, threads: threads.length, last: last, lastReview: lastReview, lastSales: lastSales,
      waitingReview: !!waitingReview, reQuoted: reQuoted, notUpdatedAfterReview: notUpdatedAfterReview, waitingSales: waitingSales, requoteAsk: requoteAsk, salesAfterAsk: salesAfterAsk,
      customerKw: customerKw, customerKwAt: customerKwAt, customerKwReply: customerKwReply, customerKwHandled: customerKwHandled, competitorCut: competitorCut,
      flags: flags, msgs: msgs
    };
  }

  function analyze(o, comments, printCount, po) {
    var cm = analyzeComments(o, comments);
    var hasOffsetType = (o.opportunityProducts || []).some(function (p) { return !p.isDeleted && p.productType === 'CARTON_OFFSET'; });
    var tuantuLinks = findTuantuLinks([o.name, o.note, o.privateNote, o.cskhNote, o.customerNote].concat(cm.msgs.map(function (m) { return m.text; })));
    var isOffset = hasOffsetType || tuantuLinks.length > 0;
    var prod = analyzeProducts(o, isOffset ? null : po, isOffset);
    if (cm.competitorCut) prod.flags = prod.flags.filter(function (f) { return !/dưới giá deal|thấp hơn giá deal/.test(f.text); });
    var flags = [];
    var qs = o.quoteStatus, closed = !!CLOSED[qs];
    var custName = (o.customer && o.customer.name) || '';
    var amount = +o.totalPrice || +o.amount || prod.totalSale;

    var commissionPct = o.commissionType === 'PERCENT' ? (+o.commissionValue || 0) : 0;
    var commissionMoney = (+o.moneyCommission || 0) || prod.totalCommission || (o.commissionType !== 'PERCENT' ? +o.commissionValue || 0 : 0);
    var hasCommission = commissionPct > 0 || commissionMoney > 0;
    if (!hasCommission && !closed && isCompany(custName) && amount >= settings.commissionMinAmount) {
      flags.push(flag('warn', 'Chưa có chiết khấu thu mua', 'Khách công ty, giá trị ' + fmt(amount) + ' đ'));
    }

    var noteText = [o.name, o.customerNote, o.cskhNote, o.privateNote].map(stripHtml).join(' | ');
    var kwNote = containsAny(noteText, KW_CUSTOMER_PRICE_HIGH);
    var cc = cm.competitorCut;
    if (!closed && cc) {
      var ccLabel = 'giá đối thủ' + (cc.pct ? ' − ' + cc.pct + '%' : '');
      if (cc.applied) flags.push(flag('info', 'Đã sửa giá sau chỉ đạo: ' + ccLabel, cc.by + ' ' + dateStr(cc.at) + ': "' + cc.text.slice(0, 80) + '"'));
      else flags.push(flag('warn', 'Sếp chốt ' + ccLabel + ' — BG chưa sửa giá', cc.by + ' ' + dateStr(cc.at) + ': "' + cc.text.slice(0, 80) + '". Chỉnh giá → chế độ "Theo giá khách/đối thủ" để điền giá.'));
    } else if (!closed && cm.customerKw && cm.customerKwHandled) {
      flags.push(flag('info', 'Khách chê giá → đã xử lý', 'Sếp trả lời ' + dateStr(cm.customerKwReply.at) + ': "' + cm.customerKwReply.text.slice(0, 80) + '"; BG sửa ' + dateStr(o.updatedAt)));
    } else if (!closed && (kwNote || cm.customerKw || qs === 'NEGOTIATE' || o.status === 'NEGOTIATE')) {
      var kwDetail = kwNote || cm.customerKw || 'trạng thái thương lượng';
      if (cm.customerKw && cm.customerKwReply && !cm.customerKwHandled) kwDetail += '" — sếp đã trả lời nhưng BG chưa sửa sau ' + dateStr(cm.customerKwReply.at) + ' "';
      flags.push(flag('warn', 'Khách phản hồi giá cao / thương lượng', 'Từ khóa: "' + kwDetail + '"'));
    }

    var sent = qs === 'SEND_2_CUSOMTER' || (printCount !== null && printCount > 0) || (+o.countPrint || 0) > 0;
    var editedAfterQuote = o.updatedAt && o.quotedAt && (o.updatedAt - o.quotedAt) > 3600;
    if (!closed) {
      if (!sent && (qs === 'DRAFF' || qs === 'CONFIRMED')) flags.push(flag('info', 'Chưa gửi khách'));
      if (sent && editedAfterQuote && qs !== 'SEND_2_CUSOMTER') flags.push(flag('info', 'Đã sửa sau lần chào gần nhất', 'Cần chào lại khách'));
    }

    if (o.changeStatus === 'PENDING') flags.push(flag('danger', 'Chờ duyệt thay đổi (đồng bộ)'));

    var age = daysAgo(o.createdAt);
    if (!closed && age !== null && age > settings.staleDays && (qs === 'DRAFF' || qs === 'CONFIRMED' || qs === 'SEND_2_CUSOMTER'))
      flags.push(flag('info', 'Treo ' + age + ' ngày'));
    if (!closed && o.deadlineDate) {
      var dl = new Date(o.deadlineDate + 'T23:59:59');
      var createdDay = o.createdAt ? new Date(o.createdAt * 1000) : null;
      var sameAsCreated = createdDay && o.deadlineDate === createdDay.getFullYear() + '-' + ('0' + (createdDay.getMonth() + 1)).slice(-2) + '-' + ('0' + createdDay.getDate()).slice(-2);
      if (!sameAsCreated && !isNaN(dl.getTime()) && dl.getTime() < Date.now()) flags.push(flag('info', 'Quá ngày kỳ vọng ' + dateStr(dl.getTime())));
    }
    if (prod.count === 0) flags.push(flag('danger', 'Chưa có sản phẩm'));
    if (isOffset) flags.push(flag('info', 'Deal offset: giá vốn tính bên sale.tuantu.com.vn', tuantuLinks.join('\n') || 'Sản phẩm loại CARTON_OFFSET'));
    if (!isOffset && po && po.errors.length) flags.push(flag('info', 'Không tính PO được ' + po.errors.length + ' SP', po.errors.join('\n')));
    var tDeal = targetDealPercent(o, null);
    if (!isOffset && !closed && !cm.competitorCut && prod.dealPctPO !== null && prod.dealPctPO < tDeal - 0.5) flags.push(flag('warn', '% deal thực tế ' + pct(prod.dealPctPO, 1) + ' < mục tiêu ' + tDeal + '%', 'Tính từ giá NVL theo PO lên'));
    if (!isOffset && !closed && po && prod.totalNvl > prod.totalCost * 1.03 && prod.totalCost > 0) flags.push(flag('info', 'NVL theo PO cao hơn giá nhập BG ' + pct((prod.totalNvl / prod.totalCost - 1) * 100, 1)));

    var debt = o.customer && +o.customer.totalDebtMoney || 0;
    if (debt > 0) flags.push(flag('info', 'Khách đang nợ ' + fmt(debt) + ' đ'));

    flags = flags.concat(prod.flags, cm.flags);
    var score = 0;
    flags.forEach(function (f) { score += LEVEL_SCORE[f.level] || 0; });
    var actionable = flags.some(function (f) { return f.level === 'danger' || f.level === 'warn'; });

    var checklist = [
      { ok: prod.count > 0 && prod.rows.every(function (r) { return r.sale > 0 && (isOffset || r.cost > 0); }), text: isOffset ? 'Đủ giá bán (giá vốn tính bên tuantu)' : 'Đủ giá nhập & giá bán' },
      { ok: prod.rows.every(function (r) { return r.cost <= 0 || r.sale >= r.cost; }), text: 'Không bán dưới giá vốn' },
      { ok: prod.rows.every(function (r) { return r.deal <= 0 || r.sale >= r.deal; }), text: 'Giá bán ≥ giá deal trên BG' },
      { ok: prod.rows.every(function (r) { return !r.nvlFromPO || r.dealPO <= 0 || r.sale >= r.dealPO; }), text: 'Giá bán ≥ giá deal từ NVL (PO)' },
      { ok: prod.rows.every(function (r) { return r.baseUnit <= 0 || r.sale >= r.baseUnit; }), text: 'Giá bán ≥ giá ' + floorLabel() },
      { ok: prod.markup === null || prod.markup >= settings.lowMarkup, text: 'Biên lợi nhuận ≥ ' + settings.lowMarkup + '%' },
      { ok: hasCommission || !isCompany(custName) || amount < settings.commissionMinAmount, text: 'Đã xét chiết khấu thu mua' },
      { ok: !cm.waitingReview && !cm.waitingSales, text: 'Không còn yêu cầu chào lại chờ sales' },
      { ok: o.changeStatus !== 'PENDING', text: 'Không có thay đổi chờ duyệt' }
    ];
    var ready = checklist.every(function (c) { return c.ok; });

    var cats = {}, catSale = {};
    (o.opportunityProducts || []).forEach(function (p) { if (p.isDeleted) return; var k = productCategory(p); if (isOffset && k === 'CARTON') k = 'OFFSET'; cats[k] = 1; catSale[k] = (catSale[k] || 0) + ((+p.price || 0) * (+p.quantity || 0)); });
    if (isOffset) { cats.OFFSET = 1; catSale.OFFSET = (catSale.OFFSET || 0) + 1e15; }
    var mainCat = Object.keys(catSale).sort(function (x, y) { return catSale[y] - catSale[x]; })[0] || 'OTHER';
    return {
      categories: Object.keys(cats), mainCategory: mainCat, isOffset: isOffset, tuantuLinks: tuantuLinks,
      o: o, comments: comments, id: o.id, code: o.code, name: o.name, customer: custName, isCompany: isCompany(custName),
      staff: (o.staff && o.staff.name) || (o.customer && o.customer.staff && o.customer.staff.name) || '',
      quoteStatus: qs, quoteStatusLabel: QUOTE_STATUS[qs] || qs,
      status: o.status, statusLabel: OPP_STATUS[o.status] || o.status,
      changeStatus: o.changeStatus, amount: amount, age: age,
      commissionPct: commissionPct, commissionMoney: commissionMoney, hasCommission: hasCommission,
      sent: sent, printCount: printCount !== null ? printCount : (+o.countPrint || 0),
      customerDealPercent: o.customer && +o.customer.dealPercent || 0,
      customerDebt: debt, customerRevenue: o.customer && +o.customer.totalMoney || 0,
      lastOrderAt: o.customer && o.customer.lastOrderAt || 0,
      prod: prod, cm: cm, po: po, targetDeal: tDeal, flags: flags, score: score, actionable: actionable,
      checklist: checklist, ready: ready
    };
  }

  function chip(f) {
    return '<span class="' + PREFIX + '-chip ' + PREFIX + '-' + f.level + '" title="' + esc(f.detail) + '">' + esc(f.text) + '</span>';
  }
  function renderFlags(flags) {
    if (!flags.length) return '<span class="' + PREFIX + '-chip ' + PREFIX + '-ok">Không có cảnh báo</span>';
    return flags.map(chip).join('');
  }
  function renderProductTable(a) {
    var p = a.prod;
    if (!p.rows.length) return '<div class="' + PREFIX + '-muted">Chưa có sản phẩm</div>';
    var h = '<table class="' + PREFIX + '-table"><thead><tr>' +
      '<th>#</th><th>Sản phẩm</th><th class="r">SL</th><th class="r">Giá nhập BG</th><th class="r">NVL/SP (PO)</th><th class="r">Giá ' + floorLabel() + '</th><th class="r">Giá gợi ý</th>' +
      '<th class="r">Giá deal BG</th><th class="r">Giá deal PO</th><th class="r">Giá bán</th><th class="r">% deal thực</th><th class="r">HH thu mua</th><th class="r">LN (bán − ' + floorLabel() + ')</th></tr></thead><tbody>';
    p.rows.forEach(function (r) {
      var cls = r.flags.some(function (f) { return f.level === 'danger'; }) ? PREFIX + '-row-danger' : (r.flags.length ? PREFIX + '-row-warn' : '');
      h += '<tr class="' + cls + '" title="' + esc(r.flags.map(function (f) { return f.text; }).join('\n')) + '">' +
        '<td>' + r.idx + '</td>' +
        '<td class="' + PREFIX + '-name"><div>' + esc(r.name) + '</div>' + (r.struct ? '<div class="' + PREFIX + '-muted">' + esc(r.struct) + '</div>' : '') + (r.isTapePrint ? '<div class="' + PREFIX + '-muted">' + esc(r.tapeInfo) + '</div>' : '') + '</td>' +
        '<td class="r">' + fmt(r.qty) + '</td>' +
        '<td class="r">' + fmt(r.cost) + '</td>' +
        '<td class="r" title="' + (r.isTapePrint ? 'Giá vốn 1 cuộn từ Set chiết giá: ' + esc(r.tapeInfo) : (r.nvlFromPO ? 'Theo PO ' + esc(r.provider) : 'Không tính được PO, dùng giá nhập')) + '">' + fmt(r.nvlUnit) + (r.isTapePrint ? '<div class="' + PREFIX + '-muted">' + (r.isTapeRoll ? 'giá vốn/cuộn (R)' : 'giá vốn/cuộn') + '</div>' : (r.nvlFromPO ? '<div class="' + PREFIX + '-muted">' + esc(r.provider) + '</div>' : '<div class="' + PREFIX + '-muted">giá nhập</div>')) + '</td>' +
        '<td class="r ' + (r.baseUnit && r.sale && r.sale < r.baseUnit ? PREFIX + '-red' : '') + '" title="' + (r.isTapePrint ? 'băng keo / màng PE: giá mốc = giá vốn' : 'NVL ÷ (1 − ' + floorPct() + '%)') + '">' + (r.baseUnit ? fmt(r.baseUnit) : '-') + '</td>' +
        '<td class="r">' + fmt(r.suggest) + '</td>' +
        '<td class="r">' + (r.deal ? fmt(r.deal) + '<div class="' + PREFIX + '-muted">' + r.dealPercent + '%</div>' : '-') + '</td>' +
        '<td class="r">' + (r.dealPO ? fmt(r.dealPO) + '<div class="' + PREFIX + '-muted">' + r.targetPct + '%</div>' : '-') + '</td>' +
        '<td class="r ' + PREFIX + '-bold">' + fmt(r.sale) + '</td>' +
        (r.isTapePrint
          ? '<td class="r ' + (r.markup !== null && r.markup < settings.lowMarkup ? PREFIX + '-red' : '') + '" title="% lợi nhuận trên giá vốn (như slider Set chiết giá); đỏ khi dưới ' + settings.lowMarkup + '%">' + pct(r.markup, 1) + '<div class="' + PREFIX + '-muted">LN/vốn</div></td>'
          : '<td class="r ' + (r.actualDealPct !== null && r.actualDealPct < r.targetPct ? PREFIX + '-red' : '') + '">' + pct(r.actualDealPct, 1) + '</td>') +
        '<td class="r">' + (r.hh ? fmt(r.hh) : '-') + '</td>' +
        '<td class="r ' + (r.lineProfitBase < 0 ? PREFIX + '-red' : '') + '">' + (r.sale ? fmt(r.lineProfitBase) : '-') + '</td></tr>';
    });
    h += '</tbody><tfoot><tr><td colspan="3">Tổng</td><td class="r">' + fmt(p.totalCost) + '</td><td class="r">' + fmt(p.totalNvl) + '</td><td class="r">' + fmt(p.totalBase) + '</td><td></td><td></td><td></td>' +
      '<td class="r ' + PREFIX + '-bold">' + fmt(p.totalSale) + '</td><td class="r">' + pct(p.dealPctPO, 1) + '</td><td class="r">' + (p.totalCommission ? fmt(p.totalCommission) : '-') + '</td>' +
      '<td class="r ' + PREFIX + '-bold ' + (p.profitBase < 0 ? PREFIX + '-red' : '') + '">' + fmt(p.profitBase) + '</td></tr></tfoot></table>';
    return h;
  }
  function renderPOTable(a) {
    var po = a.po;
    if (a.isOffset) return '<div class="' + PREFIX + '-muted">Deal offset: không tính PO giấy tấm tại đây.</div>';
    if (!po || !po.providers.length) return '<div class="' + PREFIX + '-muted">Không có sản phẩm thùng carton để tính PO</div>';
    var h = '<table class="' + PREFIX + '-table"><thead><tr><th>NCC</th><th class="r">Số tấm lớn</th><th class="r">Mét tới</th><th class="r">Tiền giấy (trước VAT)</th><th class="r">VAT ' + po.taxPercent + '%</th><th class="r">Tổng thanh toán</th></tr></thead><tbody>';
    po.providers.forEach(function (g) {
      var bid = g.rows.some(function (r) { return r.bidApplied; });
      h += '<tr><td><b>' + esc(g.provider.code) + '</b> ' + esc(g.provider.shortName || g.provider.name) + (bid ? ' <span class="' + PREFIX + '-chip ' + PREFIX + '-info">giá bid</span>' : '') +
        '<div class="' + PREFIX + '-muted">' + g.rows.map(function (r) { return esc(r.name) + ' ×' + fmt(r.tamLon) + ' (OUT ' + r.out + ', ' + fmt(r.cartonPrice) + '/m² ' + (r.priceSource === 'BG' ? 'giá trên BG' : (r.priceSource === 'bid' ? 'giá bid' : 'giá NCC')) + ')'; }).join(' · ') + '</div></td>' +
        '<td class="r">' + fmt(g.tamLon) + '</td><td class="r">' + fmt(g.meter) + '</td><td class="r">' + fmt(g.subTotal) + '</td><td class="r">' + fmt(g.vat) + '</td><td class="r ' + PREFIX + '-bold">' + fmt(g.total) + '</td></tr>';
    });
    if (po.other.cost) h += '<tr><td>Khác (theo giá nhập BG)<div class="' + PREFIX + '-muted">' + po.other.rows.map(function (r) { return esc((r.product.name || '').slice(0, 40)); }).join(' · ') + '</div></td><td></td><td></td><td class="r">' + fmt(po.other.cost) + '</td><td></td><td class="r">' + fmt(po.other.cost) + '</td></tr>';
    h += '</tbody><tfoot><tr><td>Tổng mua NVL</td><td class="r">' + fmt(po.providers.reduce(function (s, g) { return s + g.tamLon; }, 0)) + '</td><td class="r">' + fmt(po.providers.reduce(function (s, g) { return s + g.meter; }, 0)) + '</td>' +
      '<td class="r">' + fmt(po.materialCost) + '</td><td class="r">' + fmt(po.carton.vat) + '</td><td class="r ' + PREFIX + '-bold">' + fmt(po.materialTotal) + '</td></tr></tfoot></table>';
    return h;
  }
  function renderSummary(a) {
    var p = a.prod;
    var po = a.po;
    var nvlSrc = po && po.providers.length ? 'theo PO' : 'theo giá nhập BG';
    if (a.isOffset) {
      return '<div class="' + PREFIX + '-stats">' +
        '<div class="' + PREFIX + '-stat ' + PREFIX + '-stat-main"><div class="' + PREFIX + '-stat-label">Deal thùng offset: giá vốn tính bên hệ thống Tuấn Tú, không đánh giá lợi nhuận tại đây</div>' +
        '<div class="' + PREFIX + '-stat-value">' + (a.tuantuLinks.length ? a.tuantuLinks.map(function (l) { return '<a href="' + esc(l) + '" target="_blank">' + esc(l) + '</a>'; }).join('<br>') : 'Sản phẩm loại CARTON_OFFSET') + '</div></div>' +
        stat('Tổng bán (trước VAT)', fmt(p.totalSale) + ' đ') +
        stat('HH thu mua', a.hasCommission ? (a.commissionPct ? a.commissionPct + '%' : '') + (a.commissionMoney ? ' ' + fmt(a.commissionMoney) + ' đ' : '') : 'Chưa có', a.hasCommission ? '' : PREFIX + '-orange') +
        stat('In / gửi · LN theo BG', (a.printCount || 0) + ' lần' + (a.sent ? '' : ' (chưa gửi)') + ' · ' + fmt(p.totalProfit) + ' đ') +
        '</div>';
    }
    return '<div class="' + PREFIX + '-stats">' +
      '<div class="' + PREFIX + '-stat ' + PREFIX + '-stat-main"><div class="' + PREFIX + '-stat-label">' + (p.tapeOnly ? 'Lợi nhuận = Giá bán − Giá vốn (băng keo / màng PE: giá vốn đã gồm nguyên liệu, lõi, gia công' + (p.rows.some(function (r) { return r.category === 'BANG_KEO_IN'; }) ? ', trục, in' : '') + '; đều trước VAT)' : 'Lợi nhuận = Giá bán − Giá ' + floorLabel() + ' (giá mốc = NVL ÷ (1 − ' + floorPct() + '%)' + (p.tapeCount ? '; băng keo / màng PE: giá mốc = giá vốn' : '') + ', đều trước VAT)') + '</div>' +
      '<div class="' + PREFIX + '-stat-value ' + PREFIX + '-stat-big ' + (p.profitBase < 0 ? PREFIX + '-red' : PREFIX + '-green') + '">' + fmt(p.profitBase) + ' đ</div>' +
      '<div class="' + PREFIX + '-muted">' + fmt(p.costedSale) + ' − ' + fmt(p.totalBase) + (p.totalCommission ? ' · sau HH thu mua: ' + fmt(p.profitAfterHH) + ' đ' : '') + ' · LN gộp (bán − nhập NVL): ' + fmt(p.profitPO) + ' đ</div></div>' +
      (p.noCostCount ? '<div class="' + PREFIX + '-muted ' + PREFIX + '-nocost">⚠ ' + p.noCostCount + ' SP chưa có giá vốn (bán ' + fmt(p.noCostSale) + ' đ) không tính vào lợi nhuận và % deal' + (settings.useStockImportPrice ? '' : ' · không dùng giá nhập từ PM bán hàng Nhanh.vn') + '</div>' : '') +
      stat('Tổng bán (trước VAT)', fmt(p.totalSale) + ' đ' + (p.noCostCount ? '<div class="' + PREFIX + '-muted">có giá vốn: ' + fmt(p.costedSale) + ' đ</div>' : '')) +
      stat(p.tapeOnly ? 'Giá vốn (tổng)' : 'Giá ' + floorLabel() + ' (tổng)', fmt(p.totalBase) + ' đ') +
      stat(p.tapeOnly ? 'Giá vốn băng keo / PE (trước VAT)' : 'Giá nhập NVL (trước VAT, ' + nvlSrc + ')', fmt(p.totalNvl) + ' đ') +
      stat('Tổng mua NVL (có VAT' + (po ? ' ' + po.taxPercent + '%' : '') + ')', po ? fmt(po.materialTotal) + ' đ' : '-') +
      (p.tapeOnly
        ? stat('% lợi nhuận / giá vốn (như Set chiết giá)', pct(p.markupPO, 1), p.markupPO !== null && p.markupPO < settings.lowMarkup ? PREFIX + '-red' : '')
        : stat('% deal thực tế (từ NVL lên' + (p.tapeCount ? ', trừ băng keo / PE' : '') + ')', pct(p.dealPctPO, 1) + ' / mục tiêu ' + a.targetDeal + '%', p.dealPctPO !== null && p.dealPctPO < a.targetDeal ? PREFIX + '-red' : '') +
          stat('% lãi / giá nhập', pct(p.markupPO, 1), p.markupPO !== null && p.markupPO < settings.lowMarkup ? PREFIX + '-red' : '')) +
      stat('HH thu mua', a.hasCommission ? (a.commissionPct ? a.commissionPct + '%' : '') + (a.commissionMoney ? ' ' + fmt(a.commissionMoney) + ' đ' : '') : 'Chưa có', a.hasCommission ? '' : PREFIX + '-orange') +
      stat('In / gửi · LN theo BG', (a.printCount || 0) + ' lần' + (a.sent ? '' : ' (chưa gửi)') + ' · ' + fmt(p.totalProfit) + ' đ') +
      '</div>';
  }
  function stat(label, value, cls) {
    return '<div class="' + PREFIX + '-stat"><div class="' + PREFIX + '-stat-label">' + esc(label) + '</div><div class="' + PREFIX + '-stat-value ' + (cls || '') + '">' + value + '</div></div>';
  }
  function renderChecklist(a) {
    return '<ul class="' + PREFIX + '-checklist">' + a.checklist.map(function (c) {
      return '<li class="' + (c.ok ? PREFIX + '-ok-item' : PREFIX + '-bad-item') + '">' + (c.ok ? '✔' : '✘') + ' ' + esc(c.text) + '</li>';
    }).join('') + '</ul>' +
      '<div class="' + PREFIX + '-ready ' + (a.ready ? PREFIX + '-ready-yes' : PREFIX + '-ready-no') + '">' + (a.ready ? 'Đủ điều kiện duyệt' : 'Cần xử lý trước khi duyệt') + '</div>';
  }
  function renderComments(a) {
    var cm = a.cm;
    if (!cm.count) return '<div class="' + PREFIX + '-muted">Chưa có bình luận cho BG này</div>';
    var last = cm.msgs.slice(-4);
    return '<div class="' + PREFIX + '-muted">' + cm.count + ' bình luận · ' + cm.threads + ' luồng' +
      (cm.lastReview ? ' · Sếp trả lời gần nhất ' + dateStr(cm.lastReview.at) : ' · Sếp chưa trả lời') + '</div>' +
      last.map(function (m) {
        return '<div class="' + PREFIX + '-msg"><b>' + esc(m.by) + '</b> <span class="' + PREFIX + '-muted">' + dateStr(m.at) + '</span><div>' + esc(m.text.slice(0, 220)) + (m.text.length > 220 ? '…' : '') + '</div></div>';
      }).join('');
  }
  function renderCardBody(a) {
    return '<div class="' + PREFIX + '-card-flags">' + renderFlags(a.flags) + '</div>' +
      '<div id="' + PREFIX + '-summary-root">' + renderSummary(a) + renderProductTable(a) + '</div>' +
      '<div class="' + PREFIX + '-h">Tiền nguyên vật liệu theo PO (từng NCC)</div>' + renderPOTable(a) +
      '<div class="' + PREFIX + '-cols"><div><div class="' + PREFIX + '-h">Bình luận gần nhất về BG này</div>' + renderComments(a) + '</div>' +
      '<div><div class="' + PREFIX + '-h">Điều kiện duyệt</div>' + renderChecklist(a) +
      '<div class="' + PREFIX + '-h" style="margin-top:8px">Khách hàng</div><div class="' + PREFIX + '-muted">' + esc(a.customer) + (a.isCompany ? ' (công ty)' : ' (cá nhân)') +
      ' · % Deal ' + (a.customerDealPercent || 0) + '% · Doanh số ' + fmt(a.customerRevenue) + ' đ · Nợ ' + fmt(a.customerDebt) + ' đ' + (a.lastOrderAt ? ' · Đơn gần nhất ' + dateStr(a.lastOrderAt) : ' · Chưa có đơn') + '</div>' +
      '</div></div>';
  }

  var listState = { analyses: {}, list: [], loading: false, pill: '', cat: '', expanded: {}, attempted: {},
    scan: { active: false, running: false, stop: false, list: [], shown: 150, sort: 'score', note: '', nextPage: {}, totals: {} } };

  var PILL_FILTERS = [
    { key: 'all', label: 'Deal', level: '', fn: function () { return true; } },
    { key: 'action', label: 'Cần xử lý', level: 'warn', fn: function (a) { return a.actionable; } },
    { key: 'waiting', label: 'Chờ sếp trả lời', level: 'danger', fn: function (a) { return a.cm.waitingReview; } },
    { key: 'requote', label: 'Chờ sales chào lại', level: 'warn', fn: function (a) { return a.cm.waitingSales; } },
    { key: 'nohh', label: 'Chưa HH thu mua', level: 'warn', fn: function (a) { return a.flags.some(function (f) { return f.text.indexOf('chiết khấu') >= 0; }); } },
    { key: 'cust', label: 'Khách chê giá', level: 'warn', fn: function (a) { return a.flags.some(function (f) { return f.text.indexOf('phản hồi giá') >= 0; }); } },
    { key: 'lowdeal', label: 'Dưới % deal', level: 'warn', fn: function (a) { return a.prod.dealPctPO !== null && a.prod.dealPctPO < a.targetDeal; } },
    { key: 'loss', label: 'Bán dưới NVL/vốn', level: 'danger', fn: function (a) { return a.flags.some(function (f) { return f.text.indexOf('bán dưới') >= 0; }); } },
    { key: 'paper', label: 'Giá giấy đổi', level: 'warn', fn: function (a) { return a.prod.rows.some(function (r) { return r.paperChanged; }); } },
    { key: 'unsent', label: 'Chưa gửi khách', level: 'info', fn: function (a) { return !a.sent && !CLOSED[a.quoteStatus]; } },
    { key: 'edited', label: 'Đã sửa, cần chào lại', level: 'info', fn: function (a) { return a.flags.some(function (f) { return f.text.indexOf('Đã sửa sau') >= 0; }); } },
    { key: 'stale', label: 'Treo lâu / quá hạn', level: 'info', fn: function (a) { return a.flags.some(function (f) { return f.text.indexOf('Treo') === 0 || f.text.indexOf('Quá ngày') === 0; }); } },
    { key: 'change', label: 'Chờ duyệt thay đổi', level: 'danger', fn: function (a) { return a.changeStatus === 'PENDING'; } },
    { key: 'debt', label: 'Khách đang nợ', level: 'info', fn: function (a) { return a.customerDebt > 0; } },
    { key: 'ready', label: 'Đủ ĐK duyệt', level: 'ok', fn: function (a) { return a.ready; } }
  ];

  function onlyActionable() {
    var tab = activeTabLabel();
    var m = settings.onlyByTab || {};
    if (Object.prototype.hasOwnProperty.call(m, tab)) return !!m[tab];
    if (tab === 'Duyệt lên đơn') return false;
    return !!settings.onlyActionable;
  }
  function setOnlyActionable(val) {
    if (!settings.onlyByTab || typeof settings.onlyByTab !== 'object') settings.onlyByTab = {};
    settings.onlyByTab[activeTabLabel()] = !!val;
    saveSettings();
  }
  function activeTabLabel() {
    var t = document.querySelector('.ant-tabs-tab-active');
    if (!t) return 'Tất cả';
    var txt = t.textContent.replace(/\d+\+?$/, '').trim();
    var keys = Object.keys(TAB_TO_STATUSES);
    for (var i = 0; i < keys.length; i++) if (txt.indexOf(keys[i]) === 0) return keys[i];
    return 'Tất cả';
  }
  function listLinks() {
    var table = findListTable();
    if (!table) return [];
    return Array.prototype.filter.call(table.querySelectorAll('a[href^="/bao-gia/update/"]'), function (a) { return !a.closest('.' + PREFIX + '-rowflags,.' + PREFIX + '-rowdetail,.' + PREFIX + '-bar,.' + PREFIX + '-detail'); });
  }
  function visibleIds() {
    var ids = [];
    listLinks().forEach(function (a) {
      var m = a.getAttribute('href').match(/update\/(\d+)/);
      if (m && ids.indexOf(+m[1]) < 0) ids.push(+m[1]);
    });
    return ids;
  }

  function findListTable() {
    var tables = document.querySelectorAll('table');
    var first = null;
    for (var i = 0; i < tables.length; i++) {
      var t = tables[i];
      if (!t.querySelector('a[href^="/bao-gia/update/"]') || t.closest('.' + PREFIX + '-bar')) continue;
      if (!first) first = t;
      var pane = t.closest('.ant-tabs-tabpane');
      var visible = pane ? pane.classList.contains('ant-tabs-tabpane-active') : t.offsetHeight > 0;
      if (visible) return t;   // ưu tiên bảng của tab đang mở (bảng tab cũ vẫn nằm trong DOM nhưng ẩn)
    }
    return first;
  }
  function ensureListBar() {
    var table = findListTable();
    if (!table) return null;
    var wrapper = table.closest('.ant-table-wrapper') || table.parentElement;
    var bar = document.getElementById(PREFIX + '-bar');
    if (bar && bar.nextElementSibling === wrapper) return bar;
    if (!bar) {
      bar = el('div', PREFIX + '-bar'); bar.id = PREFIX + '-bar';
      bar.innerHTML =
        '<div class="' + PREFIX + '-bar-head">' +
        '<b>📊 Phân tích báo giá</b> <span class="' + PREFIX + '-muted" title="Phiên bản phần phân tích (tự cập nhật từ GitHub)">v' + PAYLOAD_VER + '</span> <span id="' + PREFIX + '-tabname" class="' + PREFIX + '-muted"></span>' +
        '<span id="' + PREFIX + '-progress" class="' + PREFIX + '-progress"></span>' +
        '<span class="' + PREFIX + '-grow"></span>' +
        '<label><input type="checkbox" id="' + PREFIX + '-only" /> Chỉ deal cần xử lý</label>' +
        '<button id="' + PREFIX + '-refresh" class="' + PREFIX + '-btn">Phân tích lại</button>' +
        '<button id="' + PREFIX + '-scan-more" class="' + PREFIX + '-btn ' + PREFIX + '-primary" title="Quét thêm 100 báo giá kế tiếp của tab đang xem (đầy đủ bình luận)">+100 báo giá</button>' +
        '<button id="' + PREFIX + '-scan-more500" class="' + PREFIX + '-btn ' + PREFIX + '-primary" title="Quét thêm 500 báo giá kế tiếp của tab đang xem (đầy đủ bình luận, mất vài phút)">+500 báo giá</button>' +
        '<button id="' + PREFIX + '-scan-fail" class="' + PREFIX + '-btn" title="Quét nhanh thêm 100 deal Thất bại gần nhất và gộp vào kết quả">+100 Thất bại</button>' +
        '<button id="' + PREFIX + '-scan-btn" class="' + PREFIX + '-btn">Quét tùy chọn…</button>' +
        '<button id="' + PREFIX + '-settings-btn" class="' + PREFIX + '-btn">⚙</button>' +
        '<button id="' + PREFIX + '-collapse-btn" class="' + PREFIX + '-btn" title="Thu gọn / mở rộng thanh phân tích">▲ Thu gọn</button>' +
        '</div>' +
        '<div id="' + PREFIX + '-mini" class="' + PREFIX + '-mini"></div>' +
        '<div id="' + PREFIX + '-settings" class="' + PREFIX + '-settings" style="display:none"></div>' +
        '<div id="' + PREFIX + '-scanopts" class="' + PREFIX + '-scanopts" style="display:none"></div>' +
        '<div id="' + PREFIX + '-summary" class="' + PREFIX + '-summary"></div>' +
        '<div id="' + PREFIX + '-scan" class="' + PREFIX + '-scan"></div>' +
        '<div class="' + PREFIX + '-muted ' + PREFIX + '-bar-help">Bấm vào badge để lọc nhanh · bấm vào nhãn ở từng dòng để mở/đóng chi tiết deal ngay dưới dòng.</div>';
      bar.querySelector('#' + PREFIX + '-refresh').onclick = function () { runListAnalysis(true); };
      bar.querySelector('#' + PREFIX + '-collapse-btn').onclick = function () { setBarCollapsed(!settings.listBarCollapsed); };
      bar.querySelector('#' + PREFIX + '-mini').addEventListener('click', function () { setBarCollapsed(false); });
      ['scan-more', 'scan-more500', 'scan-fail', 'scan-btn', 'settings-btn'].forEach(function (k) {   // thao tác cần xem kết quả -> tự mở rộng
        bar.querySelector('#' + PREFIX + '-' + k).addEventListener('click', function () { if (settings.listBarCollapsed) setBarCollapsed(false); }, true);
      });
      applyBarCollapsed(bar);
      bar.querySelector('#' + PREFIX + '-scan-more').onclick = function () {
        var tab = activeTabLabel();
        scanNextBatch(TAB_TO_STATUSES[tab] || TAB_TO_STATUSES['Tất cả'], true, tab);
      };
      bar.querySelector('#' + PREFIX + '-scan-more500').onclick = function () {
        var tab = activeTabLabel();
        scanNextBatch(TAB_TO_STATUSES[tab] || TAB_TO_STATUSES['Tất cả'], true, tab, 500);
      };
      bar.querySelector('#' + PREFIX + '-scan-fail').onclick = function () {
        scanNextBatch(['REJECT'], false, 'Thất bại');
      };
      bar.querySelector('#' + PREFIX + '-scan-btn').onclick = function () {
        var so = document.getElementById(PREFIX + '-scanopts');
        so.style.display = so.style.display === 'none' ? 'block' : 'none';
        if (so.style.display === 'block') renderScanOpts(so);
      };
      bar.querySelector('#' + PREFIX + '-scan').addEventListener('click', function (e) {
        var more = e.target.closest('[data-scan-more]');
        if (more) { listState.scan.shown += 150; renderScan(); return; }
        var back = e.target.closest('[data-scan-back]');
        if (back) { listState.scan.active = false; renderBar(); decorateRows(); return; }
        var tg = e.target.closest('[data-scan-toggle]');
        if (tg) { var id = +tg.getAttribute('data-scan-toggle'); listState.expanded[id] = !listState.expanded[id]; renderScan(); return; }
      });
      bar.querySelector('#' + PREFIX + '-scan').addEventListener('change', function (e) {
        if (e.target.id === PREFIX + '-scan-sort') { listState.scan.sort = e.target.value; renderScan(); }
      });
      bar.querySelector('#' + PREFIX + '-settings-btn').onclick = function () {
        var sp = document.getElementById(PREFIX + '-settings');
        sp.style.display = sp.style.display === 'none' ? 'block' : 'none';
        if (sp.style.display === 'block') renderSettings(sp);
      };
      var only = bar.querySelector('#' + PREFIX + '-only');
      only.checked = onlyActionable();
      only.addEventListener('change', function (e) { setOnlyActionable(e.target.checked); renderBar(); decorateRows(); });
      bar.querySelector('#' + PREFIX + '-summary').addEventListener('click', function (e) {
        var pl = e.target.closest('[data-pill]');
        if (!pl) return;
        var key = pl.getAttribute('data-pill');
        if (key.indexOf('cat:') === 0) {
          var ck = key.slice(4);
          listState.cat = (!ck || listState.cat === ck) ? '' : ck;
        } else {
          listState.pill = (key === 'all' || listState.pill === key) ? '' : key;
        }
        renderBar(); decorateRows();
      });
    }
    wrapper.parentElement.insertBefore(bar, wrapper);
    return bar;
  }

  function applyBarCollapsed(bar) {
    bar = bar || document.getElementById(PREFIX + '-bar');
    if (!bar) return;
    var c = !!settings.listBarCollapsed;
    bar.classList.toggle(PREFIX + '-bar-collapsed', c);
    var b = bar.querySelector('#' + PREFIX + '-collapse-btn');
    if (b) b.textContent = c ? '▼ Mở rộng' : '▲ Thu gọn';
  }
  function setBarCollapsed(val) {
    settings.listBarCollapsed = !!val;
    saveSettings();
    applyBarCollapsed();
    renderBar();
  }

  function renderSettings(container) {
    var fields = [
      ['lowMarkup', '% lãi/vốn tối thiểu (biên thấp)'], ['roundStep', 'Làm tròn giá mới (1, 10, 100 đ)'],
      ['commissionMinAmount', 'Giá trị deal công ty cần xét HH thu mua (đ)'],
      ['staleDays', 'Số ngày coi là treo lâu'], ['commentLimit', 'Số bình luận tải mỗi khách'],
      ['defaultDealPercent', '% deal mặc định (khi khách/SP chưa có % deal)'],
      ['floorDealPercent', 'Mốc % deal sàn (giá mốc = NVL ÷ (1 − mốc); lợi nhuận tính từ mốc này)'],
      ['scanStep', 'Mỗi lần "+100": quét thêm bao nhiêu báo giá']
    ];
    container.innerHTML = fields.map(function (f) {
      return '<label>' + esc(f[1]) + '<input type="number" data-key="' + f[0] + '" value="' + settings[f[0]] + '" /></label>';
    }).join('') +
      '<label class="' + PREFIX + '-chk"><input type="checkbox" id="' + PREFIX + '-use-stock-ip"' + (settings.useStockImportPrice ? ' checked' : '') + ' /> Dùng giá nhập của hàng tồn kho đồng bộ từ PM bán hàng (Nhanh.vn) — mặc định tắt vì không chính xác</label>' +
      '<button class="' + PREFIX + '-btn ' + PREFIX + '-primary" id="' + PREFIX + '-save">Lưu & phân tích lại</button>';
    document.getElementById(PREFIX + '-save').onclick = function () {
      container.querySelectorAll('input[data-key]').forEach(function (i) { settings[i.getAttribute('data-key')] = +i.value; });
      settings.useStockImportPrice = !!document.getElementById(PREFIX + '-use-stock-ip').checked;
      saveSettings(); container.style.display = 'none'; runListAnalysis(true);
    };
  }

  function setProgress(text) {
    var p = document.getElementById(PREFIX + '-progress');
    if (p) p.textContent = text || '';
  }

  function runListAnalysis(force) {
    if (listState.loading) return;
    if (!ensureListBar()) return;
    listState.loading = true;
    if (force) { commentCache = {}; bidCache = {}; listState.analyses = {}; listState.list = []; listState.scan.nextPage = {}; listState.scan.totals = {}; listState.scan.list = []; listState.scan.active = false; }
    var tab = activeTabLabel();
    var statuses = TAB_TO_STATUSES[tab] || TAB_TO_STATUSES['Tất cả'];
    var tn = document.getElementById(PREFIX + '-tabname'); if (tn) tn.textContent = '· ' + tab;
    var ids = visibleIds();
    ids.forEach(function (i) { listState.attempted[i] = true; });
    setProgress('Đang tải danh sách…');
    var want = {}; ids.forEach(function (i) { want[i] = true; });
    var found = {};
    function loadPage(page) {
      return fetchOpportunities(statuses, page, 100).then(function (d) {
        var ops = (d && d.opportunities) || [];
        ops.forEach(function (o) { if (!ids.length || want[o.id]) found[o.id] = o; });
        var missing = ids.filter(function (i) { return !found[i]; });
        if (ids.length && missing.length && ops.length === 100 && page < 3) return loadPage(page + 1);
      });
    }
    loadPage(1).then(function () {
      var ops = ids.map(function (i) { return found[i]; }).filter(function (o) { return o && !listState.analyses[o.id]; });
      var done = 0;
      return mapLimit(ops, 4, function (o) {
        return enrich(o).then(function (a) {
          listState.analyses[a.id] = a;
          done++; setProgress('Đang phân tích ' + done + '/' + ops.length + '…');
          if (done % 5 === 0) decorateRows();
          return a;
        });
      });
    }).then(function () {
      listState.list = Object.keys(listState.analyses).map(function (k) { return listState.analyses[k]; });
      setProgress('');
      renderBar();
      decorateRows();
    }).catch(function (e) {
      setProgress('Lỗi: ' + e.message);
    }).then(function () { listState.loading = false; });
  }

  function visibleAnalyses() {
    return visibleIds().map(function (i) { return listState.analyses[i]; }).filter(Boolean);
  }
  function allAnalyses() { return Object.keys(listState.analyses).map(function (k) { return listState.analyses[k]; }); }
  function scanNote() {
    var sc = listState.scan, parts = [];
    Object.keys(sc.totals).forEach(function (k) {
      var label = k === 'REJECT' ? 'Thất bại' : (k === TAB_TO_STATUSES['Tất cả'].slice().sort().join(',') ? 'Tất cả (đang mở)' : k.split(',').map(function (x) { return QUOTE_STATUS[x] || x; }).join('/'));
      var n = allAnalyses().filter(function (a) { return k.split(',').indexOf(a.quoteStatus) >= 0; }).length;
      parts.push(label + ': ' + n + '/' + sc.totals[k]);
    });
    return 'Đã quét ' + allAnalyses().length + ' deal' + (parts.length ? ' (' + parts.join(' · ') + ')' : '');
  }
  function scanNextBatch(statuses, full, label, stepOverride) {
    var sc = listState.scan, key = statuses.slice().sort().join(',');
    if (sc.nextPage[key] === -1) { notify('Đã quét hết các báo giá ' + label + '.', 'warn'); return; }
    var step = +stepOverride || +settings.scanStep || 100;
    var start = sc.nextPage[key] || 1;
    runScan({ statuses: statuses, days: 0, max: step, maxPages: Math.ceil(step / 100) + 1, startPage: start, full: full, append: true, label: label + ' +' + step });
  }
  function scopeList() { return listState.scan.active ? allAnalyses() : visibleAnalyses(); }

  function renderScanOpts(container) {
    var cur = TAB_TO_STATUSES[activeTabLabel()] || [];
    var keys = Object.keys(QUOTE_STATUS);
    container.innerHTML =
      '<div class="' + PREFIX + '-h">Quét toàn bộ deal (không chỉ trang đang hiện)</div>' +
      '<div class="' + PREFIX + '-scan-row"><span class="' + PREFIX + '-muted">Tình trạng BG:</span>' +
      keys.map(function (k) { return '<label><input type="checkbox" data-scan-status="' + k + '"' + (cur.indexOf(k) >= 0 ? ' checked' : '') + ' /> ' + esc(QUOTE_STATUS[k]) + '</label>'; }).join('') +
      '<button class="' + PREFIX + '-btn" data-scan-pick="open">Đang mở</button><button class="' + PREFIX + '-btn" data-scan-pick="fail">+ Thất bại</button><button class="' + PREFIX + '-btn" data-scan-pick="all">Tất cả</button></div>' +
      '<div class="' + PREFIX + '-scan-row">' +
      '<label>Tạo trong <input type="number" id="' + PREFIX + '-scan-days" value="60" style="width:70px" /> ngày gần đây (0 = không giới hạn)</label>' +
      '<label>Tối đa <input type="number" id="' + PREFIX + '-scan-max" value="500" style="width:80px" /> deal</label>' +
      '<label><input type="checkbox" id="' + PREFIX + '-scan-full" checked /> Tải cả bình luận & số lần in (chậm hơn, cần cho "chờ sếp trả lời")</label>' +
      '<span class="' + PREFIX + '-grow"></span>' +
      '<button class="' + PREFIX + '-btn ' + PREFIX + '-primary" id="' + PREFIX + '-scan-start">Bắt đầu quét</button>' +
      '<button class="' + PREFIX + '-btn" id="' + PREFIX + '-scan-stop">Dừng</button>' +
      '<button class="' + PREFIX + '-btn" id="' + PREFIX + '-scan-clear">Xóa kết quả</button>' +
      '</div>' +
      '<div class="' + PREFIX + '-muted">Mặc định chỉ phân tích 100 báo giá gần nhất (trang đang hiện). Nút "+100 báo giá" / "+500 báo giá" quét thêm 100 hoặc 500 BG kế tiếp của tab đang xem, "+100 Thất bại" quét nhanh thêm 100 deal thất bại gần nhất. Mục này dùng khi cần quét theo tình trạng / số ngày tùy chọn.</div>';
    container.querySelectorAll('[data-scan-pick]').forEach(function (b) {
      b.onclick = function () {
        var mode = b.getAttribute('data-scan-pick');
        container.querySelectorAll('[data-scan-status]').forEach(function (cb) {
          var k = cb.getAttribute('data-scan-status');
          if (mode === 'all') cb.checked = true;
          else if (mode === 'open') cb.checked = !CLOSED[k];
          else if (mode === 'fail' && k === 'REJECT') cb.checked = true;
        });
      };
    });
    container.querySelector('#' + PREFIX + '-scan-start').onclick = function () {
      var statuses = Array.prototype.filter.call(container.querySelectorAll('[data-scan-status]'), function (cb) { return cb.checked; }).map(function (cb) { return cb.getAttribute('data-scan-status'); });
      if (!statuses.length) { dialog({ title: 'Quét toàn bộ', message: 'Chọn ít nhất một tình trạng báo giá.', cancelText: null }); return; }
      runScan({ statuses: statuses, days: +document.getElementById(PREFIX + '-scan-days').value || 0, max: +document.getElementById(PREFIX + '-scan-max').value || 500, full: document.getElementById(PREFIX + '-scan-full').checked });
    };
    container.querySelector('#' + PREFIX + '-scan-stop').onclick = function () { listState.scan.stop = true; };
    container.querySelector('#' + PREFIX + '-scan-clear').onclick = function () { listState.scan.active = false; listState.scan.list = []; listState.scan.note = ''; listState.scan.nextPage = {}; listState.scan.totals = {}; renderBar(); decorateRows(); };
  }

  function enrichLight(o) {
    return Promise.all([fetchTaxPercent(), fetchBidsFor(o)]).then(function (r) {
      var po = null;
      try { po = DDBG_PO.compute(o, { taxPercent: r[0], bidLookup: r[1], useStockImportPrice: settings.useStockImportPrice, tapeRecalc: TAPE_RECALC }); } catch (e) { po = null; }
      var a = analyze(o, [], null, po);
      a.light = true;
      return a;
    });
  }

  function runScan(opts) {
    var sc = listState.scan;
    if (sc.running) { notify('Đang quét, vui lòng đợi hoặc bấm Dừng.', 'warn'); return; }
    sc.running = true; sc.stop = false; sc.active = true; sc.shown = 150;
    if (!opts.append) sc.list = [];
    var existing = {}; sc.list.forEach(function (a) { existing[a.id] = true; });
    var noteNew = (opts.label || opts.statuses.map(function (k) { return QUOTE_STATUS[k]; }).join(', ')) + (opts.days ? ' ' + opts.days + ' ngày' : '') + (opts.full ? '' : ' (nhanh)');
    sc.note = opts.append && sc.note ? sc.note + ' + ' + noteNew : 'Quét: ' + noteNew;
    var cutoff = opts.days ? Date.now() / 1000 - opts.days * 86400 : 0;
    var key = opts.statuses.slice().sort().join(',');
    var collected = [], seen = {}, page = opts.startPage || 1, pagesLoaded = 0, total = 0;
    var analyzed = listState.analyses;
    setProgress('Đang tải danh sách…');
    function loadPage() {
      if (sc.stop || collected.length >= opts.max || (opts.maxPages && pagesLoaded >= opts.maxPages)) return Promise.resolve();
      return fetchOpportunities(opts.statuses, page, 100).then(function (d) {
        var ops = (d && d.opportunities) || [];
        total = d && d.total || total;
        sc.totals[key] = total;
        ops.forEach(function (o) {
          if (seen[o.id] || existing[o.id] || analyzed[o.id]) return; seen[o.id] = true;
          if (cutoff && (+o.createdAt || 0) < cutoff) return;
          if (collected.length < opts.max) collected.push(o);
        });
        setProgress('Đã tải ' + Math.min(page * 100, total) + '/' + total + ' BG, chọn được ' + collected.length + '…');
        page++; pagesLoaded++;
        sc.nextPage[key] = page;
        if (ops.length < 100) { sc.nextPage[key] = -1; return; }
        return loadPage();
      });
    }
    loadPage().then(function () {
      var done = 0;
      return mapLimit(collected, 4, function (o) {
        if (sc.stop) return Promise.resolve(null);
        return (opts.full ? enrich(o) : enrichLight(o)).then(function (a) {
          listState.analyses[a.id] = a;
          done++;
          setProgress('Đang phân tích ' + done + '/' + collected.length + (sc.stop ? ' (đang dừng)' : '') + '…');
          if (done % 10 === 0) { renderBar(); }
          return a;
        }).catch(function () { done++; return null; });
      });
    }).then(function () {
      setProgress(sc.stop ? 'Đã dừng. ' : '');
      sc.list = allAnalyses();
      sc.note = scanNote();
      renderBar(); decorateRows();
      notify('Đã quét thêm ' + collected.length + ' deal, tổng ' + sc.list.length + ' deal.');
    }).catch(function (e) {
      setProgress('Lỗi quét: ' + e.message);
    }).then(function () { sc.running = false; });
  }

  function renderScan() {
    var box = document.getElementById(PREFIX + '-scan');
    if (!box) return;
    var sc = listState.scan;
    if (!sc.active) { setHtml(box, ''); return; }
    var list = allAnalyses().filter(currentFilter());
    var sort = sc.sort;
    list.sort(function (a, b) {
      if (sort === 'profit') return b.prod.profitBase - a.prod.profitBase;
      if (sort === 'amount') return b.amount - a.amount;
      if (sort === 'deal') return (a.prod.dealPctPO === null ? 999 : a.prod.dealPctPO) - (b.prod.dealPctPO === null ? 999 : b.prod.dealPctPO);
      if (sort === 'date') return (b.o.createdAt || 0) - (a.o.createdAt || 0);
      return b.score - a.score || b.amount - a.amount;
    });
    var shown = list.slice(0, sc.shown);
    var h = '<div class="' + PREFIX + '-scan-head"><b>Kết quả quét</b> <span class="' + PREFIX + '-muted">' + esc(sc.note) + ' · đang hiện ' + shown.length + '/' + list.length + ' (sau lọc)</span>' +
      '<span class="' + PREFIX + '-grow"></span>' +
      '<label>Sắp xếp <select id="' + PREFIX + '-scan-sort">' +
      [['score', 'Ưu tiên xử lý'], ['profit', 'Lợi nhuận'], ['amount', 'Giá trị'], ['deal', '% deal thấp → cao'], ['date', 'Mới nhất']].map(function (o) { return '<option value="' + o[0] + '"' + (sort === o[0] ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') +
      '</select></label>' +
      '<button class="' + PREFIX + '-btn" data-scan-back>Về trang hiện tại</button></div>' +
      '<table class="' + PREFIX + '-table"><thead><tr><th>Mã BG</th><th>Ngày</th><th>Tên cơ hội / Khách</th><th>NV</th><th>Loại</th><th>Tình trạng</th><th class="r">Giá trị</th><th class="r">LN (bán − ' + floorLabel() + ')</th><th class="r">% deal</th><th>Cảnh báo</th><th></th></tr></thead><tbody>';
    shown.forEach(function (a) {
      var flags = a.flags.filter(function (f) { return f.level === 'danger' || f.level === 'warn'; }).slice(0, 3);
      var open = !!listState.expanded[a.id];
      h += '<tr class="' + (a.actionable ? PREFIX + '-row-action' : '') + '">' +
        '<td><a class="' + PREFIX + '-code" href="/bao-gia/update/' + a.id + '" target="_blank">' + esc(a.code) + '</a></td>' +
        '<td>' + dateStr(a.o.createdAt) + '</td>' +
        '<td><div>' + esc(a.name) + '</div><div class="' + PREFIX + '-muted">' + esc(a.customer) + '</div></td>' +
        '<td>' + esc(a.staff) + '</td>' +
        '<td><span class="' + PREFIX + '-rowchip ' + PREFIX + '-cat">' + esc(categoryLabel(a.mainCategory)) + (a.categories.length > 1 ? ' +' + (a.categories.length - 1) : '') + '</span></td>' +
        '<td><span class="' + PREFIX + '-status">' + esc(a.quoteStatusLabel) + '</span></td>' +
        '<td class="r">' + fmt(a.amount) + '</td>' +
        (a.isOffset ? '<td class="r" colspan="2">' + (a.tuantuLinks[0] ? '<a href="' + esc(a.tuantuLinks[0]) + '" target="_blank">tuantu ↗</a>' : 'offset') + '</td>' :
        '<td class="r ' + (a.prod.profitBase < 0 ? PREFIX + '-red' : '') + '">' + fmt(a.prod.profitBase) + '</td>' +
        '<td class="r ' + (a.prod.dealPctPO !== null && a.prod.dealPctPO < a.targetDeal ? PREFIX + '-red' : '') + '">' + pct(a.prod.dealPctPO, 0) + '<div class="' + PREFIX + '-muted">mt ' + a.targetDeal + '%</div></td>') +
        '<td>' + flags.map(function (f) { return '<span class="' + PREFIX + '-rowchip ' + PREFIX + '-' + f.level + '" title="' + esc(f.detail) + '">' + esc(f.text) + '</span> '; }).join('') + (a.ready ? '<span class="' + PREFIX + '-rowchip ' + PREFIX + '-ok">Đủ ĐK duyệt</span>' : '') + (a.light ? ' <span class="' + PREFIX + '-muted">(quét nhanh)</span>' : '') + '</td>' +
        '<td><span class="' + PREFIX + '-rowchip ' + PREFIX + '-rowchip-more" data-scan-toggle="' + a.id + '">' + (open ? '▲ Đóng' : '▼ Chi tiết') + '</span></td></tr>';
      if (open) h += '<tr class="' + PREFIX + '-rowdetail"><td colspan="11"><div class="' + PREFIX + '-inline">' + renderCardBody(a) + '</div></td></tr>';
    });
    h += '</tbody></table>' + (list.length > shown.length ? '<div style="text-align:center;padding:6px"><button class="' + PREFIX + '-btn" data-scan-more>Hiện thêm 150</button></div>' : '');
    setHtml(box, h);
  }
  function currentFilter() {
    var pf = PILL_FILTERS.find(function (x) { return x.key === listState.pill; });
    return function (a) {
      if (listState.cat && a.categories.indexOf(listState.cat) < 0) return false;
      if (pf && !pf.fn(a)) return false;
      if (onlyActionable() && !a.actionable) return false;
      return true;
    };
  }
  function setHtml(node, html) {
    if (node.__ddbgHtml === html) return;
    node.__ddbgHtml = html;
    node.innerHTML = html;
  }
  function renderBar() {
    var sum = document.getElementById(PREFIX + '-summary');
    if (!sum) return;
    var onlyCb = document.getElementById(PREFIX + '-only');   // đồng bộ ô tick với tab đang mở
    if (onlyCb && onlyCb.checked !== onlyActionable()) onlyCb.checked = onlyActionable();
    var all = scopeList();
    var shown = all.filter(currentFilter());
    var catRow = '<span class="' + PREFIX + '-muted">Loại SP:</span>' +
      pill('Tất cả loại', all.length, 'cat', 'cat:', !listState.cat) +
      CATEGORIES.map(function (c) {
        var n = all.filter(function (a) { return a.categories.indexOf(c.key) >= 0; }).length;
        if (!n) return '';
        return pill(c.label, n, 'cat', 'cat:' + c.key, listState.cat === c.key);
      }).join('');
    var inCat = all.filter(function (a) { return !listState.cat || a.categories.indexOf(listState.cat) >= 0; });
    var html = '<div class="' + PREFIX + '-pillrow">' + catRow + '</div><div class="' + PREFIX + '-pillrow"><span class="' + PREFIX + '-muted">Tình trạng:</span>' + PILL_FILTERS.map(function (pf) {
      var n = inCat.filter(pf.fn).length;
      if (!n && pf.key !== 'all') return '';
      return pill(pf.label, n, pf.level, pf.key, listState.pill === pf.key || (pf.key === 'all' && !listState.pill));
    }).join('') + '</div><div class="' + PREFIX + '-pillrow">' +
      pill('Đang hiện', shown.length) +
      pill('Tổng bán', fmt(shown.reduce(function (s, a) { return s + a.prod.totalSale; }, 0)) + ' đ') +
      pill('Tổng NVL', fmt(shown.reduce(function (s, a) { return s + a.prod.totalNvl; }, 0)) + ' đ') +
      pill('Tổng giá ' + floorLabel(), fmt(shown.reduce(function (s, a) { return s + a.prod.totalBase; }, 0)) + ' đ') +
      pill('Tổng LN (bán − ' + floorLabel() + ')', fmt(shown.reduce(function (s, a) { return s + a.prod.profitBase; }, 0)) + ' đ') + '</div>';
    setHtml(sum, html);
    var mini = document.getElementById(PREFIX + '-mini');
    if (mini) {
      var act = inCat.filter(function (a) { return a.actionable; }).length;
      var pfA = PILL_FILTERS.find(function (x) { return x.key === listState.pill; });
      var filt = [];
      if (onlyActionable()) filt.push('Chỉ deal cần xử lý');
      if (listState.cat) filt.push(categoryLabel(listState.cat));
      if (pfA && pfA.key !== 'all') filt.push(pfA.label);
      var mh = '<b>' + all.length + '</b> deal · <b>' + act + '</b> cần xử lý · đang hiện <b>' + shown.length + '</b>' +
        ' · LN <b>' + fmt(shown.reduce(function (s, a) { return s + a.prod.profitBase; }, 0)) + '</b> đ' +
        (filt.length ? ' · lọc: ' + esc(filt.join(' · ')) : '') +
        ' <span class="' + PREFIX + '-muted">(bấm để mở rộng)</span>';
      setHtml(mini, mh);
    }
    renderScan();
  }
  function pill(label, value, level, key, active) {
    return '<span class="' + PREFIX + '-pill ' + (level ? PREFIX + '-' + level : '') + (key ? ' ' + PREFIX + '-pill-btn' : '') + (active ? ' ' + PREFIX + '-pill-active' : '') + '"' +
      (key ? ' data-pill="' + key + '" title="Bấm để lọc"' : '') + '><b>' + value + '</b> ' + esc(label) + '</span>';
  }

  function decorateRows() {
    var filter = currentFilter();
    listLinks().forEach(function (a) {
      var m = a.getAttribute('href').match(/update\/(\d+)/);
      if (!m) return;
      var id = +m[1];
      var an = listState.analyses[id];
      var tr = a.closest('tr');
      var cell = a.closest('td');
      if (!tr || !cell) return;
      var detailRow = tr.nextElementSibling && tr.nextElementSibling.classList.contains(PREFIX + '-rowdetail') ? tr.nextElementSibling : null;
      if (!an) {
        tr.style.display = '';
        if (detailRow) detailRow.remove();
        return;
      }
      var show = filter(an);
      tr.style.display = show ? '' : 'none';
      tr.classList.toggle(PREFIX + '-row-action', an.actionable);
      tr.classList.toggle(PREFIX + '-row-ready', an.ready);
      var old = cell.querySelector('.' + PREFIX + '-rowflags');
      var flags = an.flags.filter(function (f) { return f.level !== 'info' && f.level !== 'ok'; }).slice(0, 5);
      var html = '<span class="' + PREFIX + '-rowchip ' + PREFIX + '-cat" title="' + esc(an.categories.map(categoryLabel).join(', ')) + '">' + esc(categoryLabel(an.mainCategory)) + (an.categories.length > 1 ? ' +' + (an.categories.length - 1) : '') + '</span>' +
        (an.isOffset ? (an.tuantuLinks[0] ? '<a class="' + PREFIX + '-rowchip ' + PREFIX + '-info" href="' + esc(an.tuantuLinks[0]) + '" target="_blank" title="Mở báo giá bên Tuấn Tú">tuantu ↗</a>' : '') :
        '<span class="' + PREFIX + '-rowchip ' + PREFIX + '-rowchip-ln ' + (an.prod.dealPctPO !== null && an.prod.dealPctPO < an.targetDeal ? PREFIX + '-danger' : PREFIX + '-ok') + '" title="NVL theo PO ' + fmt(an.prod.totalNvl) + ' đ · LN (bán − ' + floorLabel() + ') ' + fmt(an.prod.profitBase) + ' đ · mục tiêu deal ' + an.targetDeal + '%">Deal ' + pct(an.prod.dealPctPO, 0) + ' · LN ' + fmt(an.prod.profitBase / 1e6) + 'tr</span>') +
        flags.map(function (f) { return '<span class="' + PREFIX + '-rowchip ' + PREFIX + '-' + f.level + '" title="' + esc(f.detail) + '">' + esc(f.text) + '</span>'; }).join('') +
        (an.ready ? '<span class="' + PREFIX + '-rowchip ' + PREFIX + '-ok">Đủ ĐK duyệt</span>' : '') +
        '<span class="' + PREFIX + '-rowchip ' + PREFIX + '-rowchip-more">' + (listState.expanded[id] ? '▲ Đóng' : '▼ Chi tiết') + '</span>';
      if (!old) { old = el('div', PREFIX + '-rowflags', html); old.setAttribute('data-id', id); cell.appendChild(old); }
      else setHtml(old, html);
      if (listState.expanded[id] && show) {
        if (!detailRow) {
          detailRow = document.createElement('tr');
          detailRow.className = PREFIX + '-rowdetail';
          detailRow.setAttribute('data-id', id);
          var td = document.createElement('td');
          td.colSpan = tr.children.length;
          detailRow.appendChild(td);
          tr.parentElement.insertBefore(detailRow, tr.nextSibling);
        }
        var td2 = detailRow.firstElementChild;
        if (td2.getAttribute('data-rendered') !== String(an.o.updatedAt)) {
          td2.innerHTML = '<div class="' + PREFIX + '-inline">' + renderCardBody(a = an) + '</div>';
          td2.setAttribute('data-rendered', String(an.o.updatedAt));
        }
        detailRow.style.display = '';
      } else if (detailRow) {
        detailRow.remove();
      }
    });
    renderHiddenNotice();
  }
  function renderHiddenNotice() {
    var table = findListTable();
    var tbody = table && table.querySelector('tbody');
    var old = document.querySelectorAll('.' + PREFIX + '-hiddenrow');
    for (var i = 0; i < old.length; i++) old[i].remove();
    if (!tbody) return;
    var rows = tbody.querySelectorAll('tr.ant-table-row');
    var hidden = 0, cols = 1;
    for (var j = 0; j < rows.length; j++) { cols = Math.max(cols, rows[j].children.length); if (rows[j].style.display === 'none') hidden++; }
    if (!hidden) return;
    var why = [];
    if (onlyActionable()) why.push('Chỉ deal cần xử lý');
    if (listState.cat) why.push(categoryLabel(listState.cat));
    var pf = PILL_FILTERS.find(function (x) { return x.key === listState.pill; });
    if (pf && pf.key !== 'all') why.push(pf.label);
    var tr = document.createElement('tr');
    tr.className = PREFIX + '-hiddenrow';
    var td = document.createElement('td');
    td.colSpan = cols;
    td.innerHTML = '<span class="' + PREFIX + '-muted">Extension đang ẩn <b>' + hidden + '</b> báo giá do bộ lọc' + (why.length ? ': ' + esc(why.join(' · ')) : '') + '.</span> <button class="' + PREFIX + '-btn" data-ddbg-showall="1">Hiện tất cả</button>';
    tbody.appendChild(tr);
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-ddbg-showall]');
    if (!b) return;
    e.preventDefault(); e.stopPropagation();
    setOnlyActionable(false);
    listState.pill = ''; listState.cat = '';
    var cb = document.getElementById(PREFIX + '-only'); if (cb) cb.checked = false;
    renderBar(); decorateRows();
  }, true);
  document.addEventListener('click', function (e) {
    var rf = e.target.closest('.' + PREFIX + '-rowflags');
    if (!rf) return;
    e.preventDefault(); e.stopPropagation();
    var id = +rf.getAttribute('data-id');
    listState.expanded[id] = !listState.expanded[id];
    decorateRows();
  }, true);

  var detailState = { id: null, loading: false, expanded: false };

  function findBgHeader() {
    var hs = document.querySelectorAll('.ant-page-header');
    for (var i = 0; i < hs.length; i++) {
      if (hs[i].closest('#' + PREFIX + '-detail')) continue;
      var t = hs[i].querySelector('.ant-page-header-heading-title');
      if (/(^|\s)#(BG)?\d+/.test(((t || hs[i]).textContent || '').trim())) return hs[i];
    }
    return null;
  }
  function placeDetailPanel(panel) {
    var h = findBgHeader();
    if (h && h.parentElement) {
      if (panel.nextElementSibling !== h) h.parentElement.insertBefore(panel, h);
      return true;
    }
    return false;
  }
  function findDetailAnchor() {
    var main = document.querySelector('main') || document.body;
    var nodes = main.querySelectorAll('h1,h2,h3,div,span');
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (n.closest('#' + PREFIX + '-detail')) continue;
      if (n.children.length <= 3 && /^#(BG)?\d+/.test(n.textContent.trim()) && !n.querySelector('table')) {
        var row = n;
        for (var k = 0; k < 12 && row.parentElement && row.parentElement !== main; k++) {
          if (row.parentElement.textContent.indexOf('Thông tin chung') >= 0) return row;
          row = row.parentElement;
        }
        return n.parentElement || n;
      }
    }
    var all = main.querySelectorAll('div,h1,h2,h3,span,label');
    for (var j = 0; j < all.length; j++) {
      if (all[j].children.length === 0 && all[j].textContent.trim() === 'Thông tin chung') {
        var blk = all[j];
        for (var k2 = 0; k2 < 4 && blk.parentElement && blk.parentElement !== main; k2++) blk = blk.parentElement;
        return { before: blk };
      }
    }
    return null;
  }

  var priceTool = { mode: 'dealPct', value: 25, rows: {} }; // rows[id] = { checked, own }

  function roundStep(v) {
    var st = +settings.roundStep || 1;
    return Math.round(v / st) * st;
  }
  function computeNewPrice(r, mode, value) {
    if (value === '' || value === null || isNaN(+value)) return null;
    var v = +value;
    if (mode === 'dealPct') {
      if (!r.nvlUnit || v >= 100) return null;
      if (r.isTapePrint) return roundStep(Math.ceil(r.nvlUnit * (1 + v / 100)));   // băng keo in: % lợi nhuận trên giá vốn
      return roundStep(Math.ceil(r.nvlUnit / (1 - v / 100)));
    }
    if (mode === 'cust') {
      var cp = custPriceFor(r);
      if (!(cp > 0)) return null;
      var np = Math.round(cp * (1 - v / 100));
      if (r.sale > 0 && np >= r.sale) return null;
      return np;
    }
    if (mode === 'pct') return roundStep(r.sale * (1 + v / 100));
    if (mode === 'amount') return roundStep(r.sale + v);
    return null;
  }
  function custModeNote(a) {
    var st = ocrState, P = PREFIX;
    var have = a.prod.rows.filter(function (r) { return custPriceFor(r) > 0; }).length;
    var txt = st.forId === a.id && st.running ? 'Đang đọc ảnh bảng giá khách (OCR offline)… ' + esc(st.progress || '')
      : !(st.forId === a.id && st.results) ? 'Chưa có giá khách: bấm "Mở rộng ▼" → "So sánh giá khách" → "Đọc ảnh & so sánh" (hoặc dán ảnh).'
      : 'Giá khách đọc từ ảnh: ghép được ' + have + '/' + a.prod.rows.length + ' SP (theo đúng mức số lượng). Kiểm tra / sửa ở mục "So sánh giá khách" (Mở rộng ▼).';
    return '<div class="' + P + '-muted" style="margin:4px 0">' + txt + '</div>';
  }
  function priceToolPreview(a) {
    var out = [];
    a.prod.rows.forEach(function (r) {
      var st = priceTool.rows[r.id] || (priceTool.rows[r.id] = { checked: true, own: '' });
      var val = st.own !== '' && st.own !== undefined ? st.own : priceTool.value;
      var np = st.checked ? computeNewPrice(r, priceTool.mode, val) : null;
      out.push({ r: r, st: st, newPrice: np });
    });
    return out;
  }
  function renderPriceTool(a) {
    var tapeOnly = !!(a.prod && a.prod.tapeOnly), mixed = !tapeOnly && !!(a.prod && a.prod.tapeCount);
    var cc = a.cm && a.cm.competitorCut;
    var modeOpts = [['cust', 'Theo giá khách/đối thủ (ảnh trong bình luận) − % (không tăng giá)' + (cc ? ' · sếp chốt ' + (cc.pct ? '−' + cc.pct + '%' : 'bằng giá đối thủ') : '')], ['dealPct', tapeOnly ? '% lợi nhuận trên giá vốn (giá = vốn × (1 + %), như Set chiết giá)' : '% deal từ NVL (giá = NVL ÷ (1 − %))' + (mixed ? '; băng keo: vốn × (1 + %)' : '')], ['pct', 'Tăng/giảm % trên giá bán hiện tại'], ['amount', 'Tăng/giảm số đồng trên giá bán hiện tại']];
    var baseLbl = tapeOnly ? 'Giá vốn' : 'Giá ' + floorLabel();
    var lnLbl = tapeOnly ? 'bán − vốn' : 'bán − ' + floorLabel();
    var pctLbl = tapeOnly ? '% LN/vốn mới' : '% deal mới';
    var prev = priceToolPreview(a);
    var totNew = 0, totOld = 0, totNvl = 0, nAff = 0, totNewCosted = 0;   // LN mới chỉ trên SP có giá vốn
    prev.forEach(function (x) {
      var price = x.newPrice !== null ? x.newPrice : x.r.sale;
      totNew += price * x.r.qty; totOld += x.r.sale * x.r.qty; totNvl += x.r.baseUnit * x.r.qty;
      if (x.r.nvlUnit > 0) totNewCosted += price * x.r.qty;
      if (x.newPrice !== null && x.newPrice !== x.r.sale) nAff++;
    });
    var h = '<div class="' + PREFIX + '-pt">' +
      '<div class="' + PREFIX + '-pt-bar">' +
      '<b>Chỉnh giá</b>' +
      '<select id="' + PREFIX + '-pt-mode">' + modeOpts.map(function (m) { return '<option value="' + m[0] + '"' + (priceTool.mode === m[0] ? ' selected' : '') + '>' + m[1] + '</option>'; }).join('') + '</select>' +
      '<input id="' + PREFIX + '-pt-value" type="number" step="any" value="' + esc(priceTool.value) + '" style="width:110px" /> ' +
      '<span class="' + PREFIX + '-muted">' + (priceTool.mode === 'dealPct' ? '%' : priceTool.mode === 'cust' ? '% thấp hơn giá khách' : (priceTool.mode === 'pct' ? '% (âm = giảm)' : 'đ (âm = giảm)')) + '</span>' +
      '<button class="' + PREFIX + '-btn" id="' + PREFIX + '-pt-all">Chọn tất cả</button>' +
      '<button class="' + PREFIX + '-btn" id="' + PREFIX + '-pt-none">Bỏ chọn</button>' +
      '<span class="' + PREFIX + '-grow"></span>' +
      '<span class="' + PREFIX + '-muted">Mới: <b>' + fmt(totNew) + '</b> đ (cũ ' + fmt(totOld) + ') · LN mới (' + lnLbl + ') <b>' + fmt(totNewCosted - totNvl) + '</b> đ · ' + nAff + ' SP thay đổi</span>' +
      '<button class="' + PREFIX + '-btn ' + PREFIX + '-primary" id="' + PREFIX + '-pt-apply">Ghi vào bảng giá</button>' +
      '</div>' +
      '<table class="' + PREFIX + '-table"><thead><tr><th></th><th>#</th><th>Sản phẩm</th><th class="r">SL</th><th class="r">' + (tapeOnly ? 'Giá vốn/cuộn' : 'NVL/SP') + '</th><th class="r">' + baseLbl + '</th><th class="r">Giá bán hiện tại</th><th class="r">Giá trị riêng (' + (priceTool.mode === 'amount' ? 'đ' : '%') + ')</th><th class="r">Giá mới</th><th class="r">' + pctLbl + '</th><th class="r">LN dòng mới (' + lnLbl + ')</th></tr></thead><tbody>';
    prev.forEach(function (x) {
      var r = x.r, np = x.newPrice;
      var dealNew = (np && r.nvlUnit) ? (r.isTapePrint ? (np - r.nvlUnit) / r.nvlUnit * 100 : (np - r.nvlUnit) / np * 100) : null; // băng keo: % LN trên vốn
      h += '<tr><td><input type="checkbox" data-pt-check="' + r.id + '"' + (x.st.checked ? ' checked' : '') + ' /></td><td>' + r.idx + '</td><td class="' + PREFIX + '-name">' + esc(r.name) + '</td>' +
        '<td class="r">' + fmt(r.qty) + '</td><td class="r">' + fmt(r.nvlUnit) + '</td><td class="r">' + (r.baseUnit ? fmt(r.baseUnit) : '-') + '</td><td class="r">' + fmt(r.sale) + '</td>' +
        '<td class="r"><input type="number" step="any" data-pt-own="' + r.id + '" value="' + esc(x.st.own) + '" placeholder="chung ' + esc(priceTool.value) + (priceTool.mode === 'amount' ? 'đ' : '%') + '" style="width:96px" /></td>' +
        '<td class="r ' + PREFIX + '-bold ' + (np !== null && np !== r.sale ? (np > r.sale ? PREFIX + '-green' : PREFIX + '-red') : '') + '">' + (np !== null ? fmt(np) : '-') +
          (priceTool.mode === 'cust' ? '<div class="' + PREFIX + '-muted" style="font-weight:normal">' + (custPriceFor(r) ? 'khách ' + fmt(custPriceFor(r)) + (np === null ? ' · BG đã thấp hơn' : '') : 'chưa có giá khách') + '</div>' : '') + '</td>' +
        '<td class="r">' + pct(dealNew, 1) + '</td><td class="r ' + (np !== null && np < r.baseUnit ? PREFIX + '-red' : '') + '">' + (np !== null ? fmt((np - r.baseUnit) * r.qty) : '-') + '</td></tr>';
    });
    h += '</tbody></table>' + (priceTool.mode === 'cust' ? custModeNote(a) : '') + '<div class="' + PREFIX + '-muted">Giá mới được điền vào cột "Giá thực bán" trên bảng hàng hóa của hệ thống. Kiểm tra lại rồi bấm nút <b>Cập nhật</b> của trang để lưu.</div></div>';
    return h;
  }
  function previewAnalysis(a) {
    var prev = priceToolPreview(a).filter(function (x) { return x.newPrice !== null && x.newPrice !== x.r.sale; });
    if (!prev.length) return null;
    var byId = {}; prev.forEach(function (x) { byId[x.r.id] = x; });
    var o2 = Object.assign({}, a.o, {
      opportunityProducts: (a.o.opportunityProducts || []).map(function (p) {
        var x = byId[p.id]; if (!x) return p;
        var dp = dealPercentFor(x.r, x.newPrice);
        return Object.assign({}, p, { price: x.newPrice, dealValue: x.newPrice, dealPercent: dp === null ? p.dealPercent : dp });
      })
    });
    try { var a2 = analyze(o2, a.comments || [], a.printCount, a.po); a2.previewCount = prev.length; return a2; } catch (e) { return null; }
  }
  function updatePreviewSections(a) {
    var root = document.getElementById(PREFIX + '-summary-root'), ptab = document.getElementById(PREFIX + '-prodtable-root');
    if (!root) return;
    var a2 = previewAnalysis(a);
    if (!a2) { root.classList.remove(PREFIX + '-preview'); root.innerHTML = renderSummary(a); if (ptab) { ptab.classList.remove(PREFIX + '-preview'); ptab.innerHTML = renderProductTable(a); } return; }
    if (ptab) { ptab.classList.add(PREFIX + '-preview'); ptab.innerHTML = renderProductTable(a2); }
    var p1 = a.prod, p2 = a2.prod;
    var d = function (v) { return (v > 0 ? '+' : '') + fmt(v); };
    root.classList.add(PREFIX + '-preview');
    root.innerHTML =
      '<div class="' + PREFIX + '-preview-bar"><b>Xem trước theo Chỉnh giá</b> (' + a2.previewCount + ' SP đổi giá, chưa ghi vào trang): ' +
      'LN (bán − mốc) <b>' + fmt(p2.profitBase) + '</b> đ <span class="' + PREFIX + '-muted">(cũ ' + fmt(p1.profitBase) + ', ' + d(p2.profitBase - p1.profitBase) + ')</span> · ' +
      'Tổng bán <b>' + fmt(p2.totalSale) + '</b> đ <span class="' + PREFIX + '-muted">(cũ ' + fmt(p1.totalSale) + ', ' + d(p2.totalSale - p1.totalSale) + ')</span> · ' +
      '% deal thực <b>' + pct(p2.dealPctPO, 1) + '</b> <span class="' + PREFIX + '-muted">(cũ ' + pct(p1.dealPctPO, 1) + ')</span> · ' +
      (a2.ready ? '<span class="' + PREFIX + '-green">đủ điều kiện duyệt</span>' : '<span class="' + PREFIX + '-orange">' + a2.flags.filter(function (f) { return f.level !== 'info'; }).length + ' cảnh báo còn lại</span>') +
      '</div>' + renderSummary(a2);
  }
  function ptRow(id) { return priceTool.rows[id] || (priceTool.rows[id] = { checked: true, own: '' }); }
  function bindPriceTool(a) {
    var root = document.getElementById(PREFIX + '-pt-root');
    if (!root) return;
    var rerender = function () {
      var ae = document.activeElement, key = null, selS = null, selE = null;
      if (ae && root.contains(ae)) {
        key = ae.id ? '#' + ae.id : (ae.getAttribute('data-pt-own') ? 'input[data-pt-own="' + ae.getAttribute('data-pt-own') + '"]' : null);
        try { selS = ae.selectionStart; selE = ae.selectionEnd; } catch (e) {}
      }
      root.innerHTML = renderPriceTool(a); bindPriceTool(a); updatePreviewSections(a);
      if (key) {
        var again = root.querySelector(key);
        if (again) { again.focus(); try { if (selS !== null && selS !== undefined) again.setSelectionRange(selS, selE); } catch (e) {} }
      }
    };
    document.getElementById(PREFIX + '-pt-mode').addEventListener('change', function (e) { priceTool.mode = e.target.value; rerender(); });
    document.getElementById(PREFIX + '-pt-value').addEventListener('input', debounce(function (e) { priceTool.value = e.target.value; rerender(); }, 400));
    document.getElementById(PREFIX + '-pt-all').onclick = function () { Object.keys(priceTool.rows).forEach(function (k) { priceTool.rows[k].checked = true; }); rerender(); };
    document.getElementById(PREFIX + '-pt-none').onclick = function () { Object.keys(priceTool.rows).forEach(function (k) { priceTool.rows[k].checked = false; }); rerender(); };
    root.querySelectorAll('input[data-pt-check]').forEach(function (cb) {
      cb.addEventListener('change', function () { ptRow(cb.getAttribute('data-pt-check')).checked = cb.checked; rerender(); });
    });
    root.querySelectorAll('input[data-pt-own]').forEach(function (inp) {
      inp.addEventListener('input', debounce(function () { ptRow(inp.getAttribute('data-pt-own')).own = inp.value; rerender(); }, 400));
    });
    document.getElementById(PREFIX + '-pt-apply').onclick = function () { applyPricesToPage(a); };
  }

  function findProductTable() {
    var tables = document.querySelectorAll('table');
    for (var i = 0; i < tables.length; i++) {
      var table = tables[i];
      if (table.closest('.' + PREFIX + '-detail') || table.closest('.' + PREFIX + '-rowdetail')) continue;
      var ths = Array.prototype.filter.call(table.querySelectorAll('thead th'), function (th) { return !th.classList.contains('ant-table-cell-scrollbar'); });
      var col = -1;
      for (var j = 0; j < ths.length; j++) if (ths[j].textContent.trim() === 'Giá thực bán') { col = j; break; }
      if (col < 0) continue;
      var container = table.closest('.ant-table') || table.parentElement;
      var rows = Array.prototype.slice.call(container.querySelectorAll('.ant-table-body tr.ant-table-row'));
      if (!rows.length) rows = Array.prototype.slice.call(container.querySelectorAll('tbody tr.ant-table-row'));
      if (!rows.length) rows = Array.prototype.filter.call(table.querySelectorAll('tbody tr'), function (tr) { return tr.children.length > col && !/ant-table-measure-row|ant-table-placeholder/.test(tr.className); });
      if (!rows.length) continue;
      return { table: table, col: col, rows: rows };
    }
    return null;
  }
  var bridgeReady = false;
  window.addEventListener('ddbg:bridgeReady', function () { bridgeReady = true; });
  function setDealViaBridge(items) {
    return new Promise(function (resolve) {
      var timer = setTimeout(function () { window.removeEventListener('ddbg:setDealDone', onDone); resolve({ ok: false, error: 'bridge timeout' }); }, 1500);
      function onDone(e) { clearTimeout(timer); window.removeEventListener('ddbg:setDealDone', onDone); try { resolve(JSON.parse(e.detail)); } catch (err) { resolve({ ok: false, error: 'parse' }); } }
      window.addEventListener('ddbg:setDealDone', onDone);
      window.dispatchEvent(new CustomEvent('ddbg:setDeal', { detail: JSON.stringify({ items: items }) }));
    });
  }
  function dealPercentFor(r, newPrice) {
    if (priceTool.mode === 'dealPct') { var st = priceTool.rows[r.id]; var v = st && st.own !== '' && st.own !== undefined ? +st.own : +priceTool.value; return Math.round(v); }
    if (!r.nvlUnit || !newPrice) return null;
    if (r.isTapePrint) return Math.round((newPrice - r.nvlUnit) / r.nvlUnit * 100);
    return Math.round((newPrice - r.nvlUnit) / newPrice * 100);
  }

  function setNativeValue(input, value) {
    var setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setter.call(input, String(value));
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }
  function applyPricesToPage(a) {
    var prev = priceToolPreview(a).filter(function (x) { return x.newPrice !== null && x.newPrice !== x.r.sale; });
    applyPriceList(prev, null);
  }
  function applyPriceList(prev, title) {
    if (!prev.length) { dialog({ title: 'Chỉnh giá', message: 'Không có sản phẩm nào thay đổi giá.', cancelText: null }); return; }
    var pt = findProductTable();
    if (!pt) { dialog({ title: 'Chỉnh giá', message: 'Không tìm thấy bảng hàng hóa trên trang.', cancelText: null }); return; }
    var listHtml = '<table class="' + PREFIX + '-table"><thead><tr><th>#</th><th>Sản phẩm</th><th class="r">Giá hiện tại</th><th class="r">Giá mới</th></tr></thead><tbody>' +
      prev.map(function (x) { var dp = dealPercentFor(x.r, x.newPrice); return '<tr><td>' + x.r.idx + '</td><td>' + esc(x.r.name.slice(0, 70)) + '</td><td class="r">' + fmt(x.r.sale) + '</td><td class="r ' + PREFIX + '-bold">' + fmt(x.newPrice) + (dp !== null ? ' <span class="' + PREFIX + '-muted">(deal ' + dp + '%)</span>' : '') + '</td></tr>'; }).join('') + '</tbody></table>' +
      '<div class="' + PREFIX + '-muted" style="margin-top:6px">Giống "Set deal cho BG" ở màn PO: ghi <b>Giá deal</b>, <b>% deal</b> và <b>Giá thực bán</b> vào bảng hàng hóa (chưa lưu). Sau đó bạn kiểm tra và bấm <b>Cập nhật</b> của trang để lưu.</div>';
    dialog({ title: title || ('Điền giá mới cho ' + prev.length + ' sản phẩm?'), html: listHtml, okText: 'Điền vào bảng', cancelText: 'Hủy' }).then(function (ok) {
      if (ok) doApplyPrices(prev, pt);
    });
  }
  function doApplyPrices(prev, pt) {
    var rows = pt.rows;
    var idx = 0, failed = [], dealWarn = '';
    var items = prev.map(function (x) { return { productId: x.r.id, idx: x.r.idx, dealValue: x.newPrice, dealPercent: dealPercentFor(x.r, x.newPrice) }; });
    setDealViaBridge(items).then(function (res) {
      if (!res || !res.ok) dealWarn = 'Không ghi được Giá deal/% deal (' + (res && res.error || 'bridge chưa sẵn sàng') + '), chỉ điền Giá thực bán.';
      else if (res.failed && res.failed.length) dealWarn = 'Không ghi được Giá deal cho SP: ' + res.failed.join(', ');
      next();
    });
    function next() {
      if (idx >= prev.length) {
        if (failed.length) dialog({ title: 'Chỉnh giá', message: 'Không điền được: ' + failed.join(', ') + (dealWarn ? '\n' + dealWarn : ''), cancelText: null });
        else {
          var msg = 'Đã ghi giá deal, % deal và giá bán cho ' + prev.length + ' SP. Kiểm tra bảng rồi bấm "Cập nhật" của trang để lưu.';
          setProgressDetail(msg + (dealWarn ? ' ' + dealWarn : ''));
          notify(dealWarn ? dealWarn : msg, dealWarn ? 'warn' : 'ok');
        }
        return;
      }
      var x = prev[idx++];
      var tr = rows.find(function (r) { var c = r.children[1]; return c && (c.innerText || '').trim().split(/\s/)[0] === String(x.r.idx); }) || rows[x.r.idx - 1];
      if (!tr) { failed.push(x.r.name.slice(0, 30) + ' (không thấy dòng)'); return next(); }
      var td = tr.children[pt.col];
      var cell = td && (td.querySelector('.editable') || td.querySelector('span'));
      if (!cell) { failed.push(x.r.name.slice(0, 30) + ' (không thấy ô giá)'); return next(); }
      cell.click();
      setTimeout(function () {
        var input = td.querySelector('input') || document.querySelector('input[data-id="price-' + (x.r.idx - 1) + '"]');
        if (!input) { failed.push(x.r.name.slice(0, 30) + ' (không mở được ô nhập)'); return next(); }
        input.focus();
        setNativeValue(input, x.newPrice);
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true }));
        input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true }));
        input.blur();
        document.body.click();
        setTimeout(next, 250);
      }, 250);
    }
  }
  function setProgressDetail(text) {
    var el2 = document.getElementById(PREFIX + '-detail-msg');
    if (el2) el2.textContent = text;
  }

  var ocrState = { forId: null, images: [], extra: [], results: null, running: false, progress: '', error: '', pick: {}, price: {}, showRaw: false };
  var SIZE_RE = /(\d+(?:[.,]\d+)?)\s*[xX×\*]\s*(\d+(?:[.,]\d+)?)\s*[xX×\*]\s*(\d+(?:[.,]\d+)?)/;
  var SIZE_COLS_RE = /(?:^|[\s|])(\d{1,3}[.,]\d{1,2})[.,]?(?!\d)[\s|]+(\d{1,3}[.,]\d{1,2})[.,]?(?!\d)[\s|]+(\d{1,3}[.,]\d{1,2})[.,]?(?!\d)/;
  function splitUrls(s) { return String(s || '').split(/[\s,;]+/).filter(function (u) { return /^https?:\/\//i.test(u); }); }
  function isImageUrl(u) { return /\.(png|jpe?g|webp|bmp|gif|tiff?)(\?.*)?$/i.test(u) || !/\.[a-z0-9]{2,5}(\?.*)?$/i.test(u); }
  function parseVnd(tok) {
    tok = String(tok).trim().replace(/[.,]$/, '');
    if (/^\d{1,3}([.,]\d{3})+$/.test(tok)) return +tok.replace(/[.,]/g, '');
    if (/^\d+$/.test(tok)) return +tok;
    var f = parseFloat(tok.replace(',', '.'));
    return isNaN(f) ? null : f;
  }
  function pickPrice(s) {
    var toks = String(s || '').match(/\d[\d.,]*/g) || [];
    var vals = toks.map(parseVnd).filter(function (v) { return v !== null && v >= 100 && v <= 50000000 && Math.round(v) === v; });
    return vals.length ? vals[vals.length - 1] : null;
  }
  function pickPrices(s) {
    var toks = String(s || '').match(/\d[\d.,]*/g) || [];
    return toks.map(parseVnd).filter(function (v) { return v !== null && v >= 100 && v <= 50000000 && Math.round(v) === v; });
  }
  function tierHeader(line) {
    if (line.dims) return null;
    var v = pickPrices(line.text);
    var best = [], cur = [];
    v.forEach(function (x) {
      if (x >= 100 && x % 100 === 0 && (!cur.length || x > cur[cur.length - 1])) cur.push(x);
      else cur = (x >= 100 && x % 100 === 0) ? [x] : [];
      if (cur.length > best.length) best = cur.slice();
    });
    return best.length >= 2 ? best : null;
  }
  function ocrPriceForQty(o, qty) {
    if (!o) return null;
    if (o.tiers && o.prices && o.prices.length >= o.tiers.length) {
      var tp = o.prices.slice(-o.tiers.length), idx = 0;
      for (var i = 0; i < o.tiers.length; i++) if (qty >= o.tiers[i]) idx = i;
      return tp[idx];
    }
    return o.price;
  }
  function parseOcrLine(l) {
    var text = l.text || '', digits = l.digits || '';
    var mt = SIZE_RE.exec(text) || SIZE_COLS_RE.exec(text), md = SIZE_RE.exec(digits) || SIZE_COLS_RE.exec(digits), m = mt || md;
    var dims = null, rest = text;
    if (m) { dims = [m[1], m[2], m[3]].map(function (x) { return parseFloat(String(x).replace(',', '.')); }); if (mt) rest = text.slice(mt.index + mt[0].length); }
    var price = pickPrice(rest), prices = pickPrices(rest);
    if (price === null && digits) { var dr = md ? digits.slice(md.index + md[0].length) : digits; price = pickPrice(dr); prices = pickPrices(dr); }
    return { text: text, digits: digits, dims: dims, price: price, prices: prices, y: l.y0, conf: l.conf };
  }
  function productDims(p) {
    var d = [+p.length || 0, +p.width || 0, +p.height || 0];
    if (d[0] > 0 && d[1] > 0 && d[2] > 0) return d;
    var m = SIZE_RE.exec(p.name || '');
    if (m) { d = [m[1], m[2], m[3]].map(function (x) { return parseFloat(String(x).replace(',', '.')); }); if (d.every(function (v) { return v > 0; })) return d; }
    return null;
  }
  function dimsMatch(a, b) {
    if (!a || !b) return false;
    var ok = function (p, q) { return Math.abs(p - q) <= Math.max(2, q * 0.02); };
    return [1, 10].some(function (k) {
      var x = a.map(function (v) { return v * k; });
      return (ok(x[0], b[0]) && ok(x[1], b[1]) && ok(x[2], b[2])) || (ok(x[0], b[1]) && ok(x[1], b[0]) && ok(x[2], b[2]));
    });
  }
  function dimsStr(d) { return d ? d.map(function (v) { return Math.round(v * 10) / 10; }).join('×') : ''; }
  function matchOcr(ocrRows, prodRows) {
    var used = {}, map = {};
    prodRows.forEach(function (r) {
      var i = ocrRows.findIndex(function (o, k) { return !used[k] && o.price !== null && o.dims && dimsMatch(o.dims, r.dims); });
      if (i >= 0) { used[i] = true; map[r.id] = { k: i, how: 'size' }; }
    });
    var restP = prodRows.filter(function (r) { return !map[r.id]; });
    var anyDims = ocrRows.some(function (o) { return o.dims && o.price !== null; });
    var restO = []; ocrRows.forEach(function (o, k) { if (!used[k] && o.price !== null && (!anyDims || o.dims)) restO.push(k); });
    for (var i = 0; i < Math.min(restP.length, restO.length); i++) map[restP[i].id] = { k: restO[i], how: 'order' };
    return map;
  }
  function evalCustomerPrice(r, price) {
    if (!(price > 0)) return null;
    var e = { diff: price - r.sale, pct: r.sale > 0 ? (price - r.sale) / r.sale * 100 : null, dealPct: null, level: 'info', text: '' };
    if (r.nvlUnit > 0) {
      e.dealPct = (r.isTapePrint || r.isTapeRoll) ? (price - r.nvlUnit) / r.nvlUnit * 100 : (price - r.nvlUnit) / price * 100;
      if (price < r.nvlUnit) { e.level = 'danger'; e.text = 'Dưới giá vốn/NVL'; }
      else if (price < r.baseUnit) { e.level = 'danger'; e.text = 'Dưới mốc ' + floorPct() + '%'; }
      else if (r.dealPO > 0 && price < r.dealPO) { e.level = 'warn'; e.text = 'Dưới deal ' + r.targetPct + '%'; }
      else { e.level = 'ok'; e.text = 'Đạt ≥ ' + (r.dealPO > 0 ? 'deal ' + r.targetPct + '%' : 'mốc ' + floorPct() + '%'); }
    } else { e.text = 'Chưa có giá vốn để đánh giá'; }
    return e;
  }
  function ocrImagesOf(a) {
    var seen = {}, out = [];
    (a.cm.msgs || []).forEach(function (m) {
      splitUrls(m.url).forEach(function (u) { if (!seen[u] && isImageUrl(u)) { seen[u] = 1; out.push({ url: u, by: m.by, at: m.at, selected: true }); } });
    });
    return out;
  }
  function ocrRows() {
    var rows = [];
    (ocrState.results || []).forEach(function (res, ri) {
      if (!res.ok) return;
      var tiers = null;
      (res.lines || []).forEach(function (l) {
        var p = parseOcrLine(l); p.img = ri; p.imgName = res.name || ('ảnh ' + (ri + 1));
        var th = tierHeader(p);
        if (th) { tiers = th; p.price = null; p.isTierHeader = true; }   // dòng tiêu đề không phải giá
        else if (tiers && p.dims && p.prices.length >= tiers.length) p.tiers = tiers;
        rows.push(p);
      });
    });
    return rows;
  }
  function renderOcr(a) {
    if (ocrState.forId !== a.id) { ocrState = { forId: a.id, images: ocrImagesOf(a), extra: [], results: null, running: false, progress: '', error: '', pick: {}, price: {}, showRaw: false }; }
    var st = ocrState, P = PREFIX;
    var imgs = st.images.map(function (im, i) {
      return '<label class="' + P + '-ocr-thumb"><input type="checkbox" data-ocr-img="' + i + '"' + (im.selected ? ' checked' : '') + ' /><img src="' + esc(im.url) + '" alt="" loading="lazy" onerror="this.style.display=\'none\'" /><span class="' + P + '-muted">' + esc(im.by || '') + ' ' + dateStr(im.at) + '</span></label>';
    }).join('') + st.extra.map(function (im, i) {
      return '<label class="' + P + '-ocr-thumb"><input type="checkbox" data-ocr-extra="' + i + '"' + (im.selected ? ' checked' : '') + ' /><img src="' + im.dataUrl + '" alt="" /><span class="' + P + '-muted">' + esc(im.name) + '</span></label>';
    }).join('');
    var html = '<div class="' + P + '-ocr"><div class="' + P + '-h">🔎 So sánh giá khách (OCR ảnh trong bình luận, chạy offline trên máy)</div>' +
      '<div class="' + P + '-ocr-bar">' +
      '<button class="' + P + '-btn ' + P + '-primary" id="' + P + '-ocr-run"' + (st.running ? ' disabled' : '') + '>' + (st.running ? 'Đang đọc…' : 'Đọc ảnh & so sánh') + '</button>' +
      '<button class="' + P + '-btn" id="' + P + '-ocr-rerun"' + (st.running ? ' disabled' : '') + ' title="Bỏ kết quả đã lưu, đọc lại">Đọc lại</button>' +
      '<label class="' + P + '-btn">Chọn ảnh từ máy<input type="file" id="' + P + '-ocr-file" accept="image/*" multiple style="display:none" /></label>' +
      '<span class="' + P + '-muted">hoặc dán ảnh (Ctrl+V) khi đang ở trang này · ' + (st.images.length + st.extra.length) + ' ảnh</span>' +
      '<span class="' + P + '-grow"></span><span id="' + P + '-ocr-progress" class="' + P + '-muted">' + esc(st.progress) + '</span></div>' +
      (imgs ? '<div class="' + P + '-ocr-thumbs">' + imgs + '</div>' : '<div class="' + P + '-muted">Bình luận của BG này không có ảnh. Bạn có thể chọn/dán ảnh báo giá của khách.</div>') +
      (st.error ? '<div class="' + P + '-red">' + esc(st.error) + '</div>' : '') +
      renderOcrCompare(a) + '</div>';
    return html;
  }
  function ensureOcrPicks(a) {
    var st = ocrState;
    if (!st.results || st.forId !== a.id || Object.keys(st.pick).length) return;
    var rows = ocrRows(), map = matchOcr(rows, a.prod.rows);
    a.prod.rows.forEach(function (r) { if (map[r.id]) { st.pick[r.id] = map[r.id].k; st.price[r.id] = ocrPriceForQty(rows[map[r.id].k], r.qty); st.pick[r.id + ':how'] = map[r.id].how; } });
  }
  function custPriceFor(r) {
    var a = detailState.lastAnalysis;
    if (!a || ocrState.forId !== a.id || !ocrState.results) return 0;
    ensureOcrPicks(a);
    return +ocrState.price[r.id] || 0;
  }
  function refreshPriceTool(a) {
    var root = document.getElementById(PREFIX + '-pt-root');
    if (!root) return;
    root.innerHTML = renderPriceTool(a); bindPriceTool(a); updatePreviewSections(a);
  }
  function renderOcrCompare(a) {
    var st = ocrState, P = PREFIX;
    if (!st.results) return '';
    var rows = ocrRows();
    var prod = a.prod.rows;
    ensureOcrPicks(a);
    var errs = st.results.filter(function (r) { return !r.ok; }).map(function (r) { return (r.name || r.url || '') + ': ' + r.error; });
    var sumK = 0, sumS = 0, sumBase = 0, sumNvl = 0, n = 0, bad = 0;
    var body = prod.map(function (r) {
      var k = st.pick[r.id], o = (k !== undefined && k !== '') ? rows[k] : null;
      var price = +st.price[r.id] || 0;
      var e = evalCustomerPrice(r, price);
      if (price > 0) { n++; sumK += price * r.qty; sumS += r.sale * r.qty; if (r.nvlUnit > 0) { sumBase += r.baseUnit * r.qty; sumNvl += r.nvlUnit * r.qty; } if (e && (e.level === 'danger' || e.level === 'warn')) bad++; }
      var opts = '<option value="">— không ghép —</option>' + rows.map(function (x, i) { return '<option value="' + i + '"' + (k === i ? ' selected' : '') + '>' + esc((x.dims ? dimsStr(x.dims) + ' ' : '') + (x.price !== null ? fmt(x.price) + ' ' : '') + '· ' + x.text.slice(0, 40)) + '</option>'; }).join('');
      var how = st.pick[r.id + ':how'];
      return '<tr>' +
        '<td>' + r.idx + '</td><td>' + esc(r.name.slice(0, 60)) + '<div class="' + P + '-muted">' + (r.dims ? dimsStr(r.dims) + ' mm' : '') + ' · SL ' + fmt(r.qty) + '</div></td>' +
        '<td><select data-ocr-pick="' + r.id + '">' + opts + '</select>' + (how ? '<div class="' + P + '-muted">' + (how === 'size' ? 'ghép theo kích thước' : 'ghép theo thứ tự') + (o ? ' · ' + esc(o.imgName) : '') + '</div>' : '') + '</td>' +
        '<td class="r"><input type="number" data-ocr-price="' + r.id + '" value="' + (price || '') + '" style="width:92px" /></td>' +
        '<td class="r">' + fmt(r.sale) + '</td>' +
        '<td class="r ' + (e ? (e.diff < 0 ? P + '-red' : P + '-green') : '') + '">' + (e ? (e.diff > 0 ? '+' : '') + fmt(e.diff) + (e.pct !== null ? '<div class="' + P + '-muted">' + (e.pct > 0 ? '+' : '') + e.pct.toFixed(1) + '%</div>' : '') : '-') + '</td>' +
        '<td class="r">' + (r.nvlUnit > 0 ? fmt(r.nvlUnit) : '-') + '</td>' +
        '<td class="r">' + (r.baseUnit > 0 ? fmt(r.baseUnit) : '-') + '</td>' +
        '<td class="r">' + (r.dealPO > 0 ? fmt(r.dealPO) : '-') + '</td>' +
        '<td class="r">' + (e && e.dealPct !== null ? e.dealPct.toFixed(1) + '%' : '-') + '</td>' +
        '<td>' + (e ? '<span class="' + P + '-chip ' + P + '-' + e.level + '">' + esc(e.text) + '</span>' : '<span class="' + P + '-muted">chưa có giá khách</span>') + '</td>' +
        '</tr>';
    }).join('');
    var profitK = sumBase > 0 ? sumK - sumBase : null;
    var summary = n ? '<div class="' + P + '-ocr-sum">' +
      '<b>Tổng theo giá khách:</b> ' + fmt(sumK) + ' đ · <b>theo BG:</b> ' + fmt(sumS) + ' đ · <b>chênh:</b> <span class="' + (sumK - sumS < 0 ? P + '-red' : P + '-green') + '">' + (sumK - sumS > 0 ? '+' : '') + fmt(sumK - sumS) + ' đ</span>' +
      (profitK !== null ? ' · <b>LN nếu bán theo giá khách (bán − mốc ' + floorPct() + '%):</b> <span class="' + (profitK < 0 ? P + '-red' : P + '-green') + '">' + fmt(profitK) + ' đ</span> · LN gộp (bán − NVL): ' + fmt(sumK - sumNvl) + ' đ' : '') +
      (bad ? ' · <span class="' + P + '-red">' + bad + ' SP khách trả dưới mức</span>' : ' · <span class="' + P + '-green">tất cả đạt mức</span>') + '</div>' : '';
    var raw = '<div class="' + P + '-muted" style="margin-top:6px"><a href="#" id="' + P + '-ocr-raw">' + (st.showRaw ? 'Ẩn' : 'Xem') + ' ' + rows.length + ' dòng OCR đọc được</a>' +
      (st.results.some(function (r) { return r.cached; }) ? ' · dùng kết quả đã lưu (bấm "Đọc lại" để OCR lại)' : '') + '</div>' +
      (st.showRaw ? '<div class="' + P + '-ocr-raw">' + rows.map(function (x) { return '<div><span class="' + P + '-muted">' + esc(x.imgName) + ' · ' + (x.dims ? 'KT ' + dimsStr(x.dims) : '') + (x.price !== null ? ' · giá ' + fmt(x.price) : '') + ' · ' + x.conf + '%</span> ' + esc(x.text) + (x.digits && x.digits !== x.text ? ' <span class="' + P + '-muted">[số: ' + esc(x.digits) + ']</span>' : '') + '</div>'; }).join('') + '</div>' : '');
    return (errs.length ? '<div class="' + P + '-red">' + esc(errs.join(' · ')) + '</div>' : '') +
      '<table class="' + P + '-table ' + P + '-ocr-table"><thead><tr><th>#</th><th>Sản phẩm (BG)</th><th>Dòng trong ảnh khách</th><th class="r">Giá khách</th><th class="r">Giá BG</th><th class="r">Chênh</th><th class="r">NVL/SP</th><th class="r">Giá mốc</th><th class="r">Deal mục tiêu</th><th class="r">% deal theo giá khách</th><th>Đánh giá</th></tr></thead><tbody>' + body + '</tbody></table>' +
      summary + raw +
      '<div class="' + P + '-pt-bar" style="margin-top:8px"><button class="' + P + '-btn" id="' + P + '-ocr-apply">Điền giá khách vào BG (giá deal, % deal, giá bán)</button>' +
      '<span class="' + P + '-muted">Chỉ điền các SP có giá khách khác giá BG; sau đó bấm "Cập nhật" của trang để lưu.</span></div>';
  }
  function ocrSetProgress(text) {
    ocrState.progress = text || '';
    var el2 = document.getElementById(PREFIX + '-ocr-progress');
    if (el2) el2.textContent = ocrState.progress;
  }
  function runOcr(a, force, silent) {
    var st = ocrState;
    var images = st.images.filter(function (i) { return i.selected; }).map(function (i) { return { url: i.url, name: i.url.split('/').pop().slice(0, 24) }; })
      .concat(st.extra.filter(function (i) { return i.selected; }).map(function (i) { return { dataUrl: i.dataUrl, name: i.name }; }));
    if (!images.length) { if (!silent) dialog({ title: 'OCR', message: 'Chưa chọn ảnh nào để đọc.', cancelText: null }); return; }
    st.running = true; st.error = ''; st.results = null; st.pick = {}; st.price = {};
    rerenderOcr(a);
    ocrSetProgress('Đang gửi ' + images.length + ' ảnh cho bộ OCR…');
    try {
      var done = function (res, err) {
        st.running = false;
        if (err) st.error = 'Không gọi được OCR: ' + err.message + ' (thử tải lại trang)';
        else if (!res || !res.ok) st.error = 'OCR lỗi: ' + (res && res.error || 'không rõ');
        else st.results = res.results;
        if (st.results && priceTool.forId === a.id) setTimeout(function () { refreshPriceTool(a); }, 0);
        ocrSetProgress(st.results ? 'Đọc xong ' + st.results.filter(function (r) { return r.ok; }).length + '/' + st.results.length + ' ảnh' + (st.results.some(function (r) { return r.ms; }) ? ' (' + st.results.reduce(function (s, r) { return s + (r.ms || 0); }, 0) + ' ms)' : '') : '');
        rerenderOcr(a);
      };
      HOST.send({ type: 'ddbg:ocr', images: images, opts: { force: !!force } }).then(function (res) { done(res, null); }, function (e) { done(null, e); });
    } catch (e) { st.running = false; st.error = 'Extension vừa được tải lại, hãy tải lại trang (F5) rồi thử lại.'; rerenderOcr(a); }
  }
  function rerenderOcr(a) {
    var root = document.getElementById(PREFIX + '-ocr-root');
    if (!root) return;
    root.innerHTML = renderOcr(a);
    bindOcr(a);
  }
  function addExtraImageFiles(a, files) {
    var list = Array.prototype.slice.call(files || []).filter(function (f) { return /^image\//.test(f.type); });
    if (!list.length) return;
    var left = list.length;
    list.forEach(function (f) {
      var rd = new FileReader();
      rd.onload = function () { ocrState.extra.push({ name: f.name || ('ảnh dán ' + (ocrState.extra.length + 1)), dataUrl: rd.result, selected: true }); if (--left === 0) rerenderOcr(a); };
      rd.readAsDataURL(f);
    });
  }
  function bindOcr(a) {
    var st = ocrState, P = PREFIX;
    var q = function (id) { return document.getElementById(P + id); };
    if (q('-ocr-run')) q('-ocr-run').onclick = function () { runOcr(a, false); };
    if (q('-ocr-rerun')) q('-ocr-rerun').onclick = function () { runOcr(a, true); };
    if (q('-ocr-file')) q('-ocr-file').onchange = function (e) { addExtraImageFiles(a, e.target.files); e.target.value = ''; };
    if (q('-ocr-raw')) q('-ocr-raw').onclick = function (e) { e.preventDefault(); st.showRaw = !st.showRaw; rerenderOcr(a); };
    Array.prototype.forEach.call(document.querySelectorAll('[data-ocr-img]'), function (cb) { cb.onchange = function () { st.images[+cb.getAttribute('data-ocr-img')].selected = cb.checked; }; });
    Array.prototype.forEach.call(document.querySelectorAll('[data-ocr-extra]'), function (cb) { cb.onchange = function () { st.extra[+cb.getAttribute('data-ocr-extra')].selected = cb.checked; }; });
    Array.prototype.forEach.call(document.querySelectorAll('[data-ocr-pick]'), function (sel) {
      sel.onchange = function () {
        var id = sel.getAttribute('data-ocr-pick'), v = sel.value;
        st.pick[id] = v === '' ? '' : +v; st.pick[id + ':how'] = v === '' ? '' : 'tay';
        var rows = ocrRows(), pr = a.prod.rows.find(function (x) { return String(x.id) === String(id); });
        st.price[id] = v === '' ? '' : (ocrPriceForQty(rows[+v], pr ? pr.qty : 0) || '');
        rerenderOcr(a); refreshPriceTool(a);
      };
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-ocr-price]'), function (inp) {
      inp.oninput = debounce(function () { st.price[inp.getAttribute('data-ocr-price')] = inp.value; rerenderOcr(a); refreshPriceTool(a); }, 500);
    });
    if (q('-ocr-apply')) q('-ocr-apply').onclick = function () {
      var prev = a.prod.rows.map(function (r) { var p = Math.round(+st.price[r.id] || 0); return p > 0 && p !== r.sale ? { r: r, newPrice: p } : null; }).filter(Boolean);
      applyPriceList(prev, 'Điền giá khách cho ' + prev.length + ' sản phẩm?');
    };
  }
  document.addEventListener('paste', function (e) {
    if (!document.getElementById(PREFIX + '-ocr-root') || !detailState.lastAnalysis) return;
    var items = (e.clipboardData && e.clipboardData.items) || [];
    var files = [];
    for (var i = 0; i < items.length; i++) if (items[i].kind === 'file' && /^image\//.test(items[i].type)) files.push(items[i].getAsFile());
    if (files.length) { addExtraImageFiles(detailState.lastAnalysis, files); notify('Đã thêm ' + files.length + ' ảnh từ clipboard vào phần OCR', 'ok'); }
  });
  HOST.onHostEvent(function (msg) {   // tiến độ OCR: background -> phần vỏ trên trang -> CustomEvent 'ddbg-host'
    if (msg && msg.type === 'ddbg:ocrProgress') ocrSetProgress(msg.text + (msg.pct ? ' ' + msg.pct + '%' : ''));
  });

  function renderSyncBar(a) {
    var rows = a.prod.rows.filter(function (r) { return r.paperChanged; });
    if (!rows.length) return '';
    return '<div class="' + PREFIX + '-syncbar"><span>⚠ <b>' + rows.length + ' SP có giá giấy đã thay đổi</b> (' +
      rows.map(function (r) { return 'SP' + r.idx + ': ' + fmt(r.cartonPrice) + ' → ' + fmt(r.structPrice) + '/m²'; }).join(' · ') +
      '). Trang sẽ chặn "Cập nhật" cho đến khi đồng bộ.</span>' +
      '<button class="' + PREFIX + '-btn ' + PREFIX + '-primary" id="' + PREFIX + '-sync-btn">🔄 Đồng bộ giá carton mới (' + rows.length + ' SP)</button></div>';
  }
  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function waitFor(fn, timeout) {
    var t0 = Date.now();
    return new Promise(function (resolve, reject) {
      (function poll() {
        var v = null;
        try { v = fn(); } catch (e) {}
        if (v) return resolve(v);
        if (Date.now() - t0 > timeout) return reject(new Error('hết thời gian chờ'));
        setTimeout(poll, 150);
      })();
    });
  }
  function visibleModal(titlePrefix) {
    var wraps = document.querySelectorAll('.ant-modal-wrap');
    for (var i = wraps.length - 1; i >= 0; i--) {
      var w = wraps[i];
      if (w.style.display === 'none' || getComputedStyle(w).display === 'none') continue;
      var t = w.querySelector('.ant-modal-title');
      if (!titlePrefix || (t && t.textContent.trim().indexOf(titlePrefix) === 0)) return w;
    }
    return null;
  }
  function modalButton(modal, text, exact) {
    return Array.prototype.find.call(modal.querySelectorAll('button'), function (b) { var s = b.textContent.trim(); return exact ? s === text : s.indexOf(text) >= 0; }) || null;
  }
  function productRowByIdx(pt, idx) {
    return pt.rows.find(function (r) { var c = r.children[1]; return c && (c.innerText || '').trim().split(/\s/)[0] === String(idx); }) || pt.rows[idx - 1] || null;
  }
  function syncCartonPrices(a) {
    var rows = a.prod.rows.filter(function (r) { return r.paperChanged; });
    if (!rows.length) return;
    var pt = findProductTable();
    if (!pt) { dialog({ title: 'Đồng bộ giá carton', message: 'Không tìm thấy bảng hàng hóa trên trang.', cancelText: null }); return; }
    var html = '<table class="' + PREFIX + '-table"><thead><tr><th>#</th><th>Sản phẩm</th><th class="r">Giá giấy trên BG</th><th class="r">Giá giấy hiện tại</th></tr></thead><tbody>' +
      rows.map(function (r) { return '<tr><td>' + r.idx + '</td><td>' + esc(r.name.slice(0, 70)) + '</td><td class="r">' + fmt(r.cartonPrice) + '/m²</td><td class="r ' + PREFIX + '-bold">' + fmt(r.structPrice) + '/m²</td></tr>'; }).join('') + '</tbody></table>' +
      '<div class="' + PREFIX + '-muted" style="margin-top:6px">Extension sẽ lần lượt mở "Tính giá carton" của từng SP, bấm <b>Đồng bộ giá carton mới</b> rồi <b>Lưu</b> (đúng như bạn làm tay). Hệ thống tự tính lại giá nhập, giá gợi ý theo giá giấy mới. Sau đó bạn kiểm tra bảng và bấm <b>Cập nhật</b> của trang để lưu.</div>';
    dialog({ title: 'Đồng bộ giá carton mới cho ' + rows.length + ' sản phẩm?', html: html, okText: 'Đồng bộ', cancelText: 'Hủy' }).then(function (ok) {
      if (!ok) return;
      var results = [], i = 0;
      function rowSnapshot(tr) { return Array.prototype.map.call(tr.children, function (td) { return (td.innerText || '').trim().replace(/\s+/g, ' '); }); }
      function next() {
        if (i >= rows.length) return done();
        var r = rows[i++];
        setProgressDetail('Đang đồng bộ SP' + r.idx + ' (' + i + '/' + rows.length + ')…');
        var tr = productRowByIdx(pt, r.idx);
        if (!tr) { results.push({ r: r, error: 'không thấy dòng' }); return next(); }
        var before = rowSnapshot(tr);
        var open = tr.querySelector('button.ant-btn-link');
        if (!open) { results.push({ r: r, error: 'không thấy nút mở "Tính giá carton" (cột Số lượng)' }); return next(); }
        open.click();
        waitFor(function () { return visibleModal('Tính giá carton'); }, 5000).then(function (modal) {
          return delay(500).then(function () {
            var sync = modalButton(modal, 'Đồng bộ giá carton', false);
            if (!sync) {
              var close = modal.querySelector('.ant-modal-close'); if (close) close.click();
              return waitFor(function () { return !visibleModal('Tính giá carton'); }, 4000).then(function () { results.push({ r: r, error: 'modal không có nút Đồng bộ (giá hiện tại không cao hơn?)' }); });
            }
            sync.click();
            return delay(800).then(function () {
              var save = modalButton(modal, 'Lưu', true);
              if (!save) throw new Error('không thấy nút Lưu');
              save.click();
              return waitFor(function () { return !visibleModal('Tính giá carton'); }, 8000).then(function () { return delay(400); }).then(function () {
                var tr2 = productRowByIdx(findProductTable() || pt, r.idx);
                results.push({ r: r, ok: true, before: before, after: tr2 ? rowSnapshot(tr2) : null });
              });
            });
          });
        }).catch(function (e) {
          var m = visibleModal('Tính giá carton'); if (m) { var c = m.querySelector('.ant-modal-close'); if (c) c.click(); }
          results.push({ r: r, error: e.message });
        }).then(function () { setTimeout(next, 400); });
      }
      function done() {
        var oks = results.filter(function (x) { return x.ok; }), errs = results.filter(function (x) { return !x.ok; });
        var html2 = (oks.length ? '<div>Đã đồng bộ <b>' + oks.length + '</b> SP. Thay đổi trên dòng (trước → sau):</div><ul>' + oks.map(function (x) {
          var diffs = [];
          if (x.before && x.after) x.before.forEach(function (v, k) { if (x.after[k] !== undefined && x.after[k] !== v && v && x.after[k]) diffs.push(esc(v) + ' → <b>' + esc(x.after[k]) + '</b>'); });
          return '<li>SP' + x.r.idx + ': ' + (diffs.length ? diffs.join(' · ') : 'không thấy thay đổi trên bảng') + '</li>';
        }).join('') + '</ul>' : '') +
          (errs.length ? '<div class="' + PREFIX + '-red">Không đồng bộ được: ' + errs.map(function (x) { return 'SP' + x.r.idx + ' (' + esc(x.error) + ')'; }).join(', ') + '</div>' : '') +
          '<div class="' + PREFIX + '-muted" style="margin-top:6px">Kiểm tra bảng hàng hóa (giá nhập, giá gợi ý, giá bán có thể đã đổi) rồi bấm <b>Cập nhật</b> của trang để lưu; sau đó bấm "Phân tích lại".</div>';
        setProgressDetail(oks.length ? 'Đã đồng bộ giá giấy cho ' + oks.length + ' SP, hãy bấm Cập nhật của trang để lưu.' : '');
        dialog({ title: 'Đồng bộ giá carton mới', html: html2, cancelText: null });
      }
      next();
    });
  }

  function autoOcrForCompetitor(a) {
    var cc = a.cm && a.cm.competitorCut;
    if (!cc || ocrState.forId !== a.id || ocrState.results || ocrState.running || ocrState.autoTried) return;
    ocrState.autoTried = true;
    var before = ocrState.images.filter(function (im) { return (im.at || 0) <= cc.at + 60 && im.by !== cc.by; });
    var last = before.reduce(function (m, im) { return Math.max(m, im.at || 0); }, 0);
    var recent = before.filter(function (im) { return (im.at || 0) >= last - 600; });
    ocrState.images.forEach(function (im) { im.selected = recent.indexOf(im) >= 0; });
    if (!ocrState.images.some(function (im) { return im.selected; })) return;
    runOcr(a, false, true);
  }
  function renderDetailPanel(a) {
    detailState.lastAnalysis = a;   // custPriceFor() cần biết BG đang vẽ ngay khi render công cụ chỉnh giá
    if (priceTool.forId !== a.id) {
      priceTool.rows = {}; priceTool.forId = a.id; priceTool.value = a.targetDeal; priceTool.mode = 'dealPct';
      var cc0 = a.cm && a.cm.competitorCut;
      if (cc0) { priceTool.mode = 'cust'; priceTool.value = cc0.pct; }   // kể cả khi sales đã sửa giá: không đề xuất kéo lên % deal mục tiêu
    }
    var panel = document.getElementById(PREFIX + '-detail');
    if (!panel) {
      panel = el('div', PREFIX + '-detail'); panel.id = PREFIX + '-detail';
      var anchor = placeDetailPanel(panel) ? null : findDetailAnchor();
      if (panel.parentElement) { /* đã đặt theo tiêu đề #BG */ }
      else if (anchor && anchor.before && anchor.before.parentElement) anchor.before.parentElement.insertBefore(panel, anchor.before);
      else if (anchor && anchor.parentElement) anchor.parentElement.insertBefore(panel, anchor.nextSibling);
      else (document.querySelector('main') || document.body).prepend(panel);
    }
    panel.innerHTML =
      '<div class="' + PREFIX + '-detail-head"><b>📊 Phân tích báo giá ' + esc(a.code) + '</b> <span class="' + PREFIX + '-muted" title="Phiên bản phần phân tích (tự cập nhật từ GitHub)">v' + PAYLOAD_VER + '</span>' +
      '<span class="' + PREFIX + '-status">' + esc(a.quoteStatusLabel) + '</span>' +
      '<span class="' + PREFIX + '-muted">' + esc(a.statusLabel) + (a.changeStatus ? ' · ' + esc(CHANGE_STATUS[a.changeStatus] || a.changeStatus) : '') + ' · ' + esc(a.staff) + ' · tạo ' + dateStr(a.o.createdAt) + (a.age !== null ? ' (' + a.age + ' ngày)' : '') + '</span>' +
      '<span class="' + PREFIX + '-grow"></span>' +
      '<span class="' + PREFIX + '-ready ' + (a.ready ? PREFIX + '-ready-yes' : PREFIX + '-ready-no') + '">' + (a.ready ? 'Đủ điều kiện duyệt' : 'Cần xử lý trước khi duyệt') + '</span>' +
      '<button class="' + PREFIX + '-btn" id="' + PREFIX + '-detail-refresh">Phân tích lại</button>' +
      '<button class="' + PREFIX + '-btn" id="' + PREFIX + '-detail-toggle">' + (detailState.expanded ? 'Thu gọn ▲' : 'Mở rộng ▼') + '</button></div>' +
      '<div id="' + PREFIX + '-detail-body">' +
      '<div class="' + PREFIX + '-card-flags">' + renderFlags(a.flags) + '</div>' +
      '<div id="' + PREFIX + '-summary-root">' + renderSummary(a) + '</div>' +
      renderSyncBar(a) +
      '<div id="' + PREFIX + '-pt-root">' + renderPriceTool(a) + '</div><div id="' + PREFIX + '-detail-msg" class="' + PREFIX + '-msgline"></div>' +
      '<div id="' + PREFIX + '-detail-more" style="display:' + (detailState.expanded ? 'block' : 'none') + '">' +
      '<div id="' + PREFIX + '-prodtable-root">' + renderProductTable(a) + '</div>' +
      '<div class="' + PREFIX + '-h">Tiền nguyên vật liệu theo PO (từng NCC)</div>' + renderPOTable(a) +
      '<div id="' + PREFIX + '-ocr-root">' + renderOcr(a) + '</div>' +
      '<div class="' + PREFIX + '-cols"><div><div class="' + PREFIX + '-h">Bình luận gần nhất về BG này</div>' + renderComments(a) + '</div>' +
      '<div><div class="' + PREFIX + '-h">Điều kiện duyệt</div>' + renderChecklist(a) +
      '<div class="' + PREFIX + '-h" style="margin-top:8px">Khách hàng</div><div class="' + PREFIX + '-muted">' + esc(a.customer) + (a.isCompany ? ' (công ty)' : ' (cá nhân)') +
      ' · % Deal ' + (a.customerDealPercent || 0) + '% · Doanh số ' + fmt(a.customerRevenue) + ' đ · Nợ ' + fmt(a.customerDebt) + ' đ' + (a.lastOrderAt ? ' · Đơn gần nhất ' + dateStr(a.lastOrderAt) : ' · Chưa có đơn') + '</div>' +
      '</div></div></div></div>';
    bindPriceTool(a);
    bindOcr(a);
    autoOcrForCompetitor(a);
    var syncBtn = document.getElementById(PREFIX + '-sync-btn');
    if (syncBtn) syncBtn.onclick = function () { syncCartonPrices(a); };
    detailState.lastAnalysis = a;
    document.getElementById(PREFIX + '-detail-refresh').onclick = function () { commentCache = {}; runDetailAnalysis(true); };
    document.getElementById(PREFIX + '-detail-toggle').onclick = function (e) {
      var b = document.getElementById(PREFIX + '-detail-more');
      var show = b.style.display === 'none';
      b.style.display = show ? 'block' : 'none';
      e.target.textContent = show ? 'Thu gọn ▲' : 'Mở rộng ▼';
      detailState.expanded = show;   // chỉ nhớ trong lúc đang xem BG này; vào BG khác lại thu gọn
    };
  }

  function runDetailAnalysis(force) {
    var m = location.pathname.match(/\/(?:bao-gia|co-hoi)\/update\/(\d+)/);
    if (!m) return;
    var id = +m[1];
    if (!force && detailState.id === id && document.getElementById(PREFIX + '-detail')) return;
    if (detailState.loading) return;
    if (detailState.id !== id) detailState.expanded = false;   // mặc định thu gọn mỗi khi vào một BG
    detailState.loading = true; detailState.id = id;
    var old = document.getElementById(PREFIX + '-detail');
    if (old && old.parentElement) old.remove();
    fetchOpportunity(id).then(function (o) {
      return enrich(o).then(renderDetailPanel);
    }).catch(function (e) {
      var p = el('div', PREFIX + '-detail', '<div class="' + PREFIX + '-detail-head">📊 Không phân tích được: ' + esc(e.message) + '</div>');
      p.id = PREFIX + '-detail';
      (document.querySelector('main') || document.body).prepend(p);
    }).then(function () { detailState.loading = false; });
  }

  var lastPath = '';
  function tick() {
    var path = location.pathname;
    var isList = /^\/bao-gia\/?$/.test(path);
    var isDetail = /^\/(bao-gia|co-hoi)\/update\/\d+/.test(path);
    if (path !== lastPath) {
      lastPath = path;
      var old = document.getElementById(PREFIX + '-detail');
      if (old && !isDetail) old.remove();
      if (!isList) {
        var bar = document.getElementById(PREFIX + '-bar');
        if (bar) bar.remove();
        document.querySelectorAll('.' + PREFIX + '-rowdetail').forEach(function (r) { r.remove(); });
      }
    }
    if (isList) { ensureListBar(); redecorate(); }
    if (isDetail && !detailState.loading && !document.getElementById(PREFIX + '-detail')) runDetailAnalysis(false);
    if (isDetail) { var dp = document.getElementById(PREFIX + '-detail'); if (dp) placeDetailPanel(dp); }   // trang vẽ lại làm lệch chỗ -> đưa về
    if (isDetail && detailState.id !== null) {
      var m = path.match(/update\/(\d+)/);
      if (m && +m[1] !== detailState.id) runDetailAnalysis(true);
    }
  }

  var redecorate = debounce(function () {
    if (!/^\/bao-gia\/?$/.test(location.pathname)) return;
    var ids = visibleIds();
    if (!ids.length) return;
    ensureListBar();
    var missing = ids.filter(function (i) { return !listState.analyses[i] && !listState.attempted[i]; });
    if (missing.length && !listState.loading) runListAnalysis(false);
    renderBar();
    decorateRows();
  }, 500);

  loadSettings().then(function () {
    tick();
    setInterval(tick, 800);
    var mo = new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        var t = muts[i].target;
        if (t && t.closest && t.closest('.' + PREFIX + '-bar,.' + PREFIX + '-rowdetail,.' + PREFIX + '-rowflags,.' + PREFIX + '-detail,.' + PREFIX + '-modal,.' + PREFIX + '-toast')) continue;
        redecorate();
        return;
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
  });
})();

})();

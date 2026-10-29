/* Push giá tấm nhỏ vào Ghi chú — content.bundle.js v2.0.0 (đã ký; build 2026-10-29T03:17:41.009Z) */
(function () {
  if (window["__payload_content_bundle_js"]) return;
  window["__payload_content_bundle_js"] = "2.0.0";
  try { document.documentElement.setAttribute("data-pgc-payload", "2.0.0"); } catch (e) {}
(function () {
  /******************** Utils & Config ********************/
  const SELECTORS = {
    table: ".ant-table-wrapper table",
    thead: "thead",
    tbody: "tbody",
  };

  // Tìm scope đúng: modal đang mở có .ant-table-wrapper, nếu không có thì dùng document
  function getScope() {
    // AntD v4/v5: modal container
    const modals = Array.from(document.querySelectorAll(".ant-modal, .ant-modal-wrap, .ant-modal-root"))
      .filter(el => el.offsetParent !== null); // visible only
    // lấy modal có bảng
    for (const m of modals.reverse()) {
      const scope = m.querySelector(".ant-table-wrapper");
      if (scope) return scope; // trả về wrapper để query tương đối
    }
    // fallback: vùng lớn nhất có bảng
    const wrapper = document.querySelector(".ant-table-wrapper");
    return wrapper || document;
  }

  // Tìm index cột theo tiêu đề (trong scope cụ thể)
  function getColumnIndexByHeaderText(scope, headerText) {
    const thead = scope.querySelector(SELECTORS.thead);
    if (!thead) return -1;
    // chỉ lấy hàng tiêu đề cuối cùng (tránh header gộp 2 tầng làm lệch index)
    const headerRows = Array.from(thead.querySelectorAll("tr"));
    const lastRow = headerRows[headerRows.length - 1];
    const ths = Array.from((lastRow || thead).querySelectorAll("th.ant-table-cell, th"));
    const norm = s => (s || "").replace(/\s+/g, " ").trim().toLowerCase();
    const target = norm(headerText);
    // ưu tiên khớp chính xác, sau đó mới khớp chứa
    let idx = ths.findIndex(th => norm(th.innerText) === target);
    if (idx === -1) idx = ths.findIndex(th => norm(th.innerText).includes(target));
    return idx;
  }

  // Chụp giá trị tất cả input trong 1 dòng (trừ cột Ghi chú), theo VỊ TRÍ cột
  // (không dựa vào element vì React có thể tái sử dụng element cho dòng khác sau khi render lại)
  function snapshotRow(tr, idxGhiChu, headers) {
    const tds = Array.from(tr.querySelectorAll(":scope > td.ant-table-cell, :scope > td"));
    const cells = [];
    tds.forEach((td, colIdx) => {
      if (colIdx === idxGhiChu) return;
      td.querySelectorAll("input, textarea").forEach((el, k) => {
        cells.push({ colIdx, k, header: headers[colIdx] || `cột ${colIdx}`, value: el.value });
      });
    });
    const name = (tds[0]?.innerText || "").trim();
    return { name, cells };
  }

  // So sánh snapshot với trạng thái hiện tại của dòng (cùng vị trí). Trả về danh sách ô bị đổi kèm element hiện tại.
  function diffRow(tr, snap) {
    const tds = Array.from(tr.querySelectorAll(":scope > td.ant-table-cell, :scope > td"));
    const changed = [];
    for (const c of snap.cells) {
      const td = tds[c.colIdx];
      if (!td) continue;
      const el = td.querySelectorAll("input, textarea")[c.k];
      if (!el) continue;
      if (el.value !== c.value) changed.push({ row: snap.name, header: c.header, before: c.value, after: el.value, el });
    }
    return changed;
  }

  function getHeaderTexts(scope) {
    const thead = scope.querySelector(SELECTORS.thead);
    if (!thead) return [];
    const rowsH = Array.from(thead.querySelectorAll("tr"));
    const last = rowsH[rowsH.length - 1] || thead;
    return Array.from(last.querySelectorAll("th.ant-table-cell, th")).map(th => (th.innerText || "").replace(/\s+/g, " ").trim());
  }

  // Lấy text “Tấm nhỏ: …” từ ô Đơn giá tấm
  function extractTamNhoText(td) {
    if (!td) return null;
    const raw = td.innerText || "";
    const m = raw.match(/Tấm\s*nhỏ\s*:\s*([\d.,]+)/i);
    return m ? m[1] : null;
  }

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const DELAY_BETWEEN_ROWS = 200; // ms, để React xử lý xong dòng này rồi mới sang dòng kế
  const DELAY_VERIFY = 500;       // ms, chờ app render xong rồi mới kiểm tra

  // Lấy props React gắn trên element (React 17+: __reactProps$xxx)
  function getReactProps(el) {
    const key = Object.keys(el).find(k => k.startsWith("__reactProps$"));
    return key ? el[key] : null;
  }

  // Báo cho React biết giá trị mới.
  // Ưu tiên gọi THẲNG props.onChange của chính ô đó: không có sự kiện DOM nào bubble lên
  // hàng/bảng, nên các listener khác của app không bị kích hoạt.
  // Fallback: bắn đúng 1 sự kiện "input" (không change/blur/keydown).
  function notifyReact(el) {
    const props = getReactProps(el);
    if (props && typeof props.onChange === "function") {
      const fakeEvent = {
        type: "change",
        target: el,
        currentTarget: el,
        bubbles: false,
        nativeEvent: null,
        defaultPrevented: false,
        isDefaultPrevented: () => false,
        isPropagationStopped: () => false,
        preventDefault() {},
        stopPropagation() {},
        persist() {},
      };
      props.onChange(fakeEvent);
      return "react";
    }
    el.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: null }));
    return "dom";
  }

  // Set value + báo React, không focus()
  function commitValue(el, payload) {
    setNativeValue(el, payload);
    return notifyReact(el);
  }

  // Ô này có phải ô số không? (không bao giờ ghi vào đây)
  function isNumericInput(el) {
    if (!el) return false;
    if (el.closest(".ant-input-number")) return true;
    const type = (el.getAttribute("type") || "").toLowerCase();
    if (type === "number") return true;
    const im = (el.getAttribute("inputmode") || "").toLowerCase();
    if (im === "numeric" || im === "decimal") return true;
    if (el.getAttribute("role") === "spinbutton") return true;
    if (el.classList.contains("autoNumeric") || el.dataset.autonumeric !== undefined) return true;
    return false;
  }

  // Set value qua native setter, không gọi focus() để không làm blur ô số đang được chọn
  function setNativeValue(input, payload) {
    const proto = input instanceof HTMLTextAreaElement ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
    if (setter) setter.call(input, payload);
    else input.value = payload;
  }

  // Xoá mọi đoạn "tấm nhỏ: ..." cũ (có hoặc không có ngoặc vuông) rồi ghép giá trị mới đúng 1 lần.
  // Phần ghi chú khác (nếu có) được giữ lại. Trả về null nếu không có gì thay đổi.
  const TAM_NHO_RE = /\s*\[?\s*tấm\s*nhỏ\s*:\s*[\d.,]+\s*\]?/gi;
  function buildNotePayload(prev, value) {
    const rest = (prev || "").replace(TAM_NHO_RE, " ").replace(/\s+/g, " ").trim();
    const payload = rest ? `${rest} [tấm nhỏ: ${value}]` : `tấm nhỏ: ${value}`;
    return payload === (prev || "").trim() ? null : payload;
  }

  // Ghi giá trị vào ô Ghi chú: input/textarea/affix-wrapper/Quill
  function setNoteValue(noteRootTd, value) {
    if (!noteRootTd) return false;

    // 1) input/textarea (kể cả trong .ant-input-affix-wrapper)
    let input = noteRootTd.querySelector("textarea.ant-input, textarea, .ant-input-affix-wrapper input[type='text'], input.ant-input[type='text'], input.ant-input:not([type])");
    if (input) {
      if (isNumericInput(input)) return false; // an toàn: không bao giờ ghi vào ô số
      const prev = input.value || "";
      const payload = buildNotePayload(prev, value);
      if (payload === null) return false; // đã đúng giá trị này rồi, không ghi lại
      commitValue(input, payload);
      return true;
    }

    // 2) Quill editor (contenteditable)
    const qlEditor = noteRootTd.querySelector(".ql-editor, [contenteditable='true']");
    if (qlEditor) {
      const prevText = qlEditor.innerText.trim();
      const payload = buildNotePayload(prevText, value);
      if (payload === null) return false; // đã đúng giá trị này rồi
      const qlContainer = qlEditor.closest(".ql-container, .ql-snow");
      const quill = qlContainer && (qlContainer.__quill || qlEditor.__quill || (window.Quill && window.Quill.find && window.Quill.find(qlEditor)));
      if (quill && quill.setText) {
        quill.setText(payload, "user");
      } else {
        // không focus(), không bắn change/blur
        qlEditor.innerHTML = payload.replace(/\n/g, "<br>");
        qlEditor.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText" }));
      }
      return true;
    }

    return false;
  }

  /******************** Main logic ********************/
  let running = false;

  async function pushAllRows() {
    if (running) { toast("Đang chạy, vui lòng đợi...", false); return 0; }
    running = true;
    try {
      return await pushAllRowsInner();
    } finally {
      running = false;
    }
  }

  async function pushAllRowsInner() {
    const scopeWrapper = getScope();
    const scope = scopeWrapper.matches?.(".ant-table-wrapper") ? scopeWrapper : scopeWrapper.querySelector(".ant-table-wrapper") || document;
    const table = scope.querySelector(SELECTORS.table);
    const tbody = scope.querySelector(SELECTORS.tbody);
    if (!table || !tbody) {
      toast("Không thấy bảng trong modal.", false);
      return 0;
    }

    const idxDonGiaTam = getColumnIndexByHeaderText(scope, "đơn giá tấm");
    const idxGhiChu    = getColumnIndexByHeaderText(scope, "ghi chú");

    if (idxDonGiaTam === -1 || idxGhiChu === -1) {
      toast("Không tìm thấy cột Đơn giá tấm hoặc Ghi chú.", false);
      return 0;
    }

    const headers = getHeaderTexts(scope);

    // Lưu lại ô đang focus để không làm mất focus / blur ô số người dùng đang sửa
    const active = document.activeElement;

    // Chụp TOÀN BỘ các dòng trước khi đụng vào bất cứ thứ gì
    const getRows = () => Array.from(tbody.querySelectorAll("tr.ant-table-row"));
    const rowsBefore = getRows();
    const snapshots = rowsBefore.map(tr => snapshotRow(tr, idxGhiChu, headers));

    let updated = 0;
    let mode = null;

    // Đẩy TUẦN TỰ từng dòng, nghỉ giữa các dòng để React xử lý xong state của dòng này
    // trước khi sang dòng kế (đẩy 3 dòng cùng 1 tick từng làm app trộn dữ liệu giữa các dòng).
    for (let i = 0; i < rowsBefore.length; i++) {
      const tr = getRows()[i]; // query lại vì app có thể đã render lại
      if (!tr) continue;
      const tds = Array.from(tr.querySelectorAll(":scope > td.ant-table-cell, :scope > td"));
      const tdDonGia = tds[idxDonGiaTam];
      const tdGhiChu = tds[idxGhiChu];

      const val = extractTamNhoText(tdDonGia);
      if (!val) continue;

      // Ô Ghi chú phải chứa ô nhập text, không phải ô số
      if (!tdGhiChu || tdGhiChu.querySelector(".ant-input-number, input[type='number'], [role='spinbutton']")) continue;

      const noteInput = tdGhiChu.querySelector("input, textarea");
      if (noteInput && mode === null) mode = getReactProps(noteInput)?.onChange ? "react" : "dom";

      if (setNoteValue(tdGhiChu, val)) {
        updated++;
        await sleep(DELAY_BETWEEN_ROWS);
      }
    }

    if (active && active !== document.activeElement && active.isConnected && typeof active.focus === "function") {
      try { active.focus({ preventScroll: true }); } catch (_) {}
    }

    console.info(`[Push tấm nhỏ] Đã đẩy ${updated} dòng (cách báo React: ${mode || "?"}).`);

    // Kiểm tra sau khi app render xong: có ô nào ngoài Ghi chú bị đổi không? (so theo vị trí cột)
    await sleep(DELAY_VERIFY);
    let changed = collectChanges(getRows(), snapshots);
    if (changed.length) {
      console.warn("[Push tấm nhỏ] Có ô ngoài Ghi chú bị thay đổi sau khi push, đang khôi phục:", changed.map(c => ({ row: c.row, cot: c.header, before: c.before, after: c.after })));
      // Khôi phục từng ô về giá trị cũ, tuần tự
      for (const c of changed) {
        if (!c.el.isConnected) continue;
        commitValue(c.el, c.before);
        await sleep(DELAY_BETWEEN_ROWS);
      }
      await sleep(DELAY_VERIFY);
      const still = collectChanges(getRows(), snapshots);
      if (still.length) {
        console.error("[Push tấm nhỏ] KHÔNG khôi phục được các ô sau:", still.map(c => ({ row: c.row, cot: c.header, before: c.before, after: c.after })));
        toast(`Cảnh báo: ${still.length} ô thông số bị đổi và không khôi phục được (xem Console).`, false);
      } else {
        console.info("[Push tấm nhỏ] Đã khôi phục xong các ô thông số.");
        toast(`Đã khôi phục ${changed.length} ô thông số bị app làm đổi.`);
      }
    }

    return updated;
  }

  function collectChanges(rows, snapshots) {
    const out = [];
    snapshots.forEach((snap, i) => {
      const tr = rows[i];
      if (!tr) return;
      out.push(...diffRow(tr, snap));
    });
    return out;
  }

  /******************** UI helpers ********************/
  // Trang có bảng với đủ 2 cột "Đơn giá tấm" và "Ghi chú" đang hiển thị không?
  function hasTargetTable() {
    const wrappers = Array.from(document.querySelectorAll(".ant-table-wrapper"))
      .filter(w => w.offsetParent !== null);
    return wrappers.some(w =>
      getColumnIndexByHeaderText(w, "đơn giá tấm") !== -1 &&
      getColumnIndexByHeaderText(w, "ghi chú") !== -1
    );
  }

  function ensureFloatingButton() {
    let btn = document.getElementById("push-tam-nho-btn");
    if (btn) {
      // Chỉ hiện nút nổi khi: có bảng mục tiêu (modal đang mở) VÀ chưa có nút trong thanh công cụ
      const show = hasTargetTable() && !document.getElementById("push-tam-nho-inline");
      btn.style.display = show ? "" : "none";
      return;
    }
    btn = document.createElement("button");
    btn.style.display = "none"; // mặc định ẩn, lần ensure kế tiếp sẽ quyết định
    btn.id = "push-tam-nho-btn";
    btn.type = "button";
    btn.textContent = "Push giá tấm nhỏ → Ghi chú";
    Object.assign(btn.style, {
      position: "fixed",
      zIndex: 99999,
      top: "16px",
      right: "16px",
      padding: "10px 14px",
      borderRadius: "10px",
      border: "none",
      fontWeight: "600",
      boxShadow: "0 6px 20px rgba(0,0,0,.15)",
      background: "#1677ff",
      color: "#fff",
      cursor: "grab",
      userSelect: "none",
      touchAction: "none",
      whiteSpace: "nowrap"
    });
    btn.title = "Alt+J để chạy nhanh. Kéo để di chuyển.";
    restoreFloatingPosition(btn);
    makeDraggable(btn, () => {
      pushAllRows().then(count => toast(`Đã đẩy “Tấm nhỏ” vào Ghi chú cho ${count} dòng.`));
    });
    document.body.appendChild(btn);
    ensureFloatingButton(); // quyết định hiện/ẩn ngay
  }

  /******************** Nút nổi: kéo thả + nhớ vị trí ********************/
  const POS_KEY = "pushTamNho.floatingPos";

  function restoreFloatingPosition(btn) {
    try {
      const pos = JSON.parse(localStorage.getItem(POS_KEY) || "null");
      if (pos && Number.isFinite(pos.left) && Number.isFinite(pos.top)) {
        btn.style.right = "auto";
        btn.style.left = `${pos.left}px`;
        btn.style.top = `${pos.top}px`;
        // đảm bảo không nằm ngoài màn hình (vd. đổi độ phân giải)
        requestAnimationFrame(() => clampIntoViewport(btn));
      }
    } catch (_) {}
  }

  function clampIntoViewport(btn) {
    const r = btn.getBoundingClientRect();
    const maxLeft = Math.max(0, window.innerWidth - r.width);
    const maxTop = Math.max(0, window.innerHeight - r.height);
    const left = Math.min(Math.max(0, r.left), maxLeft);
    const top = Math.min(Math.max(0, r.top), maxTop);
    btn.style.right = "auto";
    btn.style.left = `${left}px`;
    btn.style.top = `${top}px`;
    return { left, top };
  }

  // Kéo bằng chuột/cảm ứng; chỉ coi là click khi di chuyển < 5px
  function makeDraggable(btn, onClick) {
    let startX = 0, startY = 0, originLeft = 0, originTop = 0, dragging = false, moved = false;

    btn.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      const r = btn.getBoundingClientRect();
      startX = e.clientX; startY = e.clientY;
      originLeft = r.left; originTop = r.top;
      dragging = true; moved = false;
      btn.setPointerCapture(e.pointerId);
      e.preventDefault();
    });

    btn.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX, dy = e.clientY - startY;
      if (!moved && Math.hypot(dx, dy) < 5) return;
      moved = true;
      btn.style.cursor = "grabbing";
      btn.style.right = "auto";
      btn.style.left = `${originLeft + dx}px`;
      btn.style.top = `${originTop + dy}px`;
    });

    const finish = (e) => {
      if (!dragging) return;
      dragging = false;
      btn.style.cursor = "grab";
      try { btn.releasePointerCapture(e.pointerId); } catch (_) {}
      if (moved) {
        const pos = clampIntoViewport(btn);
        try { localStorage.setItem(POS_KEY, JSON.stringify(pos)); } catch (_) {}
      } else {
        onClick();
      }
    };
    btn.addEventListener("pointerup", finish);
    btn.addEventListener("pointercancel", finish);
    // chặn click mặc định (đã xử lý ở pointerup)
    btn.addEventListener("click", (e) => e.preventDefault());

    window.addEventListener("resize", () => clampIntoViewport(btn));
  }

  /******************** Nút trong thanh công cụ của modal (cạnh "Tạo BID") ********************/
  const INLINE_ANCHORS = ["tạo bid", "sắp xếp", "load giấy tấm"];

  function findToolbarAnchor() {
    const norm = s => (s || "").replace(/\s+/g, " ").trim().toLowerCase();
    const buttons = Array.from(document.querySelectorAll("button"))
      .filter(b => b.offsetParent !== null && b.id !== "push-tam-nho-inline" && b.id !== "push-tam-nho-btn");
    for (const label of INLINE_ANCHORS) {
      // lấy nút cuối cùng (modal mở sau cùng nằm sau trong DOM)
      const found = buttons.filter(b => norm(b.innerText) === label);
      if (found.length) return found[found.length - 1];
    }
    return null;
  }

  function ensureInlineButton() {
    const existing = document.getElementById("push-tam-nho-inline");
    const anchor = findToolbarAnchor();
    if (!anchor) {
      if (existing) existing.remove();
      return;
    }
    // đã có và vẫn nằm cạnh anchor → giữ nguyên
    if (existing && existing.parentNode === anchor.parentNode) return;
    if (existing) existing.remove();

    const btn = document.createElement("button");
    btn.id = "push-tam-nho-inline";
    btn.type = "button"; // tránh submit form của modal
    btn.className = anchor.className; // copy style AntD của nút bên cạnh
    btn.style.marginLeft = "8px";
    btn.title = "Alt+J để chạy nhanh";
    const span = document.createElement("span");
    span.textContent = "Push giá tấm nhỏ → Ghi chú";
    btn.appendChild(span);
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      pushAllRows().then(count => toast(`Đã đẩy “Tấm nhỏ” vào Ghi chú cho ${count} dòng.`));
    });
    anchor.insertAdjacentElement("afterend", btn);
  }

  function toast(msg, ok = true) {
    const d = document.createElement("div");
    d.textContent = msg;
    Object.assign(d.style, {
      position: "fixed",
      zIndex: 99999,
      bottom: "16px",
      right: "16px",
      padding: "10px 12px",
      background: ok ? "rgba(24,144,255,.95)" : "rgba(245,34,45,.95)",
      color: "#fff",
      borderRadius: "8px",
      boxShadow: "0 6px 20px rgba(0,0,0,.18)",
      maxWidth: "60vw",
      fontWeight: "600"
    });
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 2500);
  }

  function bindHotkeys() {
    window.addEventListener("keydown", (e) => {
      if (e.altKey && (e.key === "j" || e.key === "J")) {
        e.preventDefault();
        pushAllRows().then(count => toast(`Đã đẩy “Tấm nhỏ” cho ${count} dòng.`));
      }
    });
  }

  // Gom nhiều mutation liên tiếp lại, chỉ chạy 1 lần mỗi frame
  let scheduled = false;
  function ensureButtons() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      ensureInlineButton();
      ensureFloatingButton();
    });
  }

  function installObserver() {
    const obs = new MutationObserver(ensureButtons);
    obs.observe(document.documentElement, { childList: true, subtree: true });
  }

  function init() {
    ensureInlineButton();
    ensureFloatingButton();
    bindHotkeys();
    installObserver();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

})();

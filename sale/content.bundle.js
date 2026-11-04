/* Nhanh vn Đại Dương (Sale) — content.bundle.js v1.0.0 (đã ký; build 2026-11-04T03:37:24.597Z) */
(function () {
  if (window["__payload_content_bundle_js"]) return;
  window["__payload_content_bundle_js"] = "1.0.0";
  try { document.documentElement.setAttribute("data-nhs-payload", "1.0.0"); } catch (e) {}
const quickStartOrderPage = () => {
  if (window.location.href.includes("manage/add") || window.location.href.includes("/edit")) {
    setTimeout(() => {
      handleTableChange();
      availableItem();
      handleButtonSanPham();
      autoClickShippingAndVAT(); // Auto click Phí Vận chuyển và VAT 8%
    }, 1000); // Đợi 1 giây cho DOM render
  }
};

try {
  document.documentElement.setAttribute("data-nhanh-ext", "1");
  if (!document.getElementById("nhanh-ext-marker")) {
    const marker = document.createElement("div");
    marker.id = "nhanh-ext-marker";
    marker.style.display = "none";
    document.documentElement.appendChild(marker);
  }
} catch (err) {
  console.error("[NhanhExt] marker error", err);
}
console.warn("[NhanhExt] injected", window.location.href);

window.addEventListener("load", () => {
  console.warn("[NhanhExt] load", window.location.href);
  startExtension();
  quickStartOrderPage();
});

let lastUrl = window.location.href;
const onRouteChange = () => {
  if (window.location.href === lastUrl) return;
  lastUrl = window.location.href;
  // Reset flag để có thể auto click lại khi vào trang mới
  window.__nhanhAutoClickedShippingVAT = false;
  console.warn("[NhanhExt] route change", window.location.href);
  startExtension();
  quickStartOrderPage();
};

["pushState", "replaceState"].forEach(method => {
  const original = history[method];
  history[method] = function (...args) {
    const result = original.apply(this, args);
    onRouteChange();
    return result;
  };
});
window.addEventListener("popstate", onRouteChange);
setInterval(onRouteChange, 500);

function startExtension() {
  const pathname = window.location.pathname;

  setupCheckButtonsForNotes();
  setupClickableNoteLinks();

  if (pathname.includes("/order/manage/index")) {
    observeOrderRows();
    setTimeout(() => {
      addQRCodeButton();
    }, 1500);

    // waitForTableReady().then(() => {
    //   handleOrderListPage();
    // });
  }

  if (pathname.includes("/order/manage/detail")) {
    runOrderDetailContext();
  }

  //   if (pathname.includes("/order/manage/edit")) {
  //     handleTableChange();
  //   }
}

function waitForTableReady(timeout = 5000) {
  return new Promise(resolve => {
    const target = document.querySelector("table#dgOrders tbody");
    if (!target) return resolve(); // fallback nhanh

    const checkNow = () => {
      const hasRows = target.querySelector("tr");
      if (hasRows) {
        observer.disconnect();
        resolve();
      }
    };

    const observer = new MutationObserver(checkNow);
    observer.observe(target, { childList: true, subtree: true });

    // fallback sau timeout
    setTimeout(() => {
      observer.disconnect();
      resolve();
    }, timeout);
  });
}

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const MAX_THUMB_COUNT = 9;
const THUMB_PLACEHOLDER =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
const ORDER_IMAGE_STATUS_ENDPOINT = "https://uploadimg.baobidaiduong.com/get-image-status.php";
const THUMB_STYLE_ID = "thumbGridStyle";
const BADGE_ATTR = "data-nhanh-ext-badge";
const THUMB_ATTR = "data-nhanh-ext-thumb";
const orderRowRegistry = new Map();
const orderImageStatusCache = new Map();
const pendingOrderStatusIds = new Set();
const insertedOrderImages = new Set();
const externalUploadCache = new Set();
const orderImageUrlCache = new Map();
let thumbLazyObserver = null;
const NO_IMAGE_FLAG_PREFIX = "nhanh-ext-no-image:";
const NO_IMAGE_FLAG_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const NOTE_LINK_SELECTOR = [
  ".orderPrivateDescription",
  ".orderDescription",
  ".orderNote",
  ".orderPublicDescription",
  ".orderStoreDescription",
  "td.hoverDescription p"
].join(", ");
const NOTE_LINK_REGEX = /(https?:\/\/[^\s<]+)/gi;

const batchOrderStatusFetch = debounce(() => {
  if (!pendingOrderStatusIds.size) return;
  const orderIds = Array.from(pendingOrderStatusIds);
  pendingOrderStatusIds.clear();

  console.warn("[NhanhExt] fetch image status", orderIds);
  fetch(ORDER_IMAGE_STATUS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ order_ids: orderIds }),
  })
    .then(res => res.json())
    .then(data => {
      console.warn("[NhanhExt] image status response", data);
      const status = data.status || {};
      const thumbs = data.thumbs || {};

      orderIds.forEach(orderId => {
        const thumbList = Array.isArray(thumbs[orderId]) ? thumbs[orderId].slice(0, MAX_THUMB_COUNT) : [];
        const hasImage =
          Boolean(status[orderId]) ||
          Boolean(status[String(orderId)]) ||
          Boolean(status[Number(orderId)]) ||
          thumbList.length > 0;
        const meta = {
          hasImage,
          thumbs: thumbList,
        };
        orderImageStatusCache.set(orderId, meta);
        applyImageMetaToRow(orderId, meta);
      });
    })
    .catch(() => {
      orderIds.forEach(orderId => showStatusError(orderId));
    });
}, 500);

function queueOrderStatusFetch(orderId) {
  if (orderImageStatusCache.has(orderId)) {
    applyImageMetaToRow(orderId, orderImageStatusCache.get(orderId));
    return;
  }

  pendingOrderStatusIds.add(orderId);
  batchOrderStatusFetch();
}

function applyImageMetaToRow(orderId, meta) {
  const entry = orderRowRegistry.get(orderId);
  if (!entry) return;

  const { idCell, link } = entry;
  if (!link) return;

  addOrderCopyButton(orderId, link);
  const forceNoImage = shouldForceNoImage(orderId);
  const hasImage = forceNoImage ? false : meta.hasImage;
  const thumbs = forceNoImage ? [] : meta.thumbs;
  const text = hasImage ? "✅ Đã có ảnh" : "⚠️ Chưa có ảnh";
  const color = hasImage ? "bg-success" : "bg-danger";
  setStatusBadge(link, text, color);
  renderThumbGrid(idCell, thumbs);
  console.warn("[NhanhExt] apply image meta", { orderId, meta });
}

function showStatusError(orderId) {
  const entry = orderRowRegistry.get(orderId);
  if (!entry) return;
  setStatusBadge(entry.link, "⚠️ Không tải được ảnh", "bg-warning");
}

function setStatusBadge(link, text, colorClass) {
  if (!link) return;
  const container = link.parentElement;
  if (!container) return;

  const prevBadge = container.querySelector(`span[${BADGE_ATTR}="1"]`);
  if (prevBadge) prevBadge.remove();

  const badge = document.createElement("span");
  badge.setAttribute(BADGE_ATTR, "1");
  badge.className = `badge ms-2 ${colorClass}`.trim();
  badge.textContent = text;
  const anchor = getCopyAnchor(link) || link;
  anchor.insertAdjacentElement("afterend", badge);
}

function showPendingBadge(link) {
  setStatusBadge(link, "Đang kiểm tra...", "bg-secondary");
}

function renderThumbGrid(idCell, thumbUrls) {
  if (!idCell) return;

  const existingWrapper = idCell.querySelector(`div[${THUMB_ATTR}="1"]`);
  if (existingWrapper) existingWrapper.remove();

  if (!thumbUrls || !thumbUrls.length) return;

  injectImagePreviewModal();

  const host = document.createElement("div");
  host.setAttribute(THUMB_ATTR, "1");
  host.style.cssText = "margin-top:4px;";

  const shadow = host.attachShadow({ mode: "closed" });

  const style = document.createElement("style");
  style.textContent = `
    .grid { display:flex; flex-wrap:wrap; max-width:110px; }
    .grid img {
      width:32px; height:32px; object-fit:cover; margin:2px;
      border:1px solid #ddd; border-radius:3px; cursor:pointer;
    }
  `;
  shadow.appendChild(style);

  const grid = document.createElement("div");
  grid.className = "grid";

  thumbUrls.forEach(url => {
    if (!url) return;
    const img = document.createElement("img");
    img.src = url;
    img.alt = "";
    img.addEventListener("click", () => showImagePreview(url));
    grid.appendChild(img);
  });

  shadow.appendChild(grid);
  idCell.appendChild(host);
}

function ensureThumbGridStyle() {
  if (document.getElementById(THUMB_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = THUMB_STYLE_ID;
  style.textContent = `
    .thumb-grid {
      display: flex;
      flex-wrap: wrap;
      max-width: 110px;
    }
    .thumb-grid .nhanh-thumb-img {
      display: inline-block;
      flex-shrink: 0;
    }
  `;
  document.head.appendChild(style);
}

function ensureThumbObserver() {
  if (thumbLazyObserver !== null) return thumbLazyObserver || null;

  if (typeof IntersectionObserver === "undefined") {
    thumbLazyObserver = false;
    return null;
  }

  thumbLazyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const realSrc = el.dataset.src;
      if (realSrc) {
        if (el.tagName === "IMG") {
          el.src = realSrc;
        } else {
          el.style.backgroundImage = `url("${realSrc.replace(/["\\]/g, '\\$&')}")`;
        }
        delete el.dataset.src;
      }
      thumbLazyObserver.unobserve(el);
    });
  }, { rootMargin: "40px" });

  return thumbLazyObserver;
}

function getOrderIdLink(row) {
  if (!row) return null;
  const links = Array.from(row.querySelectorAll("a[href*='/order/manage/detail']"));
  return links.find(link => /^\s*\d+\s*$/.test(link.textContent || "")) || null;
}

function getOrderIdCell(row) {
  const link = getOrderIdLink(row);
  if (!link) return null;
  return link.closest("td") || row.querySelector("td:nth-child(2)");
}

function normalizeOrderId(value) {
  const str = String(value || "");
  const digits = str.match(/\d+/g);
  return digits ? digits.join("") : "";
}

function getOrderIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id") || "";
}

function registerOrderRow(row) {
  const link = getOrderIdLink(row);
  const idCell = getOrderIdCell(row);
  if (!idCell || !link) return;

  const orderId = normalizeOrderId(link.textContent);
  if (!orderId) return;

  link.dataset.orderId = orderId;
  orderRowRegistry.set(orderId, { idCell, link });

  if (orderImageStatusCache.has(orderId)) {
    applyImageMetaToRow(orderId, orderImageStatusCache.get(orderId));
    return;
  }

  showPendingBadge(link);
  queueOrderStatusFetch(orderId);
  addOrderCopyButton(orderId, link);
}

function addOrderCopyButton(orderId, link) {
  if (!link || link.parentElement.querySelector(`[data-order-copy="${orderId}"]`)) return;
  const icon = document.createElement("span");
  icon.setAttribute("data-order-copy", orderId);
  icon.textContent = "📋";
  icon.title = "Copy mã đơn";
  icon.style.cssText = "cursor:pointer;margin-left:6px;font-size:25px;line-height:1;";
  icon.addEventListener("click", e => {
    e.preventDefault();
    navigator.clipboard.writeText(orderId).then(() => {
      showCopyToast(`Đã copy đơn ${orderId}`);
    });
  });
  link.insertAdjacentElement("afterend", icon);
}

function getCopyAnchor(link) {
  const orderId = normalizeOrderId(link?.dataset.orderId || link?.innerText);
  if (!orderId) return null;
  return link.parentElement?.querySelector(`[data-order-copy="${orderId}"]`) || null;
}


function handleOrderListPage() {
  const rows = document.querySelectorAll("table#dgOrders tbody tr, table.tableDataGird tbody tr");
  if (!rows.length) return;

  ensureThumbGridStyle();
  injectImagePreviewModal();

  rows.forEach(registerOrderRow);
}





// =================== TRANG CHI TIẾT ĐƠN ===================
async function runOrderDetailContext() {
  const urlParams = new URLSearchParams(location.search);
  const orderId = urlParams.get("id");

  if (!orderId) return;

  const imageUrls = collectAttachmentPreviewEntries().map(entry => entry.url);

  if (imageUrls.length > 0) {
    insertImagesFromPage(orderId, imageUrls);
  }

  checkAndDisplayImageStatus(orderId).catch(() => { });
  observeAttachmentResourceLoads(orderId);
  installAttachmentUploadHooks(orderId);
  observeAttachmentPreviewModal(orderId);
  setupAttachmentDownloadButtons(orderId);
  setTimeout(() => autoFetchAttachmentUrls(orderId), 1200);
  setTimeout(() => updateNoImageFlag(orderId), 1500);

  const idle = window.requestIdleCallback || (cb => setTimeout(cb, 300));
  idle(() => enhanceAttachmentTable());

  // Theo dõi xóa file đính kèm → tự reload
  watchAttachmentDeletesGlobal();
}

// Theo dõi click xóa file đính kèm trên toàn trang detail → reload sau khi xóa
function watchAttachmentDeletesGlobal() {
  if (window.__nhanhDeleteWatchActive) return;
  window.__nhanhDeleteWatchActive = true;

  document.addEventListener("click", (e) => {
    // Nút xóa: <div class="text-danger"><i class="fal fa-trash"></i></div>
    const trashEl = e.target.closest(".fa-trash, .fa-trash-alt, .text-danger");
    if (!trashEl) return;

    // Kiểm tra có phải icon trash thật không
    const hasTrashIcon = trashEl.classList.contains("fa-trash") ||
      trashEl.classList.contains("fa-trash-alt") ||
      trashEl.querySelector(".fa-trash, .fa-trash-alt");
    if (!hasTrashIcon) return;

    console.warn("[NhanhExt] trash icon clicked, scheduling reload after delete");
    setTimeout(() => {
      console.warn("[NhanhExt] reloading after attachment delete");
      window.location.reload();
    }, 2000);
  }, true); // capture phase để bắt trước Angular
}

async function checkAndDisplayImageStatus(orderId) {
  try {
    const res = await fetch(ORDER_IMAGE_STATUS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order_id: orderId }),
    });
    const data = await res.json();

    const shownUrls = Array.isArray(data.shown)
      ? data.shown
      : Array.isArray(data.thumbs)
        ? data.thumbs
        : [];

    if (shownUrls.length) {
      const previewEntries = collectAttachmentPreviewEntries();
      const currentUrls = previewEntries.map(entry => entry.url);

      previewEntries.forEach(entry => {
        if (!shownUrls.includes(entry.url) && entry.row) {
          entry.row.style.opacity = 0.3;
        }
      });

      const hiddenUrls = shownUrls.filter(url => !currentUrls.includes(url));
      if (hiddenUrls.length) {
        await fetch("https://uploadimg.baobidaiduong.com/update-hidden-images.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order_id: orderId, hidden_images: hiddenUrls }),
        });
      }
    }
  } catch (e) {
    // ignore
  }
}

function insertImagesFromPage(orderId, imageUrls) {
  const filtered = (imageUrls || []).filter(Boolean);
  if (!filtered.length) return;

  const cache = orderImageUrlCache.get(orderId) || new Set();
  const newUrls = [];
  filtered.forEach(url => {
    if (!cache.has(url)) {
      cache.add(url);
      newUrls.push(url);
    }
  });
  if (!newUrls.length) return;
  orderImageUrlCache.set(orderId, cache);

  const allUrls = Array.from(cache);
  console.warn("[NhanhExt] insert images", { orderId, urls: allUrls });
  fetch("https://uploadimg.baobidaiduong.com/insert-image.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ order_id: orderId, images: allUrls, is_shown: 1 })
  })
    .then(res => {
      if (!res.ok) {
        console.warn("[NhanhExt] insert images failed", { orderId, status: res.status });
        newUrls.forEach(url => cache.delete(url));
        return null;
      }
      console.warn("[NhanhExt] insert images success", { orderId, count: allUrls.length });
      return res;
    })
    .catch(() => {
      console.warn("[NhanhExt] insert images error", { orderId });
      newUrls.forEach(url => cache.delete(url));
    });
}

async function uploadOrderImages(orderId, files) {
  let hasUploadError = false;
  const uploadedUrls = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("order_id", orderId);

    try {
      const res = await fetch("https://uploadimg.baobidaiduong.com/index.php", {
        method: "POST",
        body: formData,
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        hasUploadError = true;
      } else {
        const uploadedUrl = extractUploadedUrl(data);
        if (uploadedUrl) uploadedUrls.push(uploadedUrl);
      }
    } catch (e) {
      hasUploadError = true;
    }
  }

  if (uploadedUrls.length) {
    try {
      await fetch("https://uploadimg.baobidaiduong.com/insert-image.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderId, images: uploadedUrls }),
      });
      console.warn("[NhanhExt] inserted images", { orderId, count: uploadedUrls.length });
    } catch (err) {
      // ignore insert errors
    }
  }

  return { ok: !hasUploadError, urls: uploadedUrls };
}

async function syncExternalUploads(files) {
  const orderId = getOrderIdFromUrl();
  if (!orderId || !files || !files.length) return { ok: false, urls: [] };

  const pending = [...files].filter(file => {
    const key = `${orderId}::${file.name}::${file.size}::${file.lastModified}`;
    if (externalUploadCache.has(key)) return false;
    externalUploadCache.add(key);
    return true;
  });

  if (!pending.length) return { ok: true, urls: [] };
  console.warn("[NhanhExt] sync external uploads", { orderId, count: pending.length });
  return uploadOrderImages(orderId, pending);
}

function extractUploadedUrl(response) {
  if (!response) return null;
  if (typeof response === "string") return response;
  if (response.url && typeof response.url === "string") return response.url;
  if (response.data) {
    if (typeof response.data === "string") return response.data;
    if (typeof response.data.url === "string") return response.data.url;
    if (Array.isArray(response.data) && response.data.length) {
      const candidate = response.data.find(item => typeof item === "string");
      if (candidate) return candidate;
    }
  }
  if (Array.isArray(response.urls) && response.urls.length) return response.urls[0];
  if (Array.isArray(response.files) && response.files.length && response.files[0].url) {
    return response.files[0].url;
  }
  return null;
}

function setupDragDropUpload() {
  if (document.getElementById("nhanhDropZoneWrapper")) return;
  const attachmentRoot = getAttachmentRoot();
  if (!attachmentRoot) {
    // Retry sau 1.5s nếu DOM chưa sẵn sàng
    setTimeout(() => setupDragDropUpload(), 1500);
    return;
  }

  const dropZone = document.createElement("div");
  dropZone.id = "nhanhDropZoneWrapper";
  dropZone.innerHTML = `
    <div id="nhanhDropZoneInner" style="border:2px dashed #4CAF50; border-radius:10px; padding:14px; margin:10px 0; text-align:center; background:#f8f9fa; transition:border-color .2s, background .2s;">
        📤 <strong>Kéo thả</strong> hoặc <strong>dán ảnh (Ctrl/Cmd + V)</strong> để upload
    </div>
    <input id="pasteBoxDetailUpload" type="text"
           placeholder="👉 Click vào đây rồi dán ảnh (Ctrl/Cmd + V)…"
           style="margin-top:8px;padding:10px 12px;border:1px dashed #aaa;border-radius:6px;
                  min-height:44px;background:#fff;outline:none;width:100%;box-sizing:border-box;
                  font-size:14px;color:#555;cursor:text;transition:border-color .2s;" />
    <div id="pastePreviewDetail" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;"></div>
    <div id="pasteStatusDetail" style="margin-top:6px;font-size:13px;color:#555;min-height:18px;"></div>
  `;
  attachmentRoot.prepend(dropZone);

  const innerZone = document.getElementById("nhanhDropZoneInner");
  const pastePreview = document.getElementById("pastePreviewDetail");
  const pasteStatus = document.getElementById("pasteStatusDetail");

  const setStatus = (text, color = "#555") => {
    if (pasteStatus) { pasteStatus.textContent = text; pasteStatus.style.color = color; }
  };

  const renderPreview = (files) => {
    if (!pastePreview) return;
    pastePreview.innerHTML = "";
    [...files].forEach(file => {
      if (file.type.startsWith("image/")) {
        const img = document.createElement("img");
        img.style.cssText = "width:80px;height:80px;object-fit:cover;border:1px solid #ccc;border-radius:4px;";
        const reader = new FileReader();
        reader.onload = () => (img.src = reader.result);
        reader.readAsDataURL(file);
        pastePreview.appendChild(img);
      } else {
        const chip = document.createElement("div");
        chip.style.cssText = "padding:6px 8px;border:1px solid #ccc;border-radius:4px;background:#fff;font-size:13px;";
        chip.textContent = file.name;
        pastePreview.appendChild(chip);
      }
    });
  };

  // Tìm native file input + nút Upload của Nhanh
  const fileInput = getAttachmentFileInput();

  const setFilesToNativeInput = (files) => {
    if (!fileInput) {
      console.warn("[NhanhExt] no native file input found on detail page");
      return false;
    }
    const dt = new DataTransfer();
    [...files].forEach(f => { if (f && f.size) dt.items.add(f); });
    fileInput.files = dt.files;
    fileInput.dispatchEvent(new Event('change', { bubbles: true }));
    return dt.files.length > 0;
  };


  const doUpload = async (files) => {
    setStatus("Đang upload…", "#0d6efd");
    renderPreview(files);

    // Đặt file vào native input → để Nhanh tự upload
    const ok = setFilesToNativeInput(files);
    if (ok) {
      setStatus("✅ Đã chọn file, đang upload qua Nhanh…", "#198754");
      // Sync thêm lên server ngoài (best-effort)
      syncExternalUploads(files).catch(() => { });
      // Reload sau 3s để cập nhật
      setTimeout(() => {
        setStatus("✅ Đang reload trang…", "#198754");
        window.location.reload();
      }, 3000);
    } else {
      // Fallback: upload trực tiếp nếu không tìm thấy native input
      const orderId = new URLSearchParams(location.search).get("id");
      if (!orderId) return alert("Không xác định được order_id");
      try {
        const result = await uploadOrderImages(orderId, files);
        if (result.ok) {
          setStatus("✅ Upload hoàn tất! Đang reload trang…", "#198754");
          setTimeout(() => window.location.reload(), 1500);
        } else {
          setStatus("❌ Upload gặp lỗi, vui lòng thử lại.", "#dc3545");
        }
      } catch (err) {
        console.warn("[NhanhExt] upload error", err);
        setStatus("❌ Upload gặp lỗi, vui lòng thử lại.", "#dc3545");
      }
    }
  };

  // ===== Drag & Drop =====
  dropZone.addEventListener("dragover", e => {
    e.preventDefault();
    if (innerZone) { innerZone.style.borderColor = "#2ecc71"; innerZone.style.background = "#e8f5e9"; }
  });
  dropZone.addEventListener("dragleave", () => {
    if (innerZone) { innerZone.style.borderColor = "#4CAF50"; innerZone.style.background = "#f8f9fa"; }
  });
  dropZone.addEventListener("drop", async e => {
    e.preventDefault();
    if (innerZone) { innerZone.style.borderColor = "#4CAF50"; innerZone.style.background = "#f8f9fa"; }
    const files = [...e.dataTransfer.files].filter(f => f.size > 0);
    if (!files.length) return;
    doUpload(files);
  });

  // ===== Paste Upload =====
  const pasteBox = document.getElementById("pasteBoxDetailUpload");
  if (pasteBox) {
    pasteBox.addEventListener("focus", () => { pasteBox.style.borderColor = "#4CAF50"; });
    pasteBox.addEventListener("blur", () => { pasteBox.style.borderColor = "#aaa"; });

    pasteBox.addEventListener("paste", async (e) => {
      const items = e.clipboardData?.items || [];
      const picked = [];
      for (const it of items) {
        if (it.kind === "file") {
          const blob = it.getAsFile();
          if (!blob) continue;
          const ext = blob.type.split("/")[1] || "png";
          const fname = `paste_${Date.now()}_${picked.length}.${ext}`;
          picked.push(new File([blob], fname, { type: blob.type }));
        }
      }
      if (!picked.length) return;
      e.preventDefault();
      pasteBox.value = "";
      console.warn("[NhanhExt] paste files (detail)", { count: picked.length, names: picked.map(f => f.name) });
      doUpload(picked);
    });
  }
}


function createImagePreviewModal() {
  if (document.querySelector("#imagePreviewModal")) return;

  const modal = document.createElement("div");
  modal.id = "imagePreviewModal";
  modal.style = `
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        display: none;
    `;
  modal.innerHTML = `
        <img id="imagePreviewModalImg" 
            style="max-width: 90vw; max-height: 90vh; object-fit: contain; border: 4px solid white; border-radius: 8px; box-shadow: 0 0 10px black;" />
        <div style="margin-top: 20px;">
            <button id="prevImageBtn" class="btn btn-light me-2">⬅ Prev</button>
            <button id="nextImageBtn" class="btn btn-light">Next ➡</button>
        </div>
        `;

  document.body.appendChild(modal);

  document.getElementById("closePreviewBtn").onclick = () => {
    modal.style.display = "none";
    document.getElementById("imagePreviewContent").innerHTML = '';
  };
}

function showImagePreview(url) {
  let modal = document.getElementById("imagePreviewModal");
  let modalImg = document.getElementById("imagePreviewModalImg");

  // Nếu chưa có thì inject luôn
  if (!modal || !modalImg) {
    injectImagePreviewModal();
    modal = document.getElementById("imagePreviewModal");
    modalImg = document.getElementById("imagePreviewModalImg");
  }

  modalImg.src = url;
  modal.style.display = "flex";
}




function observeOrderRows() {
  const tbodies = document.querySelectorAll("table#dgOrders tbody, table.tableDataGird tbody");
  if (!tbodies.length) {
    ensureOrderTableObserver();
    return;
  }

  if (window.__nhanhOrderTableObserver) {
    window.__nhanhOrderTableObserver.disconnect();
    window.__nhanhOrderTableObserver = null;
  }

  ensureThumbGridStyle();
  injectImagePreviewModal();

  tbodies.forEach(tbody => {
    tbody.querySelectorAll("tr").forEach(registerOrderRow);

    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1 && node.tagName === "TR") {
            registerOrderRow(node);
          }
        });
      });
    });

    observer.observe(tbody, { childList: true });
  });
}

function ensureOrderTableObserver() {
  if (window.__nhanhOrderTableObserver) return;
  const observer = new MutationObserver(() => {
    const tbodies = document.querySelectorAll("table#dgOrders tbody, table.tableDataGird tbody");
    if (tbodies.length) {
      observer.disconnect();
      window.__nhanhOrderTableObserver = null;
      observeOrderRows();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
  window.__nhanhOrderTableObserver = observer;

  setTimeout(() => {
    if (window.__nhanhOrderTableObserver) {
      window.__nhanhOrderTableObserver.disconnect();
      window.__nhanhOrderTableObserver = null;
    }
  }, 8000);
}


function injectImagePreviewModal() {
  if (document.getElementById("imagePreviewModal")) return;

  const modal = document.createElement("div");
  modal.id = "imagePreviewModal";
  modal.style = `
        display: none;
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.95);
        z-index: 9999;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 20px;
    `;

  modal.innerHTML = `
        <img id="imagePreviewModalImg" style="max-width: 90vw; max-height: 90vh; border: 3px solid #fff; border-radius: 6px;" />
    `;

  // Bấm chuột hoặc ESC để đóng
  modal.addEventListener("click", () => {
    modal.style.display = "none";
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.style.display = "none";
    }
  });

  document.body.appendChild(modal);
}

// Cache QR code by orderId+amount to avoid redundant API calls
const qrCodeCache = new Map();

function addQRCodeButton() {
  const rows = document.querySelectorAll("table#dgOrders tbody tr, table.tableDataGird tbody tr");
  rows.forEach(row => {
    const link = getOrderIdLink(row);
    const idCell = getOrderIdCell(row);
    if (!idCell || !link || link.dataset.qrAppended) return;

    const orderId = normalizeOrderId(link.textContent);
    if (!orderId) return;

    // Tìm số tiền thanh toán
    const paymentLabel = row.querySelector("label.text-success");
    const rawAmount = paymentLabel?.innerText.replace(/[^\d]/g, "") || "0";
    const amount = parseInt(rawAmount, 10);

    // Đánh dấu đã xử lý
    link.dataset.qrAppended = "true";

    // Tạo nút QR
    const btn = document.createElement("button");
    btn.className = "btn btn-sm btn-warning mt-1";
    btn.innerText = "Tạo mã QR";

    // Debounced QR generation to avoid multiple API calls
    btn.onclick = debounce(() => generateQRCode(orderId, amount, btn), 300);

    idCell.appendChild(document.createElement("br"));
    idCell.appendChild(btn);
  });
}


async function generateQRCode(orderId, amount, container) {
  const cacheKey = `${orderId}_${amount}`;
  // Avoid duplicate QR images (e.g. from rapid clicks)
  if (container.nextSibling && container.nextSibling.tagName === "IMG" && container.nextSibling.alt === "QR Code") {
    return;
  }
  if (qrCodeCache.has(cacheKey)) {
    // Use cached QR
    const qrDataURL = qrCodeCache.get(cacheKey);
    const img = document.createElement("img");
    img.src = qrDataURL;
    img.alt = "QR Code";
    img.style.maxWidth = "180px";
    img.classList.add("mt-2");
    container.insertAdjacentElement("afterend", img);
    return;
  }

  const payload = {
    accountNo: "66996899",
    accountName: "CONG TY TNHH SAN XUAT XNK DAI DUONG",
    acqId: "970407",
    amount: amount,
    addInfo: `Thanh toan DH ${orderId}`,
    format: "image"
  };
  try {
    const res = await fetch("https://api.vietqr.io/v2/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data.code === "00" && data.data && data.data.qrDataURL) {
      qrCodeCache.set(cacheKey, data.data.qrDataURL);
      const img = document.createElement("img");
      img.src = data.data.qrDataURL;
      img.alt = "QR Code";
      img.style.maxWidth = "180px";
      img.classList.add("mt-2");
      container.insertAdjacentElement("afterend", img);
    } else {
      alert("Không tạo được mã QR, thử lại sau.");
    }
  } catch (err) {
    alert("Lỗi kết nối tới hệ thống tạo mã QR.");
  }
}





var vatStatic = 0;

window.copyVAT = function (value, label = "Giá trị") {
  navigator.clipboard.writeText(`${value}`);
  showCopyToast(`${label} đã copy: ${Number(value).toLocaleString("vi-VN")} đ`);
};

function showCopyToast(message) {
  let toast = document.getElementById("nhanhCopyToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "nhanhCopyToast";
    toast.style.cssText = `
      position: fixed;
      top: 16px;
      right: 16px;
      background: rgba(0, 0, 0, 0.85);
      color: #fff;
      padding: 10px 16px;
      border-radius: 6px;
      font-size: 14px;
      z-index: 99999;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      opacity: 0;
      transform: translateY(-10px);
      transition: opacity .3s ease, transform .3s ease;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  });
  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-10px)";
  }, 2000);
}

function handleTableChange() {
  ensureVatBox();
  renderVatMetrics();
  initVatObservers();
  ensureSelfShippingChecked();
}

function ensureVatBox() {
  if (document.querySelector("#tienVAT")) return;
  const header = findProductHeader();
  if (!header) return;
  const div = document.createElement("div");
  div.id = "nhanhVatBox";
  div.style.marginTop = "6px";
  div.style.padding = "0 12px";
  div.innerHTML = `
    VAT 8%: <span id='tienVAT'> 0đ </span> |
    VAT PVC: <span id='tienVatPVC'> 0đ </span>
  `;
  header.appendChild(div);
}

function initVatObservers() {
  const totalEl = document.querySelector(".totalProductPrice");
  const pvcInput = findPvcInput();
  const schedule = debounce(renderVatMetrics, 150);

  if (totalEl && !totalEl.dataset.nhanhVatObserved) {
    const observer = new MutationObserver(schedule);
    observer.observe(totalEl, { childList: true, characterData: true, subtree: true, attributes: true });
    totalEl.dataset.nhanhVatObserved = "1";
  }

  if (pvcInput && !pvcInput.dataset.nhanhVatObserved) {
    ["input", "change"].forEach(evt => pvcInput.addEventListener(evt, schedule));
    pvcInput.dataset.nhanhVatObserved = "1";
  }
}

function ensureSelfShippingChecked() {
  const checkbox = document.querySelector("#useTransformer");
  if (!checkbox || checkbox.checked) return;
  checkbox.click();
}

function renderVatMetrics() {
  const total = getTotalProductPrice();
  const vat = Math.round(0.08 * total);
  const pvcFee = getPvcFee();
  const vatPVC = Math.round(0.08 * (total + pvcFee));

  updateVatLine("tienVAT", vat, "btnCopyVAT", "VAT 8%", "color:green;");
  updateVatLine("tienVatPVC", vatPVC, "btnCopyVatPVC", "VAT PVC", "color:#6f42c1;");
}

function parseMoney(value) {
  const digits = String(value || "").replace(/[^\d]/g, "");
  return digits ? parseInt(digits, 10) : 0;
}

function getTotalProductPrice() {
  const totalEl = document.querySelector(".totalProductPrice");
  if (!totalEl) return 0;
  const attrValue = totalEl.getAttribute("data-totalprice");
  return parseMoney(attrValue) || parseMoney(totalEl.textContent);
}

function findPvcInput() {
  return (
    document.querySelector("#customerShipFee") ||
    document.querySelector("input[placeholder='Phí ship báo khách']") ||
    document.querySelector("input[placeholder*='Phí ship']")
  );
}

function getPvcFee() {
  const pvcInput = findPvcInput();
  return pvcInput ? parseMoney(pvcInput.value) : 0;
}

function updateVatLine(spanId, value, btnId, label, colorStyle) {
  const container = document.getElementById(spanId);
  if (!container) return;
  const currentValue = parseInt(container.textContent.replace(/[^\d]/g, "") || "0", 10);
  if (currentValue === value) return;
  container.innerHTML = `<a href="#" id="${btnId}" style="${colorStyle} cursor:pointer">${value.toLocaleString("vi-VN")} đ</a>`;
  const btn = document.getElementById(btnId);
  if (btn) {
    btn.onclick = e => {
      e.preventDefault();
      copyVAT(value, label);
    };
  }
}


let arrayAvailable = {
  "Phí Vận chuyển": "Phí Vận Chuyển",
  "VAT 8%": "VAT 8%",
}

function availableItem() {
  const existingContainer = document.getElementById("nhanh-available-container");
  if (existingContainer) existingContainer.remove();

  let html = "";
  Object.entries(arrayAvailable).forEach(([key, value]) => {
    html += `<button val="${value}" class="btn btn-success btnaVailable me-1 mb-1">${key}</button>`;
  });

  const tableWrap = document.querySelector(".tableProduct");
  const anchor = tableWrap || document.querySelector("app-product-add-order .card-body");
  if (!anchor) return;

  const container = document.createElement("div");
  container.id = "nhanh-available-container";
  container.className = "px-2 pt-2";
  const wrapper = document.createElement("div");
  wrapper.id = "nhanh-available-buttons";
  wrapper.className = "d-flex flex-wrap align-items-center";
  wrapper.innerHTML = html;
  container.appendChild(wrapper);
  if (tableWrap) {
    tableWrap.insertAdjacentElement("beforebegin", container);
  } else {
    anchor.prepend(container);
  }

  handleButtonSanPham();
}

function findProductHeader() {
  const candidates = document.querySelectorAll("app-product-add-order .card-header");
  for (const header of candidates) {
    const title = header.querySelector(".card-title");
    if (title && title.textContent.includes("Sản phẩm")) {
      return header;
    }
  }
  return document.querySelector("app-product-add-order .card-header");
}
function handleButtonSanPham() {
  document.querySelectorAll(".btnaVailable").forEach(btn => {
    btn.addEventListener("click", () => {
      const value = btn.getAttribute("val") || "";
      triggerProductSearchAuto(value);
    });
  });
}

function triggerProductSearchAuto(query) {
  // Tìm input tìm kiếm sản phẩm
  let targetInput = document.querySelector("app-c-product-suggestion input.form-control.radius-right-0") ||
    document.querySelector("app-c-product-suggestion input.form-control") ||
    document.querySelector("input[name='tbLoadProduct']") ||
    document.querySelector("input.suggestProductBox");

  // Fallback search nếu không tìm thấy
  if (!targetInput) {
    const inputs = document.querySelectorAll("input[placeholder*='sản phẩm'], input[formcontrolname='searchProduct'], input[placeholder*='F3']");
    inputs.forEach(inp => {
      if (inp.offsetParent !== null) targetInput = inp;
    });
  }

  if (!targetInput) {
    console.warn("[NhanhExt] Không tìm thấy ô tìm kiếm sản phẩm");
    return;
  }

  targetInput.focus();
  targetInput.click(); // Trigger any focus-based dropdowns

  // Set value using prototype để đảm bảo framework detection (Angular/React compatible)
  const proto = window.HTMLInputElement.prototype;
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(proto, "value").set;
  nativeInputValueSetter.call(targetInput, query);

  // Dispatch events
  targetInput.dispatchEvent(new Event('input', { bubbles: true }));
  targetInput.dispatchEvent(new Event('change', { bubbles: true }));

  // Trigger KeyUp để fire search
  setTimeout(() => {
    targetInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    targetInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'End', bubbles: true }));

    // Đợi và tự động chọn suggestion
    let attempts = 0;
    const autoSelectInterval = setInterval(() => {
      attempts++;
      const suggestions = document.querySelectorAll("ul.search-result li, .search-result li, .dropdown-menu li, [role='option']");

      if (suggestions.length > 0) {
        // Tìm exact match hoặc item đầu tiên nếu query cụ thể
        let targetLi = null;
        suggestions.forEach(li => {
          const text = li.textContent.trim();
          if (text.includes(query) || text === query) {
            targetLi = li;
          }
        });

        if (!targetLi && suggestions.length > 0) targetLi = suggestions[0]; // Fallback to first

        if (targetLi) {
          targetLi.click(); // Select it
          console.warn("[NhanhExt] Đã auto chọn:", query);
          clearInterval(autoSelectInterval);
        }
      }

      if (attempts > 20) clearInterval(autoSelectInterval); // Stop after 2s (20 * 100ms)
    }, 100);
  }, 10);
}

function autoClickShippingAndVAT() {
  // Chỉ chạy trên trang add order, không chạy trên trang edit theo yêu cầu
  if (!window.location.href.includes("manage/add")) {
    return;
  }

  // Kiểm tra xem đã auto click chưa
  if (window.__nhanhAutoClickedShippingVAT) {
    return;
  }
  window.__nhanhAutoClickedShippingVAT = true;

  // Đợi DOM render và các nút available xuất hiện
  setTimeout(() => {
    // Auto click "Phí Vận chuyển" trước
    setTimeout(() => {
      triggerProductSearchAuto("Phí Vận Chuyển");

      // Sau đó auto click "VAT 8%"
      setTimeout(() => {
        triggerProductSearchAuto("VAT 8%");
      }, 1500); // Đợi 1.5s giữa 2 lần click
    }, 500);
  }, 1500); // Đợi 1.5s để đảm bảo trang đã load xong
}

function injectCustomUploadZone() {
  // Bỏ qua nếu setupDragDropUpload() đã tạo zone trên trang detail
  if (document.getElementById('nhanhDropZoneWrapper')) return;
  const fileInput = getAttachmentFileInput();
  if (!fileInput || fileInput.closest('#customUploadZone')) return;

  ensureUploadProgressStyle();
  hideLegacyUploadButton();

  // Vùng bao
  const wrapper = document.createElement('div');
  wrapper.id = 'customUploadZone';
  wrapper.style.cssText = `
    border:2px dashed #4CAF50;border-radius:10px;padding:18px;margin-bottom:10px;
    background:#f8f9fa;color:#333;position:relative
  `;

  // Hàng 1: Hướng dẫn + nút chọn file
  const guide = document.createElement('div');
  guide.innerHTML = `
    <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
      <strong>Kéo thả / Bấm chọn ảnh để upload</strong>
      <button id="btnOpenPicker" class="btn btn-success btn-sm">Chọn file…</button>
      <small style="color:gray">(jpg, png, pdf… &lt; 8MB)</small>
    </div>
  `;

  // Hàng 2: Ô dán ảnh (Ctrl/Cmd+V)
  const pasteBox = document.createElement('input');
  pasteBox.id = 'pasteBoxUpload';
  pasteBox.type = 'text';
  pasteBox.placeholder = 'Dán ảnh vào đây (Ctrl/Cmd + V)…';
  pasteBox.style.cssText = `
    margin-top:10px;padding:10px;border:1px dashed #aaa;border-radius:6px;
    min-height:44px;background:#fff;outline:none;width:100%;
  `;

  // Preview
  const preview = document.createElement('div');
  preview.id = 'previewContainer';
  preview.style.cssText = 'display:flex;flex-wrap:wrap;gap:10px;margin-top:10px;';

  // Status line
  const statusLine = document.createElement('div');
  statusLine.id = 'uploadStatusLine';
  statusLine.style.cssText = 'margin-top:8px;font-size:13px;color:#555;min-height:18px;';
  statusLine.textContent = 'Chưa chọn tệp nào.';

  const progressWrapper = document.createElement('div');
  progressWrapper.style.cssText = 'margin-top:4px;height:6px;border-radius:999px;background:#e5e5e5;overflow:hidden;display:none;';
  const progressBar = document.createElement('div');
  progressBar.style.cssText = 'height:100%;width:0%;background:#0d6efd;transition:width .2s ease;';
  progressWrapper.appendChild(progressBar);

  // Ghép DOM
  fileInput.style.display = 'none';
  fileInput.parentElement.insertBefore(wrapper, fileInput);
  wrapper.appendChild(guide);
  guide.querySelector('#btnOpenPicker').addEventListener('click', () => fileInput.click());
  wrapper.appendChild(pasteBox);
  wrapper.appendChild(preview);
  wrapper.appendChild(statusLine);
  wrapper.appendChild(progressWrapper);
  wrapper.appendChild(fileInput); // giữ input bên trong vùng để logic sẵn có của Nhanh vẫn chạy

  const setStatus = (text, color = '#555') => {
    statusLine.textContent = text;
    statusLine.style.color = color;
  };

  const showProgress = (pct, indeterminate = false) => {
    if (typeof pct === 'number') {
      const val = Math.max(0, Math.min(100, pct));
      progressBar.style.width = `${val}%`;
    }
    progressWrapper.style.display = 'block';
    if (indeterminate) {
      progressBar.classList.add('nhanh-indeterminate');
    } else {
      progressBar.classList.remove('nhanh-indeterminate');
    }
  };

  const hideProgress = () => {
    progressWrapper.style.display = 'none';
    progressBar.classList.remove('nhanh-indeterminate');
    progressBar.style.width = '0%';
  };

  let fakeProgressTimer = null;
  let fakeProgressValue = 0;
  const startFakeProgress = () => {
    if (fakeProgressTimer) return;
    fakeProgressValue = Math.max(15, fakeProgressValue || 15);
    showProgress(fakeProgressValue, false);
    fakeProgressTimer = setInterval(() => {
      if (fakeProgressValue >= 99) return;
      fakeProgressValue = Math.min(99, fakeProgressValue + 8);
      showProgress(fakeProgressValue, false);
    }, 90);
  };
  const stopFakeProgress = () => {
    if (fakeProgressTimer) clearInterval(fakeProgressTimer);
    fakeProgressTimer = null;
    fakeProgressValue = 0;
  };

  const handleUploadStatusEvent = (event) => {
    const detail = event.detail || {};
    if (!detail.state) return;
    if (detail.state === 'start') {
      setStatus(detail.text || 'Đang upload…', '#0d6efd');
      if (typeof detail.pct === 'number') {
        stopFakeProgress();
        showProgress(detail.pct);
      } else {
        startFakeProgress();
      }
    } else if (detail.state === 'progress') {
      const pct = typeof detail.pct === 'number' ? `${Math.round(detail.pct)}%` : '';
      const suffix = detail.text ? ` (${detail.text})` : '';
      setStatus(pct ? `Đang upload ${pct}${suffix}` : `Đang upload${suffix}`, '#0d6efd');
      if (typeof detail.pct === 'number') {
        stopFakeProgress();
        showProgress(detail.pct);
      } else {
        startFakeProgress();
      }
    } else if (detail.state === 'done') {
      stopFakeProgress();
      if (detail.ok) {
        showProgress(100);
      } else {
        hideProgress();
      }
      setStatus(detail.ok ? 'Upload hoàn tất' : 'Upload thất bại', detail.ok ? '#198754' : '#dc3545');
      if (detail.ok) {
        triggerAttachmentSyncFromUpload();
        console.warn("[NhanhExt] scheduling reload after upload");
        setTimeout(() => {
          window.location.reload();
          setTimeout(() => {
            window.location.href = window.location.href;
          }, 800);
        }, 1500);
        setTimeout(() => {
          if (statusLine.textContent === 'Upload hoàn tất') {
            setStatus('Đã sẵn sàng cho lần upload tiếp theo.');
          }
          hideProgress();
        }, 2000);
      } else {
        setTimeout(hideProgress, 2000);
      }
    }
  };

  window.addEventListener('nhanhUploadStatus', handleUploadStatusEvent);

  // Util: set files vào input & phát change
  const setFilesToInput = (files) => {
    const dt = new DataTransfer();
    let count = 0;
    [...files].forEach((f) => {
      if (!f || !f.size) return;
      dt.items.add(f);
      count += 1;
    });
    fileInput.files = dt.files;
    fileInput.dispatchEvent(new Event('change', { bubbles: true }));
    if (count) {
      console.warn("[NhanhExt] files selected", { count, names: [...dt.files].map(f => f.name) });
      setStatus('Đang upload…', '#0d6efd');
      startFakeProgress();
      scheduleReloadAfterUpload(dt.files);
    } else {
      setStatus('Chưa chọn tệp nào.');
      hideProgress();
    }
  };

  // Preview helper
  const renderPreview = (files) => {
    preview.innerHTML = '';
    [...files].forEach((file) => {
      if (file.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.style.cssText = 'width:80px;height:80px;object-fit:cover;border:1px solid #ccc;border-radius:4px';
        const reader = new FileReader();
        reader.onload = () => (img.src = reader.result);
        reader.readAsDataURL(file);
        preview.appendChild(img);
      } else {
        const chip = document.createElement('div');
        chip.style.cssText = 'padding:6px 8px;border:1px solid #ccc;border-radius:4px;background:#fff';
        chip.textContent = file.name;
        preview.appendChild(chip);
      }
    });
  };

  // 1) Chọn file bình thường
  fileInput.addEventListener('change', (e) => {
    console.warn("[NhanhExt] input change", { count: e.target.files.length });
    renderPreview(e.target.files);
    if (!e.target.files.length) {
      setStatus('Chưa chọn tệp nào.');
      hideProgress();
      return;
    }
    scheduleReloadAfterUpload(e.target.files);
    window.dispatchEvent(new CustomEvent('nhanhUploadStatus', { detail: { state: 'start', text: 'Đang đồng bộ ảnh…' } }));
    syncExternalUploads(e.target.files)
      .then(result => {
        console.warn("[NhanhExt] sync external uploads done", result);
        // Luôn báo thành công vì Nhanh đã upload xong, sync server ngoài chỉ là phụ
        window.dispatchEvent(new CustomEvent('nhanhUploadStatus', { detail: { state: 'done', ok: true } }));
      })
      .catch(() => {
        console.warn("[NhanhExt] sync external uploads failed (best-effort)");
        // Vẫn báo thành công vì upload chính qua Nhanh đã OK
        window.dispatchEvent(new CustomEvent('nhanhUploadStatus', { detail: { state: 'done', ok: true } }));
      });
  });

  // 2) Kéo & thả
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((evt) =>
    wrapper.addEventListener(evt, (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (evt === 'dragover') wrapper.style.borderColor = '#2ecc71';
      if (evt === 'dragleave' || evt === 'drop') wrapper.style.borderColor = '#4CAF50';
    })
  );
  wrapper.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    console.warn("[NhanhExt] drop files", { count: files.length });
    setFilesToInput(files);
    renderPreview(files);
  });

  // 3) Dán từ clipboard
  pasteBox.addEventListener('paste', async (e) => {
    const items = e.clipboardData?.items || [];
    const picked = [];
    for (const it of items) {
      if (it.kind === 'file') {
        const blob = it.getAsFile();
        if (!blob) continue;
        // Đặt tên file hợp lý
        const ext = blob.type.split('/')[1] || 'png';
        const fname = `paste_${Date.now()}.${ext}`;
        const file = new File([blob], fname, { type: blob.type });
        picked.push(file);
      }
    }
    if (picked.length === 0) return; // không có ảnh trong clipboard

    e.preventDefault(); // tránh dán base64 vào div
    console.warn("[NhanhExt] paste files", { count: picked.length, names: picked.map(f => f.name) });
    pasteBox.value = '';
    setFilesToInput(picked);
    renderPreview(picked);
    scheduleReloadAfterUpload(picked);

    // (TÙY CHỌN) Tự tìm nút Upload & click — nếu muốn auto-upload, bỏ comment 2 dòng dưới:
    // const uploadBtn = [...document.querySelectorAll('button, input[type="button"], a.btn')]
    //   .find(b => /(^|\s)upload(\s|$)/i.test((b.innerText||b.value||'').trim())); uploadBtn?.click();
  });

  // Focus ô dán khi mở trang cho tiện thao tác
  fileInput.multiple = true;
}

function triggerAttachmentSyncFromUpload() {
  const orderId = getOrderIdFromUrl();
  if (!orderId) return;
  setTimeout(() => autoFetchAttachmentUrls(orderId), 800);
}

function scheduleReloadAfterUpload(files) {
  if (!files || !files.length) return;
  if (window.__nhanhUploadReloadScheduled) return;
  window.__nhanhUploadReloadScheduled = true;
  console.warn("[NhanhExt] scheduling reload after upload (fallback)");
  const forceReload = () => {
    console.warn("[NhanhExt] forcing reload");
    window.location.reload();
    setTimeout(() => window.location.assign(window.location.href), 500);
    setTimeout(() => window.location.replace(window.location.href), 900);
  };
  setTimeout(forceReload, 2500);
  setTimeout(forceReload, 5000);
  setTimeout(forceReload, 8000);
}

function ensureUploadProgressStyle() {
  if (document.getElementById('nhanhUploadProgressStyle')) return;
  const style = document.createElement('style');
  style.id = 'nhanhUploadProgressStyle';
  style.textContent = `
    .nhanh-indeterminate {
      background-image: linear-gradient(90deg, rgba(255,255,255,0.3) 25%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.3) 75%);
      background-size: 200% 100%;
      animation: nhanhIndeterminate 1s linear infinite;
    }
    @keyframes nhanhIndeterminate {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `;
  document.head.appendChild(style);
}

function hideLegacyUploadButton() {
  const legacyBtn = document.querySelector("span.filename.btn.btn-success.cursor-pointer");
  if (legacyBtn) {
    legacyBtn.style.setProperty("display", "none", "important");
  }
}

function enhanceAttachmentTable() {
  const table = getAttachmentTable();
  if (!table) return;

  hideLegacyUploadButton();
  ensureAttachmentThumbStyle();
  renderAttachmentThumbnails();
  watchAttachmentDeletes(table);

  const tbody = table.querySelector("tbody");
  if (tbody && !tbody.dataset.nhanhThumbObserver) {
    const observer = new MutationObserver(() => renderAttachmentThumbnails());
    observer.observe(tbody, { childList: true });
    tbody.dataset.nhanhThumbObserver = "1";
  }
}

// Theo dõi nút xóa file đính kèm → tự reload trang sau khi xóa
function watchAttachmentDeletes(table) {
  if (table.dataset.nhanhDeleteWatch) return;
  table.dataset.nhanhDeleteWatch = "1";

  // Bắt click vào nút xóa: <div class="text-danger"><i class="fal fa-trash"></i></div>
  table.addEventListener("click", (e) => {
    const isTrashIcon = e.target.closest(".fa-trash, .fa-trash-alt, div.text-danger");
    if (!isTrashIcon) return;
    // Đảm bảo đang trong cột cuối cùng (cột cài đặt)
    const td = e.target.closest("td");
    if (!td || td !== td.parentElement?.lastElementChild) return;

    console.warn("[NhanhExt] attachment delete clicked, scheduling reload");
    setTimeout(() => {
      console.warn("[NhanhExt] reloading after attachment delete");
      window.location.reload();
    }, 2000);
  });

  // Fallback: theo dõi DOM — nếu một row bị xóa khỏi tbody thì cũng reload
  const tbody = table.querySelector("tbody");
  if (tbody) {
    const deleteObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.removedNodes.length > 0) {
          const hasRemovedRow = [...m.removedNodes].some(n => n.nodeType === 1 && n.tagName === "TR");
          if (hasRemovedRow) {
            console.warn("[NhanhExt] attachment row removed, scheduling reload");
            setTimeout(() => window.location.reload(), 1500);
            deleteObserver.disconnect();
            return;
          }
        }
      }
    });
    deleteObserver.observe(tbody, { childList: true });
  }
}

function renderAttachmentThumbnails() {
  const table = getAttachmentTable();
  if (!table) return;
  const rows = table.querySelectorAll("tbody tr");
  let hasThumb = false;
  rows.forEach(row => {
    const firstCell = row.querySelector("td");
    if (!firstCell) return;
    const src = getAttachmentImageUrlFromRow(row);
    let wrapper = row.querySelector("[data-nhanh-attach-thumb]");

    if (!src) {
      if (wrapper) wrapper.remove();
      return;
    }
    hasThumb = true;

    if (!wrapper) {
      wrapper = document.createElement("div");
      wrapper.setAttribute("data-nhanh-attach-thumb", "1");
      wrapper.className = "nhanh-attach-thumb";
      firstCell.insertBefore(wrapper, firstCell.firstChild);
    }

    let img = wrapper.querySelector("img");
    if (!img) {
      img = document.createElement("img");
      wrapper.appendChild(img);
    }
    if (img.src !== src) {
      img.src = src;
    }
  });

  if (hasThumb) {
    removeAttachmentFallbackGrid();
  } else {
    tryRenderAttachmentFallbackThumbs(rows.length);
  }
}

function ensureAttachmentThumbStyle() {
  if (document.getElementById("nhanhAttachThumbStyle")) return;
  const style = document.createElement("style");
  style.id = "nhanhAttachThumbStyle";
  style.textContent = `
    .nhanh-attach-thumb {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      margin-right: 6px;
    }
    .nhanh-attach-thumb img {
      width: 36px;
      height: 36px;
      object-fit: cover;
      border-radius: 4px;
      border: 1px solid #ddd;
    }
  `;
  document.head.appendChild(style);
}

const orderDetailThumbCache = new Map();
const ATTACHMENT_THUMB_GRID_ID = "nhanhAttachmentThumbGrid";

function tryRenderAttachmentFallbackThumbs(rowCount = 0) {
  const orderId = new URLSearchParams(location.search).get("id");
  if (!orderId) return;
  renderAttachmentFallbackThumbs(orderId, rowCount);
}

async function renderAttachmentFallbackThumbs(orderId, rowCount = 0) {
  if (!orderId) return;
  if (orderDetailThumbCache.has(orderId)) {
    renderThumbGridFromUrls(orderDetailThumbCache.get(orderId), rowCount);
    return;
  }

  try {
    const res = await fetch(ORDER_IMAGE_STATUS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order_id: orderId }),
    });
    const data = await res.json();
    const thumbs = Array.isArray(data.thumbs)
      ? data.thumbs
      : Array.isArray(data.shown)
        ? data.shown
        : [];
    if (!thumbs.length) return;
    orderDetailThumbCache.set(orderId, thumbs);
    renderThumbGridFromUrls(thumbs, rowCount);
  } catch (err) {
    // ignore
  }
}

function renderThumbGridFromUrls(urls, rowCount = 0) {
  const root = getAttachmentRoot();
  if (!root || !urls.length) return;

  const limitedUrls =
    rowCount > 0 && urls.length > rowCount ? urls.slice(-rowCount) : urls;

  let grid = root.querySelector(`#${ATTACHMENT_THUMB_GRID_ID}`);
  if (!grid) {
    grid = document.createElement("div");
    grid.id = ATTACHMENT_THUMB_GRID_ID;
    grid.style.cssText = "display:flex;flex-wrap:wrap;gap:6px;padding:8px 12px;";
    const tableWrapper = root.querySelector(".table-responsive");
    if (tableWrapper) {
      tableWrapper.insertAdjacentElement("beforebegin", grid);
    } else {
      root.appendChild(grid);
    }
  }

  grid.innerHTML = "";
  limitedUrls.forEach(url => {
    if (!url) return;
    const img = document.createElement("img");
    img.src = url;
    img.alt = "Attachment";
    img.style.cssText = "width:48px;height:48px;object-fit:cover;border:1px solid #ddd;border-radius:4px;cursor:pointer;";
    img.addEventListener("click", () => showImagePreview(url));
    grid.appendChild(img);
  });
}

function removeAttachmentFallbackGrid() {
  const grid = document.getElementById(ATTACHMENT_THUMB_GRID_ID);
  if (grid) grid.remove();
}

function getAttachmentRoot() {
  return document.querySelector("#boxFileAttachment") || document.querySelector("app-upload-file-attachment");
}

function getAttachmentTable() {
  const root = getAttachmentRoot();
  return root?.querySelector("table") || null;
}

function getAttachmentFileInput() {
  const root = getAttachmentRoot();
  return root?.querySelector("input[type='file']") || null;
}

function getAttachmentImageUrlFromRow(row) {
  if (!row) return null;
  const sourceNode = row.querySelector("[data-source]");
  const dataSource = sourceNode?.getAttribute("data-source");
  if (dataSource) return dataSource;
  const styled = row.querySelector("[style*='background-image']");
  const styledUrl = styled ? extractUrlFromStyle(styled.style.backgroundImage) : null;
  if (styledUrl) return styledUrl;
  const img = row.querySelector("img[src]");
  if (img?.src) return img.src;
  const link = row.querySelector("a[href]");
  if (link?.href && /\.(png|jpe?g|gif|webp|bmp|svg|pdf)(\?|#|$)/i.test(link.href)) {
    return link.href;
  }
  const attrUrl = findAttachmentUrlInAttributes(row);
  if (attrUrl) return attrUrl;
  return null;
}

function collectAttachmentPreviewEntries() {
  const root = getAttachmentRoot();
  if (!root) return [];

  const entries = [];
  const seen = new Set();

  root.querySelectorAll("a.preview, [data-source]").forEach(node => {
    const url = node.getAttribute("data-source") || node.getAttribute("href");
    if (!url || seen.has(url)) return;
    seen.add(url);
    entries.push({ url, row: node.closest("tr") });
  });

  root.querySelectorAll("img[src]").forEach(img => {
    const url = img.src;
    if (!url || seen.has(url)) return;
    seen.add(url);
    entries.push({ url, row: img.closest("tr") });
  });

  root.querySelectorAll("[style*='background-image']").forEach(node => {
    const url = extractUrlFromStyle(node.style.backgroundImage);
    if (!url || seen.has(url)) return;
    seen.add(url);
    entries.push({ url, row: node.closest("tr") });
  });

  root.querySelectorAll("a[href]").forEach(link => {
    const url = link.href;
    if (!url || seen.has(url)) return;
    if (!/\.(png|jpe?g|gif|webp|bmp|svg|pdf)(\?|#|$)/i.test(url)) return;
    seen.add(url);
    entries.push({ url, row: link.closest("tr") });
  });

  const table = getAttachmentTable();
  if (table) {
    table.querySelectorAll("tbody tr").forEach(row => {
      const url = getAttachmentImageUrlFromRow(row);
      if (!url || seen.has(url)) return;
      seen.add(url);
      entries.push({ url, row });
    });
  }

  return entries;
}

function extractUrlFromStyle(styleValue) {
  if (!styleValue) return null;
  const match = /url\(["']?([^"')]+)["']?\)/i.exec(styleValue);
  return match ? match[1] : null;
}

function findAttachmentUrlInAttributes(root) {
  const candidates = root.querySelectorAll("*");
  const urlRegex = /https?:\/\/[^\s"'<>]+?\.(png|jpe?g|gif|webp|bmp|svg|pdf)(\?|#|$)/i;
  const relRegex = /\/(attachments|uploads|upload|files|file)\/[^\s"'<>]+?\.(png|jpe?g|gif|webp|bmp|svg|pdf)(\?|#|$)/i;
  for (const node of candidates) {
    for (const attr of node.attributes || []) {
      const val = attr.value;
      if (!val) continue;
      const urlMatch = val.match(urlRegex);
      if (urlMatch) return urlMatch[0];
      const relMatch = val.match(relRegex);
      if (relMatch) return `${location.origin}${relMatch[0]}`;
    }
  }
  return null;
}

function isAttachmentUrl(url) {
  if (!url) return false;
  return /\/attachments\//i.test(url) && /\.(png|jpe?g|gif|webp|bmp|pdf)(\?|#|$)/i.test(url);
}

async function autoFetchAttachmentUrls(orderId) {
  if (!orderId) return;
  const table = getAttachmentTable();
  if (!table) return;
  const rows = [...table.querySelectorAll("tbody tr")];
  const collected = [];
  const cleanupHide = hidePreviewOverlay();
  const stopAutoClose = startAutoClosePreviewDialogs();
  document.body.classList.add("nhanh-auto-previewing");
  let lastUrl = window.__nhanhLastPreviewUrl || "";
  for (const row of rows) {
    if (row.dataset.nhanhPreviewChecked) continue;
    const btn = row.querySelector("app-c-image-prp .image-box span.cursor-pointer");
    if (!btn) continue;
    const url = await fetchPreviewUrlFromButton(btn, lastUrl);
    if (url && url !== lastUrl) {
      console.warn("[NhanhExt] auto preview url", url);
      collected.push(url);
      row.dataset.nhanhPreviewChecked = "1";
      lastUrl = url;
    }
  }
  document.body.classList.remove("nhanh-auto-previewing");
  stopAutoClose();
  cleanupHide();
  window.__nhanhLastPreviewUrl = lastUrl;
  if (collected.length) {
    console.warn("[NhanhExt] auto preview urls collected", collected);
    insertImagesFromPage(orderId, collected);
  }

  const remaining = rows.filter(r => !r.dataset.nhanhPreviewChecked).length;
  if (remaining) {
    window.__nhanhAutoPreviewAttempts = (window.__nhanhAutoPreviewAttempts || 0) + 1;
    if (window.__nhanhAutoPreviewAttempts <= 3) {
      setTimeout(() => autoFetchAttachmentUrls(orderId), 1500);
    }
  }
}

function fetchPreviewUrlFromButton(btn, lastUrl = "") {
  return new Promise(resolve => {
    let done = false;
    const cleanup = (result) => {
      if (done) return;
      done = true;
      observer.disconnect();
      clearInterval(pollTimer);
      clearTimeout(timeout);
      closePreviewOverlay();
      if (result) console.warn("[NhanhExt] preview url resolved", result);
      resolve(result || null);
    };

    const observer = new MutationObserver(() => {
      const imgs = [...document.querySelectorAll("app-img-custom img[src]")];
      const candidate = imgs.map(i => i.src).find(src => isAttachmentUrl(src) && (!lastUrl || src !== lastUrl));
      if (candidate) cleanup(candidate);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["src"]
    });
    const pollTimer = setInterval(() => {
      const imgs = [...document.querySelectorAll("app-img-custom img[src]")];
      const candidate = imgs.map(i => i.src).find(src => isAttachmentUrl(src) && (!lastUrl || src !== lastUrl));
      if (candidate) cleanup(candidate);
    }, 120);
    const timeout = setTimeout(() => cleanup(null), 4000);

    btn.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
  });
}

function closePreviewOverlay() {
  document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
  const closeBtn = document.querySelector(
    "ngb-modal-window [data-bs-dismiss='modal'], ngb-modal-window [aria-label='Close'], ngb-modal-window .btn-close, .modal [data-bs-dismiss='modal'], .modal .btn-close, .modal .close"
  );
  if (closeBtn) {
    closeBtn.click();
  }
  hideModalElements();
  const ngbBackdrop = document.querySelector("ngb-modal-backdrop");
  if (ngbBackdrop) {
    ngbBackdrop.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
  }
  const overlay = document.querySelector(".cdk-overlay-backdrop");
  if (overlay) {
    overlay.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
  }
}

function hidePreviewOverlay() {
  const styleId = "nhanhHidePreviewStyle";
  if (document.getElementById(styleId)) return () => { };
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    body.nhanh-auto-previewing .cdk-overlay-container,
    body.nhanh-auto-previewing .cdk-overlay-backdrop,
    body.nhanh-auto-previewing .cdk-overlay-pane,
    body.nhanh-auto-previewing .mat-dialog-container,
    body.nhanh-auto-previewing .modal,
    body.nhanh-auto-previewing .modal-backdrop,
    body.nhanh-auto-previewing ngb-modal-window,
    body.nhanh-auto-previewing ngb-modal-backdrop,
    body.nhanh-auto-previewing .modal-dialog,
    body.nhanh-auto-previewing .modal-content,
    body.nhanh-auto-previewing .img-custom,
    body.nhanh-auto-previewing app-img-custom,
    body.nhanh-auto-previewing app-img-custom img,
    body.nhanh-auto-previewing [class*="img-preview"],
    body.nhanh-auto-previewing [class*="image-preview"],
    body.nhanh-auto-previewing [class*="preview-modal"] {
      position: fixed !important;
      top: -9999px !important;
      left: -9999px !important;
      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none !important;
    }
  `;
  document.head.appendChild(style);
  return () => {
    const el = document.getElementById(styleId);
    if (el) el.remove();
  };
}

function startAutoClosePreviewDialogs() {
  const closeIfOpen = () => {
    const closeBtn = document.querySelector(
      "ngb-modal-window [data-bs-dismiss='modal'], ngb-modal-window [aria-label='Close']"
    );
    if (closeBtn) {
      closeBtn.click();
      hideModalElements();
      return true;
    }
    const ngbBackdrop = document.querySelector("ngb-modal-backdrop");
    if (ngbBackdrop) {
      ngbBackdrop.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
      hideModalElements();
      return true;
    }
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    hideModalElements();
    return false;
  };

  const modalObserver = new MutationObserver(() => {
    if (document.querySelector("ngb-modal-window")) {
      closeIfOpen();
    }
  });
  modalObserver.observe(document.body, { childList: true, subtree: true });

  const timer = setInterval(() => {
    closeIfOpen();
  }, 200);
  return () => {
    clearInterval(timer);
    modalObserver.disconnect();
  };
}

function hideModalElements() {
  document.querySelectorAll("ngb-modal-window, ngb-modal-backdrop, .modal, .modal-backdrop").forEach(el => {
    if (el instanceof HTMLElement) {
      el.style.display = "none";
      el.style.opacity = "0";
      el.style.pointerEvents = "none";
    }
  });
  document.body.classList.remove("modal-open");
  document.body.style.removeProperty("overflow");
  document.body.style.removeProperty("padding-right");
}

function observeAttachmentPreviewModal(orderId) {
  if (!orderId || window.__nhanhAttachmentPreviewObserver) return;
  const root = document.querySelector("#boxFileAttachment") || document.body;
  const observer = new MutationObserver(() => {
    const img = document.querySelector("app-img-custom img[src]");
    if (!img?.src || !isAttachmentUrl(img.src)) return;
    console.warn("[NhanhExt] preview img detected", img.src);
    insertImagesFromPage(orderId, [img.src]);
  });
  observer.observe(root, { childList: true, subtree: true });
  window.__nhanhAttachmentPreviewObserver = observer;
}

function setupAttachmentDownloadButtons(orderId) {
  if (!orderId || window.__nhanhAttachmentDownloadHooked) return;
  const root = getAttachmentRoot();
  if (!root) return;

  const bindButtons = () => {
    root.querySelectorAll("app-c-download-file button, button.download-bt").forEach(btn => {
      if (btn.dataset.nhanhDownloadBound) return;
      btn.dataset.nhanhDownloadBound = "1";
      btn.addEventListener("click", () => {
        console.warn("[NhanhExt] download clicked");
      });
    });
  };

  bindButtons();
  const observer = new MutationObserver(bindButtons);
  observer.observe(root, { childList: true, subtree: true });
  window.__nhanhAttachmentDownloadHooked = true;
}

function installAttachmentUploadHooks(orderId) {
  if (!orderId || window.__nhanhAttachmentUploadHooked) return;
  window.__nhanhAttachmentUploadHooked = true;

  const handleUrls = urls => {
    if (!hasAttachmentRows()) {
      console.warn("[NhanhExt] skip attachment sync (no rows)");
      return;
    }
    const list = urls.filter(isAttachmentUrl);
    if (list.length) insertImagesFromPage(orderId, list);
  };

  const extractUrlsFromText = text => {
    if (!text) return [];
    const matches = text.match(/https?:\/\/[^"'\\s]+/gi) || [];
    return matches.filter(isAttachmentUrl);
  };

  const collectUrlsFromValue = (value, out) => {
    if (!value) return;
    if (typeof value === "string") {
      if (isAttachmentUrl(value)) out.add(value);
      extractUrlsFromText(value).forEach(url => out.add(url));
      return;
    }
    if (Array.isArray(value)) {
      value.forEach(item => collectUrlsFromValue(item, out));
      return;
    }
    if (typeof value === "object") {
      Object.values(value).forEach(item => collectUrlsFromValue(item, out));
    }
  };

  const tryExtractFromPayload = payload => {
    const found = new Set();
    collectUrlsFromValue(payload, found);
    handleUrls(Array.from(found));
  };

  const originalFetch = window.fetch;
  if (originalFetch && !window.__nhanhAttachmentFetchPatched) {
    window.fetch = async (...args) => {
      const res = await originalFetch(...args);
      try {
        const url = res.url || "";
        if (isAttachmentUrl(url)) {
          console.warn("[NhanhExt] attachment fetched", url);
          handleUrls([url]);
          return res;
        }
        const contentType = res.headers.get("content-type") || "";
        if (/upload|attach|file|attachment/i.test(url) || /json|text/i.test(contentType)) {
          const clone = res.clone();
          const text = await clone.text();
          tryExtractFromPayload(JSON.parse(text));
          handleUrls(extractUrlsFromText(text));
        }
      } catch (e) {
        // ignore
      }
      return res;
    };
    window.__nhanhAttachmentFetchPatched = true;
  }

  if (!window.__nhanhAttachmentXhrPatched) {
    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function (method, url, async, user, pass) {
      this.__nhanhUrl = String(url || "");
      return originalOpen.apply(this, arguments);
    };

    XMLHttpRequest.prototype.send = function (body) {
      const handleResponse = () => {
        try {
          const url = this.responseURL || this.__nhanhUrl || "";
          const ct = this.getResponseHeader("content-type") || "";
          if (isAttachmentUrl(url)) {
            console.warn("[NhanhExt] attachment xhr", url);
            handleUrls([url]);
            return;
          }
          if (!/upload|attach|file|attachment/i.test(url) && !/json|text/i.test(ct)) return;
          const text = typeof this.responseText === "string" ? this.responseText : "";
          if (!text) return;
          tryExtractFromPayload(JSON.parse(text));
          handleUrls(extractUrlsFromText(text));
        } catch (e) {
          // ignore
        }
      };

      this.addEventListener("load", handleResponse);
      return originalSend.apply(this, arguments);
    };

    window.__nhanhAttachmentXhrPatched = true;
  }
}

function observeAttachmentResourceLoads(orderId) {
  if (!orderId || window.__nhanhAttachmentObserver) return;

  const seen = new Set();
  const handleUrl = url => {
    if (!isAttachmentUrl(url) || seen.has(url)) return;
    if (!hasAttachmentRows()) {
      console.warn("[NhanhExt] skip attachment resource (no rows)", url);
      return;
    }
    seen.add(url);
    insertImagesFromPage(orderId, [url]);
  };

  try {
    performance.getEntriesByType("resource").forEach(entry => handleUrl(entry.name));
  } catch (e) {
    // ignore
  }

  const observer = new PerformanceObserver(list => {
    list.getEntries().forEach(entry => handleUrl(entry.name));
  });

  observer.observe({ entryTypes: ["resource"] });
  window.__nhanhAttachmentObserver = observer;
}

function hasAttachmentRows() {
  const table = getAttachmentTable();
  if (!table) return false;
  return Boolean(table.querySelector("tbody tr"));
}

function setNoImageFlag(orderId, hasImages) {
  if (!orderId) return;
  try {
    const key = `${NO_IMAGE_FLAG_PREFIX}${orderId}`;
    if (hasImages) {
      localStorage.removeItem(key);
      return;
    }
    localStorage.setItem(key, JSON.stringify({ ts: Date.now() }));
  } catch (e) {
    // ignore storage errors
  }
}

function shouldForceNoImage(orderId) {
  if (!orderId) return false;
  try {
    const key = `${NO_IMAGE_FLAG_PREFIX}${orderId}`;
    const raw = localStorage.getItem(key);
    if (!raw) return false;
    const data = JSON.parse(raw);
    const ts = Number(data?.ts || 0);
    if (!ts || Date.now() - ts > NO_IMAGE_FLAG_TTL_MS) {
      localStorage.removeItem(key);
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}

function updateNoImageFlag(orderId) {
  const previewEntries = collectAttachmentPreviewEntries();
  const hasImages = previewEntries.length > 0 || hasAttachmentRows();
  setNoImageFlag(orderId, hasImages);
}

function setupCheckButtonsForNotes() {
  if (window.__nhanhCheckBtnObserver) return;

  const applyButtons = root => {
    const scopes = root
      ? [root, ...(root.querySelectorAll?.(".modal-content") ?? [])]
      : [document.body, ...document.querySelectorAll(".modal-content")];

    scopes.forEach(scope => {
      if (!(scope instanceof Element)) return;
      const configs = [
        {
          textarea: scope.querySelector("#descriptionContent"),
          label: scope.querySelector("label[for='descriptionContent']"),
        },
        {
          textarea: scope.querySelector("#privateDescriptionContent"),
          label: scope.querySelector("label[for='privateDescriptionContent']"),
        },
      ];

      configs.forEach(cfg => {
        const { textarea, label } = cfg;
        if (!textarea || !label || label.querySelector("[data-check-btn='1']")) return;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = "Đã check";
        btn.className = "btn btn-sm btn-outline-primary";
        btn.setAttribute("data-check-btn", "1");
        btn.style.marginLeft = "8px";
        btn.addEventListener("click", () => prependCheckToTextarea(textarea));
        label.appendChild(btn);
      });
    });
  };

  applyButtons();
  const observer = new MutationObserver(mutations => {
    mutations.forEach(m => {
      m.addedNodes.forEach(node => {
        if (!(node instanceof Element)) return;
        if (node.matches?.(".modal-content") || node.querySelector?.(".modal-content")) {
          applyButtons(node);
        }
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
  window.__nhanhCheckBtnObserver = observer;
}

function prependCheckToTextarea(textarea) {
  if (!textarea) return;
  const prefix = "Đã check";
  const current = textarea.value || "";
  if (current.trimStart().startsWith(prefix)) return;
  const rest = current.trimStart();
  const newValue = rest ? `${prefix}\n${rest}` : prefix;
  textarea.value = newValue;
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
}

function setupClickableNoteLinks() {
  if (!document.body) return;
  enhanceNoteLinkTargets(document.body);

  if (window.__nhanhNoteLinkObserver) return;

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (!(node instanceof Element)) return;
        enhanceNoteLinkTargets(node);
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
  window.__nhanhNoteLinkObserver = observer;
}

function enhanceNoteLinkTargets(scope) {
  if (!scope) return;
  let nodes = [];

  if (scope instanceof Element && scope.matches(NOTE_LINK_SELECTOR)) {
    nodes = [scope];
  } else if (scope.querySelectorAll) {
    nodes = Array.from(scope.querySelectorAll(NOTE_LINK_SELECTOR));
  }

  nodes.forEach(el => makeNoteLinksClickable(el));
}

function makeNoteLinksClickable(element) {
  if (!element) return;

  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      if (node.parentElement && node.parentElement.closest("a")) return NodeFilter.FILTER_REJECT;
      NOTE_LINK_REGEX.lastIndex = 0;
      return NOTE_LINK_REGEX.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });

  const textNodes = [];
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  textNodes.forEach(textNode => {
    const text = textNode.nodeValue;
    NOTE_LINK_REGEX.lastIndex = 0;
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    let match;

    while ((match = NOTE_LINK_REGEX.exec(text)) !== null) {
      if (match.index > lastIndex) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      }

      const linkText = match[0];
      const anchor = document.createElement("a");
      anchor.href = linkText;
      anchor.textContent = linkText;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      anchor.style.wordBreak = "break-all";
      fragment.appendChild(anchor);

      lastIndex = match.index + linkText.length;
    }

    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    textNode.parentNode.replaceChild(fragment, textNode);
  });
}

// === [HUD UPLOAD + PROGRESS ROBUST] =========================================
function setupUploadProgressUI() {
  if (window.__nhanhUploadHUDInstalled) return;
  const uploadInput = getAttachmentFileInput();
  if (!uploadInput) return;
  window.__nhanhUploadHUDInstalled = true;

  // HUD
  const hud = document.createElement('div');
  hud.id = 'nhanhUploadHUD';
  hud.style.cssText = `
    position:fixed;right:16px;bottom:16px;z-index:999999;
    min-width:280px;max-width:360px;background:#111;color:#fff;
    border-radius:10px;box-shadow:0 6px 24px rgba(0,0,0,.35);
    padding:12px 14px;display:none;font-size:14px;line-height:1.35;
  `;
  hud.innerHTML = `
    <div id="nhanhHUDTitle" style="font-weight:700;margin-bottom:6px">Đang upload…</div>
    <div id="nhanhHUDText" style="opacity:.9;margin-bottom:8px">Chuẩn bị bắt đầu</div>
    <div style="height:10px;background:#333;border-radius:6px;overflow:hidden">
      <div id="nhanhHUDBar" style="height:100%;width:0%;background:#2ecc71;transition:width .15s"></div>
    </div>
  `;
  document.body.appendChild(hud);

  const dispatchUploadStatus = (detail) => {
    console.warn("[NhanhExt] upload status", detail);
    window.dispatchEvent(new CustomEvent('nhanhUploadStatus', { detail }));
  };

  const showHUD = (text = 'Đang upload…') => {
    hud.style.display = 'block';
    document.getElementById('nhanhHUDTitle').textContent = 'Đang upload…';
    document.getElementById('nhanhHUDText').textContent = text;
    document.getElementById('nhanhHUDBar').style.width = '0%';
  };
  const updateHUD = (pct, text) => {
    const bar = document.getElementById('nhanhHUDBar');
    bar.style.width = `${Math.max(0, Math.min(100, pct))}%`;
    if (text) document.getElementById('nhanhHUDText').textContent = text;
  };
  const doneHUD = (ok = true) => {
    document.getElementById('nhanhHUDTitle').textContent = ok ? '✅ Upload hoàn tất' : '❌ Upload lỗi';
    updateHUD(100);
    setTimeout(() => hud.style.display = 'none', 1200);
  };

  // Bật HUD khi bấm nút Upload (dù không bắt được % vẫn có “indeterminate”)
  const guessUploadButton = () => {
    const root = getAttachmentRoot() || document;
    const buttons = [...root.querySelectorAll('button, input[type="button"], a.btn')];
    return buttons.find(b => /upload|tải\s*lên|đính\s*kèm/i.test((b.innerText || b.value || '').trim()));
  };
  const hookButton = () => {
    const btn = guessUploadButton();
    if (!btn || btn.__nhanhHooked) return;
    btn.__nhanhHooked = true;
    btn.addEventListener('click', () => {
      const fi = getAttachmentFileInput();
      const n = fi?.files?.length || 0;
      showHUD(n ? `Có ${n} tệp, đang gửi…` : 'Đang gửi tệp…');
      dispatchUploadStatus({ state: 'start', text: n ? `Có ${n} tệp, đang gửi…` : 'Đang gửi tệp…' });
      startIndeterminateFallback();
    }, true);
  };
  const mo = new MutationObserver(hookButton);
  mo.observe(document.documentElement, { childList: true, subtree: true });
  hookButton();

  // Fallback “indeterminate” (khi không có % thật)
  let fallbackTimer = null, fallbackPct = 8;
  const startIndeterminateFallback = () => {
    clearInterval(fallbackTimer);
    fallbackPct = 8;
    dispatchUploadStatus({ state: 'progress', pct: fallbackPct, text: 'Đang tải lên…' });
    fallbackTimer = setInterval(() => {
      fallbackPct = (fallbackPct + 7) % 96;
      updateHUD(fallbackPct, 'Đang tải lên…');
      dispatchUploadStatus({ state: 'progress', pct: fallbackPct, text: 'Đang tải lên…' });
    }, 200);
  };
  const stopIndeterminateFallback = () => { clearInterval(fallbackTimer); fallbackTimer = null; };

  // Patch XHR để bắt % (ưu tiên theo FormData POST bất kể URL)
  const _open = XMLHttpRequest.prototype.open;
  const _send = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function (method, url, async, user, pass) {
    this.__nhanhMeta = { method: String(method || '').toUpperCase(), url: String(url || '') };
    return _open.apply(this, arguments);
  };

  XMLHttpRequest.prototype.send = function (body) {
    try {
      const isPost = this.__nhanhMeta && this.__nhanhMeta.method === 'POST';
      const isFormData = (typeof FormData !== 'undefined') && (body instanceof FormData);
      const hasFileField = isFormData && [...body.keys()].some(k => /file|upload|attach|attachment|image|anh/i.test(k));
      const isCandidate = isPost && (isFormData || /upload|attach|file|attachment/i.test(this.__nhanhMeta.url));

      if (isCandidate && this.upload) {
        stopIndeterminateFallback();
        showHUD('Đang tải lên máy chủ…');
        dispatchUploadStatus({ state: 'start', text: 'Đang tải lên máy chủ…' });

        // Gắn listener chuẩn (độ phủ cao hơn onprogress)
        this.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const pct = Math.round((e.loaded / e.total) * 100);
            updateHUD(pct, `Đã gửi ${formatBytes(e.loaded)} / ${formatBytes(e.total)}`);
            dispatchUploadStatus({
              state: 'progress',
              pct,
              text: `Đã gửi ${formatBytes(e.loaded)} / ${formatBytes(e.total)}`
            });
          } else {
            // Server/Trình duyệt không báo length ⇒ chạy fallback
            startIndeterminateFallback();
            dispatchUploadStatus({ state: 'progress', text: 'Đang tải lên…' });
          }
        });

        this.addEventListener('load', () => {
          stopIndeterminateFallback();
          doneHUD(true);
          dispatchUploadStatus({ state: 'done', ok: true });
        });
        this.addEventListener('error', () => {
          stopIndeterminateFallback();
          doneHUD(false);
          dispatchUploadStatus({ state: 'done', ok: false });
        });
        this.addEventListener('abort', () => {
          stopIndeterminateFallback();
          doneHUD(false);
          dispatchUploadStatus({ state: 'done', ok: false });
        });

        // Nếu không có file key nhưng vẫn FormData, vẫn giữ HUD (một số hệ thống dùng key khác)
      }
    } catch (err) {
    }
    return _send.apply(this, arguments);
  };

  function formatBytes(b) {
    if (typeof b !== 'number') return '';
    const u = ['B', 'KB', 'MB', 'GB']; let i = 0, n = b;
    while (n >= 1024 && i < u.length - 1) { n /= 1024; i++; }
    return `${n.toFixed(n < 10 && i > 0 ? 1 : 0)} ${u[i]}`;
  }
}

// KHỞI ĐỘNG
window.addEventListener('load', () => {
  setTimeout(injectCustomUploadZone, 1000);
  setTimeout(setupUploadProgressUI, 1000);
});

})();

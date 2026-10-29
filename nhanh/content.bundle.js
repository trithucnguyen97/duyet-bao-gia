/* Nhanh.vn V2 — content.bundle.js v1.0.0 (đã ký; build 2026-10-29T03:38:52.986Z) */
(function () {
  if (window["__payload_content_bundle_js"]) return;
  window["__payload_content_bundle_js"] = "1.0.0";
  try { document.documentElement.setAttribute("data-nhx-payload", "1.0.0"); } catch (e) {}
const CONFIG = {
    SELECTORS: {
        PRODUCT_ROWS: [
            "#dgOrders tr",
            "#dgProductIndex tr",
            ".tableDataGird tbody tr",
            "table.table tbody tr"
        ]
    }
};

// === SĐT → BẢNG GIÁ KHÁCH ===
const BANGGIA_BASE = "https://banggia.baobidaiduong.com";
const CUSTOMER_PHONE_MAP = {
    "0935775115": { id: 23, name: "Thành Phạm", hash: "THANH_PHAM" },
    // thêm khách: "0901234567": { id: 45, name: "Tên KH", hash: "TEN_KH" },
};
let lastDetectedPhone = null;

let globalTapePrices = null;
let isFetchingPrices = false;
const PRICE_CACHE_TTL_MS = 30 * 60 * 1000; // bảng giá cache 30 phút, hết hạn thì tải lại nền

// Chuẩn hóa tên sản phẩm để so khớp: Nhanh có tên nhập bằng dấu nhân "×", API banggia dùng chữ "x";
// khoảng trắng thừa / hoa thường cũng không được làm lệch kết quả.
function normalizeProductName(name) {
    return String(name || "")
        .replace(/\s*\([A-Za-z0-9_.\-]+\)\s*$/, "") // bỏ mã sản phẩm nối sau tên, vd "... - 3 lớp (TP01649)"
        .replace(/[×✕✖]/g, "x")
        .replace(/\s*x\s*/gi, " x ")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
}

let normalizedPriceMap = null;
let normalizedPriceSource = null;
function lookupPrice(tapePrices, name) {
    if (!tapePrices || !name) return undefined;
    if (tapePrices[name] !== undefined) return tapePrices[name];
    if (normalizedPriceSource !== tapePrices) {
        normalizedPriceMap = {};
        Object.keys(tapePrices).forEach(k => { normalizedPriceMap[normalizeProductName(k)] = tapePrices[k]; });
        normalizedPriceSource = tapePrices;
    }
    return normalizedPriceMap[normalizeProductName(name)];
}
let columnIndices = null;
let activePriceMode = 'default'; // 'default' | 'customer_XX'

function formatCurrency(value) {
    return value !== undefined && value !== "Chưa có dữ liệu" ? value.toLocaleString("vi-VN") + " đ" : value;
}

function getProductRows() {
    for (const selector of CONFIG.SELECTORS.PRODUCT_ROWS) {
        const rows = document.querySelectorAll(selector);
        if (rows.length) return rows;
    }
    return [];
}

function detectColumnIndices() {
    const headers = document.querySelectorAll(".tableDataGird thead tr th, #dgOrders thead tr th, #dgProductIndex thead tr th, table.table thead tr th");
    if (!headers.length) return null;

    const indices = {
        id: -1, product: -1, price: -1, cost: -1, qty: -1, total: -1, sold: -1, inventory: -1
    };

    headers.forEach((th, index) => {
        const text = th.textContent.trim().toLowerCase();
        const title = th.querySelector("span")?.getAttribute("title")?.toLowerCase() || "";
        const icon = th.querySelector("i");

        if (text === "id" || title === "id") indices.id = index;
        // Lấy cột "Sản phẩm" ĐẦU TIÊN khớp; loại trừ "VAT sản phẩm" để không bị ghi đè index
        else if (indices.product === -1 && !text.includes("vat") && (text.includes("tên") || title.includes("tên") || text.includes("sản phẩm") || title.includes("sản phẩm") || th.classList.contains("dgColProduct"))) indices.product = index;
        // Edit Page Headers
        else if (text === "giá nhập" || title === "giá nhập") indices.cost = index;
        // Fixed Price Logic: Exclude 'Total' ('Giá trị', 'Tổng') from 'Price'
        else if (
            (text === "giá" || title === "giá" || text === "đơn giá") ||
            (
                (text.includes("giá") || title.includes("giá")) &&
                !text.includes("nhập") &&
                !text.includes("vốn") &&
                !text.includes("bán") &&
                !text.includes("trị") &&
                !text.includes("tổng") &&
                !text.includes("thành tiền")
            )
        ) indices.price = index;
        else if (text.includes("tồn") || title.includes("tồn") || (icon && icon.classList.contains("fa-home"))) indices.inventory = index;
        else if (icon && icon.classList.contains("fa-truck")) indices.sold = index;
        else if ((text.includes("bán") || title.includes("bán")) && indices.sold === -1) indices.sold = index;
        else if (text.includes("sl") || text.includes("số lượng") || title.includes("số lượng") || text === "sl") indices.qty = index;
        else if (text.includes("thành tiền") || title.includes("thành tiền") || text.includes("giá trị") || text.includes("tổng")) indices.total = index;
    });
    return indices;
}

function fetchTapePricesSafely() {
    const customerInfo = detectCustomerPhone();
    const newMode = customerInfo ? `customer_${customerInfo.id}` : 'default';

    if (newMode !== activePriceMode) {
        activePriceMode = newMode;
        globalTapePrices = null;
        document.querySelectorAll('[data-processed]').forEach(el => delete el.dataset.processed);
        document.querySelectorAll('.nhanh-ext-edit-profit, .nhanh-ext-row-profit').forEach(el => el.remove());
    }

    if (globalTapePrices) return globalTapePrices;

    const cacheKey = activePriceMode === 'default' ? 'tapePrices' : `tapePrices_${activePriceMode}`;
    const message = customerInfo
        ? { action: "fetchCustomerPrices", customerId: customerInfo.id }
        : { action: "fetchTapePrices" };

    const requestPrices = (isBackgroundRefresh) => {
        if (isFetchingPrices) return;
        isFetchingPrices = true;
        chrome.runtime.sendMessage(message, response => {
            isFetchingPrices = false;
            if (!response || !response.success) return;
            localStorage.setItem(cacheKey, JSON.stringify({ __ts: Date.now(), prices: response.prices }));
            globalTapePrices = response.prices;
            if (isBackgroundRefresh) {
                // Bảng giá mới -> tính lại toàn bộ dòng đã xử lý bằng bảng cũ
                document.querySelectorAll('[data-processed]').forEach(el => delete el.dataset.processed);
                document.querySelectorAll('.nhanh-ext-edit-profit, .nhanh-ext-row-profit').forEach(el => el.remove());
            }
            runMainLogic();
        });
    };

    const cached = localStorage.getItem(cacheKey);
    if (cached) {
        try {
            const parsed = JSON.parse(cached);
            const wrapped = parsed && typeof parsed === 'object' && parsed.__ts && parsed.prices;
            globalTapePrices = wrapped ? parsed.prices : parsed;
            const age = wrapped ? Date.now() - parsed.__ts : Infinity;
            if (age > PRICE_CACHE_TTL_MS) requestPrices(true); // dùng cache cũ trước, tải mới ở nền
            return globalTapePrices;
        } catch (e) {
            localStorage.removeItem(cacheKey);
        }
    }

    requestPrices(false);
    return null;
}

const PRODUCT_CODE_RE = /^\([A-Za-z0-9_.\-]+\)$/; // "(TP01649)"

function getOriginalProductName(cell) {
    if (!cell) return "";
    // Layout cũ: p[title='Mã sản phẩm'] chứa tên sản phẩm.
    // Layout mới: thẻ đó chứa MÃ dạng "(TP01649)" (ẩn), còn tên nằm ở <p> khác trong cùng khối.
    const codeP = cell.querySelector("p[title='Mã sản phẩm']");
    if (codeP) {
        const t = codeP.textContent.trim();
        if (t && !PRODUCT_CODE_RE.test(t)) return t;
    }
    const nameP = Array.from(cell.querySelectorAll("p")).find(el => {
        const t = el.textContent.trim();
        return t && el.getAttribute("title") !== "Mã sản phẩm" && !PRODUCT_CODE_RE.test(t);
    });
    if (nameP) return nameP.textContent.trim();
    const a = cell.querySelector("a[href*='/product/item/detail']");
    if (a) return a.textContent.trim();
    // Fallback: check text node or input if edit page? usually text
    // On edit page: .productName div
    const divName = cell.querySelector(".productName");
    if (divName) return divName.textContent.trim();

    return cell.textContent.trim().split("\n")[0];
}

function processTapePrices(tapePrices) {
    const table = document.querySelector("#dgOrders") || document.querySelector(".data-grid-table") || document.querySelector(".tableDataGird");
    if (!table) return;

    columnIndices = detectColumnIndices();
    if (!columnIndices) return;

    const rows = table.querySelectorAll("tbody tr");
    if (rows.length === 0) return;

    let orderProfits = {};
    let orderTotals = {};
    let currentOrderIdRaw = "UNKNOWN";

    rows.forEach(row => {
        if (row.classList.contains("productItem")) return; // Skip Edit Page Rows (handled by another func)

        let idExtract = getOrderIdFromRow(row, columnIndices);
        if (idExtract) {
            currentOrderIdRaw = idExtract;
        }

        const cells = row.querySelectorAll("td");
        let productCell, priceCell, quantityCell, totalValueCell, costCell;

        if (idExtract) {
            // Main Row
            if (columnIndices.product !== -1 && cells[columnIndices.product]) productCell = cells[columnIndices.product];
            if (columnIndices.price !== -1 && cells[columnIndices.price]) priceCell = cells[columnIndices.price];
            if (columnIndices.qty !== -1 && cells[columnIndices.qty]) quantityCell = cells[columnIndices.qty];
            if (columnIndices.total !== -1 && cells[columnIndices.total]) totalValueCell = cells[columnIndices.total];
            if (columnIndices.cost !== -1 && cells[columnIndices.cost]) costCell = cells[columnIndices.cost];
        } else {
            // Sub Row: Relative logic for rowspan
            Array.from(cells).forEach((td, idx) => {
                if (td.querySelector("p[title='Mã sản phẩm']")) productCell = td;
            });

            // Layout mới: dòng phụ không có p[title='Mã sản phẩm'], ô đầu tiên chính là Sản phẩm
            if (!productCell && cells.length > 0 && cells.length < (columnIndices.price !== -1 ? columnIndices.price + 1 : 99)) {
                productCell = cells[0];
            }

            if (productCell) {
                let pIdx = Array.from(cells).indexOf(productCell);
                let priceDist = columnIndices.price - columnIndices.product;
                let qtyDist = columnIndices.qty - columnIndices.product;

                if (priceDist > 0 && cells[pIdx + priceDist]) priceCell = cells[pIdx + priceDist];
                else if (cells[pIdx + 2]) priceCell = cells[pIdx + 2];

                if (qtyDist > 0 && cells[pIdx + qtyDist]) quantityCell = cells[pIdx + qtyDist];
                else if (cells[pIdx + 3]) quantityCell = cells[pIdx + 3];
            }
        }

        if (!productCell) productCell = row.querySelector(".dgColProduct");
        if (!priceCell && productCell) priceCell = productCell.nextElementSibling?.nextElementSibling;
        if (!quantityCell && priceCell) quantityCell = priceCell.nextElementSibling;

        if (!productCell) return;

        if (productCell.dataset.processed) return;

        let product = getOriginalProductName(productCell).trim();
        let quantity = quantityCell ? (parseInt(quantityCell.innerText.replace(/\D/g, ""), 10) || 0) : 1;
        let sellPrice = priceCell ? (parseInt(priceCell.innerText.replace(/[^\d]/g, ""), 10) || 0) : 0;

        let costPrice = "Chưa có dữ liệu";
        if (costCell) {
            let costText = costCell.textContent.trim().replace(/[^\d]/g, "");
            if (costText) costPrice = parseInt(costText, 10);
        }
        if (costPrice === "Chưa có dữ liệu" && tapePrices) {
            costPrice = lookupPrice(tapePrices, product) || "Chưa có dữ liệu";
        }

        if (String(product).includes("VAT") || String(product).includes("quấn kiện")) {
            productCell.dataset.processed = "true";
            return;
        }

        if (costPrice !== "Chưa có dữ liệu") {
            let profit = (sellPrice - costPrice) * quantity;
            let profitPercent = costPrice > 0 ? ((sellPrice - costPrice) / costPrice * 100).toFixed(1) + "%" : "N/A";

            if (!orderProfits[currentOrderIdRaw]) orderProfits[currentOrderIdRaw] = 0;
            orderProfits[currentOrderIdRaw] += profit;

            const isCustomerMode = activePriceMode !== 'default';
            const pLabel = isCustomerMode ? 'Giá KH' : 'Giá nhập';
            let costPriceColor = costPrice <= sellPrice ? "green" : "red";
            let profitColor = profit >= 0 ? "green" : "red";

            const htmlValues = `<div class="nhanh-ext-row-profit mt-1" style="font-size: 11px; line-height: 1.2;">
                 <span style='color: ${costPriceColor}; font-weight: bold;'>${pLabel}: ${formatCurrency(costPrice)} (${profitPercent})</span><br>
                 <span style='color: ${profitColor}; font-weight: bold;'>Lợi nhuận: ${formatCurrency(profit)}</span>
             </div>`;

            // Hiển thị khối Giá nhập / Lợi nhuận NGAY DƯỚI giá bán (trong ô Giá).
            // Không dùng insertAdjacentHTML("afterend") trên chính <td>: ở layout mới ô Sản phẩm
            // không có <p>/<a> nên sẽ chèn <div> thẳng vào <tr>, tạo ô ảo làm lệch cột Giá/SL.
            const targetCell = priceCell || productCell;
            if (!targetCell.querySelector(".nhanh-ext-row-profit")) {
                targetCell.insertAdjacentHTML("beforeend", htmlValues);
            }
            productCell.dataset.processed = "true";
        }

        if (idExtract && totalValueCell) {
            let totalValue = parseInt(totalValueCell.textContent.replace(/[^\d]/g, ""), 10) || 0;
            if (totalValue > 0) orderTotals[currentOrderIdRaw] = { cell: totalValueCell, total: totalValue };
        }
    });

    Object.entries(orderTotals).forEach(([orderId, { cell, total }]) => {
        let profit = orderProfits[orderId] || 0;
        let profitColor = profit >= 0 ? "green" : "red";
        let profitPercent = total > 0 ? ((profit / total) * 100).toFixed(1) + "%" : "N/A";
        let label = `Lợi nhuận: ${formatCurrency(profit)} (${profitPercent})`;

        let profitSpan = cell.querySelector(".nhanh-ext-total-profit");
        if (profitSpan) {
            profitSpan.textContent = label;
            profitSpan.style.color = profitColor;
        } else {
            cell.insertAdjacentHTML("beforeend", `<div class="nhanh-ext-total-profit mt-1" style="color: ${profitColor}; font-weight: bold; font-size: 12px;">${label}</div>`);
        }
    });
}

function enhanceProductRows_EditPage() {
    const rows = document.querySelectorAll("tr.productItem");
    const tapePrices = fetchTapePricesSafely();
    if (!tapePrices) {
        // Nếu chưa có prices, đợi một chút rồi thử lại
        setTimeout(() => {
            if (location.href.includes("/order/manage/add") || location.href.includes("/order/manage/edit")) {
                enhanceProductRows_EditPage();
            }
        }, 500);
        return;
    }

    // Tổng tiền tách theo loại dòng: hàng / VAT / quấn kiện.
    // KHÔNG dùng footer .totalProductPrice vì footer đã gồm cả dòng VAT -> VAT tự "ăn" chính nó
    // (VD: hàng 7.998.913, điền VAT 639.913 xong footer thành 8.638.826 -> gợi ý nhảy lên 691.106).
    const money = getEditRowsMoney();

    rows.forEach(row => {
        const nameCell = row.querySelector(".colName");
        if (!nameCell) return;

        // Read Inputs for calculation (read-only purpose here)
        const priceInput = getEditRowPriceInput(row);
        let price = 0;
        if (priceInput) price = parseInt(priceInput.value.replace(/[^\d]/g, ""), 10) || 0;

        const productName = getOriginalProductName(nameCell).trim();
        let costPrice = lookupPrice(tapePrices, productName) || "Chưa có dữ liệu";

        if (String(productName).includes("quấn kiện")) {
            // Quấn kiện 2% trên tiền hàng
            costPrice = Math.round(money.goods * 0.02);
        }

        if (String(productName).includes("VAT")) {
            // VAT 8% trên tiền hàng + quấn kiện, KHÔNG gồm chính dòng VAT
            costPrice = Math.round((money.goods + money.quanKien) * 0.08);
        }

        let profitDiv = nameCell.querySelector(".nhanh-ext-edit-profit");

        if (costPrice !== "Chưa có dữ liệu") {
            const isCustomer = activePriceMode !== 'default';
            const priceLabel = isCustomer ? 'Giá KH' : 'Giá nhập';
            let costColor = isCustomer ? '#0d6efd' : 'green';
            const costDisplay = formatCurrency(costPrice);
            const costRaw = costPrice;

            if (profitDiv) {
                const span = profitDiv.querySelector(".nhanh-cost-value") || profitDiv.querySelector("span");
                const newText = `${priceLabel}: ${costDisplay}`;
                if (span && span.textContent !== newText) {
                    withSelfWrite(() => { span.textContent = newText; });
                }
                if (!profitDiv.querySelector(".btn-fill-price")) {
                    profitDiv.appendChild(createFillPriceButton());
                }
            } else {
                const nameContainer = nameCell.querySelector(".d-flex > div") || nameCell;
                profitDiv = document.createElement("div");
                profitDiv.className = "nhanh-ext-edit-profit mt-1";
                profitDiv.style.cssText = "font-size: 15px; line-height: 1.4;";

                const span = document.createElement("span");
                span.className = "nhanh-cost-value";
                span.style.cssText = `color: ${costColor}; font-weight: bold; cursor: pointer;`;
                span.textContent = `${priceLabel}: ${costDisplay}`;
                span.title = `Click để copy ${priceLabel.toLowerCase()}`;

                profitDiv.appendChild(span);
                profitDiv.appendChild(createCopyPriceButton());
                profitDiv.appendChild(createFillPriceButton());
                nameContainer.appendChild(profitDiv);
            }

            // Luôn bind lại event listener để đảm bảo hoạt động
            bindEditPageEvents(profitDiv, costRaw, row);
        }
    });
}

// Icon dạng emoji/ký tự — KHÔNG dùng class FontAwesome (fas fa-*) vì giao diện
// Angular mới của nhanh.vn không load font đó, icon sẽ bị vô hình
function createCopyPriceButton() {
    const btn = document.createElement("span");
    btn.className = "btn-copy-price";
    btn.innerHTML = svgCopyIcon(20);
    btn.title = "Copy giá";
    btn.style.cssText = EXT_ICON_BTN_STYLE;
    return btn;
}

function createFillPriceButton() {
    const btn = document.createElement("span");
    btn.className = "btn-fill-price";
    btn.innerHTML = svgFillIcon(20);
    btn.title = "Điền giá vào ô Giá";
    btn.style.cssText = EXT_ICON_BTN_STYLE;
    return btn;
}

function bindEditPageEvents(container, costValue, row) {
    if (!container) return;
    // Store costValue as data attribute for delegation
    container.dataset.costValue = costValue;
}

// ======= EVENT DELEGATION (runs once) =======
let editPageDelegationBound = false;
function setupEditPageDelegation() {
    if (editPageDelegationBound) return;
    editPageDelegationBound = true;

    document.addEventListener('click', function (e) {
        const target = e.target;

        // Find parent profit div
        const profitDiv = target.closest('.nhanh-ext-edit-profit');
        if (!profitDiv) return;

        const costValue = profitDiv.dataset.costValue;
        if (!costValue) return;

        // Copy price — dùng closest() vì click có thể trúng <svg>/<path> bên trong nút
        if (target.closest('.btn-copy-price') || target.closest('.nhanh-cost-value')) {
            e.preventDefault();
            e.stopPropagation();
            navigator.clipboard.writeText(String(costValue)).then(() => {
                showToast(`Đã copy: ${Number(costValue).toLocaleString("vi-VN")} đ`);
            }).catch(() => showToast("Không thể copy"));
            return;
        }

        // Fill price into input
        if (target.closest('.btn-fill-price')) {
            e.preventDefault();
            e.stopPropagation();
            const row = target.closest('tr.productItem');
            if (!row) return;
            const priceInput = getEditRowPriceInput(row);
            if (!priceInput) {
                showToast("Không tìm thấy ô giá!");
                return;
            }
            setAngularInputValue(priceInput, costValue);
            showToast(`Đã điền giá nhập: ${Number(costValue).toLocaleString("vi-VN")} đ`);
            return;
        }
    }, true);
}


// Tìm ô input "Giá bán" trong 1 dòng sản phẩm trang Sửa/Thêm đơn.
// Layout mới (edit2): thứ tự cột đã đổi (Giá bán đứng TRƯỚC SL) nên không dùng
// td:nth-child cố định nữa, phải xác định cột theo tiêu đề bảng.
// Layout cũ: fallback về nth-child(5) rồi nth-child(4).
function isEditPriceInput(inp) {
    if (!inp || inp.disabled || inp.readOnly) return false;
    if (inp.type === "hidden" || inp.type === "checkbox" || inp.type === "radio") return false;
    // Bỏ qua ô chọn VAT giả (fakeInput) nằm chung cột Giá bán trong layout edit2
    if (inp.classList.contains("fakeInput")) return false;
    const ph = (inp.getAttribute("placeholder") || "").toLowerCase();
    if (ph.includes("ghi chú") || ph.includes("chiết khấu")) return false;
    return true;
}

function getEditRowPriceInput(row) {
    if (!row) return null;
    const table = row.closest("table");
    if (table) {
        const ths = table.querySelectorAll("thead tr:first-child th");
        let priceIdx = -1;
        for (let i = 0; i < ths.length; i++) {
            const t = (ths[i].textContent || "").trim().toLowerCase();
            if (t.startsWith("giá bán")) { priceIdx = i; break; }
        }
        if (priceIdx >= 0) {
            const tds = row.querySelectorAll(":scope > td");
            const priceTd = tds[priceIdx];
            const inp = priceTd && Array.from(priceTd.querySelectorAll("input")).find(isEditPriceInput);
            if (inp) return inp;
        }
    }
    // Layout cũ
    const legacy = row.querySelector("td:nth-child(5) input") || row.querySelector("td:nth-child(4) input");
    return legacy && isEditPriceInput(legacy) ? legacy : null;
}

// Set value on Angular input via inject.js running in MAIN world
function setAngularInputValue(input, value) {
    const marker = 'nhanh-ext-fill-' + Date.now();
    input.setAttribute('data-nhanh-fill', marker);
    window.dispatchEvent(new CustomEvent('nhanh-ext-fill-price', {
        detail: { marker, value: String(value) }
    }));
}

function showToast(message) {
    let toast = document.createElement("div");
    toast.textContent = message;
    Object.assign(toast.style, {
        position: "fixed", top: "20px", right: "20px", zIndex: "9999",
        backgroundColor: "#28a745", color: "white", padding: "10px 20px",
        borderRadius: "4px", boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        opacity: "0", transition: "opacity 0.3s ease", fontSize: "14px", fontWeight: "500"
    });
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.style.opacity = "1");
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

function addQuickSearchButtons() {
    if (document.getElementById("quickSearchToolbar")) return;

    // Target the specific header structure provided
    // <div class="card-header bg-light ..."> <h5 class="card-title ..."> Sản phẩm </h5> ... </div>
    const headers = document.querySelectorAll(".card-header h5.card-title");
    let targetHeader = null;
    headers.forEach(h => {
        if (h.textContent.includes("Sản phẩm")) {
            targetHeader = h.closest(".card-header");
        }
    });

    if (!targetHeader) return;

    const toolbar = document.createElement("div");
    toolbar.id = "quickSearchToolbar";
    toolbar.className = "d-flex flex-wrap p-2 bg-white border-bottom ms-3"; // ms-3 to align with title
    toolbar.style.gap = "10px";

    const buttons = [
        { label: "VAT 8%", query: "VAT 8%", color: "btn-outline-primary" },
        { label: "Phí quấn kiện 2%", query: "Phí quấn kiện", color: "btn-outline-primary" }
    ];

    buttons.forEach(btn => {
        const b = document.createElement("button");
        b.className = `btn btn-sm ${btn.color}`;
        b.textContent = btn.label;
        b.type = "button";
        b.onclick = () => triggerProductSearch(btn.query);
        toolbar.appendChild(b);
    });

    targetHeader.insertAdjacentElement("afterend", toolbar);
}

function triggerProductSearch(query) {
    // Target input inside the suggestion component as per user HTML
    let targetInput = document.querySelector("app-c-product-suggestion input.form-control");

    // Fallback search if specific structure not found
    if (!targetInput) {
        const inputs = document.querySelectorAll("input[placeholder*='sản phẩm'], input[formcontrolname='searchProduct'], input[placeholder*='F3']");
        inputs.forEach(inp => {
            if (inp.offsetParent !== null) targetInput = inp;
        });
    }

    if (!targetInput) {
        showToast("Không tìm thấy ô tìm kiếm!");
        return;
    }

    targetInput.focus();
    targetInput.click(); // Trigger any focus-based dropdowns

    // Set value using prototype to ensure framework detection (Angular/React compatible)
    const proto = window.HTMLInputElement.prototype;
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(proto, "value").set;
    nativeInputValueSetter.call(targetInput, query);

    // Dispatch events
    targetInput.dispatchEvent(new Event('input', { bubbles: true }));
    targetInput.dispatchEvent(new Event('change', { bubbles: true }));

    // Trigger KeyUp to fire search (simulate a benign key like 'End')
    setTimeout(() => {
        targetInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
        targetInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'End', bubbles: true }));

        // --- NEW: Wait and Auto-Select ---
        let attempts = 0;
        const autoSelectInterval = setInterval(() => {
            attempts++;
            const suggestions = document.querySelectorAll("ul.search-result li");

            if (suggestions.length > 0) {
                // Find exact match or first item if query is specific
                let targetLi = null;
                suggestions.forEach(li => {
                    if (li.textContent.includes(query)) targetLi = li;
                });

                if (!targetLi && suggestions.length > 0) targetLi = suggestions[0]; // Fallback to first

                if (targetLi) {
                    targetLi.click(); // Select it
                    showToast(`Đã chọn: ${query}`);
                    clearInterval(autoSelectInterval);
                }
            }

            if (attempts > 20) clearInterval(autoSelectInterval); // Stop after 2s (20 * 100ms)
        }, 100);
    }, 10);
}

function handleAvailableItems() { }

// =================== VAT METRICS DISPLAY ===================
function handleTableChange() {
    ensureVatBox();
    renderVatMetrics();
    initVatObservers();
    initEditRecalcObservers();
}

// Tính lại "Giá KH" dòng VAT / quấn kiện và VAT box khi tiền hàng thay đổi.
// MutationObserver chính chỉ theo dõi childList, còn Angular cập nhật số tiền bằng cách
// đổi text node (characterData) nên khi xoá/sửa Giá bán sẽ không có lần tính lại nào.
const scheduleEditRecalc = debounce(() => {
    if (!(location.href.includes("/order/manage/add") || location.href.includes("/order/manage/edit"))) return;
    enhanceProductRows_EditPage();
    renderVatMetrics();
}, 300);

let editInputListenerBound = false;
function initEditRecalcObservers() {
    const table = document.querySelector("table.tableProduct") || document.querySelector("tr.productItem")?.closest("table");
    if (table && !table.dataset.nhanhRecalcObserved) {
        table.dataset.nhanhRecalcObserved = "1";
        const obs = new MutationObserver(() => {
            if (extSelfWrite > 0) return;
            scheduleEditRecalc();
        });
        obs.observe(table, { childList: true, characterData: true, subtree: true });
    }
    if (!editInputListenerBound) {
        editInputListenerBound = true;
        ["input", "change"].forEach(evt => {
            document.addEventListener(evt, e => {
                const t = e.target;
                if (t && t.closest && t.closest("tr.productItem")) scheduleEditRecalc();
            }, true);
        });
    }
}

function ensureVatBox() {
    if (document.querySelector("#nhanhVatBox")) return;
    const header = findProductHeader();
    if (!header) return;
    const div = document.createElement("div");
    div.id = "nhanhVatBox";
    div.style.marginTop = "6px";
    div.style.padding = "0 12px";
    div.innerHTML = `
        VAT 8%: <span id='tienVAT'> 0đ </span> |
        Quấn kiện: <span id='tienQuanKien'> 0đ </span> |
        VAT PVC: <span id='tienVatPVC'> 0đ </span>
    `;
    header.appendChild(div);
}

function findProductHeader() {
    // Layout cũ: app-product-add-order > .card-header > .card-title "Sản phẩm"
    const candidates = document.querySelectorAll("app-product-add-order .card-header");
    for (const header of candidates) {
        const title = header.querySelector(".card-title");
        if (title && title.textContent.includes("Sản phẩm")) {
            return header;
        }
    }
    // Layout mới (edit2, app-product-add-order-v3): tiêu đề "Sản phẩm" là tab trong
    // ul.nav-tabs nằm trong .left-header-product, không còn .card-header
    const titles = document.querySelectorAll(
        "app-product-add-order-v3 .card-title, [class*='product-add-order'] .card-title, .left-header-product .card-title"
    );
    for (const t of titles) {
        if (!(t.textContent || "").includes("Sản phẩm")) continue;
        const container = t.closest(".card-header") || t.closest(".left-header-product") || t.closest(".border-bottom") || t.closest(".card");
        if (container) return container;
    }
    // Fallback: chèn ngay trên bảng sản phẩm
    const table = document.querySelector("table.tableProduct");
    if (table) {
        const wrap = table.closest("app-c-table") || table.parentElement;
        if (wrap && wrap.parentElement) return wrap.parentElement;
    }
    return document.querySelector("app-product-add-order .card-header");
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

function renderVatMetrics() {
    // Tính từ các dòng sản phẩm, bỏ chính dòng VAT ra khỏi cơ sở tính VAT
    const money = getEditRowsMoney();
    const vatBase = money.goods + money.quanKien;
    const vat = Math.round(0.08 * vatBase);
    const quanKien = Math.round(0.02 * money.goods);
    const pvcFee = getPvcFee();
    const vatPVC = Math.round(0.08 * (vatBase + pvcFee));

    updateVatLine("tienVAT", vat, "btnCopyVAT", "VAT 8%", "color:green;");
    updateVatLine("tienQuanKien", quanKien, "btnCopyQuanKien", "Quấn kiện 2%", "color:orange;");
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

// Số tiền "Thanh toán" (hoặc "Tiền hàng") của 1 dòng sản phẩm trang Sửa/Thêm đơn
function getRowPayAmount(row) {
    const table = row.closest("table");
    if (table) {
        const ths = table.querySelectorAll("thead tr:first-child th");
        let payIdx = -1, goodsIdx = -1;
        for (let i = 0; i < ths.length; i++) {
            const t = (ths[i].textContent || "").trim().toLowerCase();
            if (payIdx < 0 && t.startsWith("thanh toán")) payIdx = i;
            if (goodsIdx < 0 && t.startsWith("tiền hàng")) goodsIdx = i;
        }
        const tds = row.querySelectorAll(":scope > td");
        const idx = payIdx >= 0 ? payIdx : goodsIdx;
        if (idx >= 0 && tds[idx]) return parseMoney(tds[idx].textContent);
    }
    const moneyCell = row.querySelector("td.money.text-end") || row.querySelector("td.money");
    return moneyCell ? parseMoney(moneyCell.textContent) : 0;
}

// Tổng tiền các dòng sản phẩm, tách theo: hàng thường / VAT / quấn kiện
function getEditRowsMoney() {
    const money = { goods: 0, vat: 0, quanKien: 0 };
    document.querySelectorAll("tr.productItem").forEach(row => {
        const nameCell = row.querySelector(".colName");
        if (!nameCell) return;
        const name = getOriginalProductName(nameCell).toLowerCase();
        const amount = getRowPayAmount(row);
        if (name.includes("vat")) money.vat += amount;
        else if (name.includes("quấn kiện")) money.quanKien += amount;
        else money.goods += amount;
    });
    return money;
}

function findPvcInput() {
    // Layout cũ: input có id / placeholder
    const direct =
        document.querySelector("#customerShipFee") ||
        document.querySelector("input[placeholder='Phí ship báo khách']") ||
        document.querySelector("input[placeholder*='Phí ship']");
    if (direct) return direct;
    // Layout mới (edit2): input trong .form-floating, label "Phí ship báo khách", placeholder rỗng
    for (const label of document.querySelectorAll("label")) {
        if (!(label.textContent || "").trim().toLowerCase().includes("phí ship báo khách")) continue;
        if (label.htmlFor) {
            const byFor = document.getElementById(label.htmlFor);
            if (byFor && byFor.tagName === "INPUT") return byFor;
        }
        const wrap = label.closest(".form-floating") || label.closest(".input-group") || label.parentElement;
        const input = wrap && wrap.querySelector("input[type='text'], input:not([type='hidden']):not([type='checkbox'])");
        if (input) return input;
    }
    return null;
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

function copyVAT(value, label = "Giá trị") {
    navigator.clipboard.writeText(`${value}`);
    showToast(`${label} đã copy: ${Number(value).toLocaleString("vi-VN")} đ`);
}

function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

function getOrderIdFromRow(row, indices) {
    const cells = row.querySelectorAll("td");
    let idx = indices ? indices.id : 1;
    if (idx !== -1 && cells[idx]) {
        const a = cells[idx].querySelector("a");
        if (a && /^\d+$/.test(a.textContent.trim())) return a.textContent.trim();
    }
    const idLink = row.querySelector("a[href*='order/manage/detail'][href*='id=']");
    if (idLink) return idLink.textContent.trim();
    return null;
}

function addProductionLinkArrow(row) {
    if (row.querySelector(".nhanh-ext-production-arrow")) return;
    const links = Array.from(row.querySelectorAll("a"));
    let nameLink = links.find(a => (a.getAttribute("href") || "").includes("/product/item/detail"));
    if (!nameLink) {
        let longest = null;
        links.forEach(a => {
            const text = a.textContent.trim();
            if (!text) return;
            if (!longest || text.length > longest.textContent.trim().length) longest = a;
        });
        nameLink = longest;
    }
    if (!nameLink || nameLink.dataset.hasProductionLink === "1") return;
    const productName = nameLink.textContent.trim();
    if (!productName) return;
    const encodedName = encodeURIComponent(productName).replace(/%20/g, "+");
    const url = "http://quanlysanxuat.baobidaiduong.com/orders?software_code=" + encodedName;
    const arrow = document.createElement("a");
    arrow.className = "nhanh-ext-production-arrow";
    arrow.href = url;
    arrow.target = "_blank";
    arrow.textContent = " ↗";
    arrow.style.marginLeft = "4px";
    arrow.style.fontSize = "12px";
    arrow.style.color = "#0d6efd";
    arrow.style.textDecoration = "none";
    nameLink.insertAdjacentElement("afterend", arrow);
    nameLink.dataset.hasProductionLink = "1";
}

// === ICON SVG DÙNG CHUNG (không phụ thuộc font/FontAwesome của trang) ===
function svgCopyIcon(size = 20, color = "#0d6efd") {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
}
// Icon mũi tên điền vào ô (kiểu "đưa vào khung")
function svgFillIcon(size = 20, color = "#198754") {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>`;
}
const EXT_ICON_BTN_STYLE = "margin-left: 6px; cursor: pointer; user-select: none; display: inline-flex; vertical-align: middle;";

// Nút copy tên sản phẩm ngay sau tên trên trang danh sách
function addCopyNameButton(row) {
    if (!row || row.querySelector(".nhanh-ext-copy-name")) return;
    const nameLink = row.querySelector("a[href*='/product/item/detail']");
    if (!nameLink) return;
    const name = nameLink.textContent.trim();
    if (!name) return;
    const btn = document.createElement("span");
    btn.className = "nhanh-ext-copy-name";
    btn.innerHTML = svgCopyIcon(20);
    btn.title = "Copy tên sản phẩm";
    btn.style.cssText = EXT_ICON_BTN_STYLE;
    btn.addEventListener("click", (e) => {
        // Nút nằm TRONG thẻ <a>: chặn điều hướng khi bấm copy
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(name)
            .then(() => showToast(`Đã copy: ${name}`))
            .catch(() => showToast("Không thể copy"));
    });
    // Ô tên có max-width nhỏ (250px) nên tên dài sẽ wrap. Để icon LUÔN dính sát chữ cuối:
    // bọc từ cuối + icon trong span nowrap — thiếu chỗ thì cả cụm xuống dòng cùng nhau.
    // Tên có thể nằm trong element lồng bên trong <a> -> dùng TreeWalker tìm text node cuối
    let textNode = null;
    const walker = document.createTreeWalker(nameLink, NodeFilter.SHOW_TEXT, null);
    let tn;
    while ((tn = walker.nextNode())) {
        if (tn.textContent.trim()) textNode = tn;
    }
    const m = textNode ? textNode.textContent.match(/^([\s\S]*?)(\S+\s*)$/) : null;
    if (m) {
        textNode.textContent = m[1];
        const wrap = document.createElement("span");
        wrap.style.whiteSpace = "nowrap";
        wrap.appendChild(document.createTextNode(m[2]));
        wrap.appendChild(btn);
        textNode.parentNode.insertBefore(wrap, textNode.nextSibling);
    } else {
        nameLink.appendChild(btn);
    }
}

const exportQueue = [];
let exportQueueRunning = false;
const EXPORT_CONCURRENCY = 3; // số request chạy song song

// Cờ đánh dấu DOM đang được extension tự sửa — để MutationObserver bỏ qua,
// tránh vòng lặp re-render gây lag khi các badge "Xuất 30 ngày" lần lượt cập nhật
let extSelfWrite = 0;
function withSelfWrite(fn) {
    extSelfWrite++;
    try { fn(); } finally { setTimeout(() => { extSelfWrite--; }, 0); }
}

// Cache export dùng chung trong bộ nhớ (tránh đọc/ghi localStorage lặp và race khi fetch song song)
let exportCacheMem = null;
function loadExportCache() {
    if (!exportCacheMem) {
        try { exportCacheMem = JSON.parse(localStorage.getItem("exportCacheV3")) || {}; } catch (_) { exportCacheMem = {}; }
    }
    return exportCacheMem;
}
function saveExportCache() {
    try { localStorage.setItem("exportCacheV3", JSON.stringify(exportCacheMem || {})); } catch (_) { }
}

function enqueueExportFetch(productId) {
    if (!productId) return;
    exportQueue.push(productId);
    if (!exportQueueRunning) processExportQueue();
}

async function processExportQueue() {
    exportQueueRunning = true;
    const worker = async () => {
        while (exportQueue.length > 0) {
            const pid = exportQueue.shift();
            const didFetch = await fetchExportQuantity(pid);
            // Chỉ nghỉ giữa các request thật sự gọi mạng; cache hit thì chạy tiếp ngay
            if (didFetch && exportQueue.length > 0) await new Promise(r => setTimeout(r, 150));
        }
    };
    await Promise.all(Array.from({ length: EXPORT_CONCURRENCY }, worker));
    exportQueueRunning = false;
}

async function fetchExportQuantity(productId) {
    if (!productId) return false;

    const cacheData = loadExportCache();
    const cached = cacheData[productId];
    if (cached) {
        // Stale-while-revalidate: hiện ngay giá trị cũ, nếu còn hạn thì khỏi gọi mạng
        updateProductRow(productId, cached.quantity);
        if ((Date.now() - cached.timestamp) < 30 * 60 * 1000) return false;
    }

    const businessId = new URLSearchParams(location.search).get("businessId") || "170366";
    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 30);
    const fmt = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');

    // CSRF token từ cookie (Npos-Csrf-Token-V1) — bắt buộc cho API POST của nhanh.vn
    const csrfToken = (document.cookie.split('; ').find(c => c.startsWith('Npos-Csrf-Token-V1=')) || '').split('=').slice(1).join('=')
        || localStorage.getItem("npos-csrf-token-v1") || "";

    try {
        // Trang chi tiết SP đã chuyển sang Angular SPA: GET chỉ trả vỏ app, không có bảng.
        // Phải gọi POST tới API JSON (giống request thật của SPA), lọc type=2 (Xuất), cộng dồn qua các trang.
        let totalQuantity = 0;
        let page = 1;
        let totalPages = 1;

        while (page <= totalPages) {
            // QUAN TRỌNG: API chỉ lọc ngày theo fromDateDetail/toDateDetail; fromDate/toDate bị bỏ qua -> trả về toàn bộ lịch sử
            const body = `id=${productId}&page=${page}&fromDateDetail=${fmt(fromDate)}&toDateDetail=${fmt(toDate)}&type=2&tab=imexs&businessId=${businessId}`;
            const response = await fetch(`https://nhanh.vn/product/item/detail?businessId=${businessId}`, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    'Accept': 'application/json, text/plain, */*',
                    'npos-csrf-token-v1': csrfToken
                },
                body
            });

            if (!response.ok) {
                console.warn(`[Ext] fetchExport HTTP ${response.status} SP ${productId}`);
                break;
            }

            const json = await response.json();
            // code === 1: thành công. type=2 = "Xuất" (type=1 = "Nhập")
            if (json.code === 1 && json.data && Array.isArray(json.data.result)) {
                totalPages = json.data.totalPages || 1;
                if (json.data.result.length === 0) break;
                for (const item of json.data.result) {
                    totalQuantity += Math.abs(parseInt(item.quantity, 10) || 0);
                }
            } else {
                break;
            }
            page++;
            if (page > 50) break; // chặn vòng lặp vô hạn
        }

        cacheData[productId] = { quantity: totalQuantity, timestamp: Date.now() };
        saveExportCache();
        updateProductRow(productId, totalQuantity);
    } catch (e) {
        console.error(`[Ext] fetchExport lỗi SP ${productId}:`, e);
        // Lỗi mạng: giữ nguyên giá trị cache cũ nếu có, chỉ hiện 0 khi không có gì
        if (!cached) updateProductRow(productId, 0);
    }
    return true;
}
function updateProductRow(productId, quantity) {
    getProductRows().forEach(r => {
        if (getProductIdFromRow(r) === String(productId)) updateProductRowDisplay(r, quantity);
    });
}
function updateProductRowFromDOM(row) {
    if (!columnIndices) columnIndices = detectColumnIndices();
    if (!columnIndices || columnIndices.sold === -1) return false;
    const cell = row.querySelectorAll("td")[columnIndices.sold];
    if (!cell) return false;
    let qty = parseInt(cell.textContent.replace(/[^\d-]/g, ""), 10);
    if (isNaN(qty)) return false;
    updateProductRowDisplay(row, Math.abs(qty));
    return true;
}
// Chèn sẵn 2 dòng giữ chỗ ("Xuất 30 ngày: …" + "Đang tải…") để hàng không bị
// xô lệch khi số liệu về sau — người dùng thao tác/copy được ngay từ đầu
function insertExportPlaceholder(row) {
    if (!row || row.querySelector(".nhanh-ext-export-qty")) return;
    const nameLink = row.querySelector("a[href*='/product/item/detail']");
    if (!nameLink) return;
    // Neo sau mũi tên ↗ (nếu có) — nút copy tên giờ nằm BÊN TRONG link nên không dùng làm neo
    const anchor = row.querySelector(".nhanh-ext-production-arrow") || nameLink;
    anchor.insertAdjacentHTML("afterend",
        `<br><span class="nhanh-ext-export-qty" style="color: #999; font-weight: bold;">Xuất 30 ngày: …</span>` +
        `<br><span class="badgeExportStatus" data-export-status="loading" style="color:#999; font-weight:bold;">Đang tải…</span>`);
}

function updateProductRowDisplay(row, qtyNum) {
    if (!row) return;
    const label = qtyNum === 0 ? "Tồn chết" : (qtyNum < 5000 ? "Bán chậm" : (qtyNum <= 15000 ? "Ổn định" : "Rất tốt"));
    const color = qtyNum === 0 ? "red" : (qtyNum < 5000 ? "orange" : (qtyNum <= 15000 ? "blue" : "green"));
    const quantityText = qtyNum.toLocaleString("vi-VN");
    withSelfWrite(() => {
        insertExportPlaceholder(row);
        const qtySpan = row.querySelector(".nhanh-ext-export-qty");
        if (qtySpan) {
            qtySpan.textContent = `Xuất 30 ngày: ${quantityText}`;
            qtySpan.style.color = "blue";
        }
        const badge = row.querySelector(".badgeExportStatus");
        if (badge) {
            badge.textContent = label;
            badge.style.color = color;
            badge.dataset.exportStatus = label;
        }
    });
    row.dataset.exportQty = qtyNum;
}
function getProductIdFromRow(row) {
    if (row?.dataset?.id) return row.dataset.id;
    const checkbox = row.querySelector("input[type='checkbox'][value]");
    if (checkbox?.value) return checkbox.value;
    const link = row.querySelector("a[href*='/product/item/detail']");
    return link ? link.getAttribute("href").match(/[?&]id=(\d+)/)?.[1] : null;
}
function createExportFilterToolbar() {
    if (document.getElementById("exportFilterToolbar")) return;
    const table = document.querySelector("#dgProductIndex") || document.querySelector(".tableDataGird") || document.querySelector("table.table");
    if (!table) return;
    const toolbar = document.createElement("div");
    toolbar.id = "exportFilterToolbar";
    toolbar.innerHTML = `
        <div class="btn-group btn-group-sm" style="margin: 10px 0;">
            <button id="btnFilterAll" class="btn btn-outline-secondary">Tất cả</button>
            <button id="btnFilterDead" class="btn btn-outline-danger">Tồn chết (0)</button>
            <button id="btnFilterSlow" class="btn btn-outline-warning">Bán chậm (<5k)</button>
            <button id="btnFilterStable" class="btn btn-outline-primary">Ổn định (5k-15k)</button>
            <button id="btnFilterFast" class="btn btn-outline-success">Rất tốt (>15k)</button>
        </div>`;
    table.parentElement.insertBefore(toolbar, table);
    toolbar.querySelectorAll("button").forEach(btn => btn.addEventListener("click", (e) => filterProductsByExport(e.target.id)));
}
function filterProductsByExport(btnId) {
    const type = btnId.replace("btnFilter", "").toLowerCase();
    getProductRows().forEach(row => {
        let qty = parseInt(row.dataset.exportQty || "0", 10);
        let show = true;
        if (type === "dead") show = qty === 0;
        else if (type === "slow") show = qty > 0 && qty < 5000;
        else if (type === "stable") show = qty >= 5000 && qty <= 15000;
        else if (type === "fast") show = qty > 15000;
        row.style.display = show ? "" : "none";
    });
}

// Auto-click "Tự vận chuyển" checkbox on edit page
function autoClickSelfShipping() {
    function tryClick() {
        const cb = document.querySelector('#useTransformer');
        if (cb && !cb.checked) {
            cb.click();
        } else if (!cb) {
            setTimeout(tryClick, 500);
        }
    }
    setTimeout(tryClick, 1000);
}

// =================== VAT 8% WARNING ===================
function hasVatProduct() {
    // Check edit page products (tr.productItem)
    const editProducts = document.querySelectorAll('tr.productItem .colName');
    for (const el of editProducts) {
        if (el.textContent.includes('VAT')) return true;
    }
    // Check detail page products
    const detailProducts = document.querySelectorAll('a[href*="/product/item/detail"]');
    for (const el of detailProducts) {
        if (el.textContent.includes('VAT')) return true;
    }
    return false;
}

function showVatWarning() {
    if (hasVatProduct()) {
        // Remove warning if VAT was added
        const existing = document.getElementById('nhanhVatWarning');
        if (existing) existing.remove();
        return;
    }
    if (document.getElementById('nhanhVatWarning')) return; // Already showing

    const banner = document.createElement('div');
    banner.id = 'nhanhVatWarning';
    banner.innerHTML = `
        <div style="background: #dc3545; color: white; padding: 10px 16px; border-radius: 6px;
                    font-size: 14px; font-weight: bold; display: flex; align-items: center; gap: 8px;
                    margin: 8px 12px; box-shadow: 0 2px 8px rgba(220,53,69,0.3);">
            <span style="font-size: 20px;">⚠️</span>
            <span>Đơn hàng chưa có sản phẩm VAT 8%! Vui lòng thêm trước khi lưu.</span>
        </div>`;

    // Insert at top of product section
    const productSection = document.querySelector('app-product-add-order .card-header')
        || document.querySelector('.card-header');
    if (productSection) {
        productSection.parentElement.insertBefore(banner, productSection);
    } else {
        // Fallback: insert at top of main content
        const main = document.querySelector('.main-content') || document.querySelector('app-root') || document.body;
        main.prepend(banner);
    }
}

function blockSaveWithoutVat() {
    // Block F9 (Lưu) and F10 (Lưu và in) keyboard shortcuts
    document.addEventListener('keydown', function (e) {
        if ((e.key === 'F9' || e.key === 'F10') && !hasVatProduct()) {
            e.preventDefault();
            e.stopImmediatePropagation();
            alert('⚠️ Đơn hàng chưa có sản phẩm VAT 8%!\nVui lòng thêm VAT 8% trước khi lưu.');
            return false;
        }
    }, true); // capture phase to intercept before Angular

    // Block save buttons click
    function interceptSaveButtons() {
        const saveButtons = document.querySelectorAll('button.btn-danger, button.btn-primary');
        saveButtons.forEach(btn => {
            const text = btn.textContent.trim();
            if ((text.includes('Lưu') || text.includes('F9') || text.includes('F10')) && !btn.dataset.nhanhVatGuard) {
                btn.dataset.nhanhVatGuard = '1';
                btn.addEventListener('click', function (e) {
                    if (!hasVatProduct()) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        alert('⚠️ Đơn hàng chưa có sản phẩm VAT 8%!\nVui lòng thêm VAT 8% trước khi lưu.');
                    }
                }, true);
            }
        });
    }
    setTimeout(interceptSaveButtons, 1500);
    // Re-check after Angular might re-render buttons
    setTimeout(interceptSaveButtons, 3000);
}

function initVatCheck() {
    function tryCheck() {
        const hasProducts = document.querySelector('tr.productItem') || document.querySelector('a[href*="/product/item/detail"]');
        if (hasProducts) {
            showVatWarning();
            const path = location.pathname || "";
            const isOrderEditPage =
                path.startsWith("/order/manage/add") ||
                path.startsWith("/order/manage/edit");
            if (isOrderEditPage) blockSaveWithoutVat();
        } else {
            setTimeout(tryCheck, 500);
        }
    }
    setTimeout(tryCheck, 1500);
}

// =================== ORDER LISTING ENHANCEMENTS ===================
// Convert URLs and emails in notes column to clickable links
function linkifyNotes() {
    const rows = document.querySelectorAll('table.table tbody tr, .tableDataGird tbody tr, #dgOrders tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        cells.forEach(cell => {
            if (cell.dataset.linkified) return;
            const text = cell.innerHTML;
            // Only process cells that contain URLs or emails
            if (!text.match(/https?:\/\//)) return;
            cell.dataset.linkified = '1';
            cell.innerHTML = text
                .replace(/(https?:\/\/[^\s<"']+)/g, '<a href="$1" target="_blank" rel="noopener" style="color: #0d6efd; text-decoration: underline; word-break: break-all;">$1</a>');
        });
    });
}

// Make order IDs clickable — opens detail page in new tab
function makeOrderIdsClickable() {
    const businessId = new URLSearchParams(location.search).get('businessId') || '170366';
    const rows = document.querySelectorAll('table.table tbody tr, .tableDataGird tbody tr, #dgOrders tr');
    rows.forEach(row => {
        if (row.dataset.idLinked) return;
        const idCell = row.querySelector('td:first-child, td:nth-child(2)');
        if (!idCell) return;
        // Find the order ID — look for a cell with just a number
        const cells = row.querySelectorAll('td');
        for (const cell of cells) {
            const text = cell.textContent.trim();
            // Order IDs are numeric, typically 6-10 digits
            if (/^\d{6,10}$/.test(text) && !cell.querySelector('a')) {
                row.dataset.idLinked = '1';
                const link = document.createElement('a');
                link.href = `/order/manage/detail?id=${text}&businessId=${businessId}&tab=info`;
                link.target = '_blank';
                link.rel = 'noopener';
                link.textContent = text;
                link.style.cssText = 'color: #0d6efd; text-decoration: underline; font-weight: bold;';
                cell.textContent = '';
                cell.appendChild(link);
                break;
            }
        }
    });
}

// Nút copy ID đơn hàng ngay sau ID trên trang danh sách đơn
function addCopyOrderIdButtons() {
    const links = document.querySelectorAll("a[href*='order/manage/detail']");
    links.forEach(link => {
        if (link.dataset.copyIdAdded) return;
        const id = link.textContent.trim();
        if (!/^\d{6,12}$/.test(id)) return;
        link.dataset.copyIdAdded = "1";
        const btn = document.createElement("span");
        btn.className = "nhanh-ext-copy-order-id";
        btn.title = "Copy ID đơn hàng";
        btn.innerHTML = svgCopyIcon(20);
        btn.style.cssText = EXT_ICON_BTN_STYLE;
        btn.addEventListener("click", (e) => {
            // Nút nằm TRONG thẻ <a>: chặn điều hướng sang trang chi tiết khi bấm copy
            e.preventDefault();
            e.stopPropagation();
            navigator.clipboard.writeText(id)
                .then(() => showToast(`Đã copy ID: ${id}`))
                .catch(() => showToast("Không thể copy"));
        });
        // Chèn vào trong link để luôn nằm liền kề cùng dòng với ID
        link.appendChild(btn);
    });
}

// === CUSTOMER PHONE → BẢNG GIÁ BANNER ===
function detectCustomerPhone() {
    const input = document.querySelector(
        'app-c-suggest-customer input[placeholder*="iện thoại"]'
    );
    if (!input) return null;

    const raw = (input.value || '').replace(/[\s\-\.]/g, '');
    if (!/^0\d{9,10}$/.test(raw)) return null;

    const match = CUSTOMER_PHONE_MAP[raw];
    return match ? { phone: raw, ...match } : null;
}

function showCustomerPriceBanner() {
    const info = detectCustomerPhone();
    const banner = document.getElementById('nhanhCustomerPriceBanner');

    if (!info) {
        if (banner) banner.remove();
        lastDetectedPhone = null;
        return;
    }

    if (lastDetectedPhone === info.phone && banner) return;
    lastDetectedPhone = info.phone;
    if (banner) banner.remove();

    const url = `${BANGGIA_BASE}/prices/${info.id}#${info.hash}`;

    const el = document.createElement('div');
    el.id = 'nhanhCustomerPriceBanner';
    el.innerHTML = `
        <div style="background: linear-gradient(135deg, #0d6efd, #0b5ed7); color: white;
                    padding: 10px 16px; border-radius: 8px; font-size: 14px;
                    display: flex; align-items: center; gap: 12px; margin: 8px 12px;
                    box-shadow: 0 2px 8px rgba(13,110,253,0.3);">
            <span style="font-size: 22px;">📋</span>
            <div style="flex:1;">
                <div style="font-weight: bold; font-size: 15px;">Bảng giá KH: ${info.name}</div>
                <div style="font-size: 12px; opacity: 0.85;">SĐT ${info.phone} – ID #${info.id}</div>
            </div>
            <a href="${url}" target="_blank" rel="noopener"
               style="color: white; text-decoration: none;
                      background: rgba(255,255,255,0.2); padding: 6px 14px; border-radius: 6px;
                      font-size: 13px; font-weight: 600; white-space: nowrap;"
               onmouseover="this.style.background='rgba(255,255,255,0.35)'"
               onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                Mở bảng giá ↗
            </a>
        </div>`;

    const productApp = document.querySelector('app-product-add-order');
    if (productApp) {
        productApp.parentElement.insertBefore(el, productApp);
    } else {
        const productHeader = findProductHeader();
        if (productHeader) {
            productHeader.closest('.card')?.insertAdjacentElement('beforebegin', el);
        }
    }
}

// --- MAIN RUNNER ---
function runMainLogic() {
    const isProductPage = location.href.includes("/product/");
    const isOrderPage = location.href.includes("/order/");
    const isOrderEdit = location.href.includes("/order/manage/add") || location.href.includes("/order/manage/edit");

    columnIndices = detectColumnIndices();
    const tapePrices = fetchTapePricesSafely();

    if (isOrderPage && !isOrderEdit && document.querySelector(".tableDataGird, #dgOrders, table.table")) {
        if (tapePrices) processTapePrices(tapePrices);
        linkifyNotes();
        makeOrderIdsClickable();
        withSelfWrite(() => addCopyOrderIdButtons());
    }

    // Cleanup when not on edit page (Angular SPA navigation)
    if (!isOrderEdit) {
        const vatWarning = document.getElementById('nhanhVatWarning');
        if (vatWarning) vatWarning.remove();
        const priceBanner = document.getElementById('nhanhCustomerPriceBanner');
        if (priceBanner) { priceBanner.remove(); lastDetectedPhone = null; }
    }

    if (isProductPage && document.querySelector(".tableDataGird, #dgProductIndex, table.table")) {
        getProductRows().forEach(row => {
            if (typeof addProductionLinkArrow === "function") addProductionLinkArrow(row);
            withSelfWrite(() => addCopyNameButton(row));
            if (!row.dataset.exportChecked) {
                const pid = getProductIdFromRow(row);
                if (pid) {
                    row.dataset.exportChecked = "1";
                    const cached = loadExportCache()[pid];
                    if (cached) {
                        // Có cache: hiện số ngay, chỉ gọi mạng nếu cache đã quá 30 phút
                        updateProductRowDisplay(row, cached.quantity);
                        if ((Date.now() - cached.timestamp) >= 30 * 60 * 1000) enqueueExportFetch(pid);
                    } else {
                        withSelfWrite(() => insertExportPlaceholder(row));
                        enqueueExportFetch(pid);
                    }
                }
            }
        });
        createExportFilterToolbar();
    }

    if (isOrderEdit) {
        showCustomerPriceBanner();
        // Nút copy tên SP ngay sau tên (tái dùng nút của trang danh sách sản phẩm)
        document.querySelectorAll("tr.productItem").forEach(row => {
            withSelfWrite(() => addCopyNameButton(row));
        });
        enhanceProductRows_EditPage();
        setupEditPageDelegation();
        addQuickSearchButtons();
        handleAvailableItems();
        handleTableChange();
        autoClickSelfShipping();
        initVatCheck();
    }
}

// --- OBSERVER ---
let observerTimeout;
const observer = new MutationObserver(() => {
    // Bỏ qua mutation do chính extension ghi (badge Xuất 30 ngày, placeholder...)
    // để không tự kích hoạt runMainLogic dây chuyền gây lag trang
    if (extSelfWrite > 0) return;
    if (observerTimeout) clearTimeout(observerTimeout);
    observerTimeout = setTimeout(runMainLogic, 300);
});
observer.observe(document.body, { childList: true, subtree: true });

const wrapHistory = (type) => {
    const orig = history[type];
    return function () {
        const rv = orig.apply(this, arguments);
        setTimeout(runMainLogic, 100);
        return rv;
    };
};
history.pushState = wrapHistory("pushState");
history.replaceState = wrapHistory("replaceState");
window.addEventListener("popstate", () => setTimeout(runMainLogic, 100));

runMainLogic();

})();

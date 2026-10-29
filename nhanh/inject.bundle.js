/* Nhanh.vn V2 — inject.bundle.js v1.0.0 (đã ký; build 2026-10-29T03:38:53.092Z) */
(function () {
  if (window["__payload_inject_bundle_js"]) return;
  window["__payload_inject_bundle_js"] = "1.0.0";
  try { document.documentElement.setAttribute("data-nhx-payload", "1.0.0"); } catch (e) {}

window.addEventListener('nhanh-ext-fill-price', function (e) {
    var marker = e.detail && e.detail.marker;
    var value = e.detail && e.detail.value;
    if (!marker) return;
    var input = document.querySelector('[data-nhanh-fill="' + marker + '"]');
    if (!input) return;
    input.removeAttribute('data-nhanh-fill');

    var digits = String(value).replace(/[^\d]/g, '');
    var currentDigits = function () { return String(input.value || '').replace(/[^\d]/g, ''); };

    function fillByPaste(done) {
        input.focus();
        setTimeout(function () {
            input.select();
            var dt = new DataTransfer();
            dt.setData('text/plain', digits);
            input.dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true }));
            setTimeout(function () {
                input.dispatchEvent(new Event('change', { bubbles: true }));
                input.blur();
                input.dispatchEvent(new FocusEvent('blur'));
                setTimeout(done, 300);
            }, 150);
        }, 120);
    }

    function fillByNativeSetter(done) {
        var setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
        input.focus();
        setter.call(input, digits);
        input.dispatchEvent(new Event('input', { bubbles: true }));
        setTimeout(function () {
            input.dispatchEvent(new Event('change', { bubbles: true }));
            input.blur();
            input.dispatchEvent(new FocusEvent('blur'));
            setTimeout(done, 300);
        }, 150);
    }

    function fillByTyping() {
        input.focus();
        setTimeout(function () {
            input.select();
            var chars = digits.split('');
            var i = 0;
            (function typeNext() {
                if (i >= chars.length) {
                    setTimeout(function () { input.blur(); }, 60);
                    return;
                }
                var c = chars[i];
                var code = c.charCodeAt(0);
                input.dispatchEvent(new KeyboardEvent('keydown', { key: c, keyCode: code, which: code, bubbles: true, cancelable: true }));
                input.dispatchEvent(new KeyboardEvent('keypress', { key: c, keyCode: code, which: code, charCode: code, bubbles: true, cancelable: true }));
                input.dispatchEvent(new KeyboardEvent('keyup', { key: c, keyCode: code, which: code, bubbles: true, cancelable: true }));
                i++;
                setTimeout(typeNext, 30);
            })();
        }, 120);
    }

    fillByPaste(function () {
        if (currentDigits() === digits) return;
        fillByNativeSetter(function () {
            if (currentDigits() === digits) return;
            fillByTyping();
        });
    });
});

function hasVatProductMainWorld() {
    var rows = document.querySelectorAll('tr.productItem .colName');
    for (var j = 0; j < rows.length; j++) {
        if (rows[j].textContent.indexOf('VAT') !== -1) return true;
    }
    var links = document.querySelectorAll('a[href*="/product/item/detail"]');
    for (var k = 0; k < links.length; k++) {
        if (links[k].textContent.indexOf('VAT') !== -1) return true;
    }
    return false;
}

document.addEventListener('keydown', function (e) {
    if (!location.href.includes('/order/manage/edit') && !location.href.includes('/order/manage/add')) return;
    if ((e.key === 'F9' || e.key === 'F10') && !hasVatProductMainWorld()) {
        e.preventDefault();
        e.stopImmediatePropagation();
        alert('⚠️ Đơn hàng chưa có sản phẩm VAT 8%!\nVui lòng thêm VAT 8% trước khi lưu.');
    }
}, true);

document.addEventListener('click', function (e) {
    if (!location.href.includes('/order/manage/edit') && !location.href.includes('/order/manage/add')) return;
    var btn = e.target.closest('button');
    if (!btn) return;
    var text = btn.textContent.trim();
    if ((text.indexOf('Lưu') !== -1 || text.indexOf('F9') !== -1 || text.indexOf('F10') !== -1)) {
        if (!hasVatProductMainWorld()) {
            e.preventDefault();
            e.stopImmediatePropagation();
            alert('⚠️ Đơn hàng chưa có sản phẩm VAT 8%!\nVui lòng thêm VAT 8% trước khi lưu.');
        }
    }
}, true);

})();

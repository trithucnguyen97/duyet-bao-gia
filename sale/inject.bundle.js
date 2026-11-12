/* Nhanh vn Đại Dương (Sale) — inject.bundle.js v1.0.2 (đã ký; build 2026-11-12T07:17:55.864Z) */
(function () {
  if (window["__payload_inject_bundle_js"]) return;
  window["__payload_inject_bundle_js"] = "1.0.2";
  try { document.documentElement.setAttribute("data-nhs-payload", "1.0.2"); } catch (e) {}
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

(function () {
    var RE = /\/media\/presign|\/upload\/pos|\/api\/upload\/confirmsuccess|\/upload/i;
    function emit(d) { window.dispatchEvent(new CustomEvent('nhanh-ext-upload-activity', { detail: d })); }
    function kindOf(u) {
        if (/confirmsuccess/i.test(u)) return 'confirm';
        if (/upload\/pos/i.test(u)) return 'bytes';
        if (/presign/i.test(u)) return 'presign';
        return 'other';
    }
    function parseResult(text, httpOk) {
        var ok = httpOk, msg = '';
        try {
            var j = JSON.parse(text);
            if (typeof j.code !== 'undefined') ok = ok && String(j.code) === '1';
            if (j.messages) msg = Array.isArray(j.messages) ? j.messages.join('; ') : String(j.messages);
        } catch (e) { /* không phải JSON */ }
        return { ok: ok, message: msg };
    }

    var origFetch = window.fetch;
    window.fetch = function (input, init) {
        var u = typeof input === 'string' ? input : (input && input.url) || '';
        if (!RE.test(u)) return origFetch.apply(this, arguments);
        var k = kindOf(u);
        emit({ state: 'start', url: u, kind: k });
        return origFetch.apply(this, arguments).then(function (res) {
            try {
                res.clone().text().then(function (t) {
                    var r = parseResult(t, res.ok);
                    emit({ state: 'end', url: u, kind: k, ok: r.ok, message: r.message });
                }).catch(function () { emit({ state: 'end', url: u, kind: k, ok: res.ok }); });
            } catch (e) { emit({ state: 'end', url: u, kind: k, ok: res.ok }); }
            return res;
        }, function (err) {
            emit({ state: 'end', url: u, kind: k, ok: false, message: String(err) });
            throw err;
        });
    };

    var origOpen = XMLHttpRequest.prototype.open;
    var origSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.open = function (m, u) {
        this.__nhanhExtUrl = String(u || '');
        return origOpen.apply(this, arguments);
    };
    XMLHttpRequest.prototype.send = function () {
        var x = this, u = x.__nhanhExtUrl || '';
        if (RE.test(u)) {
            var k = kindOf(u);
            emit({ state: 'start', url: u, kind: k });
            x.addEventListener('loadend', function () {
                var r = parseResult(x.responseText, x.status >= 200 && x.status < 300);
                emit({ state: 'end', url: u, kind: k, ok: r.ok, message: r.message });
            });
            if (x.upload) {
                x.upload.addEventListener('progress', function (e) {
                    if (e.lengthComputable) emit({ state: 'progress', url: u, kind: k, loaded: e.loaded, total: e.total });
                });
            }
        }
        return origSend.apply(this, arguments);
    };
})();

})();

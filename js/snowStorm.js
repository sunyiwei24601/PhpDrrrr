
var snowStorm = function() {
    this.mobileSettings = {
        flakesMax: 64,
        flakesMaxActive: 32
    }, this.autoStart = !1, this.excludeMobile = !1, this.flakesMax = 128, this.flakesMaxActive = 64, this.animationInterval = 33, this.useGPU = !0, this.className = null, this.flakeBottom = null, this.followMouse = !0, this.snowColor = "#fff", this.snowCharacter = "&bull;", this.snowStick = !0, this.targetElement = null, this.useMeltEffect = !0, this.useTwinkleEffect = !1, this.usePositionFixed = !1, this.usePixelPosition = !1, this.freezeOnBlur = !1, this.flakeLeftOffset = 0, this.flakeRightOffset = 0, this.flakeWidth = 8, this.flakeHeight = 8, this.vMaxX = 5, this.vMaxY = 4, this.zIndex = 0;
    var t, e = this,
        i = navigator.userAgent.match(/msie/i),
        n = navigator.userAgent.match(/msie 6/i),
        o = i && "BackCompat" === document.compatMode || n,
        s = null,
        a = null,
        r = null,
        l = null,
        h = null,
        u = null,
        c = null,
        f = 1,
        d = !1,
        m = !1,
        p = function() {
            try {
                document.createElement("div").style.opacity = "0.5"
            } catch (t) {
                return !1
            }
            return !0
        }(),
        v = !1,
        y = document.createDocumentFragment();
    if (false)
        for (var g in this.mobileSettings) this[g] = this.mobileSettings[g];

    function w(t, e) {
        return isNaN(e) && (e = 0), Math.random() * t + e
    }

    function x() {
        window.setTimeout(function() {
            e.start(!0)
        }, 20), e.events.remove(i ? document : window, "mousemove", x)
    }
    return t = function() {
        var t;
        var i, n = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
            window.setTimeout(t, 1e3 / (e.animationInterval || 20))
        };

        function o(t) {
            return void 0 !== i.style[t] ? t : null
        }
        t = n ? function() {
            return n.apply(window, arguments)
        } : null, i = document.createElement("div");
        var s = {
            transform: {
                ie: o("-ms-transform"),
                moz: o("MozTransform"),
                opera: o("OTransform"),
                webkit: o("webkitTransform"),
                w3: o("transform"),
                prop: null
            },
            getAnimationFrame: t
        };
        return s.transform.prop = s.transform.w3 || s.transform.moz || s.transform.webkit || s.transform.ie || s.transform.opera, i = null, s
    }(), this.timer = null, this.flakes = [], this.disabled = !1, this.active = !1, this.meltFrameCount = 20, this.meltFrames = [], this.setXY = function(t, i, n) {
        if (!t) return !1;
        e.usePixelPosition || m ? (t.style.left = i - e.flakeWidth + "px", t.style.top = n - e.flakeHeight + "px") : o ? (t.style.right = 100 - i / s * 100 + "%", t.style.top = Math.min(n, h - e.flakeHeight) + "px") : e.flakeBottom ? (t.style.right = 100 - i / s * 100 + "%", t.style.top = Math.min(n, h - e.flakeHeight) + "px") : (t.style.right = 100 - i / s * 100 + "%", t.style.bottom = 100 - n / r * 100 + "%")
    }, this.events = function() {
        var t = !window.addEventListener && window.attachEvent,
            e = Array.prototype.slice,
            i = {
                add: t ? "attachEvent" : "addEventListener",
                remove: t ? "detachEvent" : "removeEventListener"
            };

        function n(i) {
            var n = e.call(i),
                o = n.length;
            return t ? (n[1] = "on" + n[1], o > 3 && n.pop()) : 3 === o && n.push(!1), n
        }

        function o(e, n) {
            var o = e.shift(),
                s = [i[n]];
            t ? o[s](e[0], e[1]) : o[s].apply(o, e)
        }
        return {
            add: function() {
                o(n(arguments), "add")
            },
            remove: function() {
                o(n(arguments), "remove")
            }
        }
    }(), this.randomizeWind = function() {
        var t, i;
        if (i = w(e.vMaxX, .2), u = 1 === parseInt(w(2), 10) ? -1 * i : i, c = w(e.vMaxY, .2), this.flakes)
            for (t = 0; t < this.flakes.length; t++) this.flakes[t].active && this.flakes[t].setVelocities()
    }, this.scrollHandler = function() {
        var t;
        if (l = e.flakeBottom ? 0 : parseInt(window.scrollY || document.documentElement.scrollTop || (o ? document.body.scrollTop : 0), 10), isNaN(l) && (l = 0), !d && !e.flakeBottom && e.flakes)
            for (t = 0; t < e.flakes.length; t++) 0 === e.flakes[t].active && e.flakes[t].stick()
    }, this.resizeHandler = function() {
        window.innerWidth || window.innerHeight ? (s = window.innerWidth - 16 - e.flakeRightOffset, r = e.flakeBottom || window.innerHeight) : (s = (document.documentElement.clientWidth || document.body.clientWidth || document.body.scrollWidth) - (i ? 0 : 8) - e.flakeRightOffset, r = e.flakeBottom || document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight), h = document.body.offsetHeight, a = parseInt(s / 2, 10)
    }, this.resizeHandlerAlt = function() {
        s = e.targetElement.offsetWidth - e.flakeRightOffset, r = e.flakeBottom || e.targetElement.offsetHeight, a = parseInt(s / 2, 10), h = document.body.offsetHeight
    }, this.freeze = function() {
        if (e.disabled) return !1;
        e.disabled = 1, e.timer = null
    }, this.resume = function() {
        if (!e.disabled) return !1;
        e.disabled = 0, e.timerInit()
    }, this.toggleSnow = function() {
        e.flakes.length ? (e.active = !e.active, e.active ? (e.show(), e.resume()) : (e.stop(), e.freeze())) : e.start()
    }, this.stop = function() {
        var t;
        for (this.freeze(), t = 0; t < this.flakes.length; t++) this.flakes[t].o.style.display = "none";
        e.events.remove(window, "scroll", e.scrollHandler), e.events.remove(window, "resize", e.resizeHandler), e.freezeOnBlur && (i ? (e.events.remove(document, "focusout", e.freeze), e.events.remove(document, "focusin", e.resume)) : (e.events.remove(window, "blur", e.freeze), e.events.remove(window, "focus", e.resume)))
    }, this.show = function() {
        var t;
        for (t = 0; t < this.flakes.length; t++) this.flakes[t].o.style.display = "block"
    }, this.SnowFlake = function(i, n, a) {
        var h = this;
        this.type = i, this.x = n || parseInt(w(s - 20), 10), this.y = isNaN(a) ? -w(r) - 12 : a, this.vX = null, this.vY = null, this.vAmpTypes = [1, 1.2, 1.4, 1.6, 1.8], this.vAmp = this.vAmpTypes[this.type] || 1, this.melting = !1, this.meltFrameCount = e.meltFrameCount, this.meltFrames = e.meltFrames, this.meltFrame = 0, this.twinkleFrame = 0, this.active = 1, this.fontSize = 10 + this.type / 5 * 10, this.o = document.createElement("div"), this.o.innerHTML = e.snowCharacter, e.className && this.o.setAttribute("class", e.className), this.o.style.color = e.snowColor, this.o.style.position = d ? "fixed" : "absolute", e.useGPU && t.transform.prop && (this.o.style[t.transform.prop] = "translate3d(0px, 0px, 0px)"), this.o.style.width = e.flakeWidth + "px", this.o.style.height = e.flakeHeight + "px", this.o.style.fontFamily = "arial,verdana", this.o.style.cursor = "default", this.o.style.overflow = "hidden", this.o.style.fontWeight = "normal", this.o.style.zIndex = e.zIndex, y.appendChild(this.o), this.refresh = function() {
            if (isNaN(h.x) || isNaN(h.y)) return !1;
            e.setXY(h.o, h.x, h.y)
        }, this.stick = function() {
            o || e.targetElement !== document.documentElement && e.targetElement !== document.body ? h.o.style.top = r + l - e.flakeHeight + "px" : e.flakeBottom ? h.o.style.top = e.flakeBottom + "px" : (h.o.style.display = "none", h.o.style.top = "auto", h.o.style.bottom = "0%", h.o.style.position = "fixed", h.o.style.display = "block")
        }, this.vCheck = function() {
            h.vX >= 0 && h.vX < .2 ? h.vX = .2 : h.vX < 0 && h.vX > -.2 && (h.vX = -.2), h.vY >= 0 && h.vY < .2 && (h.vY = .2)
        }, this.move = function() {
            var t = h.vX * f;
            h.x += t, h.y += h.vY * h.vAmp, h.x >= s || s - h.x < e.flakeWidth ? h.x = 0 : t < 0 && h.x - e.flakeLeftOffset < -e.flakeWidth && (h.x = s - e.flakeWidth - 1), h.refresh(), r + l - h.y + e.flakeHeight < e.flakeHeight ? (h.active = 0, e.snowStick ? h.stick() : h.recycle()) : (e.useMeltEffect && h.active && h.type < 3 && !h.melting && Math.random() > .998 && (h.melting = !0, h.melt()), e.useTwinkleEffect && (h.twinkleFrame < 0 ? Math.random() > .97 && (h.twinkleFrame = parseInt(8 * Math.random(), 10)) : (h.twinkleFrame--, p ? h.o.style.opacity = h.twinkleFrame && h.twinkleFrame % 2 == 0 ? 0 : 1 : h.o.style.visibility = h.twinkleFrame && h.twinkleFrame % 2 == 0 ? "hidden" : "visible")))
        }, this.animate = function() {
            h.move()
        }, this.setVelocities = function() {
            h.vX = u + w(.12 * e.vMaxX, .1), h.vY = c + w(.12 * e.vMaxY, .1)
        }, this.setOpacity = function(t, e) {
            if (!p) return !1;
            t.style.opacity = e
        }, this.melt = function() {
            e.useMeltEffect && h.melting && h.meltFrame < h.meltFrameCount ? (h.setOpacity(h.o, h.meltFrames[h.meltFrame]), h.o.style.fontSize = h.fontSize - h.fontSize * (h.meltFrame / h.meltFrameCount) + "px", h.o.style.lineHeight = e.flakeHeight + 2 + .75 * e.flakeHeight * (h.meltFrame / h.meltFrameCount) + "px", h.meltFrame++) : h.recycle()
        }, this.recycle = function() {
            h.o.style.display = "none", h.o.style.position = d ? "fixed" : "absolute", h.o.style.bottom = "auto", h.setVelocities(), h.vCheck(), h.meltFrame = 0, h.melting = !1, h.setOpacity(h.o, 1), h.o.style.padding = "0px", h.o.style.margin = "0px", h.o.style.fontSize = h.fontSize + "px", h.o.style.lineHeight = e.flakeHeight + 2 + "px", h.o.style.textAlign = "center", h.o.style.verticalAlign = "baseline", h.x = parseInt(w(s - e.flakeWidth - 20), 10), h.y = parseInt(-1 * w(r), 10) - e.flakeHeight, h.refresh(), h.o.style.display = "block", h.active = 1
        }, this.recycle(), this.refresh()
    }, this.snow = function() {
        var i, n, o = 0,
            s = null;
        for (i = 0, n = e.flakes.length; i < n; i++) 1 === e.flakes[i].active && (e.flakes[i].move(), o++), e.flakes[i].melting && e.flakes[i].melt();
        o < e.flakesMaxActive && 0 === (s = e.flakes[parseInt(w(e.flakes.length), 10)]).active && (s.melting = !0), e.timer && t.getAnimationFrame(e.snow)
    }, this.mouseMove = function(t) {
        if (!e.followMouse) return !0;
        var i = parseInt(t.clientX, 10);
        f = i < a ? i / a * 2 - 2 : (i -= a) / a * 2
    }, this.createSnow = function(t, i) {
        var n;
        for (n = 0; n < t; n++) e.flakes[e.flakes.length] = new e.SnowFlake(parseInt(w(6), 10)), (i || n > e.flakesMaxActive) && (e.flakes[e.flakes.length - 1].active = -1);
        e.targetElement.appendChild(y)
    }, this.timerInit = function() {
        e.timer = !0, e.snow()
    }, this.init = function() {
        var t;
        for (t = 0; t < e.meltFrameCount; t++) e.meltFrames.push(1 - t / e.meltFrameCount);
        e.randomizeWind(), e.createSnow(e.flakesMax), e.events.add(window, "resize", e.resizeHandler), e.events.add(window, "scroll", e.scrollHandler), e.freezeOnBlur && (i ? (e.events.add(document, "focusout", e.freeze), e.events.add(document, "focusin", e.resume)) : (e.events.add(window, "blur", e.freeze), e.events.add(window, "focus", e.resume))), e.resizeHandler(), e.scrollHandler(), e.followMouse && e.events.add(i ? document : window, "mousemove", e.mouseMove), e.animationInterval = Math.max(20, e.animationInterval), e.timerInit()
    }, this.start = function(t) {
        if (!v) {
            if (v = !0, t) return !0;
            if ("string" == typeof e.targetElement) {
                var i = e.targetElement;
                if (e.targetElement = document.getElementById(i), !e.targetElement) throw new Error('Snowstorm: Unable to get targetElement "' + i + '"')
            }
            if (e.targetElement || (e.targetElement = document.body || document.documentElement), e.targetElement !== document.documentElement && e.targetElement !== document.body && (e.resizeHandler = e.resizeHandlerAlt, e.usePixelPosition = !0), e.resizeHandler(), e.usePositionFixed = e.usePositionFixed && !o && !e.flakeBottom, window.getComputedStyle) try {
                m = "relative" === window.getComputedStyle(e.targetElement, null).getPropertyValue("position")
            } catch (t) {
                m = !1
            }
            d = e.usePositionFixed, s && r && !e.disabled && (e.init(), e.active = !0)
        }
    }, e.autoStart && e.events.add(window, "load", function t() {
        e.excludeMobile && false|| x(), e.events.remove(window, "load", t)
    }, !1), this
};
snowStorm = new snowStorm;
var elevator = function() {
    this.talks = $("#talks");
    var t = !1,
        e = function(t) {
            $("<div />", {
                class: "elevator system",
                text: t
            }).prependTo(this.talks)
        },
        n = 1e3,
        o = 2,
        s = !0,
        a = !1,
        r = function() {
            i++, e("►► 電梯：已到達第 " + i + " 層。"), 100 == i && swal("電梯", "很抱歉得通知您，本次電梯忘了安裝減速裝置。")
        },
        l = function() {
            if (a) {
                if (!($("#talks > .elevator").length > 0)) return t = !1, e("►► 電梯：已著地。正在重新加載環境。。。"), void window.setTimeout(function() {
                    window.location.reload()
                }, 4e3);
                n > 5 && (n /= 1.1), i--, $("#talks > *").first().remove()
            } else 1138 == i ? (i++, e("►► 電梯：已到達頂層。")) : i > 1138 ? n < 1e3 ? (i++, n *= 1.1, s ? (e("►► 電梯：已突破頂層！"), s = !1) : (e("►► 電梯：已突破頂層！!"), s = !0)) : a = !0 : i == 1 + o + 18 ? (n /= 1.4, o *= 2, r()) : r();
            setTimeout(l, n)
        };
    return i = 1, this.start = function() {
        t || (t = !0, $.cookie("elevator-started") ? $.removeCookie("elevator-started") : ($.cookie("elevator-started", "true"), e("►► 歡迎乘坐電梯，我們建議您就近找到座位，並系上安全帶。"), e("►► 電梯：您現在在 " + i + " 層。"), setTimeout(l, 3e3)))
    }, this.setSpeed = function(t) {
        n = 1 / t * 1e3
    }, this
};
elevator = new elevator;
var firework = function() {
    var t = window.innerWidth,
        e = window.innerHeight,
        i = {
            x: 400,
            y: 300
        },
        n = document.createElement("canvas"),
        o = n.getContext("2d"),
        s = [],
        a = [],
        r = 400,
        l = 1,
        h = !1,
        u = null,
        c = null;
    this.start = function() {
        if (!h) {
            h = !0,
                function() {
                    if ($(n).css({
                        position: "fixed"
                    }).prependTo(document.body), n.width = t, n.height = e, window.devicePixelRatio > 1) {
                        var i = o.backingStorePixelRatio || o.webkitBackingStorePixelRatio || o.mozBackingStorePixelRatio || o.msBackingStorePixelRatio || o.oBackingStorePixelRatio || o.backingStorePixelRatio || 1;
                        (l = (window.devicePixelRatio || 1) / i) > 1 && (n.style.height = n.height + "px", n.style.width = n.width + "px", n.width *= l, n.height *= l), o.scale(window.devicePixelRatio, window.devicePixelRatio)
                    }
                }();
            var i = 1;
            false && (i = 4), f(), u = setInterval(d, 800 * l * i), c = setInterval(p, 1e3 * l * i / 50)
        }
    }, this.stop = function() {
        clearInterval(u), clearInterval(c)
    };
    var f = function() {
        false? i = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        } : ($(document).mousemove(function(t) {
            t.preventDefault(), i = {
                x: t.clientX,
                y: t.clientY
            }
        }), $(document).mousedown(function(e) {
            for (var i = 0; i < 5; i++) m(Math.random() * t * 2 / 3 + t / 6)
        }))
    };

    function d() {
        m(i.x)
    }

    function m(t) {
        if (a.length < 10) {
            var e = new y(t);
            e.explosionColor = 10 * Math.floor(360 * Math.random() / 10), e.vel.y = -3 * Math.random() - 4, e.vel.x = 6 * Math.random() - 3, e.size = 8, e.shrink = .999, e.gravity = .01, a.push(e)
        }
    }

    function p() {
        t != window.innerWidth && (n.width = t = window.innerWidth, n.style.width = n.width + "px", n.width *= l, o.scale(window.devicePixelRatio, window.devicePixelRatio)), e != window.innerHeight && (n.height = e = window.innerHeight, n.style.height = n.height + "px", n.height *= l, o.scale(window.devicePixelRatio, window.devicePixelRatio)), o.fillStyle = "rgba(0, 0, 0, 0.05)", o.fillRect(0, 0, t, e);
        for (var h = [], u = 0; u < a.length; u++) {
            a[u].update(), a[u].render(o);
            var c = Math.sqrt(Math.pow(i.x - a[u].pos.x, 2) + Math.pow(i.y - a[u].pos.y, 2)),
                f = a[u].pos.y < 2 * e / 3 && 100 * Math.random() <= 1;
            a[u].pos.y < e / 5 || a[u].vel.y >= 0 || c < 50 || f ? a[u].explode() : h.push(a[u])
        }
        a = h;
        var d = [];
        for (u = 0; u < s.length; u++) s[u].update(), s[u].exists() && (s[u].render(o), d.push(s[u]));
        for (s = d; s.length > r;) s.shift()
    }

    function v(t) {
        this.pos = {
            x: t ? t.x : 0,
            y: t ? t.y : 0
        }, this.vel = {
            x: 0,
            y: 0
        }, this.shrink = .97, this.size = 2, this.resistance = 1, this.gravity = 0, this.flick = !1, this.alpha = 1, this.fade = 0, this.color = 0
    }

    function y(t) {
        v.apply(this, [{
            x: t,
            y: e
        }]), this.explosionColor = 0
    }
    return v.prototype.update = function() {
        this.vel.x *= this.resistance, this.vel.y *= this.resistance, this.vel.y += this.gravity, this.pos.x += this.vel.x, this.pos.y += this.vel.y, this.size *= this.shrink, this.alpha -= this.fade
    }, v.prototype.render = function(t) {
        if (this.exists()) {
            t.save(), t.globalCompositeOperation = "lighter";
            var e = this.pos.x,
                i = this.pos.y,
                n = this.size / 2,
                o = t.createRadialGradient(e, i, .1, e, i, n);
            o.addColorStop(.1, "rgba(255,255,255," + this.alpha + ")"), o.addColorStop(.8, "hsla(" + this.color + ", 100%, 50%, " + this.alpha + ")"), o.addColorStop(1, "hsla(" + this.color + ", 100%, 50%, 0.1)"), t.fillStyle = o, t.beginPath(), t.arc(this.pos.x, this.pos.y, this.flick ? Math.random() * this.size : this.size, 0, 2 * Math.PI, !0), t.closePath(), t.fill(), t.restore()
        }
    }, v.prototype.exists = function() {
        return this.alpha >= .1 && this.size >= 1
    }, y.prototype = new v, y.prototype.constructor = y, y.prototype.explode = function() {
        for (var t = 10 * Math.random() + 80, e = 0; e < t; e++) {
            var i = new v(this.pos),
                n = Math.random() * Math.PI * 2,
                o = 15 * Math.cos(Math.random() * Math.PI / 2);
            i.vel.x = Math.cos(n) * o, i.vel.y = Math.sin(n) * o, i.size = 10, i.gravity = .2, i.resistance = .92, i.shrink = .05 * Math.random() + .93, i.flick = !0, i.color = this.explosionColor, s.push(i)
        }
    }, y.prototype.render = function(t) {
        if (this.exists()) {
            t.save(), t.globalCompositeOperation = "lighter";
            var e = this.pos.x,
                i = this.pos.y,
                n = this.size / 2,
                o = t.createRadialGradient(e, i, .1, e, i, n);
            o.addColorStop(.1, "rgba(255, 255, 255 ," + this.alpha + ")"), o.addColorStop(1, "rgba(0, 0, 0, " + this.alpha + ")"), t.fillStyle = o, t.beginPath(), t.arc(this.pos.x, this.pos.y, this.flick ? Math.random() * this.size / 2 + this.size / 2 : this.size, 0, 2 * Math.PI, !0), t.closePath(), t.fill(), t.restore()
        }
    }, this
};
firework = new firework;
var fancyLoaded = !0;
! function(t, e) {
    "object" == typeof exports ? module.exports = e(t, t.document) : "function" == typeof define && define.amd ? define(function() {
        return e(t, t.document)
    }) : t.Sketch = e(t, t.document)
}("undefined" != typeof window ? window : this, function(t, e) {
    "use strict";
    var i = "E LN10 LN2 LOG2E LOG10E PI SQRT1_2 SQRT2 abs acos asin atan ceil cos exp floor log round sin sqrt tan atan2 pow max min".split(" "),
        n = Math,
        o = "canvas",
        s = "dom",
        a = e,
        r = t,
        l = [],
        h = {
            fullscreen: !0,
            autostart: !0,
            autoclear: !0,
            autopause: !0,
            container: a.body,
            interval: 1,
            globals: !0,
            retina: !1,
            type: o
        },
        u = {
            8: "BACKSPACE",
            9: "TAB",
            13: "ENTER",
            16: "SHIFT",
            27: "ESCAPE",
            32: "SPACE",
            37: "LEFT",
            38: "UP",
            39: "RIGHT",
            40: "DOWN"
        };

    function c(t) {
        return "function" == typeof t
    }

    function f(t) {
        return "string" == typeof t
    }

    function d(t, e, i) {
        for (var n in e) !i && n in t || (t[n] = e[n]);
        return t
    }

    function m(t, e) {
        return function() {
            t.apply(e, arguments)
        }
    }

    function p(t) {
        var e, i, n, h, p, v, y, g, w, x, k, b, F, E, C, S, z, A = 0,
            I = [],
            R = !1,
            H = !1,
            T = r.devicePixelRatio || 1,
            B = t.type == s,
            W = t.type == o,
            O = {
                x: 0,
                y: 0,
                ox: 0,
                oy: 0,
                dx: 0,
                dy: 0
            },
            N = [t.eventTarget || t.element, $, "mousedown", "touchstart", $, "mousemove", "touchmove", $, "mouseup", "touchend", $, "click", $, "mouseout", $, "mouseover", a, function(e) {
                b = e.keyCode, F = "keyup" == e.type, D[b] = D[(i = b, u[i] || String.fromCharCode(i))] = !F, X(t[e.type], e);
                var i
            }, "keydown", "keyup", r, function(e) {
                t.autopause && ("blur" == e.type ? U : V)();
                X(t[e.type], e)
            }, "focus", "blur", _, "resize"],
            D = {};
        for (b in u) D[u[b]] = !1;

        function X(e) {
            c(e) && e.apply(t, [].splice.call(arguments, 1))
        }

        function Y(t) {
            for (v = 0; v < N.length; v++) f(w = N[v]) ? n[(t ? "add" : "remove") + "EventListener"].call(n, w, i, !1) : c(w) ? i = w : n = w
        }

        function L() {
            M(e), e = P(L), H || (X(t.setup), H = c(t.setup)), R || (X(t.resize), R = c(t.resize)), t.running && !A && (t.dt = (g = +new Date) - t.now, t.millis += t.dt, t.now = g, X(t.update), W && (t.retina && (t.save(), t.autoclear && t.scale(T, T)), t.autoclear && t.clear()), X(t.draw), W && t.retina && t.restore()), A = ++A % t.interval
        }

        function _() {
            n = B ? t.style : t.canvas, y = B ? "px" : "", S = t.width, z = t.height, t.fullscreen && (z = t.height = r.innerHeight, S = t.width = r.innerWidth), t.retina && W && T && (n.style.height = z + "px", n.style.width = S + "px", S *= T, z *= T), n.height !== z && (n.height = z + y), n.width !== S && (n.width = S + y), W && !t.autoclear && t.retina && t.scale(T, T), H && X(t.resize)
        }

        function G(e, i) {
            return function(t, e) {
                p = e.getBoundingClientRect(), t.x = t.pageX - p.left - (r.scrollX || r.pageXOffset), t.y = t.pageY - p.top - (r.scrollY || r.pageYOffset)
            }(e, t.element), (i = i || {}).ox = i.x || e.x, i.oy = i.y || e.y, i.x = e.x, i.y = e.y, i.dx = i.x - i.ox, i.dy = i.y - i.oy, i
        }

        function q(e) {
            if (e.currentTarget === t.element && e.preventDefault(), (x = function(t) {
                var e = {};
                for (var i in t) "webkitMovementX" !== i && "webkitMovementY" !== i && (c(t[i]) ? e[i] = m(t[i], t) : e[i] = t[i]);
                return e
            }(e)).originalEvent = e, x.touches)
                for (I.length = x.touches.length, v = 0; v < x.touches.length; v++) I[v] = G(x.touches[v], I[v]);
            else I.length = 0, I[0] = G(x, O);
            return d(O, I[0], !0), x
        }

        function $(e) {
            for (e = q(e), E = (C = N.indexOf(k = e.type)) - 1, t.dragging = !!/down|start/.test(k) || !/up|end/.test(k) && t.dragging; E;) f(N[E]) ? X(t[N[E--]], e) : f(N[C]) ? X(t[N[C++]], e) : E = 0
        }

        function V() {
            t.running || (t.now = +new Date, t.running = !0, e = P(L))
        }

        function U() {
            t.running && (M(e), t.running = !1)
        }
        return d(t, {
            touches: I,
            mouse: O,
            keys: D,
            dragging: !1,
            running: !1,
            millis: 0,
            now: NaN,
            dt: NaN,
            destroy: function() {
                h = t.element.parentNode, v = l.indexOf(t), h && h.removeChild(t.element), ~v && l.splice(v, 1), Y(!1), U()
            },
            toggle: function() {
                (t.running ? U : V)()
            },
            clear: function() {
                W && t.clearRect(0, 0, t.width * T, t.height * T)
            },
            start: V,
            stop: U
        }), l.push(t), t.autostart && V(), Y(!0), _(), L(), t
    }
    for (var v, y, g = {
        CANVAS: o,
        WEB_GL: "webgl",
        WEBGL: "webgl",
        DOM: s,
        instances: l,
        install: function(t) {
            if (!t.__hasSketch) {
                for (var e = 0; e < i.length; e++) t[i[e]] = n[i[e]];
                d(t, {
                    TWO_PI: 2 * n.PI,
                    HALF_PI: n.PI / 2,
                    QUARTER_PI: n.PI / 4,
                    random: function(t, e) {
                        return i = t, "[object Array]" == Object.prototype.toString.call(i) ? t[~~(n.random() * t.length)] : (function(t) {
                            return "number" == typeof t
                        }(e) || (e = t || 1, t = 0), t + n.random() * (e - t));
                        var i
                    },
                    lerp: function(t, e, i) {
                        return t + i * (e - t)
                    },
                    map: function(t, e, i, n, o) {
                        return (t - e) / (i - e) * (o - n) + n
                    }
                }), t.__hasSketch = !0
            }
        },
        create: function(t) {
            return (t = d(t || {}, h)).globals && g.install(self), v = t.element = t.element || a.createElement(t.type === s ? "div" : "canvas"), y = t.context = t.context || function() {
                switch (t.type) {
                    case o:
                        return v.getContext("2d", t);
                    case "webgl":
                        return v.getContext("webgl", t) || v.getContext("experimental-webgl", t);
                    case s:
                        return v.canvas = v
                }
            }(), (t.container || a.body).appendChild(v), g.augment(y, t)
        },
        augment: function(t, e) {
            return (e = d(e || {}, h)).element = t.canvas || t, e.element.className += " sketch", d(t, e, !0), p(t)
        }
    }, w = ["ms", "moz", "webkit", "o"], x = self, k = 0, b = "AnimationFrame", F = "request" + b, E = "cancel" + b, P = x[F], M = x[E], C = 0; C < w.length && !P; C++) P = x[w[C] + "Request" + b], M = x[w[C] + "Cancel" + b];
    return x[F] = P = P || function(t) {
        var e = +new Date,
            i = n.max(0, 16 - (e - k)),
            o = setTimeout(function() {
                t(e + i)
            }, i);
        return k = e + i, o
    }, x[E] = M = M || function(t) {
        clearTimeout(t)
    }, g
});

var Visualizer = function() {
    const t = -.032 * Math.PI,
        e = .032 * Math.PI,
        i = ["#69D2E7", "#1B676B", "#BEF202", "#EBE54D", "#00CDAC", "#1693A5", "#F9D423", "#FF4E50", "#E7204E", "#0CCABA", "#FF006F"],
        n = ["#FF4E50", "#fda623", "#EBE54D", "#BEF202", "#69D2E7", "#1693A5", "#FF006F"];
    var o = this;
    this.sketch = null, this.audio = null, this.state = "paused";
    var s, a, r, l, h, u, c, f, d, m, p, v, y, g, w, x, k, b, F, E, P, M, C, S, z, A, I, R, H, T, B, W, O, N, D, X, Y, L, _, G, q, V, U, j = [],
        Q = .5,
        K = .5,
        J = !1,
        Z = function(t, e) {
            return this.x = A * cos(t), this.y = A * sin(t), this.r = R * e + I, this.vx = 16 * e * cos(t), this.vy = 16 * e * sin(t), this.isSolid = random(1) > .5, this.alpha = e, this.color = d > 30 ? random(v) : "#FFFFFF", this
        };
    return Z.prototype.draw = function(t) {
        t.save(), t.globalAlpha = this.alpha, t.fillStyle = t.strokeStyle = this.color, t.beginPath(), t.arc(this.x, this.y, this.r, 0, TWO_PI), this.isSolid ? t.fill() : t.stroke(), t.restore()
    }, Z.prototype.decay = function() {
        this.alpha *= .985, this.vx *= .99, this.vy *= .99
    }, Z.prototype.move = function(t) {
        this.x += this.vx, this.y += this.vy, this.y < -K * t.height || this.y > (1 - K) * t.height ? this.bounceY() : (this.x < -Q * t.width || this.x > (1 - Q) * t.width) && this.bounceX()
    }, Z.prototype.bounceY = function() {
        this.vy *= -1
    }, Z.prototype.bounceX = function() {
        this.vx *= -1
    }, H = function(t, e, i, n) {
        var o, s, a, r;
        if (i && n || (i = .25, n = .25), e < 1 ? (o = t[0].x + (t[1].x - t[0].x) * i, s = t[0].y + (t[1].y - t[0].y) * i) : (o = t[e].x + (t[e + 1].x - t[e - 1].x) * i, s = t[e].y + (t[e + 1].y - t[e - 1].y) * i), e > t.length - 3) {
            var l = t.length - 1;
            a = t[l].x - (t[l].x - t[l - 1].x) * n, r = t[l].y - (t[l].y - t[l - 1].y) * n
        } else a = t[e + 1].x - (t[e + 2].x - t[e].x) * n, r = t[e + 1].y - (t[e + 2].y - t[e].y) * n;
        return {
            pA: {
                x: o,
                y: s
            },
            pB: {
                x: a,
                y: r
            }
        }
    }, T = function() {
        var t, e;
        r.getByteTimeDomainData(c), r.getByteFrequencyData(u), t = u.subarray(0, 512).reduce(function(t, e) {
            return t + e
        }) / 512 / 256, e = u.subarray(512, 1024).reduce(function(t, e) {
            return t + e
        }) / 512 / 256, (f = t || e) > .4 ? (d++, d = min(d, 80)) : (d--, d = max(d, 0))
    }, B = function(t) {
        y = .15 * t, g = .1 * t, w = .1167 * t, x = .0833 * t, k = .1125 * t, b = .0083 * t, F = .0083 * t, E = .025 * t, P = .05 * t, M = .1333 * t, C = .0833 * t, S = .025 * t, z = .0033 * t, A = .2333 * t, I = -.03 * t, R = .0667 * t
    }, O = function(t) {
        var e, i, n;
        e = t.createRadialGradient(0, 0, F, 0, 0, y + .5 * g), i = 0, n = 1 / p.length, p.forEach(function(t) {
            i += n, e.addColorStop(i, t)
        }), m = e
    }, W = function(t) {
        var e, o = [];
        t && t.split(/\s+/).forEach(function(t) {
            e = $('<span style="color:' + t + ';"></span>'), e.css("color") && o.push(t)
        }), 0 === o.length ? (v = i, p = n) : (v = o, p = o)
    }, X = function(t) {
        t.save();
        var e, i, n, o, s, a = [];
        for (e = 0; e < 2048; e += 32) i = e / 2048 * TWO_PI, o = (n = w - x * abs(c[e] - 128) / 128) * cos(i), s = n * sin(i), a.push({
            x: o,
            y: s
        });
        t.beginPath(), a.forEach(function(e, i) {
            if (0 == i) t.moveTo(e.x, e.y);
            else {
                var n = H(a, i - 1);
                t.bezierCurveTo(n.pA.x, n.pA.y, n.pB.x, n.pB.y, e.x, e.y)
            }
        }), t.closePath(), t.stroke(), t.restore()
    }, D = function(e) {
        var i, n, o, s, a, r;
        for (e.save(), 768, r = .001 * e.millis * t, e.rotate(r), e.beginPath(), i = 0; i < 768; i += 8) n = i / 768 * TWO_PI, s = y * cos(n), a = y * sin(n), e.moveTo(s, a), s = (o = y + g * max(u[i] - 128, 0) / 128 + .5) * cos(n), a = o * sin(n), e.lineTo(s, a), f > .4 && i > 61.44 && u[i] > 216 && j.length < 256 && j.push(new Z(n + r, (u[i] - 128) / 128));
        e.stroke(), e.restore()
    }, N = function(t) {
        var e = [];
        j.forEach(function(t) {
            t.decay(), t.alpha > .01 && (t.move(this), t.draw(this), e.push(t))
        }, t), j = e
    }, Y = function(t) {
        var i;
        t.save(), i = F + f * E, t.beginPath(), t.arc(0, 0, i, 0, TWO_PI), t.fill(), t.lineWidth = 1, t.beginPath(), t.arc(0, 0, P, 0, TWO_PI), t.stroke(), t.lineCap = "butt", t.lineWidth = b, t.beginPath(), t.arc(0, 0, k, 0, TWO_PI), t.stroke(), i = M + max(f - .4, 0) * C, t.lineWidth = S, t.rotate(.001 * t.millis * e), t.beginPath(), t.arc(0, 0, i, 60 * PI / 180, 120 * PI / 180), t.stroke(), t.beginPath(), t.arc(0, 0, i, 240 * PI / 180, 300 * PI / 180), t.stroke(), t.restore()
    }, L = function() {
        var t = max(400, min(this.width, this.height));
        B(t), W(), O(this), this.lineCap = "round", this.globalCompositeOperation = "lighter", (s = $(".sketch")).css({
            display: "none",
            position: "fixed",
            top: 0,
            "z-index": 9999,
            "pointer-events": "none"
        })
    }, _ = function() {
        T(), this.translate(Q * this.width, K * this.height), this.lineWidth = z, this.globalAlpha = max(min(1.5 * f, .9), .2), this.fillStyle = this.strokeStyle = d > 30 ? m : "#FFFFFF", X(this), D(this), N(this), Y(this), this.translate(-Q * this.width, -K * this.height)
    }, G = function(t) {
        var e, i;
        e = Q * this.width, i = K * this.height, sqrt(pow(this.mouse.x - e, 2) + pow(this.mouse.y - i, 2)) < y && (J = !0)
    }, V = function(t) {
        J = !1
    }, q = function(t) {
        J && this.running && (Q = this.mouse.x / this.width, K = this.mouse.y / this.height, t.preventDefault())
    }, U = function() {
        var t = max(400, min(this.width, this.height));
        B(t), O(this)
    }, this.setup = function(t) {
        o.sketch || (a = new(window.AudioContext || window.webkitAudioContext), (r = a.createAnalyser()).smoothingTimeConstant = .3, r.fftSize = 2048, (h = "undefined" === a.createGain ? a.createGainNode() : a.createGain()).gain.value = t, h.connect(a.destination), a.destination.maxChannelCount > 0 && (a.destination.channelCount = a.destination.maxChannelCount), u = new Uint8Array(r.frequencyBinCount), c = new Uint8Array(r.fftSize), f = d = 0, o.sketch = Sketch && Sketch.create({
            autopause: !1,
            autostart: !1,
            retina: window.devicePixelRatio >= 2,
            eventTarget: document.body,
            setup: L,
            draw: _,
            mousedown: G,
            mouseup: V,
            mousemove: q,
            resize: U
        }))
    }, this.play = function(t) {
        l && (l.disconnect(), o.audio.remove(), o.audio = null), j = [], t.volume = 1, o.audio = t, (l = a.createMediaElementSource(t)).connect(r), l.connect(h), !t.paused && o.resume()
    }, this.stop = function() {
        f = 0, d = 0, j = [], o.pause()
    }, this.pause = function() {
        "paused" !== o.state && "pausing" !== o.state && (o.state = "pausing", s.stop().fadeOut(1e3, function() {
            a.suspend().then(function() {
                o.state = "paused", o.shouldResumeAfterPause && (delete o.shouldResumeAfterPause, o.resume())
            }), o.sketch.stop()
        }))
    }, this.resume = function() {
        "resumed" !== o.state && "resuming" !== o.state && ("pausing" === o.state ? o.shouldResumeAfterPause = !0 : (o.state = "resuming", s.stop().fadeIn(1e3), o.sketch.start(), a.resume().then(function() {
            o.state = "resumed"
        })))
    }, this.changeColor = function(t) {
        W(t), O(o.sketch)
    }, this.changeVolume = function(t) {
        h.gain.value = t
    }, this
};
window.visualizer = new Visualizer;
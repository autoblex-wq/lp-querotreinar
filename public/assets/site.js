/* Quero Treinar — reprodução das interações do site original (Higgsfield).
   1. ScrollScrub: vídeos "esfregados" pelo scroll com crossfade entre capítulos.
   2. Acordeão "Para quem".
   3. Micro-interações dos botões (CTA). */

(function () {
  "use strict";

  var clamp = function (n, lo, hi) {
    if (lo === undefined) lo = 0;
    if (hi === undefined) hi = 1;
    return Math.min(hi, Math.max(lo, n));
  };
  var smoothstep = function (n) {
    var c = clamp(n);
    return c * c * (3 - 2 * c);
  };
  // Easing "linger": segura o meio do clipe para a cena respirar no centro do capítulo.
  var lingerEase = function (n, l) {
    var i = clamp(n);
    var m = clamp(l, 0, 0.6);
    var t = i - 0.5;
    return (1 - m) * i + m * (4 * t * t * t + 0.5);
  };

  /* ---------------- ScrollScrub ---------------- */

  /* Cada cena aceita opcionalmente `from`/`to` (fração 0..1 do vídeo): o scroll
     percorre do ponto `from` ao `to` — com from > to o trecho toca ao contrário.
     Uma página pode definir window.QT_SCENES antes deste script para customizar. */
  var SCENES = window.QT_SCENES || [
    { clip: "assets/world/cap1.mp4", mobileClip: "assets/world/cap1-mobile.mp4", linger: 0.25, textIn: 0.15, textOut: 0.85 },
    { clip: "assets/world/cap2.mp4", mobileClip: "assets/world/cap2-mobile.mp4", linger: 0.2, textIn: 0.4, textOut: 0.85 },
    { clip: "assets/world/cap3.mp4", mobileClip: "assets/world/cap3-mobile.mp4", linger: 0.2, textIn: 0.5, textOut: 0.85 },
    { clip: "assets/world/cap4.mp4", mobileClip: "assets/world/cap4-mobile.mp4", linger: 0.25, textIn: 0.35, textOut: 0.95 },
  ];

  var section = document.querySelector(".scroll-scrub");
  if (section) {
    var layers = Array.prototype.slice.call(section.querySelectorAll("[data-scroll-scrub-layer]"));
    var bands = Array.prototype.slice.call(section.querySelectorAll("[data-scroll-scrub-band]"));
    var routeButtons = Array.prototype.slice.call(section.querySelectorAll(".scroll-scrub__route-button"));
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var coarse = window.matchMedia("(hover: none) and (pointer: coarse)");
    var narrow = window.matchMedia("(max-width: 860px)");
    var isMobile = function () { return coarse.matches || narrow.matches; };

    var items = SCENES.map(function (s, i) {
      return {
        clip: s.clip, mobileClip: s.mobileClip, linger: s.linger,
        from: s.from, to: s.to,
        textIn: s.textIn, textOut: s.textOut,
        layer: layers[i], band: bands[i],
        pin: bands[i] ? bands[i].querySelector(".scroll-scrub__chapter-pin") : null,
        start: 0, end: 0, current: 0, target: 0,
        visible: i === 0, ready: false, loading: false, failed: false,
        video: null, objectUrl: null, loadedSource: null, abort: null,
      };
    }).filter(function (it) { return it.layer && it.band; });

    var sectionTop = 0, total = 1, vh = window.innerHeight, vw = window.innerWidth;
    var dirty = true, active = -1, unlocked = false;

    var srcFor = function (it) { return isMobile() && it.mobileClip ? it.mobileClip : it.clip; };

    var unload = function (it) {
      if (it.abort) it.abort.abort();
      if (it.video) it.video.remove();
      if (it.objectUrl) URL.revokeObjectURL(it.objectUrl);
      it.abort = null; it.video = null; it.objectUrl = null; it.loadedSource = null;
      it.loading = false; it.ready = false; it.failed = false; it.current = it.target;
      delete it.layer.dataset.videoPainted;
      delete it.layer.dataset.videoFailed;
    };

    var measure = function () {
      var y = window.scrollY || window.pageYOffset;
      sectionTop = section.getBoundingClientRect().top + y;
      vh = window.innerHeight;
      vw = window.innerWidth;
      items.forEach(function (it) {
        if (it.loadedSource && it.loadedSource !== srcFor(it)) unload(it);
        var r = it.band.getBoundingClientRect();
        it.start = r.top + y - sectionTop;
        it.end = it.start + r.height;
      });
      var last = items[items.length - 1];
      total = Math.max(last ? last.end : vh, vh);
      dirty = true;
    };

    var createVideo = function (it, url, source) {
      var v = document.createElement("video");
      v.className = "scroll-scrub__video";
      v.muted = true;
      v.playsInline = true;
      v.preload = "auto";
      v.setAttribute("muted", "");
      v.setAttribute("playsinline", "");
      v.src = url;
      v.addEventListener("loadedmetadata", function () {
        if (it.video !== v || it.loadedSource !== source) return;
        it.ready = true;
        it.loading = false;
        it.current = it.target;
        try { v.currentTime = clamp(it.current, 0, 0.999) * (v.duration || 1); } catch (e) {}
        if (unlocked && isMobile()) { v.play().then(function () { v.pause(); }).catch(function () {}); }
      }, { once: true });
      v.addEventListener("seeked", function () {
        if (it.video === v && it.loadedSource === source) it.layer.dataset.videoPainted = "true";
      }, { once: true });
      v.addEventListener("error", function () {
        if (it.video !== v) return;
        v.remove();
        URL.revokeObjectURL(url);
        it.video = null; it.objectUrl = null;
        it.failed = true; it.loading = false; it.ready = false;
        delete it.layer.dataset.videoPainted;
        it.layer.dataset.videoFailed = "true";
      }, { once: true });
      it.layer.appendChild(v);
      it.video = v;
    };

    /* Solta o ELEMENTO de vídeo de cenas distantes (o download fica guardado
       no blob). Celulares limitam quantos vídeos podem decodificar ao mesmo
       tempo — passar do limite deixa a camada preta. Assim, no máximo 2-3
       vídeos ficam ativos; os demais mostram o pôster até se aproximarem. */
    var detach = function (it) {
      if (!it.video) return;
      it.video.remove();
      it.video = null;
      it.ready = false;
      it.loading = false;
      it.current = it.target;
      delete it.layer.dataset.videoPainted;
    };

    var load = function (it) {
      var source = srcFor(it);
      if (reduced || it.loading || it.video || it.failed || !source) return;
      if (it.objectUrl && it.loadedSource === source) {
        it.loading = true;
        createVideo(it, it.objectUrl, source);
        return;
      }
      it.loading = true;
      it.loadedSource = source;
      it.abort = new AbortController();
      var ctrl = it.abort;
      fetch(source, { signal: ctrl.signal })
        .then(function (resp) {
          if (!resp.ok) throw new Error("Clip failed: " + resp.status);
          return resp.blob();
        })
        .then(function (blob) {
          if (ctrl.signal.aborted || it.loadedSource !== source) return;
          var url = URL.createObjectURL(blob);
          it.objectUrl = url;
          createVideo(it, url, source);
        })
        .catch(function (err) {
          if (ctrl.signal.aborted || (err && err.name === "AbortError") || it.loadedSource !== source) return;
          it.layer.dataset.videoFailed = "true";
          it.failed = true;
          it.loading = false;
        });
    };

    var update = function () {
      var y = window.scrollY || window.pageYOffset;
      var s = clamp(y - sectionTop, 0, total);
      var fade = 0.1 * vh;
      var activeIdx = 0;
      items.forEach(function (it, i) {
        if (s >= it.start) activeIdx = i;
        var h = Math.max(it.end - it.start, 1);
        var progress = clamp((s - it.start) / h);
        var eased = it.linger ? lingerEase(progress, it.linger) : progress;
        var from = it.from === undefined ? 0 : it.from;
        var to = it.to === undefined ? 1 : it.to;
        it.target = from + eased * (to - from);
        var dist = 0;
        if (s < it.start) dist = it.start - s;
        if (s > it.end) dist = s - it.end;
        var opacity = smoothstep(1 - dist / Math.max(fade, 1));
        it.dist = dist;
        if (reduced) opacity = dist === 0 ? 1 : 0;
        it.visible = opacity > 0.001;
        it.layer.style.opacity = String(opacity);
        it.layer.style.zIndex = i === activeIdx ? "2" : "1";
        if (it.pin) {
          var text = it.visible
            ? clamp((progress - it.textIn) / 0.1) * clamp((it.textOut - progress) / 0.1)
            : 0;
          it.pin.style.opacity = String(text);
          it.pin.style.transform = "translateY(" + (1 - text) * 20 + "px)";
        }
      });
      /* Gestão dos elementos de vídeo: só as 3 cenas mais próximas ganham
         vídeo; as demais soltam o elemento (o blob fica em memória). O
         conjunto é estável — quem não está no top-3 nem tenta carregar,
         evitando o loop anexa/solta que piscava o fundo no celular. */
      var near = items
        .filter(function (x) { return x.dist < 1.5 * vh; })
        .sort(function (a, b) { return a.dist - b.dist; })
        .slice(0, 3);
      var attachedCount = 0;
      items.forEach(function (x) { if (x.video) attachedCount++; });
      items.forEach(function (x) {
        if (near.indexOf(x) !== -1) {
          load(x);
        } else if (x.video && (x.dist > 2.2 * vh || attachedCount > 3)) {
          detach(x);
          attachedCount--;
        }
      });
      if (activeIdx !== active) {
        active = activeIdx;
        section.dataset.activeSection = String(active);
        routeButtons.forEach(function (b, i) {
          if (i === active) b.setAttribute("aria-current", "step");
          else b.removeAttribute("aria-current");
        });
      }
      section.style.setProperty("--ss-progress", String(clamp(s / total)));
    };

    var scrub = function () {
      items.forEach(function (it) {
        var v = it.video;
        if (!v || !it.ready || v.seeking) return;
        if (!it.visible && Math.abs(it.current - it.target) < 0.002) return;
        it.current += (it.target - it.current) * 0.2;
        var t = clamp(it.current, 0, 0.999) * (v.duration || 1);
        // Encaixa no grid de quadros (24 fps): buscas sub-quadro são inúteis
        // e caras — no máximo uma busca por quadro novo.
        t = Math.round(t * 24) / 24;
        var eps = isMobile() ? 0.042 : 0.02;
        if (Math.abs(v.currentTime - t) > eps) {
          try { v.currentTime = t; } catch (e) {}
        }
      });
    };

    var frame = function () {
      if (dirty) { dirty = false; update(); }
      scrub();
      window.requestAnimationFrame(frame);
    };

    routeButtons.forEach(function (b, i) {
      b.addEventListener("click", function () {
        var it = items[i];
        if (!it) return;
        window.scrollTo({
          top: sectionTop + it.start + 0.15 * (it.end - it.start),
          behavior: reduced ? "auto" : "smooth",
        });
      });
    });

    var markDirty = function () { dirty = true; };
    var onFirstTouch = function () {
      if (unlocked) return;
      unlocked = true;
      items.forEach(function (it) {
        var v = it.video;
        if (v && isMobile()) { v.play().then(function () { v.pause(); }).catch(function () {}); }
      });
    };

    window.addEventListener("scroll", markDirty, { passive: true });
    window.addEventListener("resize", function () {
      if (coarse.matches && window.innerWidth === vw) return;
      measure();
    });
    window.addEventListener("orientationchange", measure);
    window.addEventListener("pointerdown", onFirstTouch, { once: true, passive: true });
    window.addEventListener("touchstart", onFirstTouch, { once: true, passive: true });
    window.addEventListener("load", measure);

    measure();
    window.requestAnimationFrame(frame);
  }

  /* ---------------- Acordeão "Para quem" ---------------- */

  var papeis = document.querySelectorAll("#qt-papeis > button");
  var setPapel = function (idx) {
    Array.prototype.forEach.call(papeis, function (btn, i) {
      var on = i === idx;
      var spans = btn.querySelectorAll(":scope > span");
      var title = spans[0], desc = spans[1];
      btn.setAttribute("aria-expanded", on ? "true" : "false");
      btn.style.flex = on ? "1 1 58%" : "1 1 21%";
      btn.style.minHeight = on ? "20rem" : "5rem";
      btn.style.background = on ? "var(--qt-tan-light)" : "var(--qt-charcoal-soft)";
      btn.style.color = on ? "var(--qt-charcoal)" : "var(--qt-cream)";
      if (title) {
        title.style.writingMode = on ? "horizontal-tb" : "";
        title.style.rotate = on ? "0deg" : "";
      }
      if (desc) {
        desc.style.opacity = on ? "1" : "0";
        desc.style.position = on ? "static" : "absolute";
        desc.style.pointerEvents = on ? "auto" : "none";
      }
    });
  };
  Array.prototype.forEach.call(papeis, function (btn, i) {
    btn.addEventListener("click", function () { setPapel(i); });
  });

  /* ---------------- CTAs ---------------- */

  var bindCta = function (el, opts) {
    el.addEventListener("mouseenter", function () {
      el.style.transform = "translate(-2px, -2px)";
      if (opts.hoverShadow) el.style.boxShadow = opts.hoverShadow;
      if (opts.hoverBg) el.style.background = opts.hoverBg;
      if (opts.hoverColor) el.style.color = opts.hoverColor;
    });
    el.addEventListener("mouseleave", function () {
      el.style.transform = "";
      if (opts.restShadow) el.style.boxShadow = opts.restShadow;
      if (opts.restBg !== undefined) el.style.background = opts.restBg;
      if (opts.restColor) el.style.color = opts.restColor;
    });
    el.addEventListener("mousedown", function () {
      el.style.transform = "scale(0.98)";
    });
    el.addEventListener("mouseup", function () {
      el.style.transform = opts.upTransform !== undefined ? opts.upTransform : "translate(-2px, -2px)";
    });
  };

  Array.prototype.forEach.call(document.querySelectorAll(".qt-cta-comecar"), function (el) {
    bindCta(el, {
      hoverShadow: "7px 7px 0 rgba(29, 26, 23, 0.9)",
      hoverBg: "var(--qt-olive-deep)",
      restShadow: "5px 5px 0 rgba(29, 26, 23, 0.9)",
      restBg: "var(--qt-olive)",
    });
  });

  Array.prototype.forEach.call(document.querySelectorAll(".qt-cta-nav"), function (el) {
    bindCta(el, {
      hoverShadow: "5px 5px 0 rgba(29, 26, 23, 0.9)",
      hoverBg: "var(--qt-olive-deep)",
      restShadow: "3px 3px 0 rgba(29, 26, 23, 0.9)",
      restBg: "var(--qt-olive)",
    });
  });

  Array.prototype.forEach.call(document.querySelectorAll(".qt-cta-contato"), function (el) {
    bindCta(el, {
      hoverBg: "var(--qt-charcoal)",
      hoverColor: "var(--qt-cream)",
      restBg: "transparent",
      restColor: "var(--qt-charcoal)",
      upTransform: "",
    });
  });

  var ano = document.getElementById("qt-ano");
  if (ano) ano.textContent = String(new Date().getFullYear());
})();

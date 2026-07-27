/* Revelação de conteúdo com Anime.js — imagens e textos "emergem" conforme a
   cena de massinha vai passando ao fundo.

   Regra de ouro desta página: nada pode custar trabalho DURANTE a rolagem (o
   motor da animação já usa o quadro inteiro no celular). Por isso:
   - o disparo é por IntersectionObserver (o navegador avisa; não há listener
     de scroll nem cálculo por quadro);
   - cada elemento revela UMA vez e o observador é descartado;
   - só animamos opacity e transform, que a GPU compõe sem repintar;
   - com "reduzir movimento" ligado, nada é escondido nem animado.

   O estado inicial do herói vem do CSS (.qt-anim, ligada no <head>) para não
   piscar; o resto é escondido por aqui, bem antes de entrar em cena. Se o
   Anime.js não carregar, o fallback abaixo devolve tudo ao normal. */

(function () {
  "use strict";

  var root = document.documentElement;
  var A = window.anime;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Sem biblioteca, sem suporte a IntersectionObserver ou com movimento
  // reduzido: mostra tudo e sai (o conteúdo nunca depende da animação).
  if (!A || typeof A.animate !== "function" || reduced ||
      typeof window.IntersectionObserver === "undefined") {
    root.classList.remove("qt-anim");
    return;
  }

  var animate = A.animate;
  var stagger = A.stagger;
  var createTimeline = A.createTimeline;
  var isMobile = window.matchMedia("(hover: none) and (pointer: coarse), (max-width: 860px)").matches;
  var speed = isMobile ? 0.85 : 1; // no celular, um respiro mais curto

  var PRESETS = {
    // Títulos: sobem com um pouco mais de deslocamento.
    title: { y: 22, scale: null, duration: 720, ease: "outExpo" },
    // Corpo de texto: sobe curto, logo atrás do título.
    text: { y: 16, scale: null, duration: 660, ease: "outCubic" },
    // Vídeos e fotos: emergem — sobem e crescem de leve.
    media: { y: 30, scale: 0.965, duration: 900, ease: "outExpo" },
    // Placas 3D que flutuam sobre a cena: chegada mais presente.
    plaque: { y: 38, scale: 0.9, duration: 1000, ease: "outExpo" },
    // Itens de grade (recursos): entrada curta, em cascata.
    card: { y: 18, scale: null, duration: 560, ease: "outCubic" },
  };

  /* Cada grupo é um seletor + preset. Com "children", o gatilho é o
     contêiner e os filhos entram em cascata (stagger). */
  var GROUPS = [
    // --- faixas que rolam sobre a animação ---
    { sel: ".lp-band .lp-copy h3", preset: "title" },
    { sel: ".lp-band .lp-copy p", preset: "text", delay: 90 },
    { sel: ".lp-band .lp-media video, .lp-band .lp-media img", preset: "media" },
    { sel: ".lp-section-title", preset: "title" },
    { sel: ".lp-desafios-card img", preset: "plaque" },
    { sel: ".lp-desafios-aluno p", preset: "title" },
    { sel: ".lp-desafios-aluno img", preset: "media", delay: 110 },
    { sel: ".lp-desafios-phones", children: "img", preset: "media", stagger: 150 },

    // --- seções estáticas depois da animação ---
    { sel: "#nutri-ia .lp-ia-sub", preset: "text" },
    { sel: "#nutri-ia .lp-ia-video", preset: "media" },
    { sel: ".lp-aluno .lp-copy h2", preset: "title" },
    { sel: ".lp-aluno .lp-copy p", preset: "text", delay: 80 },
    { sel: ".lp-aluno-shot", preset: "media" },
    { sel: "#more .lp-recursos-head", preset: "title" },
    { sel: "#more ul", children: "li", preset: "card", stagger: 70 },
    { sel: "#themes .marca-title", preset: "title" },
    { sel: "#themes .colagem", preset: "media" },
    { sel: "#themes > div h3", preset: "title" },
    { sel: "#themes .wizard", preset: "media" },
    { sel: "#themes > div p", preset: "text", delay: 70 },
    { sel: ".teste-badge img", preset: "plaque" },
    { sel: ".final-cta .convite-logo", preset: "media" },
    { sel: ".final-cta .cta-title", preset: "title" },
    { sel: ".final-cta .cta-text", preset: "text", delay: 80 },
    { sel: ".final-cta .actions .btn", preset: "text", delay: 150 },
  ];

  var HERO = ".lp-hero .lp-logo, .lp-hero h2, .lp-hero > .lp-panel > p, " +
             ".lp-hero .lp-actions .btn, .lp-shot-notebook, .lp-shot-phone";

  var hide = function (el) {
    el.style.opacity = "0";
  };

  var reveal = function (targets, group) {
    var p = PRESETS[group.preset];
    var opts = {
      opacity: [0, 1],
      translateY: [p.y, 0],
      duration: Math.round(p.duration * speed),
      delay: group.stagger ? stagger(group.stagger) : (group.delay || 0),
      ease: p.ease,
    };
    if (p.scale) opts.scale = [p.scale, 1];
    if (group.preset === "plaque") opts.rotate = [-2, 0];
    animate(targets, opts);
  };

  // Observador único: margem negativa embaixo para o elemento revelar
  // quando já entrou de fato na tela, não ao encostar a borda.
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      io.unobserve(el);
      var group = el.__qtGroup;
      if (!group) return;
      el.dataset.qtRevealed = "1";
      reveal(group.children ? el.querySelectorAll(group.children) : el, group);
    });
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });

  GROUPS.forEach(function (group) {
    Array.prototype.forEach.call(document.querySelectorAll(group.sel), function (el) {
      var targets = group.children
        ? Array.prototype.slice.call(el.querySelectorAll(group.children))
        : [el];
      if (!targets.length) return;
      targets.forEach(hide);
      el.__qtGroup = group;
      io.observe(el);
    });
  });

  /* Herói: entrada orquestrada assim que a página abre, na mesma cadência
     das revelações (o estado inicial já veio do CSS). */
  var heroIn = function () {
    var tl = createTimeline({ defaults: { ease: "outExpo" } });
    tl.add(".lp-hero .lp-logo", {
      opacity: [0, 1], scale: [0.9, 1], translateY: [14, 0],
      duration: Math.round(900 * speed),
    })
      .add(".lp-hero h2", {
        opacity: [0, 1], translateY: [26, 0],
        duration: Math.round(820 * speed),
      }, "-=560")
      .add(".lp-hero > .lp-panel > p", {
        opacity: [0, 1], translateY: [18, 0],
        duration: Math.round(700 * speed),
      }, "-=520")
      .add(".lp-hero .lp-actions .btn", {
        opacity: [0, 1], translateY: [16, 0],
        duration: Math.round(640 * speed), delay: stagger(90),
      }, "-=440")
      .add(".lp-shot-notebook", {
        opacity: [0, 1], translateY: [46, 0], scale: [0.955, 1],
        duration: Math.round(1100 * speed),
      }, "-=520")
      .add(".lp-shot-phone", {
        opacity: [0, 1], translateY: [56, 0], scale: [0.94, 1],
        duration: Math.round(1000 * speed),
      }, "-=880");
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", heroIn, { once: true });
  } else {
    heroIn();
  }
})();

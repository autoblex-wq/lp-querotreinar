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
    // Só aparecer (quem já tem movimento próprio pelo scroll).
    fade: { y: 0, scale: null, duration: 800, ease: "outCubic" },
  };

  /* Cada grupo é um seletor + preset. Com "children", o gatilho é o
     contêiner e os filhos entram em cascata (stagger). */
  var GROUPS = [
    // --- herói (fica abaixo da primeira tela, que mostra só o vídeo) ---
    { sel: ".lp-hero h2", preset: "title" },
    { sel: ".lp-hero > .lp-panel > p", preset: "text", delay: 90 },
    { sel: ".lp-hero .lp-actions", children: ".btn", preset: "text", stagger: 90 },
    { sel: ".lp-hero-stage", children: "img", preset: "fade", stagger: 140 },

    // --- faixas de conteúdo ---
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

  /* Movimento ligado à rolagem (parallax). Quem deriva é o CONTÊINER; os
     elementos de dentro continuam com a emergência de entrada — como são
     alvos diferentes, as duas animações convivem sem disputar propriedade.
     Profundidades diferentes (amplitude) dão a sensação de camadas sobre a
     cena de massinha. Fora daqui: o herói (tem entrada própria), a Gestão
     (o painel é preso/sticky) e a placa "Teste grátis" (já é centralizada
     por transform). */
  var PARALLAX = [
    { sel: ".lp-band .lp-media", amp: 70 },
    { sel: ".lp-band .lp-copy", amp: 34 },
    { sel: ".lp-desafios-card", amp: 84 },
    { sel: ".lp-desafios-aluno", amp: 60 },
    { sel: ".lp-desafios-phones", amp: 96 },
    { sel: "#nutri-ia .lp-ia-video", amp: 56 },
    { sel: "#nutri-ia .lp-aluno-shot", amp: 64 },
    { sel: "#nutri-ia .lp-aluno .lp-copy", amp: 30 },
    { sel: "#more .lp-recursos-head", amp: 34 },
    { sel: "#more ul", amp: 46 },
    { sel: "#themes .colagem", amp: 58 },
    { sel: "#themes .wizard", amp: 44 },
    { sel: ".final-cta .convite-logo", amp: 40 },
  ];
  var ampScale = isMobile ? 0.45 : 1; // no celular, um movimento mais discreto

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

  /* Aparelhos do herói: enquanto o vídeo entra na academia, o conjunto se
     APROXIMA (cresce) e depois se AFASTA (diminui). O progresso vem da faixa
     do herói, não do próprio elemento — ele fica preso no palco e não teria
     passagem própria pela tela. */
  var heroDevices = function () {
    var alvo = document.querySelector("#inicio");
    var shots = document.querySelector(".lp-hero-stage .lp-screenshots");
    if (!alvo || !shots || typeof A.onScroll !== "function") return;
    animate(shots, {
      /* A faixa começa no topo da página, então o trecho inicial da curva
         nunca é alcançado: o pico fica em 55% para cair dentro da parte
         visível (a rolagem cobre de ~25% a 100% do progresso). */
      scale: [
        { from: isMobile ? 0.5 : 0.42, to: isMobile ? 1.0 : 1.1, duration: 52 },
        { to: isMobile ? 0.78 : 0.74, duration: 26 },
        { to: isMobile ? 0.78 : 0.74, duration: 22 },
      ],
      translateY: [
        { from: 70, to: 0, duration: 52 },
        { to: -30, duration: 26 },
        { to: -30, duration: 22 },
      ],
      ease: "linear",
      autoplay: A.onScroll({ target: alvo, sync: isMobile ? true : 0.85 }),
    });
  };
  heroDevices();

  /* Parallax: a posição de cada contêiner é amarrada ao progresso da própria
     passagem pela tela — os limiares padrão do onScroll já cobrem de "entrando
     por baixo" até "saindo por cima". No desktop um amortecimento leve deixa o
     movimento sedoso; no celular vai 1:1, que não deixa trabalho residual
     depois que o dedo para. */
  var onScroll = A.onScroll;
  if (typeof onScroll === "function") {
    PARALLAX.forEach(function (group) {
      var amp = Math.round(group.amp * ampScale);
      Array.prototype.forEach.call(document.querySelectorAll(group.sel), function (el) {
        animate(el, {
          translateY: [amp, -amp],
          ease: "linear",
          autoplay: onScroll({ target: el, sync: isMobile ? true : 0.8 }),
        });
      });
    });
  }
})();

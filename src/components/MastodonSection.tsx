// <section id="mastodon"> — FAIXA (Montagem de treinos). Grid: title on top;
// looping screen-recording (left) + text (right) on desktop; stacked on mobile.
export function MastodonSection() {
  return (
    <section id="mastodon">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/faixa.png"
        aria-label="Demonstração da criação de treino no Quero Treinar"
      >
        <source src="/videos/faixa.mp4" type="video/mp4" />
        <source src="/videos/faixa.mov" type="video/quicktime" />
      </video>
      <h3>Montagem de treinos.</h3>
      <p>
        Pare de juntar planilha, PDF e WhatsApp. O Quero Treinar reúne treinos,
        dietas, anamnese, evolução, chat e cobrança num só lugar — entregue num
        app que tem a sua cara e abre direto na sua tela.
      </p>
    </section>
  );
}

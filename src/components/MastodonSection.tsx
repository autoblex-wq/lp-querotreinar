import { PlayableVideo } from "@/components/PlayableVideo";

// <section id="mastodon"> — FAIXA (Montagem de treinos). Grid: title on top;
// playable video (left) + text (right) on desktop; stacked on mobile.
export function MastodonSection() {
  return (
    <section id="mastodon">
      <div className="faixa-media">
        <PlayableVideo
          src="/videos/treino.mp4"
          poster="/images/treino-poster.jpg"
          label="Demonstração da criação de treino no Quero Treinar"
        />
      </div>
      <h3>Montagem de treinos.</h3>
      <p>
        Pare de juntar planilha, PDF e WhatsApp. O Quero Treinar reúne treinos,
        dietas, anamnese, evolução, chat e cobrança num só lugar — entregue num
        app que tem a sua cara e abre direto na sua tela.
      </p>
    </section>
  );
}

import { PlayableVideo } from "@/components/PlayableVideo";

// <section id="mastodon"> — FAIXA (Montagem de treinos). Two stacked feature
// rows (video + copy) that alternate sides on desktop: video/text, text/video.
export function MastodonSection() {
  return (
    <section id="mastodon">
      <div className="faixa-feature">
        <div className="faixa-media">
          <PlayableVideo
            src="/videos/treino.mp4"
            poster="/images/treino-poster.jpg"
            label="Demonstração da criação de treino no Quero Treinar"
          />
        </div>
        <div className="faixa-copy">
          <h3>Montagem de treinos.</h3>
          <p>
            Pare de juntar planilha, PDF e WhatsApp. O Quero Treinar reúne
            treinos, dietas, anamnese, evolução, chat e cobrança num só lugar —
            entregue num app que tem a sua cara e abre direto na sua tela.
          </p>
        </div>
      </div>

      <div className="faixa-feature reverse">
        <div className="faixa-media">
          <PlayableVideo
            src="/videos/treino-ia.mp4"
            label="Demonstração da montagem de treino com IA no Quero Treinar"
          />
        </div>
        <div className="faixa-copy">
          <h3>Montagem de treino com IA</h3>
          <p>
            Monte treinos eficientes com inteligência artificial, mas não se
            prenda a ela: valide e salve do seu jeito!
          </p>
        </div>
      </div>
    </section>
  );
}

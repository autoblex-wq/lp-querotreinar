import { Placeholder } from "@/components/Placeholder";

// <section id="mastodon"> — FAIXA (por quê). Purple band, one heading + paragraph.
export function MastodonSection() {
  return (
    <section id="mastodon">
      <Placeholder label="imagem (app / lifestyle)" />
      <div>
        <h3>Um app só. Do primeiro treino ao pagamento.</h3>
        <p>
          Pare de juntar planilha, PDF e WhatsApp. O Quero Treinar reúne treinos,
          dietas, anamnese, evolução, chat e cobrança num só lugar — entregue num
          app que tem a sua cara e abre direto na sua tela.
        </p>
      </div>
    </section>
  );
}

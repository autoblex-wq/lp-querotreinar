// <footer> — CONVITE FINAL: special invitation to a meeting, over the brand
// green background (desktop/mobile), with the Quero Treinar logo and WhatsApp CTA.
export function Testimonials() {
  const whatsappReuniao =
    "https://wa.me/5547999995954?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20reuni%C3%A3o%20para%20conhecer%20o%20Quero%20Treinar.";

  return (
    <footer>
      <div className="final-cta" id="cta">
        <img
          className="convite-logo"
          src="/images/logo-quero-treinar.png"
          alt="Quero Treinar"
        />
        <h2 className="cta-title">Um convite especial pra você.</h2>
        <p className="cta-text">
          Vamos marcar uma conversa? Agende uma reunião sem compromisso para
          conhecer o Quero Treinar por dentro. A gente te mostra tudo, tira suas
          dúvidas e ajuda a montar o seu app.
        </p>
        <div className="actions">
          <a
            className="btn btn-primary"
            href={whatsappReuniao}
            target="_blank"
            rel="noopener noreferrer"
          >
            Quero agendar uma reunião
          </a>
          <a
            className="btn btn-secondary"
            href="https://querotreinar.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Já tenho conta
          </a>
        </div>
      </div>
    </footer>
  );
}

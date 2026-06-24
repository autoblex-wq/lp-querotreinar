import type { FooterColumn } from "@/types/content";

const columns: FooterColumn[] = [
  {
    title: "Produto",
    links: [
      { label: "Recursos", href: "#more" },
      { label: "Marca própria", href: "#themes" },
      { label: "Para Personal", href: "#devices" },
      { label: "Para Nutri", href: "#devices" },
      { label: "Preços", href: "#" },
    ],
  },
  {
    title: "Conta",
    links: [
      { label: "Entrar", href: "#" },
      { label: "Criar conta", href: "#cta" },
      { label: "Teste grátis", href: "#cta" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Termos", href: "#" },
      { label: "Privacidade", href: "#" },
      { label: "Contato", href: "#" },
    ],
  },
];

// <section id="globalfooter"> — site footer (Produto · Conta · Legal).
export function GlobalFooter() {
  return (
    <section id="globalfooter">
      <div className="wrap">
        <a className="logo" href="#">
          <span className="brandmark">Quero Treinar</span>
        </a>
        <h2>O app de treino e dieta com a sua marca.</h2>
        <ul>
          {columns.map((col) => (
            <li key={col.title}>
              <h3>{col.title}</h3>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <p className="copyright">© 2026 Quero Treinar · Saúde manda em tudo!</p>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import "./ivory.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "Quero Treinar — Saúde manda em tudo",
  description:
    "O app de treino e dieta com a sua marca. Do primeiro treino ao pagamento. Para Personal Trainers e Nutricionistas.",
  keywords: [
    "app de treino", "app de dieta", "personal trainer", "nutricionista",
    "treino com vídeo", "dieta TACO", "anamnese", "gamificação", "white label",
    "app com a sua marca", "pagamentos", "PIX", "acompanhamento",
  ],
  openGraph: {
    title: "Quero Treinar — Saúde manda em tudo",
    description:
      "O app de treino e dieta com a sua marca. Para Personal Trainers e Nutricionistas.",
    siteName: "Quero Treinar",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

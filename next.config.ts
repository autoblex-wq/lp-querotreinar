import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  async rewrites() {
    return {
      // beforeFiles: avaliado antes das rotas do app, para a raiz servir a
      // landing estática public/lp.html (animação de scroll).
      beforeFiles: [{ source: "/", destination: "/lp.html" }],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;

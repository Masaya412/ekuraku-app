import type { Metadata } from "next";
import { Providers } from "./providers";
import { Menu } from "./Menu";

export const metadata: Metadata = {
  title: "ekuraku-app",
  description: "create ekuraku-app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Providers>
          <div
            style={{
              minHeight: "100vh",
              backgroundPosition: "center",
              backgroundImage: `
              linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)),
              url('/background.jpg')`,
            }}
          >
            <Menu />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

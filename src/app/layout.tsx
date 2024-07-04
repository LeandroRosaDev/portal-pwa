import { Nunito } from "next/font/google";
import Menu from "@/components/Menu";
import "./globals.css";
import { Metadata } from "next";
import { UserContextProvider } from "@/context/user-context";
import { userGetAction } from "@/actions/user/user-get-action";

const mainFontFamily = Nunito({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portal Altuori",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: user } = await userGetAction();

  return (
    <html lang="pt-br">
      <head>
        {/* Link para o manifesto */}
        <link rel="manifest" href="/manifest.json" />

        {/* Ícones para diferentes tamanhos de dispositivos */}
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="/icons/icon-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="512x512"
          href="/icons/icon-512x512.png"
        />

        {/* Meta tags para definir a cor do tema */}
        <meta name="theme-color" content="#000000" />

        {/* Outras meta tags importantes para PWA */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Portal Altuori" />
        <meta name="apple-mobile-web-app-title" content="Portal Altuori" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="bg-menu-color">
        <UserContextProvider user={user}>
          <div
            className={`bg-black flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10 w-full max-w-screen-xl rounded-2xl m-auto p-4 sm:p-8 ${mainFontFamily.className}`}
          >
            <Menu />
            {children}
          </div>
        </UserContextProvider>
      </body>
    </html>
  );
}

import Script from "next/script";
import "@fontsource-variable/bricolage-grotesque/wdth.css";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { LanguageProvider } from "./context/LanguageContext";
import { site } from "./data/site";

const description =
    "Portofolio Adam Suvi, Data Analyst tersertifikasi BNSP, Google, dan Meta di Jakarta. SQL, Python, R, Power BI, Tableau, dan Excel.";

export const metadata = {
    metadataBase: new URL(site.url),
    title: {
        default: "Adam Suvi · Data Analyst",
        template: "%s · Adam Suvi",
    },
    description,
    authors: [{ name: "Adam Suvi" }],
    openGraph: {
        title: "Adam Suvi · Data Analyst",
        description,
        url: site.url,
        siteName: "Adam Suvi",
        locale: "id_ID",
        type: "website",
    },
};

export const viewport = {
    themeColor: "#14123A",
};

export default function RootLayout({ children }) {
    return (
        <html lang="id">
            <head>
                {/* Marks the document as scripted before first paint, so reveal styles never flash. */}
                <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
            </head>
            <body>
                <LanguageProvider>
                    <Navbar />
                    <main id="konten">{children}</main>
                    <Footer />
                </LanguageProvider>
                <Script src="https://www.googletagmanager.com/gtag/js?id=G-590PHNHFH5" strategy="afterInteractive" />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-590PHNHFH5');
          `}
                </Script>
            </body>
        </html>
    );
}

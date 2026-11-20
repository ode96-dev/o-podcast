import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { AudioProvider } from "@/lib/audio-context";
import { CartProvider } from "@/lib/cart-context";
import { TicketProvider } from "@/lib/ticket-context";
import { PodcastNavbar } from "@/components/layout/podcast-navbar";
import { PodcastFooter } from "@/components/layout/podcast-footer";
import { PersistentAudioPlayer } from "@/components/audio/persistent-audio-player";
import { CartDrawer } from "@/components/merch/cart-drawer";
import { TicketModal } from "@/components/tour/ticket-modal";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-bricolage",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "O Podcast — Swarms of Ideas & Sonic Culture",
  description:
    "Hosted by Thea Mwangi. Independent conversations on African technology, sonic sovereignty, linguistics, and global culture.",
  openGraph: {
    title: "O Podcast — Swarms of Ideas & Sonic Culture",
    description:
      "Hosted by Thea Mwangi. Independent conversations on African technology, sonic sovereignty, linguistics, and global culture.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "O Podcast — Swarms of Ideas & Sonic Culture",
    description:
      "Hosted by Thea Mwangi. Independent conversations on African technology, sonic sovereignty, linguistics, and global culture.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${jakarta.variable} ${jetbrains.variable}`}
    >
      <body
        className="min-h-screen bg-[#FAFAFA] text-[#0E0E10] flex flex-col font-sans antialiased selection:bg-[#C83E1B] selection:text-white"
        suppressHydrationWarning
      >
        <AudioProvider>
          <CartProvider>
            <TicketProvider>
              <PodcastNavbar />
              <div className="flex-1">{children}</div>
              <PodcastFooter />
              <PersistentAudioPlayer />
              <CartDrawer />
              <TicketModal />
            </TicketProvider>
          </CartProvider>
        </AudioProvider>
      </body>
    </html>
  );
}

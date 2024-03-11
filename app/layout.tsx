import type { Metadata } from "next";
import { Poppins, Roboto,  } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";




const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets:['latin']
});
const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets:["latin"]
  
});


export const metadata: Metadata = {
  title: "marjanemall Maroc | Marketplace Marocaine | Smartphones, Électroménager, Déco, Bébé",
  description:
    "marjanemall Maroc, Marketplace Marocaine | Paiement en ligne ou à la livraison | Livraison partout au Maroc, Produits 100% authentiques, Satisfait ou remboursé, Offre nationale et internationale aux meilleurs prix.",
  icons: {
    icon: "https://www.marjanemall.ma/static/version1707898355/frontend/Marjane/default/fr_FR/Magento_Theme/favicon-192x192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body  className={`${poppins.className}`}>
        {children}
      </body>
    </html>
  );
}

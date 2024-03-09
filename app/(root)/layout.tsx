import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import 'bootstrap/dist/css/bootstrap.min.css';
import "../globals.css"
import SubHeader from "@/components/SubHeader";
import { ClerkProvider, auth } from '@clerk/nextjs'
import Header from "@/components/Header";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Roboto, Poppins } from "next/font/google";
import { getCartTotalCount, getUserById, getUserCart } from "@/lib/actions/cart.actions";
import Footer from "@/components/Footer";
import MobileFooter from "@/components/MobileFooter";
import CartSide from "@/components/CartSide";



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
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();
    
  const user = await getUserById({ clerkId: userId! });
 
  const qty = await getCartTotalCount({
    userId: user?.user?._id
  });
  const result =  await getUserCart({
    userId: user.user._id
  })
  
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.className} flex flex-col min-h-screen`}>
          <SubHeader />
          <Header qty={qty} user={user} />
          <CartSide user={user} result={JSON.stringify(result)} />
          <div className="flex-1">
            {children}
          </div>
          <SpeedInsights />
          <Analytics />
          <Footer />
          <MobileFooter />
        </body>
      </html>
    </ClerkProvider>
  );
}

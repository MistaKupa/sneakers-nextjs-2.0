import {
  getCollections,
  getProducts,
  getProductsByTag,
} from "@/app/_lib/data-service";
import BannerSection from "./bannerSection/BannerSection";
import BestSellersSection from "./bestSellersSection/BestSellersSection";
import CollectionSection from "./collectionSection/CollectionSection";
import KidStylesSection from "./kidStylesSection/KidStylesSection";
import SustainabilitySection from "./sustainabilitySection/SustainabilitySection";

export default async function LandingPage() {
  const products = await getProducts("men");
  const [bestSellers, kidStyles, collections] = await Promise.all([
    getProductsByTag("best-seller", 4),
    getProductsByTag("kid-styles", 1),
    getCollections(),
  ]);

  return (
    <main className="w-full min-h-screen">
      <BannerSection products={products} />
      <BestSellersSection bestSellers={bestSellers} />
      <KidStylesSection kidStyles={kidStyles} />
      <CollectionSection collections={collections} />
      <SustainabilitySection />
    </main>
  );
}

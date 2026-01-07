import ProductListingPage from "@/app/_components/_products/ProductsListingPage";
import {
  getCollectionDetailsByID,
  getProductsByCollectionID,
} from "@/app/_lib/data-service";
import { notFound, redirect } from "next/navigation";

export default async function CollectionPage({ params, searchParams }) {
  const { collectionID, collectionName: urlEncodedName } = await params;

  const collectionDetails = await getCollectionDetailsByID(collectionID);

  if (!collectionDetails) {
    notFound();
  }

  const cannonicalName = collectionDetails.name;
  const cannonicalSlug = encodeURIComponent(cannonicalName);

  if (urlEncodedName !== cannonicalSlug) {
    redirect(`/main/site/collections/${collectionID}/${cannonicalSlug}`);
  }

  const collectionProducts = await getProductsByCollectionID(collectionID);

  return (
    <ProductListingPage
      gender={cannonicalName}
      products={collectionProducts}
      pageSize={4}
      searchParams={searchParams}
    />
  );
}

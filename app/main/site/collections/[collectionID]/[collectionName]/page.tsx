import ProductListingPage from "@/_components/_products/ProductsListingPage";
import {
  getCollectionDetailsByID,
  getProductsByCollectionID,
} from "@/app/_lib/data-service-server";
import { SearchParams } from "@/types/product.types";
import { notFound, redirect } from "next/navigation";

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ collectionID: string; collectionName: string }>;
  searchParams: SearchParams;
}) {
  const { collectionID, collectionName: urlEncodedName } = await params;

  const collectionDetails = await getCollectionDetailsByID(
    Number(collectionID),
  );

  if (!collectionDetails) {
    notFound();
  }

  const cannonicalName = collectionDetails.name;
  const cannonicalSlug = encodeURIComponent(cannonicalName);

  if (urlEncodedName !== cannonicalSlug) {
    redirect(`/main/site/collections/${collectionID}/${cannonicalSlug}`);
  }

  const collectionProducts = await getProductsByCollectionID(
    Number(collectionID),
  );

  return (
    <ProductListingPage
      gender={cannonicalName}
      products={collectionProducts}
      pageSize={4}
      searchParams={searchParams}
    />
  );
}

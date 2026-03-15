import ProductDescription from "@/_components/_productDetails/ProductDescription";
import ProductImage from "@/_components/_productDetails/ProductImage";
import { getProduct } from "@/app/_lib/data-service";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  const productData = await getProduct(Number(productId));

  if (!productData) {
    return notFound();
  }

  const { product, sneakerSizes } = productData;

  const { images } = product;

  return (
    <div className="flex flex-col gap-14 px-5 md:gap-20 lg:grid lg:grid-cols-2 lg:gap-20 lg:px-10 xl:px-5">
      <ProductImage product={product} />
      <ProductDescription product={product} sneakerSizes={sneakerSizes} />
    </div>
  );
}

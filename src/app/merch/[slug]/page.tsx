import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/data";
import ProductView from "../_components/product-view";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

async function ProductDetailContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return <ProductView product={product} related={related} />;
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="py-8 sm:py-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-6 w-36 rounded bg-[#E4E4E0]/60 animate-pulse mb-6" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-6 aspect-4/3 rounded-lg bg-[#E4E4E0]/60 animate-pulse" />
              <div className="lg:col-span-6 space-y-4">
                <div className="h-4 w-40 rounded bg-[#E4E4E0]/60 animate-pulse" />
                <div className="h-10 w-3/4 rounded bg-[#E4E4E0]/60 animate-pulse" />
                <div className="h-6 w-28 rounded bg-[#E4E4E0]/60 animate-pulse" />
              </div>
            </div>
          </div>
        </main>
      }
    >
      <ProductDetailContent params={params} />
    </Suspense>
  );
}

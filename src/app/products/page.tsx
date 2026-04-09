import type { Metadata } from "next";
import Script from "next/script";
import ProductsClient from "@/components/pages/ProductsClient";

export const metadata: Metadata = {
  title: "Materials & Fabrication",
  description: "Browse aerospace-grade materials, fabrication services, and training offerings by category.",
};

export default function ProductsPage() {
  const productsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AeroKodex Materials & Fabrication",
    url: "https://aerokodex.com/products",
  };

  return (
    <>
      <Script
        id="products-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsSchema) }}
      />
      <ProductsClient />
    </>
  );
}

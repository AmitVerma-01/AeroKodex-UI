import type { Metadata } from "next";
import Script from "next/script";
import ProductDetailsClient from "@/components/pages/ProductDetailsClient";

export const metadata: Metadata = {
  title: "High-Modulus Carbon Fiber Sheet",
  description: "Engineering-grade carbon fiber sheets with technical specifications and RFQ support.",
};

export default function ProductDetailsPage() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "High-Modulus Carbon Fiber Sheet",
    description: "Ultra-stiff, lightweight composite engineered for high-stress aerospace environments.",
    sku: "HM-CFS-800",
    category: "Materials",
    brand: {
      "@type": "Brand",
      name: "AeroKodex Systems",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "450.00",
      availability: "https://schema.org/InStock",
      url: "https://aerokodex.com/products/carbon-fiber-sheet",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Products",
        item: "https://aerokodex.com/products",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Materials",
        item: "https://aerokodex.com/products",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "High-Modulus Carbon Fiber Sheet",
        item: "https://aerokodex.com/products/carbon-fiber-sheet",
      },
    ],
  };

  return (
    <>
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Script
        id="product-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductDetailsClient />
    </>
  );
}

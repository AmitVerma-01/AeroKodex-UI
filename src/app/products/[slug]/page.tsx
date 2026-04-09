'use client';

import Link from 'next/link';
import { useState, useEffect, use } from 'react';
import { productsApi, workshopsApi, Product } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

// ---- Skeleton ---------------------------------------------------------------

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`bg-muted animate-pulse rounded ${className}`} />
);

// ---- Page -------------------------------------------------------------------

interface Props {
  params: Promise<{ slug: string }>;
}

const ProductDetailsPage = ({ params }: Props) => {
  const { slug } = use(params);
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeVariantId, setActiveVariantId] = useState<number | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    productsApi.getDetail(slug)
      .then((data) => {
        setProduct(data);
        if (data.variants?.length > 0) setActiveVariantId(data.variants[0].id);
        setLoading(false);
      })
      .catch(() => {
        setError('Product not found or failed to load.');
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-12 pt-28">
          <Skeleton className="h-4 w-48 mb-10" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <Skeleton className="aspect-square rounded-sm" />
            <div className="space-y-6">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-32 w-full rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <p className="text-secondary mb-8">{error}</p>
          <Link href="/products" className="px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-primary-accent transition-smooth">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const featureImage = product.images?.find((img) => img.is_feature) || product.images?.[0];
  const displayImage = product.images?.[activeImageIdx] || featureImage;
  const activeVariant = product.variants?.find((v) => v.id === activeVariantId);
  const specs = product.technical_specs && typeof product.technical_specs === 'object'
    ? Object.entries(product.technical_specs)
    : [];

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12 pt-28">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-secondary mb-10">
          <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
          <span>/</span>
          <span>{product.category.name}</span>
          <span>/</span>
          <span className="text-primary">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted border border-border overflow-hidden rounded-sm">
              {displayImage ? (
                <img
                  src={displayImage.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-secondary/30 text-sm font-bold uppercase tracking-widest">No Image</span>
                </div>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImageIdx(i)}
                    className={`aspect-square bg-muted border transition-colors rounded-sm overflow-hidden ${activeImageIdx === i ? 'border-primary' : 'border-border hover:border-primary/50'}`}
                  >
                    <img src={img.image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            {(!product.images || product.images.length === 0) && (
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-muted border border-border rounded-sm" />
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-2 block">{product.category.name}</span>
              <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-foreground">{product.name}</h1>
              <p className="text-lg text-secondary leading-relaxed">{product.description}</p>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Select Variant</h4>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setActiveVariantId(v.id)}
                      className={`px-6 py-3 border text-xs font-bold uppercase tracking-widest transition-smooth rounded-sm ${activeVariantId === v.id ? 'bg-primary text-white border-primary' : 'bg-card text-secondary border-border hover:border-primary'}`}
                    >
                      {v.variant_name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price / CTA */}
            <div className="p-8 bg-muted border border-border rounded-sm">
              {isAuthenticated && activeVariant?.price ? (
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-secondary uppercase tracking-widest font-bold">Price per unit</span>
                    <div className="text-3xl font-extrabold text-primary mt-1">
                      ₹{parseFloat(activeVariant.price).toLocaleString('en-IN')}
                    </div>
                    {activeVariant.sku && (
                      <div className="text-xs text-secondary mt-1">SKU: {activeVariant.sku}</div>
                    )}
                    <div className={`text-xs font-bold mt-1 ${activeVariant.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {activeVariant.stock > 0 ? `${activeVariant.stock} in stock` : 'Out of stock'}
                    </div>
                  </div>
                  <Link
                    href="/quote"
                    className="px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs hover:bg-primary-accent transition-smooth rounded-sm"
                  >
                    Add to RFQ
                  </Link>
                </div>
              ) : isAuthenticated ? (
                <div className="text-center">
                  <p className="text-sm text-secondary mb-4 font-medium">Select a variant to view pricing.</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-secondary mb-6 font-medium">Pricing is reserved for registered engineering partners.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/auth/login" className="px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs hover:bg-primary-accent transition-smooth rounded-sm">
                      Sign In to View Price
                    </Link>
                    <Link href="/quote" className="px-8 py-4 border border-primary text-primary font-bold uppercase tracking-widest text-xs hover:bg-primary/5 transition-smooth rounded-sm">
                      Request Custom Quote
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Technical Specs */}
            {specs.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Technical Specifications</h4>
                <div className="border border-border rounded-sm overflow-hidden">
                  {specs.map(([key, value], i) => (
                    <div key={key} className={`flex justify-between p-4 text-sm ${i % 2 === 0 ? 'bg-card' : 'bg-muted'}`}>
                      <span className="text-secondary font-medium">{key}</span>
                      <span className="font-bold text-foreground text-right max-w-xs">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {product.related_products && product.related_products.length > 0 && (
        <section className="bg-muted py-24 border-t border-border mt-12">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-10 text-foreground">Related Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {product.related_products.map((related) => (
                <Link key={related.id} href={`/products/${related.slug}`} className="bg-card p-6 border border-border rounded-sm hover-lift shadow-sm group">
                  <div className="aspect-video bg-muted mb-6 rounded-sm overflow-hidden">
                    {related.feature_image && (
                      <img src={related.feature_image} alt={related.name} className="w-full h-full object-cover transition-smooth group-hover:scale-105" />
                    )}
                  </div>
                  <h4 className="font-bold mb-2 text-foreground group-hover:text-primary transition-colors">{related.name}</h4>
                  <p className="text-xs text-secondary mb-6 line-clamp-2">{related.description}</p>
                  <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">Learn More →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailsPage;

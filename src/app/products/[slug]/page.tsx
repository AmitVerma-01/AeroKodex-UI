'use client';

import Link from 'next/link';
import { useState, useEffect, use } from 'react';
import { productsApi, Product, ProductVariant } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface Props {
  params: Promise<{ slug: string }>;
}

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`bg-muted animate-pulse rounded ${className}`} />
);

// Derive table columns from all variants' specs keys (preserving order)
function getSpecColumns(variants: ProductVariant[]): string[] {
  const keys = new Set<string>();
  variants.forEach((v) => {
    if (v.specs && typeof v.specs === 'object') {
      Object.keys(v.specs).forEach((k) => keys.add(k));
    }
  });
  return Array.from(keys);
}

// Format a spec key like "width_mm" → "Width (mm)"
function formatSpecKey(key: string): string {
  return key
    .replace(/_mm$/, ' (mm)')
    .replace(/_gsm$/, ' (gsm)')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const ProductDetailsPage = ({ params }: Props) => {
  const { slug } = use(params);
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    productsApi
      .getDetail(slug)
      .then((data) => { setProduct(data); setLoading(false); })
      .catch(() => { setError('Product not found or failed to load.'); setLoading(false); });
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-6 pt-28 py-12">
          <Skeleton className="h-4 w-48 mb-10" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <Skeleton className="aspect-square rounded-sm" />
            <div className="space-y-6">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-48 w-full rounded-sm" />
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

  const displayImage = product.images?.[activeImageIdx] ?? product.images?.[0];
  const productSpecs = product.technical_specs && typeof product.technical_specs === 'object'
    ? Object.entries(product.technical_specs)
    : [];
  const variants = product.variants ?? [];
  const specColumns = getSpecColumns(variants);
  const hasVariantSpecs = specColumns.length > 0;

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-28 py-12">

        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-secondary mb-10">
          <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
          <span>/</span>
          <span>{product.category.name}</span>
          <span>/</span>
          <span className="text-primary truncate max-w-xs">{product.name}</span>
        </nav>

        {/* ── Top section: image + overview ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">

          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted border border-border overflow-hidden rounded-sm">
              {displayImage ? (
                <img src={displayImage.image} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-secondary/30 text-sm font-bold uppercase tracking-widest">No Image</span>
                </div>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
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
          </div>

          {/* Overview */}
          <div className="space-y-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-2 block">
                {product.category.name}
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-foreground">{product.name}</h1>
              <p className="text-lg text-secondary leading-relaxed">{product.description}</p>
            </div>

            {/* Product-level profile specs */}
            {productSpecs.length > 0 && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mb-4">Product Profile</h3>
                <div className="border border-border rounded-sm overflow-hidden">
                  {productSpecs.map(([key, value], i) => (
                    <div key={key} className={`flex justify-between px-5 py-3.5 text-sm ${i % 2 === 0 ? 'bg-card' : 'bg-muted'}`}>
                      <span className="text-secondary font-medium">{formatSpecKey(key)}</span>
                      <span className="font-bold text-foreground text-right max-w-xs">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="p-7 bg-muted border border-border rounded-sm">
              {isAuthenticated ? (
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-secondary">
                      {variants.length > 0
                        ? `${variants.length} variant${variants.length > 1 ? 's' : ''} available — see table below`
                        : 'Contact us for pricing and availability.'}
                    </p>
                  </div>
                  <Link
                    href="/quote"
                    className="shrink-0 px-7 py-3.5 bg-primary text-white font-bold uppercase tracking-widest text-xs hover:bg-primary-accent transition-smooth rounded-sm"
                  >
                    Request Quote
                  </Link>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-secondary mb-5 font-medium">
                    Pricing is reserved for registered engineering partners.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/auth/login" className="px-7 py-3.5 bg-primary text-white font-bold uppercase tracking-widest text-xs hover:bg-primary-accent transition-smooth rounded-sm">
                      Sign In to View Price
                    </Link>
                    <Link href="/quote" className="px-7 py-3.5 border border-primary text-primary font-bold uppercase tracking-widest text-xs hover:bg-primary/5 transition-smooth rounded-sm">
                      Request Custom Quote
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Variants Table ── */}
        {variants.length > 0 && (
          <section className="mb-16">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Available Variants</h2>
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">
                {variants.length} variant{variants.length > 1 ? 's' : ''}
              </span>
            </div>

            <div className="border border-border rounded-sm overflow-hidden overflow-x-auto">
              <table className="w-full text-sm min-w-max">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left px-5 py-4 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                      Sr. No.
                    </th>
                    <th className="text-left px-5 py-4 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                      Product Name
                    </th>
                    {hasVariantSpecs && specColumns.map((col) => (
                      <th key={col} className="text-left px-5 py-4 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                        {formatSpecKey(col)}
                      </th>
                    ))}
                    <th className="text-left px-5 py-4 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                      Datasheet
                    </th>
                    {isAuthenticated && (
                      <th className="text-left px-5 py-4 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                        Price
                      </th>
                    )}
                    <th className="text-left px-5 py-4 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                      Enquiry
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {variants.map((variant, idx) => (
                    <tr
                      key={variant.id}
                      className={`border-t border-border transition-colors hover:bg-primary/5 ${idx % 2 === 0 ? 'bg-card' : 'bg-muted'}`}
                    >
                      <td className="px-5 py-4 text-secondary font-medium">{idx + 1}</td>
                      <td className="px-5 py-4 font-bold text-foreground whitespace-nowrap">{variant.variant_name}</td>
                      {hasVariantSpecs && specColumns.map((col) => (
                        <td key={col} className="px-5 py-4 text-secondary whitespace-nowrap">
                          {variant.specs?.[col] !== undefined ? String(variant.specs[col]) : '—'}
                        </td>
                      ))}
                      <td className="px-5 py-4">
                        {variant.datasheet_url ? (
                          <a
                            href={variant.datasheet_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-primary font-bold text-xs uppercase tracking-wider hover:underline"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            PDF
                          </a>
                        ) : (
                          <span className="text-secondary/40 text-xs">—</span>
                        )}
                      </td>
                      {isAuthenticated && (
                        <td className="px-5 py-4 font-bold text-primary whitespace-nowrap">
                          {variant.price
                            ? `₹${parseFloat(variant.price).toLocaleString('en-IN')}`
                            : '—'}
                        </td>
                      )}
                      <td className="px-5 py-4">
                        <Link
                          href={`/quote?product=${product.slug}&variant=${variant.id}`}
                          className="inline-block px-4 py-2 border border-primary text-primary font-bold text-[10px] uppercase tracking-widest rounded-sm hover:bg-primary hover:text-white transition-smooth whitespace-nowrap"
                        >
                          Enquiry
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>

      {/* ── Related Products ── */}
      {product.related_products && product.related_products.length > 0 && (
        <section className="bg-muted py-24 border-t border-border">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-10 text-foreground">Related Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {product.related_products.map((related) => (
                <Link
                  key={related.id}
                  href={`/products/${related.slug}`}
                  className="bg-card p-6 border border-border rounded-sm hover-lift shadow-sm group"
                >
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

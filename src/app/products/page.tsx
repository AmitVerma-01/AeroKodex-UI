'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { productsApi, Category, Product, PaginatedResponse } from '@/lib/api';

// ---- Loading skeleton -------------------------------------------------------

const ProductSkeleton = () => (
  <div className="bg-surface border border-border rounded-sm overflow-hidden animate-pulse">
    <div className="aspect-16/10 bg-muted" />
    <div className="p-8 space-y-4">
      <div className="h-5 bg-muted rounded w-3/4" />
      <div className="h-4 bg-muted rounded w-1/2" />
      <div className="h-px bg-border mt-6" />
      <div className="h-3 bg-muted rounded w-1/3 mt-4" />
    </div>
  </div>
);

// ---- Page -------------------------------------------------------------------

const ProductsPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  // Fetch categories
  useEffect(() => {
    productsApi.getCategories().then(setCategories).catch(console.error);
  }, []);

  // Fetch products when category changes
  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = selectedCategory === 'all'
        ? {}
        : { category: selectedCategory };
      const data: PaginatedResponse<Product> = await productsApi.getList(params);
      setProducts(data.results);
      setTotalCount(data.count);
    } catch {
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  return (
    <div className="bg-background min-h-screen">
      {/* Dynamic Header */}
      <section className="relative pt-40 pb-24 overflow-hidden border-b border-border bg-surface-alt">
        <div className="absolute inset-0 mesh-grid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl dark:bg-primary/10" />
          <div className="absolute top-1/3 -right-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl dark:bg-accent/10" />
          <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-primary/10 blur-3xl dark:bg-primary/5" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-14 items-end">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/15 border border-accent/30 text-accent rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Inventory & Capabilities
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-7 transition-smooth text-foreground tracking-tight leading-[0.92]">
              Aerospace Materials
              <span className="block text-primary">Built for Flight-Critical Performance</span>
            </h1>
            <p className="text-secondary max-w-3xl text-lg md:text-xl leading-relaxed">
              Browse certified composites, structural assemblies, and precision-manufactured
              components engineered to meet strict aerospace validation standards.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/quote"
                className="px-6 py-3 rounded-sm bg-primary text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary-accent transition-smooth"
              >
                Request Material Quote
              </Link>
              <Link
                href="/workshops"
                className="px-6 py-3 rounded-sm border border-border bg-card text-foreground text-xs font-bold uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-smooth"
              >
                Explore Training
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-card/90 backdrop-blur-md border border-border rounded-sm p-6 shadow-xl shadow-primary/5">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-secondary mb-4">Trust Metrics</div>
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-border">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-secondary">Compliance</div>
                    <div className="text-sm font-semibold text-foreground mt-1">ASTM Reference Alignment</div>
                  </div>
                  <span className="text-primary text-xs font-bold">Verified</span>
                </div>
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-border">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-secondary">Documentation</div>
                    <div className="text-sm font-semibold text-foreground mt-1">Batch Traceability Records</div>
                  </div>
                  <span className="text-primary text-xs font-bold">Available</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-secondary">Support</div>
                    <div className="text-sm font-semibold text-foreground mt-1">Engineering Consult Included</div>
                  </div>
                  <span className="text-primary text-xs font-bold">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div className="flex flex-wrap gap-1.5 bg-muted p-1.5 rounded-sm border border-border">
            <button
              onClick={() => setSelectedCategory('all')}
              aria-pressed={selectedCategory === 'all'}
              className={`px-5 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-smooth focus:outline-none focus:ring-2 focus:ring-primary/40 ${selectedCategory === 'all' ? 'bg-primary text-white shadow-sm' : 'text-secondary hover:text-primary hover:bg-white/10'}`}
            >
              All Items
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                aria-pressed={selectedCategory === cat.slug}
                className={`px-5 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-smooth focus:outline-none focus:ring-2 focus:ring-primary/40 ${selectedCategory === cat.slug ? 'bg-primary text-white shadow-sm' : 'text-secondary hover:text-primary hover:bg-white/10'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-secondary flex items-center">
            <span className="w-2 h-2 bg-accent rounded-full mr-2" />
            {loading ? 'Loading…' : `${totalCount} item${totalCount !== 1 ? 's' : ''} found`}
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div className="text-center py-24">
            <p className="text-secondary mb-4">{error}</p>
            <button onClick={loadProducts} className="px-6 py-3 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-primary-accent transition-smooth">
              Retry
            </button>
          </div>
        )}

        {/* Loading skeletons */}
        {loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map((i) => <ProductSkeleton key={i} />)}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-24 border border-border rounded-sm bg-card">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-foreground mb-2">No products in this category</h3>
            <p className="text-sm text-secondary">Check back soon or browse all items.</p>
          </div>
        )}

        {/* Product grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group block bg-surface border border-border rounded-sm overflow-hidden hover-lift shadow-sm hover:shadow-2xl hover:shadow-primary/10"
              >
                <div className="aspect-[16/10] overflow-hidden bg-muted relative">
                  {product.feature_image ? (
                    <img
                      src={product.feature_image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest">No Image</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20 shadow-sm rounded-sm">
                    {product.category.name}
                  </div>
                  {product.variant_count !== undefined && product.variant_count > 0 && (
                    <div className="absolute top-4 right-4 bg-accent text-white px-2 py-1 text-[10px] font-bold rounded-sm">
                      {product.variant_count} variant{product.variant_count > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors leading-tight">{product.name}</h3>
                  <p className="text-sm text-secondary mb-8 leading-relaxed line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center pt-6 border-t border-border">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">View Engineering Data</span>
                    <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-smooth">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Quality Badge Section */}
      <section className="py-24 border-t border-border bg-muted relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-20 h-20 border-2 border-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="text-xs font-black text-primary/30 uppercase tracking-[0.2em]">ISO</span>
          </div>
          <h3 className="text-xl font-bold mb-4 text-foreground">Quality Management Systems</h3>
          <p className="text-sm text-secondary leading-relaxed">
            Every material within our inventory is cataloged with full batch traceability and tested
            against ASTM standards for structural composite integrity.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;

import { Link } from "@/i18n/routing";
import { ArrowRight, Sparkles, FileSpreadsheet } from "lucide-react";
import { legacyProductImages } from "@/data/legacyMedia";
import { productDatasheets } from "@/data/productDatasheets";
import ProductGallery from "@/components/ProductGallery";
import ProductDatasheetSection from "@/components/ProductDatasheetSection";

interface ProductSubCategoryProps {
  title: string;
  category: string;
  description: string;
  products: {
    id: string;
    name: string;
    description?: string;
    applications?: string[];
    range?: string;
    image: string;
    bg?: string;
    specs: { label: string; value: string }[];
  }[];
}

// Local fallback mapping for common products to ensure local image reliability
const localImageMap: Record<string, string[]> = {
  "led-bulb": ["/images/products/led-bulb-2.png", "/images/led-bulb_specs.png"],
  "led-bulb-2": ["/images/products/led-bulb.png", "/images/led-bulb_specs.png"],
  "led-high-power-bulb": ["/images/led-bulb_specs.png"],
  "led-emergency-bulb": ["/images/led-bulb_specs.png"],
  "led-candle-bulb": ["/images/spot_specs.png"],
  "led-batten": ["/images/led-batten_specs.png"],
  "led-high-power-batten": ["/images/led-batten_specs.png"],
  "led-ceiling-light": ["/images/ceiling_specs.png"],
  "led-down-light": ["/images/products/led-down-lighter.webp", "/images/products/led-down-light-3.webp", "/images/down-light_specs.png"],
  "led-down-lighter": ["/images/products/led-down-light.webp", "/images/down-light_specs.png"],
  "led-down-light-3": ["/images/products/led-down-light.webp", "/images/down-light_specs.png"],
  "led-spot-light": ["/images/spot_specs.png"],
  "led-street-light-2": ["/images/street_light_specs.png"],
  "led-flood-well-light": ["/images/flood-well_specs.png"],
  "led-decorative-light": ["/images/decorative_specs.png"],
  "smart-led-bulb": ["/images/smart-bulb_specs.png"],
  "led-strip-lights": ["/images/led-batten_specs.png"],
  "extension-board": ["/images/legacy/exension-board-jpg.webp"],
  "surface-ring": ["/images/products/surface-ring.png"],
  "hdpe-bottles": ["/images/products_packaging.jpg", "/images/facilities/blow-moulding.webp"],
  "pet-bottles": ["/images/jar_product.jpg", "/images/facilities/ibm-plastic.webp"],
  "pp-jars": ["/images/jar_product.jpg", "/images/facilities/injection-moulding.webp"],
  "custom-containers": ["/images/packaging_factory.jpg", "/images/products_packaging.jpg"],
  "hdpe-industrial-containers": ["/images/packaging_factory.jpg", "/images/products_packaging.jpg"],
  "bulk-food-containers": ["/images/jar_product.jpg", "/images/products_packaging.jpg"],
  "screw-closures-caps": ["/images/facilities/injection-moulding.webp", "/images/moulding_factory.jpg"],
  "crc-dispensing-closures": ["/images/facilities/injection-moulding.webp", "/images/moulding_factory.jpg"],
  "custom-blow-moulding": ["/images/packaging_factory.jpg", "/images/facilities/blow-moulding.webp"],
  "custom-technical-mouldings": ["/images/tool_room.jpg", "/images/moulding_factory.jpg"],
};

export default function ProductSubCategoryTemplate({
  title,
  category,
  description,
  products,
}: ProductSubCategoryProps) {
  return (
    <div className="min-h-screen bg-paper pb-24">
      {/* Header */}
      <div className="bg-mist text-ink pt-32 pb-16 border-b border-steel/10">
        <div className="container-wide">
          <Link
            href={`/products/${category}`}
            className="text-steel hover:text-accent text-sm font-mono uppercase tracking-widest mb-4 inline-block"
          >
            ← Back to {category.replace("-", " ")}
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-accent/10 border border-accent/20 text-accent font-mono text-xs uppercase tracking-wider font-semibold rounded-full">
              Industrial Product Catalog
            </span>
            <span className="text-steel/60 text-xs font-mono">• Full Technical Ratings Available</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-medium mb-6">
            {title}
          </h1>
          <p className="text-steel text-xl max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Product List */}
      <div className="container-wide py-16">
        <div className="space-y-24">
          {products.map((product) => {
            const datasheet = productDatasheets[product.id];
            
            // Build additional images combining local files & legacy media
            const localExtras = (localImageMap[product.id] || []).filter(
              (src) => src !== datasheet?.sheetImage
            );
            // Filter remote extras to avoid redundant duplicates of existing local shots or sheets
            const remoteExtras = (legacyProductImages[product.id] || []).filter(
              (url) =>
                !url.includes("desc") &&
                !url.includes("specs") &&
                !url.includes("removebg")
            );
            const combinedImages = Array.from(
              new Set([...localExtras, ...remoteExtras])
            ).filter((src) => src !== product.image);

            return (
              <div
                key={product.id}
                id={product.id}
                className="bg-white border border-steel/15 p-6 md:p-10 shadow-sm hover:border-accent/30 transition-all rounded-sm"
              >
                {/* Top Section: Gallery (Left) + Overview (Right) */}
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
                  {/* Interactive Product Gallery */}
                  <div className="w-full lg:w-5/12 flex-shrink-0">
                    <ProductGallery
                      productName={product.name}
                      mainImage={product.image}
                      bg={product.bg || "bg-mist"}
                      additionalImages={combinedImages}
                      datasheetImage={datasheet?.sheetImage}
                    />
                  </div>

                  {/* Product Info & Quick Highlights */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      {/* Name & Range Badge */}
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-ink uppercase tracking-wide">
                          {product.name}
                        </h2>
                        {product.range && (
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-mist border border-steel/15 text-xs font-mono uppercase tracking-wider text-steel rounded-sm">
                            <span className="text-accent font-semibold">Config:</span>
                            <span>{product.range}</span>
                          </div>
                        )}
                      </div>

                      {product.description && (
                        <p className="text-steel text-lg leading-relaxed mb-6">
                          {product.description}
                        </p>
                      )}

                      {/* Quick Specs / Highlights preview in info panel if datasheet exists */}
                      {datasheet && datasheet.highlights && (
                        <div className="mb-6 p-4 bg-mist/60 border border-steel/15 rounded-sm">
                          <p className="text-xs font-mono uppercase tracking-wider text-accent font-semibold mb-2.5 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Quick Engineering Specs</span>
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            {datasheet.highlights.slice(0, 4).map((h, idx) => (
                              <div key={idx} className="bg-white p-2 border border-steel/10 rounded-xs">
                                <span className="text-steel/70 font-mono block text-[10px] uppercase">
                                  {h.label}
                                </span>
                                <span className="font-semibold text-ink font-sans">
                                  {h.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Applications */}
                      {product.applications && product.applications.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-xs font-mono text-accent uppercase tracking-widest border-b border-steel/15 pb-2 mb-3">
                            Target Applications
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {product.applications.map((app, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-mist text-ink/80 text-xs font-medium rounded-sm border border-steel/10"
                              >
                                {app}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Basic specs fallback if no datasheet available */}
                      {!datasheet && product.specs && product.specs.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-xs font-mono text-accent uppercase tracking-widest border-b border-steel/15 pb-2 mb-3">
                            Specifications
                          </h3>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                              <tbody className="divide-y divide-steel/10">
                                {product.specs.map((spec, i) => (
                                  <tr key={i} className="hover:bg-mist/10">
                                    <td className="py-2 px-3 text-steel/80 font-medium w-1/3">
                                      {spec.label}
                                    </td>
                                    <td className="py-2 px-3 text-ink">
                                      {spec.value}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-steel/15 mt-6">
                      <Link
                        href={`/rfq?product=${encodeURIComponent(product.name)}`}
                        className="bg-accent text-white px-8 py-3 font-medium hover:bg-orange-600 transition-colors inline-flex items-center gap-2 shadow-sm font-mono text-sm uppercase tracking-wider"
                      >
                        Request Quote <ArrowRight className="w-4 h-4" />
                      </Link>

                      {datasheet && (
                        <a
                          href={`#datasheet-${product.id}`}
                          className="px-6 py-3 border border-steel/30 text-ink hover:text-accent hover:border-accent transition-colors font-mono text-sm uppercase tracking-wider inline-flex items-center gap-2"
                        >
                          <FileSpreadsheet className="w-4 h-4 text-accent" />
                          <span>View Full Rating Sheet</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* PROMINENT DATASHEET SECTION (IN FRONT!) */}
                {datasheet && (
                  <div id={`datasheet-${product.id}`} className="mt-10">
                    <ProductDatasheetSection
                      datasheet={datasheet}
                      productName={product.name}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

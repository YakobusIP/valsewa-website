export type BrandSlug = "valsewa" | "valjubel";

export const SWITCHER_BRANDS: BrandSlug[] = ["valsewa", "valjubel"];

export const VALJUBEL_EXTERNAL_URL = "https://valjubel.com";

export function getBrandLogoPath(brand: BrandSlug): string {
  return `/header/${brand.toUpperCase()}.svg`;
}

export function handleBrandSelection(
  brand: BrandSlug,
  onSelect: (brand: BrandSlug) => void
): void {
  if (brand === "valjubel") {
    window.location.assign(VALJUBEL_EXTERNAL_URL);
    return;
  }

  onSelect(brand);
}

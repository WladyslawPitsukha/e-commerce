export function getBrandNameFromSlug(slug: string): string {
    return slug
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .split(/[\s-]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}
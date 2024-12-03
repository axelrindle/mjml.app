/**
 * Builds a URL to an asset in the public directory.
 *
 * @param path The relative path to use.
 * @returns An absolute url string.
 */
export function asset(...path: string[]) {
    return [import.meta.env.BASE_URL, ...path]
        .join('/')
        .replace(/[/]{2,}/g, '/')
}

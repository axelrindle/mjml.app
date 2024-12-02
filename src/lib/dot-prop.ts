type Segment = string | number
type Path = Array<Segment>

function toPath(segment: Segment): string {
    if (typeof segment === 'string') {
        return `.${segment}`
    }

    if (typeof segment === 'number') {
        return `[${segment}]`
    }

    throw new Error(`invalid type ${typeof segment}`)
}

/**
 * Joins many segments to a path string compatible with dot-prop.
 *
 * @param path The list of segments to join.
 * @returns A dot-prop ready path string.
 */
export function join(path: Path): string {
    let result = ''

    for (let i = 0; i < path.length; i++) {
        const segment = path[i]

        if (i === 0) {
            result = toPath(segment)
            continue
        }

        result += toPath(segment)
    }

    // remove leading dot
    return result.substring(1)
}

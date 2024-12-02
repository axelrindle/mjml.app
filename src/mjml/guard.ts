import { MJMLJsonObject, MJMLJsonWithChildren, MJMLJsonWithContent } from './types'

export function hasContent(obj: MJMLJsonObject): obj is MJMLJsonWithContent {
    return typeof (obj as MJMLJsonWithContent).content === 'string'
}

export function hasChildren(obj: MJMLJsonObject): obj is MJMLJsonWithChildren {
    return Array.isArray((obj as MJMLJsonWithChildren).children)
}

import { ElementContent, Properties } from 'hast'
import { MJMLJsonObject } from './types'
import { toHtml } from 'hast-util-to-html'
import { fromHtml } from 'hast-util-from-html'
import { hasChildren, hasContent } from './guard'

function getProperties(data: MJMLJsonObject): Properties {
    return data.attributes as Properties ?? {}
}

function mjmlToHast(data: MJMLJsonObject): ElementContent {
    if (hasChildren(data)) {
        return {
            type: 'element',
            tagName: data.tagName,
            properties: getProperties(data),
            children: data.children.map(c => mjmlToHast(c)),
        }
    }

    if (hasContent(data)) {
        return {
            type: 'element',
            tagName: data.tagName,
            properties: getProperties(data),
            children: [
                {
                    type: 'text',
                    value: data.content,
                },
            ],
        }
    }

    return {
        type: 'element',
        tagName: data.tagName,
        properties: getProperties(data),
        children: [],
    }
}

export function mjmlJsonToXml(data: MJMLJsonObject) {
    return toHtml({
        type: 'root',
        children: [
            mjmlToHast(data),
        ],
    })
}

// TODO: Implement
export function mjmlXmlToJson(data: string) {
    return fromHtml(data)
}

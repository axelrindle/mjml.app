import { MJMLJsonObject } from './types'

type RawComponent =
    | 'head'
    | 'body'
    | 'include'
    | 'attributes'
    | 'breakpoint'
    | 'font'
    | 'html-attributes'
    | 'preview'
    | 'style'
    | 'title'
    | 'accordion'
    | 'button'
    | 'carousel'
    | 'column'
    | 'divider'
    | 'group'
    | 'hero'
    | 'image'
    | 'navbar'
    | 'raw'
    | 'section'
    | 'social'
    | 'spacer'
    | 'table'
    | 'text'
    | 'wrapper'

export type MjmlComponent = 'mjml' | `mj-${RawComponent}`

export const mjmlComponents: Readonly<Record<string, MjmlComponent[]>> = {
    'Root Components': [
        'mjml',
        'mj-head',
        'mj-body',
        'mj-include',
    ],
    'Standard Head Components': [
        'mj-attributes',
        'mj-breakpoint',
        'mj-font',
        'mj-html-attributes',
        'mj-preview',
        'mj-style',
        'mj-title',
    ],
    'Standard Body Components': [
        'mj-accordion',
        'mj-button',
        'mj-carousel',
        'mj-column',
        'mj-divider',
        'mj-group',
        'mj-hero',
        'mj-image',
        'mj-navbar',
        'mj-raw',
        'mj-section',
        'mj-social',
        'mj-spacer',
        'mj-table',
        'mj-text',
        'mj-wrapper',
    ],
}

/**
 * Defines custom component templates
 */
const templates: Partial<Record<MjmlComponent, Partial<MJMLJsonObject>>> = {
    'mj-divider': {},
    'mj-spacer': {},
    'mj-text': {
        content: 'Hello World',
    },
    'mj-button': {
        content: 'Click me',
        attributes: {
            href: '#',
        },
    },
}

/**
 * Build a component template for insertion to the json tree.
 *
 * @param component The component to use.
 * @returns An {@link MJMLJsonObject}.
 */
export function getComponentTemplate(component: MjmlComponent): MJMLJsonObject {
    const predefined = templates[component]
    if (predefined !== undefined) {
        return {
            ...predefined,
            tagName: component,
        }
    }

    return {
        tagName: component,
        attributes: {},
        children: [],
    }
}

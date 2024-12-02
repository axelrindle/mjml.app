import { MJMLJsonObject } from '@/mjml/types'
import { PropsWithChildren, useState } from 'react'
import { AppEditorContext, Context } from './context'
import { useLocalStorage } from 'usehooks-ts'

const storageKey = 'template'

const defaultData: MJMLJsonObject = {
    tagName: 'mjml',
    children: [
        {
            tagName: 'mj-head',
            children: [
                {
                    tagName: 'mj-attributes',
                    children: [
                        {
                            tagName: 'mj-all',
                            attributes: {
                                'font-family': 'sans-serif',
                            },
                        },
                        {
                            tagName: 'mj-text',
                            attributes: {
                                'font-size': '14px',
                            },
                        },
                    ],
                },
            ],
        },
        {
            tagName: 'mj-body',
            attributes: {
                'background-color': '#f1f5f9',
            },
            children: [
                {
                    tagName: 'mj-section',
                    children: [
                        {
                            tagName: 'mj-column',
                            children: [
                                {
                                    tagName: 'mj-text',
                                    content: 'Hello World',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
}
const initialData = localStorage.getItem(storageKey)

export function AppEditorProvider({ children }: PropsWithChildren) {
    const filename = useLocalStorage<string|undefined>('lastFilename', 'template.mjml')
    const data = useState<MJMLJsonObject>(
        initialData !== null
            ? JSON.parse(initialData)
            : defaultData,
    )

    const context: Context = {
        filename,
        data,
        persist() {
            localStorage.setItem(storageKey, JSON.stringify(data[0]))
        },
        reset() {
            data[1](defaultData)
        },
    }

    return (
        <AppEditorContext.Provider value={context}>
            {children}
        </AppEditorContext.Provider>
    )
}

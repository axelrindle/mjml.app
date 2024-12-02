import { MJMLJsonObject, ZMJMLJsonObject } from '@/mjml/types'
import { createContext } from 'react'
import { z } from 'zod'

export const ZTemplates = z.record(z.string().min(1), ZMJMLJsonObject)

export type Templates = z.infer<typeof ZTemplates>

export type Context = {
    templates: Templates

    getTemplate: (name: string) => MJMLJsonObject | undefined
    hasTemplate: (name: string) => boolean
    saveTemplate: (name: string, data: MJMLJsonObject) => void
    removeTemplate: (name: string) => void
}

export const AppStorageContext = createContext<Context>({} as Context)

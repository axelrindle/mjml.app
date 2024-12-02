import { MJMLJsonObject, ZMJMLJsonObject } from '@/mjml/types'
import { createContext, Dispatch, SetStateAction } from 'react'
import { z } from 'zod'

export const appEditorSchema = z.strictObject({
    filename: z.string().optional(),
    data: ZMJMLJsonObject,
})

export type AppEditorSchema = z.infer<typeof appEditorSchema>

type State<S> = [S, Dispatch<SetStateAction<S>>]
type LocalStorageState<S> = [...State<S>, () => void]

export type Context = {
    filename: LocalStorageState<string|undefined>
    data: State<MJMLJsonObject>
    persist: () => void
    reset: () => void
}

export const AppEditorContext = createContext<Context>({} as Context)

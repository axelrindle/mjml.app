import { createContext } from 'react'
import type { Get, Paths } from 'type-fest'
import { z } from 'zod'

export const appSettingsSchema = z.strictObject({
    editor: z.strictObject({
        fontSize: z.coerce.number().int().min(8).max(20),
    }),
})

export type AppSettings = z.infer<typeof appSettingsSchema>

export type Context = {
    settings: AppSettings
    updateSettings: <Path extends Paths<AppSettings>>(key: Path, value: Get<AppSettings, Path>) => void
    overwriteSettings: (newSettings: AppSettings) => void
}

export const AppSettingsContext = createContext<Context>({
    settings: {
        editor: {
            fontSize: 14,
        },
    },
} as Context)

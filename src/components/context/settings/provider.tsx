import { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { AppSettings, AppSettingsContext, appSettingsSchema, Context } from './context'
import { setProperty } from 'dot-prop'

const defaultSettings: AppSettings = {
    editor: {
        fontSize: 14,
    },
}

const storageKey = 'app-settings'

export function AppSettingsProvider({ children }: PropsWithChildren) {
    const [ready, setReady] = useState(false)
    const [settings, setSettings] = useState<AppSettings>(defaultSettings)

    const context = useMemo<Context>(() => ({
        settings,
        updateSettings(key, value) {
            const copy = Object.assign({}, settings)

            setProperty(copy, key, value)
            setSettings(copy)
        },
        overwriteSettings(newSettings) {
            setSettings(newSettings)
        },
    }), [settings])

    // persistence
    useEffect(() => {
        if (!ready) {
            return
        }

        localStorage.setItem(storageKey, JSON.stringify(settings))
    }, [ready, settings])

    // initial load
    useEffect(() => {
        const fromStorage = localStorage.getItem(storageKey)
        if (fromStorage === null) {
            setReady(true)
            return
        }

        try {
            const parsed = JSON.parse(fromStorage)
            const validated = appSettingsSchema.parse(parsed)
            setSettings(validated)
        } catch (error) {
            // ignore
        } finally {
            setReady(true)
        }
    }, [])

    if (!ready) {
        return null
    }

    return (
        <AppSettingsContext.Provider value={context}>
            {children}
        </AppSettingsContext.Provider>
    )
}

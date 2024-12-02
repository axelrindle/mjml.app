import { useToast } from '@/hooks/use-toast'
import { MJMLJsonObject } from '@/mjml/types'
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query'
import { PropsWithChildren, useCallback, useMemo } from 'react'
import { AppStorageContext, Context, Templates, ZTemplates } from './context'

const storageKey = 'templates'

// TODO: Use IndexedDB or something else more db-like

function useTemplates(): [UseQueryResult<Templates>, UseMutationResult<void, Error, Templates>] {
    const { toast } = useToast()

    const query = useQuery<Templates>({
        queryKey: ['templates'],
        initialData: {},
        queryFn: () => {
            const data = localStorage.getItem(storageKey)
            if (data === null) {
                localStorage.setItem(storageKey, '{}')
                return {}
            }

            const { success, data: parsed, error } = ZTemplates.safeParse(JSON.parse(data))
            if (!success) {
                toast({
                    title: 'Failed to load templates!',
                    description: error.message,
                    variant: 'destructive',
                })
                console.error(error)

                localStorage.setItem(`${storageKey}-backup`, data)
                localStorage.setItem(storageKey, '{}')
                return {}
            }

            return parsed
        },
    })

    const mutation = useMutation({
        mutationFn: async (templates: Templates) => {
            localStorage.setItem(storageKey, JSON.stringify(templates))
            await query.refetch()
        },
    })

    return [query, mutation]
}

export function AppStorageProvider({ children }: PropsWithChildren) {
    const [
        { data },
        { mutate },
    ] = useTemplates()

    const templates = useMemo<Templates>(() => data ?? {}, [data])

    const getTemplate = useCallback((name: string) => templates[name], [templates])
    const hasTemplate = useCallback((name: string) => getTemplate(name) !== undefined, [getTemplate])
    const removeTemplate = useCallback((name: string) => {
        const filtered = Object.fromEntries(Object.entries(templates).filter(([key]) => key !== name))
        mutate(filtered)
    }, [mutate, templates])
    const saveTemplate = useCallback((name: string, data: MJMLJsonObject) => {
        mutate({
            ...templates,
            [name]: data,
        })
    }, [mutate, templates])

    const context: Context = {
        templates,

        getTemplate,
        hasTemplate,
        removeTemplate,
        saveTemplate,
    }

    return (
        <AppStorageContext.Provider value={context}>
            {children}
        </AppStorageContext.Provider>
    )
}

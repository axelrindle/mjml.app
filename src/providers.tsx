import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { AppEditorProvider } from './components/context/editor/provider'
import { AppSettingsProvider } from './components/context/settings/provider'
import { AppStorageProvider } from './components/context/storage/provider'
import { TooltipProvider } from './components/ui/tooltip'
import { DndContext } from '@dnd-kit/core'

const queryClient = new QueryClient()

export default function AppProviders({ children }: PropsWithChildren) {
    return (
        <QueryClientProvider client={queryClient}>
            <AppSettingsProvider>
                <AppStorageProvider>
                    <TooltipProvider>
                        <DndContext>
                            <AppEditorProvider>
                                {children}
                            </AppEditorProvider>
                        </DndContext>
                    </TooltipProvider>
                </AppStorageProvider>
            </AppSettingsProvider>
        </QueryClientProvider>
    )
}

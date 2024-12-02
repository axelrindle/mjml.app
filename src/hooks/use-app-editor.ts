import { AppEditorContext } from '@/components/context/editor/context'
import { useContext } from 'react'

export function useAppEditor() {
    return useContext(AppEditorContext)
}

import { useContext } from 'react'
import { AppSettingsContext } from '@/components/context/settings/context'

export function useAppSettings() {
    return useContext(AppSettingsContext)
}

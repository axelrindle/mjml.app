import { AppStorageContext } from '@/components/context/storage/context'
import { useContext } from 'react'

export function useAppStorage() {
    return useContext(AppStorageContext)
}

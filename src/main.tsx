import './index.css'

import { RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppProviders from './providers.tsx'
import router from './router.ts'

const root = document.getElementById('root') as HTMLElement

createRoot(root).render(
    <StrictMode>
        <AppProviders>
            <RouterProvider router={router} />
        </AppProviders>
    </StrictMode>,
)

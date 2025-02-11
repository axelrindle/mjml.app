import Devtools from '@/components/Devtools'
import Header from '@/components/layout/Header'
import { Toaster } from '@/components/ui/toaster'
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
    component: () => (<>
        <Header />

        <main className="flex h-full flex-row flex-nowrap pt-16">
            <Outlet />
        </main>

        <Toaster />

        <Devtools />
    </>),
})

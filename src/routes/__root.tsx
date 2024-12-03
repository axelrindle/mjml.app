import AppSettingsDialog from '@/components/AppSettingsDialog'
import AppTemplatesDialog from '@/components/AppTemplatesDialog'
import Devtools from '@/components/Devtools'
import { Toaster } from '@/components/ui/toaster'
import { asset } from '@/lib/url'
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
    component: () => (<>
        <header className="fixed inset-x-0 top-0 z-50 h-16 bg-mjml-500 text-white">
            <div className="container mx-auto flex h-full flex-row flex-nowrap items-center gap-x-4">
                <img src={asset('icon-192.png')} className='size-12' />
                <p className="text-2xl font-bold">
                    mjml.app
                </p>

                <div className="grow"></div>

                <AppTemplatesDialog />
                <AppSettingsDialog />
                {/* <DarkModeToggle /> */}

                <p className="ml-8 text-xs italic">
                    Not affiliated with Mailjet or mjml.io
                </p>
            </div>
        </header>

        <main className="flex h-full flex-row flex-nowrap pt-16">
            <Outlet />
        </main>

        <Toaster />

        <Devtools />
    </>),
})

import { Link } from '@tanstack/react-router'
import AppLogo from '../AppLogo'
import AppSettingsDialog from '../AppSettingsDialog'
import AppTemplatesDialog from '../AppTemplatesDialog'

export default function Header() {
    return (
        <header className="fixed inset-x-0 top-0 z-50 h-16 bg-mjml-500 text-white">
            <div className="container mx-auto flex h-full flex-row flex-nowrap items-center gap-x-4">
                <AppLogo className='size-12' />
                <p className="text-2xl font-bold">
                    mjml.app
                </p>

                <Link to='/'>
                    Editor
                </Link>
                <Link to='/about'>
                    About
                </Link>

                <div className="grow"></div>

                <AppTemplatesDialog />
                <AppSettingsDialog />
                {/* <DarkModeToggle /> */}

                <p className="ml-8 text-xs italic">
                    Not affiliated with Mailjet or mjml.io
                </p>
            </div>
        </header>
    )
}

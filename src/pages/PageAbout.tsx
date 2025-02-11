import AppLogo from '@/components/AppLogo'
import pkg from '@/package'

export default function PageAbout() {
    return (
        <div className="w-screen overflow-y-scroll py-16">
            <div className="container prose mx-auto max-w-lg space-y-8 md:prose-xl ">
                <AppLogo className='mx-auto' />

                <div className='flex flex-row items-end justify-center gap-x-2 *:m-0'>
                    <h1>{pkg.name}</h1>
                    <h3>{pkg.version}</h3>
                </div>

                <blockquote>{pkg.description}</blockquote>

                <hr />

                <p>
                    This playground was crafted out of the need for rapid MJML prototyping.
                </p>

                <p>
                    While the <a href="https://mjml.io/try-it-live">official editor</a> technically works,
                    it is limited to the html/xml syntax. I&apos;m working with the json syntax at work and
                    didn&apos;t find a editor that suited my likings. So I decided to build my own editor.
                </p>

                <p>Lorem ipsum</p>
                <p>Lorem ipsum</p>
                <p>Lorem ipsum</p>
                <p>Lorem ipsum</p>
                <p>Lorem ipsum</p>
                <p>Lorem ipsum</p>
                <p>Lorem ipsum</p>
                <p>Lorem ipsum</p>
            </div>
        </div>
    )
}

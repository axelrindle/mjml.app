import { lazy, Suspense } from 'react'

const TanStackRouterDevtools =
    process.env.NODE_ENV === 'production'
        ? () => null
        : lazy(() =>
            import('@tanstack/router-devtools').then((res) => ({
                default: res.TanStackRouterDevtools,
            })),
        )

const TanStackQueryDevtools =
    process.env.NODE_ENV === 'production'
        ? () => null
        : lazy(() =>
            import('@tanstack/react-query-devtools').then((res) => ({
                default: res.ReactQueryDevtools,
            })),
        )

export default function Devtools() {
    return (<>
        <Suspense>
            <TanStackRouterDevtools position='bottom-right' />
            <TanStackQueryDevtools buttonPosition='bottom-right' />
        </Suspense>
    </>)
}

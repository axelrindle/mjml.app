import PageAbout from '@/pages/PageAbout'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/about')({
    component: () => <PageAbout />,
})

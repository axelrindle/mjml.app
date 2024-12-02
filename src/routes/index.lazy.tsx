import PageJsonEditor from '@/pages/PageJsonEditor'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
    component: () => <PageJsonEditor />,
})

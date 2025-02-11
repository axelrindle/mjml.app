import { asset } from '@/lib/url'
import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLImageElement>

export default function AppLogo(props: Props) {
    return (
        <img
            {...props}
            src={asset('icon-192.png')}
            alt='mjml.app logo'
            className={cn(props.className)}
        />
    )
}

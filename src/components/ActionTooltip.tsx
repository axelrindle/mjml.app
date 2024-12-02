import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactNode } from '@tanstack/react-router'
import { Simplify } from 'type-fest'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

type Props = Simplify<{
    label: string
    icon: IconDefinition | string
    action?: () => void | Promise<void>
    children?: (children: ReactNode) => ReactNode
}>

function Icon({ icon }: Props) {
    if (typeof icon === 'string') {
        return <img src={icon} />
    }

    return <FontAwesomeIcon icon={icon} />
}

function IconButton(props: Props) {
    return (
        <Button
            size="icon"
            onClick={props.action}
        >
            <Icon {...props} />
        </Button>
    )
}

export default function ActionTooltip(props: Props) {
    return (
        <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
                {props.children ? props.children(IconButton(props)) : IconButton(props)}
            </TooltipTrigger>
            <TooltipContent side='left'>
                <p>
                    {props.label}
                </p>
            </TooltipContent>
        </Tooltip>
    )
}

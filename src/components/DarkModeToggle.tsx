import { useDarkMode } from 'usehooks-ts'
import { Button } from './ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'

const element = document.querySelector('html') as HTMLHtmlElement

export default function DarkModeToggle() {
    const { isDarkMode, toggle } = useDarkMode()

    useEffect(() => {
        if (isDarkMode) {
            element.classList.add('dark')
        } else {
            element.classList.remove('dark')
        }
    }, [isDarkMode])

    return (
        <Button
            size="icon"
            variant="link"
            onClick={toggle}
        >
            <FontAwesomeIcon icon={isDarkMode ? faMoon : faSun} />
        </Button>
    )
}

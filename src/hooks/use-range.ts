import { useState } from 'react'

export default function useRange(min: number, max: number, initial: number): [number, (n: number) => void, number, number] {
    const [state, setState] = useState(initial)

    const customSetState = (newValue: number) => {
        if (newValue < min || newValue > max) {
            return
        }

        setState(newValue)
    }

    return [state, customSetState, min, max]
}

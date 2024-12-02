const storageKey = 'templates'

export function resetStorage() {
    localStorage.setItem(storageKey, JSON.stringify([]))
}

export function listTemplates(): string[] {
    const reset = () => {
        localStorage.setItem(storageKey, JSON.stringify([]))
        return []
    }

    const entry = localStorage.getItem(storageKey)
    if (entry === null) {
        return reset()
    }

    try {
        const parsed = JSON.parse(entry)
        if (!Array.isArray(parsed)) {
            return reset()
        }

        return parsed
    } catch (error) {
        return reset()
    }
}

export function getTemplate(name: string) {
    const entry = localStorage.getItem(`${storageKey}_${name}`)
    if (entry === null) {
        return null
    }

    try {
        return JSON.parse(entry)
    } catch (error) {
        return null
    }
}

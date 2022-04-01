const LOCAL_STORAGE_SCANNER_KEY = 'results-list'

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem(LOCAL_STORAGE_SCANNER_KEY)
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (err) {
        return undefined
    }
}

export const saveState = (state: string[]) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem(LOCAL_STORAGE_SCANNER_KEY, serializedState)
    } catch {

    }
}

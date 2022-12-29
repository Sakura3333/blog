export function debounce(fn: Function, delay = 500) {
    let time: number | null = null
    function _debounce() {
        if (time !== null) {
            clearTimeout(time)
        }
        
        time = setTimeout(() => {
            fn()
        }, delay)
    }
    return _debounce
}
// 函数节流
export function throtten(fn: () => void, delay: number) {
  let timer: NodeJS.Timeout
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn()
    }, delay)
  }
}
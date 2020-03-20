/**
 * A "modern" sleep statement.
 *
 * @param ms The number of milliseconds to wait.
 */
export const nDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
export const second = 1000

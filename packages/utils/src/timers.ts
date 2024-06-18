
/**
 * 休眠多少毫秒
 * @param ms The amount of time to sleep in milliseconds.
 */
export function sleep(ms = 1) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

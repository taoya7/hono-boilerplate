const SSR = typeof window === "undefined";

/**
 * Returns true if the client is running on a Mac.
 */
export function isMac(): boolean {
    if (SSR) {
        return false;
    }
    return window.navigator.platform === "MacIntel";
}

/**
 * Returns true if the client is running on Windows.
 */
export function isWindows(): boolean {
    if (SSR) {
        return false;
    }
    return window.navigator.platform === "Win32";
}


/**
 * Returns true if the client is a touch device.
 */
export function isTouchDevice(): boolean {
    if (SSR) {
        return false;
    }
    return window.matchMedia?.("(hover: none) and (pointer: coarse)")?.matches;
}

// Each function returns inline SVG markup as a string.
// `uid` namespaces gradient ids so multiple icons can render on one page
// without their <defs> colliding.

export function brandMark() {
    return `
        <svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
            <defs>
                <linearGradient id="brandWarm" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stop-color="#ff430f"/>
                    <stop offset="1" stop-color="#ffe01e"/>
                </linearGradient>
            </defs>
            <path d="M16 3c6.5 0 11 5.1 11 11.2 0 4.6-2.6 6.8-6 6.8h-2.3c-.8 0-1.4.7-1.4 1.4 0 .4.2.7.4 1 .3.4.5.8.5 1.3 0 1.3-1.2 2.3-2.6 2.1C9.6 25.8 5 20.6 5 14.5 5 8.1 9.9 3 16 3Z" fill="url(#brandWarm)"/>
            <circle cx="11.5" cy="13" r="1.8" fill="#097aff"/>
            <circle cx="17" cy="9.5" r="1.4" fill="#252525" opacity=".35"/>
            <circle cx="21" cy="14.5" r="1.6" fill="#252525" opacity=".35"/>
        </svg>`;
}

export function arrowIcon() {
    return `
        <svg class="lesson-arrow" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
}

function warmCool(uid) {
    return `
        <svg viewBox="0 0 48 48">
            <defs>
                <linearGradient id="${uid}-warm" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stop-color="#ff430f"/>
                    <stop offset="1" stop-color="#ffe01e"/>
                </linearGradient>
                <linearGradient id="${uid}-cool" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stop-color="#097aff"/>
                    <stop offset="1" stop-color="#4fc3ff"/>
                </linearGradient>
            </defs>
            <path d="M24 3 A21 21 0 0 1 24 45 Z" fill="url(#${uid}-warm)"/>
            <path d="M24 3 A21 21 0 0 0 24 45 Z" fill="url(#${uid}-cool)"/>
        </svg>`;
}

function gradient(uid) {
    return `
        <svg viewBox="0 0 48 48">
            <defs>
                <linearGradient id="${uid}-bar" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stop-color="#097aff"/>
                    <stop offset="0.5" stop-color="#ffe01e"/>
                    <stop offset="1" stop-color="#ff430f"/>
                </linearGradient>
            </defs>
            <rect x="3" y="19" width="42" height="10" rx="5" fill="url(#${uid}-bar)"/>
        </svg>`;
}

function mixing() {
    return `
        <svg viewBox="0 0 48 48">
            <circle class="mix-a" cx="18" cy="24" r="14" fill="#ff430f"/>
            <circle class="mix-b" cx="30" cy="24" r="14" fill="#097aff"/>
        </svg>`;
}

function vibrance() {
    return `
        <svg viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="21" fill="#6b6b6d"/>
            <circle cx="24" cy="24" r="13.5" fill="#ff8a3d"/>
            <circle cx="24" cy="24" r="6" fill="#ff430f"/>
        </svg>`;
}

const swatchRenderers = { warmCool, gradient, mixing, vibrance };

export function lessonSwatch(iconKey, uid) {
    const render = swatchRenderers[iconKey];
    return render ? render(uid) : '';
}

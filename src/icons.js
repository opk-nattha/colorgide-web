// Each function returns inline SVG markup as a string.
// `uid` namespaces gradient ids so multiple icons can render on one page
// without their <defs> colliding.

export function arrowIcon() {
    return `
        <svg class="lesson-arrow" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
}

export function backArrowIcon() {
    return `
        <svg class="back-arrow" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
}

export function imagePlaceholderIcon() {
    return `
        <svg class="image-slot-icon" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="4" width="18" height="16" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.6"/>
            <circle cx="8.5" cy="9.5" r="1.6" fill="none" stroke="currentColor" stroke-width="1.6"/>
            <path d="M3.5 16.5l5.5-5 4 3.5 3-2.7 4.5 4.2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
}

export function videoPlaceholderIcon() {
    return `
        <svg class="image-slot-icon" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="5" width="14" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.6"/>
            <path d="M17 10.3l4-2.3v8l-4-2.3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
            <path d="M9 9.3l4.2 2.7-4.2 2.7z" fill="currentColor"/>
        </svg>`;
}

export function lockIcon() {
    return `
        <svg class="lock-icon" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="5" y="11" width="14" height="9" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/>
            <path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
        </svg>`;
}

export function externalLinkIcon() {
    return `
        <svg class="external-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14 5h5v5M19 5l-8 8M8 6H6a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
}

export function checkIcon() {
    return `
        <svg class="check-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 13l4 4 10-10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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

function equipment(uid) {
    return `
        <svg viewBox="0 0 48 48">
            <defs>
                <linearGradient id="${uid}-handle" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stop-color="#ff430f"/>
                    <stop offset="1" stop-color="#ffe01e"/>
                </linearGradient>
            </defs>
            <ellipse cx="20" cy="27" rx="19" ry="13" fill="none" stroke="#6b6b6d" stroke-width="2.4"/>
            <circle cx="13" cy="23" r="3" fill="#097aff"/>
            <circle cx="21" cy="32" r="3" fill="#ff430f"/>
            <circle cx="29" cy="22" r="3" fill="#ffe01e"/>
            <rect x="30" y="4" width="5" height="18" rx="2.5" fill="url(#${uid}-handle)" transform="rotate(28 30 4)"/>
        </svg>`;
}

const swatchRenderers = { warmCool, gradient, mixing, equipment };

export function lessonSwatch(iconKey, uid) {
    const render = swatchRenderers[iconKey];
    return render ? render(uid) : '';
}

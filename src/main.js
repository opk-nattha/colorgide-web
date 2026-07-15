import { renderSplash } from './components/splash.js';
import { renderLessonSelect, bindLessonSelect } from './components/lesson-select.js';
import { renderLessonDetail } from './components/lesson-detail.js';
import { bindMediaSlots } from './media-loader.js';
import { markLessonVisited, isLessonsUnlocked } from './state/progress.js';
import { lessons } from './data/lessons.js';

// Splash plays once on load and lives outside the routed view so it
// never re-renders on navigation.
function mountSplash() {
    document.body.insertAdjacentHTML('afterbegin', renderSplash());
}

function resolveRoute() {
    const hash = window.location.hash;
    const match = hash.match(/^#\/lesson\/([\w-]+)/);

    if (match) {
        const lesson = lessons.find((item) => item.id === match[1]);
        if (lesson) {
            return { name: 'lesson', lesson };
        }
    }

    return { name: 'home' };
}

function render({ resetScroll = true } = {}) {
    const root = document.getElementById('root');
    const route = resolveRoute();

    // Guard against direct hash navigation (or a bookmarked link) reaching
    // a lesson page before the pre-test has been started.
    if (route.name === 'lesson' && !isLessonsUnlocked()) {
        window.location.hash = '#/';
        return;
    }

    if (route.name === 'lesson') {
        markLessonVisited(route.lesson.id);
    }

    root.innerHTML =
        route.name === 'lesson'
            ? renderLessonDetail(route.lesson)
            : renderLessonSelect();

    bindMediaSlots(root);
    if (route.name === 'home') {
        bindLessonSelect(root);
    }

    if (resetScroll) {
        window.scrollTo(0, 0);
    }
}

function mount() {
    mountSplash();
    render();
    // Matches the splash's fade timing (see src/styles/splash.css) — after
    // this, .app-shell fades in on first paint but instantly on re-renders.
    window.setTimeout(() => document.body.classList.add('is-ready'), 1700);
    window.addEventListener('hashchange', render);
    // Fired when progress changes without a hash change (e.g. clicking the
    // pre-test link, which opens in a new tab) so the home view can
    // immediately reflect the new unlocked state.
    document.addEventListener('progress:changed', () => render({ resetScroll: false }));
}

document.addEventListener('DOMContentLoaded', mount);

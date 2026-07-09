import { renderSplash } from './components/splash.js';
import { renderLessonSelect } from './components/lesson-select.js';
import { renderLessonDetail } from './components/lesson-detail.js';
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

function render() {
    const root = document.getElementById('root');
    const route = resolveRoute();

    root.innerHTML =
        route.name === 'lesson'
            ? renderLessonDetail(route.lesson)
            : renderLessonSelect();

    window.scrollTo(0, 0);
}

function mount() {
    mountSplash();
    render();
    window.addEventListener('hashchange', render);
}

document.addEventListener('DOMContentLoaded', mount);

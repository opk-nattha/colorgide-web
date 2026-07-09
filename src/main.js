import { renderSplash } from './components/splash.js';
import { renderLessonSelect, bindLessonSelect } from './components/lesson-select.js';

function mount() {
    const root = document.getElementById('root');
    root.innerHTML = renderSplash() + renderLessonSelect();
    bindLessonSelect(root);
}

document.addEventListener('DOMContentLoaded', mount);

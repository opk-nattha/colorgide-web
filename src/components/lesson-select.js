import { lessons } from '../data/lessons.js';
import { brandMark, arrowIcon, lessonSwatch } from '../icons.js';

function renderCard(lesson) {
    const uid = `swatch-${lesson.id}`;
    return `
        <button type="button" class="lesson-card" data-lesson="${lesson.id}">
            <span class="lesson-swatch swatch-${lesson.icon}" aria-hidden="true">
                ${lessonSwatch(lesson.icon, uid)}
            </span>
            <span class="lesson-text">
                <span class="lesson-title">${lesson.title}</span>
                <span class="lesson-desc">${lesson.desc}</span>
            </span>
            ${arrowIcon()}
        </button>`;
}

export function renderLessonSelect() {
    return `
        <main class="app-shell">
            <header class="app-header">
                <div class="brand">
                    ${brandMark()}
                    <span class="brand-name">Color Gide</span>
                </div>
                <h1 class="page-title">เลือกบทเรียนที่อยากเริ่ม</h1>
                <p class="page-subtitle">แตะหัวข้อบทเรียนที่ต้องการด้านล่าง แล้วเริ่มทำความเข้าใจเรื่องสีทีละขั้น</p>
            </header>

            <section class="lesson-grid" aria-label="รายการบทเรียน">
                ${lessons.map(renderCard).join('')}
            </section>
        </main>`;
}

// Wires click behaviour for the cards. Dispatches a `lesson:select`
// CustomEvent on `document` so a future router/page can listen for it
// without this component needing to know what happens next.
export function bindLessonSelect(root) {
    root.querySelectorAll('.lesson-card').forEach((card) => {
        card.addEventListener('click', () => {
            const lesson = card.dataset.lesson;
            document.dispatchEvent(
                new CustomEvent('lesson:select', { detail: { lesson } })
            );
        });
    });
}

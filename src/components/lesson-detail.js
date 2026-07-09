import { lessonContent } from '../data/lesson-content.js';
import { lessonSwatch, backArrowIcon, imagePlaceholderIcon } from '../icons.js';

function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^\p{L}\p{N}]+/gu, '-')
        .replace(/^-+|-+$/g, '');
}

// A dashed placeholder box marking where an illustration goes.
// `data-image-slot` gives each slot a stable, unique hook so a real
// <img> can be dropped in later without touching the surrounding markup.
function renderImageSlot(lessonId, label) {
    const slotId = `${lessonId}__${slugify(label)}`;
    return `
        <div class="image-slot" data-image-slot="${slotId}">
            ${imagePlaceholderIcon()}
            <span class="image-slot-label">ใส่รูปประกอบ: ${label}</span>
        </div>`;
}

function renderSection(lessonId, section) {
    return `
        <section class="detail-section">
            <h2 class="detail-section-title">${section.heading}</h2>
            <p class="detail-section-body">${section.body}</p>
            ${renderImageSlot(lessonId, section.heading)}
        </section>`;
}

export function renderLessonDetail(lesson) {
    const content = lessonContent[lesson.id];
    const uid = `detail-${lesson.id}`;

    return `
        <main class="app-shell detail-shell">
            <a href="#/" class="back-link">
                ${backArrowIcon()}
                <span>กลับหน้าเลือกบทเรียน</span>
            </a>

            <header class="detail-header app-header">
                <span class="detail-icon">${lessonSwatch(lesson.icon, uid)}</span>
                <h1 class="detail-title">${lesson.title}</h1>
                <p class="detail-intro">${content.intro}</p>
            </header>

            ${renderImageSlot(lesson.id, `ภาพหลัก - ${lesson.title}`)}

            <div class="detail-sections">
                ${content.sections.map((section) => renderSection(lesson.id, section)).join('')}
            </div>
        </main>`;
}

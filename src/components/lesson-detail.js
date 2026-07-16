import { lessonContent } from '../data/lesson-content.js';
import { mediaPaths } from '../data/media.js';
import { lessonSwatch, backArrowIcon, imagePlaceholderIcon, videoPlaceholderIcon } from '../icons.js';

function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^\p{L}\p{N}]+/gu, '-')
        .replace(/^-+|-+$/g, '');
}

// Renders a media slot: a webm video + webp image + dashed placeholder,
// all stacked on top of each other. src/media-loader.js decides which
// one is actually visible once the page runs. `name` is the filename
// (without extension) to look for — see src/data/media.js for the
// folder convention. `mediaKind: 'video'` just changes the placeholder
// copy/icon to signal a video example is expected — the webp fallback
// still works the same if a video never gets added.
function renderMediaSlot(lessonId, name, label, mediaKind = 'image') {
    const { webm, webp } = mediaPaths(lessonId, name);
    const slotId = `${lessonId}__${slugify(name)}`;
    const isVideo = mediaKind === 'video';
    const placeholderIcon = isVideo ? videoPlaceholderIcon() : imagePlaceholderIcon();
    const placeholderText = isVideo ? `ใส่วิดีโอตัวอย่าง: ${label}` : `ใส่รูปประกอบ: ${label}`;

    return `
        <div class="image-slot" data-media-slot="${slotId}">
            <video class="slot-media slot-video" muted loop playsinline preload="none">
                <source src="${webm}" type="video/webm">
            </video>
            <img class="slot-media slot-image" src="${webp}" alt="${label}" loading="lazy">
            <div class="slot-placeholder">
                ${placeholderIcon}
                <span class="image-slot-label">${placeholderText}</span>
            </div>
        </div>`;
}

function renderSection(lessonId, section, index) {
    return `
        <section class="detail-section">
            <h2 class="detail-section-title">${section.heading}</h2>
            <p class="detail-section-body">${section.body}</p>
            ${renderMediaSlot(lessonId, `section-${index + 1}`, section.heading, section.mediaKind)}
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

            ${renderMediaSlot(lesson.id, 'hero', `ภาพหลัก - ${lesson.title}`)}

            <div class="detail-sections">
                ${content.sections.map((section, index) => renderSection(lesson.id, section, index)).join('')}
            </div>
        </main>`;
}

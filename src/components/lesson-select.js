import { lessons } from '../data/lessons.js';
import { brandMark, arrowIcon, lockIcon, lessonSwatch } from '../icons.js';
import { renderTestLinks } from './test-links.js';
import { isLessonsUnlocked, markPreTestStarted } from '../state/progress.js';

function renderCard(lesson, unlocked) {
    const uid = `swatch-${lesson.id}`;
    const swatch = `
        <span class="lesson-swatch swatch-${lesson.icon}" aria-hidden="true">
            ${lessonSwatch(lesson.icon, uid)}
        </span>
        <span class="lesson-text">
            <span class="lesson-title">${lesson.title}</span>
            <span class="lesson-desc">${lesson.desc}</span>
        </span>`;

    if (!unlocked) {
        return `
            <div class="lesson-card is-locked" data-lesson="${lesson.id}" aria-disabled="true" title="ทำแบบทดสอบก่อนเรียนก่อน">
                ${swatch}
                ${lockIcon()}
            </div>`;
    }

    return `
        <a href="#/lesson/${lesson.id}" class="lesson-card" data-lesson="${lesson.id}">
            ${swatch}
            ${arrowIcon()}
        </a>`;
}

export function renderLessonSelect() {
    const unlocked = isLessonsUnlocked();

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

            ${renderTestLinks()}

            ${!unlocked ? '<p class="lock-hint">ทำแบบทดสอบก่อนเรียนด้านบนก่อน จึงจะเลือกบทเรียนได้</p>' : ''}

            <section class="lesson-grid" aria-label="รายการบทเรียน">
                ${lessons.map((lesson) => renderCard(lesson, unlocked)).join('')}
            </section>

            <footer class="credits-footer">
                <p class="credits-title">Color Gide จัดทำโดย</p>
                <ol class="credits-list">
                    <li>เดี๋ยวเราใส่เอง ชั้น ___ เลขที่ ___ หน้าที่ ___</li>
                    <li>เดี๋ยวเราใส่เอง ชั้น ___ เลขที่ ___ หน้าที่ ___</li>
                    <li>เดี๋ยวเราใส่เอง ชั้น ___ เลขที่ ___ หน้าที่ ___</li>
                </ol>
                <p class="credits-teacher">เสนอครู เดี๋ยวเราใส่เอง</p>
            </footer>
        </main>`;
}

// Wires the pre-test link (marks progress + tells main.js to re-render so
// locked cards immediately become real links) and gives locked cards a
// gentle nudge toward the pre-test button when tapped.
export function bindLessonSelect(root) {
    const preLink = root.querySelector('[data-test-link="pre"]');
    if (preLink) {
        preLink.addEventListener('click', () => {
            markPreTestStarted();
            document.dispatchEvent(new CustomEvent('progress:changed'));
        });
    }

    root.querySelectorAll('.lesson-card.is-locked').forEach((card) => {
        card.addEventListener('click', () => {
            const target = root.querySelector('[data-test-link="pre"]');
            if (!target) return;
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            target.classList.add('pulse');
            window.setTimeout(() => target.classList.remove('pulse'), 900);
        });
    });
}

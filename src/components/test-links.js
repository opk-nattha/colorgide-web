import { preTestFormUrl, postTestFormUrl } from '../data/forms.js';
import { lockIcon, externalLinkIcon, checkIcon } from '../icons.js';
import { getProgress, isPostTestUnlocked } from '../state/progress.js';
import { lessons } from '../data/lessons.js';

export function renderTestLinks() {
    const progress = getProgress();
    const total = lessons.length;
    const visited = progress.visitedLessons.length;
    const postUnlocked = isPostTestUnlocked();

    const preTest = `
        <a
            href="${preTestFormUrl}"
            target="_blank"
            rel="noopener"
            class="test-link${progress.preTestStarted ? ' is-done' : ''}"
            data-test-link="pre"
        >
            <span class="test-link-icon">${progress.preTestStarted ? checkIcon() : externalLinkIcon()}</span>
            <span class="test-link-text">
                <span class="test-link-title">แบบทดสอบก่อนเรียน</span>
                <span class="test-link-sub">${
                    progress.preTestStarted
                        ? 'ทำแล้ว — กดซ้ำได้ถ้าต้องการ'
                        : 'กดที่นี่ก่อน จึงจะเลือกบทเรียนได้'
                }</span>
            </span>
        </a>`;

    const postTest = postUnlocked
        ? `
        <a href="${postTestFormUrl}" target="_blank" rel="noopener" class="test-link">
            <span class="test-link-icon">${externalLinkIcon()}</span>
            <span class="test-link-text">
                <span class="test-link-title">แบบทดสอบหลังเรียน</span>
                <span class="test-link-sub">ดูครบทั้ง ${total} บทเรียนแล้ว</span>
            </span>
        </a>`
        : `
        <div class="test-link is-locked" aria-disabled="true">
            <span class="test-link-icon">${lockIcon()}</span>
            <span class="test-link-text">
                <span class="test-link-title">แบบทดสอบหลังเรียน</span>
                <span class="test-link-sub">ดูให้ครบก่อน (${visited}/${total} บทเรียน)</span>
            </span>
        </div>`;

    return `
        <div class="test-links">
            ${preTest}
            ${postTest}
        </div>`;
}

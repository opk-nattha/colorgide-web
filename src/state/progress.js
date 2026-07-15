import { lessons } from '../data/lessons.js';

const STORAGE_KEY = 'colorgide:progress';

function readRaw() {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch (err) {
        // localStorage unavailable (private browsing, etc.) — fall back to
        // an empty state rather than throwing.
        return {};
    }
}

function writeRaw(data) {
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
        // Progress just won't persist; the app still works for this session.
    }
}

export function getProgress() {
    const raw = readRaw();
    return {
        preTestStarted: Boolean(raw.preTestStarted),
        visitedLessons: Array.isArray(raw.visitedLessons) ? raw.visitedLessons : [],
    };
}

export function markPreTestStarted() {
    const progress = getProgress();
    if (!progress.preTestStarted) {
        progress.preTestStarted = true;
        writeRaw(progress);
    }
    return progress;
}

export function markLessonVisited(lessonId) {
    const progress = getProgress();
    if (!progress.visitedLessons.includes(lessonId)) {
        progress.visitedLessons.push(lessonId);
        writeRaw(progress);
    }
    return progress;
}

export function isLessonsUnlocked() {
    return getProgress().preTestStarted;
}

export function isPostTestUnlocked() {
    const { visitedLessons } = getProgress();
    return lessons.every((lesson) => visitedLessons.includes(lesson.id));
}

export function visitedCount() {
    return getProgress().visitedLessons.length;
}

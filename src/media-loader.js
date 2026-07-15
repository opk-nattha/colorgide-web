// Progressive media loading for the dashed image-slot placeholders.
//
// Each slot renders a <video> (webm), an <img> (webp), and a placeholder
// all stacked on top of each other. Whichever media actually loads gets
// shown; if neither loads (files not added yet), the placeholder stays
// visible. This means dropping a file into assets/webm|webp/<folder>/
// is the only step needed — no code changes.

function bindMediaSlot(slot) {
    const video = slot.querySelector('.slot-video');
    const img = slot.querySelector('.slot-image');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function activateImage() {
        if (slot.classList.contains('media-is-video')) return;
        slot.classList.add('has-media', 'media-is-image');
    }

    function activateVideo() {
        slot.classList.add('has-media', 'media-is-video');
        video.play().catch(() => {
            // Autoplay can be blocked; the poster/first frame still shows.
        });
    }

    if (video) {
        if (reduceMotion) {
            // Respect reduced-motion: never play video, fall through to webp.
            video.remove();
        } else {
            video.addEventListener('loadeddata', activateVideo, { once: true });
            video.addEventListener('error', () => {}, { once: true });
        }
    }

    if (img) {
        img.addEventListener('load', activateImage, { once: true });
        img.addEventListener('error', () => {}, { once: true });
    }
}

export function bindMediaSlots(root) {
    root.querySelectorAll('[data-media-slot]').forEach(bindMediaSlot);
}

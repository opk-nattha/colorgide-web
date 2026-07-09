// ─── Lesson Select ───
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.lesson-card');

    cards.forEach((card) => {
        card.addEventListener('click', () => {
            const lesson = card.dataset.lesson;
            document.dispatchEvent(
                new CustomEvent('lesson:select', { detail: { lesson } })
            );
        });
    });
});

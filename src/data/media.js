// Maps each lesson id (used internally, see ./lessons.js) to the
// folder name under assets/webm/ and assets/webp/.
//
// Drop files into the matching folder using these names and they will
// appear automatically — no other code changes needed:
//   assets/webm/<folder>/hero.webm        assets/webp/<folder>/hero.webp
//   assets/webm/<folder>/section-1.webm   assets/webp/<folder>/section-1.webp
//   assets/webm/<folder>/section-2.webm   assets/webp/<folder>/section-2.webp
//   assets/webm/<folder>/section-3.webm   assets/webp/<folder>/section-3.webp
//
// webp is the static fallback (also used when a person has "reduce motion"
// turned on). webm is optional — if it's missing, the webp still shows.
// Until either file exists, the dashed placeholder box shows instead.

const folderByLesson = {
    'warm-cool': 'warm-tones-cool-tones',
    gradient: 'gradient',
    mixing: 'mix-colors',
    vibrance: 'vibrant-colors',
};

export function mediaPaths(lessonId, name) {
    const folder = folderByLesson[lessonId];
    return {
        webm: `assets/webm/${folder}/${name}.webm`,
        webp: `assets/webp/${folder}/${name}.webp`,
    };
}

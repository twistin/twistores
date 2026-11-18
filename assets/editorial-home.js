/* Home-only copy; shared navigation, language and theme controls stay in main.js. */
Object.assign(T.en, {
    ed_nav_lab:'Laboratory', ed_kicker:'PERSONAL ARCHIVE · VIGO',
    ed_intro:'Music, society<br>and practices of <em>listening.</em>',
    ed_note:'Silvino Díaz Carreras. Research, creative coding and field recordings.',
    ed_photo:'01 / LISTENING TERRITORIES', ed_feature_label:'IN FOCUS · INTERACTIVE GUIDE',
    ed_feature_title:'The world makes sound.<br>Learn to listen.',
    ed_feature_desc:'Soundscapes and acoustic ecology: discover the layers of your surroundings, experiment with noise and prepare your own soundwalk.',
    ed_feature_cta:'Explore the guide', ed_writing_label:'02 / WRITING', ed_writing:'Latest publications', ed_archive:'All articles ↗',
    ed_date1:'APR 2026 · RESEARCH', ed_date2:'MAR 2026 · SOCIOLOGY', ed_date3:'MAR 2026 · ART & TECHNOLOGY',
    ed_article1:'Venezuelans in Galicia: when the Virgin of La Chinita arrives in Ourense ↗',
    ed_article2:'Local music scenes today: still a useful concept? ↗',
    ed_article3:'The State of Digital Art: history, scenes and futures of AI ↗',
    ed_lab_label:'03 / LABORATORY · SUPERCOLLIDER', ed_lab_title:'Code has<br>a sound, too.',
    ed_lab_desc:'Session 07. From a bank of partials to a moving texture: additive synthesis, high-register events and spatial memory.',
    ed_lab_cta:'Open session 07', ed_lab_archive:'All sessions and resources →', ed_code_caption:'PARTIALS STUDY / 01',
    ed_live_label:'MOVING IMAGE', ed_live:'Explorations in Paradise · Explore the audiovisual archive ↗',
    ed_listen_label:'04 / FIELD LISTENING', ed_listen_title:'A pause in O Castro.', ed_listen_archive:'All soundscapes ↗',
    ed_recording_meta:'VIGO · 03 NOV 2024 · ZOOM H6', ed_recording_note:'A siren, birds, footsteps. Listen to the city from the fortress.',
    ed_footer:'An open archive of music, code and listening.'
});
Object.assign(T.gl, {
    ed_nav_lab:'Laboratorio', ed_kicker:'ARQUIVO PERSOAL · VIGO',
    ed_intro:'Música, sociedade<br>e prácticas de <em>escoita.</em>',
    ed_note:'Silvino Díaz Carreras. Investigación, código creativo e gravacións de campo.',
    ed_photo:'01 / TERRITORIOS DE ESCOITA', ed_feature_label:'EN FOCO · GUÍA INTERACTIVA',
    ed_feature_title:'O mundo soa.<br>Aprende a escoitalo.',
    ed_feature_desc:'Paisaxe sonora e ecoloxía acústica: descubre as capas da contorna, experimenta co ruído e prepara o teu propio paseo de escoita.',
    ed_feature_cta:'Explorar a guía', ed_writing_label:'02 / ESCRITA', ed_writing:'Últimas publicacións', ed_archive:'Todos os artigos ↗',
    ed_date1:'ABR 2026 · INVESTIGACIÓN', ed_date2:'MAR 2026 · SOCIOLOXÍA', ed_date3:'MAR 2026 · ARTE E TECNOLOXÍA',
    ed_article1:'Venezolanos en Galicia: cando a Virxe da Chinita chega a Ourense ↗',
    ed_article2:'Escenas musicais locais hoxe en día: unha ferramenta válida? ↗',
    ed_article3:'O Estado da Arte Dixital: historia, escenas e futuros da IA ↗',
    ed_lab_label:'03 / LABORATORIO · SUPERCOLLIDER', ed_lab_title:'O código tamén<br>se escoita.',
    ed_lab_desc:'Sesión 07. Do banco de parciais a unha textura en movemento: síntese aditiva, eventos agudos e memoria espacial.',
    ed_lab_cta:'Abrir sesión 07', ed_lab_archive:'Todas as sesións e recursos →', ed_code_caption:'ESTUDO DE PARCIAIS / 01',
    ed_live_label:'IMAXE EN MOVEMENTO', ed_live:'Explorations in Paradise · Ver o arquivo audiovisual ↗',
    ed_listen_label:'04 / ESCOITA DE CAMPO', ed_listen_title:'Unha pausa no Castro.', ed_listen_archive:'Todos os soundscapes ↗',
    ed_recording_meta:'VIGO · 03 NOV 2024 · ZOOM H6', ed_recording_note:'Unha sirena, paxaros, pasos. A cidade escóitase desde a fortaleza.',
    ed_footer:'Un arquivo aberto de música, código e escoita.'
});
// Retain the original Spanish markup as the authoritative ES translation.
document.querySelectorAll('[data-i18n^="ed_"]').forEach(el => {
    T.es[el.dataset.i18n] = el.innerHTML;
});
function syncEditorialAccessibility() {
    const lang = document.documentElement.lang;
    document.querySelectorAll('[data-alt-es]').forEach(img => { img.alt = img.dataset['alt' + lang[0].toUpperCase() + lang.slice(1)] || img.dataset.altEs; });
    const player = document.querySelector('.ed-recording audio');
    player.setAttribute('aria-label', {es:'Grabación de campo en O Castro de Vigo',gl:'Gravación de campo no Castro de Vigo',en:'Field recording in O Castro, Vigo'}[lang] || 'O Castro');
    document.querySelector('meta[name="theme-color"]').content = document.documentElement.dataset.theme === 'dark' ? '#241C2D' : '#F4EFE6';
}
document.addEventListener('languageChanged', syncEditorialAccessibility);
new MutationObserver(syncEditorialAccessibility).observe(document.documentElement, {attributes:true, attributeFilter:['data-theme']});

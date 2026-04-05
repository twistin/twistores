/**
 * TWISTORES — Shared JS
 * Handles: theme toggle (dark/light) + i18n (gl / es / en)
 */

// ── Translations ──────────────────────────────────────────────────────────────
const T = {
    gl: {
        // NAV
        nav_home:        "Inicio",
        nav_articles:    "Artigos",
        nav_livecoding:  "Live Coding",
        nav_soundscapes: "Soundscapes",
        nav_about:       "Sobre min",

        // HERO
        hero_eyebrow:    "// Música · Migración · Tecnoloxía",
        hero_title:      "Investigación doutoral, live coding e soundscapes desde Vigo",
        hero_sub:        "Silvino Díaz Carreras. Investigador, docente e performer centrado na música, migración, tecnoloxía e escoita de campo.",
        hero_support:    "Aquí conviven escritura longa, arquivo de sesións en vivo e paisaxes sonoras publicadas con contexto, imaxe e audio.",
        hero_cta1:       "Explorar artigos",
        hero_cta2:       "Ver arquivo en vivo",
        hero_route_articles_label: "// investigación",
        hero_route_articles_title: "Ler artigos e ensaios",
        hero_route_articles_desc: "Textos publicados sobre socioloxía da música, migración e tecnoloxía.",
        hero_route_live_label: "// arquivo en vivo",
        hero_route_live_title: "Ver sesións documentadas",
        hero_route_live_desc: "Directos con vídeo, fotografías, contexto e pezas interpretadas.",
        hero_route_sound_label: "// escoita de campo",
        hero_route_sound_title: "Escoitar soundscapes",
        hero_route_sound_desc: "Gravacións de campo con notas de escoita, coordenadas e imaxes.",

        // SECTION LABELS
        label_articles:     "// escritura académica & reflexión",
        label_events:       "// sets de live coding",
        label_soundscapes:  "// gravacións de campo",
        label_field:        "// gravacións de campo · fotografía · audio",
        label_researcher:   "// investigador/a · performer · escoitante",
        label_research:     "// liñas de investigación",
        label_who:          "// quen son",
        label_tools:        "// ferramentas creativas",

        // SECTION TITLES
        title_recent_articles: "Artigos recentes",
        title_events:          "Eventos",
        title_soundscapes:     "Soundscapes recentes",
        title_articles_page:   "Artigos",
        title_events_page:     "Sets de Live Coding",
        title_soundscapes_page:"Soundscapes",
        title_about_page:      "Sobre min",
        title_research_areas:  "Áreas de investigación",
        home_articles_intro:   "Unha selección breve de investigación publicada e textos sobre tecnoloxía musical, sen mesturar borradores nin pezas en desenvolvemento.",
        home_events_intro:     "A axenda pública amosa só actuacións confirmadas. Se non hai datas pechadas, esta sección indícao sen promesas baleiras.",
        home_soundscapes_intro:"Rexistro de escoita en contorna urbana, publicado con fotografía e audio de campo reais.",
        home_live_intro:       "Arquivo de directos documentados con contexto, materiais e pezas interpretadas. A home destaca só a sesión máis recente.",
        home_live_feature_text:"Última sesión documentada con vídeo, fotografías e desglose das pezas interpretadas en directo.",
        home_live_feature_piece1:"<strong>I — Twistores.</strong> Xiro, torsión e pregues desde a improvisación.",
        home_live_feature_piece2:"<strong>II — Tribar.</strong> Xeometría imposible, repetición e inestabilidade.",
        articles_page_intro:   "Arquivo de textos publicados sobre socioloxía da música, escenas locais e tecnoloxía sonora.",

        // FILTER TABS
        filter_all:       "Todos",
        filter_research:  "Investigación",
        filter_thesis:    "Tese doutoral",
        filter_music_tech:"Música & Tech",
        filter_music_edu: "Música & Educación",
        filter_tech_edu:  "Tecnoloxía & Educación",
        filter_others:    "Outros",

        // ARTICLE CATEGORIES
        cat_research:   "Investigación",
        cat_thesis:     "Tese doutoral",
        cat_music_tech: "Música & Tecnoloxía",
        cat_music_edu:  "Música & Educación",
        cat_tech_edu:   "Tecnoloxía & Educación",
        cat_others:     "Outros",
        badge_featured: "★ Destacado",

        // ARTICLE TITLES & DESCRIPTIONS
        art_locales_title: "Escenas musicais locais hoxe en día: unha ferramenta válida?",
        art_locales_desc:  "Unha revisión crítica da utilidade do concepto de \"escena musical local\", desde a súa emerxencia co punk ata a súa expansión na era das plataformas dixitais, analizando o caso de Vigo.",
        art1_title: "Cantando en Terra Allea: identidade e pertenza na diáspora latinoamericana",
        art1_desc:  "Unha análise sociolóxica de como a música actúa como ancla identitaria en contextos migratorios.",
        art2_title: "Música de raíz e negociación identitaria: o caso de músicos latinos en Barcelona",
        art2_desc:  "Entrevistas en profundidade con músicos migrantes sobre a función da música nos seus procesos de adaptación.",
        art3_title: "O son do nós: comunidades sonoras transnacionais",
        art3_desc:  "Como as plataformas dixitais permiten manter vínculos culturais a través da música na distancia.",
        art4_title: "Live coding como práctica performativa: do erro ao xesto sonoro",
        art4_desc:  "Reflexións sobre a improvisación algorítmica e a estética do código en tempo real.",
        art5_title: "SuperCollider e TidalCycles: gramáticas sonoras do presente",
        art5_desc:  "Comparativa entre dúas linguaxes de live coding e as súas comunidades de práctica a nivel global.",
        art6_title: "Écranoscapes: paisaxes sonoras e visuais na era dixital",
        art6_desc:  "A converxencia entre imaxe, código e son nas novas formas de performance audiovisual.",
        art7_title: "Pedagoxías sonoras en contextos interculturais",
        art7_desc:  "Como o traballo con músicas do mundo pode transformar a aula nun espazo de encontro.",
        art8_title: "Música migrante na aula: voz, emoción e aprendizaxe",
        art8_desc:  "Experiencias docentes que incorporan as músicas familiares do alumnado migrante como recurso pedagóxico.",
        art9_title: "Código como linguaxe creativa: introdución ao live coding en educación secundaria",
        art9_desc:  "Unha proposta didáctica para integrar o live coding como ferramenta de expresión artística na aula.",
        art10_title:"Plataformas dixitais e novas formas de aprender música",
        art10_desc: "YouTube, SoundCloud, Twitch: como as plataformas están redefinindo a educación musical informal.",
        art11_title:"Notas de campo: Barcelona como laboratorio sonoro",
        art11_desc: "Reflexións persoais sobre as paisaxes sonoras de Barcelona como espazo de investigación e vida.",
        art12_title:"Recensión: «Música e inmigración» — Coord. Silvia Martínez",
        art12_desc: "Lectura crítica dun dos libros de referencia sobre música e migración no contexto español.",
        art13_title:"O Estado da Arte Dixital: historia, escenas, pedagoxía e futuros da intelixencia artificial",
        art13_desc: "Un percorrido polos pioneiros da arte computacional, a demoscene, o net.art e a IA xerativa, con foco nas súas escenas, artistas e modelos pedagóxicos.",
        art14_title:"Clasismo e machismo na recepción do trap e do reguetón: revisión crítica da lexitimidade cultural, a identidade e o sexismo",
        art14_desc: "Unha revisión crítica sobre como a condena do sexismo nestes xéneros se entrelaza coa distinción social, a identidade e a deslexitimación cultural.",

        // EVENTS PAGE
        events_intro:    "Sets realizados con <strong>SuperCollider</strong> e <strong>TidalCycles</strong>. A música xorde do código en tempo real: cada actuación é irrepetible. O programa e o músico improvisaban xuntos, o erro é parte da obra.",
        events_status_label: "Axenda",
        events_status_current: "Agora",
        events_status_title: "Sen datas públicas neste momento",
        events_status_desc: "A axenda de directos actualizarase aquí cando haxa unha actuación confirmada e publicada.",
        events_status_badge: "En actualización",
        events_contact_cta: "Escribir por correo →",
        events_archive_note: "O arquivo de actuacións volverá cando estea revisado con datas e documentación verificadas.",
        event_upcoming:  "Próximo",
        event_past:      "Pasado",
        events_upcoming: "Próximos",
        see_all_events:  "Ver todos os eventos →",

        // EVENT NAMES
        ev1_name:  "TWISTORES Live — Algorave Barcelona",
        ev1_venue: "Sala Apolo · Barcelona",
        ev2_name:  "Resonancias Migrantes — CCCB",
        ev2_venue: "CCCB · Barcelona",
        ev3_name:  "Código Aberto — Festival SuperCollider",
        ev3_venue: "Espai Erre · Girona",
        ev4_name:  "Noites Electrónicas — set improvisado",
        ev4_venue: "Hangar · Barcelona",
        ev5_name:  "Terra Sonora — Xornadas de Etnomusicoloxía",
        ev5_venue: "UAB · Bellaterra",
        ev6_name:  "Algorave — Sónar+D Late Night",
        ev6_venue: "Sónar · Barcelona",
        ev7_name:  "Música Viva — 1º aniversario de TWISTORES",
        ev7_venue: "Sala Beckett · Barcelona",

        // SOUNDSCAPE TITLES
        ss1_title: "Choiva sobre pedra",
        ss1_desc:  "Tarde de inverno nas ruínas de Can Masdeu. Auga, vento e silencio urbano.",
        ss2_title: "Amencer no bosque",
        ss2_desc:  "Paxaros, brisa e o zunido lonxano da cidade espertando ao amencer.",
        ss3_title: "Mercado e voces",
        ss3_desc:  "O caos organizado do mercado: idiomas, metais e o ritmo da venda.",

        // SOUNDSCAPES PAGE
        ss_page_desc:    "Saídas de campo para escoitar, rexistrar e explorar as paisaxes sonoras da cidade e do campo. Cada sesión inclúe fotografías do entorno e gravacións de audio.",
        ss1_loc:   "Can Masdeu, BCN",
        ss1_date:  "14 Feb, 2025",
        ss1_cond:  "Choiva, 8°C",
        ss2_loc:   "Collserola, BCN",
        ss2_date:  "8 Xan, 2025",
        ss2_cond:  "Despexado, 5°C",
        ss3_loc:   "A Boqueria, BCN",
        ss3_date:  "20 Nov, 2024",
        ss3_cond:  "Interior, abafante",
        ss_see_all:"Ver todas as sesións →",
        see_recent_soundscapes: "Ver sesión completa →",

        // SOUNDSCAPE FIELD META LABELS
        field_place:    "Lugar",
        field_date:     "Data",
        field_cond:     "Condicións",
        field_duration: "Duración",

        // ABOUT
        about_thesis_tag: "Tese Doutoral — Socioloxía",
        about_thesis_title:   "«Cantando en Terra Allea»\nMúsica, Migración e Identidade",
        about_thesis_desc:    "Investigación doutoral sobre a música como espazo de identidade, memoria e pertenza nas comunidades migrantes, cunha aproximación sociolóxica atenta ás prácticas musicais, aos procesos educativos e ás mediacións tecnolóxicas.",
        about_bio1:  "Son doutorando na Facultade de Socioloxía, con formación superior en guitarra clásica e Historia e Ciencias da Música, e investigador centrado na relación entre música e identidade nas comunidades migrantes. Ademais, son profesor no CMUS Profesional de Música Reveriano Soutullo, onde imparto guitarra clásica, Historia da Música e Novas Tecnoloxías Aplicadas á Música.",
        about_bio2:  "En paralelo, desenvolvo unha práctica artística con ordenador centrada en SuperCollider, o live coding e a gravación de paisaxes sonoras. Interésame a confluencia entre música, tecnoloxía e ciencia, así como as súas aplicacións á educación musical.",
        about_bio3:  "Vivo en Vigo, cidade da que son natural. TWISTORES é o espazo no que conflúen esa labor investigadora, a docencia e a creación sonora.",
        // RESEARCH AREAS (HOME)
        ra1_title: "Música & Migración",
        ra1_desc:  "O papel da música na construción de identidades diaspóricas.",
        ra2_title: "Escenas Locais",
        ra2_desc:  "Estudos etnográficos de comunidades musicais underground.",
        ra3_title: "Son & Interculturalidade",
        ra3_desc:  "Pedagoxías interculturais do son e uso de músicas do mundo en aulas diversas.",
        ra4_title: "Tecnoloxía & Educación",
        ra4_desc:  "Integración do código creativo e o live coding como ferramentas pedagóxicas.",

        // SOUNDSCAPES PAGE
        ss_page_desc: "Saídas de campo para escoitar, rexistrar e explorar as paisaxes sonoras da cidade e do campo.\nCada sesión inclúe fotografías da contorna e gravacións de audio.",
        ss_castro_title: "Sesión: O Castro de Vigo",
        ss_castro_loc: "O Castro de Vigo",
        ss_masdeu_title: "Sesión: Can Masdeu, Collserola",
        ss_masdeu_loc: "Can Masdeu, BCN",
        ss_home_castro_title: "O Castro de Vigo",
        ss_home_castro_desc: "Nove puntos de escoita, fotografías e gravacións de campo rexistradas en novembro de 2024.",
        ss_archive_note: "Arquivo en crecemento · Sesións publicadas: O Castro de Vigo (nov. 2024) · Chan de Brito (mar. 2026).",
        ss_castro_helper: "Selecciona un dos nove puntos para actualizar a fotografía, a nota de campo e o audio.",
        ss_meta_loc: "Lugar / Hora",

        ss_meta_date: "Data",
        ss_meta_coords: "Coordenadas",
        ss_meta_gear: "Gravación",
        sidebar_tools:   "Ferramentas creativas",
        sidebar_research:"Investigación",
        sidebar_contact: "Contacto",
        res1: "Socioloxía da música",
        res2: "Estudos migratorios",
        res3: "Identidade cultural",
        res4: "Etnomusicoloxía",
        res5: "Socioloxía dixital",

        // FOOTER
        footer_desc:    "Investigación doutoral en socioloxía da música, migracións e identidade.",
        footer_sections:"Seccións",
        footer_project: "Proxecto",
        footer_tools:   "Ferramentas",
        footer_copy:    "// feito con código e café ☕",

        // READ MORE
        read_more: "Ler máis →",
        reading_min: "Lectura",

        // SHARE ARTICLE
        share_article_prompt: "¿Interesouche o artigo?",
        share_article_btn: "⇡ compartir artigo",
        share_copy_link: "Copiar ligazón",
        share_copied: "✓ Copiado",
        meta_author: "Autor",
        meta_original_lang: "Idioma orixinal",
        meta_published: "Publicado",
        meta_category: "Área",
        meta_topics: "Temas",
        related_articles_heading: "Lecturas relacionadas",
        lang_original_version: "Versión orixinal do artigo",
        lang_translation_soon: "Tradución aínda non dispoñible",
        lang_gl_name: "Galego",
        lang_es_name: "Castelán",
        lang_en_name: "Inglés",

        // MISC
        all_events_btn: "Ver estado dos directos →",
        all_ss_btn:     "Ver todas as sesións →",
        all_art_btn:    "Ver todos os artigos →",

        // SCHMIDT EVENT
        ev_schmidt_month:   "ABR · 2025",
        ev_schmidt_desc:    "Ambient · House · Código en tempo real.\nO kairós e o I Ching como guías da improvisación algorítmica.",
        ev_schmidt_venue:   "Sala Supersonic · Vigo",
        ev_schmidt_tickets: "Entradas dispoñibles",
        ev_schmidt_cta:     "Mercar entradas →",
    },

    es: {
        nav_home:        "Inicio",
        nav_articles:    "Artículos",
        nav_livecoding:  "Live Coding",
        nav_soundscapes: "Soundscapes",
        nav_about:       "Acerca de",
        hero_eyebrow:    "// Música · Migración · Tecnología",
        hero_title:      "Investigación doctoral, live coding y soundscapes desde Vigo",
        hero_sub:        "Silvino Díaz Carreras. Investigador, docente y performer centrado en música, migración, tecnología y escucha de campo.",
        hero_support:    "Aquí conviven escritura larga, archivo de sesiones en vivo y paisajes sonoros publicados con contexto, imagen y audio.",
        hero_cta1:       "Explorar artículos",
        hero_cta2:       "Ver archivo en vivo",
        hero_route_articles_label: "// investigación",
        hero_route_articles_title: "Leer artículos y ensayos",
        hero_route_articles_desc: "Textos publicados sobre sociología de la música, migración y tecnología.",
        hero_route_live_label: "// archivo en vivo",
        hero_route_live_title: "Ver sesiones documentadas",
        hero_route_live_desc: "Directos con vídeo, fotografías, contexto y piezas interpretadas.",
        hero_route_sound_label: "// escucha de campo",
        hero_route_sound_title: "Escuchar soundscapes",
        hero_route_sound_desc: "Grabaciones de campo con notas de escucha, coordenadas e imágenes.",
        label_articles:     "// escritura académica & reflexión",
        label_events:       "// sets de live coding",
        label_soundscapes:  "// grabaciones de campo",
        label_field:        "// grabaciones de campo · fotografía · audio",
        label_researcher:   "// investigador/a · performer · escuchante",
        label_research:     "// líneas de investigación",
        label_who:          "// quién soy",
        label_tools:        "// herramientas creativas",
        title_recent_articles: "Artículos recientes",
        title_events:          "Eventos",
        title_soundscapes:     "Soundscapes recientes",
        title_articles_page:   "Artículos",
        title_events_page:     "Sets de Live Coding",
        title_soundscapes_page:"Soundscapes",
        title_about_page:      "Acerca de",
        title_research_areas:  "Áreas de investigación",
        home_articles_intro:   "Una selección breve de investigación publicada y textos sobre tecnología musical, sin mezclar borradores ni piezas en desarrollo.",
        home_events_intro:     "La agenda pública enseña solo actuaciones confirmadas. Si no hay fechas cerradas, esta sección lo muestra sin promesas vacías.",
        home_soundscapes_intro:"Registro de escucha en entorno urbano, publicado con fotografía y audio de campo reales.",
        home_live_intro:       "Archivo de directos documentados con contexto, materiales y piezas interpretadas. La home solo destaca la sesión más reciente.",
        home_live_feature_text:"Última sesión documentada con vídeo, fotografías y desglose de las piezas interpretadas en directo.",
        home_live_feature_piece1:"<strong>I — Twistores.</strong> Giro, torsión y pliegues desde la improvisación.",
        home_live_feature_piece2:"<strong>II — Tribar.</strong> Geometría imposible, repetición e inestabilidad.",
        articles_page_intro:   "Archivo de textos publicados sobre sociología de la música, escenas locales y tecnología sonora.",
        filter_all:       "Todos",
        filter_research:  "Investigación",
        filter_thesis:    "Tesis doctoral",
        filter_music_tech:"Música & Tech",
        filter_music_edu: "Música & Educación",
        filter_tech_edu:  "Tecnología & Educación",
        filter_others:    "Otros",
        cat_research:   "Investigación",
        cat_thesis:     "Tesis doctoral",
        cat_music_tech: "Música & Tecnología",
        cat_music_edu:  "Música & Educación",
        cat_tech_edu:   "Tecnología & Educación",
        cat_others:     "Otros",
        badge_featured: "★ Destacado",
        art_locales_title: "Escenas musicales locales hoy en día: ¿una herramienta válida?",
        art_locales_desc:  "Una revisión crítica de la utilidad del concepto de \"escena musical local\", desde su emergencia con el punk hasta su expansión en la era de las plataformas digitales, analizando el caso de Vigo.",
        art1_title: "Cantando en Tierra Ajena: identidad y pertenencia en la diáspora latinoamericana",
        art1_desc:  "Un análisis sociológico de cómo la música actúa como anclaje identitario en contextos migratorios.",
        art2_title: "Música de raíz y negociación identitaria: el caso de músicos latinos en Barcelona",
        art2_desc:  "Entrevistas en profundidad con músicos migrantes sobre la función de la música en sus procesos de adaptación.",
        art3_title: "El sonido del nosotros: comunidades sonoras transnacionales",
        art3_desc:  "Cómo las plataformas digitales permiten mantener vínculos culturales a través de la música en la distancia.",
        art4_title: "Live coding como práctica performativa: del error al gesto sonoro",
        art4_desc:  "Reflexiones sobre la improvisación algorítmica y la estética del código en tiempo real.",
        art5_title: "SuperCollider y TidalCycles: gramáticas sonoras del presente",
        art5_desc:  "Comparativa entre dos lenguajes de live coding y sus comunidades de práctica a nivel global.",
        art6_title: "Écranoscapes: paisajes sonoros y visuales en la era digital",
        art6_desc:  "La convergencia entre imagen, código y sonido en las nuevas formas de performance audiovisual.",
        art7_title: "Pedagogías sonoras en contextos interculturales",
        art7_desc:  "Cómo el trabajo con músicas del mundo puede transformar el aula en un espacio de encuentro.",
        art8_title: "Música migrante en el aula: voz, emoción y aprendizaje",
        art8_desc:  "Experiencias docentes que incorporan las músicas familiares de los estudiantes migrantes como recurso pedagógico.",
        art9_title: "Código como lenguaje creativo: introducción al live coding en educación secundaria",
        art9_desc:  "Una propuesta didáctica para integrar el live coding como herramienta de expresión artística en el aula.",
        art10_title:"Plataformas digitales y nuevas formas de aprender música",
        art10_desc: "YouTube, SoundCloud, Twitch: cómo las plataformas están redefiniendo la educación musical informal.",
        art11_title:"Notas de campo: Barcelona como laboratorio sonoro",
        art11_desc: "Reflexiones personales sobre los paisajes sonoros de Barcelona como espacio de investigación y vida.",
        art12_title:"Reseña: «Música e inmigración» — Coord. Silvia Martínez",
        art12_desc: "Lectura crítica de uno de los libros de referencia sobre música y migración en el contexto español.",
        art13_title:"El Estado del Arte Digital: historia, escenas, pedagogía y futuros de la inteligencia artificial",
        art13_desc: "Un recorrido por los pioneros del arte computacional, la demoscene, el net.art y la IA generativa, con foco en sus escenas, artistas y modelos pedagógicos.",
        art14_title:"Clasismo y machismo en la recepción del trap y el reguetón: revisión crítica de la legitimidad cultural, la identidad y el sexismo",
        art14_desc: "Una revisión crítica sobre cómo la condena del sexismo en estos géneros se entrelaza con la distinción social, la identidad y la deslegitimación cultural.",
        events_intro:    "Sets realizados con <strong>SuperCollider</strong> y <strong>TidalCycles</strong>. La música emerge del código en tiempo real: cada actuación es irrepetible. El programa y el músico improvisan juntos, el error es parte de la obra.",
        events_status_label: "Agenda",
        events_status_current: "Ahora",
        events_status_title: "Sin fechas públicas en este momento",
        events_status_desc: "La agenda de directos se actualizará aquí cuando haya una actuación confirmada y publicada.",
        events_status_badge: "En actualización",
        events_contact_cta: "Escribir por correo →",
        events_archive_note: "El archivo de actuaciones volverá cuando esté revisado con fechas y documentación verificadas.",
        event_upcoming:  "Próximo",
        event_past:      "Pasado",
        events_upcoming: "Próximos",
        see_all_events:  "Ver todos los eventos →",
        ev1_name:  "TWISTORES Live — Algorave Barcelona",
        ev1_venue: "Sala Apolo · Barcelona",
        ev2_name:  "Resonancias Migrantes — CCCB",
        ev2_venue: "CCCB · Barcelona",
        ev3_name:  "Código Abierto — Festival SuperCollider",
        ev3_venue: "Espai Erre · Girona",
        ev4_name:  "Noches Electrónicas — set improvisado",
        ev4_venue: "Hangar · Barcelona",
        ev5_name:  "Tierra Sonora — Jornadas de Etnomusicología",
        ev5_venue: "UAB · Bellaterra",
        ev6_name:  "Algorave — Sónar+D Late Night",
        ev6_venue: "Sónar · Barcelona",
        ev7_name:  "Música Viva — 1er aniversario de TWISTORES",
        ev7_venue: "Sala Beckett · Barcelona",
        ss1_title: "Lluvia sobre piedra",
        ss1_desc:  "Tarde de invierno en las ruinas de Can Masdeu. Agua, viento y silencio urbano.",
        ss2_title: "Amanecer en el bosque",
        ss2_desc:  "Pájaros, brisa y el zumbido lejano de la ciudad despertando al amanecer.",
        ss3_title: "Mercado y voces",
        ss3_desc:  "El caos organizado del mercado: idiomas, metales y el ritmo de la venta.",
        ss_page_desc:    "Salidas de campo para escuchar, registrar y explorar los paisajes sonoros de la ciudad y del campo.\nCada sesión incluye fotografías del entorno y grabaciones de audio.",
        ss1_loc:   "Can Masdeu, BCN",
        ss1_date:  "Feb 14, 2025",
        ss1_cond:  "Lluvia, 8°C",
        ss2_loc:   "Collserola, BCN",
        ss2_date:  "Ene 8, 2025",
        ss2_cond:  "Despejado, 5°C",
        ss3_loc:   "La Boqueria, BCN",
        ss3_date:  "Nov 20, 2024",
        ss3_cond:  "Interior, bullicioso",
        ss_see_all:"Ver todas las sesiones →",
        see_recent_soundscapes: "Ver sesión completa →",
        field_place:    "Lugar",
        field_date:     "Fecha",
        field_cond:     "Condiciones",
        field_duration: "Duración",
        about_thesis_tag:   "Tesis Doctoral — Sociología",
        about_thesis_title: "«Cantando en Tierra Ajena»\nMúsica, Migración e Identidad",
        about_thesis_desc:  "Investigación doctoral sobre la música como espacio de identidad, memoria y pertenencia en comunidades migrantes, con una aproximación sociológica atenta a las prácticas musicales, los procesos educativos y las mediaciones tecnológicas.",
        about_bio1:  "Soy doctorando en la Facultad de Sociología, con formación superior en guitarra clásica e Historia y Ciencias de la Música, e investigador centrado en la relación entre música e identidad en comunidades migrantes. Además, soy profesor en el CMUS Profesional de Música Reveriano Soutullo, donde imparto guitarra clásica, Historia de la Música y Novas Tecnoloxías Aplicadas á Música.",
        about_bio2:  "En paralelo, desarrollo una práctica artística con ordenador centrada en SuperCollider, el live coding y la grabación de paisajes sonoros. Me interesa la confluencia entre música, tecnología y ciencia, así como sus aplicaciones en la educación musical.",
        about_bio3:  "Vivo en Vigo, ciudad de la que soy natural. TWISTORES es el espacio en el que confluyen esa labor investigadora, la docencia y la creación sonora.",
        // RESEARCH AREAS (HOME)
        ra1_title: "Música & Migración",
        ra1_desc:  "El papel de la música en la construcción de identidades diaspóricas.",
        ra2_title: "Escenas Locales",
        ra2_desc:  "Estudios etnográficos de comunidades musicales underground.",
        ra3_title: "Sonido & Interculturalidad",
        ra3_desc:  "Pedagogías interculturales del sonido y uso de músicas del mundo.",
        ra4_title: "Tecnología & Educación",
        ra4_desc:  "Integración del código creativo y el live coding como herramientas.",

        // SOUNDSCAPES PAGE
        ss_page_desc: "Salidas de campo para escuchar, registrar y explorar los paisajes sonoros de la ciudad y del campo.\nCada sesión incluye fotografías del entorno y grabaciones de audio.",
        ss_castro_title: "Sesión: El Castro de Vigo",
        ss_castro_loc: "Castro de Vigo",
        ss_masdeu_title: "Sesión: Can Masdeu, BCN",
        ss_masdeu_loc: "Can Masdeu, BCN",
        ss_home_castro_title: "O Castro de Vigo",
        ss_home_castro_desc: "Nueve puntos de escucha, fotografías y grabaciones de campo registradas en noviembre de 2024.",
        ss_archive_note: "Archivo en crecimiento · Sesiones publicadas: O Castro de Vigo (nov. 2024) · Chan de Brito (mar. 2026).",
        ss_castro_helper: "Selecciona uno de los nueve puntos para actualizar la fotografía, la nota de campo y el audio.",
        ss_meta_loc: "Lugar / Hora",

        ss_meta_date: "Fecha",
        ss_meta_coords: "Coordenadas",
        ss_meta_gear: "Grabación",
        sidebar_tools:   "Herramientas creativas",
        sidebar_research:"Investigación",
        sidebar_contact: "Contacto",
        res1: "Sociología de la música",
        res2: "Estudios migratorios",
        res3: "Identidad cultural",
        res4: "Etnomusicología",
        res5: "Sociología digital",
        footer_desc:    "Investigación doctoral en sociología de la música, migraciones e identidad.",
        footer_sections:"Secciones",
        footer_project: "Proyecto",
        footer_tools:   "Herramientas",
        footer_copy:    "// hecho con código y café ☕",
        read_more:  "Leer más →",
        reading_min:"Lectura",

        share_article_prompt: "¿Te pareció interesante?",
        share_article_btn: "⇡ compartir artículo",
        share_copy_link: "Copiar enlace",
        share_copied: "✓ Copiado",
        meta_author: "Autor",
        meta_original_lang: "Idioma original",
        meta_published: "Publicado",
        meta_category: "Área",
        meta_topics: "Temas",
        related_articles_heading: "Lecturas relacionadas",
        lang_original_version: "Versión original del artículo",
        lang_translation_soon: "Traducción todavía no disponible",
        lang_gl_name: "Gallego",
        lang_es_name: "Español",
        lang_en_name: "Inglés",

        all_events_btn: "Ver estado de directos →",
        all_ss_btn:     "Ver todas las sesiones →",
        all_art_btn:    "Ver todos los artículos →",

        // SCHMIDT EVENT
        ev_schmidt_month:   "ABR · 2025",
        ev_schmidt_desc:    "Ambient · House · Código en tiempo real.\nEl kairós y el I Ching como guías de la improvisación algorítmica.",
        ev_schmidt_venue:   "Sala Supersonic · Vigo",
        ev_schmidt_tickets: "Entradas disponibles",
        ev_schmidt_cta:     "Comprar entradas →",
    },

    en: {
        nav_home:        "Home",
        nav_articles:    "Articles",
        nav_livecoding:  "Live Coding",
        nav_soundscapes: "Soundscapes",
        nav_about:       "About",
        hero_eyebrow:    "// Music · Migration · Technology",
        hero_title:      "Doctoral research, live coding and soundscapes from Vigo",
        hero_sub:        "Silvino Díaz Carreras. Researcher, teacher and performer working across music, migration, technology and field listening.",
        hero_support:    "Long-form writing, documented live sets and published soundscapes live together here with context, image and audio.",
        hero_cta1:       "Explore articles",
        hero_cta2:       "Browse live archive",
        hero_route_articles_label: "// research",
        hero_route_articles_title: "Read articles and essays",
        hero_route_articles_desc: "Published writing on the sociology of music, migration and technology.",
        hero_route_live_label: "// live archive",
        hero_route_live_title: "Browse documented sessions",
        hero_route_live_desc: "Live sets with video, photography, context and performed pieces.",
        hero_route_sound_label: "// field listening",
        hero_route_sound_title: "Listen to soundscapes",
        hero_route_sound_desc: "Field recordings with listening notes, coordinates and images.",
        label_articles:     "// academic writing & reflection",
        label_events:       "// live coding sets",
        label_soundscapes:  "// field recordings",
        label_field:        "// field recordings · photography · audio",
        label_researcher:   "// researcher · performer · listener",
        label_research:     "// research lines",
        label_who:          "// who I am",
        label_tools:        "// creative tools",
        title_recent_articles: "Recent articles",
        title_events:          "Events",
        title_soundscapes:     "Recent soundscapes",
        title_articles_page:   "Articles",
        title_events_page:     "Live Coding Sets",
        title_soundscapes_page:"Soundscapes",
        title_about_page:      "About",
        title_research_areas:  "Research areas",
        home_articles_intro:   "A concise selection of published research and writing on music technology, without drafts or placeholder pieces mixed in.",
        home_events_intro:     "The public schedule shows only confirmed performances. If there are no fixed dates, this section says so plainly.",
        home_soundscapes_intro:"Listening work in urban space, published with real field photography and audio.",
        home_live_intro:       "Archive of documented live sets with context, materials and performed pieces. The homepage highlights only the most recent session.",
        home_live_feature_text:"Most recent documented session with video, photographs and a breakdown of the performed pieces.",
        home_live_feature_piece1:"<strong>I — Twistores.</strong> Rotation, torsion and folds developed through improvisation.",
        home_live_feature_piece2:"<strong>II — Tribar.</strong> Impossible geometry, repetition and instability.",
        articles_page_intro:   "Archive of published texts on the sociology of music, local scenes and sonic technology.",
        filter_all:       "All",
        filter_research:  "Research",
        filter_thesis:    "Doctoral thesis",
        filter_music_tech:"Music & Tech",
        filter_music_edu: "Music & Education",
        filter_tech_edu:  "Technology & Education",
        filter_others:    "Others",
        cat_research:   "Research",
        cat_thesis:     "Doctoral thesis",
        cat_music_tech: "Music & Technology",
        cat_music_edu:  "Music & Education",
        cat_tech_edu:   "Technology & Education",
        cat_others:     "Others",
        badge_featured: "★ Featured",
        art_locales_title: "Local music scenes today: are they still a valid tool?",
        art_locales_desc:  "A critical review of the usefulness of the \"local music scene\" concept, from its emergence with punk to its expansion in the platform era, with Vigo as a case study.",
        art1_title: "Singing in a Foreign Land: identity and belonging in the Latin American diaspora",
        art1_desc:  "A sociological analysis of how music acts as an identity anchor in migratory contexts.",
        art2_title: "Roots music and identity negotiation: the case of Latin musicians in Barcelona",
        art2_desc:  "In-depth interviews with migrant musicians on the role of music in their adaptation processes.",
        art3_title: "The sound of us: transnational sonic communities",
        art3_desc:  "How digital platforms enable the maintenance of cultural ties through music across distance.",
        art4_title: "Live coding as performative practice: from error to sonic gesture",
        art4_desc:  "Reflections on algorithmic improvisation and the aesthetics of code in real time.",
        art5_title: "SuperCollider and TidalCycles: sonic grammars of the present",
        art5_desc:  "A comparison of two live coding languages and their global communities of practice.",
        art6_title: "Écranoscapes: sonic and visual landscapes in the digital age",
        art6_desc:  "The convergence of image, code and sound in new forms of audiovisual performance.",
        art7_title: "Sonic pedagogies in intercultural contexts",
        art7_desc:  "How working with world music can transform the classroom into a space of encounter.",
        art8_title: "Migrant music in the classroom: voice, emotion and learning",
        art8_desc:  "Teaching experiences that incorporate students' home music as a pedagogical resource.",
        art9_title: "Code as creative language: introducing live coding in secondary education",
        art9_desc:  "A didactic proposal to integrate live coding as an artistic expression tool in the classroom.",
        art10_title:"Digital platforms and new ways of learning music",
        art10_desc: "YouTube, SoundCloud, Twitch: how platforms are redefining informal music education.",
        art11_title:"Field notes: Barcelona as a sonic laboratory",
        art11_desc: "Personal reflections on Barcelona's soundscapes as a research and living space.",
        art12_title:"Review: «Music and Immigration» — Ed. Silvia Martínez",
        art12_desc: "A critical reading of one of the key references on music and migration in the Spanish context.",
        art13_title:"The State of Digital Art: history, scenes, pedagogy and futures of artificial intelligence",
        art13_desc: "A journey through computer art pioneers, the demoscene, net.art and generative AI, focusing on scenes, artists and pedagogical models.",
        art14_title:"Classism and sexism in the reception of trap and reggaeton: a critical review of cultural legitimacy, identity and sexism",
        art14_desc: "A critical review of how the condemnation of sexism in these genres intersects with social distinction, identity and cultural delegitimation.",
        events_intro:    "Sets performed with <strong>SuperCollider</strong> and <strong>TidalCycles</strong>. Music emerges from code in real time: every performance is unique. The program and the musician improvise together; the error is part of the work.",
        events_status_label: "Schedule",
        events_status_current: "Now",
        events_status_title: "No public dates right now",
        events_status_desc: "The live schedule will be updated here once a performance is confirmed and publicly announced.",
        events_status_badge: "Updating",
        events_contact_cta: "Write by email →",
        events_archive_note: "The performance archive will return once dates and supporting documentation have been reviewed.",
        event_upcoming:  "Upcoming",
        event_past:      "Past",
        events_upcoming: "Upcoming",
        see_all_events:  "See all events →",
        ev1_name:  "TWISTORES Live — Algorave Barcelona",
        ev1_venue: "Sala Apolo · Barcelona",
        ev2_name:  "Resonancias Migrantes — CCCB",
        ev2_venue: "CCCB · Barcelona",
        ev3_name:  "Open Code — SuperCollider Festival",
        ev3_venue: "Espai Erre · Girona",
        ev4_name:  "Electronic Nights — improvised set",
        ev4_venue: "Hangar · Barcelona",
        ev5_name:  "Sonic Land — Ethnomusicology Conference",
        ev5_venue: "UAB · Bellaterra",
        ev6_name:  "Algorave — Sónar+D Late Night",
        ev6_venue: "Sónar · Barcelona",
        ev7_name:  "Living Music — TWISTORES 1st anniversary",
        ev7_venue: "Sala Beckett · Barcelona",
        ss1_title: "Rain on stone",
        ss1_desc:  "A winter afternoon in the ruins of Can Masdeu. Water, wind and urban silence.",
        ss2_title: "Dawn in the forest",
        ss2_desc:  "Birds, breeze and the distant hum of the city waking at dawn.",
        ss3_title: "Market and voices",
        ss3_desc:  "The organised chaos of the market: languages, metals and the rhythm of selling.",
        ss_page_desc:    "Field trips to listen, record, and explore the soundscapes of the city and the countryside.\nEach session includes environmental photographs and audio recordings.",
        ss_castro_title: "Session: El Castro de Vigo",
        ss_castro_loc: "Castro de Vigo",
        ss_masdeu_title: "Session: Can Masdeu, BCN",
        ss_masdeu_loc: "Can Masdeu, BCN",
        ss_home_castro_title: "O Castro de Vigo",
        ss_home_castro_desc: "Nine listening points, photographs and field recordings documented in November 2024.",
        ss_archive_note: "Growing archive · Published sessions: O Castro de Vigo (Nov 2024) · Chan de Brito (Mar 2026).",
        ss_castro_helper: "Select one of the nine points to update the photograph, field note and audio.",
        ss_meta_loc: "Location / Time",

        ss_meta_date: "Date",
        ss_meta_coords: "Coordinates",
        ss_meta_gear: "Gear",
        ss1_loc:   "Can Masdeu, BCN",
        ss1_date:  "Feb 14, 2025",
        ss1_cond:  "Rain, 8°C",

        ss2_loc:   "Collserola, BCN",
        ss2_date:  "Jan 8, 2025",
        ss2_cond:  "Clear, 5°C",
        ss3_loc:   "La Boqueria, BCN",
        ss3_date:  "Nov 20, 2024",
        ss3_cond:  "Indoor, busy",
        ss_see_all:"See all sessions →",
        see_recent_soundscapes: "View full session →",
        field_place:    "Location",
        field_date:     "Date",
        field_cond:     "Conditions",
        field_duration: "Duration",
        about_thesis_tag:   "Doctoral Thesis — Sociology",
        about_thesis_title: "«Singing in a Foreign Land»\nMusic, Migration and Identity",
        about_thesis_desc:  "Doctoral research on music as a space of identity, memory and belonging in migrant communities, approached from sociology with attention to musical practices, educational processes and technological mediation.",
        about_bio1:  "I am a doctoral researcher in Sociology, with advanced training in classical guitar and in Music History and Musicology, focused on the relationship between music and identity in migrant communities. I also teach at the CMUS Profesional de Música Reveriano Soutullo, where I give classes in classical guitar, Music History and music technology.",
        about_bio2:  "Alongside that, I develop a computer-based artistic practice centred on SuperCollider, the live coding and soundscape recording. I am interested in the convergence of music, technology and science, as well as their applications in music education.",
        about_bio3:  "I live in Vigo, my hometown. TWISTORES is the space where that research, teaching and sonic practice come together.",
        // RESEARCH AREAS (HOME)
        ra1_title: "Music & Migration",
        ra3_desc:  "Intercultural sonic pedagogies and the use of world music in diverse classrooms.",
        ra4_title: "Technology & Education",
        ra4_desc:  "Integration of creative code and live coding as pedagogical tools.",
        sidebar_tools:   "Creative tools",
        sidebar_research:"Research",
        sidebar_contact: "Contact",
        res1: "Sociology of music",
        res2: "Migration studies",
        res3: "Cultural identity",
        res4: "Ethnomusicology",
        res5: "Digital sociology",
        footer_desc:    "Doctoral research on the sociology of music, migrations and identity.",
        footer_sections:"Sections",
        footer_project: "Project",
        footer_tools:   "Tools",
        footer_copy:    "// made with code and coffee ☕",
        read_more:  "Read more →",
        reading_min:"Read",

        share_article_prompt: "Did you find it interesting?",
        share_article_btn: "⇡ share article",
        share_copy_link: "Copy link",
        share_copied: "✓ Copied",
        meta_author: "Author",
        meta_original_lang: "Original language",
        meta_published: "Published",
        meta_category: "Area",
        meta_topics: "Topics",
        related_articles_heading: "Related reading",
        lang_original_version: "Original article version",
        lang_translation_soon: "Translation not available yet",
        lang_gl_name: "Galician",
        lang_es_name: "Spanish",
        lang_en_name: "English",

        all_events_btn: "See live status →",
        all_ss_btn:     "See all sessions →",
        all_art_btn:    "See all articles →",

        // SCHMIDT EVENT
        ev_schmidt_month:   "APR · 2025",
        ev_schmidt_desc:    "Ambient · House · Code in real time.\nKairós and the I Ching as guides for algorithmic improvisation.",
        ev_schmidt_venue:   "Sala Supersonic · Vigo",
        ev_schmidt_tickets: "Tickets available",
        ev_schmidt_cta:     "Get tickets →",
    }
};

window.T = T;

const SITE_CONFIG = {
    origin: 'https://twistin.github.io/twistores',
    name: 'TWISTORES',
    author: 'Silvino Díaz Carreras',
    email: 'sarerac@gmail.com',
    description: 'Investigación doctoral, live coding y soundscapes desde Vigo.',
    defaultImage: '/assets/img/sc-banner.png',
    profileImage: '/assets/img/schmidt/s1.jpeg',
    sameAs: [
        'https://github.com/twistin',
        'https://www.researchgate.net/profile/Silvino-Diaz-Carreras?ev=hdr_xprf',
        'https://uab.academia.edu/SilvinoD%C3%ADazCarreras',
        'https://soundcloud.com/twistin_25/qian',
        'https://www.youtube.com/@twistin-p9'
    ]
};

const PAGE_META = {
    'index.html': {
        kind: 'website',
        sourceLang: 'es',
        title: 'TWISTORES | Investigación doctoral, live coding y soundscapes desde Vigo',
        description: 'Investigación doctoral, live coding y soundscapes desde Vigo. TWISTORES reúne artículos sobre música, migración y tecnología, sesiones documentadas y grabaciones de campo publicadas.',
        image: '/assets/img/sc-banner.png'
    },
    'pages/articulos.html': {
        kind: 'collection',
        sourceLang: 'es',
        title: 'Artículos sobre sociología de la música y tecnología | TWISTORES',
        description: 'Archivo de artículos sobre sociología de la música, migraciones, escenas locales y tecnología sonora.',
        image: '/assets/img/escenas-locales-banner.png'
    },
    'pages/about.html': {
        kind: 'profile',
        sourceLang: 'es',
        title: 'Silvino Díaz Carreras | Investigación, docencia y práctica sonora',
        description: 'Perfil de Silvino Díaz Carreras: investigación doctoral, docencia musical, live coding y grabación de paisajes sonoros desde Vigo.',
        image: '/assets/img/schmidt/s1.jpeg'
    },
    'pages/eventos.html': {
        kind: 'collection',
        sourceLang: 'es',
        title: 'Archivo de live coding con SuperCollider | TWISTORES',
        description: 'Archivo de sesiones de live coding de TWISTORES con vídeo, contexto y piezas interpretadas con SuperCollider y TidalCycles.',
        image: '/assets/img/schmidt/s1.jpeg'
    },
    'pages/soundscapes.html': {
        kind: 'collection',
        sourceLang: 'es',
        title: 'Soundscapes y grabaciones de campo | TWISTORES',
        description: 'Archivo publicado de soundscapes y grabaciones de campo de TWISTORES, con fotografías, audio y notas de escucha desde Vigo y su entorno.',
        image: '/assets/img/castro/1.jpg'
    }
};

const ARTICLE_META = {
    'pages/escenas-locales.html': {
        kind: 'article',
        sourceLang: 'es',
        title: 'Escenas musicales locales hoy en día: ¿una herramienta válida?',
        description: 'Una revisión crítica sobre el concepto de escena musical local, su productividad histórica y su reformulación necesaria en la era de las plataformas digitales.',
        image: '/assets/img/escenas-locales-banner.png',
        section: 'Investigación',
        publishedLabel: 'Marzo 2026',
        readTime: '10 min',
        topics: ['escena musical', 'música popular', 'plataformas digitales', 'Vigo'],
        related: [
            'pages/estado-del-arte-digital.html',
            'pages/clasismo-y-machismo.html',
            'pages/music21-musicoloxia-computacional.html'
        ]
    },
    'pages/estado-del-arte-digital.html': {
        kind: 'article',
        sourceLang: 'es',
        title: 'El Estado del Arte Digital',
        description: 'Historia, escenas, pedagogía y futuros de la inteligencia artificial en el arte digital.',
        image: '/assets/img/eniac-computer.jpg',
        section: 'Música & Tecnología',
        publishedLabel: 'Marzo 2026',
        readTime: '24 min',
        topics: ['arte digital', 'inteligencia artificial', 'pedagogía', 'creative coding'],
        related: [
            'pages/musica-son-intelixencia-artificial.html',
            'pages/musicbert-musica-simbolica.html',
            'pages/music21-musicoloxia-computacional.html'
        ]
    },
    'pages/clasismo-y-machismo.html': {
        kind: 'article',
        sourceLang: 'es',
        title: 'Clasismo y machismo en la recepción del trap y el reguetón',
        description: 'Una revisión crítica de la legitimidad cultural, la identidad y el sexismo en la recepción social del trap y el reguetón.',
        image: '/assets/img/sc-banner.png',
        section: 'Otros',
        publishedLabel: 'Texto revisado',
        readTime: '12 min',
        topics: ['trap', 'reguetón', 'clasismo', 'sexismo', 'legitimidad cultural'],
        related: [
            'pages/escenas-locales.html',
            'pages/estado-del-arte-digital.html',
            'pages/son-do-sars-cov-2.html'
        ]
    },
    'pages/music21-musicoloxia-computacional.html': {
        kind: 'article',
        sourceLang: 'gl',
        title: 'Music21: método computacional aplicado á musicoloxía',
        description: 'Music21 é un conxunto de ferramentas de Python para a musicoloxía computacional, desenvolvido no MIT. Permite analizar, xerar e editar música de xeito programático.',
        image: '/assets/img/music21-banner.png',
        section: 'Investigación',
        publishedLabel: '17 febreiro 2022',
        publishedISO: '2022-02-17',
        readTime: '8 min',
        topics: ['musicoloxía computacional', 'Python', 'Music21', 'análise musical'],
        related: [
            'pages/musicbert-musica-simbolica.html',
            'pages/musica-son-intelixencia-artificial.html',
            'pages/estado-del-arte-digital.html'
        ]
    },
    'pages/musica-son-intelixencia-artificial.html': {
        kind: 'article',
        sourceLang: 'gl',
        title: 'A música, o son e a Intelixencia Artificial',
        description: 'Da música algorítmica de Mozart ás redes neuronais de hoxe: un percorrido polo estado da Intelixencia Artificial no campo da música, desde a composición até a industria e a educación.',
        image: '/assets/img/dice-mozart.png',
        section: 'Música & Tecnoloxía',
        publishedLabel: '14 marzo 2022',
        publishedISO: '2022-03-14',
        readTime: '18 min',
        topics: ['intelixencia artificial', 'música', 'educación musical', 'tecnoloxía sonora'],
        related: [
            'pages/musicbert-musica-simbolica.html',
            'pages/son-do-sars-cov-2.html',
            'pages/cacofonia-buraco-negro.html'
        ]
    },
    'pages/musicbert-musica-simbolica.html': {
        kind: 'article',
        sourceLang: 'gl',
        title: 'MusicBERT: PLN e comprensión da música simbólica',
        description: 'MusicBERT é un modelo preentrenado a gran escala para a comprensión da música simbólica, desenvolvido por Microsoft Asia. Inspirado nos avances do procesamento da linguaxe natural, alcanza resultados de vangarda en catro tarefas musicais fundamentais.',
        image: '/assets/img/musicbert-bert-diagram.png',
        section: 'Música & Tecnoloxía',
        publishedLabel: '6 abril 2022',
        publishedISO: '2022-04-06',
        readTime: '8 min',
        topics: ['MusicBERT', 'PLN', 'música simbólica', 'IA musical'],
        related: [
            'pages/music21-musicoloxia-computacional.html',
            'pages/musica-son-intelixencia-artificial.html',
            'pages/estado-del-arte-digital.html'
        ]
    },
    'pages/cacofonia-buraco-negro.html': {
        kind: 'article',
        sourceLang: 'gl',
        title: 'Cacofonía dun buraco negro supermasivo',
        description: 'Un xigantesco estampido sónico e unha profunda cacofonía periódica emanaron do buraco negro supermasivo Powehi, no centro da galaxia M87. Que é o son máis grave da natureza?',
        image: '/assets/img/m87-black-hole.jpeg',
        section: 'Música & Tecnoloxía',
        publishedLabel: '4 marzo 2022',
        publishedISO: '2022-03-04',
        readTime: '10 min',
        topics: ['NASA', 'M87', 'astroacústica', 'sonificación'],
        related: [
            'pages/son-do-sars-cov-2.html',
            'pages/musica-son-intelixencia-artificial.html',
            'pages/estado-del-arte-digital.html'
        ]
    },
    'pages/son-do-sars-cov-2.html': {
        kind: 'article',
        sourceLang: 'gl',
        title: 'O son do SARS-CoV-2',
        description: 'O rumor da pandemia: a sonificación das proteínas do coronavirus polo MIT e a relación entre ciencia, tecnoloxía e creación artística.',
        image: '/assets/img/sons/sons.jpg',
        section: 'Música & Tecnoloxía',
        publishedLabel: '2022',
        readTime: '8 min',
        topics: ['SARS-CoV-2', 'sonificación', 'MIT', 'arte sonoro'],
        related: [
            'pages/cacofonia-buraco-negro.html',
            'pages/musica-son-intelixencia-artificial.html',
            'pages/musicbert-musica-simbolica.html'
        ]
    }
};

const WEBSITE_ID = `${SITE_CONFIG.origin}/#website`;
const PERSON_ID = `${SITE_CONFIG.origin}/pages/about.html#person`;

function normalizeSitePath(pathname) {
    const cleanPath = pathname.split('?')[0].split('#')[0];
    const localMarker = '/html5/';

    if (cleanPath.includes(localMarker)) {
        const localPath = cleanPath.split(localMarker)[1];
        return localPath || 'index.html';
    }

    const trimmed = cleanPath.replace(/^\/+/, '');
    if (!trimmed || trimmed === 'twistores' || trimmed === 'twistores/') return 'index.html';
    if (trimmed === 'index.html') return 'index.html';
    if (trimmed.startsWith('pages/')) return trimmed;
    if (trimmed.startsWith('twistores/')) return trimmed.replace(/^twistores\//, '') || 'index.html';
    return trimmed;
}

function buildAbsoluteUrl(path) {
    if (!path) return SITE_CONFIG.origin;
    if (/^https?:\/\//.test(path)) return path;
    return `${SITE_CONFIG.origin}/${path.replace(/^\/+/, '')}`;
}

function getCurrentPageKey() {
    const normalized = normalizeSitePath(window.location.pathname);
    if (normalized.endsWith('/')) return `${normalized}index.html`;
    return normalized || 'index.html';
}

function getCurrentPageMeta() {
    const pageKey = getCurrentPageKey();
    return ARTICLE_META[pageKey] || PAGE_META[pageKey] || null;
}

function t(key, lang = currentLang) {
    return T[lang]?.[key] || T.es?.[key] || key;
}

function getLanguageLabel(lang) {
    return t(`lang_${lang}_name`);
}

function getCanonicalUrl() {
    return document.querySelector('link[rel="canonical"]')?.href || window.location.href;
}

function getBaseTitle(rawTitle = document.title) {
    return rawTitle.split(/\s+[|—]\s+/)[0].trim();
}

function toAbsolutePageUrl(href) {
    try {
        return new URL(href, getCanonicalUrl()).href;
    } catch {
        return href;
    }
}

function getPersonSchema() {
    return {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: SITE_CONFIG.author,
        url: buildAbsoluteUrl('/pages/about.html'),
        image: buildAbsoluteUrl(SITE_CONFIG.profileImage),
        email: `mailto:${SITE_CONFIG.email}`,
        sameAs: SITE_CONFIG.sameAs,
        knowsAbout: [
            'Sociología de la música',
            'Migration studies',
            'Live coding',
            'Soundscape recording',
            'Creative coding'
        ]
    };
}

function buildStructuredData(pageMeta) {
    if (!pageMeta) return null;

    const pageUrl = getCanonicalUrl();
    const imageUrl = buildAbsoluteUrl(pageMeta.image || SITE_CONFIG.defaultImage);
    const graph = [
        getPersonSchema(),
        {
            '@type': 'WebSite',
            '@id': WEBSITE_ID,
            url: `${SITE_CONFIG.origin}/`,
            name: SITE_CONFIG.name,
            description: SITE_CONFIG.description,
            inLanguage: 'es',
            publisher: { '@id': PERSON_ID }
        }
    ];

    if (pageMeta.kind === 'website') {
        graph[1].description = pageMeta.description;
    } else if (pageMeta.kind === 'profile') {
        graph.push({
            '@type': 'ProfilePage',
            '@id': `${pageUrl}#webpage`,
            url: pageUrl,
            name: pageMeta.title,
            description: pageMeta.description,
            inLanguage: pageMeta.sourceLang,
            mainEntity: { '@id': PERSON_ID },
            isPartOf: { '@id': WEBSITE_ID }
        });
    } else if (pageMeta.kind === 'collection') {
        graph.push({
            '@type': 'CollectionPage',
            '@id': `${pageUrl}#webpage`,
            url: pageUrl,
            name: pageMeta.title,
            description: pageMeta.description,
            inLanguage: pageMeta.sourceLang,
            image: imageUrl,
            isPartOf: { '@id': WEBSITE_ID },
            author: { '@id': PERSON_ID }
        });
    } else if (pageMeta.kind === 'article') {
        const articleSchema = {
            '@type': 'Article',
            '@id': `${pageUrl}#article`,
            headline: pageMeta.title,
            description: pageMeta.description,
            image: imageUrl,
            inLanguage: pageMeta.sourceLang,
            author: { '@id': PERSON_ID },
            publisher: { '@id': PERSON_ID },
            mainEntityOfPage: pageUrl,
            isPartOf: { '@id': WEBSITE_ID }
        };

        if (pageMeta.section) {
            articleSchema.articleSection = pageMeta.section;
        }

        if (pageMeta.topics?.length) {
            articleSchema.keywords = pageMeta.topics.join(', ');
        }

        if (pageMeta.publishedISO) {
            articleSchema.datePublished = pageMeta.publishedISO;
        }

        graph.push(articleSchema);
    }

    return {
        '@context': 'https://schema.org',
        '@graph': graph
    };
}

function injectStructuredData(pageMeta) {
    const schema = buildStructuredData(pageMeta);
    if (!schema) return;

    let script = document.getElementById('twistores-structured-data');
    if (!script) {
        script = document.createElement('script');
        script.id = 'twistores-structured-data';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(schema);
}

function configureLanguageSwitcher(pageMeta) {
    const isArticle = pageMeta?.kind === 'article';

    document.querySelectorAll('.lang-btn').forEach(btn => {
        const lang = btn.dataset.lang;
        const isSourceLang = pageMeta?.sourceLang === lang;

        if (isArticle) {
            btn.disabled = !isSourceLang;
            btn.setAttribute('aria-disabled', String(!isSourceLang));
            btn.title = isSourceLang ? t('lang_original_version') : t('lang_translation_soon');
            btn.setAttribute(
                'aria-label',
                isSourceLang
                    ? `${getLanguageLabel(lang)} · ${t('lang_original_version')}`
                    : `${getLanguageLabel(lang)} · ${t('lang_translation_soon')}`
            );
        } else {
            btn.disabled = false;
            btn.removeAttribute('aria-disabled');
            btn.removeAttribute('title');
            btn.setAttribute('aria-label', getLanguageLabel(lang));
        }
    });
}

function injectArticleEditorialMeta(pageMeta) {
    if (pageMeta?.kind !== 'article') return;

    const article = document.querySelector('.article-content');
    const anchor = article?.querySelector('.article-jumpnav');
    if (!article || !anchor || article.querySelector('.article-editorial-meta[data-generated="1"]')) return;

    const topicsText = pageMeta.topics?.join(' · ');
    const pieces = [
        `<p><strong>${t('meta_author')}:</strong> ${SITE_CONFIG.author}</p>`,
        `<p><strong>${t('meta_original_lang')}:</strong> ${getLanguageLabel(pageMeta.sourceLang)}</p>`
    ];

    if (pageMeta.publishedLabel) {
        pieces.push(`<p><strong>${t('meta_published')}:</strong> ${pageMeta.publishedLabel}</p>`);
    }

    if (pageMeta.section) {
        pieces.push(`<p><strong>${t('meta_category')}:</strong> ${pageMeta.section}</p>`);
    }

    if (topicsText) {
        pieces.push(`<p><strong>${t('meta_topics')}:</strong> ${topicsText}</p>`);
    }

    anchor.insertAdjacentHTML(
        'afterend',
        `<div class="article-editorial-meta fade-in" data-generated="1">${pieces.join('')}</div>`
    );
}

function injectRelatedArticles(pageMeta) {
    if (pageMeta?.kind !== 'article' || !pageMeta.related?.length) return;

    const article = document.querySelector('.article-content');
    if (!article || article.querySelector('.article-related[data-generated="1"]')) return;

    const items = pageMeta.related
        .map(path => {
            const meta = ARTICLE_META[path];
            if (!meta) return '';

            return `
                <a class="article-related-link" href="${path.replace(/^pages\//, '')}">
                    <span class="article-related-title">${meta.title}</span>
                    <span class="article-related-desc">${meta.description}</span>
                </a>
            `;
        })
        .filter(Boolean)
        .join('');

    if (!items) return;

    const shareFooter = article.querySelector('.article-share-footer');
    const section = document.createElement('section');
    section.className = 'article-related fade-in';
    section.dataset.generated = '1';
    section.innerHTML = `
        <h2 class="article-related-heading">${t('related_articles_heading')}</h2>
        <div class="article-related-list">${items}</div>
    `;

    if (shareFooter) {
        article.insertBefore(section, shareFooter);
    } else {
        article.appendChild(section);
    }
}

// ── i18n Engine ───────────────────────────────────────────────────────────────
let currentLang = localStorage.getItem('twistores-lang') || 'es';

function applyLang(lang, options = {}) {
    const { persist = true } = options;
    currentLang = lang;
    if (persist) {
        localStorage.setItem('twistores-lang', lang);
    }

    const dict = T[lang];
    if (!dict) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (!dict[key]) return;
        // Preserve newlines as <br>
        el.innerHTML = dict[key].replace(/\n/g, '<br>');
    });

    // Update lang button active state
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update html lang attribute
    document.documentElement.lang =
        lang === 'gl' ? 'gl' : lang === 'en' ? 'en' : 'es';

    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

// ── Theme Engine ──────────────────────────────────────────────────────────────
let currentTheme = localStorage.getItem('twistores-theme') || 'dark';

function applyTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('twistores-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀' : '🌑';
}

// ── Init & Wiring ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const pageMeta = getCurrentPageMeta();

    injectSocialLinks();

    // Apply saved preferences
    applyTheme(currentTheme);
    applyLang(pageMeta?.sourceLang || currentLang, { persist: pageMeta?.kind !== 'article' });
    configureLanguageSwitcher(pageMeta);
    injectStructuredData(pageMeta);
    injectArticleEditorialMeta(pageMeta);
    injectArticleShare();
    injectRelatedArticles(pageMeta);

    // Theme toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }

    // Lang buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => applyLang(btn.dataset.lang));
    });

    document.querySelectorAll('.lang-switcher').forEach(group => {
        if (!group.hasAttribute('role')) {
            group.setAttribute('role', 'group');
        }
    });

    // Mobile nav toggle
    const navToggleBtn = document.getElementById('nav-toggle');
    const navList = document.getElementById('nav-list');
    if (navToggleBtn && navList) {
        navToggleBtn.setAttribute('aria-controls', navList.id || 'nav-list');
        navToggleBtn.setAttribute('aria-expanded', 'false');

        const closeNav = () => {
            navList.classList.remove('open');
            navToggleBtn.setAttribute('aria-expanded', 'false');
        };

        const toggleNav = (forceOpen) => {
            const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : !navList.classList.contains('open');
            navList.classList.toggle('open', shouldOpen);
            navToggleBtn.setAttribute('aria-expanded', String(shouldOpen));
        };

        navToggleBtn.addEventListener('click', event => {
            event.stopPropagation();
            toggleNav();
        });

        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => closeNav());
        });

        document.addEventListener('click', event => {
            if (!navList.contains(event.target) && !navToggleBtn.contains(event.target)) {
                closeNav();
            }
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                closeNav();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeNav();
            }
        });
    }

    // Scroll fade-in
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Social icons + Share menus (links & article share already injected above)
    initShareButtons();
});

// ── Social Icons SVG ──────────────────────────────────────────────────────────
const SOCIAL_SVGS = {
    email:     `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm0 2v.511l9 6 9-6V7H3zm18 10V9.489l-8.445 5.63a1 1 0 0 1-1.11 0L3 9.489V17h18z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
    twitter:   `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    soundcloud:`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M1.175 12.225c-.056 0-.094.06-.101.133l-.233 2.154.233 2.105c.007.07.045.128.101.128.05 0 .09-.05.099-.12l.255-2.113-.27-2.154c-.009-.075-.05-.132-.1-.132zm.899-.218c-.069 0-.12.064-.128.145l-.207 2.372.208 2.278c.008.08.059.145.128.145.065 0 .117-.058.127-.138l.234-2.285-.234-2.372c-.01-.082-.062-.145-.128-.145zm.914-.045c-.082 0-.149.076-.157.17l-.184 2.417.185 2.32c.008.095.075.17.157.17.079 0 .147-.07.156-.164l.21-2.326-.21-2.417c-.01-.096-.077-.17-.157-.17zm.9-.167c-.096 0-.174.089-.18.197l-.161 2.584.162 2.456c.006.108.084.197.18.197.094 0 .172-.084.18-.193l.185-2.46-.185-2.584c-.008-.113-.086-.197-.18-.197zm.924-.123c-.108 0-.196.1-.202.218l-.139 2.707.14 2.556c.006.12.094.218.201.218.105 0 .194-.094.2-.212l.16-2.562-.16-2.707c-.006-.12-.095-.218-.2-.218zm.92-.14c-.12 0-.218.11-.222.24l-.117 2.847.117 2.614c.004.13.103.24.222.24.117 0 .215-.107.222-.237l.134-2.617-.134-2.847c-.007-.13-.105-.24-.222-.24zm.94-.062c-.13 0-.237.12-.24.261l-.094 2.91.094 2.667c.003.14.11.261.24.261.13 0 .237-.117.24-.258l.107-2.67-.107-2.91c-.003-.14-.11-.261-.24-.261zm.94-.087c-.144 0-.26.13-.262.28l-.073 2.997.073 2.697c.002.15.118.28.262.28.141 0 .258-.127.261-.276l.083-2.7-.083-2.997c-.003-.15-.12-.28-.262-.28zm.95-.077c-.156 0-.283.138-.284.3l-.05 3.074.05 2.742c.001.16.128.3.284.3.154 0 .28-.136.283-.293l.057-2.749-.057-3.074c-.003-.163-.129-.3-.283-.3zm.97-.1c-.17 0-.308.148-.308.322l-.024 3.174.024 2.757c0 .174.138.322.308.322.168 0 .307-.144.308-.317l.028-2.762-.028-3.174c-.001-.176-.14-.322-.308-.322zm.968-.113c-.18 0-.328.157-.328.343l-.003 3.287.003 2.777c0 .186.148.343.328.343.179 0 .327-.154.328-.338l.003-2.782-.003-3.287c-.001-.188-.149-.343-.328-.343zm5.48.452a4.07 4.07 0 00-1.584.32 5.888 5.888 0 00-5.824-5.124 5.913 5.913 0 00-2.228.433v11.4c0 .238.187.433.428.44h9.208c.24 0 .432-.193.432-.433V12.24a3.896 3.896 0 00-3.897-3.897 3.93 3.93 0 00-3.921 3.921v.003l-.003 5.61"/></svg>`,
    github:    `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
    youtube:   `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    vimeo:     `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.977 6.416c-.105 2.338-1.739 5.542-4.902 9.61-3.27 4.248-6.035 6.372-8.296 6.372-1.4 0-2.585-1.294-3.554-3.882-.647-2.372-1.294-4.744-1.941-7.116-.719-2.589-1.49-3.883-2.316-3.883-.18 0-.81.378-1.887 1.132L0 7.188c1.256-1.104 2.487-2.209 3.694-3.313 1.616-1.401 2.83-2.14 3.642-2.217 1.913-.184 3.09 1.124 3.531 3.922.476 3.021.809 4.9 1 5.637.555 2.507 1.165 3.76 1.831 3.76.514 0 1.287-.813 2.319-2.439 1.031-1.626 1.582-2.863 1.652-3.712.146-1.403-.405-2.104-1.652-2.104-.59 0-1.198.136-1.827.407 1.213-3.973 3.529-5.901 6.947-5.786 2.533.073 3.813 1.764 3.84 5.073z"/></svg>`,
    researchgate:`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a12.52 12.52 0 00-.32 2.247c-.24-.04-.5-.064-.773-.064-.857 0-1.545.234-2.062.704-.516.468-.774 1.106-.774 1.918 0 .867.26 1.536.78 2.01.52.47 1.216.706 2.09.706.273 0 .542-.03.806-.084.265-.054.477-.135.636-.242v.085c0 .482-.155.857-.46 1.125-.306.268-.727.402-1.266.402-.558 0-1.165-.127-1.823-.38a5.617 5.617 0 01-1.568-1.006l-.61 1.12c.44.443 1.022.802 1.75 1.077.73.276 1.45.413 2.163.413 1.085 0 1.938-.295 2.556-.883.62-.59.928-1.41.928-2.46v-3.94c0-.278.085-.502.254-.673.17-.17.4-.257.69-.257.137 0 .266.02.39.062V1.614A2.82 2.82 0 0019.586 0zm-7.25 9.527c-.403 0-.716-.115-.94-.345-.224-.23-.336-.55-.336-.96 0-.41.112-.73.338-.957.226-.226.54-.34.94-.34.402 0 .715.114.94.34.226.227.34.547.34.957 0 .41-.114.73-.34.96-.225.23-.538.345-.94.345zm.93-4.29c-.263.093-.47.256-.62.49a1.4 1.4 0 00-.225.78c0 .26.065.5.2.72.133.22.317.4.55.54.235.14.5.21.794.21.294 0 .56-.07.794-.21.235-.14.418-.32.55-.54.134-.22.2-.46.2-.72 0-.28-.075-.53-.225-.753a1.352 1.352 0 00-.62-.49 2.257 2.257 0 00-.918-.176c-.33 0-.638.06-.92.18v-.03zm-6.59 8.14c.93.822 2.055 1.233 3.374 1.233 1.11 0 2.02-.266 2.727-.797.71-.53 1.063-1.27 1.063-2.217 0-.617-.14-1.12-.42-1.51-.28-.39-.693-.676-1.24-.858a5.22 5.22 0 00-1.86-.274c-.368 0-.668.022-.9.066V7.23c.22.043.52.065.9.065.583 0 1.04-.131 1.372-.394.332-.263.5-.635.5-1.114 0-.44-.145-.782-.432-1.025-.288-.245-.684-.367-1.19-.367-.51 0-.94.16-1.29.48-.35.32-.524.75-.524 1.29v5.89c0 .386-.076.656-.228.81-.152.154-.376.232-.672.232-.267 0-.5-.074-.7-.222-.2-.148-.374-.388-.522-.72l-1.07.71c.2.466.495.83.89 1.09z"/></svg>`,
    academia:  `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3zm0 9.72L5.18 9 12 5.28 18.82 9 12 12.72z"/><path d="M5 11.18V17l7 4 7-4v-5.82l-2 1.09V15.8l-5 2.86-5-2.86v-3.53z"/></svg>`
};

// ── Social Icons Builder ───────────────────────────────────────────────────────
function buildSocialLinks(className = 'social-links') {
    const profiles = [
        {
            key: 'email',
            href: 'mailto:sarerac@gmail.com',
            label: 'Email'
        },
        {
            key: 'github',
            href: 'https://github.com/twistin',
            label: 'GitHub'
        },
        {
            key: 'researchgate',
            href: 'https://www.researchgate.net/profile/Silvino-Diaz-Carreras?ev=hdr_xprf',
            label: 'ResearchGate'
        },
        {
            key: 'academia',
            href: 'https://uab.academia.edu/SilvinoD%C3%ADazCarreras',
            label: 'Academia.edu'
        },
        {
            key: 'soundcloud',
            href: 'https://soundcloud.com/twistin_25/qian',
            label: 'SoundCloud'
        },
        {
            key: 'youtube',
            href: 'https://www.youtube.com/@twistin-p9',
            label: 'YouTube'
        },
        {
            key: 'vimeo',
            href: 'https://vimeo.com/home#_=_',
            label: 'Vimeo'
        },
    ];
    return `<div class="${className}">${profiles.map(p =>
        `<a href="${p.href}" class="social-link" target="_blank" rel="noopener" aria-label="${p.label}" title="${p.label}">${SOCIAL_SVGS[p.key]}</a>`
    ).join('')}</div>`;
}

// ── Social Icons Injection (runs at page load from main DOMContentLoaded) ─────
function injectSocialLinks() {
    document.querySelectorAll('.footer-brand').forEach(el => {
        if (!el.querySelector('.social-links')) {
            el.insertAdjacentHTML('beforeend', buildSocialLinks('footer-social'));
        }
    });
    const sidebarContact = document.querySelector('.about-sidebar-box:last-of-type .sidebar-list');
    if (sidebarContact && !sidebarContact.nextElementSibling?.classList.contains('social-links')) {
        sidebarContact.insertAdjacentHTML('afterend', buildSocialLinks());
    }
}

// ── Article Share Injection ───────────────────────────────────────────────────
function injectArticleShare() {
    document.querySelectorAll('.article-content').forEach(article => {
        if (!article.querySelector('.article-share-footer')) {
            const title = getBaseTitle();
            article.insertAdjacentHTML('beforeend', `
                <div class="article-share-footer fade-in">
                    <span class="page-intro">${t('share_article_prompt')}</span>
                    <div class="share-wrap" data-share-title="${title}">
                        <button class="share-btn" type="button" aria-haspopup="menu" aria-expanded="false">${t('share_article_btn')}</button>
                    </div>
                </div>
            `);
        }
    });
}

// ── Share Button Logic ────────────────────────────────────────────────────────
function initShareButtons() {
    const closeShareMenus = (exceptMenu = null) => {
        document.querySelectorAll('.share-menu.open').forEach(menu => {
            if (menu === exceptMenu) return;
            menu.classList.remove('open');
            menu.parentElement.querySelector('.share-btn')?.setAttribute('aria-expanded', 'false');
        });
    };

    document.querySelectorAll('.share-btn').forEach(btn => {
        if (btn.dataset.shareInited) return;
        btn.dataset.shareInited = '1';

        const card  = btn.closest('[data-share-title]') || btn.closest('.card');
        const title = card?.dataset?.shareTitle || document.title;
        let pageUrl = getCanonicalUrl();
        
        // If sharing from a card that has a link, grab the article URL instead of current page
        if (card) {
            const link = card.querySelector('.card-link');
            if (link) pageUrl = toAbsolutePageUrl(link.getAttribute('href'));
        }

        btn.addEventListener('click', e => {
            e.stopPropagation();
            // Native share (only on mobile to ensure desktop shows custom social links)
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            if (isMobile && navigator.share) {
                navigator.share({ title, url: pageUrl }).catch(() => {});
                return;
            }
            // Show/hide dropdown
            let menu = btn.parentElement.querySelector('.share-menu');
            if (!menu) {
                // Build menu lazily
                const enc = encodeURIComponent;
                const twUrl = `https://x.com/intent/tweet?text=${enc(title)}&url=${enc(pageUrl)}`;
                const waUrl = `https://api.whatsapp.com/send?text=${enc(title + ' — ' + pageUrl)}`;
                const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${enc(pageUrl)}`;
                btn.insertAdjacentHTML('afterend', `
                <div class="share-menu" role="menu">
                    <a class="share-option" href="${twUrl}" target="_blank" rel="noopener">
                        <svg viewBox="0 0 24 24" style="width:13px;height:13px;fill:currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        X / Twitter
                    </a>
                    <a class="share-option" href="${fbUrl}" target="_blank" rel="noopener">
                        <svg viewBox="0 0 24 24" style="width:13px;height:13px;fill:currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        Facebook
                    </a>
                    <a class="share-option" href="${waUrl}" target="_blank" rel="noopener">
                        <svg viewBox="0 0 24 24" style="width:13px;height:13px;fill:currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.95.449A11.507 11.507 0 00.449 11.95c0 2.023.531 4.004 1.541 5.75L.006 24l6.456-1.964a11.494 11.494 0 005.474 1.394h.005c6.356 0 11.553-5.197 11.553-11.553 0-3.088-1.2-5.99-3.382-8.175A11.462 11.462 0 0011.95.449zm0 21.1a9.56 9.56 0 01-4.877-1.337l-.35-.208-3.632 1.106 1.087-3.593-.226-.369A9.559 9.559 0 012.394 11.95c0-5.27 4.286-9.555 9.556-9.555 2.553 0 4.95.995 6.752 2.803a9.502 9.502 0 012.804 6.758c0 5.27-4.286 9.592-9.556 9.592z"/></svg>
                        WhatsApp
                    </a>
                    <button class="share-option js-copy-link" data-copy="${pageUrl}">
                        <svg viewBox="0 0 24 24" style="width:13px;height:13px;fill:currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                        ${t('share_copy_link')}
                    </button>
                </div>`);
                menu = btn.parentElement.querySelector('.share-menu');
                // Wire copy button
                menu.querySelector('.js-copy-link')?.addEventListener('click', ev => {
                    ev.stopPropagation();
                    navigator.clipboard?.writeText(pageUrl).then(() => {
                        const b = ev.currentTarget;
                        const orig = b.innerHTML;
                        b.innerHTML = t('share_copied');
                        setTimeout(() => {
                            b.innerHTML = orig;
                            menu.classList.remove('open');
                            btn.setAttribute('aria-expanded', 'false');
                        }, 1400);
                    });
                });
            }
            closeShareMenus(menu);
            menu.classList.toggle('open');
            btn.setAttribute('aria-expanded', String(menu.classList.contains('open')));
        });
    });

    // Close on outside click
    document.addEventListener('click', e => {
        if (!e.target.closest('.share-wrap')) {
            closeShareMenus();
        }
    }, { capture: true });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeShareMenus();
        }
    });
}

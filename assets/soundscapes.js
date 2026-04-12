(function () {
  const data = window.TWISTORES_SOUNDSCAPES_DATA;
  if (!data || !Array.isArray(data.sessions)) {
    return;
  }

  const ui = {
    es: {
      archivePrefix: 'Archivo en crecimiento · Salidas publicadas:',
      fieldLocation: 'Lugar / Hora',
      fieldDate: 'Fecha',
      fieldCoords: 'Coordenadas',
      fieldGear: 'Grabación',
      emptyArchive: 'Todavía no hay soundscapes publicados.',
      emptyHome: 'Todavía no hay soundscapes publicados todavía.',
      viewSession: 'Ver salida completa →',
    },
    gl: {
      archivePrefix: 'Arquivo en crecemento · Saídas publicadas:',
      fieldLocation: 'Lugar / Hora',
      fieldDate: 'Data',
      fieldCoords: 'Coordenadas',
      fieldGear: 'Gravación',
      emptyArchive: 'Aínda non hai soundscapes publicados.',
      emptyHome: 'Aínda non hai soundscapes publicados.',
      viewSession: 'Ver saída completa →',
    },
    en: {
      archivePrefix: 'Growing archive · Published outings:',
      fieldLocation: 'Location / Time',
      fieldDate: 'Date',
      fieldCoords: 'Coordinates',
      fieldGear: 'Recording',
      emptyArchive: 'No soundscapes have been published yet.',
      emptyHome: 'No soundscapes have been published yet.',
      viewSession: 'View full outing →',
    },
  };

  const sessionState = new Map();
  let hashHandled = false;

  function getLang() {
    const lang = document.documentElement.lang || 'es';
    return ui[lang] ? lang : 'es';
  }

  function t(key) {
    return ui[getLang()][key] || ui.es[key] || '';
  }

  function text(value) {
    if (!value) {
      return '';
    }

    if (typeof value === 'string') {
      return value;
    }

    const lang = getLang();
    return value[lang] || value.es || value.gl || value.en || Object.values(value)[0] || '';
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getAssetPrefix() {
    return window.location.pathname.includes('/pages/') ? '../' : '';
  }

  function getSoundscapesHref(slug) {
    const pagePath = window.location.pathname.includes('/pages/') ? 'soundscapes.html' : 'pages/soundscapes.html';
    return `${pagePath}#session-${slug}`;
  }

  function assetUrl(path) {
    if (!path) {
      return '';
    }

    if (/^(https?:)?\/\//.test(path) || path.startsWith('/') || path.startsWith('data:')) {
      return path;
    }

    return `${getAssetPrefix()}${path.replace(/^\.\//, '')}`;
  }

  function sortSessions(sessions) {
    return [...sessions].sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime());
  }

  function ensureSessionState(session) {
    const firstPoint = session.points[0] || null;
    const currentState = sessionState.get(session.slug);

    if (!currentState || !firstPoint) {
      const nextState = {
        pointId: firstPoint ? firstPoint.id : null,
        imageIndex: 0,
        audioIndex: 0,
      };
      sessionState.set(session.slug, nextState);
      return nextState;
    }

    const activePoint = session.points.find((point) => point.id === currentState.pointId) || firstPoint;
    const imageIndex = Math.min(currentState.imageIndex, Math.max(0, activePoint.images.length - 1));
    const audioIndex = Math.min(currentState.audioIndex, Math.max(0, activePoint.audio.length - 1));
    const normalizedState = {
      pointId: activePoint.id,
      imageIndex,
      audioIndex,
    };
    sessionState.set(session.slug, normalizedState);
    return normalizedState;
  }

  function getActiveSessionMedia(session) {
    const state = ensureSessionState(session);
    const point = session.points.find((entry) => entry.id === state.pointId) || session.points[0];

    if (!point) {
      return null;
    }

    return {
      state,
      point,
      imagePath: point.images[state.imageIndex] || point.images[0] || session.coverImage,
      audioEntry: point.audio[state.audioIndex] || point.audio[0] || null,
    };
  }

  function buildArchiveNote(sessions) {
    return `${t('archivePrefix')} ${sessions.map((session) => `${text(session.locationLabel)} (${text(session.dateLabel)})`).join(' · ')}`;
  }

  function renderHome() {
    const container = document.getElementById('home-soundscapes-list');
    if (!container) {
      return;
    }

    const note = document.getElementById('home-soundscapes-note');
    const sessions = sortSessions(data.sessions).slice(0, 2);

    if (note) {
      note.textContent = sessions.length > 0 ? buildArchiveNote(sessions) : t('emptyHome');
    }

    if (sessions.length === 0) {
      container.innerHTML = `<p class="section-note">${escapeHtml(t('emptyHome'))}</p>`;
      return;
    }

    container.innerHTML = sessions
      .map((session) => {
        const featuredPoint = session.points[0];
        const featuredAudio = featuredPoint?.audio?.[0] || null;
        const badge = text(session.badge);

        return `
          <article class="soundscape-card fade-in visible"${badge ? ' style="position:relative;"' : ''}>
            ${badge ? `<div class="card-featured-badge" style="position:absolute;top:12px;left:12px;z-index:2;">${escapeHtml(badge)}</div>` : ''}
            <img class="soundscape-img" src="${escapeHtml(assetUrl(session.coverImage))}" alt="${escapeHtml(text(session.homeTitle))}" loading="lazy">
            <div class="soundscape-body">
              <p class="soundscape-date">${escapeHtml(text(session.dateLabel))} · ${escapeHtml(text(session.locationLabel))}</p>
              <h3 class="soundscape-title">${escapeHtml(text(session.homeTitle))}</h3>
              <p class="soundscape-desc">${escapeHtml(text(session.homeSummary))}</p>
              ${featuredAudio ? `<audio class="soundscape-audio" controls preload="none" src="${escapeHtml(assetUrl(featuredAudio.src))}"></audio>` : ''}
              <div class="card-footer">
                <a class="card-link" href="${escapeHtml(getSoundscapesHref(session.slug))}">${escapeHtml(t('viewSession'))}</a>
              </div>
            </div>
          </article>
        `;
      })
      .join('');
  }

  function renderArchive() {
    const container = document.getElementById('soundscapes-archive');
    if (!container) {
      return;
    }

    const note = document.getElementById('soundscapes-archive-note');
    const sessions = sortSessions(data.sessions);

    if (note) {
      note.textContent = sessions.length > 0 ? buildArchiveNote(sessions) : t('emptyArchive');
    }

    if (sessions.length === 0) {
      container.innerHTML = `<div class="soundscape-empty">${escapeHtml(t('emptyArchive'))}</div>`;
      return;
    }

    container.innerHTML = sessions
      .map((session) => {
        const media = getActiveSessionMedia(session);
        if (!media) {
          return '';
        }

        const { state, point, imagePath, audioEntry } = media;
        const thumbs = session.points
          .flatMap((entry) =>
            entry.images.map((image, imageIndex) => {
              const isActive = entry.id === state.pointId && imageIndex === state.imageIndex;
              return `
                <button
                  class="photo-thumb${isActive ? ' active' : ''}"
                  type="button"
                  data-soundscape-thumb="1"
                  data-session-slug="${escapeHtml(session.slug)}"
                  data-point-id="${escapeHtml(entry.id)}"
                  data-image-index="${imageIndex}"
                  data-id="${escapeHtml(entry.id.replace('loc-', ''))}"
                  aria-pressed="${isActive ? 'true' : 'false'}"
                  style="background-image:url('${escapeHtml(assetUrl(image))}');"
                ></button>
              `;
            }),
          )
          .join('');

        const audioTabs = point.audio.length > 1
          ? `
            <div class="soundscape-audio-tabs">
              ${point.audio
                .map((entry, audioIndex) => `
                  <button
                    class="soundscape-audio-tab${audioIndex === state.audioIndex ? ' active' : ''}"
                    type="button"
                    data-soundscape-audio-tab="1"
                    data-session-slug="${escapeHtml(session.slug)}"
                    data-audio-index="${audioIndex}"
                  >${escapeHtml(text(entry.label))}</button>
                `)
                .join('')}
            </div>
          `
          : '';

        return `
          <article class="soundscape-full fade-in visible" id="session-${escapeHtml(session.slug)}">
            <div class="soundscape-gallery">
              <div
                class="photo-main"
                role="img"
                aria-label="${escapeHtml(text(point.title))}"
                style="background-image:url('${escapeHtml(assetUrl(imagePath))}'); color: transparent;"
              ></div>
              <div class="photo-thumbs">${thumbs}</div>
            </div>
            <div class="soundscape-info">
              <p class="soundscape-date">${escapeHtml(text(session.dateLabel))}</p>
              <h2>${escapeHtml(text(point.title))}</h2>
              <p class="soundscape-helper">${escapeHtml(text(session.helper))}</p>
              <p style="min-height:80px;">${escapeHtml(text(point.description))}</p>
              <div class="field-meta">
                <div class="field-meta-item"><strong>${escapeHtml(t('fieldLocation'))}</strong><span>${escapeHtml(text(session.locationLabel))} — ${escapeHtml(point.timeLabel)}</span></div>
                <div class="field-meta-item"><strong>${escapeHtml(t('fieldDate'))}</strong><span>${escapeHtml(session.sessionDateLabel)}</span></div>
                <div class="field-meta-item"><strong>${escapeHtml(t('fieldCoords'))}</strong><span>${escapeHtml(point.coordsLabel)}</span></div>
                <div class="field-meta-item"><strong>${escapeHtml(t('fieldGear'))}</strong><span>${escapeHtml(text(session.recording))}</span></div>
              </div>
              ${audioTabs}
              <div class="audio-player-full soundscape-player-shell">
                ${audioEntry ? `<audio class="soundscape-audio-embed" controls preload="none" src="${escapeHtml(assetUrl(audioEntry.src))}"></audio>` : ''}
              </div>
            </div>
          </article>
        `;
      })
      .join('');

    attachArchiveEvents();
    scrollToHashIfNeeded();
  }

  function attachArchiveEvents() {
    document.querySelectorAll('[data-soundscape-thumb]').forEach((button) => {
      button.addEventListener('click', () => {
        const sessionSlug = button.getAttribute('data-session-slug');
        const pointId = button.getAttribute('data-point-id');
        const imageIndex = Number(button.getAttribute('data-image-index') || '0');
        if (!sessionSlug || !pointId) {
          return;
        }

        const nextState = sessionState.get(sessionSlug) || { pointId, imageIndex: 0, audioIndex: 0 };
        nextState.pointId = pointId;
        nextState.imageIndex = imageIndex;
        nextState.audioIndex = 0;
        sessionState.set(sessionSlug, nextState);
        renderArchive();
      });
    });

    document.querySelectorAll('[data-soundscape-audio-tab]').forEach((button) => {
      button.addEventListener('click', () => {
        const sessionSlug = button.getAttribute('data-session-slug');
        const audioIndex = Number(button.getAttribute('data-audio-index') || '0');
        if (!sessionSlug) {
          return;
        }

        const nextState = sessionState.get(sessionSlug);
        if (!nextState) {
          return;
        }

        nextState.audioIndex = audioIndex;
        sessionState.set(sessionSlug, nextState);
        renderArchive();
      });
    });
  }

  function scrollToHashIfNeeded() {
    if (hashHandled) {
      return;
    }

    const hash = window.location.hash.replace('#', '');
    if (!hash) {
      return;
    }

    const target = document.getElementById(hash);
    if (!target) {
      return;
    }

    target.scrollIntoView({ block: 'start' });
    hashHandled = true;
  }

  function renderAll() {
    renderHome();
    renderArchive();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAll, { once: true });
  } else {
    renderAll();
  }

  document.addEventListener('languageChanged', () => {
    hashHandled = false;
    renderAll();
  });

  window.addEventListener('hashchange', () => {
    hashHandled = false;
    renderArchive();
  });
})();

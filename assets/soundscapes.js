(function () {
  const staticData = window.TWISTORES_SOUNDSCAPES_DATA;
  const hasStaticSessions = staticData && Array.isArray(staticData.sessions);

  const ui = {
    es: {
      archivePrefix: 'Archivo en crecimiento · Salidas publicadas:',
      fieldLocation: 'Lugar / sesión',
      fieldDate: 'Fecha',
      fieldCoords: 'Coordenadas',
      fieldGear: 'Grabación',
      fieldWeather: 'Clima',
      fieldTags: 'Tags',
      fieldNotes: 'Notas',
      emptyArchive: 'Todavía no hay soundscapes publicados.',
      emptyHome: 'Todavía no hay soundscapes publicados todavía.',
      viewSession: 'Ver salida completa →',
      viewSelection: 'Abrir selección publicada →',
      remoteLabel: 'feed remoto',
      curatedLabel: 'archivo curado',
      loadingFeed: 'Cargando publicaciones remotas...',
      remoteFallback: 'No se pudo cargar el feed remoto. Se muestra el archivo curado local.',
      noCoordinates: 'Sin coordenadas',
      noWeather: 'Sin dato meteorológico',
      noTags: 'Sin tags',
      noNotes: 'Sin notas adicionales.',
    },
    gl: {
      archivePrefix: 'Arquivo en crecemento · Saídas publicadas:',
      fieldLocation: 'Lugar / sesión',
      fieldDate: 'Data',
      fieldCoords: 'Coordenadas',
      fieldGear: 'Gravación',
      fieldWeather: 'Clima',
      fieldTags: 'Etiquetas',
      fieldNotes: 'Notas',
      emptyArchive: 'Aínda non hai soundscapes publicados.',
      emptyHome: 'Aínda non hai soundscapes publicados.',
      viewSession: 'Ver saída completa →',
      viewSelection: 'Abrir selección publicada →',
      remoteLabel: 'feed remoto',
      curatedLabel: 'arquivo curado',
      loadingFeed: 'Cargando publicacións remotas...',
      remoteFallback: 'Non se puido cargar o feed remoto. Amosamos o arquivo curado local.',
      noCoordinates: 'Sen coordenadas',
      noWeather: 'Sen dato meteorolóxico',
      noTags: 'Sen etiquetas',
      noNotes: 'Sen notas adicionais.',
    },
    en: {
      archivePrefix: 'Growing archive · Published outings:',
      fieldLocation: 'Location / session',
      fieldDate: 'Date',
      fieldCoords: 'Coordinates',
      fieldGear: 'Recording',
      fieldWeather: 'Weather',
      fieldTags: 'Tags',
      fieldNotes: 'Notes',
      emptyArchive: 'No soundscapes have been published yet.',
      emptyHome: 'No soundscapes have been published yet.',
      viewSession: 'View full outing →',
      viewSelection: 'Open published selection →',
      remoteLabel: 'remote feed',
      curatedLabel: 'curated archive',
      loadingFeed: 'Loading remote publications...',
      remoteFallback: 'The remote feed could not be loaded. Showing the local curated archive instead.',
      noCoordinates: 'No coordinates',
      noWeather: 'No weather data',
      noTags: 'No tags',
      noNotes: 'No additional notes.',
    },
  };

  const sessionState = new Map();
  let hashHandled = false;
  let sourceMode = 'static';
  let remoteFeedError = null;
  let remoteSelections = [];

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

  function getSelectionHref(id) {
    const pagePath = window.location.pathname.includes('/pages/') ? 'soundscapes.html' : 'pages/soundscapes.html';
    return `${pagePath}#selection-${id}`;
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

  function getFeedOrigin() {
    const meta = document.querySelector('meta[name="twistores-soundscapes-feed-origin"]')?.getAttribute('content') || '';
    const configValue = (window.SITE_CONFIG && window.SITE_CONFIG.soundscapesFeedOrigin) || '';
    return (meta || configValue || '').replace(/\/+$/, '');
  }

  async function loadRemoteSelections() {
    const feedOrigin = getFeedOrigin();
    if (!feedOrigin) {
      return [];
    }

    const response = await fetch(`${feedOrigin}/api/published-selections`);
    if (!response.ok) {
      throw new Error(`Remote feed request failed with HTTP ${response.status}.`);
    }

    const items = await response.json();
    return Array.isArray(items) ? items : [];
  }

  function formatDate(value) {
    if (!value) {
      return '';
    }

    try {
      return new Intl.DateTimeFormat(getLang() === 'en' ? 'en-GB' : getLang() === 'gl' ? 'gl-ES' : 'es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(new Date(value));
    } catch {
      return value;
    }
  }

  function formatCoordinates(item) {
    if (typeof item.latitude !== 'number' || typeof item.longitude !== 'number') {
      return t('noCoordinates');
    }

    return `${item.latitude.toFixed(5)}, ${item.longitude.toFixed(5)}`;
  }

  function formatGear(item) {
    return [item.microphoneSetup, item.zoomTakeReference].filter(Boolean).join(' · ') || 'Zoom H6';
  }

  function normalizeTags(tags) {
    return Array.isArray(tags) ? tags.filter((entry) => typeof entry === 'string' && entry.trim()) : [];
  }

  function buildArchiveNoteForRemote(items) {
    return `${t('archivePrefix')} ${items.map((item) => `${item.point} (${formatDate(item.pointCapturedAt || item.publishedAt)})`).join(' · ')}`;
  }

  function buildStaticHomeCards(sessions) {
    return sessions
      .map((session) => {
        const featuredPoint = session.points[0];
        const featuredAudio = featuredPoint?.audio?.[0] || null;
        const badge = text(session.badge);

        return `
          <article class="soundscape-card fade-in visible"${badge ? ' style="position:relative;"' : ''}>
            ${badge ? `<div class="card-featured-badge" style="position:absolute;top:12px;left:12px;z-index:2;">${escapeHtml(badge)}</div>` : `<div class="card-featured-badge" style="position:absolute;top:12px;left:12px;z-index:2;">${escapeHtml(t('curatedLabel'))}</div>`}
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

  function buildStaticArchiveEntries(sessions) {
    return sessions
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
  }

  function renderHomeFromRemote(items) {
    const container = document.getElementById('home-soundscapes-list');
    if (!container) {
      return;
    }

    const note = document.getElementById('home-soundscapes-note');
    const visibleItems = [...items]
      .sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime())
      .slice(0, 2);
    const staticSessions = hasStaticSessions ? sortSessions(staticData.sessions).slice(0, Math.max(0, 4 - visibleItems.length)) : [];

    if (note) {
      note.textContent = visibleItems.length > 0 ? buildArchiveNoteForRemote(visibleItems) : t('emptyHome');
    }

    if (visibleItems.length === 0 && staticSessions.length === 0) {
      container.innerHTML = `<p class="section-note">${escapeHtml(t('emptyHome'))}</p>`;
      return;
    }

    const remoteHtml = visibleItems
      .map((item) => `
        <article class="soundscape-card fade-in visible" style="position:relative;">
          <div class="card-featured-badge" style="position:absolute;top:12px;left:12px;z-index:2;">${escapeHtml(t('remoteLabel'))}</div>
          <img class="soundscape-img" src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.point)}" loading="lazy">
          <div class="soundscape-body">
            <p class="soundscape-date">${escapeHtml(formatDate(item.pointCapturedAt || item.publishedAt))} · ${escapeHtml(item.project || item.session || '')}</p>
            <h3 class="soundscape-title">${escapeHtml(item.point)}</h3>
            <p class="soundscape-desc">${escapeHtml(item.caption || item.notes || t('noNotes'))}</p>
            ${item.audioUrl ? `<audio class="soundscape-audio" controls preload="none" src="${escapeHtml(item.audioUrl)}"></audio>` : ''}
            <div class="card-footer">
              <a class="card-link" href="${escapeHtml(getSelectionHref(item.id))}">${escapeHtml(t('viewSelection'))}</a>
            </div>
          </div>
        </article>
      `)
      .join('');

    const staticHtml = staticSessions.length > 0 ? buildStaticHomeCards(staticSessions) : '';
    container.innerHTML = `${remoteHtml}${staticHtml}`;
  }

  function renderArchiveFromRemote(items) {
    const container = document.getElementById('soundscapes-archive');
    if (!container) {
      return;
    }

    const note = document.getElementById('soundscapes-archive-note');
    const visibleItems = [...items].sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime());

    if (note) {
      note.textContent = visibleItems.length > 0 ? buildArchiveNoteForRemote(visibleItems) : t('emptyArchive');
    }

    if (visibleItems.length === 0 && !hasStaticSessions) {
      container.innerHTML = `<div class="soundscape-empty">${escapeHtml(t('emptyArchive'))}</div>`;
      return;
    }

    const remoteHtml = visibleItems
      .map((item) => {
        const tags = normalizeTags(item.tags);
        const helperText = item.placeContext || item.characteristics || item.caption || '';

        return `
          <article class="soundscape-full fade-in visible" id="selection-${escapeHtml(item.id)}">
            <div class="soundscape-gallery">
              <div
                class="photo-main"
                role="img"
                aria-label="${escapeHtml(item.point)}"
                style="background-image:url('${escapeHtml(item.imageUrl)}'); color: transparent;"
              ></div>
              <div class="photo-thumbs">
                <button
                  class="photo-thumb active"
                  type="button"
                  aria-pressed="true"
                  data-id="${escapeHtml((item.zoomTakeReference || item.point || '').slice(0, 18))}"
                  style="background-image:url('${escapeHtml(item.imageUrl)}');"
                ></button>
              </div>
            </div>
            <div class="soundscape-info">
              <p class="soundscape-date">${escapeHtml(formatDate(item.pointCapturedAt || item.publishedAt))} · ${escapeHtml(item.project || item.session || '')}</p>
              <h2>${escapeHtml(item.point)}</h2>
              <p class="soundscape-helper">${escapeHtml(helperText)}</p>
              <p style="min-height:80px;">${escapeHtml(item.caption || item.notes || t('noNotes'))}</p>
              <div class="field-meta">
                <div class="field-meta-item"><strong>${escapeHtml(t('fieldLocation'))}</strong><span>${escapeHtml(item.point)} — ${escapeHtml(item.session || item.project || '')}</span></div>
                <div class="field-meta-item"><strong>${escapeHtml(t('fieldDate'))}</strong><span>${escapeHtml(formatDate(item.pointCapturedAt || item.publishedAt))}</span></div>
                <div class="field-meta-item"><strong>${escapeHtml(t('fieldCoords'))}</strong><span>${escapeHtml(formatCoordinates(item))}</span></div>
                <div class="field-meta-item"><strong>${escapeHtml(t('fieldGear'))}</strong><span>${escapeHtml(formatGear(item))}</span></div>
                <div class="field-meta-item"><strong>${escapeHtml(t('fieldWeather'))}</strong><span>${escapeHtml(item.weather || t('noWeather'))}</span></div>
                <div class="field-meta-item"><strong>${escapeHtml(t('fieldTags'))}</strong><span>${escapeHtml(tags.length ? tags.join(' · ') : t('noTags'))}</span></div>
                <div class="field-meta-item"><strong>${escapeHtml(t('fieldNotes'))}</strong><span>${escapeHtml(item.notes || t('noNotes'))}</span></div>
              </div>
              <div class="audio-player-full soundscape-player-shell">
                ${item.audioUrl ? `<audio class="soundscape-audio-embed" controls preload="none" src="${escapeHtml(item.audioUrl)}"></audio>` : ''}
              </div>
            </div>
          </article>
        `;
      })
      .join('');

    const staticHtml = hasStaticSessions
      ? `
        <div class="section-note" style="margin:18px 0 22px;">${escapeHtml(t('curatedLabel'))}</div>
        ${buildStaticArchiveEntries(sortSessions(staticData.sessions))}
      `
      : '';

    container.innerHTML = `${remoteHtml}${staticHtml}`;
    attachArchiveEvents();
    scrollToHashIfNeeded();
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

  function renderHomeStatic() {
    const container = document.getElementById('home-soundscapes-list');
    if (!container) {
      return;
    }

    const note = document.getElementById('home-soundscapes-note');
    const sessions = sortSessions(staticData.sessions).slice(0, 2);

    if (note) {
      note.textContent = sessions.length > 0 ? buildArchiveNote(sessions) : t('emptyHome');
    }

    if (sessions.length === 0) {
      container.innerHTML = `<p class="section-note">${escapeHtml(t('emptyHome'))}</p>`;
      return;
    }

    container.innerHTML = buildStaticHomeCards(sessions);
  }

  function renderArchiveStatic() {
    const container = document.getElementById('soundscapes-archive');
    if (!container) {
      return;
    }

    const note = document.getElementById('soundscapes-archive-note');
    const sessions = sortSessions(staticData.sessions);

    if (note) {
      note.textContent = sessions.length > 0 ? buildArchiveNote(sessions) : t('emptyArchive');
    }

    if (sessions.length === 0) {
      container.innerHTML = `<div class="soundscape-empty">${escapeHtml(t('emptyArchive'))}</div>`;
      return;
    }

    container.innerHTML = buildStaticArchiveEntries(sessions);

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
        renderArchiveStatic();
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
        renderArchiveStatic();
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

  async function renderAll() {
    const note = document.getElementById('soundscapes-archive-note') || document.getElementById('home-soundscapes-note');
    if (note) {
      note.textContent = t('loadingFeed');
    }

    try {
      remoteSelections = await loadRemoteSelections();
      sourceMode = remoteSelections.length > 0 ? 'remote' : 'static';
    } catch (error) {
      remoteFeedError = error instanceof Error ? error.message : 'Remote feed unavailable.';
      sourceMode = 'static';
    }

    if (sourceMode === 'remote' && remoteSelections.length > 0) {
      renderHomeFromRemote(remoteSelections);
      renderArchiveFromRemote(remoteSelections);
      return;
    }

    if (!hasStaticSessions) {
      const homeContainer = document.getElementById('home-soundscapes-list');
      const archiveContainer = document.getElementById('soundscapes-archive');
      const message = remoteFeedError ? `${t('remoteFallback')} (${remoteFeedError})` : t('emptyArchive');
      if (homeContainer) {
        homeContainer.innerHTML = `<p class="section-note">${escapeHtml(message)}</p>`;
      }
      if (archiveContainer) {
        archiveContainer.innerHTML = `<div class="soundscape-empty">${escapeHtml(message)}</div>`;
      }
      return;
    }

    renderHomeStatic();
    renderArchiveStatic();

    if (remoteFeedError) {
      const archiveNote = document.getElementById('soundscapes-archive-note');
      if (archiveNote) {
        archiveNote.textContent = `${archiveNote.textContent ? `${archiveNote.textContent} · ` : ''}${t('remoteFallback')}`;
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      void renderAll();
    }, { once: true });
  } else {
    void renderAll();
  }

  document.addEventListener('languageChanged', () => {
    hashHandled = false;
    void renderAll();
  });

  window.addEventListener('hashchange', () => {
    hashHandled = false;
    if (sourceMode === 'remote') {
      renderArchiveFromRemote(remoteSelections);
    } else {
      renderArchiveStatic();
    }
  });
})();

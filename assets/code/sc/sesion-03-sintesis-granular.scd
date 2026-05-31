/*
TWISTORES — Laboratorio de Síntesis con SuperCollider
Sesión 03 · Síntesis granular
Teoría base: Curtis Roads / Eli Fieldsteel
*/

// ------------------------------------------------------------
// BLOQUE 1 — GrainSin: granular clásica (Gabor)
// Cada grano = sinusoide + envolvente gaussiana
// ------------------------------------------------------------
(
~gran = {
    var trig, freq, sig;

    // DENSIDAD — Dust = asincrónico (AGS), Impulse = sincrónico (SGS)
    trig = Dust.kr(\density.kr(12));

    // FRECUENCIA — dispersión per-grano
    freq = \baseFreq.kr(220) * LFNoise1.kr(20).range(0.95, 1.05);

    sig = GrainSin.ar(
        numChannels: 2,
        trigger: trig,
        dur: \grainDur.kr(0.08),
        freq: freq,
        pan: LFNoise1.kr(15)
    );

    sig * \amp.kr(0.3);
};
)
~gran.fadeTime_(8).play;

// Explorar la ley tiempo-banda
~gran.set(\density, 50, \baseFreq, 440, \grainDur, 0.001);  // agudo / ruido
~gran.set(\density, 50, \baseFreq, 440, \grainDur, 0.009);  // grave
~gran.set(\density, 40, \baseFreq, 440, \grainDur, 0.02);   // tonal


// ------------------------------------------------------------
// BLOQUE 2 — GrainBuf: granular con sample
// ------------------------------------------------------------
b = Buffer.read(s, Platform.resourceDir ++ "/sounds/a11wlk01.wav");

(
~gran = {
    var trig, sig;
    trig = Dust.kr(\density.kr(15));
    sig = GrainBuf.ar(
        numChannels: 2,
        trigger: trig,
        dur: \grainDur.kr(0.1),
        sndbuf: b,
        rate: \rate.kr(1.0),
        pos: \pos.kr(0.5),
        pan: LFNoise1.kr(20)
    );
    sig * \amp.kr(0.4);
};
)
~gran.set(\pos, 0.0);
~gran.set(\rate, -1.0);


// ------------------------------------------------------------
// BLOQUE 3 — pos dinámico: time-stretch / scrub / scramble
// ------------------------------------------------------------
(
~gran = {
    var trig, pos, sig;
    trig = Dust.kr(\density.kr(20));
    pos = LFSaw.kr(\stretchTime.kr(30).reciprocal, iphase: 0).range(0, 1);
    pos = (pos + LFNoise1.kr(30).bipolar(\scatter.kr(0.0))).clip(0, 1);
    sig = GrainBuf.ar(
        2,
        trig,
        \grainDur.kr(0.12),
        b,
        \rate.kr(1.0),
        pos,
        LFNoise1.kr(20)
    );
    sig * \amp.kr(0.4);
};
)

~gran.set(\stretchTime, 30, \scatter, 0.0, \grainDur, 0.12);  // time-stretch
~gran.set(\stretchTime, 15, \scatter, 0.05, \grainDur, 0.08); // scrubbing
~gran.set(\stretchTime, 10, \scatter, 0.4, \grainDur, 0.05);  // scramble


// ------------------------------------------------------------
// BLOQUE 4 — ProxySpace + slow morphing
// ------------------------------------------------------------
(
~gran = {
    var trig, pos, scatter, density, rate, sig;

    density = LFNoise1.kr(1 / 41).range(8, 35);
    scatter = LFNoise1.kr(1 / 29).range(0.0, 0.25);
    rate = LFNoise1.kr(1 / 67).range(0.85, 1.15);

    trig = Dust.kr(density);
    pos = LFSaw.kr(\stretchTime.kr(40).reciprocal, iphase: 0).range(0, 1);
    pos = (pos + LFNoise1.kr(30).bipolar(scatter)).clip(0, 1);

    sig = GrainBuf.ar(
        numChannels: 2,
        trigger: trig,
        dur: \grainDur.kr(0.12),
        sndbuf: b,
        rate: rate,
        pos: pos,
        pan: LFNoise1.kr(20)
    );

    sig = FreeVerb2.ar(sig[0], sig[1], mix: 0.35, room: 0.85, damp: 0.5);
    sig * \amp.kr(0.3);
};
)
~gran.play;

// Performance en vivo
~gran.xset(\stretchTime, 60, \grainDur, 0.15);  // time-stretch suave
~gran.xset(\stretchTime, 10, \grainDur, 0.04);  // nube densa

//==================================================================
// DERIVA v.2 — script completo
// Twistin / KAIROS
//
// EJEMPLO PEDAGOGICO
// La idea no es presentar una pieza cerrada, sino un esqueleto
// operativo donde se vean juntas las tecnicas del cuaderno:
// reloj maestro, ProxySpace, NodeProxy, Tdef, macroforma y master.
//==================================================================


// === -1) RESET DURO =================================================
(
Tdef.all.do(_.clear);
try { ProxySpace.pop } { };
s.reboot;
)


// === 0) RELOJ SCLANG =================================================
(
t = TempoClock.new(100/60).permanent_(true);
)


// === 1) MOTOR ========================================================
(
p = ProxySpace.push(s.boot);

~bpm = { 100 };

~clkMaster = {
    var hz = (~bpm.kr / 60) * 4;
    Impulse.kr(hz);
};

~cnt16 = { PulseCount.kr(~clkMaster.kr.first) - 1 };
~cnt4  = { (~cnt16.kr.first / 4).floor };
~cnt1  = { (~cnt16.kr.first / 16).floor };
)


// === 2) EFECTOS DE RETORNO ==========================================
(
~verb = {
    var bd   = ~bd.ar(2)         * \bdSend.kr(0.0);
    var sn   = ~snare.ar(2)      * \snSend.kr(0.3);
    var hh   = ~hh.ar(2)         * \hhSend.kr(0.0);
    var cp   = ~clap.ar(2)       * \cpSend.kr(0.4);
    var arp  = ~arp.ar(2)        * \arpSend.kr(0.5);
    var oArp = ~organicArp.ar(2) * \organicArpSend.kr(0.6);
    var lead = ~lead.ar(2)       * \leadSend.kr(0.0);
    var input = (bd + sn + hh + cp + arp + oArp + lead).sum;
    var wet = GVerb.ar(
        input,
        roomsize: \room.kr(150),
        revtime: \time.kr(2.5),
        taillevel: \tail.kr(0.5)
    );
    wet = LPF.ar(wet, \lpf.kr(2500));
    wet * \masterVol.kr(0.5);
};
~verb.fadeTime_(2);
)

(
~delay = {
    var bd   = ~bd.ar(2)         * \bdSend.kr(0.0);
    var sn   = ~snare.ar(2)      * \snSend.kr(0.2);
    var hh   = ~hh.ar(2)         * \hhSend.kr(0.5);
    var cp   = ~clap.ar(2)       * \cpSend.kr(0.2);
    var arp  = ~arp.ar(2)        * \arpSend.kr(0.6);
    var oArp = ~organicArp.ar(2) * \organicArpSend.kr(0.0);
    var lead = ~lead.ar(2)       * \leadSend.kr(0.5);
    var input = (bd + sn + hh + cp + arp + oArp + lead).sum;
    var beatDuration = 60 / \bpm.kr(100);
    var delayTime = beatDuration * \div.kr(0.375);
    var wet = CombC.ar(input, 2.0, delayTime, \decay.kr(3.0));
    wet = HPF.ar(wet, \hpf.kr(350));
    wet * \masterVol.kr(0.4);
};
~delay.fadeTime_(2);
)


// === 3) VOCES ========================================================
(
~bd = {
    var clk, cnt, pat, gat, envAmp, envFreq, sig;
    clk = ~clkMaster.kr.first;
    cnt = ~cnt16.kr.first;
    pat = \pat.kr([1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0]);
    gat = clk * Select.kr(cnt % 16, pat);
    envAmp  = EnvGen.kr(Env.perc(0.002, \dec.kr(0.3), curve: -4), gat, doneAction: 0);
    envFreq = EnvGen.kr(Env.perc(0.001, \pdec.kr(0.05), curve: -8), gat, doneAction: 0);
    sig = SinOsc.ar((envFreq * \sweep.kr(120) + \base.kr(48)).clip(20, 18000), 0.5pi) * envAmp;
    sig = (sig * \drive.kr(1)).distort * \amp.kr(0.6);
    sig ! 2;
};
~bd.fadeTime_(4);
)

(
~snare = {
    var clk, cnt, pat, gat, envAmp, envTone, noise, tone, sig;
    clk = ~clkMaster.kr.first;
    cnt = ~cnt16.kr.first;
    pat = \pat.kr([0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0]);
    gat = clk * Select.kr(cnt % 16, pat);
    envAmp  = EnvGen.kr(Env.perc(0.005, 0.18), gat, doneAction: 0);
    envTone = EnvGen.kr(Env.perc(0.002, 0.06), gat, doneAction: 0);
    noise = HPF.ar(WhiteNoise.ar, 1200) * envAmp * 0.5;
    tone  = SinOsc.ar(envTone * 180 + 160) * envAmp * 0.2;
    sig = (noise + tone) * \amp.kr(0.7);
    sig ! 2;
};
~snare.fadeTime_(4);
)

(
~hh = {
    var clk, cnt, pat, gat, env, sig;
    clk = ~clkMaster.kr.first;
    cnt = ~cnt16.kr.first;
    pat = \pat.kr([0,0,1,0, 0,0,1,0, 0,1,0,0, 0,0,1,0]);
    gat = clk * Select.kr(cnt % 16, pat);
    env = EnvGen.kr(Env.perc(0.002, 0.05, curve: -4), gat, doneAction: 0);
    sig = BPF.ar(WhiteNoise.ar, 10000, 0.3) * env * \amp.kr(0.5);
    sig ! 2;
};
~hh.fadeTime_(4);
)

(
~clap = {
    var clk, cnt, pat, gat, env, sig;
    clk = ~clkMaster.kr.first;
    cnt = ~cnt16.kr.first;
    pat = \pat.kr([0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,1]);
    gat = clk * Select.kr(cnt % 16, pat);
    env = EnvGen.kr(
        Env([0,1,0.1,1,0.1,1,0], [0.01,0.005,0.01,0.005,0.01,0.12], -4),
        gat,
        doneAction: 0
    );
    sig = BPF.ar(WhiteNoise.ar, 1100, 0.4) * env * \amp.kr(0.5);
    sig ! 2;
};
~clap.fadeTime_(4);
)

(
~drums = {
    var mix;
    mix = (~bd.ar(2)    * \bdVol.kr(0.8))
        + (~snare.ar(2) * \snVol.kr(0.7))
        + (~hh.ar(2)    * \hhVol.kr(0.6))
        + (~clap.ar(2)  * \cpVol.kr(0.7));
    Limiter.ar(mix, 0.95);
};
~drums.fadeTime_(2);
)

(
~bass = {
    var gat, cnt, note, env, fenv, sig, sub;
    gat  = ~clkMaster.kr.first;
    cnt  = ~cnt16.kr.first;
    note = Select.kr((cnt / 4) % 4, [72, 74, 77, 78, 79, 80, 82] - 12) + \transpose.kr(0);
    env  = EnvGen.kr(Env.asr(0.01, 1.0, \rel.kr(0.15)), gat, doneAction: 0);
    fenv = EnvGen.kr(Env.perc(0.005, \frel.kr(0.12)), gat, doneAction: 0);
    sig = PMOsc.ar(note.midicps, note.midicps * \ratio.kr(1.0), \modIndex.kr(0.5) + (fenv * 2.0));
    sub = LFTri.ar(note.midicps);
    sig = MoogFF.ar(
        sig + sub,
        (\cutoff.kr(500) + (fenv * \fenvAmt.kr(800))).clip(40, 18000),
        \res.kr(0.8)
    );
    sig = Pan2.ar(sig, 0);
    sig = Compander.ar(sig, sig, 0.3, 1, 0.5, 0.005, 0.05);
    sig * env * \amp.kr(0.9);
};
~bass.fadeTime_(4);
)

(
~arp = {
    var cnt16, cnt1, gat, idx, note, env, sig;
    cnt16 = ~cnt16.kr.first;
    cnt1  = ~cnt1.kr.first;
    gat = ~clkMaster.kr.first * Select.kr(cnt16 % 16, [1,0,0,1, 0,0,1,0, 0,1,0,1, 0,0,1,0]);
    idx  = (cnt16 % 4) + ((cnt1 % 2) * 4);
    note = Select.kr(idx, [48, 51, 54, 65, 51, 55, 58, 62]) + 12;
    env = EnvGen.kr(Env.perc(0.001, 0.4, curve: -4), gat, doneAction: 0);
    sig = PMOsc.ar(note.midicps.lag(0.2), note.midicps * 0.5, 2);
    Pan2.ar(sig, 0) * env * \amp.kr(0.1);
};
~arp.fadeTime_(4);
)

(
~pad = {
    var cnt16, gat, idx, notes, freqs, env, voices, sig;
    cnt16 = ~cnt16.kr.first;
    gat   = ~clkMaster.kr.first * (cnt16 % \stepsPerSwell.kr(16) < 1);
    idx   = (PulseCount.kr(gat) % 2) * 4;
    notes = [
        Select.kr(idx + 0, [36, 48, 55, 60, 63]),
        Select.kr(idx + 1, [67, 70, 72, 74, 77]),
        Select.kr(idx + 2, [77, 78, 79, 80, 82]),
        Select.kr(idx + 3, [83, 84])
    ] + 12 + \transpose.kr(0);
    freqs = notes.midicps.lag(0.5);
    env = EnvGen.kr(Env.new([0, 1, 0], [\atk.kr(1.0), \rel.kr(2.5)], curve: \sine), gat, doneAction: 0);
    voices = freqs.collect { |f|
        PMOsc.ar(f * [1 - \detune.kr(0.005), 1 + \detune.kr(0.005)], f, 0.8).sum
    };
    sig = Splay.ar(voices) * env * \amp.kr(0.12);
    HPF.ar(sig, 100);
};
~pad.fadeTime_(4);
)

(
~lead = {
    var clk, cnt, gat, note, freqs, env, fenv, sig;
    clk = ~clkMaster.kr.first;
    cnt = ~cnt16.kr.first;
    gat = clk * (cnt % \div.kr(4) < 1);
    note = Select.kr((cnt / 2) % 5, [36, 48, 55, 60, 63, 67, 70, 72, 74, 77, 78, 79, 80]) - 12 + \transpose.kr(0);
    env  = EnvGen.kr(Env.perc(0.005, \rel.kr(0.35), curve: -4), gat, doneAction: 0);
    fenv = EnvGen.kr(Env.perc(0.002, \frel.kr(0.15), curve: -8), gat, doneAction: 0);
    freqs = [note, note + 7].midicps.lag(\portamento.kr(0.08));
    sig = freqs.collect { |f|
        var d = \detune.kr(0.006);
        Saw.ar([f * (1 - d), f * (1 + d)]).sum
    };
    sig = MoogFF.ar(
        sig,
        (\cutoff.kr(1000) + (fenv * \fenvAmt.kr(2500))).clip(40, 18000),
        \res.kr(1.2)
    );
    sig = (sig * \drive.kr(2.5)).tanh * 0.4;
    sig = Splay.ar(sig) * env * \amp.kr(1);
    HPF.ar(sig, 160);
};
~lead.fadeTime_(1);
)

(
~organicArp = {
    var clk, scaleNotes, scaleBuf, degreeNoise, degree, note, decayTime, env, fmIndex, sig, pan;
    clk = Dust.kr(\density.kr(3));
    scaleNotes = [0, 2, 3, 5, 7, 8, 10];
    scaleBuf = LocalBuf.newFrom(scaleNotes);
    degreeNoise = LFNoise1.kr(0.15).range(0, 14).round(1);
    degree = Latch.kr(degreeNoise, clk);
    note = DegreeToKey.kr(scaleBuf, degree, octave: 12) + \root.kr(48);
    decayTime = Latch.kr(LFNoise1.kr(1).range(0.05, 0.7), clk);
    env = EnvGen.kr(Env.perc(0.005, decayTime, curve: -4), clk, doneAction: 0);
    fmIndex = LFNoise1.kr(0.2).range(0.5, 4.0) * (env * 2.0);
    sig = SinOsc.ar(note.midicps, SinOsc.ar(note.midicps * \ratio.kr(1.5)) * fmIndex);
    pan = Latch.kr(LFNoise1.kr(10).range(-0.8, 0.8), clk);
    sig = Pan2.ar(sig, pan) * env * \amp.kr(0.25);
    LPF.ar(sig, \lpf.kr(4000));
};
~organicArp.fadeTime_(2);
)


// === 4) BUS MASTER ===================================================
(
~master = {
    var dr, bs, ar, pd, ld, oa, vb, dl, sum;
    dr = ~drums.ar(2)      * \drumsLvl.kr(0.55);
    bs = ~bass.ar(2)       * \bassLvl.kr(0.45);
    ar = ~arp.ar(2)        * \arpLvl.kr(0.40);
    pd = ~pad.ar(2)        * \padLvl.kr(0.50);
    ld = ~lead.ar(2)       * \leadLvl.kr(0.35);
    oa = ~organicArp.ar(2) * \organicLvl.kr(0.40);
    vb = ~verb.ar(2)       * \verbLvl.kr(0.50);
    dl = ~delay.ar(2)      * \delayLvl.kr(0.40);
    sum = dr + bs + ar + pd + ld + oa + vb + dl;
    sum = Compander.ar(sum, sum, 0.4, 1, 0.5, 0.01, 0.1);
    sum = (sum * \drive.kr(1.2)).tanh;
    Limiter.ar(sum, 0.92) * \master.kr(0.85);
};
~master.fadeTime_(2).play;
s.meter;
)


// === 5) RESET DE NIVELES ============================================
(
[\bass, \hh, \bd, \clap, \snare, \lead, \arp, \organicArp].do { |k|
    p[k].set(\amp, 0)
};
p[\pad].set(\amp, 0.14);
)


// === 6) TDEF =========================================================
(
Tdef(\macro, {
    var bar = 0;
    loop {
        if (bar == 0) {
            p[\pad].xset(\amp, 0.14);
            [\bass, \hh, \bd, \clap, \snare, \lead, \arp, \organicArp].do { |k|
                p[k].set(\amp, 0)
            };
            p[\bass].xset(\cutoff, 500);
            p[\bd].set(\pat, [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0]);
        };
        if (bar == 5)  { p[\organicArp].xset(\amp, 0.20) };
        if (bar == 8)  { p[\bass].xset(\amp, 0.45) };
        if (bar == 13) {
            p[\hh].xset(\amp, 0.40);
            p[\arp].xset(\amp, 0.30);
        };
        if (bar == 21) {
            p[\bd].set(\pat, [1,0,0,0, 0,0,1,0, 1,0,0,0, 1,0,1,0]);
            p[\bd].xset(\amp, 0.70);
            p[\clap].xset(\amp, 0.50);
            p[\snare].xset(\amp, 0.45);
            p[\lead].xset(\amp, 0.50);
            p[\bass].xset(\cutoff, 2000);
        };
        if (bar == 26) { p[\lead].xset(\amp, 0) };
        if (bar == 29) { p[\bass].xset(\cutoff, 600) };
        bar = (bar + 1) % 34;
        4.wait;
    };
}).play(t, quant: 4);
)


// === BLOQUES AUXILIARES =============================================
// Tdef(\macro).pause;
// Tdef(\macro).resume;
// Tdef(\macro).clear;
//
// ~master.set(\drumsLvl, 0.55);
// ~master.set(\master, 0.75);
//
// ~bd.set(\pat, [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0]);
// ~lead.set(\div, 2);
// ~lead.set(\cutoff, 3000);
//
// ~verb.set(\arpSend, 0.5);
// ~delay.set(\div, 0.5);
//
// ~lfoCutoff = { LFNoise1.kr(0.5).range(400, 4000) };
// ~lead.map(\cutoff, ~lfoCutoff);
//
// currentEnvironment.clear;

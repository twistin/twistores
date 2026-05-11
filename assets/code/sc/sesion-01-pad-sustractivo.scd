p = ProxySpace(
    server: s.boot,
    clock: t = TempoClock(100 / 60).permanent_(true)
).push;

~pad.fadeTime_(4).play;

// Base subtractive pad
~pad = {
    var sig, pans, amp, fib, src, notes;
    notes = \notes.kr([60, 67, 72, 76, 79, 83]);
    fib = [1, 2, 3, 5, 8, 13] * (0.08 / 13);
    pans = LFNoise1.kr(Array.fill(6, { rrand(0.05, 0.3) })).range(-1, 1);
    amp = LFNoise1.kr(fib).range(0, 1);

    src = BrownNoise.ar({ 0.1 } ! 6) + BrownNoise.ar(0.05);
    src = src + SinOsc.ar(notes.midicps, 0, 0.02);

    sig = BPF.ar(src, notes.midicps, 0.005, 1);
    sig = sig * amp * 3;
    sig = Pan2.ar(sig, pans);
    sig = [Mix(sig.flop[0]), Mix(sig.flop[1])];
};

~chords = [
    [60, 67, 72, 76, 79, 83],  // Cmaj7
    [57, 64, 69, 72, 76, 81],  // Am7
    [53, 60, 65, 69, 72, 77],  // Fmaj7
    [55, 62, 67, 71, 74, 79]   // G7
];

Tdef(\armonia, {
    var i = 0;
    loop {
        ~pad.set(\notes, ~chords[i % ~chords.size]);
        i = i + 1;
        8.wait;
    }
}).play;

// Optional resonator sketch
~padRes = {
    var notes, pans, amp, fib, src, rings, sig;
    notes = [40, 45, 60, 67, 72, 76, 79, 83];
    fib = [1, 2, 3, 5, 8, 13, 21, 34] * (0.08 / 34);
    pans = LFNoise1.kr(Array.fill(8, { rrand(0.05, 0.3) })).range(-1, 1);
    amp = LFNoise1.kr(fib).range(0, 1);
    rings = LFNoise1.kr(Array.fill(8, { rrand(0.1, 0.4) })).range(0.5, 6.0);

    src = Dust.ar({ rrand(1.0, 8.0) } ! 8, 0.3);
    sig = Ringz.ar(src, notes.midicps, rings);
    sig = sig * amp * 0.4;
    sig = Pan2.ar(sig, pans);
    sig = [Mix(sig.flop[0]), Mix(sig.flop[1])];
};

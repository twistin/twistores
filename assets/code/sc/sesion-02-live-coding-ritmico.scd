/*
==========================================================================
TWISTORES — Laboratorio de Síntesis con SuperCollider
Sesión 02: Sistema de Live Coding Rítmico (ProxySpace)
==========================================================================
Este patch implementa un sistema rítmico generativo completo corriendo
en el servidor (scsynth) para sincronización perfecta y libre de jitter.

Para correr este código:
1. Asegúrate de iniciar el servidor: s.boot;
2. Activa el entorno de ProxySpace: p = ProxySpace.push(s);
3. Ejecuta cada bloque por separado.
==========================================================================
*/

// ==========================================================================
// 1. EL MOTOR DE TIEMPO
// ==========================================================================

// 1) Velocidad base en BPM
~bpm = { 100 };

// 2) Reloj maestro de control: calcula los Hz dinámicamente
// Multiplicamos por 4 para subdividir a Semicorches (16th notes)
~clkMaster = {
    var hz = (~bpm.kr / 60) * 4;
    Impulse.kr(hz);
};

// 3) Contador global de pasos (0 a infinito)
~cnt16 = {
    PulseCount.kr(~clkMaster.kr.first) - 1;
};


// ==========================================================================
// 2. LAS FUENTES DE SONIDO (Batería y Rejilla)
// ==========================================================================

// --- BD (Bombo / Bass Drum) ---
~bd = {
    var sig, envAmp, envFreq, clk, cnt, pat, gat;
    clk = ~clkMaster.kr.first;
    cnt = ~cnt16.kr.first;
    
    // Secuenciador por rejilla (16 pasos)
    pat = \pat.kr([1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0]);
    gat = clk * Select.kr(cnt % 16, pat);
    
    envAmp = EnvGen.kr(Env.perc(0.002, 0.3, curve: -4), gat);
    envFreq = EnvGen.kr(Env.perc(0.001, 0.05, curve: -8), gat);
    
    sig = SinOsc.ar(envFreq * 120 + 48, 0.5pi) * envAmp;
    sig = sig.distort * 0.6; // Presencia armónica
    sig ! 2;
};

// --- SNARE (Caja / Redoblante) ---
~snare = {
    var sig, noise, tone, envAmp, envTone, clk, cnt, pat, gat;
    clk = ~clkMaster.kr.first;
    cnt = ~cnt16.kr.first;
    pat = \pat.kr([0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0]);
    gat = clk * Select.kr(cnt % 16, pat);
    
    envAmp = EnvGen.kr(Env.perc(0.005, 0.18), gat);
    envTone = EnvGen.kr(Env.perc(0.002, 0.06), gat);
    
    noise = HPF.ar(WhiteNoise.ar, 1200) * envAmp * 0.5;
    tone = SinOsc.ar(envTone * 180 + 160) * envAmp * 0.4;
    
    sig = noise + tone;
    sig ! 2;
};

// --- HH (Hi-hat Cerrado) ---
~hh = {
    var sig, env, clk, cnt, pat, gat;
    clk = ~clkMaster.kr.first;
    cnt = ~cnt16.kr.first;
    pat = \pat.kr([0,0,1,0, 0,0,1,0, 0,1,0,0, 0,0,1,0]);
    gat = clk * Select.kr(cnt % 16, pat);
    
    env = EnvGen.kr(Env.perc(0.002, 0.05, curve: -4), gat);
    sig = BPF.ar(WhiteNoise.ar, 10000, 0.3) * env * 0.25;
    sig ! 2;
};

// --- CLAP (Aplauso Analógico con Multi-Burst) ---
~clap = {
    var sig, env, clk, cnt, pat, gat;
    clk = ~clkMaster.kr.first;
    cnt = ~cnt16.kr.first;
    pat = \pat.kr([0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,1]);
    gat = clk * Select.kr(cnt % 16, pat);
    
    // Envolvente especial: 3 pre-disparos de 10ms + cola de caída
    env = EnvGen.kr(
        Env([0, 1, 0.1, 1, 0.1, 1, 0], [0.01, 0.005, 0.01, 0.005, 0.01, 0.12], -4),
        gat
    );
    
    sig = BPF.ar(WhiteNoise.ar, 1100, 0.4) * env * 0.35;
    sig ! 2;
};


// ==========================================================================
// 3. MEZCLADOR MAESTRO
// ==========================================================================

~drums = {
    var bd = ~bd.ar * \bdVol.kr(0.8);
    var sn = ~snare.ar * \snVol.kr(0.7);
    var hh = ~hh.ar * \hhVol.kr(0.6);
    var cp = ~clap.ar * \cpVol.kr(0.7);
    
    var mix = bd + sn + hh + cp;
    
    // Limitador de salida master
    Limiter.ar(mix * 1.2, 0.95); 
};

// Iniciar reproducción en parlantes
~drums.play;


// ==========================================================================
// 4. ENVÍOS AUXILIARES Y EFECTOS
// ==========================================================================

// --- REVERB AUXILIAR (~verb) ---
~verb = {
    var bd = ~bd.ar(2) * \bdSend.kr(0.0);
    var sn = ~snare.ar(2) * \snSend.kr(0.0);
    var hh = ~hh.ar(2) * \hhSend.kr(0.0);
    var cp = ~clap.ar(2) * \cpSend.kr(0.0);
    
    var input = bd + sn + hh + cp;
    var wet = GVerb.ar(
        input, 
        roomsize: \room.kr(200), 
        revtime: \time.kr(3.5), 
        taillevel: \tail.kr(0.4)
    );
    
    wet = LPF.ar(wet, \lpf.kr(1800)); 
    wet * \masterVol.kr(0.4);
};
~verb.play;

// --- DELAY TIEMPO-SINCRONIZADO (~delay) ---
~delay = {
    var bd = ~bd.ar(2) * \bdSend.kr(0.0);
    var sn = ~snare.ar(2) * \snSend.kr(0.0);
    var hh = ~hh.ar(2) * \hhSend.kr(0.0);
    var cp = ~clap.ar(2) * \cpSend.kr(0.0);
    
    var input = bd + sn + hh + cp;
    
    // Duración de un tiempo en segundos
    var beatDuration = 60 / ~bpm.kr.max(20); 
    
    // Multiplicador de división rítmica. Por defecto: Corchea con Puntillo (0.375)
    var delayTime = beatDuration * \div.kr(0.375); 
    
    var wet = CombC.ar(
        input, 
        maxdelaytime: 2.0, 
        delaytime: delayTime, 
        decaytime: \decay.kr(3.0)
    );
    
    wet = HPF.ar(wet, \hpf.kr(300)); 
    wet * \masterVol.kr(0.5);
};
~delay.play;


// ==========================================================================
// EJEMPLOS DE CONTROL EN VIVO (TWEAKS)
// ==========================================================================
/*
// 1. Modificar patrones sobre la marcha:
~bd.set(\pat, [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0]); // Bombo en negras
~hh.set(\pat, [0,0,1,0, 0,1,1,0, 0,0,1,0, 1,1,0,1]); // Hi-hat síncopas
~clap.set(\pat, [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,1]);

// 2. Modificaciones de tempo:
~bpm = { 140 }; // Acelerar
~bpm = { LFNoise1.kr(0.05).range(80, 165) }; // Modulación fluida del tempo

// 3. Envíos Auxiliares en directo:
~verb.set(\cpSend, 0.8, \snSend, 0.25); // Enviar aplauso y caja a reverb
~delay.set(\hhSend, 0.45, \snSend, 0.35); // Enviar hi-hats y caja a delay

// 4. Parámetros de Efectos:
~delay.set(\div, 0.25); // Delay a semicorcheas
~delay.set(\decay, 8); // Aumentar repeticiones del delay
~verb.set(\room, 300, \time, 6); // Catedral masiva
*/

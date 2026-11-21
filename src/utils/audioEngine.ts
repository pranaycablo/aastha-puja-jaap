// Audio Engine: 10 Types of Sacred Temple Bells and Conch Shells (Web Audio API)

import { BellSoundType, ShankhSoundType, SoundStyleItem, AmbienceSoundType } from '../types';

export const SOUND_STYLES: SoundStyleItem[] = [
  // 5 Types of Bells (घंटी)
  {
    id: 'kashi_brass',
    title: 'काशी विश्वनाथ पीतल घंटी',
    subtitle: 'गूंजती गहरी पीतल ध्वनि • 852Hz आध्यात्मिक आवृत्ति',
    type: 'bell',
    icon: '🔔',
    frequency: '852 Hz'
  },
  {
    id: 'kedarnath_gong',
    title: 'केदारनाथ महाघंट (ब्रॉन्ज गोंग)',
    subtitle: 'गहरा धीर-गंभीर नाद • 432Hz हीलिंग वाइब्रेशन',
    type: 'bell',
    icon: '📿',
    frequency: '432 Hz'
  },
  {
    id: 'vrindavan_garuda',
    title: 'वृंदावन गरुड़ घंटी',
    subtitle: 'मधुर, झंकृत व चंचल आरती घंटी • 1200Hz',
    type: 'bell',
    icon: '✨',
    frequency: '1200 Hz'
  },
  {
    id: 'tibetan_bowl',
    title: 'ॐ नाद सिंगिग बोल (ध्यान घंटी)',
    subtitle: 'अखंड ॐकार कंपन युक्त ध्यान नाद • 528Hz',
    type: 'bell',
    icon: '🥣',
    frequency: '528 Hz'
  },
  {
    id: 'ayodhya_gold',
    title: 'अयोध्या रामलला स्वर्ण घंटी',
    subtitle: 'उज्ज्वल स्वर्ण मिश्रित खनकती पावन ध्वनि • 1050Hz',
    type: 'bell',
    icon: '🪔',
    frequency: '1050 Hz'
  },

  // 5 Types of Conch Horns (शंख)
  {
    id: 'panchjanya',
    title: 'कुरुक्षेत्र पांचजन्य महाशंख',
    subtitle: 'प्रचंड वीर रस शंखनाद • विजय व अभय कारक',
    type: 'shankh',
    icon: '🐚',
    frequency: '220-295 Hz'
  },
  {
    id: 'haridwar_ganga',
    title: 'हरिद्वार गंगा आरती शंख',
    subtitle: 'शुद्ध, मधुर, उत्थानकारी सात्विक शंख ध्वनि',
    type: 'shankh',
    icon: '🌊',
    frequency: '295-340 Hz'
  },
  {
    id: 'mahakal_aghor',
    title: 'उज्जैन महाकाल अघोर शंख',
    subtitle: 'गहरा गर्जना युक्त शंख • समस्त भय नाशक',
    type: 'shankh',
    icon: '💀',
    frequency: '175-230 Hz'
  },
  {
    id: 'rameshwaram_ocean',
    title: 'रामेश्वरम दक्षिणवर्ती शंख',
    subtitle: 'समुद्र की लहरों जैसी तरंगित गुंजायमान ध्वनि',
    type: 'shankh',
    icon: '🏝️',
    frequency: '240-310 Hz'
  },
  {
    id: 'badrinath_horn',
    title: 'बद्रीनाथ दिव्य हिमशंख',
    subtitle: 'हिमालयी उच्च नाद युक्त निर्मल देवशंख',
    type: 'shankh',
    icon: '🏔️',
    frequency: '330-380 Hz'
  }
];

export const SOUND_STYLES_EN: SoundStyleItem[] = [
  // 5 Types of Bells
  {
    id: 'kashi_brass',
    title: 'Kashi Vishwanath Brass Bell',
    subtitle: 'Resonant sacred brass chime • 852Hz spiritual aura',
    type: 'bell',
    icon: '🔔',
    frequency: '852 Hz'
  },
  {
    id: 'kedarnath_gong',
    title: 'Kedarnath Temple Gong',
    subtitle: 'Deep meditative bronze gong • 432Hz healing resonance',
    type: 'bell',
    icon: '📿',
    frequency: '432 Hz'
  },
  {
    id: 'vrindavan_garuda',
    title: 'Vrindavan Garuda Chime',
    subtitle: 'Sweet, sparkling devotional bell • 1200Hz',
    type: 'bell',
    icon: '✨',
    frequency: '1200 Hz'
  },
  {
    id: 'tibetan_bowl',
    title: 'Om Singing Bowl (Singing Bell)',
    subtitle: 'Unbroken meditative Omkar vibration • 528Hz',
    type: 'bell',
    icon: '🥣',
    frequency: '528 Hz'
  },
  {
    id: 'ayodhya_gold',
    title: 'Ayodhya Golden Temple Chime',
    subtitle: 'Pure golden harmonic chime • 1050Hz',
    type: 'bell',
    icon: '🪔',
    frequency: '1050 Hz'
  },

  // 5 Types of Conch Horns
  {
    id: 'panchjanya',
    title: 'Kurukshetra Panchjanya Shankh',
    subtitle: 'Mighty victorious conch blast • Courage & protection',
    type: 'shankh',
    icon: '🐚',
    frequency: '220-295 Hz'
  },
  {
    id: 'haridwar_ganga',
    title: 'Haridwar Ganga Aarti Shankh',
    subtitle: 'Pure, uplifting auspicious conch horn • Sanctifying',
    type: 'shankh',
    icon: '🌊',
    frequency: '295-340 Hz'
  },
  {
    id: 'mahakal_aghor',
    title: 'Ujjain Mahakal Aghor Shankh',
    subtitle: 'Deep roaring conch • Dispels fear and negativity',
    type: 'shankh',
    icon: '💀',
    frequency: '175-230 Hz'
  },
  {
    id: 'rameshwaram_ocean',
    title: 'Rameshwaram Dakshinavarti Shankh',
    subtitle: 'Oceanic surging sacred resonance • Prosperity',
    type: 'shankh',
    icon: '🏝️',
    frequency: '240-310 Hz'
  },
  {
    id: 'badrinath_horn',
    title: 'Badrinath Himalayan Shankh',
    subtitle: 'Crystal-clear alpine divine conch horn • Enlightenment',
    type: 'shankh',
    icon: '🏔️',
    frequency: '330-380 Hz'
  }
];

class DivineAudioEngine {
  private ctx: AudioContext | null = null;
  private noiseBuffer: AudioBuffer | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const unlockAudio = () => {
        try {
          const ctx = this.getContext();
          if (ctx.state === 'suspended') {
            ctx.resume().catch(() => {});
          }
        } catch {}
        window.removeEventListener('touchstart', unlockAudio);
        window.removeEventListener('click', unlockAudio);
      };
      window.addEventListener('touchstart', unlockAudio, { passive: true });
      window.addEventListener('click', unlockAudio, { passive: true });
    }
  }

  public getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private getNoiseBuffer(ctx: AudioContext): AudioBuffer {
    if (!this.noiseBuffer || this.noiseBuffer.sampleRate !== ctx.sampleRate) {
      const duration = 2.5;
      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      this.noiseBuffer = buffer;
    }
    return this.noiseBuffer;
  }

  /**
   * 1 से 5 प्रकार की प्रामाणिक मंदिर पीतल घंटी बजाना
   * (Authentic Temple Brass Bell with double-strike clapper 'तन-तन' impact & lingering harmonic gunj)
   */
  public playTempleBell(style: BellSoundType = 'kashi_brass', volume: number = 0.85) {
    try {
      const ctx = this.getContext();
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      const now = ctx.currentTime;
      const safeVol = Math.min(1.0, Math.max(0.01, volume * 0.9));

      const masterGain = ctx.createGain();
      masterGain.connect(ctx.destination);
      masterGain.gain.setValueAtTime(safeVol, now);

      // Lowpass smoothing filter to give warm brass body without harsh digital hiss
      const bellFilter = ctx.createBiquadFilter();
      bellFilter.type = 'lowpass';
      bellFilter.frequency.setValueAtTime(6200, now);
      bellFilter.connect(masterGain);

      let baseFreq = 1046; // C6 - Classic Indian Pooja / Aarti brass bell
      let humDecay = 2.6;
      let primeDecay = 2.0;

      switch (style) {
        case 'kedarnath_gong':
          // 432Hz deep bronze temple gong
          baseFreq = 432;
          humDecay = 3.6;
          primeDecay = 3.0;
          break;

        case 'vrindavan_garuda':
          // 1280Hz high shimmering cheerful brass bell
          baseFreq = 1280;
          humDecay = 1.9;
          primeDecay = 1.6;
          break;

        case 'tibetan_bowl':
          // 528Hz healing singing bowl with deep pulsating resonance
          baseFreq = 528;
          humDecay = 4.2;
          primeDecay = 3.5;
          break;

        case 'ayodhya_gold':
          // 1150Hz bright golden temple chime
          baseFreq = 1150;
          humDecay = 2.8;
          primeDecay = 2.2;
          break;

        case 'kashi_brass':
        default:
          // 1046Hz authentic Kashi Vishwanath brass pooja bell
          baseFreq = 1046;
          humDecay = 2.8;
          primeDecay = 2.2;
          break;
      }

      // 1. Dual Clapper Strikes (Creating the signature authentic 'तन-तन' sound!)
      const strikes = [
        { timeOffset: 0.0, gainScale: 0.75 },     // 1st strike 'तन'
        { timeOffset: 0.068, gainScale: 1.0 }    // 2nd rebound strike 'तन'
      ];

      strikes.forEach(({ timeOffset, gainScale }) => {
        const strikeTime = now + timeOffset;

        // Strike impact transient (clapper hitting brass)
        try {
          const noise = ctx.createBufferSource();
          noise.buffer = this.getNoiseBuffer(ctx);
          const noiseFilter = ctx.createBiquadFilter();
          noiseFilter.type = 'bandpass';
          noiseFilter.frequency.setValueAtTime(baseFreq * 3.2, strikeTime);
          noiseFilter.Q.setValueAtTime(3.5, strikeTime);

          const noiseGain = ctx.createGain();
          noiseGain.gain.setValueAtTime(0.16 * gainScale, strikeTime);
          noiseGain.gain.exponentialRampToValueAtTime(0.0001, strikeTime + 0.035);

          noise.connect(noiseFilter);
          noiseFilter.connect(noiseGain);
          noiseGain.connect(bellFilter);

          noise.start(strikeTime);
          noise.stop(strikeTime + 0.04);
        } catch (e) {
          // Graceful fallback
        }

        // Classical Acoustic Bell Partials: Prime, Minor 3rd, 5th, Octave, High Chime, Sub-hum
        const harmonics = [
          { mult: 0.5, gain: 0.45 * gainScale, decay: humDecay, detune: 0 },
          { mult: 1.0, gain: 0.7 * gainScale, decay: primeDecay, detune: 0 },
          { mult: 1.0, gain: 0.45 * gainScale, decay: primeDecay, detune: 1.5 }, // Warble beating (गूंज)
          { mult: 1.19, gain: 0.42 * gainScale, decay: primeDecay * 0.75, detune: 0 }, // Minor 3rd (Vedic aura)
          { mult: 1.5, gain: 0.38 * gainScale, decay: primeDecay * 0.65, detune: 0.5 }, // 5th chime
          { mult: 2.0, gain: 0.25 * gainScale, decay: primeDecay * 0.5, detune: 0 }, // Octave
          { mult: 2.76, gain: 0.14 * gainScale, decay: primeDecay * 0.35, detune: 0 }, // Super-octave
          { mult: 3.95, gain: 0.09 * gainScale, decay: 0.25, detune: 0 } // Strike shimmer
        ];

        harmonics.forEach(({ mult, gain, decay, detune }) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(baseFreq * mult + detune, strikeTime);

          oscGain.gain.setValueAtTime(0, strikeTime);
          oscGain.gain.linearRampToValueAtTime(gain, strikeTime + 0.002);
          oscGain.gain.exponentialRampToValueAtTime(0.00005, strikeTime + decay);

          osc.connect(oscGain);
          oscGain.connect(bellFilter);

          osc.start(strikeTime);
          osc.stop(strikeTime + decay);
        });
      });

      // Cleanup nodes after strike sound decays to prevent audio graph memory leak
      setTimeout(() => {
        try {
          bellFilter.disconnect();
          masterGain.disconnect();
        } catch (e) {}
      }, Math.ceil((humDecay + 0.5) * 1000));
    } catch (e) {
      console.warn('Bell audio error:', e);
    }
  }

  /**
   * 6 से 10 प्रकार के पावन शंखनाद बजाना
   * (Authentic Sacred Conch Trumpet with natural breath onset, lip reed acoustics, & holy vibrato)
   */
  public playShankhSound(style: ShankhSoundType = 'panchjanya', volume: number = 1.0) {
    try {
      const ctx = this.getContext();
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      const now = ctx.currentTime + 0.01;
      const duration = 3.6;
      const safeVol = Math.min(1.0, Math.max(0.01, volume * 0.9));

      const masterGain = ctx.createGain();
      masterGain.connect(ctx.destination);

      // Natural breath breathing swell envelope
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.linearRampToValueAtTime(safeVol * 0.7, now + 0.25);
      masterGain.gain.linearRampToValueAtTime(safeVol, now + 0.7);
      masterGain.gain.setValueAtTime(safeVol, now + duration - 0.9);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      // Acoustic pitch definitions per conch style
      let baseFreq = 225;
      let peakFreq = 285;
      let formantFreq = 620;

      switch (style) {
        case 'mahakal_aghor':
          baseFreq = 165;
          peakFreq = 215;
          formantFreq = 520;
          break;
        case 'haridwar_ganga':
          baseFreq = 260;
          peakFreq = 330;
          formantFreq = 780;
          break;
        case 'rameshwaram_ocean':
          baseFreq = 210;
          peakFreq = 275;
          formantFreq = 660;
          break;
        case 'badrinath_horn':
          baseFreq = 290;
          peakFreq = 360;
          formantFreq = 880;
          break;
        case 'panchjanya':
        default:
          baseFreq = 225;
          peakFreq = 285;
          formantFreq = 620;
          break;
      }

      // Conch Horn Formant Bandpass Filter (Simulates spiral conch calcium shell resonance)
      const shellFilter = ctx.createBiquadFilter();
      shellFilter.type = 'bandpass';
      shellFilter.frequency.setValueAtTime(formantFreq, now);
      shellFilter.Q.setValueAtTime(2.6, now);
      shellFilter.connect(masterGain);

      // Natural Human Breath Airflow Noise (Breathing into the conch shell)
      try {
        const breathNoise = ctx.createBufferSource();
        breathNoise.buffer = this.getNoiseBuffer(ctx);
        const breathFilter = ctx.createBiquadFilter();
        breathFilter.type = 'bandpass';
        breathFilter.frequency.setValueAtTime(formantFreq * 1.2, now);
        breathFilter.Q.setValueAtTime(1.8, now);

        const breathGain = ctx.createGain();
        breathGain.gain.setValueAtTime(0.001, now);
        breathGain.gain.linearRampToValueAtTime(0.08, now + 0.35);
        breathGain.gain.setValueAtTime(0.06, now + duration - 0.8);
        breathGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        breathNoise.connect(breathFilter);
        breathFilter.connect(breathGain);
        breathGain.connect(masterGain);

        breathNoise.start(now);
        breathNoise.stop(now + duration);
      } catch (err) {
        // Ignored
      }

      // Sacred Breath Vibrato LFO (4.8Hz human lung & lip modulation)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(4.8, now);
      lfoGain.gain.setValueAtTime(3.8, now); // subtle pitch vibrato (Hz)
      lfo.connect(lfoGain);

      // Warm lip-reed acoustic harmonics (Triangle & Sine for rich natural horn body)
      const harmonics = [
        { mult: 1, type: 'triangle' as OscillatorType, mix: 0.65 },
        { mult: 2, type: 'triangle' as OscillatorType, mix: 0.38 },
        { mult: 3, type: 'sine' as OscillatorType, mix: 0.2 },
        { mult: 4, type: 'sine' as OscillatorType, mix: 0.1 }
      ];

      harmonics.forEach(({ mult, type, mix }) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = type;

        // Realistic blowing pitch scoop (starts ~10% lower, rises up to peak blown resonance)
        const startP = baseFreq * mult;
        const targetP = peakFreq * mult;
        osc.frequency.setValueAtTime(startP, now);
        osc.frequency.exponentialRampToValueAtTime(targetP, now + 0.45);
        osc.frequency.setValueAtTime(targetP, now + duration - 0.7);
        osc.frequency.exponentialRampToValueAtTime(startP * 0.95, now + duration);

        // Connect vibrato to pitch
        lfoGain.connect(osc.frequency);

        oscGain.gain.setValueAtTime(mix, now);

        osc.connect(oscGain);
        oscGain.connect(shellFilter);

        osc.start(now);
        osc.stop(now + duration);
      });

      lfo.start(now);
      lfo.stop(now + duration);

      // Cleanup nodes after shankh sound ends
      setTimeout(() => {
        try {
          shellFilter.disconnect();
          masterGain.disconnect();
        } catch (e) {}
      }, Math.ceil((duration + 0.5) * 1000));
    } catch (e) {
      console.warn('Shankh audio error:', e);
    }
  }

  // ==========================================
  // SACRED BACKGROUND AMBIENCE (अखंड ध्यान वातावरण)
  // ==========================================
  private activeAmbienceType: AmbienceSoundType = 'none';
  private ambienceGainNode: GainNode | null = null;
  private ambienceOscillators: (OscillatorNode | AudioBufferSourceNode)[] = [];

  public getActiveAmbience(): AmbienceSoundType {
    return this.activeAmbienceType;
  }

  public stopAmbience() {
    try {
      if (this.ambienceGainNode && this.ctx) {
        const now = this.ctx.currentTime;
        this.ambienceGainNode.gain.linearRampToValueAtTime(0.0001, now + 0.6);
        setTimeout(() => {
          this.ambienceOscillators.forEach((node) => {
            try {
              node.stop();
              node.disconnect();
            } catch (e) {}
          });
          this.ambienceOscillators = [];
          this.ambienceGainNode = null;
          this.activeAmbienceType = 'none';
        }, 650);
      } else {
        this.activeAmbienceType = 'none';
      }
    } catch (e) {
      this.activeAmbienceType = 'none';
    }
  }

  public startAmbience(type: AmbienceSoundType, volume: number = 0.3) {
    this.setAmbience(type, volume);
  }

  public setAmbience(type: AmbienceSoundType, volume: number = 0.3) {
    // If same type already playing, stop
    if (this.activeAmbienceType === type && type !== 'none') {
      this.stopAmbience();
      return;
    }

    this.stopAmbience();
    if (type === 'none') return;

    try {
      const ctx = this.getContext();
      const now = ctx.currentTime + 0.05;
      const masterGain = ctx.createGain();
      masterGain.connect(ctx.destination);
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.linearRampToValueAtTime(Math.min(0.6, Math.max(0.05, volume)), now + 1.2);

      this.ambienceGainNode = masterGain;
      this.activeAmbienceType = type;
      this.ambienceOscillators = [];

      if (type === 'omkar') {
        // Continuous 432Hz Cosmic Omkar Drone (136.1Hz Om Root + 272.2Hz + 432Hz)
        const freqs = [136.1, 272.2, 432];
        freqs.forEach((f, idx) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();
          osc.type = idx === 0 ? 'triangle' : 'sine';
          osc.frequency.setValueAtTime(f, now);

          // Subtle slow phasing
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.setValueAtTime(0.08 + idx * 0.03, now);
          lfoGain.gain.setValueAtTime(1.5, now);
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);
          lfo.start(now);
          this.ambienceOscillators.push(lfo);

          oscGain.gain.setValueAtTime(idx === 0 ? 0.45 : idx === 1 ? 0.35 : 0.2, now);
          osc.connect(oscGain);
          oscGain.connect(masterGain);
          osc.start(now);
          this.ambienceOscillators.push(osc);
        });
      } else if (type === 'tanpura') {
        // Meditative Indian Tanpura Drone (Pa 196Hz, Sa 130.8Hz, Low Sa 65.4Hz)
        const pitches = [196, 130.81, 130.81, 65.4];
        pitches.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();
          osc.type = i === 3 ? 'sawtooth' : 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(750, now);
          filter.Q.setValueAtTime(3.0, now);

          oscGain.gain.setValueAtTime(i === 3 ? 0.15 : 0.28, now);
          osc.connect(filter);
          filter.connect(oscGain);
          oscGain.connect(masterGain);

          osc.start(now);
          this.ambienceOscillators.push(osc);
        });
      } else if (type === 'ganga') {
        // Sacred Ganga River Stream (Continuous gentle filtered water rush)
        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = this.getNoiseBuffer(ctx);
        noiseSource.loop = true;

        const lowpass = ctx.createBiquadFilter();
        lowpass.type = 'lowpass';
        lowpass.frequency.setValueAtTime(650, now);
        lowpass.Q.setValueAtTime(1.2, now);

        // Water flow modulation
        const waterLfo = ctx.createOscillator();
        const waterLfoGain = ctx.createGain();
        waterLfo.frequency.setValueAtTime(0.22, now);
        waterLfoGain.gain.setValueAtTime(250, now);
        waterLfo.connect(waterLfoGain);
        waterLfoGain.connect(lowpass.frequency);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.35, now);

        noiseSource.connect(lowpass);
        lowpass.connect(noiseGain);
        noiseGain.connect(masterGain);

        waterLfo.start(now);
        noiseSource.start(now);
        this.ambienceOscillators.push(waterLfo);
        this.ambienceOscillators.push(noiseSource);
      }
    } catch (e) {
      console.warn('Ambience start error:', e);
    }
  }

  // ==========================================
  // REAL DEVOTIONAL MUSIC & TANPURA ACCOMPANIMENT (भक्ति संगीत व तानपुरा)
  // ==========================================
  private devotionalMusicGainNode: GainNode | null = null;
  private devotionalMusicNodes: (OscillatorNode | AudioBufferSourceNode)[] = [];
  private devotionalMusicTimer: any = null;
  private isDevotionalMusicActive: boolean = false;

  public isMusicPlaying(): boolean {
    return this.isDevotionalMusicActive;
  }

  public stopDevotionalAccompaniment() {
    this.isDevotionalMusicActive = false;
    if (this.devotionalMusicTimer) {
      clearInterval(this.devotionalMusicTimer);
      this.devotionalMusicTimer = null;
    }
    if (this.devotionalMusicGainNode && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.devotionalMusicGainNode.gain.cancelScheduledValues(now);
        this.devotionalMusicGainNode.gain.setValueAtTime(this.devotionalMusicGainNode.gain.value, now);
        this.devotionalMusicGainNode.gain.linearRampToValueAtTime(0.0001, now + 0.5);
        setTimeout(() => {
          this.devotionalMusicNodes.forEach((node) => {
            try {
              node.stop();
              node.disconnect();
            } catch (e) {}
          });
          this.devotionalMusicNodes = [];
          this.devotionalMusicGainNode = null;
        }, 550);
      } catch (e) {
        this.devotionalMusicGainNode = null;
        this.devotionalMusicNodes = [];
      }
    } else {
      this.devotionalMusicGainNode = null;
      this.devotionalMusicNodes = [];
    }
  }

  public startDevotionalAccompaniment(
    mode: 'mantra_tanpura' | 'chalisa_dhun' | 'aarti_music' = 'mantra_tanpura',
    targetVolume: number = 0.25
  ) {
    this.stopDevotionalAccompaniment();
    this.isDevotionalMusicActive = true;

    try {
      const ctx = this.getContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const now = ctx.currentTime + 0.05;
      const masterGain = ctx.createGain();
      masterGain.connect(ctx.destination);
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.linearRampToValueAtTime(Math.min(0.38, Math.max(0.08, targetVolume)), now + 0.8);
      this.devotionalMusicGainNode = masterGain;

      // 1. Warm Harmonium/Tanpura chord pad in C (Sa: 130.81, Pa: 196.0, Sa': 261.63, Shuddha Ga: 164.81)
      const baseFreqs =
        mode === 'aarti_music'
          ? [130.81, 196.0, 261.63, 392.0] // Bright celebratory Sa-Pa
          : mode === 'chalisa_dhun'
          ? [130.81, 164.81, 196.0, 261.63] // Sweet soulful Bilawal triad Sa-Ga-Pa-Sa'
          : [130.81, 196.0, 261.63, 65.41]; // Meditative classic Indian Tanpura

      baseFreqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = idx === 0 || idx === 1 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Acoustic lowpass filter: warm devotional resonance
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(mode === 'aarti_music' ? 820 : 600, now);
        filter.Q.setValueAtTime(2.2, now);

        // Gentle subtle choral vibrato
        const vibrato = ctx.createOscillator();
        const vibratoGain = ctx.createGain();
        vibrato.frequency.setValueAtTime(0.12 + idx * 0.04, now);
        vibratoGain.gain.setValueAtTime(1.1, now);
        vibrato.connect(vibratoGain);
        vibratoGain.connect(osc.frequency);
        vibrato.start(now);
        this.devotionalMusicNodes.push(vibrato);

        oscGain.gain.setValueAtTime(0.22 / baseFreqs.length, now);
        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start(now);
        this.devotionalMusicNodes.push(osc);
      });

      // 2. Continuous 432Hz Sacred Cosmic Omkar resonance
      const omOsc = ctx.createOscillator();
      const omGain = ctx.createGain();
      omOsc.type = 'sine';
      omOsc.frequency.setValueAtTime(432, now);
      omGain.gain.setValueAtTime(0.06, now);
      omOsc.connect(omGain);
      omGain.connect(masterGain);
      omOsc.start(now);
      this.devotionalMusicNodes.push(omOsc);

      // 3. For Aarti and Chalisa: Subtle rhythmic temple bell / manjira chime
      if (mode === 'aarti_music' || mode === 'chalisa_dhun') {
        const chimeIntervalMs = mode === 'aarti_music' ? 2600 : 4200;
        this.devotionalMusicTimer = setInterval(() => {
          if (!this.isDevotionalMusicActive) return;
          try {
            this.playTempleBell('vrindavan_garuda', 0.16);
          } catch (e) {}
        }, chimeIntervalMs);
      }
    } catch (e) {
      console.warn('Devotional music start error:', e);
    }
  }

  /**
   * Haptic vibration
   */
  public triggerVibration(type: 'bead' | 'malaComplete') {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        if (type === 'bead') {
          navigator.vibrate(35);
        } else if (type === 'malaComplete') {
          navigator.vibrate([120, 60, 240]);
        }
      } catch (err) {
        // Ignored
      }
    }
  }
}

export const audioEngine = new DivineAudioEngine();

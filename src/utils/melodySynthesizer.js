// Web Audio API Melody Synthesizer for 100% Reliable Patriotic Music Playback

class MelodySynthesizer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.currentTrackId = null;
    this.timeoutIds = [];
    this.activeNodes = [];
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  stop() {
    this.isPlaying = false;
    this.timeoutIds.forEach(id => clearTimeout(id));
    this.timeoutIds = [];
    this.activeNodes.forEach(node => {
      try {
        node.stop();
        node.disconnect();
      } catch (e) {}
    });
    this.activeNodes = [];
  }

  // Play a single musical note with harmonium / flute warm envelope
  playTone(freq, startTime, duration, volume = 0.18, type = 'triangle') {
    if (!this.ctx || !this.isPlaying) return;

    try {
      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Main melody oscillator
      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      // Sub-harmonic warm tone (harmonium / cello backing)
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq / 2, startTime);

      // Attack, Decay, Sustain, Release (ADSR)
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(volume, startTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(volume * 0.75, startTime + duration * 0.7);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc2.start(startTime);
      osc.stop(startTime + duration);
      osc2.stop(startTime + duration);

      this.activeNodes.push(osc, osc2);
    } catch (e) {}
  }

  // Play full patriotic song composition
  playTrack(trackId, onTimeUpdate, onEnded) {
    this.stop();
    this.init();
    if (!this.ctx) return;

    this.isPlaying = true;
    this.currentTrackId = trackId;

    const notes = this.getSongNotes(trackId);
    if (!notes || notes.length === 0) return;

    const startAudioTime = this.ctx.currentTime + 0.1;
    let totalDuration = 0;

    notes.forEach((item) => {
      const noteStart = startAudioTime + item.time;
      this.playTone(item.freq, noteStart, item.dur, item.vol || 0.22, item.type || 'triangle');
      const endTime = item.time + item.dur;
      if (endTime > totalDuration) totalDuration = endTime;
    });

    // Loop or continuous progression
    const loopTimer = setTimeout(() => {
      if (this.isPlaying) {
        // Re-loop melody smoothly
        this.playTrack(trackId, onTimeUpdate, onEnded);
      }
    }, totalDuration * 1000);

    this.timeoutIds.push(loopTimer);
  }

  getSongNotes(trackId) {
    // Note frequencies: C4=261.63, D4=293.66, E4=329.63, F4=349.23, G4=392.00, A4=440.00, B4=493.88, C5=523.25, D5=587.33, E5=659.25, F5=698.46, G5=783.99
    switch (trackId) {
      case 'track-1': // Ae Mere Watan Ke Logon (Iconic melody)
        return [
          // "Aye mere watan ke logo"
          { freq: 392.00, time: 0.0, dur: 0.6, vol: 0.22 }, // G4 (Aye)
          { freq: 440.00, time: 0.6, dur: 0.5, vol: 0.22 }, // A4 (me-)
          { freq: 493.88, time: 1.1, dur: 0.8, vol: 0.25 }, // B4 (-re)
          { freq: 523.25, time: 2.0, dur: 0.6, vol: 0.28 }, // C5 (wa-)
          { freq: 493.88, time: 2.6, dur: 0.6, vol: 0.24 }, // B4 (-tan)
          { freq: 440.00, time: 3.2, dur: 0.8, vol: 0.22 }, // A4 (ke)
          { freq: 392.00, time: 4.1, dur: 1.2, vol: 0.26 }, // G4 (lo-go)
          
          // "Zara aankh mein bhar lo paani"
          { freq: 392.00, time: 5.6, dur: 0.5, vol: 0.22 }, // G4 (Za-)
          { freq: 440.00, time: 6.1, dur: 0.5, vol: 0.22 }, // A4 (-ra)
          { freq: 493.88, time: 6.6, dur: 0.7, vol: 0.25 }, // B4 (aankh)
          { freq: 523.25, time: 7.4, dur: 0.6, vol: 0.28 }, // C5 (mein)
          { freq: 587.33, time: 8.0, dur: 0.9, vol: 0.30 }, // D5 (bhar)
          { freq: 523.25, time: 9.0, dur: 0.6, vol: 0.26 }, // C5 (lo)
          { freq: 493.88, time: 9.6, dur: 0.7, vol: 0.24 }, // B4 (paa-)
          { freq: 440.00, time: 10.4, dur: 1.4, vol: 0.22 }, // A4 (-ni)

          // "Jo shaheed hue hain unki..."
          { freq: 523.25, time: 12.2, dur: 0.6, vol: 0.26 }, // C5
          { freq: 587.33, time: 12.8, dur: 0.6, vol: 0.28 }, // D5
          { freq: 659.25, time: 13.4, dur: 0.9, vol: 0.30 }, // E5
          { freq: 587.33, time: 14.4, dur: 0.7, vol: 0.26 }, // D5
          { freq: 523.25, time: 15.2, dur: 0.8, vol: 0.24 }, // C5
          { freq: 493.88, time: 16.1, dur: 0.8, vol: 0.22 }, // B4
          { freq: 440.00, time: 17.0, dur: 1.6, vol: 0.25 }, // A4

          // "Zara yaad karo qurbani"
          { freq: 392.00, time: 19.0, dur: 0.6, vol: 0.22 }, // G4
          { freq: 440.00, time: 19.6, dur: 0.6, vol: 0.24 }, // A4
          { freq: 493.88, time: 20.2, dur: 0.8, vol: 0.26 }, // B4
          { freq: 523.25, time: 21.1, dur: 0.8, vol: 0.28 }, // C5
          { freq: 493.88, time: 22.0, dur: 0.8, vol: 0.24 }, // B4
          { freq: 440.00, time: 22.9, dur: 0.8, vol: 0.22 }, // A4
          { freq: 392.00, time: 23.8, dur: 2.2, vol: 0.28 }  // G4 (Held with warm reverb)
        ];

      case 'track-2': // Maa Tujhe Salaam (Vande Mataram)
        return [
          // "Vande... Mataram..."
          { freq: 261.63, time: 0.0, dur: 0.8, vol: 0.25 }, // C4
          { freq: 329.63, time: 0.8, dur: 0.8, vol: 0.28 }, // E4
          { freq: 392.00, time: 1.6, dur: 1.4, vol: 0.32 }, // G4 (Van-de)
          { freq: 349.23, time: 3.2, dur: 0.8, vol: 0.26 }, // F4
          { freq: 329.63, time: 4.0, dur: 1.5, vol: 0.30 }, // E4 (Ma-ta-ram)

          // "Maa Tujhe Salaam"
          { freq: 392.00, time: 6.0, dur: 0.6, vol: 0.26 }, // G4
          { freq: 440.00, time: 6.7, dur: 0.6, vol: 0.28 }, // A4
          { freq: 523.25, time: 7.4, dur: 1.2, vol: 0.34 }, // C5 (Maa)
          { freq: 493.88, time: 8.8, dur: 0.8, vol: 0.28 }, // B4 (Tu-jhe)
          { freq: 440.00, time: 9.7, dur: 1.8, vol: 0.30 }  // A4 (Sa-laam)
        ];

      case 'track-3': // Teri Mitti (Kesari)
        return [
          // "O mai meri kya fikar tujhe..."
          { freq: 440.00, time: 0.0, dur: 0.6, vol: 0.22 }, // A4
          { freq: 493.88, time: 0.6, dur: 0.6, vol: 0.24 }, // B4
          { freq: 523.25, time: 1.2, dur: 1.0, vol: 0.28 }, // C5
          { freq: 493.88, time: 2.3, dur: 0.6, vol: 0.24 }, // B4
          { freq: 440.00, time: 3.0, dur: 1.2, vol: 0.26 }, // A4

          // "Teri mitti mein mil jawaan..."
          { freq: 392.00, time: 4.6, dur: 0.6, vol: 0.22 }, // G4
          { freq: 440.00, time: 5.2, dur: 0.6, vol: 0.25 }, // A4
          { freq: 523.25, time: 5.9, dur: 0.8, vol: 0.28 }, // C5
          { freq: 587.33, time: 6.8, dur: 0.9, vol: 0.30 }, // D5
          { freq: 523.25, time: 7.8, dur: 0.7, vol: 0.26 }, // C5
          { freq: 493.88, time: 8.6, dur: 1.6, vol: 0.28 }  // B4
        ];

      case 'track-4': // Sandese Aate Hai
        return [
          // "Sandese aate hain, hamein tadpaate hain"
          { freq: 329.63, time: 0.0, dur: 0.6, vol: 0.24 }, // E4
          { freq: 349.23, time: 0.6, dur: 0.6, vol: 0.24 }, // F4
          { freq: 392.00, time: 1.2, dur: 1.0, vol: 0.28 }, // G4
          { freq: 392.00, time: 2.3, dur: 0.6, vol: 0.28 }, // G4
          { freq: 440.00, time: 3.0, dur: 0.6, vol: 0.26 }, // A4
          { freq: 392.00, time: 3.7, dur: 1.2, vol: 0.26 }  // G4
        ];

      case 'track-5': // Bharat Humko Jaan Se Pyara Hai
        return [
          // "Bharat humko jaan se pyara hai"
          { freq: 261.63, time: 0.0, dur: 0.6, vol: 0.22 }, // C4
          { freq: 293.66, time: 0.6, dur: 0.6, vol: 0.24 }, // D4
          { freq: 329.63, time: 1.2, dur: 0.9, vol: 0.28 }, // E4
          { freq: 349.23, time: 2.2, dur: 0.6, vol: 0.26 }, // F4
          { freq: 392.00, time: 2.9, dur: 1.2, vol: 0.30 }, // G4
          { freq: 349.23, time: 4.2, dur: 0.6, vol: 0.26 }, // F4
          { freq: 329.63, time: 4.9, dur: 1.4, vol: 0.28 }  // E4
        ];

      case 'track-6': // Jana Gana Mana (National Anthem)
      default:
        return [
          // "Jana-gana-mana adhinayaka jaya he"
          { freq: 261.63, time: 0.0, dur: 0.45, vol: 0.25 }, // C4
          { freq: 293.66, time: 0.5, dur: 0.45, vol: 0.25 }, // D4
          { freq: 329.63, time: 1.0, dur: 0.45, vol: 0.28 }, // E4
          { freq: 329.63, time: 1.5, dur: 0.45, vol: 0.28 }, // E4
          { freq: 329.63, time: 2.0, dur: 0.45, vol: 0.28 }, // E4
          { freq: 329.63, time: 2.5, dur: 0.45, vol: 0.28 }, // E4
          { freq: 329.63, time: 3.0, dur: 0.45, vol: 0.28 }, // E4
          { freq: 293.66, time: 3.5, dur: 0.45, vol: 0.25 }, // D4
          { freq: 329.63, time: 4.0, dur: 0.45, vol: 0.28 }, // E4
          { freq: 349.23, time: 4.5, dur: 0.8, vol: 0.30 },  // F4

          // "Bharata bhagya vidhata"
          { freq: 329.63, time: 5.5, dur: 0.5, vol: 0.28 },  // E4
          { freq: 293.66, time: 6.1, dur: 0.5, vol: 0.25 },  // D4
          { freq: 293.66, time: 6.7, dur: 0.5, vol: 0.25 },  // D4
          { freq: 246.94, time: 7.3, dur: 0.5, vol: 0.22 },  // B3
          { freq: 293.66, time: 7.9, dur: 0.5, vol: 0.25 },  // D4
          { freq: 261.63, time: 8.5, dur: 1.2, vol: 0.30 }   // C4
        ];
    }
  }
}

export const melodySynth = new MelodySynthesizer();

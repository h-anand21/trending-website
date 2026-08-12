// High-Fidelity Polyphonic Web Audio Synthesizer for 6 Iconic Patriotic Melodies

class PatrioticAudioEngine {
  constructor() {
    this.ctx = null;
    this.gainNode = null;
    this.isPlaying = false;
    this.currentTrackId = null;
    this.noteTimeout = null;
    this.melodyIndex = 0;
    this.volume = 0.8;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.gainNode.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val / 100));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  getFreq(note) {
    const notes = {
      'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
      'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99,
      'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
      'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99,
      'G5': 783.99, 'G#5': 830.61, 'A5': 880.00, 'B5': 987.77, 'C6': 1046.50
    };
    return notes[note] || 440;
  }

  playNote(noteName, durationSec = 0.5, time = null) {
    if (!this.ctx || !this.isPlaying || this.ctx.state !== 'running') return;
    const startTime = time || this.ctx.currentTime;
    const freq = this.getFreq(noteName);

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const osc3 = this.ctx.createOscillator();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, startTime);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, startTime);

    osc3.type = 'sawtooth';
    osc3.frequency.setValueAtTime(freq, startTime);

    const noteGain = this.ctx.createGain();
    noteGain.gain.setValueAtTime(0.001, startTime);
    noteGain.gain.exponentialRampToValueAtTime(0.35, startTime + 0.05);
    noteGain.gain.exponentialRampToValueAtTime(0.2, startTime + durationSec * 0.7);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + durationSec);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1600, startTime);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    osc3.connect(noteGain);

    noteGain.connect(filter);
    filter.connect(this.gainNode);

    osc1.start(startTime);
    osc2.start(startTime);
    osc3.start(startTime);

    osc1.stop(startTime + durationSec + 0.1);
    osc2.stop(startTime + durationSec + 0.1);
    osc3.stop(startTime + durationSec + 0.1);
  }

  getMelody(trackId) {
    switch (trackId) {
      case 1: // Ae Mere Watan Ke Logon
        return [
          { note: 'G4', dur: 0.6 }, { note: 'A4', dur: 0.6 }, { note: 'B4', dur: 0.8 },
          { note: 'D5', dur: 0.8 }, { note: 'B4', dur: 0.6 }, { note: 'A4', dur: 0.6 },
          { note: 'G4', dur: 1.2 }, { note: 'E4', dur: 0.6 }, { note: 'G4', dur: 0.6 },
          { note: 'A4', dur: 1.0 }, { note: 'G4', dur: 0.6 }, { note: 'E4', dur: 0.6 },
          { note: 'D4', dur: 1.4 }, { note: 'D4', dur: 0.5 }, { note: 'E4', dur: 0.5 },
          { note: 'G4', dur: 0.8 }, { note: 'A4', dur: 0.8 }, { note: 'G4', dur: 1.6 }
        ];

      case 2: // Maa Tujhe Salaam
        return [
          { note: 'C4', dur: 0.4 }, { note: 'E4', dur: 0.4 }, { note: 'G4', dur: 0.6 },
          { note: 'C5', dur: 0.8 }, { note: 'B4', dur: 0.4 }, { note: 'A4', dur: 0.6 },
          { note: 'G4', dur: 1.2 }, { note: 'F4', dur: 0.4 }, { note: 'A4', dur: 0.6 },
          { note: 'G4', dur: 0.8 }, { note: 'E4', dur: 0.8 }, { note: 'D4', dur: 0.6 },
          { note: 'C4', dur: 1.6 }, { note: 'G4', dur: 0.6 }, { note: 'C5', dur: 1.2 }
        ];

      case 3: // Sandese Aate Hai
        return [
          { note: 'E4', dur: 0.5 }, { note: 'G4', dur: 0.5 }, { note: 'A4', dur: 0.8 },
          { note: 'B4', dur: 0.8 }, { note: 'A4', dur: 0.5 }, { note: 'G4', dur: 0.5 },
          { note: 'E4', dur: 1.2 }, { note: 'D4', dur: 0.6 }, { note: 'E4', dur: 0.6 },
          { note: 'G4', dur: 1.0 }, { note: 'F#4', dur: 0.6 }, { note: 'D4', dur: 1.4 },
          { note: 'E4', dur: 1.6 }
        ];

      case 4: // Bharat Humko Jaan Se Pyara Hai
        return [
          { note: 'D4', dur: 0.6 }, { note: 'F#4', dur: 0.6 }, { note: 'A4', dur: 0.8 },
          { note: 'B4', dur: 0.8 }, { note: 'A4', dur: 0.6 }, { note: 'F#4', dur: 0.6 },
          { note: 'D4', dur: 1.4 }, { note: 'E4', dur: 0.6 }, { note: 'G4', dur: 0.6 },
          { note: 'F#4', dur: 0.8 }, { note: 'E4', dur: 0.8 }, { note: 'D4', dur: 1.6 }
        ];

      case 5: // Chak De India
        return [
          { note: 'C4', dur: 0.4 }, { note: 'E4', dur: 0.4 }, { note: 'G4', dur: 0.6 },
          { note: 'C5', dur: 0.8 }, { note: 'C5', dur: 0.4 }, { note: 'B4', dur: 0.4 },
          { note: 'C5', dur: 1.0 }, { note: 'G4', dur: 0.6 }, { note: 'A4', dur: 0.6 },
          { note: 'G4', dur: 0.6 }, { note: 'E4', dur: 0.8 }, { note: 'C4', dur: 1.4 }
        ];

      case 6: // Teri Mitti
        return [
          { note: 'E4', dur: 0.6 }, { note: 'G#4', dur: 0.6 }, { note: 'B4', dur: 0.8 },
          { note: 'E5', dur: 1.0 }, { note: 'D#5', dur: 0.6 }, { note: 'B4', dur: 0.8 },
          { note: 'G#4', dur: 1.2 }, { note: 'A4', dur: 0.6 }, { note: 'B4', dur: 0.6 },
          { note: 'G#4', dur: 0.8 }, { note: 'F#4', dur: 0.8 }, { note: 'E4', dur: 1.6 }
        ];

      default:
        return [
          { note: 'G4', dur: 0.6 }, { note: 'A4', dur: 0.6 }, { note: 'B4', dur: 0.8 },
          { note: 'D5', dur: 0.8 }, { note: 'G4', dur: 1.4 }
        ];
    }
  }

  playTrack(trackId) {
    this.init();
    this.stop();
    this.isPlaying = true;
    this.currentTrackId = trackId;
    this.melodyIndex = 0;

    const melody = this.getMelody(trackId);

    const scheduleNext = () => {
      if (!this.isPlaying) return;
      const currentNote = melody[this.melodyIndex];
      this.playNote(currentNote.note, currentNote.dur);

      this.melodyIndex = (this.melodyIndex + 1) % melody.length;
      this.noteTimeout = setTimeout(scheduleNext, currentNote.dur * 1000);
    };

    // If context state is ready, start immediately
    if (this.ctx && this.ctx.state === 'running') {
      scheduleNext();
    } else if (this.ctx) {
      this.ctx.resume().then(() => scheduleNext()).catch(() => scheduleNext());
    }
  }

  stop() {
    this.isPlaying = false;
    if (this.noteTimeout) {
      clearTimeout(this.noteTimeout);
      this.noteTimeout = null;
    }
  }
}

export const patrioticSynth = new PatrioticAudioEngine();

// High-Fidelity Synthesized Web Audio Effects for Patriotic Interactions

class SoundEngine {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Regal Patriotic Bugle Salute Fanfare
  playSaluteChime() {
    try {
      this.init();
      if (!this.ctx || this.ctx.state !== 'running') return;

      const now = this.ctx.currentTime;
      // Majestic 4-note Bugle Salute Arpeggio (G3 -> C4 -> E4 -> G4 -> C5)
      const notes = [
        { freq: 196.00, time: 0.0, dur: 0.22, vol: 0.15 }, // G3
        { freq: 261.63, time: 0.2, dur: 0.22, vol: 0.18 }, // C4
        { freq: 329.63, time: 0.4, dur: 0.25, vol: 0.20 }, // E4
        { freq: 392.00, time: 0.62, dur: 0.35, vol: 0.22 }, // G4
        { freq: 523.25, time: 0.95, dur: 1.4, vol: 0.28 }  // C5
      ];

      notes.forEach(({ freq, time, dur, vol }) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + time);

        gain.gain.setValueAtTime(0.001, now + time);
        gain.gain.exponentialRampToValueAtTime(vol, now + time + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + time);
        osc.stop(now + time + dur);
      });
    } catch (e) {}
  }

  // Subtle glass UI click
  playClick() {
    try {
      this.init();
      if (!this.ctx || this.ctx.state !== 'running') return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.05);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  }
}

export const soundFx = new SoundEngine();

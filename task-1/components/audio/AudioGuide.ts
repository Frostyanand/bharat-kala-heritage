// Web Audio API procedural Tanpura drone for authentic Indian museum ambiance
// Uses C# (138.59 Hz) and G# (207.65 Hz) harmonic resonance

class ProceduralTanpura {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private oscillators: OscillatorNode[] = [];
  private gainNode: GainNode | null = null;

  public init() {
    if (typeof window === 'undefined') return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx && !this.ctx) {
      this.ctx = new AudioCtx();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    // Master gain
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 3); // Soft fade-in
    this.gainNode.connect(this.ctx.destination);

    // Fundamental frequencies: Pa (G#3 = ~207.65Hz), Sa (C#3 = ~138.59Hz, C#4 = ~277.18Hz)
    const notes = [
      { freq: 138.59, detune: 0, type: 'triangle' as OscillatorType, pan: -0.3 },
      { freq: 138.59, detune: 4, type: 'sine' as OscillatorType, pan: 0.3 },
      { freq: 207.65, detune: -3, type: 'triangle' as OscillatorType, pan: 0.4 },
      { freq: 277.18, detune: 2, type: 'sine' as OscillatorType, pan: -0.4 },
      { freq: 415.30, detune: 0, type: 'sine' as OscillatorType, pan: 0.1 } // soft overtone
    ];

    this.oscillators = [];

    notes.forEach((note) => {
      if (!this.ctx || !this.gainNode) return;
      const osc = this.ctx.createOscillator();
      const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
      const noteGain = this.ctx.createGain();
      
      osc.type = note.type;
      osc.frequency.setValueAtTime(note.freq, this.ctx.currentTime);
      osc.detune.setValueAtTime(note.detune, this.ctx.currentTime);

      noteGain.gain.setValueAtTime(0.2, this.ctx.currentTime);

      if (panner) {
        panner.pan.value = note.pan;
        osc.connect(noteGain);
        noteGain.connect(panner);
        panner.connect(this.gainNode);
      } else {
        osc.connect(noteGain);
        noteGain.connect(this.gainNode);
      }

      osc.start();
      this.oscillators.push(osc);
    });

    this.isPlaying = true;
  }

  public stop() {
    if (!this.ctx || !this.gainNode) return;
    
    // Soft fade-out
    this.gainNode.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1.5);
    setTimeout(() => {
      this.oscillators.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // ignore
        }
      });
      this.oscillators = [];
      this.isPlaying = false;
    }, 1600);
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const tanpuraAudio = new ProceduralTanpura();

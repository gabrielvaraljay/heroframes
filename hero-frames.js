class HeroFrames {
  constructor(container, framesPath) {
    this.container = container;
    this.framesPath = framesPath;
    this.frames = [];
    this.canvas = null;
    this.ctx = null;
    this.frameIndex = 0;
    
    this.init();
  }

  async init() {
    this.createElements();
    await this.loadFrames();
    this.setupAnimation();
  }

  createElements() {
    this.container.style.position = 'relative';
    this.container.style.height = '300vh';
    
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100vh';
    this.canvas.style.zIndex = '-1';
    
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
  }

  async loadFrames() {
    let frameIndex = 1;
    
    while (true) {
      try {
        const img = new Image();
        const frameNumber = frameIndex.toString().padStart(3, '0');
        const src = `${this.framesPath}/frame-${frameNumber}.jpg`;
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
        
        this.frames.push(img);
        frameIndex++;
      } catch {
        break;
      }
    }
  }

  drawFrame(frameIndex) {
    if (!this.canvas || !this.ctx || this.frames.length === 0) return;
    
    const frame = this.frames[Math.floor(frameIndex)];
    if (!frame) return;
    
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    const scale = Math.max(
      this.canvas.width / frame.width,
      this.canvas.height / frame.height
    );
    
    const x = (this.canvas.width - frame.width * scale) / 2;
    const y = (this.canvas.height - frame.height * scale) / 2;
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(frame, x, y, frame.width * scale, frame.height * scale);
  }

  setupAnimation() {
    if (this.frames.length === 0) return;
    
    this.drawFrame(0);

    gsap.timeline({
      scrollTrigger: {
        trigger: this.container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          const frameIndex = self.progress * (this.frames.length - 1);
          this.frameIndex = frameIndex;
          this.drawFrame(frameIndex);
        }
      }
    });

    window.addEventListener('resize', () => this.drawFrame(this.frameIndex));
  }
}

// Usage
// new HeroFrames(document.getElementById('hero-container'), '/path/to/frames');
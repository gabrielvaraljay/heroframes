# HeroFrames

Premium scroll-driven frame sequence animation library for creating cinematic hero sections.

## 🎯 What is this project?

HeroFrames is a JavaScript library that enables Apple-style scroll-driven animations from image sequences. Perfect for hero sections, product showcases, and interactive storytelling.

## 💡 Inspiration & Philosophy

This project was inspired by the excellent [Builder.io 3D GSAP tutorial](https://www.builder.io/blog/3d-gsap), but with a different philosophy:

- **No React dependency** - Most small developers work with HTML5
- **Minimal dependencies** - Only GSAP (which you probably already use)
- **Speed first** - Optimized for performance over features
- **Simple setup** - Copy one file, add frames, done

While React is powerful, this library targets the majority of developers who need fast, lightweight solutions without framework overhead.

## 🚀 Quick Start

### Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
</head>
<body>
  <div id="hero-container"></div>
  
  <script src="hero-frames.js"></script>
  <script>
    gsap.registerPlugin(ScrollTrigger);
    new HeroFrames(document.getElementById('hero-container'), './frames');
  </script>
</body>
</html>
```

## 📁 Project Structure

```
your-project/
├── hero-frames.js          # Main library
├── index.html             # Your HTML file
└── frames/                # Frame images
    ├── frame-001.webp
    ├── frame-002.webp
    └── ...
```

## 🛠️ Setting Up a New Project

### Step 1: Copy Required Files

1. **Copy `hero-frames.js`** to your project root
2. **Create `frames/` folder** for your images
3. **Add your HTML file** with the basic setup above

### Step 2: Prepare Your Frames

#### Frame Requirements
- **Location:** `frames/` folder
- **Format:** WebP (recommended) or JPEG
- **Naming:** `frame-001.webp`, `frame-002.webp`, etc.
- **Resolution:** 1920x1080 or higher
- **Compression:** 80-85% quality for WebP

#### Frame Optimization Tips
- Use WebP for best compression
- Serve from CDN for better performance
- Enable aggressive caching
- Consider progressive loading

### Step 3: Configure Your Animation

```javascript
// Basic configuration
new HeroFrames(document.getElementById('hero-container'), './frames');

// The library will automatically:
// - Detect available frames (starting from frame-001.webp)
// - Create canvas element
// - Set up scroll-driven animation
// - Handle responsive scaling
```

## 🎨 Usage Examples

### Basic Hero Section

```html
<div id="hero-container"></div>
<div class="content">
  <h1>Your content here</h1>
</div>

<script>
  new HeroFrames(document.getElementById('hero-container'), './frames');
</script>
```

### Custom Frame Range

To use frames 100-250 (modify the `loadFrames()` method in hero-frames.js):

```javascript
// In hero-frames.js, change the loop:
for (let i = 100; i <= 250; i++) {
  // ... frame loading logic
}
```

## 💎 Premium Best Practices

**To make your implementation feel truly premium, follow these critical guidelines:**

### 1. Placement Strategy
```html
<!-- ❌ DON'T: Place at the very top -->
<div id="hero-frames"></div>
<div class="content">...</div>

<!-- ✅ DO: Place lower on page for preloading -->
<header>Your navigation</header>
<section class="intro">Some content first</section>
<div id="hero-frames"></div> <!-- Frames have time to preload -->
```

**Why:** Avoid the "Flash era" blank canvas. Give frames time to preload while users read initial content.

### 2. Never Hijack Scroll
```javascript
// ✅ CORRECT: Let native scroll drive animation
gsap.timeline({
  scrollTrigger: {
    trigger: container,
    scrub: 1,  // Smooth scrubbing
    start: 'top bottom',
    end: 'bottom top'
  }
});

// ❌ NEVER DO: Override native scroll
window.addEventListener('scroll', (e) => {
  e.preventDefault(); // DON'T DO THIS!
});
```

### 3. Smart Device Fallbacks
```javascript
// Apple-style device detection
const isMobile = window.innerWidth < 768;
const isSlowDevice = navigator.hardwareConcurrency < 4;
const isSlowConnection = navigator.connection?.effectiveType === '2g';

if (isMobile || isSlowDevice || isSlowConnection) {
  // Show static hero image instead
  showStaticHero('/hero-static.webp');
} else {
  // Full frame sequence animation
  new HeroFrames(container, './frames');
}
```

### 4. Asset Optimization (Critical)
```javascript
// Frame specifications for premium feel:
// - WebP format, 85% quality
// - 1920x1080 minimum resolution
// - Serve from CDN with aggressive caching
// - Enable HTTP/2 for parallel loading

// CDN headers example:
// Cache-Control: public, max-age=31536000
// Content-Encoding: br (Brotli compression)
```

### 5. Performance Testing Requirements
```javascript
// Test on these devices minimum:
// - iPhone 8 (slower hardware)
// - Mid-range Android (3-4GB RAM)
// - Throttled network (Fast 3G)

// Performance targets:
// - 60fps scroll performance
// - <3s initial load time
// - <100MB total memory usage
```

## ⚡ Technical Performance

### Image Optimization
- **WebP > AVIF > JPEG** for compression
- Progressive WebP for faster perceived loading
- CDN with global edge locations
- Aggressive browser caching (1 year+)

### Loading Strategy
- Preload first 10-15 frames immediately
- Lazy load remaining frames during scroll
- Show elegant loading state, never blank canvas
- Implement intersection observer for trigger timing

## 📱 Responsive Design

### Mobile Considerations
- Reduce frame count on mobile (30-60 frames)
- Lower quality for smaller screens
- Consider static fallback for very slow devices
- Test on actual devices, not just browser dev tools

### Breakpoint Strategy
```javascript
// Example responsive configuration
if (window.innerWidth < 768) {
  // Mobile: Use fewer frames or static image
  showFallbackImage('/hero-static.webp');
} else {
  // Desktop: Full animation
  new HeroFrames(container, './frames');
}
```

## 🔧 Configuration Options

The current implementation uses these defaults:
- **Container height:** 300vh (for scroll distance)
- **Canvas:** Fixed position, full viewport
- **Scroll trigger:** Top to bottom of container
- **Frame format:** WebP with 3-digit padding (001, 002, etc.)

## 🧪 Testing

### Performance Testing
1. **Test on actual low-end devices** (not just browser throttling)
2. **Monitor frame rate** - must maintain 60fps during scroll
3. **Memory usage** - should not exceed 100MB for frame sequences
4. **Network conditions** - test on 3G and slower connections
5. **Battery impact** - ensure smooth performance without excessive drain

### Browser Testing
- Chrome/Safari: Full WebP support
- Firefox: WebP support (check older versions)
- Edge: Modern versions support WebP
- Fallback to JPEG if needed

## 📦 Deployment

### CDN Optimization
1. Upload frames to CDN
2. Enable gzip/brotli compression
3. Set long cache headers
4. Use HTTP/2 for parallel loading

### Performance Monitoring
```javascript
// Add performance logging
console.log(`Loaded ${this.frames.length} frames`);
console.time('Animation setup');
// ... setup code
console.timeEnd('Animation setup');
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file.

## 🆘 Support

- **Issues:** [GitHub Issues](https://github.com/your-username/heroframes/issues)
- **Documentation:** [docs/](docs/)
- **Examples:** [demo/](demo/)

---

**Pro Tip:** Always start with a simple example and gradually add complexity. Performance should always be your primary concern - test on real devices, not just desktop browsers!
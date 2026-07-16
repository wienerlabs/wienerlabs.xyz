import { useEffect, useRef, useCallback } from 'react';

const CARD_IMAGES = [
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b55e654d1341fb06f8_4.1.png",
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5a080a31ee7154b19_1.png",
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5c1e4919fd69672b8_3.png",
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5f6a5e232e7beb4be_2.png",
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5bea2f1b07392d936_4.png",
];

function CardScanner() {
  const containerRef = useRef(null);
  const cardLineRef = useRef(null);
  const scannerCanvasRef = useRef(null);
  const animationRef = useRef({ position: 0, velocity: 80, direction: -1, isAnimating: true });

  const generateCode = useCallback((width, height) => {
    const library = [
      "// compiled preview • scanner demo",
      "const SCAN_WIDTH = 8;",
      "const FADE_ZONE = 35;",
      "function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }",
      "function lerp(a, b, t) { return a + (b - a) * t; }",
      "const now = () => performance.now();",
      "class Particle { constructor(x, y) { this.x = x; this.y = y; } }",
      "const scanner = { x: window.innerWidth / 2, width: 8 };",
      "function tick(t) { const dt = 0.016; }",
      "ctx.globalCompositeOperation = 'lighter';",
    ];
    
    for (let i = 0; i < 20; i++) {
      library.push(`const v${i} = (${Math.floor(Math.random() * 9) + 1} + ${Math.floor(Math.random() * 90) + 10}) * 0.${Math.floor(Math.random() * 9) + 1};`);
    }

    let flow = library.join(" ").replace(/\s+/g, " ");
    const totalChars = width * height;
    while (flow.length < totalChars + width) flow += " " + library[Math.floor(Math.random() * library.length)];

    let out = "";
    for (let row = 0; row < height; row++) {
      let line = flow.slice(row * width, (row + 1) * width);
      if (line.length < width) line += " ".repeat(width - line.length);
      out += line + (row < height - 1 ? "\n" : "");
    }
    return out;
  }, []);

  const createCardWrapper = useCallback((index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "card-wrapper";
    wrapper.style.cssText = "position:relative;width:320px;height:200px;flex-shrink:0;";

    const normalCard = document.createElement("div");
    normalCard.className = "card-normal";
    normalCard.style.cssText = `position:absolute;top:0;left:0;width:320px;height:200px;border-radius:12px;overflow:hidden;z-index:2;clip-path:inset(0 0 0 var(--clip-right,0%));`;

    const cardImage = document.createElement("img");
    cardImage.className = "card-image";
    cardImage.src = CARD_IMAGES[index % CARD_IMAGES.length];
    cardImage.alt = "Card";
    cardImage.style.cssText = "width:100%;height:100%;object-fit:cover;border-radius:12px;filter:brightness(1.1) contrast(1.1);";
    normalCard.appendChild(cardImage);

    const asciiCard = document.createElement("div");
    asciiCard.className = "card-ascii";
    asciiCard.style.cssText = `position:absolute;top:0;left:0;width:320px;height:200px;border-radius:12px;overflow:hidden;z-index:1;clip-path:inset(0 calc(100% - var(--clip-left,0%)) 0 0);`;

    const asciiContent = document.createElement("div");
    asciiContent.className = "ascii-content";
    asciiContent.style.cssText = `position:absolute;top:0;left:0;width:100%;height:100%;color:rgba(255,255,255,0.7);font-family:'Courier New',monospace;font-size:9px;line-height:11px;overflow:hidden;white-space:pre;animation:glitch 0.1s infinite linear alternate-reverse;-webkit-mask-image:linear-gradient(to right,rgba(0,0,0,1) 0%,rgba(0,0,0,0.6) 50%,rgba(0,0,0,0.2) 100%);`;
    asciiContent.textContent = generateCode(53, 18);
    asciiCard.appendChild(asciiContent);

    wrapper.appendChild(normalCard);
    wrapper.appendChild(asciiCard);
    return wrapper;
  }, [generateCode]);

  const updateCardClipping = useCallback(() => {
    if (!containerRef.current) return;
    const scannerX = containerRef.current.offsetWidth / 2;
    const scannerWidth = 6;
    const scannerLeft = scannerX - scannerWidth / 2;
    const scannerRight = scannerX + scannerWidth / 2;

    document.querySelectorAll(".card-wrapper").forEach((wrapper) => {
      const rect = wrapper.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const cardLeft = rect.left - containerRect.left;
      const cardRight = rect.right - containerRect.left;
      const cardWidth = rect.width;
      const normalCard = wrapper.querySelector(".card-normal");
      const asciiCard = wrapper.querySelector(".card-ascii");

      if (cardLeft < scannerRight && cardRight > scannerLeft) {
        const scannerIntersectLeft = Math.max(scannerLeft - cardLeft, 0);
        const scannerIntersectRight = Math.min(scannerRight - cardLeft, cardWidth);
        normalCard.style.setProperty("--clip-right", `${(scannerIntersectLeft / cardWidth) * 100}%`);
        asciiCard.style.setProperty("--clip-left", `${(scannerIntersectRight / cardWidth) * 100}%`);
      } else if (cardRight < scannerLeft) {
        normalCard.style.setProperty("--clip-right", "100%");
        asciiCard.style.setProperty("--clip-left", "100%");
      } else {
        normalCard.style.setProperty("--clip-right", "0%");
        asciiCard.style.setProperty("--clip-left", "0%");
      }
    });
  }, []);

  useEffect(() => {
    if (!cardLineRef.current) return;
    cardLineRef.current.innerHTML = "";
    for (let i = 0; i < 20; i++) {
      cardLineRef.current.appendChild(createCardWrapper(i));
    }
    animationRef.current.position = containerRef.current?.offsetWidth || window.innerWidth;
  }, [createCardWrapper]);

  // Card animation loop
  useEffect(() => {
    let lastTime = performance.now();
    const animate = () => {
      const currentTime = performance.now();
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      const anim = animationRef.current;

      if (anim.isAnimating && cardLineRef.current && containerRef.current) {
        anim.position += anim.velocity * anim.direction * deltaTime;
        const cardLineWidth = (320 + 40) * 20;
        const containerWidth = containerRef.current.offsetWidth;
        if (anim.position < -cardLineWidth) anim.position = containerWidth;
        else if (anim.position > containerWidth) anim.position = -cardLineWidth;
        cardLineRef.current.style.transform = `translateX(${anim.position}px)`;
        updateCardClipping();
      }
      requestAnimationFrame(animate);
    };
    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [updateCardClipping]);

  // Scanner with particles - Original CodePen style
  useEffect(() => {
    const canvas = scannerCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = containerRef.current?.offsetWidth || window.innerWidth;
    const h = 220;
    canvas.width = w;
    canvas.height = h;

    const lightBarX = w / 2;
    const lightBarWidth = 4;
    const fadeZone = 40;
    const particles = [];
    const maxParticles = 300;

    // Particle gradient
    const gradientCanvas = document.createElement("canvas");
    const gradientCtx = gradientCanvas.getContext("2d");
    gradientCanvas.width = 16;
    gradientCanvas.height = 16;
    const half = 8;
    const gradient = gradientCtx.createRadialGradient(half, half, 0, half, half, half);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.3, "rgba(200, 200, 200, 0.7)"); // Light gray
    gradient.addColorStop(1, "transparent");
    gradientCtx.fillStyle = gradient;
    gradientCtx.beginPath();
    gradientCtx.arc(half, half, half, 0, Math.PI * 2);
    gradientCtx.fill();

    const createParticle = () => ({
      x: lightBarX + (Math.random() - 0.5) * lightBarWidth,
      y: Math.random() * h,
      vx: Math.random() * 1.2 + 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.6 + 0.4,
      life: 1.0,
      decay: Math.random() * 0.015 + 0.003,
    });

    for (let i = 0; i < maxParticles; i++) particles.push(createParticle());

    const drawLightBar = () => {
      const verticalGradient = ctx.createLinearGradient(0, 0, 0, h);
      verticalGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
      verticalGradient.addColorStop(fadeZone / h, "rgba(255, 255, 255, 1)");
      verticalGradient.addColorStop(1 - fadeZone / h, "rgba(255, 255, 255, 1)");
      verticalGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.globalCompositeOperation = "lighter";

      // Outer glow
      const outerGlow = ctx.createLinearGradient(lightBarX - 30, 0, lightBarX + 30, 0);
      outerGlow.addColorStop(0, "rgba(255, 255, 255, 0)");
      outerGlow.addColorStop(0.5, "rgba(255, 255, 255, 0.15)");
      outerGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.roundRect(lightBarX - 30, 0, 60, h, 10);
      ctx.fill();

      // Core line
      const coreGradient = ctx.createLinearGradient(lightBarX - lightBarWidth, 0, lightBarX + lightBarWidth, 0);
      coreGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
      coreGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.9)");
      coreGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.globalAlpha = 1;
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.roundRect(lightBarX - lightBarWidth, 0, lightBarWidth * 2, h, 10);
      ctx.fill();

      // Apply vertical fade
      ctx.globalCompositeOperation = "destination-in";
      ctx.globalAlpha = 1;
      ctx.fillStyle = verticalGradient;
      ctx.fillRect(0, 0, w, h);
    };

    let animId;
    const render = () => {
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, w, h);
      drawLightBar();
      ctx.globalCompositeOperation = "lighter";

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        if (p.x > w + 10 || p.life <= 0) {
          particles[i] = createParticle();
          return;
        }

        let fadeAlpha = 1;
        if (p.y < fadeZone) fadeAlpha = p.y / fadeZone;
        else if (p.y > h - fadeZone) fadeAlpha = (h - p.y) / fadeZone;

        ctx.globalAlpha = p.alpha * p.life * Math.max(0, fadeAlpha);
        ctx.drawImage(gradientCanvas, p.x - p.radius * 2, p.y - p.radius * 2, p.radius * 4, p.radius * 4);
      });

      if (Math.random() < 0.6 && particles.length < maxParticles + 50) {
        particles.push(createParticle());
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div ref={containerRef} className="card-scanner-container hidden lg:block relative w-full h-[200px] bg-black overflow-hidden">
      <style>{`
        @keyframes glitch { 0%{opacity:1} 50%{opacity:0.8} 100%{opacity:1} }
      `}</style>
      <canvas className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[200px] z-0 pointer-events-none" />
      <canvas ref={scannerCanvasRef} className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[220px] z-[15] pointer-events-none" />
      <div className="card-stream absolute w-full h-[200px] flex items-center overflow-visible">
        <div ref={cardLineRef} className="card-line flex items-center gap-10 whitespace-nowrap will-change-transform" />
      </div>
    </div>
  );
}

export default CardScanner;


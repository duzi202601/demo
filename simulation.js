/**
 * 智能模拟效果 - Smart Particle Simulation
 * 一个具有智能行为的粒子系统模拟
 */

class Particle {
    constructor(x, y, canvas) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
        this.radius = Math.random() * 3 + 2;
        this.baseRadius = this.radius;
        this.color = this.generateColor();
        this.life = 1;
        this.decay = 0.0005 + Math.random() * 0.001;
    }

    generateColor() {
        const colors = [
            { r: 0, g: 212, b: 255 },    // Cyan
            { r: 124, g: 58, b: 237 },   // Purple
            { r: 244, g: 114, b: 182 },  // Pink
            { r: 52, g: 211, b: 153 },   // Green
            { r: 251, g: 191, b: 36 }    // Yellow
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update(mouseX, mouseY, gravity, attraction) {
        // Apply gravity
        if (gravity) {
            this.vy += 0.1;
        }

        // Apply mouse attraction/repulsion
        if (attraction && mouseX !== null && mouseY !== null) {
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200 && distance > 0) {
                const force = (200 - distance) / 200;
                const angle = Math.atan2(dy, dx);
                
                // Intelligent behavior: particles are attracted to mouse
                this.vx += Math.cos(angle) * force * 0.5;
                this.vy += Math.sin(angle) * force * 0.5;
                
                // Grow particle when near mouse
                this.radius = this.baseRadius + (1 - distance / 200) * 3;
            } else {
                this.radius = this.baseRadius;
            }
        }

        // Apply friction
        this.vx *= 0.99;
        this.vy *= 0.99;

        // Update position
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls with energy loss
        if (this.x < this.radius) {
            this.x = this.radius;
            this.vx *= -0.8;
        }
        if (this.x > this.canvas.width - this.radius) {
            this.x = this.canvas.width - this.radius;
            this.vx *= -0.8;
        }
        if (this.y < this.radius) {
            this.y = this.radius;
            this.vy *= -0.8;
        }
        if (this.y > this.canvas.height - this.radius) {
            this.y = this.canvas.height - this.radius;
            this.vy *= -0.8;
        }

        // Decay life
        this.life -= this.decay;
    }

    draw(ctx) {
        const alpha = this.life * 0.8;
        
        // Draw glow effect
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.radius * 3
        );
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha * 0.5})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw particle core
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha})`;
        ctx.fill();
    }

    isAlive() {
        return this.life > 0;
    }
}

class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouseX = null;
        this.mouseY = null;
        this.gravity = false;
        this.attraction = true;
        this.maxParticles = 500;
        
        this.lastTime = performance.now();
        this.frameCount = 0;
        this.fps = 0;
        
        this.init();
    }

    init() {
        this.resizeCanvas();
        this.setupEventListeners();
        this.createInitialParticles();
        this.animate();
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = Math.min(container.offsetWidth - 40, 900);
        this.canvas.height = Math.min(window.innerHeight * 0.5, 500);
    }

    setupEventListeners() {
        // Mouse events
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.mouseX = null;
            this.mouseY = null;
        });

        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.addParticlesAt(x, y, 20);
        });

        // Touch events for mobile
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const rect = this.canvas.getBoundingClientRect();
            const touch = e.touches[0];
            this.mouseX = touch.clientX - rect.left;
            this.mouseY = touch.clientY - rect.top;
        });

        this.canvas.addEventListener('touchend', () => {
            this.mouseX = null;
            this.mouseY = null;
        });

        // Button events
        document.getElementById('toggleGravity').addEventListener('click', () => {
            this.gravity = !this.gravity;
            document.getElementById('toggleGravity').classList.toggle('active', this.gravity);
        });

        document.getElementById('toggleAttraction').addEventListener('click', () => {
            this.attraction = !this.attraction;
            document.getElementById('toggleAttraction').classList.toggle('active', this.attraction);
        });

        document.getElementById('addParticles').addEventListener('click', () => {
            this.addRandomParticles(50);
        });

        document.getElementById('clearParticles').addEventListener('click', () => {
            this.particles = [];
        });

        // Resize event
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
    }

    createInitialParticles() {
        for (let i = 0; i < 100; i++) {
            this.addParticle(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height
            );
        }
    }

    addParticle(x, y) {
        if (this.particles.length < this.maxParticles) {
            this.particles.push(new Particle(x, y, this.canvas));
        }
    }

    addParticlesAt(x, y, count) {
        for (let i = 0; i < count; i++) {
            const offsetX = (Math.random() - 0.5) * 50;
            const offsetY = (Math.random() - 0.5) * 50;
            this.addParticle(x + offsetX, y + offsetY);
        }
    }

    addRandomParticles(count) {
        for (let i = 0; i < count; i++) {
            this.addParticle(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height
            );
        }
    }

    drawConnections() {
        const connectionDistance = 100;
        const maxConnections = 150; // Limit connections for performance
        let connectionCount = 0;
        
        for (let i = 0; i < this.particles.length && connectionCount < maxConnections; i++) {
            for (let j = i + 1; j < this.particles.length && connectionCount < maxConnections; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                
                // Early exit using squared distance to avoid sqrt when possible
                const distSquared = dx * dx + dy * dy;
                const connectionDistSquared = connectionDistance * connectionDistance;
                
                if (distSquared < connectionDistSquared) {
                    const distance = Math.sqrt(distSquared);
                    const opacity = (1 - distance / connectionDistance) * 0.3;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                    connectionCount++;
                }
            }
        }
    }

    updateFPS() {
        this.frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - this.lastTime >= 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.lastTime = currentTime;
            document.getElementById('fps').textContent = this.fps;
        }
    }

    update() {
        // Update particles
        this.particles.forEach(particle => {
            particle.update(this.mouseX, this.mouseY, this.gravity, this.attraction);
        });

        // Remove dead particles
        this.particles = this.particles.filter(particle => particle.isAlive());

        // Auto-spawn new particles to maintain minimum count
        while (this.particles.length < 50) {
            this.addParticle(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height
            );
        }

        // Update stats
        document.getElementById('particleCount').textContent = this.particles.length;
        this.updateFPS();
    }

    draw() {
        // Clear canvas with fade effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw connections between nearby particles
        this.drawConnections();

        // Draw particles
        this.particles.forEach(particle => {
            particle.draw(this.ctx);
        });

        // Draw mouse indicator
        if (this.mouseX !== null && this.mouseY !== null) {
            this.ctx.beginPath();
            this.ctx.arc(this.mouseX, this.mouseY, 5, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            this.ctx.fill();
        }
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem('simulationCanvas');
});

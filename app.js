// Contact form success message logic
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar sección de agradecimiento si el formulario fue enviado correctamente
    if (window.location.search.includes('enviado=1')) {
        var gracias = document.getElementById('gracias');
        var contacto = document.getElementById('contactSection');
        if (gracias) {
            gracias.style.display = 'flex';
        }
        if (contacto) {
            contacto.style.display = 'none';
        }
        // Opcional: hacer scroll a la sección de gracias
        setTimeout(function() {
            gracias && gracias.scrollIntoView({behavior:'smooth'});
        }, 200);
    }
});
// Animación de escritura para el título principal de la sección de inicio
window.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.showcase__title');
    if (title) {
        const fullText = title.textContent;
        let idx = 0;
        title.textContent = '';
        function typeTitle() {
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReduced) {
                title.textContent = fullText;
                return;
            }
            if (idx <= fullText.length) {
                title.textContent = fullText.slice(0, idx) + (idx < fullText.length ? '|' : '');
                idx++;
                setTimeout(typeTitle, 38);
            } else {
                title.textContent = fullText;
            }
        }
        typeTitle();
    }
});

// Animación de fondo: efecto de código escribiéndose en loop en la sección de inicio
const codeBg = document.querySelector('.code-bg-animated');
if (codeBg) {
    const codeLines = [
        'function saludar(nombre) {',
        '    console.log(`Hola, ${nombre}!`);',
        '}',
        '',
        'const usuario = "Camilo";',
        'saludar(usuario);',
        '',
        '// Portafolio Web - 2025',
        'let proyectos = ["Web", "IA", "Apps", "APIs", "UI/UX", "Automatización"]',
        'proyectos.forEach(p => {',
        '    console.log(p);',
        '});',
        '',
    '// Inspiración:',
    'const mensaje = "El código es creatividad hecha realidad.";',
    'console.log(mensaje);',
        '',
        'if (proyectos.length > 0) {',
        '    console.log("¡Siempre aprendiendo y creando!");',
        '}',
        '',
        '// Sígueme en GitHub: github.com/SoyKam',
    ];
    let fullText = codeLines.join("\n");
    let idx = 0;
    let current = "";
    let direction = 1;
    function typeLoop() {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) {
            codeBg.textContent = fullText;
            return;
        }
        if (direction === 1) {
            current = fullText.slice(0, idx);
            idx++;
            if (idx > fullText.length + 20) direction = -1;
        } else {
            current = fullText.slice(0, idx);
            idx--;
            if (idx < 0) direction = 1;
        }
        codeBg.textContent = current + (direction === 1 && idx % 2 === 0 ? "|" : " ");
        setTimeout(typeLoop, direction === 1 ? 22 : 10);
    }
    typeLoop();
}

// Efecto de rastro de partículas con canvas
const canvas = document.getElementById('mouse-trail');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let width = window.innerWidth;
    let height = window.innerHeight;

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    document.addEventListener('mousemove', (e) => {
        for (let i = 0; i < 2; i++) {
            particles.push({
                x: e.clientX + Math.random() * 8 - 4,
                y: e.clientY + Math.random() * 8 - 4,
                radius: Math.random() * 6 + 4,
                alpha: 1,
                dx: (Math.random() - 0.5) * 1.5,
                dy: (Math.random() - 0.5) * 1.5,
                color: `rgba(255,94,0,1)`
            });
        }
    });

    function animate() {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return; // Evita animación si el usuario prefiere reducir movimiento
        ctx.clearRect(0, 0, width, height);
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,94,0,${p.alpha})`;
            ctx.shadowColor = 'rgba(255,94,0,0.7)';
            ctx.shadowBlur = 16;
            ctx.fill();
            p.x += p.dx;
            p.y += p.dy;
            p.alpha -= 0.025;
            p.radius *= 0.97;
            if (p.alpha <= 0.05 || p.radius < 1) {
                particles.splice(i, 1);
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}
// Animación en los botones principales
(function() {
    window.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.buttons');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                btn.animate([
                    { boxShadow: '0 2px 8px 0 #fe7e2633' },
                    { boxShadow: '0 0 32px 0 #fe7e26cc' },
                    { boxShadow: '0 2px 8px 0 #fe7e2633' }
                ], {
                    duration: 400,
                    easing: 'ease-in-out'
                });
            });
        });
    });
})();

// Orbiting bubbles around the showcase icon (non-intrusive, layout-safe)
(function() {
    document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.showcase__logo-container');
    const logo = container?.querySelector('.showcase__logo');
    if (!container || !logo) return;

    // Create orbit system wrapper absolutely positioned relative to container
    const system = document.createElement('div');
    system.className = 'orbit-system';

    // Helper to create an orbit with a bubble/icon
    const makeOrbit = (size, tilt, squash, speed, delay, iconSrc, alt, startDeg=0, showRing=true) => {
        const orbit = document.createElement('div');
        orbit.className = 'orbit';
        orbit.style.setProperty('--size', `${size}px`);
        orbit.style.setProperty('--tilt', `${tilt}deg`);
        orbit.style.setProperty('--squash', squash.toString());
        orbit.style.setProperty('--speed', `${speed}s`);
        orbit.style.setProperty('--delay', `${delay}s`);
        orbit.style.setProperty('--start', `${startDeg}deg`);

        if (showRing) {
            const ring = document.createElement('span');
            ring.className = 'orbit__ring';
            orbit.appendChild(ring);
        }

        const bubble = document.createElement('span');
        bubble.className = 'bubble';
        if (iconSrc) {
        const img = document.createElement('img');
        img.src = iconSrc;
        img.alt = alt || '';
        bubble.appendChild(img);
        }
        orbit.appendChild(bubble);
        return orbit;
    };

    // Scale orbit sizes based on current logo size for better fit
    const logoRect = logo.getBoundingClientRect();
    const base = Math.max(logoRect.width, logoRect.height); // ~170 según tu ajuste
    // Más separación del avatar y con tamaños escalonados (estilo átomo)
    const s1 = base * 1.6;  // anillo interior (ya no toca el avatar)
    const s2 = base * 2.0;  // medio
    const s3 = base * 1.85; // medio-compacto
    const s4 = base * 2.3;  // exterior
    const s5 = base * 2.6;  // más exterior

    // Build orbits with initial angles to look fluid on load (with slight random jitter)
    const jitter = () => (Math.random() * 24 - 12); // -12° .. +12°
    const o1 = makeOrbit(s1, 25, 0.86, 31, 0.00, icons[0], 'JS',     20 + jitter(), true);   // visible
    const o2 = makeOrbit(s2, -35, 0.92, 37, 0.14, icons[1], 'HTML',  240 + jitter(), false); // oculto
    const o3 = makeOrbit(s3, 60, 0.78, 21, 0.06, icons[2], 'CSS',    130 + jitter(), true);  // visible
    const o4 = makeOrbit(s4, -75, 0.90, 16, 0.12, icons[3], 'Python',300 + jitter(), false); // oculto
    const o5 = makeOrbit(s5, 10, 0.84, 48, 0.22, icons[4], 'SQL',    310 + jitter(), true);  // visible
    o2.classList.add('reverse');
    o5.classList.add('reverse');

    // Traer uno por delante del avatar (como en el ejemplo)
    o2.classList.add('front');

    [o1, o2, o3, o4, o5].forEach(o => system.appendChild(o));

    // Append to the logo itself so the orbit's center matches the avatar center
    logo.appendChild(system);
    });
})();

    const correo = "juancamilo.ariasparra@gmail.com";
    function copiarCorreo(e) {
        e.preventDefault();
        if (navigator.clipboard) {
            navigator.clipboard.writeText(correo).then(function() {
                alert("Correo copiado: " + correo);
            }, function() {
                alert("No se pudo copiar el correo.");
            });
        } else {
            // Fallback para navegadores antiguos
            const tempInput = document.createElement('input');
            tempInput.value = correo;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            alert("Correo copiado: " + correo);
        }
    }
    document.getElementById('btn-computrabajo').addEventListener('click', copiarCorreo);
    document.getElementById('btn-computrabajo-footer').addEventListener('click', copiarCorreo);
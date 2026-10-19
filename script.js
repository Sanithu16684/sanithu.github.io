// Remove Loader when page is ready
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800);
    }, 1000);
});

// Configure Lenis Smooth Scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    direction: 'vertical', // vertical, horizontal
    gestureDirection: 'vertical', // vertical, horizontal, both
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

// Get scroll value
let lastScrollY = window.scrollY;
const navbar = document.getElementById('navbar');

lenis.on('scroll', (e) => {
    scrollY = window.scrollY;
    handleCardReveal();
    
    // Scroll Progress Bar Update
    if (progressBar) {
        const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
        const progressPercent = (scrollY / scrollMax) * 100;
        progressBar.style.width = progressPercent + '%';
    }

    // Navbar Scroll visibility & background
    if (navbar) {
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide on scroll down, show on scroll up
        if (scrollY > lastScrollY && scrollY > 200) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
    }
    lastScrollY = scrollY;
});

// Three.js Setup
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x050505, 0.012);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 1. GLOBAL GEOMETRY (FLOATING TECH SPACE)
const geometry = new THREE.BufferGeometry();
const vertices = [];
for ( let i = 0; i < 3500; i++ ) {
    vertices.push( THREE.MathUtils.randFloatSpread( 250 ) ); 
    vertices.push( THREE.MathUtils.randFloatSpread( 600 ) ); 
    vertices.push( THREE.MathUtils.randFloatSpread( 250 ) ); 
}
geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
const material = new THREE.PointsMaterial( { color: 0x00ff88, size: 0.25, transparent: true, opacity: 0.8 } );
const particles = new THREE.Points( geometry, material );
scene.add( particles );

// --- SCENE LIGHTING ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);
const dirLight2 = new THREE.DirectionalLight(0x00ff88, 0.5); // Neon green accent
dirLight2.position.set(-5, 5, -5);
scene.add(dirLight2);

// --- SECTION SPECIFIC BACKGROUNDS ---

// --- SECTION SPECIFIC BACKGROUNDS ---

// (Landing Section 3D Object removed per request - relying on global particles and UI for visuals)

// 2. ABOUT: Hardware floating objects 
const aboutObjects = new THREE.Group();
const hwMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff88, wireframe: true, transparent: true, opacity: 0.35 });
const hwGeometries = [
    new THREE.BoxGeometry(2, 2, 0.2), 
    new THREE.CylinderGeometry(0.2, 0.2, 0.5), 
    new THREE.TorusGeometry(0.5, 0.1, 8, 20) 
];
for(let i=0; i<30; i++){
    const geom = hwGeometries[Math.floor(Math.random() * hwGeometries.length)];
    const mesh = new THREE.Mesh(geom, hwMaterial);
    mesh.position.set((Math.random()-0.5)*30, -110 + (Math.random()-0.5)*40, (Math.random()-0.5)*20); // Moved to -110
    mesh.rotation.set(Math.random()*2, Math.random()*2, Math.random()*2);
    aboutObjects.add(mesh);
}
scene.add(aboutObjects);

// 2.3 EXPERIENCE: Floating Tech Circuit Cubes & Micro-modules
const expObjects = new THREE.Group();
const expMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.28 });
const expGeom = new THREE.BoxGeometry(1.8, 0.6, 1.8);
for(let i=0; i<25; i++){
    const mesh = new THREE.Mesh(expGeom, expMat);
    mesh.position.set((Math.random()-0.5)*35, -200 + (Math.random()-0.5)*40, (Math.random()-0.5)*20);
    mesh.rotation.set(Math.random()*2, Math.random()*2, Math.random()*2);
    expObjects.add(mesh);
}
scene.add(expObjects);

// 3. PROJECTS: Data Blocks 
const projectsObjects = new THREE.Group();
const dataMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff88, wireframe: true, transparent: true, opacity: 0.28 });
const dataGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
for(let i=0; i<40; i++){
    const mesh = new THREE.Mesh(dataGeometry, dataMaterial);
    mesh.position.set((Math.random()-0.5)*35, -330 + (Math.random()-0.5)*40, (Math.random()-0.5)*20);
    mesh.rotation.set(Math.random()*2, Math.random()*2, Math.random()*2);
    projectsObjects.add(mesh);
}
scene.add(projectsObjects);

// 3.5 EDUCATION: Knowledge Polyhedra
const eduObjects = new THREE.Group();
const eduMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.3 });
const eduGeom = new THREE.OctahedronGeometry(1.2, 0);
for(let i=0; i<25; i++){
    const mesh = new THREE.Mesh(eduGeom, eduMat);
    mesh.position.set((Math.random()-0.5)*40, -450 + (Math.random()-0.5)*40, (Math.random()-0.5)*20);
    mesh.rotation.set(Math.random()*2, Math.random()*2, Math.random()*2);
    eduObjects.add(mesh);
}
scene.add(eduObjects);

// 4. LEADERSHIP: Pyramid nodes
const leadObjects = new THREE.Group();
const leadMat = new THREE.MeshBasicMaterial({ color: 0x00ff88, wireframe: true, transparent: true, opacity: 0.25 });
const leadGeom = new THREE.TetrahedronGeometry(1.5, 0);
for(let i=0; i<30; i++){
    const mesh = new THREE.Mesh(leadGeom, leadMat);
    mesh.position.set((Math.random()-0.5)*30, -560 + (Math.random()-0.5)*40, (Math.random()-0.5)*20);
    mesh.rotation.set(Math.random()*2, Math.random()*2, Math.random()*2);
    leadObjects.add(mesh);
}
scene.add(leadObjects);

// 4.5 SKILLS: Network Graph 
const skillsObjects = new THREE.Group();
const skillNodeMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.5 });
const skillNodeGeom = new THREE.IcosahedronGeometry(0.3, 1);
const networkPoints = [];
for(let i=0; i<35; i++){
    const pos = new THREE.Vector3((Math.random()-0.5)*25, -670 + (Math.random()-0.5)*40, (Math.random()-0.5)*20);
    const mesh = new THREE.Mesh(skillNodeGeom, skillNodeMat);
    mesh.position.copy(pos);
    networkPoints.push(pos);
    skillsObjects.add(mesh);
}
for(let i=0; i<networkPoints.length; i+=2){
     if(i+1 < networkPoints.length){
         const points = [networkPoints[i], networkPoints[i+1]];
         const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
         const lineMat = new THREE.LineBasicMaterial({color: 0x00d4ff, transparent: true, opacity: 0.2});
         const line = new THREE.Line(lineGeom, lineMat);
         skillsObjects.add(line);
     }
}
scene.add(skillsObjects);

// 5. GALLERY: Floating Frames
const galleryObjects = new THREE.Group();
const galMat = new THREE.MeshBasicMaterial({ color: 0x00ff88, wireframe: true, transparent: true, opacity: 0.15 });
const galGeom = new THREE.BoxGeometry(2, 1.5, 0.1);
for(let i=0; i<20; i++){
    const mesh = new THREE.Mesh(galGeom, galMat);
    mesh.position.set((Math.random()-0.5)*35, -780 + (Math.random()-0.5)*40, (Math.random()-0.5)*20);
    mesh.rotation.set(Math.random()*2, Math.random()*2, Math.random()*2);
    galleryObjects.add(mesh);
}
scene.add(galleryObjects);

// 5. CONTACT: Cyber Grid & Holographic Globe (MASSIVE 3D EFFECT)
const contactObjects = new THREE.Group();

// Massive Rotating Globe
const globeGeom = new THREE.SphereGeometry(15, 32, 32); 
const globeMat = new THREE.MeshBasicMaterial({ color: 0x00ff88, wireframe: true, transparent: true, opacity: 0.08 });
const globeMesh = new THREE.Mesh(globeGeom, globeMat);

const innerGlobeGeom = new THREE.SphereGeometry(8, 16, 16);
const innerGlobeMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.15 });
const innerGlobeMesh = new THREE.Mesh(innerGlobeGeom, innerGlobeMat);

// Outer Cyber Rings
const ring1Geom = new THREE.TorusGeometry(20, 0.2, 16, 100);
const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x00ff88, transparent: true, opacity: 0.4 });
const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
ring1.rotation.x = Math.PI / 2;

const ring2Geom = new THREE.TorusGeometry(22, 0.1, 16, 100);
const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.3 });
const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
ring2.rotation.x = Math.PI / 3;

contactObjects.add(globeMesh, innerGlobeMesh, ring1, ring2);
contactObjects.position.set(0, -900, -30); // Centered at bottom
scene.add(contactObjects);

// 3D Moving Floor Grid
const gridGeom = new THREE.PlaneGeometry(250, 250, 60, 60);
const gridMat = new THREE.MeshBasicMaterial({ color: 0x00ff88, wireframe: true, transparent: true, opacity: 0.12 });
const floorGrid = new THREE.Mesh(gridGeom, gridMat);
floorGrid.rotation.x = -Math.PI / 2.1; // Subtle tilt for depth
floorGrid.position.set(0, -920, -20); // Floor position
scene.add(floorGrid);

camera.position.z = 10; 

// SCROLL TRACKING LOGIC (Handled by Lenis now, keeping for initial state)
let scrollY = window.scrollY;

// Mouse Tracking & Custom Cursor Logic
let mouseX = 0, mouseY = 0;
let cursorX = window.innerWidth / 2, cursorY = window.innerHeight / 2;
const customCursor = document.querySelector('.custom-cursor');
const customCursorTrail = document.querySelector('.custom-cursor-trail');
const progressBar = document.getElementById('scroll-progress');

document.addEventListener('mousemove', (event) => {
    // For 3D camera parallax
    mouseX = (event.clientX - window.innerWidth / 2) * 0.005;
    mouseY = (event.clientY - window.innerHeight / 2) * 0.005;
    
    // For Custom Cursor immediate pos
    cursorX = event.clientX;
    cursorY = event.clientY;
    
    if (customCursor) {
        customCursor.style.left = cursorX + 'px';
        customCursor.style.top = cursorY + 'px';
    }
});

// Cursor trail smooth animation & Dynamic Glowing Path
let trailX = window.innerWidth / 2, trailY = window.innerHeight / 2;
let cursorPoints = [];
const cursorCanvas = document.getElementById('cursor-canvas');
const cursorCtx = cursorCanvas ? cursorCanvas.getContext('2d') : null;

if (cursorCanvas) {
    cursorCanvas.width = window.innerWidth;
    cursorCanvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
        cursorCanvas.width = window.innerWidth;
        cursorCanvas.height = window.innerHeight;
    });
}

function animateCursorTrail() {
    // Original round trailing cursor
    if (customCursorTrail) {
        trailX += (cursorX - trailX) * 0.15; // Smoothness factor
        trailY += (cursorY - trailY) * 0.15;
        customCursorTrail.style.left = trailX + 'px';
        customCursorTrail.style.top = trailY + 'px';
    }

    // New visual glowing path
    if (cursorCtx) {
        cursorCtx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
        
        const lastPoint = cursorPoints[cursorPoints.length - 1];
        const dist = lastPoint ? Math.hypot(cursorX - lastPoint.x, cursorY - lastPoint.y) : 0;
        
        if (!lastPoint || dist > 2) {
            cursorPoints.push({ x: cursorX, y: cursorY, life: 1.0 });
        }
        
        for (let i = 0; i < cursorPoints.length; i++) {
            cursorPoints[i].life -= 0.025; // Path decay rate
        }
        
        cursorPoints = cursorPoints.filter(p => p.life > 0);
        
        if (cursorPoints.length > 1) {
            cursorCtx.lineCap = 'round';
            cursorCtx.lineJoin = 'round';
            cursorCtx.shadowBlur = 15;
            cursorCtx.shadowColor = '#00ff88';

            for (let i = 1; i < cursorPoints.length; i++) {
                const prev = cursorPoints[i - 1];
                const curr = cursorPoints[i];

                cursorCtx.beginPath();
                cursorCtx.moveTo(prev.x, prev.y);
                cursorCtx.lineTo(curr.x, curr.y);
                
                cursorCtx.lineWidth = 6 * curr.life;
                
                // Smooth color transition from green (head) to cyan (tail)
                const g = Math.floor(212 + 43 * curr.life);
                const b = Math.floor(255 - 119 * curr.life);
                
                cursorCtx.strokeStyle = `rgba(0, ${g}, ${b}, ${curr.life})`;
                cursorCtx.stroke();
            }
        }
    }

    requestAnimationFrame(animateCursorTrail);
}
animateCursorTrail();

// Cursor Interaction on Hover Elements
const hoverElements = document.querySelectorAll('a, button, .activity-card, .experience-card, .timeline-item, .btn-primary, .btn-secondary, .social-links a, .skill-btn-detailed, input, textarea, .menu-toggle, .about-image-wrapper');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if(customCursorTrail) customCursorTrail.classList.add('hovered');
        if(customCursor) customCursor.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
        if(customCursorTrail) customCursorTrail.classList.remove('hovered');
        if(customCursor) customCursor.classList.remove('hovered');
    });
});


// TYPING EFFECT
const words = ["Software Engineer", "Full-Stack Developer", "ASP.NET Specialist", "IT Infrastructure Expert"];
let currentWordIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typedTextElement = document.getElementById('typed-text');

function typeEffect() {
    if(!typedTextElement) return;
    const currentWord = words[currentWordIndex];
    if (isDeleting) {
        typedTextElement.textContent = currentWord.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        typedTextElement.textContent = currentWord.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && currentCharIndex === currentWord.length) {
        typeSpeed = 1500; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentWordIndex = (currentWordIndex + 1) % words.length;
        typeSpeed = 400; // Pause before next word
    }
    setTimeout(typeEffect, typeSpeed);
}
if(typedTextElement) {
    setTimeout(typeEffect, 1200); // Start typing slightly after load
}

// CARD REVEAL ON SCROLL LOGIC
function handleCardReveal() {
    const cards = document.querySelectorAll('.card, .skill-btn, .reveal-elem');
    const windowHeight = window.innerHeight;

    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < windowHeight * 0.85) { 
            card.classList.add('reveal');
        }
    });
}

// SECTION ACTIVE STATE & MOBILE MENU LOGIC
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('is-active');
        navMenu.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menuToggle && menuToggle.classList.contains('is-active')) {
            menuToggle.classList.remove('is-active');
            navMenu.classList.remove('active');
        }
    });
});

const sections = document.querySelectorAll('section');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === entry.target.id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// ANIMATION LOOP
function animate(time) {
    lenis.raf(time); // Integrate Lenis into existing requestAnimationFrame
    requestAnimationFrame(animate);
    
    const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    const scrollPercent = scrollY / maxScroll;
    const targetY = -(scrollPercent * 900); // 900 for 9 sections
    
    camera.position.y += 0.05 * (targetY - camera.position.y); 
    camera.position.x += 0.05 * (mouseX - camera.position.x);
    camera.lookAt(camera.position.x, camera.position.y, 0);

    // Particles global animation
    particles.rotation.y += 0.0008; 

    aboutObjects.children.forEach(obj => {
        obj.rotation.x += 0.002;
        obj.rotation.y += 0.003;
    });

    expObjects.children.forEach(obj => {
        obj.rotation.x += 0.003;
        obj.rotation.y += 0.002;
    });

    eduObjects.children.forEach(obj => {
        obj.rotation.x += 0.003;
        obj.rotation.y += 0.004;
    });

    projectsObjects.children.forEach(obj => {
        obj.rotation.x += 0.005;
        obj.rotation.y += 0.002;
    });

    leadObjects.children.forEach(obj => {
        obj.rotation.x -= 0.002;
        obj.rotation.y -= 0.005;
    });

    galleryObjects.children.forEach(obj => {
        obj.rotation.y += 0.002;
    });

    skillsObjects.rotation.y += 0.001;

    // Contact Section Animations
    globeMesh.rotation.y += 0.001;
    globeMesh.rotation.x += 0.0005;
    innerGlobeMesh.rotation.y -= 0.002;
    innerGlobeMesh.rotation.x -= 0.001;
    ring1.rotation.z += 0.003;
    ring2.rotation.y -= 0.002;

    // Moving floor illusion
    floorGrid.position.z += 0.08;
    if(floorGrid.position.z > 0) floorGrid.position.z = -20; // Reset to create endless loop

    renderer.render(scene, camera);
}

animate();
handleCardReveal(); 

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
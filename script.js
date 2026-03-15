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

// --- SECTION SPECIFIC BACKGROUNDS ---

// 1. HOME: Big Abstract Tech Shape
const homeObjects = new THREE.Group();
const heroGeom = new THREE.TorusKnotGeometry( 15, 3, 100, 16 ); 
const heroMat = new THREE.MeshBasicMaterial( { color: 0x00ff88, wireframe: true, transparent: true, opacity: 0.15 } );
const heroMesh = new THREE.Mesh( heroGeom, heroMat );
heroMesh.position.set(0, 0, -30); 
homeObjects.add(heroMesh);
scene.add(homeObjects);

// 2. ABOUT: Hardware floating objects 
const aboutObjects = new THREE.Group();
const hwMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff88, wireframe: true, transparent: true, opacity: 0.25 });
const hwGeometries = [
    new THREE.BoxGeometry(2, 2, 0.2), 
    new THREE.CylinderGeometry(0.2, 0.2, 0.5), 
    new THREE.TorusGeometry(0.5, 0.1, 8, 20) 
];
for(let i=0; i<30; i++){
    const geom = hwGeometries[Math.floor(Math.random() * hwGeometries.length)];
    const mesh = new THREE.Mesh(geom, hwMaterial);
    mesh.position.set((Math.random()-0.5)*30, -100 + (Math.random()-0.5)*40, (Math.random()-0.5)*20);
    mesh.rotation.set(Math.random()*2, Math.random()*2, Math.random()*2);
    aboutObjects.add(mesh);
}
scene.add(aboutObjects);

// 3. PROJECTS: Data Blocks 
const projectsObjects = new THREE.Group();
const dataMaterial = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.3 });
const dataGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
for(let i=0; i<40; i++){
    const mesh = new THREE.Mesh(dataGeometry, dataMaterial);
    mesh.position.set((Math.random()-0.5)*35, -220 + (Math.random()-0.5)*40, (Math.random()-0.5)*20);
    mesh.rotation.set(Math.random()*2, Math.random()*2, Math.random()*2);
    projectsObjects.add(mesh);
}
scene.add(projectsObjects);

// 4. SKILLS: Network Graph 
const skillsObjects = new THREE.Group();
const skillNodeMat = new THREE.MeshBasicMaterial({ color: 0x00ff88, transparent: true, opacity: 0.5 });
const skillNodeGeom = new THREE.IcosahedronGeometry(0.3, 1);
const networkPoints = [];
for(let i=0; i<35; i++){
    const pos = new THREE.Vector3((Math.random()-0.5)*25, -330 + (Math.random()-0.5)*40, (Math.random()-0.5)*20);
    const mesh = new THREE.Mesh(skillNodeGeom, skillNodeMat);
    mesh.position.copy(pos);
    networkPoints.push(pos);
    skillsObjects.add(mesh);
}
for(let i=0; i<networkPoints.length; i+=2){
     if(i+1 < networkPoints.length){
         const points = [networkPoints[i], networkPoints[i+1]];
         const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
         const lineMat = new THREE.LineBasicMaterial({color: 0x00ff88, transparent: true, opacity: 0.2});
         const line = new THREE.Line(lineGeom, lineMat);
         skillsObjects.add(line);
     }
}
scene.add(skillsObjects);

// 5. CONTACT: Cyber Grid & Holographic Globe (MASSIVE 3D EFFECT)
const contactObjects = new THREE.Group();

// Massive Rotating Globe
const globeGeom = new THREE.SphereGeometry(15, 32, 32); 
const globeMat = new THREE.MeshBasicMaterial({ color: 0x00ff88, wireframe: true, transparent: true, opacity: 0.08 });
const globeMesh = new THREE.Mesh(globeGeom, globeMat);

const innerGlobeGeom = new THREE.SphereGeometry(8, 16, 16);
const innerGlobeMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.15 });
const innerGlobeMesh = new THREE.Mesh(innerGlobeGeom, innerGlobeMat);

contactObjects.add(globeMesh, innerGlobeMesh);
contactObjects.position.set(0, -450, -30); // Pushed back to stay behind cards
scene.add(contactObjects);

// 3D Moving Floor Grid
const gridGeom = new THREE.PlaneGeometry(200, 200, 60, 60);
const gridMat = new THREE.MeshBasicMaterial({ color: 0x00ff88, wireframe: true, transparent: true, opacity: 0.15 });
const floorGrid = new THREE.Mesh(gridGeom, gridMat);
floorGrid.rotation.x = -Math.PI / 2; // Lay it flat on the ground
floorGrid.position.set(0, -460, -20); // Positioned at the bottom of the contact section
scene.add(floorGrid);

camera.position.z = 10; 

// SCROLL TRACKING LOGIC
let scrollY = window.scrollY;
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    handleCardReveal();
});

// Mouse Tracking
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - window.innerWidth / 2) * 0.005;
    mouseY = (event.clientY - window.innerHeight / 2) * 0.005;
});

// CARD REVEAL ON SCROLL LOGIC
function handleCardReveal() {
    const cards = document.querySelectorAll('.card, .skill-btn');
    const windowHeight = window.innerHeight;

    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < windowHeight * 0.85) { 
            card.classList.add('reveal');
        }
    });
}

// ANIMATION LOOP
function animate() {
    requestAnimationFrame(animate);
    
    const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    const scrollPercent = scrollY / maxScroll;
    const targetY = -(scrollPercent * 450); 
    
    camera.position.y += 0.05 * (targetY - camera.position.y); 
    camera.position.x += 0.05 * (mouseX - camera.position.x);
    camera.lookAt(camera.position.x, camera.position.y, 0);

    // Particles global animation
    particles.rotation.y += 0.0008; 

    // Section Animations
    heroMesh.rotation.x += 0.001;
    heroMesh.rotation.y += 0.002;
    
    aboutObjects.children.forEach(obj => {
        obj.rotation.x += 0.002;
        obj.rotation.y += 0.003;
    });

    projectsObjects.children.forEach(obj => {
        obj.rotation.x += 0.005;
        obj.rotation.y += 0.002;
    });

    skillsObjects.rotation.y += 0.001;

    // Contact Section Animations
    globeMesh.rotation.y += 0.001;
    globeMesh.rotation.x += 0.0005;
    innerGlobeMesh.rotation.y -= 0.002;
    innerGlobeMesh.rotation.x -= 0.001;

    // Moving floor illusion
    floorGrid.position.z += 0.05;
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
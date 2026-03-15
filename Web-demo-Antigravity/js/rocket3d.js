/**
 * BiSKY Team — 3D Rocket (Three.js)
 * Stylized wireframe rocket in the hero, with cursor tracking and scroll parallax
 */
(function () {
  if (typeof THREE === 'undefined') return;

  const heroSection = document.querySelector('.hero');
  const canvasWrap = document.querySelector('.hero__canvas-wrap');
  if (!heroSection || !canvasWrap) return;

  let scene, camera, renderer, rocketGroup;
  let mouseX = 0, mouseY = 0;
  let targetRotX = 0, targetRotY = 0;
  let animId;

  function init() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(4, 1, 8);
    camera.lookAt(0, 1, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Place renderer BEHIND the canvas (particles are on top via hero-canvas)
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.zIndex = '0';
    canvasWrap.insertBefore(renderer.domElement, canvasWrap.firstChild);

    // Move particles canvas above
    const heroCanvas = document.getElementById('hero-canvas');
    if (heroCanvas) heroCanvas.style.zIndex = '1';

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0x6eb4ff, 0.3);
    rimLight.position.set(-5, 3, -5);
    scene.add(rimLight);

    // Build Rocket
    buildRocket();

    // Events
    window.addEventListener('resize', onResize);
    document.addEventListener('mousemove', onMouseMove, { passive: true });
  }

  function buildRocket() {
    rocketGroup = new THREE.Group();

    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.7,
      roughness: 0.3
    });

    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x444444,
      transparent: true,
      opacity: 0.4
    });

    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      metalness: 0.8,
      roughness: 0.2
    });

    // Body tube
    const bodyGeo = new THREE.CylinderGeometry(0.4, 0.4, 4, 16, 1, true);
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 2;
    rocketGroup.add(body);

    // Body edges
    const bodyEdges = new THREE.EdgesGeometry(bodyGeo);
    const bodyLines = new THREE.LineSegments(bodyEdges, edgeMat);
    bodyLines.position.y = 2;
    rocketGroup.add(bodyLines);

    // Nose cone
    const noseGeo = new THREE.ConeGeometry(0.4, 1.6, 16);
    const nose = new THREE.Mesh(noseGeo, accentMat);
    nose.position.y = 4.8;
    rocketGroup.add(nose);

    const noseEdges = new THREE.EdgesGeometry(noseGeo);
    const noseLines = new THREE.LineSegments(noseEdges, edgeMat);
    noseLines.position.y = 4.8;
    rocketGroup.add(noseLines);

    // Boat tail (bottom taper)
    const tailGeo = new THREE.CylinderGeometry(0.4, 0.32, 0.5, 16);
    const tail = new THREE.Mesh(tailGeo, bodyMat);
    tail.position.y = -0.25;
    rocketGroup.add(tail);

    const tailEdges = new THREE.EdgesGeometry(tailGeo);
    const tailLines = new THREE.LineSegments(tailEdges, edgeMat);
    tailLines.position.y = -0.25;
    rocketGroup.add(tailLines);

    // Motor nozzle
    const nozzleGeo = new THREE.CylinderGeometry(0.2, 0.28, 0.3, 12);
    const nozzle = new THREE.Mesh(nozzleGeo, accentMat);
    nozzle.position.y = -0.65;
    rocketGroup.add(nozzle);

    // Fins (4 fins)
    const finShape = new THREE.Shape();
    finShape.moveTo(0, 0);
    finShape.lineTo(0.8, 0);
    finShape.lineTo(0.3, 1.2);
    finShape.lineTo(0, 1.2);
    finShape.lineTo(0, 0);

    const finExtrudeSettings = { depth: 0.03, bevelEnabled: false };
    const finGeo = new THREE.ExtrudeGeometry(finShape, finExtrudeSettings);

    for (let i = 0; i < 4; i++) {
      const fin = new THREE.Mesh(finGeo, accentMat);
      const angle = (i / 4) * Math.PI * 2;
      fin.position.set(
        Math.cos(angle) * 0.39,
        -0.2,
        Math.sin(angle) * 0.39
      );
      fin.rotation.y = -angle + Math.PI / 2;
      rocketGroup.add(fin);

      const finEdges = new THREE.EdgesGeometry(finGeo);
      const finLines = new THREE.LineSegments(finEdges, edgeMat);
      finLines.position.copy(fin.position);
      finLines.rotation.copy(fin.rotation);
      rocketGroup.add(finLines);
    }

    // Ring details on body
    for (let i = 0; i < 3; i++) {
      const ringGeo = new THREE.TorusGeometry(0.41, 0.01, 4, 32);
      const ring = new THREE.Mesh(ringGeo, new THREE.MeshStandardMaterial({
        color: 0x333333,
        metalness: 0.9,
        roughness: 0.1
      }));
      ring.position.y = 1.2 + i * 1.2;
      ring.rotation.x = Math.PI / 2;
      rocketGroup.add(ring);
    }

    // Position and tilt the rocket
    rocketGroup.position.set(2.5, -1.5, 0);
    rocketGroup.rotation.z = -0.08;

    scene.add(rocketGroup);
  }

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onMouseMove(e) {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;
  }

  function animate() {
    animId = requestAnimationFrame(animate);

    if (rocketGroup) {
      // Slow continuous rotation
      rocketGroup.rotation.y += 0.003;

      // Cursor tracking (subtle)
      targetRotX = mouseY * 0.1;
      targetRotY = mouseX * 0.15;
      rocketGroup.rotation.x += (targetRotX - rocketGroup.rotation.x) * 0.02;
      // Don't override Y rotation, add to it
      // rocketGroup.rotation.z lerps toward mouse
      const targetZ = -0.08 + mouseX * 0.05;
      rocketGroup.rotation.z += (targetZ - rocketGroup.rotation.z) * 0.02;

      // Scroll parallax
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      if (scrollY < vh) {
        rocketGroup.position.y = -1.5 + scrollY * 0.002;
      }
    }

    renderer.render(scene, camera);
  }

  // Only init when hero is visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!renderer) {
          init();
          animate();
        } else if (!animId) {
          animate();
        }
      } else {
        if (animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      }
    });
  }, { threshold: 0 });

  if (heroSection) observer.observe(heroSection);

})();

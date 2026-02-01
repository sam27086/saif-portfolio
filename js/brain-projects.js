(() => {
  const container = document.getElementById("brain-projects");
  if (!container) return;

  // Ensure container style
  container.style.position = "absolute";
  container.style.top = "50%";
  container.style.left = "50%";
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.transform = "translate(-50%, -50%)";
  container.style.zIndex = "1";
  container.style.pointerEvents = "none";

  // Scene & Camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 18;

  // Renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Nodes and lines
  const NODE_COUNT = 120;
  const nodes = [];
  const lines = [];
  const BASE_NODE_OPACITY = 0.8;
  const BASE_LINE_OPACITY = 0.3;

  // Brain-shaped node placement (ellipsoid)
  const a = 5; // width
  const b = 4; // height
  const c = 3; // depth

  for (let i = 0; i < NODE_COUNT; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const r = 1 - Math.random() * 0.3; // slightly denser center

    const x = a * r * Math.sin(phi) * Math.cos(theta);
    const y = b * r * Math.sin(phi) * Math.sin(theta);
    const z = c * r * Math.cos(phi);

    const node = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 8, 8),
      new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: BASE_NODE_OPACITY,
      })
    );
    node.position.set(x, y, z);
    scene.add(node);
    nodes.push(node);
  }

  // Connect nearby nodes
  nodes.forEach((node, i) => {
    for (let j = i + 1; j < i + 3 && j < nodes.length; j++) {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        node.position,
        nodes[j].position,
      ]);
      const material = new THREE.LineBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: BASE_LINE_OPACITY,
      });
      const line = new THREE.Line(geometry, material);
      scene.add(line);
      lines.push(line);
    }
  });

  // Animate rotation
  function animate() {
    scene.rotation.y += 0.0025;
    scene.rotation.x += 0.0005; // slight tilt for depth
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();

  // Resize handling
  window.addEventListener("resize", () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
})();

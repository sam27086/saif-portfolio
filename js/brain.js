(() => {
  const container = document.getElementById("brain-container");

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 28;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  container.appendChild(renderer.domElement);

  const NODE_COUNT = 160;
  const nodes = [];
  const lines = [];
  const BASE_NODE_OPACITY = 0.6;
  const BASE_LINE_OPACITY = 0.3;

  const nodeGeo = new THREE.SphereGeometry(0.45, 6, 6);

  for (let i = 0; i < NODE_COUNT; i++) {
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: BASE_NODE_OPACITY });
    const node = new THREE.Mesh(nodeGeo, nodeMat);

    // Brain-shaped distribution: ellipsoid
    const u = Math.random() * Math.PI * 2;
    const v = Math.random() * Math.PI;
    const a = 7; // x radius
    const b = 5; // y radius
    const c = 6; // z radius
    node.position.set(
      a * Math.sin(v) * Math.cos(u),
      b * Math.cos(v),
      c * Math.sin(v) * Math.sin(u)
    );

    scene.add(node);
    nodes.push(node);
  }

  // Connect nodes
  const lineMat = new THREE.LineBasicMaterial({ color: 0x00ffff, transparent: true, opacity: BASE_LINE_OPACITY });
  nodes.forEach((node, i) => {
    for (let j = i + 1; j < i + 3 && j < NODE_COUNT; j++) {
      const geo = new THREE.BufferGeometry().setFromPoints([node.position, nodes[j].position]);
      const line = new THREE.Line(geo, lineMat.clone());
      scene.add(line);
      lines.push(line);
    }
  });

  // Optional subtle pulse
  const pulse = () => {
    nodes.forEach(node => {
      node.position.x += Math.sin(Date.now() * 0.001 + node.position.y) * 0.002;
      node.position.y += Math.cos(Date.now() * 0.001 + node.position.x) * 0.002;
    });
  };

  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: "#hero",
  start: "top top",
  end: "bottom top",
  scrub: true,
  onUpdate: self => {
    const p = self.progress;

    // 1️⃣ Fade nodes & lines
    nodes.forEach(n => {
      n.material.opacity = BASE_NODE_OPACITY * (1 - p);
    });

    lines.forEach(l => {
      l.material.opacity = BASE_LINE_OPACITY * (1 - p);
    });

    // 2️⃣ Cinematic zoom-in (Iron Man style)
    const zoomProgress = Math.min(p / 0.6, 1); // caps at 1
const zoom = 1 + zoomProgress * 1.2;

scene.scale.set(zoom, zoom, zoom);

    // 3️⃣ Slight rotation acceleration
    scene.rotation.y += p * 0.02;
    scene.rotation.x = p * 0.15;
  }
});

  }

  function animate() {
    pulse();
    scene.rotation.y += 0.0015;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener("resize", () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
})();

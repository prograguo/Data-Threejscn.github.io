// Ensure ThreeJS is in global scope for the 'examples/'
//global.THREE = require("three");

// Include any additional ThreeJS examples below
//require("three/examples/js/controls/OrbitControls");

//const canvasSketch = require("canvas-sketch");

const settings = {
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl"
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas
  });

  // WebGL background color
  renderer.setClearColor("black", 1);


  // Setup a camera
  const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 500);
  camera.position.set(3, 3, -5);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();

  // Setup a geometry
  const geometry = new THREE.SphereGeometry(1, 32, 16);

  const loader = new THREE.TextureLoader();
  const texture = loader.load("earth.jpg");
  const marsTexture = loader.load("mars.jpg");
  const sunTexture = loader.load("sun.jpg");
  const bgTexture = loader.load("galaxy.jpg");
  scene.background = bgTexture;

  // Setup a material
  const earthGroup = new THREE.Group();
  const material = new THREE.MeshBasicMaterial({
    map: texture
  });

  // Setup a mesh with geometry + material
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(3,0.5,0.5);
  mesh.scale.setScalar(0.50);
  earthGroup.add(mesh);
  scene.add(earthGroup);

  //mars
  const marsGroup = new THREE.Group();
  const marsMaterial = new THREE.MeshBasicMaterial({
    map: marsTexture
  });
  const marsMesh = new THREE.Mesh(geometry, marsMaterial);
  marsMesh.position.set(-5,1.5,1);
  marsMesh.scale.setScalar(0.30);
  marsGroup.add(marsMesh);

  scene.add(marsGroup);

  // sun
  const sunMaterial = new THREE.MeshBasicMaterial({
    map: sunTexture
  });
  const sunMesh = new THREE.Mesh(geometry, sunMaterial);
  scene.add(sunMesh);

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {
      mesh.rotation.y = time * 0.60;
      marsMesh.rotation.y = time * 0.30;
      marsGroup.rotation.y = time * 0.10;
      earthGroup.rotation.y = time * 0.20;
      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      controls.dispose();
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);

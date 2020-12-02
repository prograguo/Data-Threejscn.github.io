
var renderer, scene, camera, cubeCamera;

var lightProbe;



function init() {

  // renderer
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  renderer.outputEncoding = THREE.sRGBEncoding;

  // scene
  scene = new THREE.Scene();

  // camera
  camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set( 0, 0, 30 );

  var cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 256, {
    encoding: THREE.sRGBEncoding, // since gamma is applied during rendering, the cubeCamera renderTarget texture encoding must be sRGBEncoding
    format: THREE.RGBAFormat
  } );

  cubeCamera = new THREE.CubeCamera( 1, 1000, cubeRenderTarget );

  // controls
  var controls = new OrbitControls( camera, renderer.domElement );
  controls.addEventListener( 'change', render );
  controls.minDistance = 10;
  controls.maxDistance = 50;
  controls.enablePan = false;

  // probe
  lightProbe = new THREE.LightProbe();
  scene.add( lightProbe );

  // envmap
  var genCubeUrls = function ( prefix, postfix ) {

    return [
      prefix + 'px' + postfix, prefix + 'nx' + postfix,
      prefix + 'py' + postfix, prefix + 'ny' + postfix,
      prefix + 'pz' + postfix, prefix + 'nz' + postfix
    ];

  };

  var urls = genCubeUrls( 'p2models', '.png' );

  new THREE.CubeTextureLoader().load( urls, function ( cubeTexture ) {

    cubeTexture.encoding = THREE.sRGBEncoding;

    scene.background = cubeTexture;

    cubeCamera.update( renderer, scene );

    lightProbe.copy( LightProbeGenerator.fromCubeRenderTarget( renderer, cubeRenderTarget ) );

    scene.add( new LightProbeHelper( lightProbe, 5 ) );

    render();

  } );

  // listener
  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

  renderer.setSize( window.innerWidth, window.innerHeight );

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  render();

}

function render() {

  renderer.render( scene, camera );

}

init();

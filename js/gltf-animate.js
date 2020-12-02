// these need to be accessed inside more than one function so we'll declare them first
let container;
let camera;
let controls;
let renderer;
let scene;
let gltf;
let model;

//add material name here first
let newMaterial, Standard, newStandard;

const mixers = [];
const clock = new THREE.Clock();

let cube;

function init() {

  container = document.querySelector( '#scene-container' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x8FBCD4 );

//add cube
  // const cubeGeometry = new THREE.CubeGeometry(10, 10, 10);
  // const cubMaterial = new THREE.MeshLambertMaterial({color: 0xF3FFE2});
  // cube = new THREE.Mesh(cubeGeometry, cubMaterial);
  // cube.position.set(55, 5, 50);
  // scene.add(cube);
  // addGUI();


  createCamera();
  createControls();
  createLights();
  createMaterials();
  loadModels();
  createRenderer();

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

function createCamera() {

  camera = new THREE.PerspectiveCamera( 35, container.clientWidth / container.clientHeight, 0.1, 10000 );
  camera.position.set( 15, 44, 65);

}

function createControls() {

  controls = new THREE.OrbitControls( camera, container );

}


function createLights() {

  const ambientLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 5 );

  const mainLight = new THREE.DirectionalLight( 0xffffff, 5 );
  mainLight.position.set( 10, 10, 10 );

  scene.add( ambientLight, mainLight );

}

function createMaterials(){

     let diffuseColor = "#9E4300";
     newMaterial = new THREE.MeshBasicMaterial( { color: "#9E4300", skinning: true} );
     Standard = new THREE.MeshStandardMaterial( { color: "#9E4300", skinning: true} );

     var imgTexture = new THREE.TextureLoader().load( "textures/vented-metal-panel1-bl/vented-metal-panel1_albedo.png" );
     				imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;
     				imgTexture.anisotropy = 16;


     newStandard = new THREE.MeshStandardMaterial( {
										map: imgTexture,
										bumpMap: imgTexture,
										bumpScale: 1,
										//color: diffuseColor,
										metalness: 0.5,
										roughness: 0.1,
										//envMap: imgTexture,
                    displacementmap: imgTexture,
                    displacementscale: 0.1,
                    skinning: true
									} );



}


// function addGUI() {
//   var datGUI = new dat.GUI();
//   const cubeFolder = datGUI.addFolder("Cube")
//   cubeFolder.add(cube.rotation, "x", 10000, Math.PI * 2, 0.01)
//   cubeFolder.add(cube.rotation, "y", 10000, Math.PI * 2, 0.01)
//   cubeFolder.add(cube.rotation, "z", 10000, Math.PI * 2, 0.01)
//   cubeFolder.open()
// }


function loadModels() {

  const loader = new THREE.GLTFLoader();

  // A reusable function to set up the models. We're passing in a position parameter
  // so that they can be individually placed around the scene
  const onLoad = ( gltf, position, material ) => {

    const model = gltf.scene.children[ 0 ];
    model.position.copy( position );

  /* const animation = gltf.animations[ 0 ];

    const mixer = new THREE.AnimationMixer( model );
    mixers.push( mixer );

    const action = mixer.clipAction( animation );
    action.play();
    */
    //var newMesh = new THREE.MESH()

    let object = gltf.scene;

    object.traverse((child) => {
                       if (child.isMesh) {
                       child.material = material; // a material created above
                  }
                 });
                   scene.add(object);

    //scene.add( model );

  };

  // the loader will report the loading progress to this function
  const onProgress = () => {};

  // the loader will send any error messages to this function, and we'll log
  // them to to console
  const onError = ( errorMessage ) => { console.log( errorMessage ); };

  // load the first model. Each model is loaded asynchronously,
  // so don't make any assumption about which one will finish loading first
  const parrotPosition = new THREE.Vector3( 0, 0, 0 );
  loader.load( 'models/galaxy.glb', gltf => onLoad( gltf, parrotPosition, newStandard, "meshname"), onProgress, onError );
  console.log()
  //const flamingoPosition = new THREE.Vector3( 7.5, 0, -10 );
  //loader.load( 'models/Flamingo.glb', gltf => onLoad( gltf, flamingoPosition ), onProgress, onError );

  //const storkPosition = new THREE.Vector3( 0, -2.5, -10 );
  //loader.load( 'models/Stork.glb', gltf => onLoad( gltf, storkPosition ), onProgress, onError );
  // function gltf ( gltf ) {
  //         model=gltf.scene;
  //         cube_Geometry = new THREE.BoxGeometry(10,10,10);
  //         cube_Material = new THREE.MeshNormalMaterial();
  //         cube_Mesh = new THREE.Mesh(cube_Geometry, cube_Material);
  //         cube_Mesh.position.set(0,5,0);
  //         canvas_Scene.add(cube_Mesh);
  //         canvas_Scene.add(gltf.scene);
  //         modelsLoaded = true;
  //     }


}

function createRenderer() {

  // create a WebGLRenderer and set its width and height
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( container.clientWidth, container.clientHeight );

  renderer.setPixelRatio( window.devicePixelRatio );

  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;

  renderer.physicallyCorrectLights = true;



  container.appendChild( renderer.domElement );

}

function update() {

  const delta = clock.getDelta();

  // /*for ( const mixer of mixers ) {
  //
  //   mixer.update( delta );
  // }
  // */

}

function render() {

  console.log(camera.position);
//   for ( var i = 0; i < 3; i++ )
//   {     if(scene.children[i].isMesh) {
//          scene.children[i].rotation.y += 0.01;  }  } 

    object.traverse ( function (child) { 
      if (child.isMesh) { 
        model.rotation.x += 0.1;
      // model.rotation.y += 0.1;
      // model.rotation.z += 0.1;
        }
  });


  renderer.render( scene, camera );

}

function onWindowResize() {

  camera.aspect = container.clientWidth / container.clientHeight;

  // update the camera's frustum
  camera.updateProjectionMatrix();

  renderer.setSize( container.clientWidth, container.clientHeight );

}

window.addEventListener( 'resize', onWindowResize );

init();

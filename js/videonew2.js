// FPS
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})();

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer( );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// update viewport on resize
window.addEventListener( 'resize', function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize( width, height );
    camera.aspect = width / height; //aspect ratio
    camera.updateProjectionMatrix();
});


//wind
var params = {
				enableWind: true,
			};

var windForce = new THREE.Vector3( 40, 10, -20 );

function simulate( now ) {

				var windStrength = Math.cos( now / 7000 ) * 20 + 40;

				windForce.set( Math.sin( now / 2000 ), Math.cos( now / 3000 ), Math.sin( now / 1000 ) );
				windForce.normalize();
				windForce.multiplyScalar( windStrength );

				var i, j, il, particles, particle, constraints, constraint;

				// Aerodynamics forces

				if ( params.enableWind ) {

					var indx;
					var normal = new THREE.Vector3();
					//var indices = loader.index;
					//var normals = loader.attributes.normal;

					//particles = model.particles;

					//for ( i = 0, il = indices.count; i < il; i += 3 ) {

					//	for ( j = 0; j < 3; j ++ ) {

							// indx = indices.getX( i + j );
							// normal.fromBufferAttribute( normals, indx );
							// tmpForce.copy( normal ).normalize().multiplyScalar( normal.dot( windForce ) );
							// particles[ indx ].addForce( tmpForce );

						//}

				//	}

				}

				// for ( particles = model.particles, i = 0, il = particles.length; i < il; i ++ ) {
        //
				// 	particle = particles[ i ];
				// 	particle.addForce( gravity );
        //
				// 	particle.integrate( TIMESTEP_SQ );

				}

function init() {
        container = document.createElement( 'div' );
				document.body.appendChild( container );

        var gui = new dat.GUI();
				gui.add( params, 'enableWind' ).name( 'Enable wind' );

				//

				if ( typeof TESTING !== 'undefined' ) {

					for ( var i = 0; i < 50; i ++ ) {

						simulate( 500 - 10 * i );

					}

				}

			}




// controls
controls = new THREE.OrbitControls( camera, renderer.domElement);

const loader = new THREE.GLTFLoader();

// A reusable function to set up the models. We're passing in a position parameter
// so that they can be individually placed around the scene
const onLoad = ( gltf, position ) => {

  const model = gltf.scene.children[ 0 ];
  model.position.copy( position );
  model.rotation.w= -0.507;
  model.rotation.x= 0.707;
  model.rotation.y= -0.5;
  model.rotation.z= -0.007;
  // model.scale.x= 1.5;
  // model.scale.y= 1.5;
  // model.scale.z= 1.5;


  // // const animation = gltf.animations[ 0 ];
  // //
  // // const mixer = new THREE.AnimationMixer( model );
  // // mixers.push( mixer );
  //
  // const action = mixer.clipAction( animation );
  // action.play();

  scene.add( model );

};

// the loader will report the loading progress to this function
const onProgress = () => {};

// the loader will send any error messages to this function, and we'll log
// them to to console
const onError = ( errorMessage ) => { console.log( errorMessage ); };

// load the first model. Each model is loaded asynchronously,
// so don't make any assumption about which one will finish loading first
const parrotPosition = new THREE.Vector3( 40, 9, -10 );
loader.load( 'models/kite/untitled.glb', gltf => onLoad( gltf, parrotPosition ), onProgress, onError );

const flamingoPosition = new THREE.Vector3( 0, 12, -5 );
loader.load( 'models/kite/scene.gltf', gltf => onLoad( gltf, flamingoPosition ), onProgress, onError );

const storkPosition = new THREE.Vector3( 20, 15, 0 );
loader.load( 'models/kite/scene.gltf', gltf => onLoad( gltf, storkPosition ), onProgress, onError );

const parrotPosition1 = new THREE.Vector3( 11,11,-20 );
loader.load( 'models/kite/untitled.glb', gltf => onLoad( gltf, parrotPosition1 ), onProgress, onError );

const flamingoPosition2 = new THREE.Vector3( 15,15,15 );
loader.load( 'models/kite/scene.gltf', gltf => onLoad( gltf, flamingoPosition2 ), onProgress, onError );

const storkPosition3 = new THREE.Vector3( 0,0,0 );
loader.load( 'models/kite/scene.gltf', gltf => onLoad( gltf, storkPosition3 ), onProgress, onError );


//windAnimation
  // //const model = gltf.scene;
  // const animations = gltf.animations;
  //
  // mixer = new AnimationMixer(model);
  // mixer.clipAction( animations [0]).play();


// creates the shape
var geometry = new THREE.CubeGeometry( 250, 250, 250 );
var cubeMaterials = [
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( "project 2/model/px.jpg" ), side: THREE.DoubleSide }), //front side
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( 'project 2/model/nx.jpg' ), side: THREE.DoubleSide }), //back side
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( 'project 2/model/py.jpg' ), side: THREE.DoubleSide }), //up side
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( 'project 2/model/ny.jpg' ), side: THREE.DoubleSide }), //down side
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( 'project 2/model/pz.jpg' ), side: THREE.DoubleSide }), //right side
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( 'project 2/model/nz.jpg' ), side: THREE.DoubleSide }) //left side
];

var cubeMaterial = new THREE.MeshFaceMaterial( cubeMaterials );
var cube = new THREE.Mesh( geometry, cubeMaterial );
scene.add( cube );


// Camera Position
camera.position.z = 30;

// lighting
var ambientLight = new THREE.AmbientLight( 0xFFFFFF, 0.3 );
scene.add( ambientLight );



//game logic
var update = function ( ) {
    //cube.rotation.x += 0.01;
    cube.rotation.y += 0.0005;
};

// function loadModels() {
//
//
// }




//render logic
var render = function ( ) {
    renderer.render( scene, camera );
};



// wind
init();

function animate( now ) {

				requestAnimationFrame( animate );
				simulate( now );
				render();
				//stats.update();

			}
animate(0);

//run game loop (update, render, repeat)
var GameLoop = function () {
    requestAnimationFrame( GameLoop);
    update();
    render();
};
//loadModels();
GameLoop();

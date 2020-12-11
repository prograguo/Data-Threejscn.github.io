
//const Stats = require('js/three.js-master/examples/jsm/libs/stats.module.js');
//THREE.TrackballControls = import from ('/Data-Threejs.github.io/js/TrackballControls.js')(THREE);

//import Stats from "js/three.js-master/examples/jsm/libs/stats.module.js";


let camera, controls, scene, renderer, loader;
let container, stats, Stats;

			console.log("Before Init")
			init();
		//	loadPCD();
			console.log("After Init")
			// loadTrack();
			console.log("Before animate", controls)
			animate();
			function init() {

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0x000000 );

				camera = new THREE.PerspectiveCamera( 15, window.innerWidth / window.innerHeight, 0.01, 40 );
				camera.position.x = 0.4;
				camera.position.z = - 2;
				camera.up.set( 0, 0, 1 );

				scene.add( camera );

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				//

				container = document.createElement( 'div' );
				document.body.appendChild( container );
				container.appendChild( renderer.domElement );



        	// loader = new THREE.PCDLoader();
          // loader.load( 'Data-Threejs.github.io/models/Zaghetto.pcd', function ( points ) {
					//
          // scene.add( points );
          // const center = points.geometry.boundingSphere.center;
          // controls.target.set( center.x, center.y, center.z );
          // controls.update();

          // called when loading is in progresses
					// function error ( xhr ) {
					//
					// 	console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
					//
					// }
					// // called when loading has errors
					function error1( error ) {

						console.log( 'An error happened' );

					}

				//	console.log("pcdload",loadPCD)

        // } );




    //var loadTrack = function () {
          //Manager from ThreeJs to track a loader and its status
          // var manager = new THREE.LoadingManager();
          //Loader for Obj from Three.js

//
		container = document.createElement( 'div' );
		    document.body.appendChild( container );
		    container.appendChild( renderer.domElement );
//

				// var loadStats = function() {
				// 	//Manager from ThreeJs to track a loader and its status
				// 	var manager = new THREE.LoadingManager();
				// 	//Loader for Obj from Three.js

				controls = new THREE.TrackballControls(camera,renderer.domElement);

				controls.rotateSpeed = 2.0;
				controls.zoomSpeed = 0.3;
				controls.panSpeed = 0.2;

				controls.staticMoving = true;

				controls.minDistance = 0.3;
				controls.maxDistance = 0.3 * 100;


				stats = new Stats();
				container.appendChild( stats.dom );

				window.addEventListener( 'resize', onWindowResize, false );

				window.addEventListener( 'keypress', keyboard );

				//};
				//console.log("Stats = ",stats);
    }




			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
				controls.handleResize();

			}

			function keyboard( ev ) {

				const points = scene.getObjectByName( 'Zaghetto.pcd' );

				switch ( ev.key || String.fromCharCode( ev.keyCode || ev.charCode ) ) {

					case '+':
						points.material.size *= 1.2;
						points.material.needsUpdate = true;
						break;

					case '-':
						points.material.size /= 1.2;
						points.material.needsUpdate = true;
						break;

					case 'c':
						points.material.color.setHex( Math.random() * 0xffffff );
						points.material.needsUpdate = true;
						break;

				}

			}

			function animate() {

				requestAnimationFrame(animate );
				console.log("test",controls)
			controls.update();

				renderer.render( scene, camera );
		   stats.update();


			}

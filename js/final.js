
let container, stats;
			let camera, controls, scene, renderer;



			init();
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


        var loadPCD = function() {
          //Manager from ThreeJs to track a loader and its status
          var manager = new THREE.LoadingManager();
          //Loader for Obj from Three.js
          var loader = new THREE.PCDLoader(manager);
          loader.load( 'models/Statues_4.pcd', function ( points ) {

          scene.add( points );
          const center = points.geometry.boundingSphere.center;
          controls.target.set( center.x, center.y, center.z );
          controls.update();

          // called when loading is in progresses
	function error ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	}
	// called when loading has errors
	function error1( error ) {

		console.log( 'An error happened' );

	}



        } );
      }



      var loadTrack = function() {
          //Manager from ThreeJs to track a loader and its status
          // var manager = new THREE.LoadingManager();
          //Loader for Obj from Three.js
				controls = new TrackballControls(camera,renderer.domElement);

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

			};
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

				requestAnimationFrame( animate );
			    controls.update();
				renderer.render( scene, camera );
		      stats.update();

			}

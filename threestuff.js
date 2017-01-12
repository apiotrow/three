module.exports = function(){
	//init
	var THREE= require('three');
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	//mouse input init
	var movementX;
	var movementY;
	var mousePosX;
	var mousePosY;
	var onMouseMove = function ( event ) {
		movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
		mousePosX = event.clientX;
		mousePosY = event.clientY;
	};
	document.addEventListener( 'mousemove', onMouseMove, false );

	var light;
	//front light
	light = new THREE.PointLight(0xffffff, 1.2);
	light.position.set(10, 30, 60);
 	scene.add(light);
 	//back light
 	light = new THREE.PointLight(0xffffff, 1.2);
	light.position.set(-10, -30, -60);
 	scene.add(light);

	var geometry = new THREE.BoxGeometry(1, 1, 1);
	var material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
	var cube = new THREE.Mesh( geometry, material );
	cube.rotation.x = Math.PI / 180;
	cube.rotation.y = Math.PI / 180;
	cube.position.set(0, 0, 0);
	scene.add(cube);

	cube = new THREE.Mesh( geometry, material );
	cube.rotation.x = Math.PI / 180;
	cube.rotation.y = Math.PI / 180;
	cube.position.set(1, 0, 0);
	scene.add(cube);

	var render = function () {
		requestAnimationFrame(render);

		// rotateCamera();
		
		if(mousePosX === undefined || mousePosY === undefined)
			setCameraAngle(135, 100);
		else
			setCameraAngle(mousePosX, mousePosY);
		renderer.render(scene, camera);
	};
	render();

	var angle = 0;
	var camDistance = 10; 
	function rotateCamera(){
		var timer = Date.now() * 0.01;
		camera.position.x = camDistance * Math.cos( angle );  
		camera.position.z = camDistance * Math.sin( angle );
		angle += 0.01;
		camera.lookAt( scene.position );
	}

	function setCameraAngle(angleH, angleY){
		angle += 90;
		camera.position.x = camDistance * Math.cos(angleH * Math.PI / 180);  
		camera.position.z = camDistance * Math.sin(angleH * Math.PI / 180);
		// camera.position.y = camDistance * Math.sin(angleY * Math.PI / 180);

		// console.log(mousePosY)
		camera.position.y = window.innerHeight / angleY;

		// camera.position.y = angleY * 0.01;
		camera.lookAt( scene.position );
	}

}
module.exports = function(){

	function go(){
		var grammars = {
	 		j: {
	 			a: "ba",
				b: "cb",
				c: "dc",
				d: "ad",
				// e: "ea"
	 		},
	 		six: {
	 			a: 'ab',
	 			b: 'ac',
	 			c: 'cd',
	 			d: 'de',
	 			e: 'ef',
	 			f: 'fa'
	 		},
	 		ju: {
	 			a: 'dad',
	 			b: 'ba',
	 			c: 'bcb',
	 			d: 'dc',
	 			e: 'ded',
	 			f: 'fe'
	 		}
		}


		function randGrammar(){
			gram = {}

			var choices = ['a', 'b', 'c'];

			var rand1;
			var rand2;
			var rand3
			function randomize(){
				rand1 = choices[Math.floor(Math.random() * choices.length)];
				rand2 = choices[Math.floor(Math.random() * choices.length)];
				rand3 = choices[Math.floor(Math.random() * choices.length)];
			}
			randomize();
			gram.a = rand1 + "" + rand2 + "" + rand3;
			randomize();
			gram.b = rand1 + "" + rand2 + "" + rand3;
			randomize();
			gram.c = rand1 + "" + rand2 + "" + rand3;
			
			console.log(gram);
			return gram;

		}

		var vecChange = {
			a: [1, 0, 0],
			b: [-1, 0, 0],
			c: [0, 1, 0],
			d: [0, -1, 0],
			e: [0, 0, 1],
			f: [0, 0, -1],
		}
		var vecChangeStrips = {
			a: [1, 0, 0],
			b: [0, 1, 0],
			c: [-1, 0, 0],
			d: [0, -1, 0],
		}
		var vecChange3 = {
			a: [1, 0, 0],
			b: [0, 1, 0],
			c: [0, 0, 1],
			d: [-1, 0, 0],
			e: [0, -1, 0],
			f: [0, 0, -1],
		}

	 	var Lstring = makeLString("a", 4, grammars.j);
	 	Lstring = "c";
		console.log(Lstring);

		// var vec = [0, 0, 0];
		// for(var i = 0; i < Lstring.length; i++){
		// 	var Lchar = Lstring.charAt(i);
		// 	vec[0] += vecChange2[Lchar][0];
		// 	vec[1] += vecChange2[Lchar][1];
		// 	vec[2] += vecChange2[Lchar][2];

		// 	// console.log(vec);
		// 	addCube(vec[0], vec[1], vec[2]);
		// }

		var Lmatrix = [];
		for(var i = 0; i < Lstring.length; i++){
			var L = makeLString(Lstring.charAt(i), 8, grammars.j);
			var arrayL = [];
			for(var j = 0; j < L.length; j++){
				arrayL.push(L.charAt(j));
			}
			Lmatrix.push(arrayL);
			// console.log(L);
		}

		g = new THREE.Group();
		var vec = [0, 0, 0];
		for(var i = 0; i < Lmatrix.length; i++){
			vec = [0, 0, 0];
			for(var j = 0; j < Lmatrix[i].length; j++){
				// console.log(Lmatrix[i]);
				var LMatrixChar = Lmatrix[i][j];
				vec[0] += vecChangeStrips[LMatrixChar][0];
				vec[1] += vecChangeStrips[LMatrixChar][1];
				vec[2] = i;
				// addCube(vec[0], vec[1], vec[2])
				addCube(vec[0], vec[1], vec[2], g);
			}
		}

		// g = new THREE.Group();
		// var dotGeometry = new THREE.Geometry();
		// var vec = [0, 0, 0];
		// for(var i = 0; i < Lmatrix.length; i++){
		// 	vec = [0, 0, 0];
		// 	for(var j = 0; j < Lmatrix[i].length; j++){
		// 		// console.log(Lmatrix[i]);
		// 		var LMatrixChar = Lmatrix[i][j];
		// 		vec[0] += vecChangeStrips[LMatrixChar][0];
		// 		vec[1] += vecChangeStrips[LMatrixChar][1];
		// 		vec[2] = i;
		// 		dotGeometry.vertices.push(new THREE.Vector3(vec[0], vec[1], vec[2]));
		// 		var dotMaterial = new THREE.PointsMaterial( { size: 1, sizeAttenuation: false } );
		// 		var dot = new THREE.Points( dotGeometry, dotMaterial );
		// 		g.add(dot);
		// 	}
		// }
		// scene.add(g);
		// console.log(g)

		var newGroup = new THREE.Group();
		var dotGeometry = new THREE.Geometry();
		for(var i = 0; i < 360; i += 45){
			// g.rotation.x = i * Math.PI / 180;
			// g.rotation.z = i * Math.PI / 180;
			g.rotation.y = i * Math.PI / 180;
			g.updateMatrixWorld();
			for(var j = 0; j < g.children.length; j++){
				var vector = new THREE.Vector3();
				vector.setFromMatrixPosition( g.children[j].matrixWorld );
				dotGeometry.vertices.push(new THREE.Vector3(vector.x, vector.y, vector.z));
				var dotMaterial = new THREE.PointsMaterial( { size: 1, sizeAttenuation: false } );
				var dot = new THREE.Points( dotGeometry, dotMaterial );
				newGroup.add(dot);
			}
		}
		console.log(newGroup)
		scene.add(newGroup);

		
	}








	//init
	var THREE= require('three');
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	var cameraPointAt = scene.position;

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
	light.position.set(100, 300, 600);
 	scene.add(light);
 	//back light
 	light = new THREE.PointLight(0xffffff, 1.2);
	light.position.set(-100, -300, -600);
 	scene.add(light);

 	var g;
	go();
	
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
	var camDistance = 90; 
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

		// console.log(camera.position.y);

		camera.position.y = window.innerHeight / angleY * 10;

		camera.lookAt(cameraPointAt);
	}

	function addCube(x, y, z, group){
		var geometry = new THREE.BoxGeometry(1, 1, 1);
		var material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
		var cube = new THREE.Mesh( geometry, material );
		cube.rotation.x = Math.PI / 180;
		cube.rotation.y = Math.PI / 180;
		cube.position.set(x, y, z);
		group.add(cube);

		return cube;
	}

	function makeLString(seed, depth, grammar){
		var result = "";
		for(var d = 0; d < depth; d++){
			for(var i = 0; i < seed.length; i++){
				result += grammar[seed.charAt(i)] ;
			}
			seed = result;
			if(d != depth - 1)
				result = "";
		}
		return result;
	}
}
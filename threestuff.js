module.exports = function(){

	function go(){
		var grammars = {
	 		j: {
	 			a: "ba",
				b: "bcb",
				c: "cd",
				d: "da",
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

			var choices = ['a', 'b', 'c', 'd'/*, 'e', 'f'*/];

			var rand1;
			var rand2;
			// var rand3;
			// var rand4;
			// var rand5;
			// var rand6;
			function randomize(){
				rand1 = choices[Math.floor(Math.random() * choices.length)];
				rand2 = choices[Math.floor(Math.random() * choices.length)];
				// rand3 = choices[Math.floor(Math.random() * choices.length)];
				// rand4 = choices[Math.floor(Math.random() * choices.length)];
				// rand5 = choices[Math.floor(Math.random() * choices.length)];
				// rand6 = choices[Math.floor(Math.random() * choices.length)];
			}
			randomize();
			gram.a = rand1 + "" + rand2;
			randomize();
			gram.b = rand1 + "" + rand2;
			randomize();
			gram.c = rand1 + "" + rand2;
			randomize();
			gram.d = rand1 + "" + rand2;
			// randomize();
			// gram.e = rand1 + "" + rand2 + "" + rand3 + "" + rand4 + "" + rand5 + "" + rand6;
			// randomize();
			// gram.f = rand1 + "" + rand2 + "" + rand3 + "" + rand4 + "" + rand5 + "" + rand6;
			
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

	 	var Lstring = makeLString("b", 4, grammars.j);
	 	Lstring = "a";
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
			var L = makeLString(Lstring.charAt(i), 9,  grammars.j);
			var arrayL = [];
			for(var j = 0; j < L.length; j++){
				arrayL.push(L.charAt(j));
			}
			Lmatrix.push(arrayL);
		}

		g = new THREE.Group();
		var vec = [0, 0, 0];
		var vecDuplicateTest = {};
		for(var i = 0; i < Lmatrix.length; i++){
			vec = [0, 0, 0];
			for(var j = 0; j < Lmatrix[i].length; j++){
				// console.log(Lmatrix[i]);
				var LMatrixChar = Lmatrix[i][j];
				vec[0] += vecChangeStrips[LMatrixChar][0];
				vec[1] += vecChangeStrips[LMatrixChar][1];
				vec[2] = i;

				//avoid duplicate vertices
				if(!vecDuplicateTest.hasOwnProperty([vec[0], vec[1], vec[2]])){
					vecDuplicateTest[[vec[0], vec[1], vec[2]]] = 0;
					addCube(vec[0], vec[1], vec[2], g);
				}else{
					// addCube(vec[0], vec[1], vec[2], g); //alternative option
				}
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

		var dotGroup = new THREE.Group();
		var dotGeometry = new THREE.Geometry();
		var degreeIntervals = 30;
		var systemSliceAmt = 360 / degreeIntervals;
		for(var i = 0; i < 360; i += degreeIntervals){
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
				dotGroup.add(dot);
			}
		}
		scene.add(dotGroup);
		console.log(dotGroup);
		console.log(dotGroup.children[0].geometry.vertices.length / 8);

		var systemSliceVertAmt = dotGroup.children[0].geometry.vertices.length / systemSliceAmt;
		systemSlices = [];
		var sliceIter = -1;
		for(i = 0; i < dotGroup.children[0].geometry.vertices.length; i += systemSliceVertAmt){
			systemSlices.push([]);
			sliceIter++;
			for(var j = 0; j < systemSliceVertAmt; j++){
				systemSlices[sliceIter].push(dotGroup.children[0].geometry.vertices[j]);
			}
		}
		console.log(systemSlices);

		var vertices = dotGroup.children[0].geometry.vertices;
		// var mesh;
		var triangles;
		var geometry = new THREE.Geometry();
		var material = new THREE.MeshPhongMaterial({
	        color       : 0x33da87,
	        shininess   : 50, 
	        specular    : 0x33da87,
	        shading     : THREE.SmoothShading,
	        side        : THREE.DoubleSide 
		}); 
		// var material = new THREE.MeshLambertMaterial({
		// 	color       : 0x33da87,
		// 	shading: THREE.FlatShading,
		// 	side        : THREE.DoubleSide 
		// });
		material.polygonOffset = true;
		material.polygonOffsetFactor = -0.1;

		geometry.vertices = vertices;
		triangles = [];
		
		
		console.log(dotGroup.children[0].geometry.vertices.length - systemSliceVertAmt);
		for(var i = 0; i < dotGroup.children[0].geometry.vertices.length; i += systemSliceVertAmt) {
			for(var j = 0; j < systemSliceVertAmt - 1; j++){
				var A;
				var B;
				var C;

				//quad part 1
				A = i + j;

				if(i == dotGroup.children[0].geometry.vertices.length - systemSliceVertAmt){
					B = j + 1;
					C = j;
				}else{
					B = i + j + systemSliceVertAmt + 1;
					C = i + j + systemSliceVertAmt;
				}

				//counter clockwise
				triangles.push(A);
				triangles.push(B);
				triangles.push(C);

				//clockwise
				// triangles.push(C);
				// triangles.push(B);
				// triangles.push(A);

				//quad part 2
				A = i + j;
				B = i + j + 1;

				if(i == dotGroup.children[0].geometry.vertices.length - systemSliceVertAmt){
					C = j + 1;
				}else{
					C = i + j + systemSliceVertAmt + 1;
				}

				//counter clockwise
				triangles.push(A);
				triangles.push(B);
				triangles.push(C);

				//clockwise
				// triangles.push(C);
				// triangles.push(B);
				// triangles.push(A);
			}
		}
		console.log(triangles);

		for( var i = 0; i < triangles.length; i += 3){
		    geometry.faces.push(new THREE.Face3( triangles[i], triangles[i + 1], triangles[i + 2]));
		}
		geometry.dynamic = true;

		mesh = new THREE.Mesh( geometry, material );
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		mesh.traverse( 
			function( node ) { 
				if (node instanceof THREE.Mesh) {
			        node.material = material;
			        node.castShadow = true;
			        node.receiveShadow = true;
			        node.geometry.computeFaceNormals();
                    node.geometry.computeVertexNormals();
    			}
			} 
		);

		//get rid of the white vertex dots
		scene.remove(dotGroup)
	}










	//init
	var THREE= require('three');
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 4000);
	var renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	var cameraPointAt = scene.position;

	var mesh;

 	// renderer.shadowMap.enabled = true;
	renderer.shadowMapSoft = true;
	renderer.shadowCameraNear = 1;
	renderer.shadowCameraFar = camera.far;
	renderer.shadowCameraFov = 75;
	renderer.shadowMapBias = 0.0039;
	renderer.shadowMapDarkness = 0.5;
	renderer.shadowMapWidth = 1024;
	renderer.shadowMapHeight = 1024;
	renderer.setPixelRatio(2);

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
	// light = new THREE.PointLight(0xffffff, 1.2);
	// light.position.set(100, 300, 600);
	// light.castShadow = true;
 // 	scene.add(light);
 	// back light
 // 	light = new THREE.PointLight(0xffffff, 1.2);
	// light.position.set(-100, -300, -600);
	// light.castShadow = true;
 // 	scene.add(light);
 	// directional
 	light = new THREE.DirectionalLight(0xffffff, 1);
 	light.castShadow = true;
 	light.position.x = 100;
    light.position.y = 150;
 	scene.add(light);
 	// light = new THREE.AmbientLight(0x666666);
 	// light.castShadow = true;
 	// scene.add(light);



 	var g;
	go();
	scene.add(mesh);

	
	
	var render = function () {
		requestAnimationFrame(render);

		// rotateCamera();
		mesh.rotation.z += 0.01;
		
		if(mousePosX === undefined || mousePosY === undefined)
			setCameraAngle(135, 100);
		else
			setCameraAngle(mousePosX, mousePosY);
		renderer.render(scene, camera);
	};
	render();

	var angle = 0;
	var camDistance = 30; 
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
		// camera.position.y = camDistance * Math.tan(angleY * Math.PI / 180);

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
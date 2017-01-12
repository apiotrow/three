
module.exports = function(){
	var pixi_lib = require('pixi.js');

	var canvasHeight = 600;
	var renderer = PIXI.autoDetectRenderer(800, canvasHeight, { antialias: true });
	document.body.appendChild(renderer.view);

	// create the root of the scene graph
	var stage = new PIXI.Container();
	stage.interactive = true;
	var graphics = new PIXI.Graphics();

	var grammar1 = {
		a: "bab",
		b: "cbc",
		c: "dcd",
		d: "ada",
		e: "ea"
	}

	var heights = {
		a: -10,
		b: 20,
		c: -20,
		d: 10,
		e: -15
	}

	var letterHeights = {
		a: 50,
		b: 100,
		c: 150,
		d: 200,
		e: 250
	}

	var Lstring = makeLString("a", 5);
	console.log(Lstring);

	function makeLString(seed, depth){
		var result = "";

		for(var d = 0; d < depth; d++){
			for(var i = 0; i < seed.length; i++){
				result += grammar1[seed.charAt(i)] ;
			}
			seed = result;
			if(d != depth - 1)
				result = "";
		}

		return result;
	}



	// set a fill and line style
	graphics.beginFill(0xFF3300);
	graphics.lineStyle(4, 0xffd900, 1);
	graphics.moveTo(0, canvasHeight / 2);

	var x = 0;
	// for(var i = 0; i < Lstring.length; i++){
	// 	var Lchar = Lstring.charAt(i);
	// 	var height = letterHeights[Lchar];
	// 	graphics.lineTo(x, canvasHeight - height);
	// 	x += 10;
	// }
	var currHeight = canvasHeight / 2 + heights[Lstring.charAt(0)]
	for(var i = 1; i < Lstring.length; i++){
		var Lchar = Lstring.charAt(i);
		currHeight += heights[Lchar];
		graphics.lineTo(x, currHeight);
		x += 1;
	}
	graphics.lineTo(x, canvasHeight / 2);
	graphics.endFill();

	stage.addChild(graphics);

	// run the render loop
	animate();

	function animate() {

	    renderer.render(stage);
	    requestAnimationFrame( animate );
	}
	
}
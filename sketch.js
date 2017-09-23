
let ball;
let paddles;
let bricks;

function setup(){
	// runs on page load
	let canvas = createCanvas(300,600);
	canvas.parent(document.getElementById('canvas-holder'));

	// Create ball
	ball = createSprite(width/2, height/1.5, 15, 15); // posx, posy, width, height
	ball.shapeColor = color(220);
	ball.velocity.x = 3;
	ball.velocity.y = -3;

	// Create paddles
	paddles = new Group();
	player = createSprite(50, height-30, 50, 10);
	player.shapeColor = color(225, 0, 0);
	player.immovable = true;

	enemy = createSprite(50, 20, 50, 10);
	enemy.shapeColor = color(0, 0, 0);
	enemy.immovable = true;

	// Create bricks
	bricks = new Group();
	for (let i=0; i<3; i++){
		let brick = createSprite(width * i/4 + 60, 50, 60, 10);
		brick.shapeColor = color(random(255),random(255),random(255));
		brick.immovable = true;
		brick.health = 3;


		bricks.add(brick);
	}


	paddles.add(player);
	paddles.add(enemy);



}

function draw(){
	// runs every frame
	background(100);

	enemyMove();

	updateFromMouse();
	ballWallBounce();

	ball.bounce(paddles);
	ball.bounce(bricks, breakBrick);

	drawSprites();
}

function updateFromMouse(){
	if (mouseX > 0 && mouseX < width){
		player.position.x = mouseX + player.width/2;
	}
}
function ballWallBounce(){
	if (ball.position.x <= 0 || ball.position.x >= (width - ball.width)){
				ball.velocity.x *= -1;
			} 
			if (ball.position.y <= 0 || ball.position.y >= (height - ball.height)) {
				ball.velocity.y *= -1;
			}
}

function enemyMove(){
	if (ball.position.y < height * 0.3){
		enemy.position.x = ball.position.x;
	}
	
}

function breakBrick(theBall, theBrick){
	theBrick.health -= 1;
	theBrick.shapeColor = color(random(255),random(255),random(255));

	console.log(theBrick.health);
	if (theBrick.health <= 0){
		theBrick.remove();
	}
}


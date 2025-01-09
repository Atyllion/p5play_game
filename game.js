// Game variables
let player;
let floor;

function setup() {
    // Create the game canvas (16:9 aspect ratio)
    createCanvas(windowWidth, windowHeight);

    // Create the player sprite
    player = new Sprite();
    player.width = 32;
    player.height = 32;
    player.color = 'blue';

    // Set up basic player movement
    player.friction = 0.1;
    player.maxSpeed = 4;

    world.gravity = 5;

    floor = new Sprite();
    floor.width = windowWidth;
    floor.height = 100;
    floor.y = height - floor.height / 2;
    floor.color = 'green';
    floor.immovable = true;
    floor.collider = 'static';
}

function draw() {
    // Set the background
    background(220);

    // Update the player
    player.update();

    // move the camera to follow the player
    camera.position.x = player.x;
    camera.position.y = player.y;

    // controll of the player
    

    // Player jump control
    if (kb.presses('space') && player.collides(floor)) {
        player.vel.y = -10;
    }

    // Shooting control
    if (kb.presses('f')) {
        let bullet = new Sprite(player.x, player.y, 10, 10);
        bullet.color = 'red';
        bullet.vel.x = player.mirror.x ? -10 : 10;
    }

    // Update player direction based on movement
    if (player.vel.x > 0) {
        player.mirror.x = false; // Facing right
    } else if (player.vel.x < 0) {
        player.mirror.x = true; // Facing left
    }
} 
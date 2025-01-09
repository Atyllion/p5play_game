// Game variables
let player;
let floor; // pour plus tard
let ennemies; // pour plus tard

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

    // Create initial enemies
    ennemies = new Group();
    for (let i = 0; i < 5; i++) {
        let ennemy = new Sprite();
        ennemy.width = 32;
        ennemy.height = 32;
        ennemy.color = 'red';
        ennemy.x = random(0, width);
        ennemy.y = random(0, height);
        ennemy.health = 100;
        ennemies.add(ennemy);
    }
}

function draw() {
    clear();
    background(26, 129, 32);

    // Move the camera to follow the player
    camera.position.x = player.x;
    camera.position.y = player.y;

    // Shooting gun
    if (mouseIsPressed && mouseButton === LEFT && !this.shot) {
        let bullet = new Sprite(player.x, player.y, 10, 10);
        bullet.color = 'red';
        bullet.stroke = 'red';

        let angle = atan2(mouseY - player.y, mouseX - player.x);
        bullet.vel.x = cos(angle) * 15;
        bullet.vel.y = sin(angle) * 15;

        bullet.collider = 'none';
        this.shot = true;

        // Bullet hit enemy
        bullet.overlaps(ennemies, (ennemy) => {
            ennemy.health -= 20;
            bullet.remove();
        });

    } else if (!mouseIsPressed) {
        this.shot = false;
    }

    // Repair gun 
    if (mouseIsPressed && mouseButton === RIGHT && !this.repair) {
        let repair = new Sprite(player.x, player.y, 10, 10);
        repair.color = 'yellow';
        repair.stroke = 'yellow';

        let angle = atan2(mouseY - player.y, mouseX - player.x);
        repair.vel.x = cos(angle) * 15;
        repair.vel.y = sin(angle) * 15;

        repair.collider = 'none';
        this.repair = true;

        // Repair gun ability
        repair.overlaps(ennemies, (ennemy) => {
            ennemy.health += 10;
            repair.remove();
        });

    } else if (!mouseIsPressed) {
        this.repair = false;
    }

    // Control of the player
    if (kb.pressing('up')) {
        player.direction = -90;
        player.speed = player.maxSpeed;
    } else if (kb.pressing('down')) {
        player.direction = 90;
        player.speed = player.maxSpeed;
    } else if (kb.pressing('left')) {
        player.direction = 180;
        player.speed = player.maxSpeed;
    } else if (kb.pressing('right')) {
        player.direction = 0;
        player.speed = player.maxSpeed;
    } else {
        player.speed = 0;
    }

    // Draw health bars for enemies
    for (let ennemy of ennemies) {
        fill(255, 0, 0);
        rect(ennemy.x - 16, ennemy.y - 32, 32, 5);
        fill(0, 255, 0);
        rect(ennemy.x - 16, ennemy.y - 32, (ennemy.health / 100) * 32, 5);
    }
}

// Game variables
let player;
let ennemies;
let damageBullets;
let repairBullets;
let healthBarWidth = 32;
let healthBarHeight = 5;
let Dammages = 10;
let Reparation = 10;
let canShoot = true;
let canRepair = true;

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
        ennemy.healthBarHP = 100; // Initialize health for each enemy
        ennemies.add(ennemy);
    }

    // Create groups for bullets
    damageBullets = new Group();
    repairBullets = new Group();
}

function draw() {
    clear();
    background(26, 129, 32);

    // Move the camera to follow the player
    camera.position.x = player.x;
    camera.position.y = player.y;

    // Shooting damage bullets
    if (mouseIsPressed && mouseButton === LEFT && canShoot) {
        let bullet = new Sprite(player.x, player.y, 10, 10);
        bullet.color = 'red';
        bullet.stroke = 'red';

        let angle = atan2(mouseY - player.y, mouseX - player.x);
        bullet.vel.x = cos(angle) * 15;
        bullet.vel.y = sin(angle) * 15;

        bullet.collider = 'none';
        bullet.life = 50; // Bullet will disappear after 50 frames
        damageBullets.add(bullet);
        canShoot = false;
    }

    // Shooting repair bullets
    if (mouseIsPressed && mouseButton === RIGHT && canRepair) {
        let repair = new Sprite(player.x, player.y, 10, 10);
        repair.color = 'yellow';
        repair.stroke = 'yellow';

        let angle = atan2(mouseY - player.y, mouseX - player.x);
        repair.vel.x = cos(angle) * 15;
        repair.vel.y = sin(angle) * 15;

        repair.collider = 'none';
        repair.life = 50; // Repair bullet will disappear after 50 frames
        repairBullets.add(repair);
        canRepair = false;
    }

    // Reset shooting ability when mouse is released
    if (!mouseIsPressed) {
        canShoot = true;
        canRepair = true;
    }

    // Check for damage bullet collisions with enemies
    damageBullets.overlap(ennemies, (bullet, ennemy) => {
        bullet.remove();
        ennemy.healthBarHP -= Dammages; // Apply damage to the enemy

        // Remove enemy if health is 0 or less
        if (ennemy.healthBarHP <= 0) {
            ennemy.remove();
        }
    });

    // Check for repair bullet collisions with enemies
    repairBullets.overlap(ennemies, (repair, ennemy) => {
        repair.remove();
        ennemy.healthBarHP = min(ennemy.healthBarHP + Reparation, 100); // Apply reparation to the enemy, but not beyond max health
    });

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

    // Draw the health bar for each enemy
    ennemies.forEach(ennemy => {
        drawHealthBar(ennemy.x, ennemy.y - 40, ennemy.healthBarHP, 100);
    });
}

function drawHealthBar(x, y, currentHealth, maxHealth) {
    // Calculate the health ratio
    let healthRatio = currentHealth / maxHealth;

    // Draw the background of the health bar (red)
    fill(255, 0, 0);
    rect(x - healthBarWidth / 2, y, healthBarWidth, healthBarHeight);

    // Draw the foreground of the health bar (green) based on current health
    fill(0, 255, 0);
    rect(x - healthBarWidth / 2, y, healthBarWidth * healthRatio, healthBarHeight);
}
// Game variables

// mobs
let player;
let ennemies;
let friends;

// bullets
let damageBullets;
let repairBullets;

// health bar
let healthBarWidth = 32;
let healthBarHeight = 5;
let playerHealth = 100;

// game mechanics
let Dammages = 10;
let Reparation = 10;
let canShoot = true;
let canRepair = true;

// score
let score = 0;

// animation
let shapeShifterAni;

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

    // Create initial friends
    friends = new Group();
    generateFriend();

    // Load the shape shifter animation for enemies
    shapeShifterAni = loadAni(
        'assets/pixil-frame-0_6-petit.png',
        'assets/pixil-frame-0_7-petit.png',
    );

    // Scale the shape shifter animation frames
    shapeShifterAni.scale = 0.5;

    shapeShifterAni.frameDelay = 20;

    // Assign the animation to each enemy
    ennemies.forEach(ennemy => {
        ennemy.addAni(shapeShifterAni);
    });

    // Create groups for bullets
    damageBullets = new Group();
    repairBullets = new Group();
}

function draw() {
    clear();
    background(26, 129, 32);
    animation(shapeShifterAni, 250, 80);

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
            score += 100; // Increase score by 100 for each enemy killed
        }
    });

    // Check for repair bullet collisions with enemies
    repairBullets.overlap(ennemies, (repair, ennemy) => {
        repair.remove();
        ennemy.healthBarHP = min(ennemy.healthBarHP + Reparation, 100); // Apply reparation to the enemy, but not beyond max health
    });

    // Check for repair bullet collisions with friends
    repairBullets.overlap(friends, (repair, friend) => {
        repair.remove();
        friend.healthBarHP = min(friend.healthBarHP + Reparation, 100); // Apply reparation to the friend, but not beyond max health
    });

    // Check for enemy collisions with player
    ennemies.overlap(player, (ennemy, player) => {
        playerHealth -= Dammages; // Apply damage to the player

        // End game if player health is 0 or less
        if (playerHealth <= 0) {
            playerDeath(); // Call the playerDeath function
        }
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

    // Draw the health bar for each friend
    friends.forEach(friend => {
        drawHealthBar(friend.x, friend.y - 40, friend.healthBarHP, 100);
    });

    // Update the appearance of friends based on their health
    friends.forEach(friend => {
        if (friend.healthBarHP < 100) {
            friend.changeAnimation('assets/pixil-frame-0_15-petit.png');
        } else {
            friend.changeAnimation('asqzsets/pixil-frame-0_16-petit.png');
        }
    });

    // remove friends if they are fully healed (2 seconds after reaching full health)
    friends.forEach(friend => {
        if (friend.healthBarHP === 100) {
            setTimeout(() => {
                friend.remove();
            }, 2000);
        }
    });

    // Draw the health bar for the player
    drawHealthPlayer(player.x, player.y - 40, playerHealth, 100);

    // Draw the score in the top right corner
    drawScore();
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

function drawHealthPlayer(x, y, currentHealth, maxHealth) {
    // Calculate the health ratio
    let healthRatio = currentHealth / maxHealth;

    // Draw the background of the health bar (red)
    fill(255, 0, 0);
    rect(x - healthBarWidth, y, healthBarWidth * 2, healthBarHeight * 2);

    // Draw the foreground of the health bar (green) based on current health
    fill(0, 255, 0);
    rect(x - healthBarWidth, y, (healthBarWidth * 2) * healthRatio, healthBarHeight * 2);

    // Draw the border of the health bar
    noFill();
    stroke(0);
    rect(x - healthBarWidth, y, healthBarWidth * 2, healthBarHeight * 2);
}

function drawScore() {
    fill(255);
    textSize(24);
    textAlign(RIGHT, TOP);
    text(`Score: ${score}`, width - 20, 20);
}

function playerDeath() {
    noLoop(); // Stop the game loop
    window.location.href = 'death.html'; // Redirect to the 'death' page
}

function MobGeneration() {
    for (let i = 0; i < 5; i++) {
        let ennemy = new Sprite();
        ennemy.width = 32;
        ennemy.height = 32;
        ennemy.color = 'red';
        ennemy.x = random(0, width);
        ennemy.y = random(0, height);
        ennemy.healthBarHP = 100; // Initialize health for each enemy
        ennemy.addAni(shapeShifterAni); // Assign the animation to the enemy
        ennemies.add(ennemy);
    }
}

// Generate a friend with low health
function generateFriend() {
    let friend = new Sprite();
    friend.width = 32;
    friend.height = 32;
    friend.color = 'green';
    friend.x = random(0, width);
    friend.y = random(0, height);
    friend.healthBarHP = 20; // Initialize health for the friend with low health
    friends.add(friend);
}

// Call MobGeneration every minute (20000 milliseconds)
setInterval(MobGeneration, 20000);

// make a new friend appear every 10 seconds
setInterval(generateFriend, 10000);
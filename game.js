// Game variables

// mobs
let bricks = [];
let left = [];
let top1 = [];
let bot = [];
let lefttop = [];
let lefttopcorner = [];
let rightTuile = [];
let midTuile = [];
let leftTuile = [];
let leftbot = [];
let leftb = [];
let cornerRT = [];
let cornerbc = [];
let right = [];
let rightb = [];
let leftCorner = [];    
let tilesGroup = [];
let landImage;
let tileWidth = 40;
let tileHeight = 40;
let obstacles = [];
let gridSize = 10;
let zoomFactor = 3;
let currentImage = 0;
let lastToggleTime = 0;
let toggleInterval = 250;
let num = 1;
let vPressedPreviously = false;
let ennemies;
let friends;

// bullets
let damageBullets;
let repairBullets;
let enemyBullets; 

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
    // FP
    createCanvas(1080, 680);

    playerImage = loadImage('./assets/perso1.png');
    playerImage2 = loadImage('./assets/perso2.png');
    playerImage3 = loadImage('./assets/perso3.png');
    playerImage4 = loadImage('./assets/perso4.png');
    rightImage = loadImage('./assets/right.png');
    leftCornerImage = loadImage('./assets/cornerleft.png');
    leftImage = loadImage('./assets/left.png');
    topImage = loadImage('./assets/top.png');
    botImage = loadImage('./assets/bot.png');
    rightCornerImage = loadImage('./assets/rightcorner.png');
    rightbcImage = loadImage('./assets/rightbc.png');
    rightbImage = loadImage('./assets/rightb.png');
    leftbImage = loadImage('./assets/leftb.png');
    lefttopImage = loadImage('./assets/lefttop.png');
    lefttopcornerImage = loadImage('./assets/lefttopcorner.png');
    leftbotImage = loadImage('./assets/leftbotcorner.png');
    leftTuileImage = loadImage('./assets/lefttuile.png');
    rightTuileImage = loadImage('./assets/righttuile.png');
    midTuileImage = loadImage('./assets/midtuile.png');

    landImage = loadImage('./assets/land.svg');    // Image pour les briques
    // Carte en grille
    tilesGroup = [
        "............................",
        "............................",
        '...........wtttc...........',
        '...........l===o...........',
        '.......wttty===itttc.......',
        '.......l=======aze=o.......',
        '.......l===========o.......',
        '.......l===========o.......',
        '.......l===========o.......',
        '.......l===========o.......',
        '.......l===========o.......',
        '.......l===========o.......',
        '.......nbbbd===xbbbr........',
        '...........l===o..........',
        '...........nbbbr.......',
        "............................",
        "............................",
    ];

    // Création des briques
    for (let row = 0; row < tilesGroup.length; row++) {
        for (let col = 0; col < tilesGroup[row].length; col++) {
            if (tilesGroup[row][col] === '=') {
                // Ajout d'une brique
                bricks.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
            }
            else if (tilesGroup[row][col] === 'o') {
                // Ajout d'un obstacle
                right.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
            }
            else if (tilesGroup[row][col] === 'i') {
                // Ajout d'un obstacle
                leftCorner.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
            }
            else if (tilesGroup[row][col] === 'l') {
                // Ajout d'un obstacle
                left.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
            }
            else if (tilesGroup[row][col] === 't') {
                // Ajout d'un obstacle
                top1.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
            }
            else if (tilesGroup[row][col] === 'b') {
                // Ajout d'un obstacle
                bot.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
            }
            else if (tilesGroup[row][col] === 'c') {
                // Ajout d'un obstacle
                cornerRT.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
            }
            else if (tilesGroup[row][col] === 'x') {
                // Ajout d'un obstacle
                cornerbc.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
            }
            else if (tilesGroup[row][col] === 'r') {
                // Ajout d'un obstacle
                rightb.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
            }
            else if (tilesGroup[row][col] === 'n') {
                // Ajout d'un obstacle
                leftb.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
            }
            else if (tilesGroup[row][col] === 'w') {
                // Ajout d'un obstacle
                lefttop.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
            }
            else if (tilesGroup[row][col] === 'y') {
                // Ajout d'un obstacle
                lefttopcorner.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
            }
            else if (tilesGroup[row][col] === 'd') {
                // Ajout d'un obstacle
                leftbot.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
            }
            else if (tilesGroup[row][col] === 'a') {
                // Ajout d'un obstacle
                leftTuile.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
            }
            else if (tilesGroup[row][col] === 'e') {
                // Ajout d'un obstacle
                rightTuile.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
            }
            else if (tilesGroup[row][col] === 'z') {
                // Ajout d'un obstacle
                midTuile.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
        }
    }
    }
    player = new Sprite();
    player.width = tileWidth;
    player.height = tileHeight;
    player.image = playerImage;

    // Placer le joueur au centre de la carte
    player.x = (tilesGroup[0].length * tileWidth) / 2;
    player.y = (tilesGroup.length * tileHeight) / 2;

    player.scale = 0.010;

    // Set up basic player movement
    player.friction = 0.1;
    player.maxSpeed = 4;

    // Create initial enemies
    ennemies = new Group();
    for (let i = 0; i < 3; i++) {
        let validSpawn = false;
        let ennemy;

        while (!validSpawn) {
            let x = random(0, tilesGroup[0].length) * tileWidth;
            let y = random(0, tilesGroup.length) * tileHeight;

            let col = floor(x / tileWidth);
            let row = floor(y / tileHeight);

            if (tilesGroup[row][col] === '=') {
                ennemy = new Sprite();
                ennemy.width = 32;
                ennemy.height = 32;
                ennemy.color = 'red';
                ennemy.x = x;
                ennemy.y = y;
                ennemy.healthBarHP = 100; // Initialize health for each enemy
                validSpawn = true;
            }
        }

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
    enemyBullets = new Group(); // Initialize the enemy bullets group

    // Set interval for enemies to shoot bullets
    setInterval(enemyShoot, 8000);
    
}

function draw() {
    background(0,0,255);
    translate(width / 2, height / 2);
    scale(zoomFactor);
    translate(-player.x, -player.y);

    
    // Dessiner les briques avec des images
    for (let brick of bricks) {
        image(landImage, brick.x, brick.y, brick.w, brick.h); // Dessiner chaque brique avec l'image
    }
    for (let lefts of right) {
        image(rightImage, lefts.x, lefts.y, lefts.w, lefts.h);
    }
    for (let lefts of leftCorner) {
        image(leftCornerImage, lefts.x, lefts.y, lefts.w, lefts.h);
    }
    for (let lefts of left) {
        image(leftImage, lefts.x, lefts.y, lefts.w, lefts.h);
    }
    for (let lefts of top1) {
        image(topImage, lefts.x, lefts.y, lefts.w, lefts.h);
    }
    for (let lefts of bot) {
        image(botImage, lefts.x, lefts.y, lefts.w, lefts.h);
    }
    for (let lefts of cornerRT) {
        image(rightCornerImage, lefts.x, lefts.y, lefts.w, lefts.h);
    }
    for (let lefts of cornerbc) {
        image(rightbcImage, lefts.x, lefts.y, lefts.w, lefts.h);
    }
    for (let lefts of rightb) {
        image(rightbImage, lefts.x, lefts.y, lefts.w, lefts.h);
    }
    for (let lefts of leftb) {
        image(leftbImage, lefts.x, lefts.y, lefts.w, lefts.h);
    }
    for (let lefts of lefttop) {
        image(lefttopImage, lefts.x, lefts.y, lefts.w, lefts.h);
    }
    for (let lefts of lefttopcorner) {
        image(lefttopcornerImage, lefts.x, lefts.y, lefts.w, lefts.h);
    }
    for (let lefts of leftbot) {
        image(leftbotImage, lefts.x, lefts.y, lefts.w, lefts.h);
    }
    for (let lefts of leftTuile) {
        image(leftTuileImage, lefts.x, lefts.y, lefts.w, lefts.h);
    }
    for (let lefts of rightTuile) {
        image(rightTuileImage, lefts.x, lefts.y, lefts.w, lefts.h);
    }
    for (let lefts of midTuile) {
        image(midTuileImage, lefts.x, lefts.y, lefts.w, lefts.h);
    }

    animation(shapeShifterAni, 250, 80);
    checkWinCondition();

    // Move the camera to follow the player
    camera.position.x = player.x;
    camera.position.y = player.y;

    // Shooting damage bullets
    if (mouseIsPressed && mouseButton === LEFT && canShoot) {
        let bullet = new Sprite(player.x, player.y, 10, 10);
        bullet.color = 'red';
        bullet.stroke = 'red';
        push();
        resetMatrix();
        let angle = atan2(mouseY - height / 2, mouseX - width / 2);
        bullet.vel.x = cos(angle) * 15;
        bullet.vel.y = sin(angle) * 15;
        pop();
        bullet.collider = 'none';
        bullet.life = 50; // Bullet will disappear after 50 frames
        damageBullets.add(bullet);
        canShoot = false;
        num = 1;
        togglePlayerImage();
    }

    // Shooting repair bullets
    if (mouseIsPressed && mouseButton === RIGHT && canRepair) {
        let repair = new Sprite(player.x, player.y, 10, 10);
        repair.color = 'yellow';
        repair.stroke = 'yellow';
        push();
        resetMatrix();
        let angle = atan2(mouseY - player.y, mouseX - player.x);
        repair.vel.x = cos(angle) * 15;
        repair.vel.y = sin(angle) * 15;
        pop();
        repair.collider = 'none';
        repair.life = 50; // Repair bullet will disappear after 50 frames
        repairBullets.add(repair);
        canRepair = false;
        num = 2;
        togglePlayerImage();
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
            playerHealth = min(playerHealth + 5, 100); // Increase player health by 5
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
        let previousHealth = friend.healthBarHP; // Store previous health before updating
        friend.healthBarHP = min(friend.healthBarHP + Reparation, 100); // Apply reparation to the friend, but not beyond max health

        // Increase score by 50 if the friend is fully healed
        if (previousHealth < 100 && friend.healthBarHP === 100) {
            score += 50;
        }
    });

    // Check for enemy bullet collisions with player
    enemyBullets.overlap(player, (bullet, player) => {
        bullet.remove();
        playerHealth -= Dammages; // Apply damage to the player

        // End game if player health is 0 or less
        if (playerHealth <= 0) {
            playerDeath(); // Call the playerDeath function
        }
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
    let nextX = player.x;
    let nextY = player.y;

    if (kb.pressing('up')) {
        nextY -= player.maxSpeed;
        maybeTogglePlayerImage();
    } else if (kb.pressing('down')) {
        nextY += player.maxSpeed;
        maybeTogglePlayerImage();
    } else if (kb.pressing('left')) {
        nextX -= player.maxSpeed;
        maybeTogglePlayerImage();
    } else if (kb.pressing('right')) {
        nextX += player.maxSpeed;
        maybeTogglePlayerImage();
    }

    let col = floor(nextX / tileWidth);
    let row = floor(nextY / tileHeight);

    if (tilesGroup[row] && tilesGroup[row][col] === '=') {
        player.x = nextX;
        player.y = nextY;
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
            friend.changeAnimation('assets/pixil-frame-0_16-petit.png');
        }

        // remove friends if they are fully healed (2 seconds after reaching full health)
        if (friend.healthBarHP === 100 && !friend.removalScheduled) {
            friend.removalScheduled = true;
            setTimeout(() => {
                friend.remove();
            }, 2000);
        }

        let previousHealth = friend.healthBarHP;

        // Increase score by 50 if the friend is fully healed
        if (previousHealth < 100 && friend.healthBarHP === 100) {
            score += 50;
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
    rect(x - healthBarWidth / 2, y + 10, healthBarWidth, healthBarHeight);

    // Draw the foreground of the health bar (green) based on current health
    fill(0, 255, 0);
    rect(x - healthBarWidth / 2, y + 10, healthBarWidth * healthRatio, healthBarHeight);

    // Draw the border of the health bar
    noFill();
    stroke(0);
    rect(x - healthBarWidth / 2, y + 10, healthBarWidth, healthBarHeight);
}

function drawScore() {
    push();
    resetMatrix(); // Reset transformations to draw the score in absolute position
    fill(255, 255, 255); // Change text color to white for better visibility
    textSize(32); // Increase text size to 32
    textAlign(LEFT, TOP);
    text(`Score: ${score}`, 20, 20);
    pop();
}

function playerDeath() {
    noLoop(); // Stop the game loop
    window.location.href = 'death.html'; // Redirect to the 'death' page

    // Save the score in local storage
    localStorage.setItem('score', score);
}

function MobGeneration() {
    for (let i = 0; i < 5; i++) {
        let validSpawn = false;
        let ennemy;

        while (!validSpawn) {
            let x = random(0, tilesGroup[0].length) * tileWidth;
            let y = random(0, tilesGroup.length) * tileHeight;

            let col = floor(x / tileWidth);
            let row = floor(y / tileHeight);

            if (tilesGroup[row][col] === '=') {
                ennemy = new Sprite();
                ennemy.width = 32;
                ennemy.height = 32;
                ennemy.color = 'red';
                ennemy.x = x;
                ennemy.y = y;
                ennemy.healthBarHP = 100; // Initialize health for each enemy
                ennemy.addAni(shapeShifterAni); // Assign the animation to the enemy
                validSpawn = true;
            }
        }

        ennemies.add(ennemy);
    }
}

// Generate a friend with low health
function generateFriend() {
    let validSpawn = false;
    let friend;

    while (!validSpawn) {
        let x = random(0, tilesGroup[0].length) * tileWidth;
        let y = random(0, tilesGroup.length) * tileHeight;

        let col = floor(x / tileWidth);
        let row = floor(y / tileHeight);

        if (tilesGroup[row][col] === '=') {
            friend = new Sprite();
            friend.width = 32;
            friend.height = 32;
            friend.color = 'green';
            friend.x = x;
            friend.y = y;
            friend.healthBarHP = 20; // Initialize health for the friend with low health
            friend.collider = 'none'; // Disable collision for the friend
            validSpawn = true;
        }
    }

    friends.add(friend);
}

// Function for enemies to shoot bullets towards the player
function enemyShoot() {
    ennemies.forEach(ennemy => {
        let bullet = new Sprite(ennemy.x, ennemy.y, 10, 10);
        bullet.color = 'purple';
        bullet.stroke = 'purple';
        
        let angle = atan2(player.y - ennemy.y, player.x - ennemy.x);
        bullet.vel.x = cos(angle) * 10;
        bullet.vel.y = sin(angle) * 10;

        bullet.collider = 'none';
        enemyBullets.add(bullet);
    });
}

// Check if the player has won the game
function checkWinCondition() {
    if (score >= 2500) {
        WinGame(); // Call the WinGame function
    }
}

function WinGame() {
    noLoop(); // Stop the game loop
    window.location.href = './win.html'; // Redirect to the 'win' page

    // Save the score in local storage
    localStorage.setItem('score', score);
}

// Call MobGeneration every 15 seconds
setInterval(MobGeneration, 15000);

// make a new friend appear every 10 seconds
setInterval(generateFriend, 10000);

function maybeTogglePlayerImage() {
    if (millis() - lastToggleTime > toggleInterval) {
        togglePlayerImage();
        lastToggleTime = millis();
    }
}

function togglePlayerImage() {
    currentImage = (currentImage + 1) % 2;
    if (num === 1) {
        player.image = currentImage === 0 ? playerImage : playerImage2;
    } else if (num === 2) {
        player.image = currentImage === 0 ? playerImage3 : playerImage4;
    }
}
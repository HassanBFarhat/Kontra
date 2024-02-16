class Lance {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        this.game.lance = this;

        this.radius = 20;
        this.visualRadius = 200;

        this.spritesheet2 = ASSET_MANAGER.getAsset("./sprites/Lance_3.png");


        //Lance's state variables
        this.facing = 0; // 0 = right, 1 = left
        /*
         * 0 = idle, 1 = walking, = 2 = jumping, 3 = falling, 4 = walk diagonal up left, 
         * 5 = walk diagonal down left, 6 = walk diagonal up right, 
         * 7 = walk diagonal down right, 8 = crouching, 9 = looking up, 10 = dead,
         * 11 = walk/shooting
        */
        this.state = 2; // Start in jumping state
        this.dead = false;
        this.isSpawning = true;
        this.isOnGround = false;
        this.isJumping = false;
        this.isDropping = false; // Dropping from platform
        this.lives = 2;
        this.collided = false;
        this.hit = false;

        this.velocity = {x: 0, y: 0};
        this.WALK_SPEED = 300;
        this.FALL_SPEED = 200;
        this.JUMP_TICK = 0;
        this.width = 30 * PARAMS.SCALE;
        this.height = 34 * PARAMS.SCALE;

        // The edges of the last touched ground entity
        let ledgeR = 0; 
        let ledgeL = 0;

        this.updateBoundingBox();
        this.lastBB = this.BB;

        //Lance's Animations
        this.animations = [];
        this.loadAnimations();

        this.elapsedTime = 0;
        this.fireRate = 0.120; // how many seconds between bullets.
        this.bulletCount = 0; // How many bullets have been fired (and still exist)
        this.maxBullets = 5; // how many bullets allowed at once
        this.lastBulletTime = 0;
    };

    loadAnimations() {

        //all animations here

        for (let i = 0; i < 12; i++) {   // 12 states
            this.animations.push([]);
            for (let j = 0; j < 2; j++) {   // 2 directions
                this.animations[i].push([]);
            }
        }

        // idle right
        this.animations[0][0] = new Animator(this.spritesheet2, 105, 610, 30, 34, 1, 0.1, 30, false, true);
        // idle left
        this.animations[0][1] = new Animator(this.spritesheet2, 105, 495, 30, 34, 1, 0.1, 30, false, true);

        // walk right
        this.animations[1][0] = new Animator(this.spritesheet2, 175, 610, 30, 34, 6, 0.1, 30, false, true);
        // walk left
        this.animations[1][1] = new Animator(this.spritesheet2, 175, 495, 30, 34, 6, 0.1, 30, false, true);

        // jump right
        this.animations[2][0] = new Animator(this.spritesheet2, 38, 825, 20, 22, 2, 0.1, 36, false, true);
        // jump left
        this.animations[2][1] = new Animator(this.spritesheet2, 38, 725, 20, 22, 2, 0.1, 36, true, true); //reverse bc sprites reversed on sheet

        // walk diagonal left/up
        this.animations[4][1] = new Animator(this.spritesheet2, 272, 38, 22, 36, 3, 0.1, 36.4, true, true); //reverse bc sprites reversed on sheet
        // walk diagonal left/down
        this.animations[5][1] = new Animator(this.spritesheet2, 90, 38, 25, 36, 3, 0.1, 36.4, true, true); //reverse bc sprites reversed on sheet
        // walk diagonal right/up
        this.animations[6][0] = new Animator(this.spritesheet2, 38, 164, 22, 36, 3, 0.1, 36.4, false, true);
        // walk diagonal right/down
        this.animations[7][0] = new Animator(this.spritesheet2, 212, 164, 25, 36, 3, 0.1, 36.4, false, true);

        // crouch left
        this.animations[8][1] = new Animator(this.spritesheet2, 38, 495, 34, 18, 1, 0.1, 30, false, true);
        // crouch right
        this.animations[8][0] = new Animator(this.spritesheet2, 38, 610, 34, 18, 1, 0.1, 30, false, true);

        // look up left
        this.animations[9][1] = new Animator(this.spritesheet2, 38, 38, 18, 45, 1, 0.1, 30, false, true);
        // look up right
        this.animations[9][0] = new Animator(this.spritesheet2, 395, 164, 18, 45, 1, 0.1, 30, false, true);

        // dead left
        this.animations[10][1] = new Animator(this.spritesheet2, 38, 288, 34, 24, 3, 0.5, 25, true, false); //reverse bc sprites reversed on sheet
        // dead right
        this.animations[10][0] = new Animator(this.spritesheet2, 38, 392, 34, 24, 3, 0.5, 25, false, false);

        // walk left and shooting
        this.animations[11][1] = new Animator(this.spritesheet2, 38, 925, 28, 35, 3, 0.1, 36, true, true);
        // walk right and shooting
        this.animations[11][0] = new Animator(this.spritesheet2, 38, 1039, 28, 35, 3, 0.1, 36, false, true);
    };

    updateBoundingBox() {
        switch (this.state) { // One of the switch statements of all time
            case 1: // Moving
                this.BB = new BoundingBox(this.x + 5, this.y, this.width - this.width/2 + 4, this.height);
                break;
            case 6: // Up-right
            case 4: // Up-left
                this.BB = new BoundingBox(this.x + 15, this.y, this.width - this.width/2 + 4, this.height);
                break;
            case 7: // down-right
            case 5: // down-left
                this.BB = new BoundingBox(this.x + 15, this.y +5, this.width - this.width/2 + 4, this.height +5);
                break;
            case 9: // UP
                this.BB = new BoundingBox(this.x + 10, this.y, this.width - this.width/2 - 5, this.height);
                break;
            default:
                if (this.facing === 0) { // Right
                    if (this.state == 0) // idle right
                        this.BB = new BoundingBox(this.x + 30, this.y, this.width - this.width/2 - 5, this.height);
                    if (this.state === 11) // Moving and shooting right
                        this.BB = new BoundingBox(this.x + 15, this.y, this.width - this.width/2, this.height);
                } else if (this.facing === 1) {  // Left
                    if  (this.state == 0) // idle left
                        this.BB = new BoundingBox(this.x + 15, this.y, this.width - this.width/2, this.height);
                    if (this.state === 11) // Moving and shooting left
                        this.BB = new BoundingBox(this.x + 36, this.y, this.width - this.width/2, this.height);
                } else {
                    this.BB = new BoundingBox(this.x + 30, this.y, this.width - this.width/2 - 5, this.height);
                }
        }

        if (!this.isDropping && (!this.isOnGround || this.isJumping)) {
            this.BB = new BoundingBox(this.x, this.y, this.width-42, this.height - 12*PARAMS.SCALE);
        } else if (this.state === 8 && this.isOnGround) { // crouching on ground
            this.BB = new BoundingBox(this.x, this.y, this.width + 4*PARAMS.SCALE, this.height - 16*PARAMS.SCALE);
        } else if (this.state === 8) {
            this.BB = new BoundingBox(this.x, this.y, this.width + 4*PARAMS.SCALE, this.height - 16*PARAMS.SCALE);
        }
    };

    updateLastBoundingBox() {
        this.lastBB = this.BB;
    };

    die() {
        this.dead = true;
    };

    respawn() {
        this.state = 2; // Start in jumping state
        this.dead = false;
        this.isSpawning = true;
        this.isOnGround = false;
        this.isJumping = false;
        this.isDropping = false;
        this.collided = false;
        this.hit = false;
        this.y = 100;
    }

    update() {
        const TICK = this.game.clockTick;
        this.elapsedTime += TICK;

        // if (this.dead && this.lives > 0) {
        //     this.respawn();
        // }

        // A button
        if (this.game.A && this.isOnGround) {
            if (!this.game.right && !this.game.left && this.game.down) { // Drop from platform
                this.isOnGround = false;
                this.isDropping = true;
            } else if (!this.isJumping) { // Jump
                this.isJumping = true;
                this.isOnGround = false;
                this.JUMP_TICK = 1;
            }
        }

        // Jump action
        if (this.isJumping) {
            if (this.JUMP_TICK > 0) {
                this.JUMP_TICK -= TICK;
                this.y -= this.FALL_SPEED * TICK
            } else if (!this.isDropping) {
                this.isJumping = false;
            }
        }
      
        // update state
        if (this.game.right && this.game.up) this.state = 6; 
        else if (this.game.right && this.game.down) this.state = 7;
        else if (this.game.left && this.game.up) this.state = 4;
        else if (this.game.left && this.game.down) this.state = 5;
        else if (this.game.left && this.game.B) this.state = 11;
        else if (this.game.right && this.game.B) this.state = 11;
        else if (this.game.left) this.state = 1;
        else if (this.game.right) this.state = 1;
        else if (this.game.down) this.state = 8;
        else if (this.game.up) this.state = 9
        else if (this.dead) this.state = 10;
        else this.state = 0; // idle state;

        // Movement
        if (this.game.right) {
            this.x += this.WALK_SPEED * TICK
            this.facing = 0; // right
        } else if (this.game.left) {
            this.x -= this.WALK_SPEED * TICK
            this.facing = 1; // left
        } 

        // Crouch on ground
        if (this.isOnGround && this.game.down) {
            this.y += 64;
        }

        // Bullet logic
        if (this.game.B) {
            if (this.elapsedTime - this.lastBulletTime > this.fireRate && this.bulletCount < this.maxBullets) {
                switch (this.state) {
                    case 0:
                    case 11: // walking
                        if (this.facing === 0) { // right
                            this.game.addEntity(new Bullet(this.game, this.x + this.width, this.y + this.width/2 - PARAMS.SCALE, this, false, 0, true, false));
                        } else { // left
                            this.game.addEntity(new Bullet(this.game, this.x - 6 * PARAMS.SCALE, this.y + this.width/2 - PARAMS.SCALE, this, false, 180, true, false));
                        }
                        break;
                    case 6: // up right
                        this.game.addEntity(new Bullet(this.game, this.BB.right, this.y + 2*PARAMS.SCALE, this, false, 45, true, false));
                        break;
                    case 7: // down right
                        this.game.addEntity(new Bullet(this.game, this.BB.right, this.y + 3*PARAMS.SCALE, this, false, 315, true, false));
                        break;
                    case 4: // up left
                        this.game.addEntity(new Bullet(this.game, this.BB.left, this.y + 4*PARAMS.SCALE, this, false, 135, true, false));
                        break;
                    case 5: // down left
                        this.game.addEntity(new Bullet(this.game, this.BB.left, this.y + 3* PARAMS.SCALE, this, false, 225, true, false));
                        break;
                    case 8: // crouching
                        if (!this.isOnGround) { // Mid jump
                            this.game.addEntity(new Bullet(this.game, this.x + this.width/2 - 20, this.y + 27*PARAMS.SCALE - PARAMS.SCALE, this, false, 270, true, false));
                        } else if (this.facing === 0) { // right
                            this.game.addEntity(new Bullet(this.game, this.x + this.width, this.y - 6*PARAMS.SCALE, this, false, 0, true, false));
                        } else {
                            this.game.addEntity(new Bullet(this.game, this.x, this.y - 6*PARAMS.SCALE, this, false, 180, true, false));
                        }
                        break;
                    case 9: // up
                        if (this.facing === 1) {
                            this.game.addEntity(new Bullet(this.game, this.x + 4 * PARAMS.SCALE, this.y - 8 * PARAMS.SCALE, this, false, 90, true, false));
                        } else {
                            this.game.addEntity(new Bullet(this.game, this.x + this.width/2 - 4 * PARAMS.SCALE, this.y - 8 * PARAMS.SCALE, this, false, 90, true, false));
                        }
                        break;
                    default:
                        console.log("Lance firing hit default state, this shouldn't happen")
                }
    
                this.bulletCount++; // We give bullet `this` as source, so it can reduce bullet count when it removes itself                
                this.lastBulletTime = this.elapsedTime;
            }
        }

        // Fall unless on ground or jumping
        if (!this.isJumping || this.isJumping && this.isDropping) {
            this.y += this.FALL_SPEED * TICK;
        }

        // Check Collisions
        this.updateBoundingBox();
        this.game.entities.forEach(entity => { 
            if (entity.BB && this.BB.collide(entity.BB)) { // Enitity has BB and collides
                if ((!this.isDropping && !this.isJumping) && entity instanceof Ground && this.lastBB.bottom <= entity.BB.top + 10) { // Collided with ground
                    this.isOnGround = true;
                    this.isJumping = false;
                    this.isSpawning = false;
                    this.updateBoundingBox(); // Update bounding box now that we've landed and changed BB state
                    this.y = entity.BB.y - this.BB.height;
                    this.updateBoundingBox(); // Update bounding box now that we've moved lance up to the top of hte ground
                    // Magic numbers to align more with feet
                    this.ledgeR = entity.BB.right - 10;
                    this.ledgeL = entity.BB.left - this.width + 50;
                } else if (this.isOnGround && entity instanceof Ground && this.lastBB.right >= entity.BB.left && this.lastBB.left < entity.BB.left) { // Left of wall
                    this.x = entity.BB.left - this.BB.width;
                    this.velocity.x = 0;
                    this.updateBoundingBox(); // Needed?
                } else if (this.isOnGround && entity instanceof Ground && this.lastBB.left >= entity.BB.right - 20) { // Right of wall
                    this.x = entity.BB.right;
                    this.velocity.x = 0;
                    this.updateBoundingBox(); // Needed?
                } else if (entity instanceof Soldier && this.BB.collide(entity.BB) && !this.collided) {
                    // set lances state to dying state
                    this.collided = true;
                    if (this.lives == 0) this.removeFromWorld = true;
                    else {
                        this.lives--;
                        this.die();
                        setTimeout(this.respawn.bind(this), 3200);
                    }
                }
            }
        });

        this.updateLastBoundingBox();

        if (this.isOnGround && (this.x > this.ledgeR || this.x < this.ledgeL)) { // walked off ledge
            this.isOnGround = false;
        }
        
        if (this.y >= PARAMS.CANVAS_HEIGHT - 32*PARAMS.SCALE -8) { // hit bottom of screen
            this.isOnGround = true;
            this.isJumping = false;
            this.isDropping = false;
            this.y = PARAMS.CANVAS_HEIGHT - 32*PARAMS.SCALE -8
            if (this.state === 8) { // crouching
                this.y += 64;
            }
            this.updateBoundingBox();
        }
    };


    draw(ctx) {
        if (this.isJumping || this.isSpawning || (!this.isOnGround && !this.isDropping)) { // Jumping takes precidence
            this.animations[2][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
        } else if (this.state == 0) { // if idle
            if (this.facing == 1) { // if facing left
                ctx.drawImage(this.spritesheet2, 105, 495, 30, 34, this.x - this.game.camera.x - this.width/2 + 16, this.y, 1.85 *PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH + 8);
            } else { // facing right
                ctx.drawImage(this.spritesheet2, 105, 610, 30, 34, this.x - this.game.camera.x, this.y, 1.85 * PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH + 8);
            }
        } else if (this.state === 8) { // crouching  
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
        } else if (this.state === 9) { //looking directly up
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - 11 *PARAMS.SCALE, PARAMS.SCALE);
        } else if (this.state === 10) {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - 40 *PARAMS.SCALE, PARAMS.SCALE);
        } else {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
        }

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
            ctx.font = "10px Arial";
            ctx.fillStyle = "white";
            ctx.fillText("x: " + this.x, this.x - this.game.camera.x, this.y - 10);
            ctx.fillText("y: " + this.y, this.x - this.game.camera.x, this.y - 20);
            ctx.fillText("state: " + this.state, this.x - this.game.camera.x, this.y - 30);
            ctx.fillText("facing: " + this.facing, this.x - this.game.camera.x, this.y - 40);
            ctx.fillText("isOnGround: " + this.isOnGround, this.x - this.game.camera.x, this.y - 50);
            ctx.fillText("isJumping: " + this.isJumping, this.x - this.game.camera.x, this.y - 60);
        }
    };
}
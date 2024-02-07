class Lance {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        this.game.lance = this;

        this.spritesheet2 = ASSET_MANAGER.getAsset("./sprites/Lance_2.png");

        //Lance's state variables
        this.facing = 0; // 0 = right, 1 = left
        /*
         * 0 = idle, 1 = walking, = 2 = jumping, 3 = falling, 4 = walk diagonal up left, 
         * 5 = walk diagonal down left, 6 = walk diagonal up right, 
         * 7 = walk diagonal down right, 8 = crouching, 9 = looking up, 10 = dead
        */
        this.state = 2; // Start in jumping state
        this.dead = false;
        this.isOnGround = false;
        this.isFalling = true;
        this.isJumping = true;
        this.isDropping = false; // Dropping from platform

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
        this.fireRate = 0.002 // half a second
        this.bulletCount = 0; // How many bullets have been fired (and still exist)
        this.maxBullets = 5; // how many bullets allowed at once
    };

    loadAnimations() {

        //all animations here

        for (let i = 0; i < 11; i++) {   // 11 states
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
        this.animations[10][1] = new Animator(this.spritesheet2, 38, 288, 34, 25, 3, 0.1, 30, true, true); //reverse bc sprites reversed on sheet
        // dead right
        this.animations[10][0] = new Animator(this.spritesheet2, 38, 392, 34, 25, 3, 0.1, 30, false, true);

    };

    updateBoundingBox() {
        if (this.facing === 0) {
            this.BB = new BoundingBox(this.x + 15, this.y, this.width - this.width/2 + 10, this.height);
        } else {
            this.BB = new BoundingBox(this.x - 5, this.y, this.width - this.width/2 + 10, this.height);
        }
    };

    updateLastBoundingBox() {
        this.lastBB = this.BB;
    };

    die() {
        this.dead = true;
    };

    update() {
        const TICK = this.game.clockTick;

        this.elapsedTime += TICK;

        // A button
        if (this.game.A && this.isOnGround) {
            if (!this.game.right && !this.game.left && this.game.down) { // Drop from platform
                this.isOnGround = false;
                this.isFalling = true;
                this.isDropping = true;
            } else { // Jump
                this.state = 2;
                this.isOnGround = false;
                this.isFalling = false;
                this.isJumping = true;
                this.JUMP_TICK = 1;
            }
        }

        // Jump action
        if (this.state === 2) {
            if (this.JUMP_TICK > 0) {
                this.JUMP_TICK -= TICK;
                this.y -= this.FALL_SPEED * TICK
            } else {
                this.JUMP_TICK = 0;
                this.state = 3; // Falling
                this.isFalling = true;
            }
        }

        // Fall unless on ground or jumping
        if (this.state != 2 && this.isFalling) {
            this.state = 3;
            this.y += this.FALL_SPEED * TICK;
        }

        // Walking
        if (this.game.right) {
            this.x += this.WALK_SPEED * TICK
            this.facing = 0; //right
        } else if (this.game.left) {
            this.x -= this.WALK_SPEED * TICK
            this.facing = 1; //left
        }


        /*

        PLACE LOGIC FOR FIRING BULLET HERE

        */
        // for (let i = 0; i < this.game.entities.length; i++) {
        //     let ent = this.game.entities[i];
        //     // if ((ent instanceof Soldier || ent instanceof Sniper) && canSee(this, ent) && this.elapsedTime > this.fireRate) {
        //     //     this.elapsedTime = 0;
        //     //     this.game.addEntity(new Bullet(this.game, 120, 432, true));
        //     // }

        //     if (ent instanceof Soldier && canSee(this, ent) && this.elapsedTime > this.fireRate && this.game.B) {
        //         this.elapsedTime = 0;
        //         this.game.addEntity(new Bullet(this.game, 120, 432, false, true));
        //     }
        // } 
        if (this.game.B) {
            if (this.bulletCount < this.maxBullets) {
                this.bulletCount++; // We give bullet `this` as source, so it can reduce bullet count when the bullet is removed
                this.game.addEntity(new Bullet(this.game, this.x + this.width, 432, this, false, true));
            }
        }



        // Check Collisions
        this.updateBoundingBox();
        this.game.entities.forEach(entity => { 
            if (entity.BB && this.BB.collide(entity.BB)) { // Enitity has BB and collides
                if (this.isFalling && entity instanceof Ground && this.lastBB.bottom <= entity.BB.top) { // Collided with ground
                    if (!this.isDropping) {
                        this.isOnGround = true;
                        this.isFalling = false;
                        this.isJumping = false;
                        this.y = entity.BB.y - this.BB.height;
                        this.velocity.y = 0; 
                    }
                    this.isDropping = false;
                    this.updateBoundingBox();
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
                }
            }
        });

        this.updateLastBoundingBox();

        if (this.isOnGround && (this.x > this.ledgeR || this.x < this.ledgeL)) { // walked off ledge
            this.isOnGround = false;
            this.isFalling = true;
        }
        
        if (this.y >= PARAMS.CANVAS_HEIGHT - 32*PARAMS.SCALE -8) { // hit bottom of screen
            this.isOnGround = true;
            this.isFalling = false;
            this.isJumping = false;
        }
      
        // update state
        if (this.state !== 2) {
            if (this.isJumping) {this.state = 2;} // This is stupid
            else if (this.game.right && this.game.up) this.state = 6;
            else if (this.game.right && this.game.down) this.state = 7;
            else if (this.game.left && this.game.up) this.state = 4;
            else if (this.game.left && this.game.down) this.state = 5;
            else if (this.game.left) this.state = 1;
            else if (this.game.right) this.state = 1;
            else if (this.game.down) this.state = 8;
            else if (this.game.up) this.state = 9
            else if (this.dead) this.state = 10;
            else this.state = 0;
        }
    
    };


    draw(ctx) {
        if (this.state == 0) { // if idle
            if (this.facing == 1) { // if facing left
                ctx.drawImage(this.spritesheet2, 105, 495, 30, 34, this.x - this.game.camera.x - this.width/2 + 16, this.y, 1.85 *PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH + 8);
            } else { // facing right
                ctx.drawImage(this.spritesheet2, 105, 610, 30, 34, this.x - this.game.camera.x, this.y, 1.85 * PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH + 8);
            }
        } else if (this.state === 8) { // crouching  
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y + 16*PARAMS.SCALE, PARAMS.SCALE);
        } else if (this.state === 9) { //looking directly up
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - 11 *PARAMS.SCALE, PARAMS.SCALE);
        } else {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
        }

        if (PARAMS.DEBUG) {
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
            // draw text of coordinates
            ctx.font = "10px Arial";
            ctx.fillStyle = "white";
            ctx.fillText("x: " + this.x, this.x - this.game.camera.x, this.y - 10);
            ctx.fillText("y: " + this.y, this.x - this.game.camera.x, this.y - 20);
            ctx.fillText("state: " + this.state, this.x - this.game.camera.x, this.y - 30);
            ctx.fillText("facing: " + this.facing, this.x - this.game.camera.x, this.y - 40);
            ctx.fillText("isOnGround: " + this.isOnGround, this.x - this.game.camera.x, this.y - 50);
            ctx.fillText("isFalling: " + this.isFalling, this.x - this.game.camera.x, this.y - 60);
        }
    };
}
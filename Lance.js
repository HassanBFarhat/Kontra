class Lance {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        this.game.lance = this;

        // TODO: Proper sprite alignment and framecount for animation
        // this.animator = new Animator(ASSET_MANAGER.getAsset("./sprites/Lance.png"), 108, 154, 28, 34, 1, 0.5, 1, false, true);

        //spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/Lance.png");

        //Lance's state variables
        this.facing = 0; // 0 = right, 1 = left
        this.state = 0; // 0 = idle, 1 = walking, = 2 = jumping 3 = falling
        this.dead = false;
        this.isOnGround = false;

        this.velocity = {x: 0, y: 0};
        this.WALK_SPEED = 300;
        this.FALL_SPEED = 200;
        this.JUMP_TICK = 0;
        this.width = 30 * PARAMS.SCALE;
        this.height = 34 * PARAMS.SCALE;

        // The ends of the last touched ground
        let ledgeR = 0; 
        let ledgeL = 0;

        this.updateBoundingBox();

        //Lance's Animations
        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations() {

        //all animations here

        for (let i = 0; i < 3; i++) {   // 3 states
            this.animations.push([]);
            for (let j = 0; j < 2; j++) {   // 2 directions
                this.animations[i].push([]);
            }
        }

        //idle
        //idle facing right = 0
        this.animations[0][0] = new Animator(this.spritesheet, 108, 154, 30, 34, 1, 0.1, 30, false, true);
        //idle facing left = 1
        this.animations[0][1] = new Animator(this.spritesheet, 108, 39, 30, 34, 1, 0.1, 30, false, true);

        //walking
        //walking facing right = 0
        this.animations[1][0] = new Animator(this.spritesheet, 170, 154, 30, 34, 6, 0.1, 30, false, true);
        //walking facing left = 1
        this.animations[1][1] = new Animator(this.spritesheet, 170, 39, 30, 34, 6, 0.1, 30, false, true);

        //jumping
        //jumping facing right = 0
        this.animations[2][0] = new Animator(this.spritesheet, 170, 154, 30, 34, 6, 0.1, 30, false, true);
        //jumping facing left = 1
        this.animations[2][1] = new Animator(this.spritesheet, 170, 39, 30, 34, 6, 0.1, 30, false, true);
        this.lastBB = this.BB;
    };

    updateBoundingBox() {
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    };

    updateLastBoundingBox() {
        this.lastBoundingBox = this.boundingBox;
    };

    die() {
        this.dead = true;
    };

    update() {
        const TICK = this.game.clockTick;

        if (this.game.A && this.isOnGround) { // Jump
            this.state = 2;
            this.isOnGround = false;
            console.log("Jumping");
            this.JUMP_TICK = 1;
        }

        if (this.state === 2) {
            if (this.JUMP_TICK > 0) {
                console.log("Jumping");
                this.JUMP_TICK -= TICK;
                this.y -= this.FALL_SPEED * TICK
            } else {
                console.log("Falling")
                this.JUMP_TICK = 0;
                this.state = 3; // Falling
            }
        }


        // velocity physics
        // Walking
        if (this.game.right) {
            this.x += this.WALK_SPEED * TICK
            this.facing = 0; //right
        } else if (this.game.left) {
            this.x -= this.WALK_SPEED * TICK
            this.facing = 1; //left
        }

        this.updateBoundingBox();
        // Check Collisions
        this.game.entities.forEach(entity => { 
            if (entity.BB && this.BB.collide(entity.BB)) { // Enitity has BB and collides
                // if (entity instanceof Ground) {
                //     console.log("Ground TOP: " + entity.BB.top)
                //     console.log("Bottom" + this.lastBB.bottom)
                // }
                if (this.state != 2 && entity instanceof Ground && this.lastBB.bottom <= entity.BB.top) { // Collided with ground
                    this.isOnGround = true;
                    this.y = entity.BB.y - this.BB.height;
                    this.velocity.y = 0;
                    this.updateBoundingBox();
                    console.log("Set ledgeR to " + entity.BB.right)
                    this.ledgeR = entity.BB.right;
                    this.ledgeL = entity.BB.left;
                }
        }
        });

        this.updateLastBoundingBox();

        if (this.isOnGround && (this.x > this.ledgeR || this.x < this.ledgeL)) { // walked off ledge
            this.isOnGround = false;
        }
        
        if (this.y >= PARAMS.CANVAS_HEIGHT - 32*PARAMS.SCALE -8) { // hit bottom of screen
            this.isOnGround = true;
        }

        // Fall unless on ground or jumping
        if (this.state != 2 && !this.isOnGround) {
            this.y += this.FALL_SPEED * TICK;
        }
      

        // // update position
        // this.x += this.velocity.x * TICK * PARAMS.SCALE;
        // this.y += this.velocity.y * TICK * PARAMS.SCALE;
        // this.updateLastBB();
        // this.updateBB();     

        // update state
        if (this.state !== 2) {
            // if (!this.game.left) this.state = 1;
            // else if (!this.game.right) this.state = 1;
            // else this.state = 0;

            if (this.game.left) this.state = 1;
            else if (this.game.right) this.state = 1;
            else this.state = 0;
        }

        // console.log("STATE: " + this.state);

        // update direction



        // console.log("\nFACING: " + this.facing);
    };


    draw(ctx) {
        // this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
        
        if (this.state == 0) { // if idle
            if (this.facing == 1) { // if facing left
                ctx.drawImage(this.spritesheet, 108, 39, 30, 34, this.x - this.game.camera.x, this.y, 1.85 *PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH + 8);
            } else { // facing right
                ctx.drawImage(this.spritesheet, 108, 154, 30, 34, this.x - this.game.camera.x, this.y, 1.85 * PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH + 8);
            }
        } else {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
        }
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        // draw text of coordinates
        ctx.font = "10px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("x: " + this.x, this.x - this.game.camera.x, this.y - 10);
        ctx.fillText("y: " + this.y, this.x - this.game.camera.x, this.y - 20);
        ctx.fillText("state: " + this.state, this.x - this.game.camera.x, this.y - 30);
        ctx.fillText("facing: " + this.facing, this.x - this.game.camera.x, this.y - 40);
        ctx.fillText("isOnGround: " + this.isOnGround, this.x - this.game.camera.x, this.y - 50);
    };

}
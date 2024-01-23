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
        if (this.size === 0 || this.size === 3) {
            this.BB = new Boundingbox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        }
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

        // if (this.state != 2 && !this.isOnGround && this.y < PARAMS.CANVAS_HEIGHT - 32*PARAMS.SCALE -8) {
        //     this.y += this.FALL_SPEED * TICK;
        // }

        // if (this.y >= PARAMS.CANVAS_HEIGHT - 32*PARAMS.SCALE -8) {
        //     this.isOnGround = true;
        // }


        // // update position
        // this.x += this.velocity.x * TICK * PARAMS.SCALE;
        // this.y += this.velocity.y * TICK * PARAMS.SCALE;
        // this.updateLastBB();
        // this.updateBB();


        // TODO:
        //collisions
        

        // update state
        if (this.state !== 2) {
            // if (!this.game.left) this.state = 1;
            // else if (!this.game.right) this.state = 1;
            // else this.state = 0;

            if (this.game.left) this.state = 1;
            else if (this.game.right) this.state = 1;
            else this.state = 0;
        } else {

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
        
    };

}
class Lance {

    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        this.game.lance = this;
        // TODO: Proper sprite alignment and framecount for animation
        this.animator = new Animator(ASSET_MANAGER.getAsset("./sprites/Lance.png"), 108, 154, 24, 34, 1, 0.5, 1, false, true);

        //spritesheet
        // this.spritesheet = ASSET_MANAGER.getAsset("./LanceMovingR+IdleR.png");

        //Lance's state variables
        this.facing = 0; // 0 = right, 1 = left
        this.state = 0; // 0 = idle, 1 = walking, = 2 = jumping 3 = falling
        this.dead = false;
        this.isOnGround = false;

        this.velocity = {x: 0, y: 0};
        this.WALK_SPEED = 175;
        this.FALL_SPEED = 200;
        this.JUMP_TICK = 0;

        this.updateBoundingBox();

        //Lance's Animations
        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations() {

        //all animations here



    };

    updateBoundingBox() {


    };

    updateLastBoundingBox() {


    };

    die() {


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


        //velocity physics
        // Walking
        if (this.game.right) {
            this.x += this.WALK_SPEED * TICK
        } else if (this.game.left) {
            this.x -= this.WALK_SPEED * TICK
        }

        if (this.state != 2 && !this.isOnGround && this.y < PARAMS.CANVAS_HEIGHT - 32*PARAMS.SCALE -8) {
            this.y += this.FALL_SPEED * TICK;
        }

        if (this.y >= PARAMS.CANVAS_HEIGHT - 32*PARAMS.SCALE -8) {
            this.isOnGround = true;
        }

        // TODO:
        //collisions

    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE)
    };

}
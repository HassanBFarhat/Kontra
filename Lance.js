class Lance {

    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        // this.game.lance = this;
        // TODO: Proper sprite alignment and framecount for animation
        this.animator = new Animator(ASSET_MANAGER.getAsset("./sprites/Lance.png"), 108, 154, 24, 34, 1, 0.5, 1, false, true);

        //spritesheet
        // this.spritesheet = ASSET_MANAGER.getAsset("./LanceMovingR+IdleR.png");

        //Lance's state variables
        this.facing = 0; // 0 = right, 1 = left
        this.state = 0; // 0 = idle, 1 = walking, = 2 = jumping
        this.dead = false;

        this.velocity = {x: 0, y: 0};

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
        if (this.game.right) { // TODO: Scene Manager to manage background scrolling
            this.x++;
        } else if (this.game.left) {
            this.x--;
        }

        //velocity physics

        //collisions

    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y, PARAMS.SCALE)
    };

}
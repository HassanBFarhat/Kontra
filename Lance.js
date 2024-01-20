class Lance {

    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        // this.game.lance = this;

        //spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./LanceMovingR+IdleR.png");

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

        //velocity physics

        //collisions

    };

    draw(ctx) {


    };

}
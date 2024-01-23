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


    };

    updateBoundingBox() {


    };

    updateLastBoundingBox() {
        this.lastBoundingBox = this.boundingBox;
    };

    die() {
        this.dead = true;
    };

    update() {

        let newX = 0;

        if (this.game.right) {
            newX++;
            this.x++;
        } else if (this.game.left) {
            newX--;
            this.x--;
        }


        // // update position
        // this.x += this.velocity.x * TICK * PARAMS.SCALE;
        // this.y += this.velocity.y * TICK * PARAMS.SCALE;
        // this.updateLastBB();
        // this.updateBB();


        // TODO:
        //velocity physics

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
        if (newX < 0) this.facing = 1; //left
        if (newX > 0) this.facing = 0; //right


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
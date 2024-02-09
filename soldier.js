class Soldier {
    constructor(game, x, y, path) {
        Object.assign(this, {game, x, y, path});

        this.intialPoint = { x, y };

        this.radius = 20;
        this.visualRadius = 200;
        this.dead = false;
        this.width = 30 * PARAMS.SCALE;
        this.height = 34 * PARAMS.SCALE;

        this.WALK_SPEED = 0.25;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/Soldier.png");

        this.targetID = 0;
        if (this.path && this.path[this.targetID]) this.target = this.path[this.targetID];

        let dist = distance(this, this.target);
        this.maxSpeed = 50; //px per sec
        this.velocity = {x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed};

        this.updateBoundingBox();
        this.lastBB = this.BB;

        this.animations = [];
        this.animations.push([]);
        // running
        this.animations[0].push(new Animator(this.spritesheet, 38, 39, 19, 34, 5, 0.1, 37, false, true));
        //dying
        this.animations[0].push(new Animator(this.spritesheet, 316, 39, 19, 34, 4, 0.6, 44, false, true));

        this.state = 0; //0 = running, 1 = dead sprite
        this.facing = 1; // 0 = right, 1 = left

        this.elapsedTime = 0;
    }

    updateBoundingBox() {
        // this.BB = new BoundingBox(this.x, this.y, 19, 34);
        this.BB = new BoundingBox(this.x, this.y + 30, this.width - this.width/2 + 16, this.height);
    };

    updateLastBoundingBox() {
        this.lastBB = this.BB;
    };

    die() {
        this.dead = true;
    };

    update() {
        this.elapsedTime += this.game.clockTick;
        let dist = distance(this, this.target);

        if (this.removeFromWorld) this.state = 1;

        if (dist < 5) {
            if (this.targetID < this.path.length - 1 && this.target === this.path[this.targetID]) {
                this.targetID++;
            }
            this.target = this.path[this.targetID];
        }


        // movement
        this.x -= this.WALK_SPEED * this.elapsedTime;

        //collision detection for when enemy reaches lance
        this.updateBoundingBox();
        for (let i = 0; i < this.game.entities.length; i++) {
            let ent = this.game.entities[i];
            if (ent instanceof Lance && canSee(this, ent)) {
                this.target = ent;
            }
            if (ent instanceof Lance && collide(this, ent)) {
                if (this.state === 0) { // running to lance
                    this.target = ent;
                    this.elapsedTime = 0;
                }
                this.target = this.path[this.targetID];
            }
        }
        this.updateLastBoundingBox();

        if (this.state !== 0) {
            dist = distance(this, this.target); 
            this.velocity = {x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed};
            this.x += this.velocity.x * this.game.clockTick;
            this.y += this.velocity.y * this.game.clockTick;
        }

        
    }
    
    draw(ctx) {
        // ctx.drawImage(this.spritesheet, 38, 39, 19, 34, 0, 0, 19, 34);

        // this.animations[0].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y + PARAMS.SCALE, PARAMS.SCALE);

        this.animations[0][0].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y + 30, PARAMS.SCALE);

        if (PARAMS.DEBUG) {
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
            // draw text of coordinates
            ctx.font = "10px Arial";
            ctx.fillStyle = "white";
            ctx.fillText("x: " + this.x, this.x - this.game.camera.x, this.y - 10);
            ctx.fillText("y: " + this.y, this.x - this.game.camera.x, this.y - 20);
            ctx.fillText("state: " + this.state, this.x - this.game.camera.x, this.y - 30);
            ctx.fillText("facing: " + this.facing, this.x - this.game.camera.x, this.y - 40);
        }
    }
}
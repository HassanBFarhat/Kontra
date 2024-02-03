class Bullet {
    constructor(game, x, y, target, lanceTeam, heatSeeking) {
        Object.assign(this, {game, x, y, target, lanceTeam, heatSeeking});

        this.radius = 12;
        this.smooth = false;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/bullet_1.png");

        let dist = distance(this, this.target);
        this.maxSpeed = 500; // px per sec

        this.velocity = {x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed};

        this.cache = []; 

        this.animations = [];
        this.animations.push(new Animator(this.spritesheet, 0, 0, 2, 2, 1, 0.1, 0, false, true));  // MAY REMOVE

        this.facing = 0;    // 0 = right, 1 = left
        this.heatSeeking = false;
        this.elapsedTime = 0;
    };

    update() {

        if (this.heatSeeking) {
            let dist = distance(this, this.target);
            this.velocity = {x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed};
        }

        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;

        for (let i = 0; i < this.game.entities.length; i++) {
            let ent = this.game.entities[i];
            // if (this.lanceTeam && (ent instanceof Solider || ent instanceof Sniper) && collide(this, ent)) {
            //     ent.hitpoints -= 10;
            //     ent.removeFromWorld = true; //FOR DEBUGGING
            //     this.removeFromWorld = true;
            // }

            if (this.lanceTeam && ent instanceof Solider && collide(this, ent)) {
                ent.removeFromWorld = true; //FOR DEBUGGING
                this.removeFromWorld = true;
            }


            if (!this.lanceTeam && ent instanceof Lance && collide(this, ent)) {
                ent.removeFromWorld = true; //FOR DEBUGGING
                this.removeFromWorld = true;
            }

        }
        // this.facing = getFacing(this.velocity);
    };

    draw(ctx) {

        for (let i = 0; i < this.game.entities.length; i++) {
            let ent = this.game.entities[i];
            if (ent instanceof Lance) {
                this.x = ent.x + 120;
                this.y = ent.y + 53;
                this.removeFromWorld = true;
            }
        }

        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - 8, PARAMS.SCALE);
    };
}
class Bullet {
    constructor(game, x, y, source, target, angle, lanceTeam) {
        Object.assign(this, {game, x, y, source, target, angle, lanceTeam});
        this.radius = 12;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/bullet_1.png");

        let dist = distance(this, this.target); // NOTE: This is NaN if you have no target!
        this.maxSpeed = 500; // px per sec

        this.velocity = this.angleToVelocity(angle, this.maxSpeed);

        // this.cache = []; // TODO: Useful for anything? - Not sure at the moment, will refactor/remove uncessary items when this class is 100%
        this.updateBoundingBox();
        this.lastBB = this.BB;

        this.animations = [];
        this.animations.push(new Animator(this.spritesheet, 0, 0, 2, 2, 1, 0.1, 0, false, true));  // MAY REMOVE

        this.heatSeeking = false;
        this.elapsedTime = 0;
    };

    angleToVelocity(angle, speed) {
        const radians = angle * Math.PI / 180; 
        let velocityX;
        const velocityY = Math.sin(radians) * speed;
    
        if (angle % 90 !== 0) { // make diagnal directions faster in the x dimension 
            velocityX = Math.cos(radians) * speed * 1.5;
        } else {
            velocityX = Math.cos(radians) * speed;
        }
        
        return { x: velocityX, y: -velocityY };
    }

    updateBoundingBox() {
        this.BB = new BoundingBox(this.x, this.y - 10, 8, 10);
    };

    updateLastBoundingBox() {
        this.lastBB = this.BB;
    };

    update() {
        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;

        // Remove bullet if passed canvas boarder
        if (this.x - this.game.camera.x > PARAMS.CANVAS_WIDTH 
            || this.x - this.game.camera.x < -this.radius
            || this.y < this.radius || this.y > PARAMS.CANVAS_HEIGHT) {
            this.source.bulletCount--; // decrement source's bullet count
            this.removeFromWorld = true;
        }

        // Collisions
        this.updateBoundingBox();
        this.game.entities.forEach(ent => {
            if (ent.BB && this.BB.collide(ent.BB)) {
                if ((this.lanceTeam && ent !== this.source && !ent.dead && (ent instanceof Soldier || ent instanceof Sniper)) 
                || (!this.lanceTeam && ent !== this.source && !ent.dead && ent instanceof Lance)) {
                    this.kill(ent);
                }
            }
        });
        this.updateLastBoundingBox();
    };

    kill(ent) {
        this.removeFromWorld = true;
        this.source.bulletCount--;
        ent.die();
    }

    draw(ctx) {
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - 8, PARAMS.SCALE);
    };
}
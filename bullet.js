class Bullet {
    constructor(game, x, y, target, lanceTeam) {
        Object.assign(this, {game, x, y, target, lanceTeam});

        this.radius = 12;
        this.smooth = false;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/bullets_1.png");

        let dist = distance(this, this.target);
        this.maxSpeed = 200; // px per sec

        let velocity = {x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed};

        this.cache = [];

        this.animations = [];
        // PLACE ANIMATIONS HERE

        this.facing = 0;
        this.elapsedTime = 0;
    };

    update() {
        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;

        for (let i = 0; i < this.game.entities.length; i++) {
            let ent = this.game.entities[i];
            if (this.lanceTeam && (ent instanceof Solider || ent instanceof Sniper) && collide(this, ent)) {
                ent.hitpoints -= 10;
                this.removeFromWorld = true;
            }
            if (!this.lanceTeam && ent instanceof Lance && collide(this, ent)) {
                ent.hitpoints -= 10;
                this.removeFromWorld = true;
            }
        }
        this.facing = getFacing(this.velocity);
    };

    draw(ctx) {

    };
}
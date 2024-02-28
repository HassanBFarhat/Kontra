class Sniper {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        this.initialPoint = { x, y };

        this.radius = 20;
        this.visualRadius = 500;
        this.dead = false;
        this.width = 30 * PARAMS.SCALE;
        this.height = 34 * PARAMS.SCALE;
        
        // Bullets
        this.fireRate = 0.7;
        this.bulletCount = 0;
        this.maxBullets = 2;

        this.initialX = this.x;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/Sniper_2.png");

        this.updateBoundingBox();
        this.lastBB = this.BB;

        this.state = 0; // 0 = alive, 1 = dead
        // 0 = 180 deg, 1 = 135 deg, 2 = 225 deg, 3 = 0 deg, 4 = 45 deg, 5 = 315 deg
        this.facing = 0;  

        this.animations = [];
        this.animations.push([]); // this.animations[state][facing]
        this.animations.push([]);
        // left (3) [0][0]
        this.animations[0].push(new Animator(this.spritesheet, 39, 39, 25, 33, 1, 0.1, 30, false, true));
        // left-up (2) [0][1]
        this.animations[0].push(new Animator(this.spritesheet, 103, 39, 19, 40, 1, 0.1, 30, false, true));
        // left-down (4) [0][2]
        this.animations[0].push(new Animator(this.spritesheet, 161, 39, 25, 33, 1, 0.1, 30, false, true));
        // right (0) [0][3]
        this.animations[0].push(new Animator(this.spritesheet, 161, 158, 25, 33, 1, 0.1, 30, false, true));
        // right-up (1) [0][4]
        this.animations[0].push(new Animator(this.spritesheet, 103, 158, 19, 40, 1, 0.1, 30, false, true));
        // right - down (5) [0][5]
        this.animations[0].push(new Animator(this.spritesheet, 39, 158, 25, 33, 1, 0.1, 30, false, true));
        // dying animation [1][0]
        this.animations[1].push(new Animator(this.spritesheet, 35, 277, 35, 33, 3, 0.1, 33.5, false, false));
    
        this.elapsedTime = 0;
    }

    updateBoundingBox() {
        this.BB = new BoundingBox(this.x, this.y + 33, this.width - 20, this.height - 4);
    }

    updateLastBoundingBox() {
        this.lastBB = this.BB;
    };

    die() {
        this.state = 1;
    };

    removeFromCanvas() {
        this.removeFromWorld = true;
    }

    update() {
        this.elapsedTime += this.game.clockTick;
        let target = null;

        if (this.dead) return;
        else if (this.state === 1) { // Dead
            this.BB = new BoundingBox(-PARAMS.CANVAS_WIDTH, -PARAMS.CANVAS_HEIGHT, 0, 0); // Invalidate bounding box
            setTimeout(this.removeFromCanvas.bind(this), 550); // remove from canvas after animation
            this.dead = true;
            ASSET_MANAGER.playAsset("sounds/enemy_hit.wav");
            return;
        }

        // Don't try firing if past max bullets
        if (this.bulletCount >= this.maxBullets) return;
        this.game.entities.forEach(ent => {
            if (ent instanceof Lance && this.elapsedTime > this.fireRate && this.state != 1 && !ent.hit) {
                this.elapsedTime = 0;
                target = ent;
                switch(this.facing) {
                    case 0: // 180 degrees - left 
                        this.game.addEntity(new Bullet(this.game, this.x - 4, this.y + 58, this, ent, 180, false));
                        break;
                    case 1: // 135 degrees - left-up 
                        this.game.addEntity(new Bullet(this.game, this.x + 20, this.y + 10, this, ent, 135, false));
                        break;
                    case 2: // 225 degrees - left-down 
                        this.game.addEntity(new Bullet(this.game, this.x, this.y + 122, this, ent, 225, false));
                        break;
                    case 3: // 0 degrees - right 
                        this.game.addEntity(new Bullet(this.game, this.x + 100, this.y + 58, this, ent, 0, false));
                        break;
                    case 4: // 45 degrees - right-up
                        this.game.addEntity(new Bullet(this.game, this.x + 76, this.y + 10, this, ent, 45, false));
                        break;
                    case 5: // 315 degrees - right-down 
                        this.game.addEntity(new Bullet(this.game, this.x + 96, this.y + 121, this, ent, 315, false));
                        break;
                }
                this.bulletCount++;    
            }
        });

        if (target != null) {
            let x = target.x - this.x;
            let y = target.y - this.y;
            let angle = Math.atan2(y, x) * (180 / Math.PI);
            let adjustedAngle = (angle < 0) ? 360 + angle : angle;


            if (adjustedAngle >= 157.5 && adjustedAngle <= 202.5) this.facing = 0; //left GOOD
            else if (adjustedAngle >= 202.5 && adjustedAngle <= 247.5) this.facing = 1; //left-down GOOD
            else if (adjustedAngle >= 337.5 || adjustedAngle <= 22.5) this.facing = 3; //right GOOD
            else if (adjustedAngle >= 292.5 && adjustedAngle <= 337.5) this.facing = 4; //right-down GOOD
            else if (adjustedAngle >= 67.5 && adjustedAngle <= 157.5) this.facing = 2; //left-up
            else if (adjustedAngle >= 22.5 && adjustedAngle <= 67.5) this.facing = 5; //right-up
        }


    }
    
    draw(ctx) {
        if (this.state === 0) {
            if (this.facing == 2 || this.facing == 5) this.animations[0][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y + 37, PARAMS.SCALE); 
            else if (this.facing == 4) this.animations[0][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y + 5, PARAMS.SCALE); 
            else if (this.facing == 1) this.animations[0][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x + 24, this.y + 5, PARAMS.SCALE);
            else this.animations[0][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y + 33, PARAMS.SCALE);
        } else {
            this.animations[1][0].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y + 33, PARAMS.SCALE);
        }

        if (PARAMS.DEBUG) {
            // Draw the dotted circle
            ctx.strokeStyle = "blue";
            ctx.setLineDash([5, 15]);
            ctx.beginPath();
            ctx.arc(this.x - this.game.camera.x, this.y, this.visualRadius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
            ctx.setLineDash([]);
    
            // Draw the bounding box rectangle
            ctx.strokeStyle = "green"; // Reset stroke style
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
    
            // Draw text of coordinates
            ctx.font = "10px Arial";
            ctx.fillStyle = "white";
            ctx.fillText("x: " + this.x, this.x - this.game.camera.x, this.y - 10);
            ctx.fillText("y: " + this.y, this.x - this.game.camera.x, this.y - 20);
            ctx.fillText("state: " + this.state, this.x - this.game.camera.x, this.y - 30);
            ctx.fillText("facing: " + this.facing, this.x - this.game.camera.x, this.y - 40);
        }

    }
    
}
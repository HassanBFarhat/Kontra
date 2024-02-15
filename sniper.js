class Sniper {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        this.initialPoint = { x, y };

        this.radius = 20;
        this.visualRadius = 500;
        this.dead = false;
        this.width = 30 * PARAMS.SCALE;
        this.height = 34 * PARAMS.SCALE;
        this.fireRate = 1;

        this.initialX = this.x;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/Sniper_2.png");

        this.updateBoundingBox();
        this.lastBB = this.BB;

        this.state = 0; // 0 = alive, 1 = dead
        // 0 = 0 deg or 360 deg, 1 = 45 deg, 2 = 135 deg, 3 = 180 deg, 4 = 225 deg, 5 = 315 deg
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

        // TODO: DEBUG TO MAKE HIM MOVE LIKE SOLDIER WHEN DEAD
        // if (this.state === 1) { // Dead
        //     let deltaX = this.x - this.initialX;
        //     this.y -= Math.sqrt(Math.abs(deltaX)) / 20;
        //     if (this.y < 320) this.x += this.DEAD_SPEED * this.elapsedTime;
        //     this.BB = new BoundingBox(-PARAMS.CANVAS_WIDTH, -PARAMS.CANVAS_HEIGHT, 0, 0); // Invalidate bounding box
        //     // this.x += this.DEAD_SPEED * this.elapsedTime;
        //     setTimeout(this.removeFromCanvas.bind(this), 550);
        //     return;
        // }

        for (let i = 0; i < this.game.entities.length; i++) {
            let ent = this.game.entities[i];
            
            if (ent instanceof Lance && this.elapsedTime > this.fireRate && this.state != 1) {
                this.elapsedTime = 0;
                target = ent;
                this.game.addEntity(new Bullet(this.game, this.x, this.y + 50, this, ent, false, false, true));
            }
        } 

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
class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0; // Scene Camera Position

        //game over and title shizz
        this.gameOver = false;

        this.title = true;
        this.level = null;


        this.lance = new Lance(this.game, this.x, 154);

        this.loadLevel(levelOne, 2.5 * PARAMS.BLOCKWIDTH, 13 * PARAMS.BLOCKWIDTH, false, true); // I dont think the rest of the arguments are necessary, JS will ignore them

        this.elapsedTime = 0;
        this.debugCheckbox = document.getElementById("debug");
    };

    clearEntities() {
        this.game.entities.forEach((entity) => {
            entity.removeFromWorld = true;
        });
    };

    loadLevel(level, x, y, transition, title) {
        this.title = title;
        this.level = level;
        this.gameOver = false;
        this.clearEntities();
        this.game.entities = [];
        this.x = 0;
        this.elapsedTime = 0;

        if (transition) {
            this.game.addEntity(new TransitionScreen(this.game, level, x, y, title));
        }
        else {
            if (level.background) { level.background.forEach(background => this.game.addEntity(new Background(this.game, background.x, background.y, background.img)));}

            if (level.ground) {level.ground.forEach(ground => this.game.addEntity(new Ground(this.game, ground.x, ground.y, ground.w, ground.h)));}

            if (level.lance) {level.lance.forEach(lance => this.game.addEntity(new Lance(this.game, lance.x, lance.y)));}

            if (level.soldier) {
                level.soldier.forEach(soldier => { // TODO: Remove hardcoded path?
                    this.game.addEntity(new Soldier(this.game, soldier.x, soldier.y, [{x: 1600, y: 349}, {
                        x: 1200,
                        y: 349
                    }, {x: 800, y: 349}, {x: 400, y: 349}, {x: -20, y: 349}]));
                });
            }

            if (level.sniper) {level.sniper.forEach(sniper => this.game.addEntity(new Sniper(this.game, sniper.x, sniper.y)));}

            if (level.trigger) {level.trigger.forEach(trigger => this.game.addEntity(new Trigger(this.game, trigger.x, trigger.y, trigger.fn)));}
        }

        if (level.music && !this.title) {
            ASSET_MANAGER.pauseBackgroundMusic();
            ASSET_MANAGER.playAsset(level.music);
        }
    }

    updateAudio() {
        const mute = document.getElementById("mute").checked;
        const volume = document.getElementById("volume").value;

        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);
    };

    update() {
        this.elapsedTime += this.game.clockTick;
        if (this.title && this.game.click){
            if (this.game.click && this.game.click.y > 5.8 * PARAMS.BLOCKWIDTH && this.game.mouse.y < 8 * PARAMS.BLOCKWIDTH) {
                this.title = false;
                this.lance = new Lance(this.game, this.x, 154);
                this.loadLevel(this.level, 2.5 * PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH, true); // I dont think the rest of the arguments are necessary, JS will ignore them
            }
        }

        // if (this.gameOver) {
        //     this.gameOver = false;
        //     this.lance = new Lance(this.game, x , y);
        //     this.clearEntities();
        //
        //     this.game.addEntity(new TransitionScreen(this.game, levelOne, x, y, true));
        // }

        this.updateAudio();

        let midpoint = PARAMS.CANVAS_WIDTH / 2 - this.game.lance.width / 2;

        if (this.x < this.game.lance.x - midpoint) this.x = this.game.lance.x - midpoint;

        // Check if debug checkbox is checked
        PARAMS.DEBUG = this.debugCheckbox.checked;

        if (!PARAMS.DEBUG && this.game.lance.lives < 0) {
            ASSET_MANAGER.pauseBackgroundMusic();
            this.game.addEntity(new TransitionScreen(this.game, this.level, 0, 0, true));
        }
    };
 
    draw(ctx) {

        if (this.title && !PARAMS.DEBUG) { // Title Screen
            ctx.drawImage(ASSET_MANAGER.getAsset("backgrounds/kontra-title.png"), 0 *PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH);
            ctx.fillStyle = this.game.mouse && this.game.mouse.y > 5.8 * PARAMS.BLOCKWIDTH && this.game.mouse.y < 8 * PARAMS.BLOCKWIDTH ? "Red" : "White";
            ctx.fillText("Start", 5.8 * PARAMS.BLOCKWIDTH, 8 * PARAMS.BLOCKWIDTH);
            document.getElementById("info").style.display = "block";
        }


        if (!this.title) {
            // draw hud on top left, below fps counter
            ctx.fillStyle = "White";
            ctx.fillText(`Lives: ${this.game.lance.lives}`, 5, 35);

            // elapsed time since level start
            ctx.fillText(`Time: ${this.elapsedTime.toFixed(2)}`, 5, 45);
            document.getElementById("info").style.display = "none";
        }

        if (PARAMS.DEBUG) {
            ctx.translate(0, -10); // hack to move elements up by 10 pixels instead of adding -10 to all y coordinates below
            ctx.strokeStyle = "White";
            ctx.lineWidth = 2;

            // FPS Counter
            ctx.fillText(`FPS: ${this.game.timer.ticks.length}`, 5, 25)

            // Input Display
            ctx.strokeStyle = this.game.left ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(6 * PARAMS.BLOCKWIDTH - 2, 2.5 * PARAMS.BLOCKWIDTH - 2, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
            ctx.fillText("L", 6 * PARAMS.BLOCKWIDTH, 3 * PARAMS.BLOCKWIDTH);
            ctx.strokeStyle = this.game.down ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(6.5 * PARAMS.BLOCKWIDTH, 3 * PARAMS.BLOCKWIDTH, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
            ctx.fillText("D", 6.5 * PARAMS.BLOCKWIDTH + 2, 3.5 * PARAMS.BLOCKWIDTH + 2);
            ctx.strokeStyle = this.game.up ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(6.5 * PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH - 4, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
            ctx.fillText("U", 6.5 * PARAMS.BLOCKWIDTH + 2, 2.5 * PARAMS.BLOCKWIDTH - 2);
            ctx.strokeStyle = this.game.right ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(7 * PARAMS.BLOCKWIDTH + 2, 2.5 * PARAMS.BLOCKWIDTH - 2, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
            ctx.fillText("R", 7 * PARAMS.BLOCKWIDTH + 4, 3 * PARAMS.BLOCKWIDTH);

            ctx.strokeStyle = this.game.A ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.beginPath();
            ctx.arc(8.25 * PARAMS.BLOCKWIDTH + 2, 2.75 * PARAMS.BLOCKWIDTH, 0.25 * PARAMS.BLOCKWIDTH + 4, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fillText("A", 8 * PARAMS.BLOCKWIDTH + 4, 3 * PARAMS.BLOCKWIDTH);
            ctx.strokeStyle = this.game.B ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.beginPath();
            ctx.arc(9 * PARAMS.BLOCKWIDTH + 2, 2.75 * PARAMS.BLOCKWIDTH, 0.25 * PARAMS.BLOCKWIDTH + 4, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fillText("B", 8.75 * PARAMS.BLOCKWIDTH + 4, 3 * PARAMS.BLOCKWIDTH);

            ctx.translate(0, 10);
            ctx.strokeStyle = "White";
            ctx.fillStyle = ctx.strokeStyle;
        }
    };
}
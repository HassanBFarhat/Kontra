class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0; // Scene Camera Position

        this.gameOver = false;
        


        this.lance = new Lance(this.game, this.x, 154);
        this.lance.velocity = { x: 0, y: 0 };
        this.lance.state = 0; //loads in idle state
    
    };

    clearEntities() {
        this.game.entities.forEach((entity) => {
            entity.removeFromWorld = true;
        });
    };

    update() {
        // TODO: offset by lance width?
        const midpoint = PARAMS.CANVAS_WIDTH / 2;

        console.log("\nCAMERA X POS: " + this.x);
        console.log("LANCES X POS: " + this.game.entities[1].x);
        console.log("CANVAS MIDPOINT: " + midpoint);

        if (this.x < this.game.entities[1].x - midpoint) this.x = this.game.entities[1].x - midpoint;
    };
 
    draw() {

    };
    
}
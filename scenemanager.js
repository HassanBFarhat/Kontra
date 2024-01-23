class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0; // Scene Camera Position
    };

    update() {
        // TODO: offset by lance width?
        const midpoint = PARAMS.CANVAS_WIDTH / 2;
        if (this.x < this.game.lance.x - midpoint) this.x = this.game.lance.x - midpoint;
    };
 
    draw() {

    };
}
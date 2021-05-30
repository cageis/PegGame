import {Game} from "./Game";
import {Renderer} from "./Renderer";
import {getRandomArbitrary} from "./helpers";

export class Player {
    private game: Game;

    constructor() {
        const renderer = new Renderer();
        this.game = new Game(renderer);
        this.game.init();
    }

    play(): void {
        const randomLayerIndex = getRandomArbitrary(0, 4);
        const randomPegIndex = getRandomArbitrary(0, 4);
        this.game.pickArbitraryPiece(randomLayerIndex, randomPegIndex);
    }

    static play(): void {
        new this().play();
    }
}
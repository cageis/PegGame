import {LayerInterface} from "./Contract/LayerInterface";
import {PegHoleInterface} from "./Contract/PegHoleInterface";
import {PegHole} from "./PegHole";
import {range} from "./helpers";

export class Layer implements LayerInterface {
    private readonly layerNumber: number;

    pieces: Array<PegHoleInterface> = [];

    constructor(layerNumber: number) {
        this.layerNumber = layerNumber;
    }

    init(): void {

        this.pieces = range(this.layerNumber + 1).map((pieceNumber: number) => {
            return new PegHole(this.layerNumber, pieceNumber);
        });
    }

}
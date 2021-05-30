import {PegHoleInterface} from "./Contract/PegHoleInterface";

export class PegHole implements PegHoleInterface {
    hasPeg: boolean = true;
    holeNumber: number;
    layerNumber: number;
    isMoving: boolean = false;
    isEnd: boolean = false;

    constructor(layerNumber: number, holeNumber: number) {
        this.layerNumber = layerNumber;
        this.holeNumber = holeNumber;
    }

    removePeg(): void {
        this.hasPeg = false;
    }

    addPeg(): void {
        this.hasPeg = true;
    }
}
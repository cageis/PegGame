import {GameInterface} from "./Contract/GameInterface";
import {Layer} from "./Layer";
import {LayersInterface} from "./Contract/LayersInterface";
import {PegHoleInterface} from "./Contract/PegHoleInterface";
import {Renderer} from "./Renderer";
import {range} from "./helpers";

export class Game implements GameInterface {
    layers: LayersInterface = {};
    private isFirstItemRemoved: boolean = false;
    private readonly _renderer: Renderer;

    private movement: PegHoleInterface[] = [];

    constructor(renderer: Renderer) {
        this._renderer = renderer;
    }

    init(): void {
        this.layers = range(5).map((layerNum: number) => {
            let layer = new Layer(layerNum);
            layer.init();
            return layer;
        });

        this._renderer.render(this);
    }

    pickPiece(piece: PegHoleInterface): void {
        this.placePiece(piece);

        if (this.movement.length === 2) {
            this.doMovementCalculation();
        }

        this._renderer.render(this);
        console.log(this.movement);
    }

    pickArbitraryPiece(layerIndex: number, pegIndex: number): void {
        const piece = this.getPiece(layerIndex, pegIndex);
        this.pickPiece(piece);
    }

    private placePiece(piece: PegHoleInterface): void {
        // We shouldn't be allowed to continue when the movement exceeds 2.
        if (this.movement.length >= 2) {
            return;
        }

        // This is the beginning of the game where you're allowed to pick any
        // piece.
        if (!this.isFirstItemRemoved) {
            this.isFirstItemRemoved = true;
            piece.removePeg();
            return;
        }


        // This is when you want to pick a piece to move from one spot to
        // another.
        if (this.movement.length === 0 && piece.hasPeg) {
            this.movement.push(piece);
            piece.isMoving = true;
            return;
        }

        // This part happens when you click the second piece (where to place
        // it).
        if (this.movement.length === 1 && !piece.hasPeg) {
            this.movement.push(piece);
            piece.isEnd = true;
            return;
        }
    }

    private doMovementCalculation(): void {
        const [start, end] = this.movement;
        const isSameLayer = start.layerNumber === end.layerNumber;

        isSameLayer
            ? this.doSameLayerCalculation()
            : this.doMultiLayerCalculation();

        // Reset the movement.
        start.isMoving = false;
        end.isEnd = false;
        this.movement = [];

    }

    private doSameLayerCalculation(): void {
        const [start, end] = this.movement;
        const isLtr = start.holeNumber < end.holeNumber;

        const highEnd = isLtr ? end.holeNumber : start.holeNumber;
        const lowEnd = isLtr ? start.holeNumber : end.holeNumber;



        if (highEnd - lowEnd !== 2) {
            throw new Error('Invalid same layer selection.');
        }
        console.log('Performing valid same layer movement.');
        const holeNumber = highEnd - 1;
        const betweenPiece = this.getPiece(start.layerNumber, holeNumber);
        this.movePegs(betweenPiece);
    }

    private doMultiLayerCalculation(): void {
        const [start, end] = this.movement;

        const pegDistance = start.holeNumber - end.holeNumber;
        const layerDistance = start.layerNumber - end.layerNumber;
        const absPegDistance = Math.abs(pegDistance);

        if (Math.abs(layerDistance) !== 2) {
            throw new Error('Invalid multi-layer selection.');
        }

        if (absPegDistance !== 2 && absPegDistance !== 0) {
            throw new Error('Peg distance is invalid.');
        }


        console.log('Multi-layer selection is valid.');

        const pegMovement = pegDistance === 0 ? 0 : pegDistance / 2;
        const layerMovement = layerDistance / 2;

        const betweenPegIndex = end.holeNumber + pegMovement;
        const betweenLayerIndex = end.layerNumber + layerMovement;


        const betweenPiece = this.getPiece(betweenLayerIndex, betweenPegIndex);

        console.log(betweenPiece, betweenLayerIndex, betweenPegIndex, start, end);
        // return;
        this.movePegs(betweenPiece);
    }

    private movePegs(between: PegHoleInterface) {
        const [start, end] = this.movement;

        between.removePeg();
        start.removePeg();
        end.addPeg();

        console.info({start, between, end});
    }

    private getPiece(layerNumber: number, holeNumber: number) {
        console.log(`getting layer ${layerNumber} node ${holeNumber}`);
        console.log(this.layers[layerNumber]);
        return this.layers[layerNumber].pieces[holeNumber];
    }
}
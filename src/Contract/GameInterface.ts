import {LayersInterface} from "./LayersInterface";
import {PegHoleInterface} from "./PegHoleInterface";

export interface GameInterface {
    /**
     * Initialize the board. Set all of the pieces where they go.
     */
    init(): void;

    /**
     * For the first piece being picked this will simply remove the item from
     * the board.
     *
     * Subsequently it will initialize a movement on the first pick and then
     * move the piece while removing the center piece.
     */
    pickPiece(piece: PegHoleInterface): void;
}
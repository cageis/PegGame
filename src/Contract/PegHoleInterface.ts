export interface PegHoleInterface {
    isEnd: boolean;
    layerNumber: number;
    holeNumber: number;
    hasPeg: boolean;
    isMoving: boolean;

    /**
     * Remove the peg from the hole.
     */
    removePeg(): void;

    addPeg(): void;
}

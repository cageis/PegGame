import {PegHoleInterface} from "./PegHoleInterface";

export interface LayerInterface {

    /**
     * The pieces of the layer (in order).
     */
    pieces: Array<PegHoleInterface>;

    /**
     * Allows the layer to initialize itself.
     */
    init(): void;
}
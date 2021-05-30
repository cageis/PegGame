import {Game} from "./Game";
import {PegHoleInterface} from "./Contract/PegHoleInterface";

export class Renderer {
    render(game: Game): void {
        const rootElem = document.getElementById('root');

        // Reset element to blank.
        rootElem.innerHTML = '';

        // Redraw all elements.
        Object.keys(game.layers).map((layerNumber) => {
            const layer = game.layers[layerNumber];
            const layerElem = document.createElement('div');
            layerElem.className = 'layer';
            layer.pieces.map((piece: PegHoleInterface) => {
                const pieceElem = document.createElement('span');
                pieceElem.className = 'node';
                pieceElem.onclick = () => game.pickPiece(piece);
                if (!piece.hasPeg) {
                    pieceElem.className += ' removed';
                }

                if (piece.isMoving) {
                    pieceElem.className += ' moving';
                }

                if (piece.isEnd) {
                    pieceElem.className += ' end';
                }

                layerElem.appendChild(pieceElem);
            });

            rootElem.appendChild(layerElem);
        })
    }
}
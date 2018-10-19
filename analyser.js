const Board = require('./board');

module.exports = class Analyser {
    constructor(board) {
        this.board = board;
    }
    analyseGame() {
        let nbLineFull = 0;
        for (let columnNumber = 0; columnNumber < Board.MAX_COLUMN; columnNumber++) {
            for (let lineNumber = 0; lineNumber < Board.MAX_LINE; lineNumber++ ) {
                if (this.board.getCellState(columnNumber, lineNumber) !== null ) {
                    const analysers = [this._analyseLine,this._analyseColumn,this._analyseAscendDiagonal, this._analyseDescendDiagonal]
                    for (let analyser of analysers) {
                        const analyseResult = this._analyse(columnNumber, lineNumber,
                            this.board.getCellState(columnNumber, lineNumber),analyser.bind(this));
                        if (analyseResult){
                            return analyseResult;
                        }
                    }
                }
            }
            if (this.board.getCellState(columnNumber, 0) !== null){
                nbLineFull ++;
            }
        }
        if(nbLineFull === Board.MAX_COLUMN){
            return null;
        } else {
            return false;
        }
    }
    _analyse(coordinateX, coordinateY, tokenColor,callback) {
        for (let cell = 1; cell < 4; cell ++) {
            if (callback(coordinateX, coordinateY,cell,tokenColor)) {
                return false
            }
        }
        return tokenColor
    }
    _analyseLine(coordinateX, coordinateY, cell, expectedTokenColor) {
        const tokenColor = this.board.getCellState(coordinateX + cell, coordinateY)
        return (tokenColor !== expectedTokenColor)
    }
    _analyseColumn(coordinateX, coordinateY, cell, tokenColor) {
        return (this.board.getCellState(coordinateX, coordinateY + cell) !== tokenColor)
    }
    _analyseAscendDiagonal(coordinateX, coordinateY, cell, tokenColor) {
        return (this.board.getCellState(coordinateX + cell, coordinateY - cell) !== tokenColor)
    }
    _analyseDescendDiagonal(coordinateX, coordinateY, cell, tokenColor) {
        return (this.board.getCellState(coordinateX + cell, coordinateY + cell) !== tokenColor)
    }
};
module.exports = class Board {
    static get RED_TOKEN () { return 'red' }
    static get BLUE_TOKEN () { return 'blue' }
    static get MAX_LINE () { return 6 }
    static get MAX_COLUMN () { return 7 }

    constructor (table) {
        if(table) {
            this.table = table;
        } else {
            this.table = []
            for (let nbLine = 0; nbLine < Board.MAX_LINE;nbLine++) {
                const line = Array(Board.MAX_COLUMN).fill(null,0,Board.MAX_COLUMN);
                this.table.push(line)
            }
        }
    };
    stringRepresent() {
        let stringRepresentation = '';
        for (let lineNumber = 0; lineNumber < Board.MAX_LINE; lineNumber++ ) {
            for (let columnNumber = 0; columnNumber < Board.MAX_COLUMN ; columnNumber++) {
                if (this.table[lineNumber][columnNumber] === null) {
                    stringRepresentation += '.'
                } else if ( this.table[lineNumber][columnNumber] === Board.RED_TOKEN) {
                    stringRepresentation += 'o'
                } else if ( this.table[lineNumber][columnNumber] === Board.BLUE_TOKEN) {
                    stringRepresentation += '*'
                }

                if(columnNumber !== Board.MAX_LINE) {
                    stringRepresentation += ' '
                }
            }
            if(lineNumber !== 5) {
                stringRepresentation += '\n'
            }

        }
        return stringRepresentation;
    }
    cleanBoard(){
        let line = Array(Board.MAX_LINE).fill(null,0,Board.MAX_LINE)
        this.table = Array(Board.MAX_COLUMN).fill(line);
    }
    getCellState(coordinateX, coordinateY) {
        if (coordinateX < 0 || coordinateX >= Board.MAX_COLUMN) return null;
        if (coordinateY < 0 || coordinateY >= Board.MAX_LINE) return null;
        if (this.table[coordinateY][coordinateX]) {
            return this.table[coordinateY][coordinateX];
        }
        return null;
    };
    addToken(token, column) {
        for (let coordinateY = Board.MAX_LINE -1; coordinateY >= 0; coordinateY--){
            if (this.table[coordinateY][column] === null) {
                this.table[coordinateY][column] = token;
                return true;
            }
        }
        return false;

    };
};

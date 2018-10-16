module.exports = class Board {
    constructor (table) {
        if(table) {
            this.table = table;
        } else {
            let line = Array(6).fill(null,0,6)
            this.table = Array(7).fill(line);
        }
    };
    cleanBoard(){
        let line = Array(6).fill(null,0,6)
        this.table = Array(7).fill(line);
    }
    getCellState(coordinateX, coordinateY) {
        if (this.table[coordinateX][coordinateY]) {
            return this.table[coordinateX][coordinateY];
        }
        return null;
    };
    addToken(color, column) {
        for (let cellNumber = 0; cellNumber < 6; cellNumber++){
            if (!this.table[column][cellNumber]) {
                this.table[column][cellNumber] = color;
                return true;
            };
        };
        return false;

    };
};

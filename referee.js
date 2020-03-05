const Board = require('./board');
const Analyser = require('./analyser');

module.exports = class Referee {
    static get RED_PLAYER() { return 'redP' }
    static get BLUE_PLAYER() { return 'blueP' }
    static get IN_PROGRESS() { return 'In Progress'}
    static get RED_VICTORY() { return 'Victory for Red'}
    static get DRAW() { return 'Draw'}

    constructor(board, turn) {
        this.board = board;
        this.turn = turn;
    }
    getTurn() {
        return this.turn;
    }
    play(column) {
        let token;
        if (this.getTurn() === Referee.RED_PLAYER) {
            token = Board.RED_TOKEN;
        } else {
            token = Board.BLUE_TOKEN;
        }
        return this.board.addToken(token, column)
    }
    getState() {
        const analyser = new Analyser(this.board);
        switch (analyser.analyseGame()) {
            case false:
                return Referee.IN_PROGRESS;
                break;
            case null:
                return Referee.DRAW;
                break;
            default:
                return Referee.RED_VICTORY;
        }
    }
};



const assert = require('chai').assert;

const Board = require('../board');


describe('Board', function() {

    let board;
    const BLUE_TOKEN = "blue";
    const RED_TOKEN = "red";

    beforeEach(function () {
        board = new Board();
    });
    describe('#getCellState()', function() {
        it('shouldReturnNullIfThereIsNoToken', function() {
            // GIVEN
            // WHEN
            const result = board.getCellState(0,0);
            // THEN
            assert.equal(result, null);
        });
        it('shouldReturnRedIfThereIsRedTokenInOO', function() {
            // GIVEN
            board.table[0][0] = RED_TOKEN;
            // WHEN
            const result = board.getCellState(0,0);
            // THEN
            assert.equal(result,RED_TOKEN);
        });
        it('shouldReturnBlueIfThereIsBlueTokenIn1O', function() {
            // GIVEN
            board.table[1][0] = BLUE_TOKEN;
            // WHEN
            const result = board.getCellState(1,0);
            // THEN
            assert.equal(result,BLUE_TOKEN);
        });
    });
    describe('#addToken()', function () {
        it('shouldReturnTrueIfATokenHasBeenAdded', function () {
            // GIVEN

            // WHEN
            const result = board.addToken(RED_TOKEN,0);
            // THEN
            assert(result);
        });
        it('shouldAddRedTokenInPos00IfColumn0CleanAndColumnIs0', function () {
            // GIVEN
            // WHEN
            board.addToken(RED_TOKEN, 0);
            // THEN
            assert.equal(board.table[0][0],RED_TOKEN);
        });
        it('shouldAddBlueTokenInPos00IfColumn0CleanAndColumnIs0', function () {
            // GIVEN
            // WHEN
            board.addToken(BLUE_TOKEN, 0);
            // THEN
            assert.equal(board.table[0][0],BLUE_TOKEN);
        });
        it('shouldAddBlueTokenInPos10IfColumn0CleanAndColumnIs1', function () {
            // GIVEN
            // WHEN
            board.addToken(BLUE_TOKEN, 1);
            // THEN
            assert.equal(board.table[1][0],BLUE_TOKEN);
        });
        it('shouldAddRedTokenInPos11IfColumnIs1AndContainOneToken', function () {
            // GIVEN
            board.table[1][0] = BLUE_TOKEN;
            // WHEN
            board.addToken(RED_TOKEN, 1);
            // THEN
            assert.equal(board.table[1][1],RED_TOKEN);
        });
        it('shouldAddRedTokenInPos13IfColumnIs1AndContainThreeTokens', function () {
            // GIVEN
            const column = 1;
            board.table[column][0] = BLUE_TOKEN;
            board.table[column][1] = RED_TOKEN;
            board.table[column][2] = BLUE_TOKEN;
            // WHEN
            board.addToken(RED_TOKEN, column);
            // THEN
            assert.equal(board.table[column][3],RED_TOKEN);
        });
        it('shouldReturnFalseIfColumnFull', function () {
            // GIVEN
            const column = 1;
            board.table[column][0] = BLUE_TOKEN;
            board.table[column][1] = RED_TOKEN;
            board.table[column][2] = BLUE_TOKEN;
            board.table[column][3] = BLUE_TOKEN;
            board.table[column][4] = RED_TOKEN;
            board.table[column][5] = BLUE_TOKEN;
            // WHEN
            result = board.addToken(RED_TOKEN, column);
            // THEN
            assert.equal(result, false);
        });
    });
    describe('#cleanBoard()', function () {
        it('shouldSetAllCellToNull', function () {
            // GIVEN
            let redLine = Array(6).fill(RED_TOKEN,0,6)
            let nullLine = Array(6).fill(null,0,6)
            let redTable = Array(7).fill(redLine);
            let nullTable = Array(7).fill(nullLine);
            board = new Board(redTable);
            // WHEN
            board.cleanBoard();
            // THEN
            assert.deepEqual(board.table, nullTable);
        });
    });
});


const assert = require('chai').assert;

const Board = require('../board');


describe('Board', function() {

    let board;

    beforeEach(function () {
        board = new Board();
    });
    afterEach(function () {
        board = null;
    });
    describe('#getCellState()', function() {
        context('If get Cell x=0 y=5', function () {
            const coordianteX = 0;
            const coordianteY = 5;
            context('If there is no token', function () {
                it('shouldReturnNull', function() {
                    // GIVEN
                    // WHEN
                    const result = board.getCellState(coordianteX,coordianteY);
                    // THEN
                    assert.equal(result, null);
                });
            });
            context('If red token in x=0 y=5', function () {
                it('shouldReturnRedIfThereIsRedTokenInOO', function() {
                    // GIVEN
                    board.table[coordianteY][coordianteX] = Board.RED_TOKEN;
                    // WHEN
                    const result = board.getCellState(coordianteX,coordianteY);
                    // THEN
                    assert.equal(result,Board.RED_TOKEN);
                });
            });

        });
        context('If get Cell x=1 y=5', function () {
            const coordianteX = 1;
            const coordianteY = 5;
            context('If blue token in x=1 y=5', function () {
                it('shouldReturnBlueIfThereIsBlueTokenIn1O', function() {
                    // GIVEN
                    board.table[coordianteY][coordianteX] = Board.BLUE_TOKEN;
                    // WHEN
                    const result = board.getCellState(coordianteX,coordianteY);
                    // THEN
                    assert.equal(result,Board.BLUE_TOKEN);
                });
            });
        });
        context('If get Cell out of grid', function () {
            const coordianteX = Board.MAX_COLUMN;
            const coordianteY = Board.MAX_LINE;
            it('shouldReturnNull', function() {
                // GIVEN
                // WHEN
                const result = board.getCellState(coordianteX, coordianteY);
                // THEN
                assert.equal(result,null);
            });
        });
    });
    describe('#addToken()', function () {
        context('If Red token add in colum 0', function () {
            const column = 0;
            const token = Board.RED_TOKEN;
            it('shouldReturnTrue', function () {
                // GIVEN

                // WHEN
                const result = board.addToken(token,column);
                // THEN
                assert.equal(result,true);
            });
            it('shouldAddRedTokenInPos05', function () {
                // GIVEN
                // WHEN
                board.addToken(token, column);
                // THEN
                assert.equal(board.getCellState(0,5),token);
            });
        });
        context('If Blue token add in colum 0', function () {
            const column = 0;
            const token = Board.BLUE_TOKEN;
            it('shouldAddBlueTokenInPos05', function () {
                // GIVEN
                const column = 0;
                // WHEN
                board.addToken(token, column);
                // THEN
                assert.equal(board.getCellState(column,5),token);
            });
        });
        context('If Blue token add in column 1', function () {
            const column = 1;
            const token = Board.BLUE_TOKEN;
            it('shouldAddBlueTokenInPos05', function () {
                // GIVEN
                const column = 1;
                // WHEN
                board.addToken(token, column);
                // THEN
                assert.equal(board.getCellState(column,5),token);
            });

        });
        context('If column 1 contain One token', function () {
            context('If Red token add in column 1', function () {
                const column = 1;
                const token = Board.RED_TOKEN;
                it('shouldAddRedTokenInPos14', function () {
                    // GIVEN
                    const lineToken1 = 5;
                    const lineNewToken = 4;
                    board.table[lineToken1][column] = Board.BLUE_TOKEN;
                    // WHEN
                    board.addToken(Board.RED_TOKEN, column);
                    // THEN
                    assert.equal(board.getCellState(column,lineNewToken),token);
                });
            });
        });
        context('If column 1 contain 3 token', function () {
            context('If Red token add in column 1', function () {
                const column = 1;
                const token = Board.RED_TOKEN;
                it('shouldAddRedTokenInPos13IfColumnIs1AndContainThreeTokens', function () {
                    // GIVE
                    board.table[5][column] = Board.BLUE_TOKEN;
                    board.table[4][column] = Board.RED_TOKEN;
                    board.table[3][column] = Board.BLUE_TOKEN;
                    // WHEN
                    board.addToken(token, column);
                    // THEN
                    assert.equal(board.table[2][column],token);
                });
            });
        });
        context('If column full', function () {
            it('shouldReturnFalse', function () {
                // GIVEN
                const column = 1;
                board.table[0][column] = Board.BLUE_TOKEN;
                board.table[1][column] = Board.RED_TOKEN;
                board.table[2][column] = Board.BLUE_TOKEN;
                board.table[3][column] = Board.BLUE_TOKEN;
                board.table[4][column] = Board.RED_TOKEN;
                board.table[5][column] = Board.BLUE_TOKEN;
                // WHEN
                result = board.addToken(Board.RED_TOKEN, column);
                // THEN
                assert.equal(result, false);
            });
        });

    });
    describe('#cleanBoard()', function () {
        it('shouldSetAllCellToNull', function () {
            // GIVEN
            let redLine = Array(6).fill(null,0,6)
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
    describe('#stringRepresent()', function () {
        it('shouldReturnA6By7DotArrayIfThereIsNoToken ', function () {
            // GIVEN
            let expectedString =
`. . . . . . .
. . . . . . .
. . . . . . .
. . . . . . .
. . . . . . .
. . . . . . .`
            // WHEN
            const result = board.stringRepresent();
            // THEN
            assert.deepEqual(result, expectedString);
        });it('shouldReturnA6By7DotArrayIfThereIsNoToken ', function () {
            // GIVEN
            board.addToken(Board.RED_TOKEN, 2)
            let expectedString =
`. . . . . . .
. . . . . . .
. . . . . . .
. . . . . . .
. . . . . . .
. . o . . . .`
            // WHEN
            const result = board.stringRepresent();
            // THEN
            assert.deepEqual(result, expectedString);
        });
        it('shouldReturnSomeRedTokenIn6x7Board ', function () {
            // GIVEN
            const boardTable = [
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [null,null,Board.RED_TOKEN,null,null,null,null],
                [null,null,Board.RED_TOKEN,null,null,Board.RED_TOKEN,null]
                ];
            let expectedString =
`. . . . . . .
. . . . . . .
. . . . . . .
. . . . . . .
. . o . . . .
. . o . . o .`
            board = new Board(boardTable);
            // WHEN
            const result = board.stringRepresent();
            // THEN
            assert.deepEqual(result, expectedString);
        });
        it('shouldReturnSomeBlueTokenIn6x7Board ', function () {
            // GIVEN
            const boardTable = [
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [null,null,Board.BLUE_TOKEN,null,null,null,null],
                [null,null,Board.BLUE_TOKEN,null,null,Board.BLUE_TOKEN,null]
                ];
            let expectedString =
`. . . . . . .
. . . . . . .
. . . . . . .
. . . . . . .
. . * . . . .
. . * . . * .`
            board = new Board(boardTable);
            // WHEN
            const result = board.stringRepresent();
            // THEN
            assert.deepEqual(result, expectedString);
        });
    });
});


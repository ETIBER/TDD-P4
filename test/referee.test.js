const assert = require('chai').assert;
const Board = require('../board');
const Referee = require('../referee');


describe('Referee', function () {
    let referee
    describe('#getTurn()', function () {
        it('shouldReturnRedIfRedTurn', function () {
            // GIVEN
            referee = new Referee(new Board(),Referee.RED_PLAYER);
            // WHEN
            const result = referee.getTurn();
            // THEN
            assert.equal(result,Referee.RED_PLAYER);

        });
        it('shouldReturnBlueIfBlueTurn', function () {
            // GIVEN
            referee = new Referee(new Board(),Referee.BLUE_PLAYER);
            // WHEN
            const result = referee.getTurn();
            // THEN
            assert.equal(result,Referee.BLUE_PLAYER);
        });
    });
    describe('#play(:column)', function () {
        it('shouldReturnTrueIfPlayLegal', function () {
            // GIVEN
            const column = 0;
            referee = new Referee(new Board(),Referee.BLUE_PLAYER);
            // WHEN
            const result = referee.play(column);
            // THEN
            assert.equal(result, true)
        });
        it('shouldReturnFalseIfPlayInFullColumn', function () {
            // GIVEN
            const boardTable = [
                [Board.RED_TOKEN,null,null,null,null,null,null],
                [Board.RED_TOKEN,null,null,null,null,null,null],
                [Board.RED_TOKEN,null,null,null,null,null,null],
                [Board.RED_TOKEN,null,null,null,null,null,null],
                [Board.RED_TOKEN,null,Board.RED_TOKEN,null,null,null,null],
                [Board.RED_TOKEN,null,Board.RED_TOKEN,null,null,Board.RED_TOKEN,null]
            ];
            const column = 0;
            referee = new Referee(new Board(boardTable), Referee.BLUE_PLAYER);
            // WHEN
            const result = referee.play(column);
            // THEN
            assert.equal(result, false)
        });
        it('shouldAddRedTokenInColumn0IfTurnIsRedPlayerAndPlayColumn0', function () {
            // GIVEN
            const boardTable = [
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null]
            ];
            const column = 0;
            const line = 5;
            referee = new Referee(new Board(boardTable), Referee.RED_PLAYER);
            // WHEN
            const result = referee.play(column);
            // THEN
            assert.equal(referee.board.getCellState(column,line), Board.RED_TOKEN);
        });
        it('shouldAddBlueTokenInColumn0IfTurnIsBluePlayerAndPlayColumn0', function () {
            // GIVEN
            const boardTable = [
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null]
            ];
            const column = 0;
            const line = 5;
            referee = new Referee(new Board(boardTable), Referee.BLUE_PLAYER);
            // WHEN
            const result = referee.play(column);
            // THEN
            assert.equal(referee.board.getCellState(column,line), Board.BLUE_TOKEN);
        });
    });
    describe('#getState()', function () {
        it('shouldReturnInProgressIfGameInProgress', function () {
            // GIVEN
            referee = new Referee(new Board(), Referee.BLUE_PLAYER);
            // WHEN
            const result = referee.getState();
            // THEN
            assert.equal(result, Referee.IN_PROGRESS);
        });
        it('shouldReturnRedVictoryIfRedPlayerAligns4RedTokensVertically', function () {
            // GIVEN
            const boardTable = [
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [Board.RED_TOKEN,null,null,null,null,null,null],
                [Board.RED_TOKEN,null,null,null,null,null,null],
                [Board.RED_TOKEN,null,null,null,null,null,null],
                [Board.RED_TOKEN,null,null,Board.BLUE_TOKEN,Board.BLUE_TOKEN,Board.BLUE_TOKEN,null]
            ];
            referee = new Referee(new Board(boardTable), Referee.RED_PLAYER);
            // WHEN
            const result = referee.getState();
            // THEN
            assert.equal(result, Referee.RED_VICTORY);
        });
        it('shouldReturnRNullIfTheBoardIsFullAndNo4TokensAlignment', function () {
            // GIVEN
            const boardTable = [
                [Board.RED_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN],
                [Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN],
                [Board.RED_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN],
                [Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN],
                [Board.RED_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN],
                [Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,Board.BLUE_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN]
            ];
            referee = new Referee(new Board(boardTable), Referee.RED_PLAYER);
            // WHEN
            const result = referee.getState();
            // THEN
            assert.equal(result, Referee.DRAW);
        });
        it('shouldReturnIN_PROGRESSIfTheBoardIsNotFullAndNo4TokensAlignment', function () {
            // GIVEN
            const boardTable = [
                [Board.RED_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,null],
                [Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN],
                [Board.RED_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN],
                [Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN],
                [Board.RED_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN],
                [Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,Board.BLUE_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN]
            ];
            referee = new Referee(new Board(boardTable), Referee.RED_PLAYER);
            // WHEN
            const result = referee.getState();
            // THEN
            assert.equal(result, Referee.IN_PROGRESS);
        });
    });
});
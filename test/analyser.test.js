const assert = require('chai').assert;
const Board = require('../board');
const Analyser = require('../analyser');

describe('Analyser', function () {
    describe('#analyseGame()', function () {
        let analyser;
        context('If no victory', function () {
            it('ShouldReturnFalse', function () {
                // GIVEN
                analyser = new Analyser(new Board());
                // WHEN
                const result = analyser.analyseGame();
                // THEN
                assert.equal(false, result);
            });
        });
        it('ShouldReturnRedIfRedAlignFourRedHorizontallyInFirstLine', function () {
            // GIVEN
            const boardTable = [
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [null,null,Board.BLUE_TOKEN,null,null,null,null],
                [Board.RED_TOKEN,Board.RED_TOKEN,Board.RED_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,Board.BLUE_TOKEN,null]
            ];
            analyser = new Analyser(new Board(boardTable));
            // WHEN
            const result = analyser.analyseGame();
            // THEN
            assert.equal(result, Board.RED_TOKEN);
        });
        it('ShouldReturnFalseIfNoFourRedHorizontallyInFirstLine', function () {
            // GIVEN
            const boardTable = [
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [null,null,Board.BLUE_TOKEN,null,null,null,null],
                [Board.RED_TOKEN,Board.RED_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,null]
            ];
            analyser = new Analyser(new Board(boardTable));
            // WHEN
            const result = analyser.analyseGame();
            // THEN
            assert.equal(result, false);
        });
        it('ShouldReturnRedIfFourRedHorizontallyInSecondLine', function () {
            // GIVEN
            const boardTable = [
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [null,Board.RED_TOKEN,Board.RED_TOKEN,Board.RED_TOKEN,Board.RED_TOKEN,null,null],
                [Board.RED_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,null]
            ];
            analyser = new Analyser(new Board(boardTable));
            // WHEN
            const result = analyser.analyseGame();
            // THEN
            assert.equal(result, Board.RED_TOKEN);
        });
        it('ShouldReturnFalseIfNoFourRedHorizontallyInFirstLine', function () {
            // GIVEN
            const boardTable = [
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [null,null,Board.BLUE_TOKEN,null,null,null,null],
                [Board.RED_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.RED_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,null]
            ];
            analyser = new Analyser(new Board(boardTable));
            // WHEN
            const result = analyser.analyseGame();
            // THEN
            assert.equal(result, false);
        });
        it('ShouldReturnBlueIfFourBlueHorizontallyInFirstLine', function () {
            // GIVEN
            const boardTable = [
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [null,null,Board.BLUE_TOKEN,null,null,null,null],
                [Board.RED_TOKEN,Board.BLUE_TOKEN,Board.BLUE_TOKEN,Board.BLUE_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.RED_TOKEN]
            ];
            analyser = new Analyser(new Board(boardTable));
            // WHEN
            const result = analyser.analyseGame();
            // THEN
            assert.equal(result, Board.BLUE_TOKEN);
        });
        it('ShouldReturnRedIfFourRedVerticallyInFirstColumn', function () {
            // GIVEN
            const boardTable = [
                [null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null],
                [Board.RED_TOKEN,null,null,null,null,null,null],
                [Board.RED_TOKEN,null,null,null,null,null,null],
                [Board.RED_TOKEN,null,Board.BLUE_TOKEN,null,null,null,null],
                [Board.RED_TOKEN,Board.BLUE_TOKEN,Board.BLUE_TOKEN,null,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.RED_TOKEN]
            ];
            analyser = new Analyser(new Board(boardTable));
            // WHEN
            const result = analyser.analyseGame();
            // THEN
            assert.equal(result, Board.RED_TOKEN);
        });
        it('ShouldReturnFalseIfThreeRedVerticallyInFirstColumn', function () {
            // GIVEN
            const boardTable = [
                [null,null,null,null,null,null,null],
                [Board.RED_TOKEN,null,null,null,null,null,null],
                [Board.RED_TOKEN,null,null,null,null,null,null],
                [Board.RED_TOKEN,null,null,null,null,null,null],
                [Board.BLUE_TOKEN,null,Board.BLUE_TOKEN,null,null,null,null],
                [Board.BLUE_TOKEN,Board.BLUE_TOKEN,Board.BLUE_TOKEN,null,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.RED_TOKEN]
            ];
            analyser = new Analyser(new Board(boardTable));
            // WHEN
            const result = analyser.analyseGame();
            // THEN
            assert.equal(result, false);
        });
        it('Should Return Red If Four Red In Ascend Diagonal', function () {
            // GIVEN
            const boardTable = [
                [null,null,null,null,null,null,null],
                [Board.RED_TOKEN,null,null,null,null,null,null],
                [Board.RED_TOKEN,null,null,Board.RED_TOKEN,null,null,null],
                [Board.RED_TOKEN,null,Board.RED_TOKEN,Board.RED_TOKEN,null,null,null],
                [Board.BLUE_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,null,null,null,null],
                [Board.RED_TOKEN,Board.BLUE_TOKEN,Board.BLUE_TOKEN,null,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.RED_TOKEN]
            ];
            analyser = new Analyser(new Board(boardTable));
            // WHEN
            const result = analyser.analyseGame();
            // THEN
            assert.equal(result, Board.RED_TOKEN);
        });
        it('Should Return Red If Four Red In Descend Diagonal', function () {
            // GIVEN
            const boardTable = [
                [null,null,null,null,null,null,null],
                [Board.RED_TOKEN,null,null,null,null,null,null],
                [Board.RED_TOKEN,null,null,Board.RED_TOKEN,null,null,null],
                [Board.RED_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN,null,null,null],
                [Board.BLUE_TOKEN,Board.RED_TOKEN,Board.RED_TOKEN,null,null,null,null],
                [Board.RED_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.RED_TOKEN,Board.BLUE_TOKEN,Board.RED_TOKEN,Board.RED_TOKEN]
            ];
            analyser = new Analyser(new Board(boardTable));
            // WHEN
            const result = analyser.analyseGame();
            // THEN
            assert.equal(result, Board.RED_TOKEN);
        });
    });
});
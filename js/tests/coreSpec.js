describe('Core Test Suite', function() {
    var myCore;
    beforeEach(function(){
        myCore = new Model();
    });
    // Use require.js to fetch the module
    it("should finish initialization", function(done) {
        var board = myCore.board;
        expect(board).toBeDefined();
        expect(board.length).toBe(0);
        expect(myCore.WINNING_POINT).toBe(4);
    });

    //run tests that use the myModule object
    it("should generate boards", function() {
        myCore.generateBoard(4, 5);
        expect(myCore.board.length).toBe(4);
        expect(myCore.board[0].length).toBe(5);
        myCore.generateBoard(6, 7);
        expect(myCore.board.length).toBe(6);
        expect(myCore.board[0].length).toBe(7);
        expect(myCore.getCurrentPlayer()).toBe(0);
    });

    it("should set places", function(){
        myCore.generateBoard(6, 7);
        myCore.setPlace(3);
        expect(myCore.board[5][3]).toBe(myCore.getCurrentPlayer() + 1);
        myCore.setPlace(6);
        expect(myCore.board[5][6]).toBe(myCore.getCurrentPlayer() + 1);
        myCore.togglePlayer();
        myCore.setPlace(3);
        expect(myCore.board[4][3]).toBe(myCore.getCurrentPlayer() + 1);
    });

    it("should check vertical win", function(){
        myCore.generateBoard(4,4);
        myCore.WINNING_POINT = 3;
        myCore.player = 1;
        for (var i = myCore.rowCount - 1; i >= 0; i--) {
            if(i === 0) {
                myCore.board[i][3] = 1;
            } else {
                myCore.board[i][3] = 2;
            }
        }
        myCore.currentPlace = {rowNum : 3, colNum : 3 };
        expect(myCore.isVerticalWin()).toBeTruthy();

        myCore.board[0][3] = 2;
        myCore.board[1][3] = 1;
        myCore.currentPlace = {rowNum : 0, colNum : 3 };
        expect(myCore.isVerticalWin()).toBeFalsy();
    });

    it("should check horizontal win", function(){
        myCore.generateBoard(4,4);
        myCore.WINNING_POINT = 3;
        myCore.player = 1;
        for (var i = myCore.colCount - 1; i >= 0; i--) {
            if(i === 0) {
                myCore.board[3][i] = 1;
            } else {
                myCore.board[3][i] = 2;
            }
        }
        myCore.currentPlace = {rowNum : 3, colNum : 3 };

        expect(myCore.isHorizontalWin()).toBeTruthy();

        myCore.board[3][0] = 2;
        myCore.board[3][1] = 1;
        myCore.currentPlace = {rowNum : 3, colNum : 0 };

        expect(myCore.isHorizontalWin()).toBeFalsy();
    });

    it("should check diagonal win", function(){
        myCore.generateBoard(4,4);
        myCore.WINNING_POINT = 3;
        myCore.player = 1;
        //set up testing board
        myCore.board[0][0] = 1;
        myCore.board[1][1] = 2;
        myCore.board[2][2] = 2;
        myCore.board[3][3] = 2;
        myCore.currentPlace = {rowNum : 3, colNum : 3 };

        expect(myCore.isDiagonalWin()).toBeTruthy();

        myCore.board[3][0] = 1;
        myCore.board[2][1] = 2;
        myCore.board[1][2] = 2;
        myCore.board[0][3] = 2;
        myCore.currentPlace = {rowNum : 1, colNum: 2};

        expect(myCore.isDiagonalWin()).toBeTruthy();
    });


});
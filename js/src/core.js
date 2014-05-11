//define(["underscore"], function(_){

    var Model = function(){
        this.board = [];
        this.WINNING_POINT = 4
    };

    Model.prototype.generateBoard = function(rowCount, colCount){
        var _self = this;
        _self.board = [];
        _self.player = 0;
        _self.currentPlace = {
            rowNum: 0,
            colNum: 0
        };
        this.rowCount = rowCount || 6;
        this.colCount = colCount || 7;
        this.totalMoves = this.rowCount * this.colCount;
        this.moves = 0;
        for (var i = 0; i < rowCount; i++) {
            _self.board[i] = [];
            for (var j = 0; j < colCount; j++) {
                _self.board[i][j] = 0;
            }
        }
        return _self;
     };

    Model.prototype.setPlace = function(colNum) {
        var _self = this;
        var currentPlace= _self.getDimension(colNum);
        _self.currentPlace = currentPlace;
        this.board[currentPlace.rowNum][currentPlace.colNum] = _self.player + 1;
        this.moves++;

    };

    Model.prototype.checkDraw = function() {
        return this.moves === this.totalMoves;
    };

    Model.prototype.getPlace = function() {
        return this.currentPlace;
    };

    Model.prototype.getDimension = function(colNum) {
        var rowNum;
        for (var i = this.rowCount -1; i >= 0 ; i--) {
            if(this.board[i][colNum] === 0) {
                rowNum = i;
                break;
            }
        }
        return {
            rowNum : rowNum,
            colNum :colNum
        }
    };

    Model.prototype.togglePlayer = function() {
        this.player = this.player === 0 ? 1 : 0;
    };

    Model.prototype.getCurrentPlayer = function() {
        return this.player;
    };

    Model.prototype.isVerticalWin = function() {
        var _self = this;
        var currentPlace = this.currentPlace;
        var value = this.player + 1;
        var count = 0;

        for(var i = 0; i < this.rowCount; i++) {
            if(_self.board[i][currentPlace.colNum] === value) {
                //numbers.push(i);
                count++;
                if (count === _self.WINNING_POINT) return true;
            } else {
                count = 0;
            }
        }

        return false;

    };

    Model.prototype.isHorizontalWin = function() {
        var _self = this;
        var currentPlace = this.currentPlace;
        var value = this.player + 1;
        var count = 0;

        for(var i = 0; i < this.colCount; i++) {
            if(_self.board[currentPlace.rowNum][i] === value) {
                //numbers.push(i);
                count++;
                if (count === _self.WINNING_POINT) return true;
            } else {
                count = 0;
            }
        }

        return false;

    };

    Model.prototype.isDiagonalWin = function() {
        var _self = this;
        var currentPlace = this.currentPlace;
        var value = this.player + 1;
        var checkBLTRDiagonals = function() {
            var count = 0;
            var cUpIndex = currentPlace.colNum + 1 , rUpIndex = currentPlace.rowNum - 1;
            var points = [];
            var cDownIndex = currentPlace.colNum, rDownIndex = currentPlace.rowNum;
            while(cUpIndex < _self.colCount && rUpIndex >= 0) {
                points.push(_self.board[rUpIndex][cUpIndex]);
                rUpIndex--;
                cUpIndex++;
            }
            while(cDownIndex >= 0 && rDownIndex < _self.rowCount) {
                points.unshift(_self.board[rDownIndex][cDownIndex]);
                rDownIndex++;
                cDownIndex--;
            }

            //console.log(points);

            for(var i = 0; i < points.length; i++) {
                if(points[i] === value) {
                    count++;
                    if(count === _self.WINNING_POINT ) return true;
                } else {
                    count = 0;
                }
            }

            return false;
        };

        var checkBRTLDiagonals = function() {
            var count = 0;
            var cUpIndex = currentPlace.colNum - 1 , rUpIndex = currentPlace.rowNum - 1;
            var cDownIndex = currentPlace.colNum, rDownIndex = currentPlace.rowNum;
            var points = [];
            while(cUpIndex >= 0 && rUpIndex >= 0) {
                points.push(_self.board[rUpIndex][cUpIndex]);
                rUpIndex--;
                cUpIndex--;
            }
            while(cDownIndex < _self.colCount && rDownIndex < _self.rowCount) {
                points.unshift(_self.board[rDownIndex][cDownIndex]);
                rDownIndex++;
                cDownIndex++;
            }

            //console.log(points);
            for(var i = 0; i < points.length; i++) {
                if(points[i] === value) {
                    count++;
                    if(count === _self.WINNING_POINT) return true;
                } else {
                    count = 0;
                }
            }

            return false;
        };


        return (function(){
            var tests = [checkBLTRDiagonals, checkBRTLDiagonals];
            var res = false
            for(var i = 0; i < tests.length; i++){
                if(tests[i]){
                    res = tests[i].call(_self);
                    if(res){
                        return true;
                    }
                }
            }
            return false;
        })();
    };

    Model.prototype.isWin = function() {
        var _self = this;
        var checkingFuncs = [this.isVerticalWin, this.isHorizontalWin, this.isDiagonalWin];
        var result = false;
        for(var i = 0; i < checkingFuncs.length; i++) {
            if(checkingFuncs[i]) {
                result = checkingFuncs[i].call(_self);
                if(result) {
                    return true;
                }
            }
        }

        return false;
    };



    //return model;
//});
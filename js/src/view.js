//define(["jquery", "underscore", "src/core"], function($, _, CORE){
    var UI = {
        initialize : function(options) {
            var _self = this;
            this.rowCount = options.rowCount || 6;
            this.colCount = options.colCount || 7;
            this.model = options.model;
            this.draw();
        },

        draw : function() {
            //this.model = model;
            this.model.generateBoard(this.rowCount, this.colCount);
            this.render();
            this.bind();

        },

        dropDice : function(columnNum) {
            columnNum = columnNum || 0;
            var _self = this;
            var playerNum = _self.model.getCurrentPlayer();
            var place;
            _self.model.setPlace(columnNum);
            place = _self.model.getPlace();
            $("ul[data-row=" + place.rowNum +"]").find("li[data-col=" + place.colNum +"]").addClass("dropped player_" + playerNum);
        },

        render : function(){
            var _self = this;
            var html = "";
            for (var i = 0; i < this.rowCount; i++) {
                html += "<ul data-row =" + i + ">";
                for (var j = 0; j < this.colCount; j++) {
                    html += "<li data-col = " + j + "></li>";
                }
                html += "</ul>";
            }
            $("#main").find(".board").html(html);

            _self.boardSection = $('#main .board');
            _self.playerSection = $('#main nav');
            _self.playerIcon = $("#player-icon");
            _self.setPlayerLegend();
        },

        judge : function(cb) {
            var _self = this;
            if(_self.model) {
                if(_self.model.checkDraw()) {
                    alert("draw");
                    _self.draw();
                } else {
                    var win = _self.model.isWin();
                    if(win) {
                        alert("player " + (_self.model.getCurrentPlayer() + 1) + " is the winner");
                        _self.draw();
                    } else {
                        if(cb) cb.call(_self);
                    }

                }

            }
        },

        setPlayerLegend : function() {
            var _self = this;
            _self.playerIcon.removeClass().addClass('player_' + _self.model.getCurrentPlayer());
            _self.playerSection.find('span').html('player ' + (_self.model.getCurrentPlayer() + 1));
        },

        changePlayer: function() {
            var _self = this;
            if(_self.model) {
                _self.model.togglePlayer();
            }
            _self.setPlayerLegend();

        },

        bind : function(){
            var _self = this;
            $("li").on("click", function(e){
                var colNum = parseInt($(this).data("col"), 10);

                _self.dropDice(colNum);
                _self.judge(_self.changePlayer);
            });
        }

    };

    //return UI;
//});
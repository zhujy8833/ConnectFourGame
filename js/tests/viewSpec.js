describe('View Test Suite', function() {
    var myView;
    beforeEach(function(){
        var myCore = new Model();
        UI.initialize({
            model : myCore,
            rowCount : 6,
            colCount : 7
        })
    });
    // Use require.js to fetch the module
    it("should finish initialization", function() {
        expect(UI.model).toBeDefined();
        expect(UI.rowCount).toBe(6);
        expect(UI.colCount).toBe(7);
    });

    it("should draw elements", function() {
        UI.draw();
        expect(UI.boardSection).toBeDefined();
        expect(UI.playerSection).toBeDefined();
        expect(UI.playerIcon).toBeDefined();
    });

});
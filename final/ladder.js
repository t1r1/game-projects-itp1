function createLadder() {
    return {
        yPos: 0,
        firstLevel: {
            xPos: 2150,
            yPos: this.yPos,
            xSize: 200,
            ySize: 100,
        },
        setup: function (yPos) {
            this.yPos = yPos
        },
        draw: function () {
            fill(COLORS.treeCrown); // TODO: change color
            rect(
                ladder.firstLevel.xPos,
                ladder.firstLevel.yPos,
                ladder.firstLevel.xSize,
                ladder.firstLevel.ySize
            );
        }
    }

}

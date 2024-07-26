  export class Player {
    constructor(id, pieces = []) {
        this.id = id;
        this.pieces = pieces;
        this.points = 0;
        this.turn = false;
    }
    //gets dealt a starting amount of pieces of different letters at random
    getPieces() {

    }
    //after end turn calculate points of each letter pieces on gameboard
    //give points to player
    givePoints() {

    }

    giveTurn() {
        this.turn = true;
    }
 }

import { scoreTiles } from "./tiles.js";
import { points, amount } from "./pieces.js";
import {Player} from './classes/player.js';

window.addEventListener('DOMContentLoaded', (e) => {
    let tileList = [];
    let currentPlayers = [];
    let gameBag = [];
    let letterPoints = [];
    const newGame = document.getElementById('new-game');
    const startGame = document.getElementById('start');

    const currentPiece = document.querySelector('.current-piece');


// function creates a gameboard div element with multiple tile elements that
//append to the gameboard total of 225 tiles 15x15
    const createGameBoard = () => {
        const gameboard = document.createElement('div');
        gameboard.setAttribute('class', 'gameboard');
        for(let i = 0; i < 225; i ++) {

            const tile = document.createElement('div');
            tile.setAttribute('class', 'tiles');
            gameboard.appendChild(tile);
            tileList.push(tile);
        }
        document.getElementById("container").appendChild(gameboard)
    }
    //sets the correct tiles with score values and styles using recurision
    const loadScoreTiles = (tilesArray) => {
        if(tilesArray.length === 0) {
            tileList[112].setAttribute('id', 'center')
            return;
        }
        //loop through scoreTiles array. length of 4
        let scoreTile = tilesArray[0];
       let set = scoreTile.tileSet;
       for(let i = 0; i < set.length; i++) {
        let tileSpace = set[i];

        tileList[tileSpace].innerText = scoreTile.text;
        tileList[tileSpace].style.background = scoreTile.color;
        tileList[tileSpace].value = scoreTile.value;

       }
       tilesArray.splice(0,1);
       return loadScoreTiles(tilesArray);




    }

    const createBag = () => {

        let keyPairs = Object.entries(amount)

        let currAmount;
        for(let i = 0; i < keyPairs.length; i++) {
            currAmount = Number(keyPairs[i][0]);
            for(let j = 0; j < currAmount; j++) {
                gameBag.push(keyPairs[i][1]);
            }
        }

    }





    //function to deal out game pieces starting with 14
    //each player gets half of deal amount (7)
    const deal = (dealAmount) => {
        let max = 100;
        gameBag = gameBag.flat();
       for(let i = 0; i < dealAmount; i++) {
        let randomIndex = Math.floor(Math.random() * max);
        if(i % 2 === 0) {
            currentPlayers[0].pieces.push(gameBag[randomIndex]);
        }
        else {
            currentPlayers[1].pieces.push(gameBag[randomIndex]);
        }
        gameBag.splice(randomIndex, 1);
        max = gameBag.length;

       }


    }

    const loadPlayerPieces = (player) => {
        let hand = player.pieces;
        let copyHand = hand.slice();
        console.log('hand:', hand)
        getPoints(copyHand);

        for(let i = 0; i < hand.length; i++) {
            let piece = document.getElementById(i);
            let value = document.createElement('p');
            value.setAttribute('class', 'piece-points')
            value.innerText = letterPoints[i];
            piece.innerText = hand[i];
            piece.append(value)


        }
    }

    const getPoints = (letters) => {
        if(letters.length === 0) {
            console.log(letterPoints)
            return;
        }
        const keyPairs = Object.entries(points);
        //length is 8
        for(let i = 0; i < keyPairs.length; i++) {
            let chars = keyPairs[i][1];
            let value = keyPairs[i][0];
            if(chars.includes(letters[0])) {
                letterPoints.push(value);
                letters.splice(0,1);
                return getPoints(letters);
            }

        }

    }
    const trackTileChoice = () => {
        for(let i = 0; i < 7; i++) {
            document.getElementById(i).addEventListener('click', (e) => {

                currentPiece.innerText = e.target.innerText

            })
        }
    }

    const changeBoardSpace = (e) => {
        e.target.innerText = currentPiece.innerText[0]
        e.target.style.background = 'rgb(243, 187, 118)';
                    e.target.style.fontSize = '20px';
                    e.target.style.color = 'black';
                    e.target.style.textAlign = 'center';
    }

    const placeLetterPiece = () => {

        tileList.forEach((tile) => {

            tile.addEventListener('click', (e) => {
                if(currentPiece.innerText !== '') {
                    changeBoardSpace(e);
                    currentPiece.innerText = '';

                }
            })
        })
    }


    const givePoints = () => {

    }


    createGameBoard();
    loadScoreTiles(scoreTiles)


    newGame.addEventListener('click', (e) => {
        currentPlayers = [];
        startGame.style.display = 'flex'
        document.querySelector(".players").style.display = 'flex'
        currentPiece.innerText = '';
            //create a new player passing in a shuffled array of pieces, score starting at 0




    })
// create players based on user choice
// players given id of 1 or 2 based on player count
//computer id is set to 0
    startGame.addEventListener('click', (e) => {
        createBag()
        const playerAmount = document.getElementById('choice').value;
        const player1 = new Player(1, []);
        currentPlayers.push(player1);
        if(playerAmount === '2') {
            const player2 = new Player(2, []);
            currentPlayers.push(player2)
        }
        else {
            const computer = new Player(0, []);
            currentPlayers.push(computer)
        }

        startGame.style.display = 'none';
        document.querySelector(".players").style.display = 'none'
        deal(14);
        loadPlayerPieces(player1)
        trackTileChoice();
        placeLetterPiece();
    })





})

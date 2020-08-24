import { LinkedList } from './cirLinkList';
import { Node } from './node';

let circDeck:string[] = ['K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2', 'A'];

let names:string[] = ["Chinedu", "Samuel", "Dorcas", "Annas", "Guvi", "Michael", "Derin", "Jeff"];

let dropDeck:string[] = [];

let players:LinkedList;

let playerMatrix:any = {};

let playerWins:any = {};

let playerPoints:any = {};

let rounds:number = 0;

function createMatrix(names:string[]):void {

    for(let i = 0; i < names.length; i++) {
        playerMatrix[names[i]] = [];
        playerWins[names[i]] = 0;
        playerPoints[names[i]] = 0;
    }
}

function createGame():void {

    let deck:string[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K',
                         'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K',
                         'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K',
                         'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    players = new LinkedList();

    for(let i = 0; i < names.length; i++)
        deck = players.addPlayer(names[i], i, deck, circDeck, names.length); 
}

function playGame():void {

    let currPlayer:Node = players.getHead();

    let i:number = 0;

    let winner:Node;

    while(true) {

        if(i == circDeck.length)
            i = 0;

        if(currPlayer.user.name == players.getHead().user.name) {
            calculateProb();
            printPlayProb();
            rounds += 1;
            //console.log("\nPlayer Matrix");
            //printMatrix();
            console.log("\nROUND " + String(rounds));
        }

        let cards:string[] = currPlayer.user.smartPlay(circDeck[i]);

        for(let j = 0; j < cards.length; j++) 
            dropDeck.push(cards[j]);

        if(cards.length > 1)
            console.log(currPlayer.user.name + " drops " + String(cards.length) + " " + cards[0] + "'s");
        else
            console.log(currPlayer.user.name + " drops " + cards[0]);

        let bullCaller:number = playerCallBull(currPlayer.user.id, currPlayer.user.cards.length, currPlayer.user.name, circDeck[i]);

        for(let k = 0; k < cards.length; k++) {
            let dropIndex:number = playerMatrix[currPlayer.user.name].indexOf(cards[k]);

            if(dropIndex != -1) 
                playerMatrix[currPlayer.user.name].splice(dropIndex, 1);
        }

        if(bullCaller != -1) {

            players.getPlayer(currPlayer.user.id).user.bluffCalled++;

            let caller:Node = players.getPlayer(bullCaller);

            console.log(caller.user.name + " calls BullShit!");

            if(sameCard(circDeck[i])) {

                players.getPlayer(currPlayer.user.id).user.notBluffed++;

                if(currPlayer.user.cards.length == 0) {
                    playerWins[currPlayer.user.name] += 1;
                    console.log("It's Not Bullshit and that is " + currPlayer.user.name + "'s last card");
                    //winner = currPlayer;
                    dropDeck = [];
                    break;
                }

                console.log("Not Bullshit! " + caller.user.name + " adds cards to their deck");

                playerMatrix[caller.user.name].push(dropDeck[dropDeck.length - 1]);

                players.getPlayer(caller.user.id).user.addCards(dropDeck, circDeck, players.numPlayers);

                playerPoints[caller.user.name] -= 1;
                playerPoints[currPlayer.user.name] += 2; 

            } else {

                console.log("Its Bullshit! " + currPlayer.user.name + " adds cards to their deck");

                playerMatrix[currPlayer.user.name].push(dropDeck[dropDeck.length - 1]);

                players.getPlayer(currPlayer.user.id).user.addCards(dropDeck, circDeck, players.numPlayers);

                playerPoints[currPlayer.user.name] -= 1; 
                playerPoints[caller.user.name] += 2;
            }

            dropDeck = [];
        }

        if(bullCaller == -1)
            playerPoints[currPlayer.user.name] += 3; 

        if(currPlayer.user.cards.length == 1)
            console.log(currPlayer.user.name + " has one card left");

        currPlayer = currPlayer.next;

        i++;
    }
}

function sort2dArr(a:number[], b:number[]):number {

    if(a[0] == b[0]) 
        return 0;
    else 
        return (a[0] < b[0]) ? -1 : 1;
} 


function calculateProb():void {

    let cardSum:number = 0;

    for(let i = 0; i < players.numPlayers; i++) {
        cardSum += players.getPlayer(i).user.cards.length;
    }

    let curr:Node;

    for(let i = 0; i < players.numPlayers; i++) {

        curr = players.getPlayer(i);

        if(curr.user.matchedCards == 0)
            curr.user.highStreak = 0;

        let hProb:number = 0;
        let bProb:number = 0;
        let nProb:number = 0;

        if(curr.user.matchedCards != 0)
            hProb = curr.user.highStreak / curr.user.matchedCards;

        if(rounds != 0)
            bProb = 1 - (curr.user.bluffCalled / rounds);

        if(curr.user.bluffCalled != 0)
            nProb = curr.user.notBluffed / curr.user.bluffCalled;

        let mProb:number = curr.user.matchedCards / curr.user.cards.length;

        let lProb:number = 1 - (curr.user.cards.length / cardSum);

        let winProb:number = Math.floor((hProb * mProb * lProb) * 100);
        
        players.getPlayer(curr.user.id).user.winProb = winProb;
    }

    cardSum = 0;
}

function printPlayProb():void {

    let curr:Node = players.getHead();

    console.log("\n");

    for(let i = 0; i < players.numPlayers; i++) {
        console.log(curr.user.name + " has " + curr.user.winProb + "% chance of winning and has the next " + curr.user.highStreak + "/" + curr.user.matchedCards + "/" + curr.user.cards.length + " cards");
        //console.log(curr.user.cards);

        curr = curr.next;
    }
}


function playerCallBull(playerID:number, cardLength:number, name:string, supCard:string):number {

    let id:number = -1;

    if(cardLength == 0) {

        id = Math.floor(Math.random() * players.numPlayers);

        while(id == playerID) {
            id = Math.floor(Math.random() * players.numPlayers);
        }

    } else {

        if(playerMatrix[name].indexOf(supCard) == -1 && playerID == -1 && playerMatrix[name].length > 0) {
            id = 0;
        } else {
            let rand:number = Math.floor(Math.random() * 2);

            if(rand == 1) {
                id = Math.floor(Math.random() * players.numPlayers);

                while(id == playerID) {
                    id = Math.floor(Math.random() * players.numPlayers);
                }
            }
        }
    }

    return id;
}

function sameCard(card:string):boolean {

    if(dropDeck[dropDeck.length - 1] == card) {
        return true;
    } else {
        return false;
    }
}

function printWins(max:number):void {

    let largest:number = 0;
    let name:string;

    for(let i = 0; i < players.numPlayers; i++) {
        let percent:number = Math.floor((playerWins[names[i]] / max) * 100);
        console.log(players.getPlayer(i).user.name + ": " + playerWins[names[i]] + " (" + String(percent) + "%) with " + playerPoints[names[i]] + " points");

        if(percent >= largest) {
            largest = percent;
            name = players.getPlayer(i).user.name
        }
    }
    
    console.log("\nMajority WINNER --> " + name);
}

function printMatrix():void {

    for(let i = 0; i < players.numPlayers; i++) 
        console.log(names[i] + ": " + playerMatrix[names[i]]);
}

function main():void {

    let i:number; 

    createMatrix(names);

    let max:number = 1;

    for(i = 0; i < max; i++) {

        createGame();
        
        playGame();
    }  

    console.log("\nWin Counts:");
    printWins(max);
}

main();
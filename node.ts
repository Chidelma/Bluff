import { Player } from './player';

export class Node {

    user:Player;
    next;

    constructor(name:string, id:number) {
        this.user = new Player(name, id);
        this.next = null;
    }

    setPlayerCards(deck:string[], circDeck:string[], numPlayers:number):string[] {
        return this.user.setCards(deck, circDeck, numPlayers);
    }
}


import { Node } from './node';

export class LinkedList {

    playHead:Node;
    numPlayers:number;

    constructor() {

        this.playHead = null;
        this.numPlayers = 0;
    }

    getHead():Node {
        return this.playHead;
    }

    addPlayer(name:string, id:number, deck:string[], circDeck:string[], numPlayers:number):string[] {

        let remDeck;

        if(this.playHead == null) {

            this.playHead = new Node(name, id);

            this.playHead.next = this.playHead;

            remDeck = this.playHead.setPlayerCards(deck, circDeck, numPlayers);

        } else {

            let newPlayer:Node = new Node(name, id);

            newPlayer.next = this.playHead.next;

            this.playHead.next = newPlayer;
/*
            let tail:Node = this.playHead.prev;

            tail.next = newPlayer;

            newPlayer.prev = tail;

            newPlayer.next = this.playHead;

            this.playHead.prev = newPlayer;
*/
            remDeck = newPlayer.setPlayerCards(deck, circDeck, numPlayers);
        }

        this.numPlayers++;

        return remDeck;
    }

    getPlayer(id:number):Node {

        let curr:Node = this.playHead;

        while(true) {
            if(curr.user.id == id) 
                break;

            curr = curr.next;
        }

        return curr;
    }

    switchCards(player:Node):void {

        let curr:Node = this.playHead;

        while(true) {
            if(player.user.id == curr.user.id) {
                curr.user.cards = player.user.cards;
                break;
            }
            curr = curr.next;
        }
    }
}
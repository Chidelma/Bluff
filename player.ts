export class Player {

    name: string;
    cards: string[];
    matchedCards: number;
    highStreak:number;
    id:number;
    winProb:number;
    bluffCalled:number;
    notBluffed:number;
    currCard:string;

    constructor(name:string, id:number) {
        this.name = name;
        this.cards = [];
        this.id = id;
        this.winProb = 0;
        this.matchedCards = 0;
        this.highStreak = 0;
        this.bluffCalled = 0;
        this.notBluffed = 0;
        this.currCard = '';
    }

    setCards(deck:string[], circDeck:string[], numPlayers:number):string[] {

        let deckIndex:number = null;

        for(let i = 0; i < 6; i++) {

            deckIndex = Math.floor(Math.random() * deck.length);

            this.cards.push(deck[deckIndex]);

            deck.splice(deckIndex, 1);
        }

        this.currCard = circDeck[this.id];

        let nRoundsCards:string[] = [];

        let currCard:string = this.currCard;

        for(let i = 0; i < this.cards.length; i++) {
            currCard = this.nextRoundCard(currCard, circDeck, numPlayers);
            nRoundsCards.push(currCard);
        }

        this.rearrangeCards(nRoundsCards);

        return deck;
    }

    addCards(deck:string[], circDeck:string[], numPlayers:number):void {

        this.cards = this.cards.concat(deck); 

        let nRoundsCards:string[] = [];

        let currCard:string = this.currCard;

        for(let i = 0; i < this.cards.length; i++) {
            currCard = this.nextRoundCard(currCard, circDeck, numPlayers);
            nRoundsCards.push(currCard);
        }

        this.rearrangeCards(nRoundsCards);

        if(this.matchedCards > this.cards.length) {
            let diff:number = this.cards.length - this.matchedCards;
            this.matchedCards += diff;
        } 

        if(this.highStreak > this.matchedCards) {
            let diff:number = this.matchedCards - this.highStreak;
            this.highStreak += diff;
        }
    }

    removeCard(card:string):void {

        let index:number = this.cards.indexOf(card);

        this.cards.splice(index, 1);
    }

    nextRoundCard(card:string, circDeck:string[], numPlayers:number):string {

        let nextCard:string;

        let start:number = circDeck.indexOf(card);

        let end:number = start + numPlayers;

        if(end > circDeck.length) {
            nextCard = circDeck[end - circDeck.length];
        } else {
            nextCard = circDeck[end];
        }

        return nextCard;
    }

    highestOccurence(arr:string[]):void {

        let highestStreak:number = 0;
        let temp:string = '';
        let streak:number = 0;

        for(let i = 0; i < arr.length; i++) {
            if(temp != '' && temp == arr[i])
                streak++;
            else    
                streak = 1;

            temp = arr[i];

            if(streak > highestStreak)
                highestStreak = streak;
        }

        this.highStreak = highestStreak;
    }

    rearrangeCards(rounds:string[]):void {

        let subDeck:string[] = [];
        let subCard:string[] = [];

        this.matchedCards = 0;

        let i:number;

        for(i = 0; i < this.cards.length; i++) {
            if(rounds.indexOf(this.cards[i]) != -1) {
                subDeck.push(rounds[rounds.indexOf(this.cards[i])]);
                this.matchedCards++;
            }
        }

        this.highestOccurence(subDeck);
            
        for(i = 0; i < this.cards.length; i++)
            if(subDeck.indexOf(this.cards[i]) == -1)
                subCard.push(this.cards[i]);

        this.cards = subDeck.concat(subCard);
    }


    smartPlay(card:string):string[] {

        this.currCard = card;

        let indexes:number[] = [];

        let dropCards:string[] = [];

        let i:number;

        for(i = 0; i < this.cards.length; i++) 
            if(this.cards[i] == card)
                indexes.push(i);      

        if(indexes.length > 0) {

            console.log(this.name + " has a " + card);

            for(i = 0; i < indexes.length; i++) 
                dropCards.push(this.cards[indexes[i]]);

            for(i = 0; i < indexes.length; i++)
                this.removeCard(card);
    
        } else {

            console.log(this.name + " does not have " + card);

            dropCards.push(this.cards[this.cards.length - 1]);

            this.cards.splice(this.cards.length - 1, 1);
            
        }

        if(this.matchedCards > this.cards.length) {
            let diff:number = this.cards.length - this.matchedCards;
            this.matchedCards += diff;
        } 

        if(this.highStreak > this.matchedCards) {
            let diff:number = this.matchedCards - this.highStreak;
            this.highStreak += diff;
        }

        return dropCards;
    }

}
# Bluff

This is a TypeScript code for a card game called Bluff. The code uses Linked List data structure and has the following functionalities:

* Creating a deck of cards
* Adding players to the game
* Playing the game

The game is played by shuffling a deck of cards and distributing them evenly among players. Players take turns dropping cards of the same rank on the pile, and they must declare the rank of the cards they are playing. A player can call out another player for playing a card of a different rank than what they declared, and if the accusation is true, the player who played the wrong card takes all the cards in the pile. If the accusation is false, the accuser takes all the cards in the pile.

## Code Explanation
The code begins with the import of two classes `LinkedList` and `Node`. `LinkedList` class defines the data structure used to store the players in the game, and Node class is used to create a node object that will store a player and a reference to the next node.

Then, the code creates three arrays:

* `circDeck` which contains the cards that players will be playing on the pile.
* `names` which contains the names of the players in the game.
* `dropDeck` which will store the cards dropped by the players.

The code then defines four objects:

* `playerMatrix` which stores the cards each player has dropped.
* `playerWins` which stores the number of wins each player has.
* `playerPoints` which stores the number of points each player has.
* `rounds` which stores the number of rounds played.

The function `createMatrix` is used to create an object that will store the cards dropped by each player. The function loops through the names array and creates a new key in the playerMatrix object with the player's name. It also sets the initial value for playerWins and playerPoints to 0.

The function `createGame` is used to create a new game. It begins by creating a new deck of cards and a new LinkedList object. It then loops through the names array and adds a new player to the LinkedList object using the addPlayer method.

The function `playGame` is the main function that plays the game. It begins by setting the current player to the first player in the LinkedList object. It then loops through the circDeck array, dropping one card at a time. If the current player is the first player in the `LinkedList` object, the function calls the `calculateProb` and `printPlayProb` functions, and increments the rounds variable.

The function then uses the `smartPlay` method of the player to drop one or more cards on the pile. The function checks if the player has dropped more than one card and prints the appropriate message to the console. The function then calls the playerCallBull function to check if any player has called BullShit. If a player has called BullShit, the function checks if the accusation is true or false and takes the appropriate action.

The function then checks if the player has only one card left and prints a message to the console. The function then moves to the next player and repeats the process until the game is over.

The function `sort2dArr` is used to sort a two-dimensional array. It takes two arrays as parameters and returns a number that determines the order of the arrays.

The function `calculateProb` is used to calculate the probability of a player winning the game. It begins by calculating the sum of the cards held by all the players. It then loops through the players and calculates their probability of

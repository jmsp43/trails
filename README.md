
Your dom project must meet these requirements:

Built with HTML, CSS and JavaScript (must be visual and use the DOM not the Console)
Hosted on Github pages
Commits to Github every day
A README.mdfile with explanations of the technologies used, the approach taken, a link to your live site, installation instructions, unsolved problems, etc. Here is a great guide on how to write a readme
If you build a story:
Must have two Classes and one instance of each class

Example: make a Dog Class and create a Dog named Sam
Example: make a Person Class and create a Person named John
Story must be controlled by buttons
Must use Flexbox
Must have a reset button
If you build a you Game must have:
Must be a two player game (either against the computer or against another player)
- Example: Blackjack: A player plays against the dealer. The dealer is the computer - Example: Connect Four: Two players pass the game between themselves to take turns

A win state - a way for the player to win the game

High score can be considered a win state

A lose state - a way for the player to lose the game

Example: Blackjack - a player must be able to lose all of their money with losing hands and cannot play if their bankroll is at 0
Example: Connect Four - the other player has won or there are no possible plays left

A way to keep playing if the game is not over

Multiple rounds to play - a round must begin, end, and there must be a way to check if the game should continue or the overall game is won or lost
- Example: Blackjack: a player takes turns playing a hand versus a computer - the player's hand can either win, lose or tie the dealer. If the player has enough money in their bankroll they can keep playing. A player must be able to win several rounds and increase their bankroll - Example: Connect Four: two (non-computer) players take turns adding chips to the board. The game will check if a player won or if the board is full and there are no more plays possible. A player gets four chips in a row (vertically or horizontally)- one person wins, one loses, there are no further plays in this case

Stretch Goals (Not Mandatory):
Recommended Features
A way to reset the board and play again
CSS to give your game a personal and fun style
Responsive mobile design




//thank you to imani for general support


A summary of your project. (and any info about your game, if applicable)


Welcome to my first full project for Per Scholas. It is based on a cute, portable, physical board game called Trails by KeyMaster Games (see here: https://keymastergames.com/products/trails), based on a larger KeyMaster game called Parks (https://keymastergames.com/products/parks). The aim of the game is to inspire folks to get out and enjoy the natural splendor of our fanastic national and state parks.

I chose to make a digitally reimagined Trails as my project because I love playing the phyical version and wanted to test my newly acquired Javascript Canvas skills by recreating it in code. Playing interesting and niche board games is big part of my free time, and I wanted to bring the magic that I feel when playing them to the screen for others to enjoy. 


How to play your game.

As described on my landing page (that my classmate Drew Scott gave me the excellent idea of having in the first place!), two players are hiking along a park trail, collecting resources, photos (from Unsplash.com), and badges along the way, all the while increasing their victory points. The hiker with the most points when the sun returns to its original position at the trail head (the first game tile) wins!

To move along the game board, players use the left and right arrow keys, and to indicate that they're finished with their turn, they click the Finish Turn button, signaling to the script that the other player is now to go. Each time a user views their badges, earns (purchases) badges, rolls the dice, activates their canteen, and moves their icon, the DOM is updated to reflect the changes that have been made under the hood. As this game is not commonly played, I have placed a rules button linking the user to the landing page for a rules refresher at any time (without losing the progress they're made in the game already).

Each photo is accompanied by a caption that is automatically updated in the DOM, featuring a fun fact or two about the location pictured (thanks to Wikipedia for the free, public information about these gorgeous parks!). All locales in the game are State or National Parks in the US, and building this game further inspired me to plan future trips to these awe-inspiring sites (though I have been lucky enough to visit Letchworth State Park and Great Smoky Mountains National Park so far!)


What Technologies you used (in this case HTML, CSS, and JavaScript).
How you built your game (a few paragraphs about your code)


Building this digitally reimagined Trails was daunting because it is my first project using the Canvas API, which according the MDN "provides a means for drawing graphics" via JavaScript and the canvas element in your HTML file. I started by getting the bare-bones of the site written in my HTML and CSS files, deciding what absolutely needed to visually be there (like the title, the canvas itself, a start button, etc.) Then, I pseudocoded in my script file the most important base functionality of the game (for example, moving the hiker tokens, the sun moving along with them, and hikers being able to collect and earn badges).

Then came the difficult part: actually making my vision come to life. I knew that I wanted my hikers to move seamlessly onscreen (appear in the next place and disappear in the previous) and to load my resource images to the bottom of the canvas screen (to set them each in their own tile to represent what a hiker gets by landing there) but implementing those were harder than expected. With the help of my Assistant Instructor Kasper (and new Assistant Instructor Dylan), I was able to come to the conclusion of needing a function that clears the board and redraws everything, every time a hiker moves, or recieves a new photo (i.e., a new background image is drawn). 




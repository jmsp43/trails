

A README.mdfile with explanations of the technologies used, the approach taken, a link to your live site, installation instructions, unsolved problems, etc.


<!-- &nbsp; creates an empty line &ensp; creates two empty lines -->

//thank you to imani for general support
//thank you to ashley, joshua, amari, and yonas for help with bug fixes and general tips!

<ins><h1>Play Here!<h1></ins>
https://jmsp43.github.io/trails/

<h2>Summary and Info about Trials</h2>




Welcome to my first full project for Per Scholas. It is based on a cute, portable, physical board game called Trails by KeyMaster Games (see here: https://keymastergames.com/products/trails), based on a larger KeyMaster game called Parks (https://keymastergames.com/products/parks). The aim of the game is to inspire folks to get out and enjoy the natural splendor of our fanastic national and state parks.

I chose to make a digitally reimagined Trails as my project because I love playing the phyical version and wanted to test my newly acquired Javascript Canvas skills by recreating it in code. Playing interesting and niche board games is big part of my free time, and I wanted to bring the magic that I feel when playing them to the screen for others to enjoy. 


<h2>How to Play</h2>

As described on my landing page (that my classmate Drew Scott gave me the excellent idea of having in the first place!), two players are hiking along a park trail, collecting resources, photos (from Unsplash.com), and badges along the way, all the while increasing their victory points. The hiker with the most points when the sun returns to its original position at the trail head (the first game tile) wins!

To move along the game board, players use the left and right arrow keys, and to indicate that they're finished with their turn, they click the Finish Turn button, signaling to the script that the other player is now to go. Each time a user views their badges, earns (purchases) badges, rolls the dice, activates their canteen, and moves their icon, the DOM is updated to reflect the changes that have been made under the hood. As this game is not commonly played, I have placed a rules button linking the user to the landing page for a rules refresher at any time (without losing the progress they're made in the game already).

Each photo is accompanied by a caption that is automatically updated in the DOM, featuring a fun fact or two about the location pictured (thanks to Wikipedia for the free, public information about these gorgeous parks!). All locales in the game are State or National Parks in the US, and building this game further inspired me to plan future trips to these awe-inspiring sites (though I have been lucky enough to visit Letchworth State Park and Great Smoky Mountains National Park so far!)


<h2>Technologies & How I Built My Game</h2>

<h4>HTML, HTML Canvas, CSS, JavaScript, JS Context API</h4>

Building this digitally reimagined Trails was daunting because it is my first project using HTML Canvas and the Context API, which according to MDN "provides a means for drawing graphics" via JavaScript and the canvas element in your HTML file. I started by getting the bare-bones of the site written in my HTML and CSS files, deciding what absolutely needed to visually be there (like the title, the canvas itself, a start button, etc.) Then, I pseudocoded in my script file the most important base functionality of the game (for example, moving the hiker tokens, the sun moving along with them, and hikers being able to collect and earn badges).

Then came the difficult part: actually making my vision come to life. I knew that I wanted my hikers to move seamlessly onscreen (appear in the next place and disappear in the previous) and to load my resource images to the bottom of the canvas screen (to set them each in their own tile to represent what a hiker gets by landing there) but implementing those were harder than expected. With the help of my Assistant Instructor Kasper (and new Assistant Instructor Dylan), I was able to come to the conclusion of needing a function that clears the board and redraws everything, every time a hiker moves, or recieves a new photo (i.e., a new background image is drawn). 


<h2>Achievements</h2>

- I was able to accomplish some stretch goals, mainly a way to reset the board and play again, 
responsive design, and aesthtically pleasing CSS and color palette (courtesy of cooler.io color generator).




<h2>Challenges/Unsolved Issues</h2>

- loading the resource and background images. Lots of pathway issues and having to configure and reconfigure how to make them show up when I wanted them to and how i wanted them to.

-Drawing Background images as if the players drew them as a card was much more challenging than expected. Despite days of trying, I was unable to make this feature fully functional.



<h2>Future Features</h2>

- Adding a function that computerizes a player so someone can play by themselves without being both hikers.

- Adding ability of players to pick which badge they want to earn on that turn (giving them the opportunity to save up resources for a specific badge)

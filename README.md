# PokeGuesser

A little game I made as a project on API connectivity for a web class. It interfaces with the API at [pokeapi.co](https://pokeapi.co) to gather content. While in a perfect world you would want to put this on a web server and use caching to speed up data loading, I opted to construct it this way to demonstrate API access with AJAX as per class requirements.

It all works by first making a request to the API to get a count of how many Pokemon are available, and then downloading a list of names by which it can validate inputs with. Once the game is started and a difficulty is chosen, it picks a random Pokemon and requests data on it from the same API. It uses this data to generate a series of "facts" (the number of which you get as well as how they are written are determined by the difficulty), and you are able to guess based on this. If you guess right, you get a point! After that, you can click to play again with a new pokemon and set of facts.

If you don't feel like actually guessing, you can find the name of the Pokemon you want to guess by finding the 'pokemon' variable in the console since it's stored as a global variable, that way you can see the site functioning as intended.

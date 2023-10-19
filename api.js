
const base_url = "https://pokeapi.co/api/v2/"; // Base URL for the API. All calls will be appended to this URL.

function get_pokemon_count() // Gets the total number of pokemon available to select from the API. Used for random number generation.
{
    let count = 0;
    $.ajax({
        url: base_url + "pokemon/",
        type: "GET",
        dataType: "json",
        async: false,
        success: function(data) {
            count = data.count;
        }
    });
    return count;
}

function get_random_pokemon(num_available)
{
    let dex_num = Math.ceil(Math.random() * num_available); // Picks a random number between 1 and whatever the pokemon is. Because it uses an API it should automatically update whenever more are made.
    $.ajax({
        url: base_url + "pokemon/" + String(dex_num),
        type: "GET",
        dataType: "json",
        async: false,
        success: function(data)
        {
            out = data;
            console.log(data);
        }
    });
}

function get_pokemon_ability(url)
{
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        async: false,
        success: function(data)
        {
            out = data;
            console.log(data);
        }
    });
}
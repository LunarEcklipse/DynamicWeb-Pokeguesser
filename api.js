class InternalAPI
{
    static async get_alternative_generation_facts()
    {
        console.log("Fetching alternative generation facts from cache...");
        let out = null;
        try
        {
            console.log("Here");
           // Fetch aternate_generation_facts.json using ajax
            await $.ajax({
                url: "cache/alternate_generation_facts.json",
                dataType: 'json',
                success: function(data)
                {
                    console.log("Fetch successful!"); 
                    out = data;
                },
                error: function(error)
                {
                    console.error("Could not fetch alternative_generation_facts.json: " + error);
                }
            });
        }
        catch (error)
        {
            console.error("Could not fetch alternative_generation_facts.json: " + error);
        }
        console.log("Successfully fetched alternative generation facts from cache!");
        return out;
    }

    static async get_generation_names_from_cache()
    {

    }
}

class PokemonAPI
{
    /* Things we need to get
    - pokemon-species
    -- pokemon resource name: name
    -- pokedex number: id
    -- gender data: gender_rate, has_gender_differences
    -- capture rate: capture_rate
    -- base happiness: base_happiness
    -- is baby/legendary/mythical -- is_baby, is_legendary, is_mythical
    -- 
    */

    static async get_pokemon(pokemon_id_number)
    {
        let species_url = "https://pokeapi.co/api/v2/pokemon-species/" + pokemon_id_number;
        
        let pokemon_species_raw = undefined;

        try
        {
            await $.ajax({
                url: species_url,
                dataType: 'json',
                success: function(data)
                {
                    pokemon = data;
                },
                error: function(error)
                {
                    console.error("Could not fetch pokemon-species: " + error);
                    return null;
                }
            });
        }
        catch (error)
        {
            console.error("Could not fetch pokemon-species " + String(pokemon_id_number) + ": " + error);
            return null;
        }

        let pokemon_name = pokemon_species_raw.name;
        let pokemon_url = "https://pokeapi.co/api/v2/pokemon/" + pokemon_name;
        let pokemon_raw = undefined;
        try
        {
            await $.ajax({
                url: pokemon_url,
                dataType: 'json',
                success: function(data)
                {
                    pokemon = data;
                },
                error: function(error)
                {
                    console.error("Could not fetch pokemon " + String(pokemon_id_number) + ": " + error);
                    return null;
                }
            });
        }
        catch (error)
        {
            console.error("Could not fetch pokemon " + String(pokemon_id_number) + ": " + error);
            return null;
        }
    }

    
}

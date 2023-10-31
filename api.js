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
            return null;
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
    static async get_move_by_url(url)
    {
        let move_raw = undefined;
        
        try
        {
            await $.ajax({
                url: url,
                dataType: 'json',
                success: function(data)
                {
                    move_raw = data;
                },
                error: function(error)
                {
                    console.error("Could not fetch move by url: " + error);
                    return null;
                }
            });
        }
        catch(error)
        {
            console.error("Could not fetch move by url: " + error);
            return null;
        }
        return move_raw;
    }

    

    // POKEMON SPECIES //
    static async get_pokemon_species_from_id_number(id_number) // Accesses the pokemon-species API endpoint.
    {
        let species_url = "https://pokeapi.co/api/v2/pokemon-species/" + id_number;
        let pokemon_species_raw = undefined;

        try
        {
            await $.ajax({
                url: species_url,
                dataType: 'json',
                success: function(data)
                {
                    pokemon_species_raw = data;
                },
                error: function(error)
                {
                    console.error("Could not fetch Pokemon Species by ID Number: " + error);
                    return null;
                }
            })
        }
        catch(error)
        {
            console.error("Could not fetch Pokemon Species by ID Number: " + error);
            return null;
        }
        return pokemon_species_raw;
    }

    static async get_pokemon_data_from_id_number(id_number) // Accesses the pokemon API endpoint.
    {
        let data_url = "https://pokeapi.co/api/v2/pokemon/" + id_number;
        let pokemon_raw = undefined;

        try
        {
            await $.ajax({
                url: data_url,
                dataType: 'json',
                success: function(data)
                {
                    pokemon_raw = data;
                },
                error: function(error)
                {
                    console.error("Could not fetch Pokemon Data by ID Number: " + error);
                    return null;
                }
            })
        }
        catch(error)
        {
            console.error("Could not fetch Pokemon Data by ID Number: " + error);
            return null;
        }
        return pokemon_raw;
    }

    static async get_pokemon(pokemon_id_number)
    {
        let species_url = "https://pokeapi.co/api/v2/pokemon-species/" + pokemon_id_number;
        
        let pokemon_species_raw = await this.get_pokemon_species_from_id_number(pokemon_id_number);

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
                    pokemon_raw = data;
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

        let pokemon_gender = new PokemonGender(pokemon_species_raw.gender_rate, pokemon_species_raw.has_gender_differences);
        let 
    }

    
}

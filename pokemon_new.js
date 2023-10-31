// This is a rewrite of pokemon.js to improve readability and expandability

class GameDifficulty
{
    constructor(difficulty)
    {
        switch(typeof(difficulty))
        {
            case "number":
                this.difficulty = difficulty;
                break;
            case "string":
                switch(difficulty.toLowerCase())
                {
                    case "easy":
                        this.difficulty = 1;
                        break;
                    case "normal":
                        this.difficulty = 2;
                        break;
                    case "hard":
                        this.difficulty = 3;
                        break;
                    default:
                        throw new Error("Invalid Difficulty String: " + difficulty);
                        break;
                }
                break;
        }
    }

    get difficulty()
    {
        return this.difficulty;
    }

    get difficulty_string()
    {
        switch(this.difficulty)
        {
            case 1:
                return "Easy";
            case 2:
                return "Normal";
            case 3:
                return "Hard";
            default:
                return "Invalid";
        }
    }

    is_easy()
    {
        return this.difficulty === 1;
    }

    is_medium()
    {
        return this.difficulty === 2;
    }

    is_hard()
    {
        return this.difficulty === 3;
    }
}

class ShortPokemon // Stores a pokemon's bare minimum data for the purpose of storing lists in other places. Saves a URL so you can get the actual thing later.
{
    constructor(species_name, species_url)
    {
        this.name = species_name
        this.species_url = species_url
    }

    get species_data() // Returns a promise
    {

    }

    get name_lowercase()
    {
        return this.name.toLowerCase();
    }
}

class PokemonAbilityLocalisation // Handles an individual localisation of an ability's name.
{
    constructor(name, language, desc_long, desc_short)
    {
        this.name = name;
        this.language = language;
        this.desc_long = desc_long;
        this.desc_short = desc_short;
    }
}

class PokemonAbility // Manages the ability itself. We store the English stuff in short, and the other languages in localisations.
{
    constructor(resource_name, name_pretty, desc_long, desc_short, is_hidden, localisations, other_pokemon_with)
    {
        this.resource_name = resource_name; // Expect string
        this.name_pretty = name_pretty; // Expect string
        this.desc_long = desc_long; // Expect string
        this.desc_short = desc_short;
        if (typeof(is_hidden) !== "boolean")
        {
            throw new Error("Invalid Type for is_hidden (must be boolean): " + typeof(is_hidden));
        }
        this.is_hidden = is_hidden;
        // Validate localisations is an array of PokemonAbilityLocalisation
        switch(typeof(localisations))
        {
            case "array":
                for (let i = 0; i < localisations.length; i++)
                {
                    if (!(localisations[i] instanceof PokemonAbilityLocalisation))
                    {
                        throw new Error("Invalid Type for localisations[" + i + "] (must be PokemonAbilityLocalisation): " + typeof(localisations[i]));
                    }
                }
                this.localisations = localisations;
                break;
            case "object":
                if (!(localisations instanceof PokemonAbilityLocalisation))
                {
                    throw new Error("Invalid Type for localisations (must be PokemonAbilityLocalisation or array of PokemonAbilityLocalisation): " + typeof(localisations));
                }
                this.localisations = [localisations];
                break;
            default:
                throw new Error("Invalid Type for localisations (must be PokemonAbilityLocalisation or array of PokemonAbilityLocalisation): " + typeof(localisations));
                break;
        }
        // Validate other_pokemon_with is an array of ShortPokemon
        switch(typeof(other_pokemon_with))
        {
            case "array":
                for (let i = 0; i < other_pokemon_with.length; i++)
                {
                    if (!(other_pokemon_with[i] instanceof ShortPokemon))
                    {
                        throw new Error("Invalid Type for other_pokemon_with[" + i + "] (must be ShortPokemon): " + typeof(other_pokemon_with[i]));
                    }
                }
                this.other_pokemon_with = other_pokemon_with;
                break;
            case "object":
                if (!(other_pokemon_with instanceof ShortPokemon))
                {
                    throw new Error("Invalid Type for other_pokemon_with (must be ShortPokemon or array of ShortPokemon): " + typeof(other_pokemon_with));
                }
                this.other_pokemon_with = [other_pokemon_with];
                break;
            default:
                throw new Error("Invalid Type for other_pokemon_with (must be ShortPokemon or array of ShortPokemon): " + typeof(other_pokemon_with));
                break;
        }
    }
}

class PokemonAbilityWrapper // Wraps multiple abilities together
{
    constructor(ability_list)
    {
        this.ability_list = ability_list;
    }

    get ability_fact_easy()
    {
        let ability_list = this.ability_list;
        ability_list = ability_list.sort(() => Math.random() - 0.5);
        if (ability_list.length >= 3)
        {
            // Print 3 random abilities
            return "This Pokémon can have the abilities " + ability_list[0].name_pretty + ", " + ability_list[1].name_pretty + ", or " + ability_list[2].name_pretty + ".";
        }
        else if (this.ability_list.length === 2)
        {
            // Print 2 random abilities
            return "This Pokémon can have the abilities " + ability_list[0].name_pretty + " or " + ability_list[1].name_pretty + ".";
        }
        else if (this.ability_list.length === 1)
        {
            return "This Pokémon can have the ability " + ability_list[0].name_pretty + ".";
        }
        else
        {
            return "This Pokémon has cannot have any abilities.";
        }
    }

    get ability_fact_medium()
    {
        let ability_list = this.ability_list;
        ability_list = ability_list.sort(() => Math.random() - 0.5);
        switch(Math.floor(Math.random() * 2))
        {
            case 0:
                // If has 3 abilities, print two abilities
                if (ability_list.length >= 3)
                {
                    return "This Pokémon can have the abilities " + ability_list[0].name_pretty + " or " + ability_list[1].name_pretty + ", or potentially one other ability.";
                }
                else if (ability_list.length === 2)
                {
                    return "This Pokémon can have the abilities " + ability_list[0].name_pretty + " or " + ability_list[1].name_pretty + ", or potentially one other ability.";
                }
                else if (ability_list.length === 1)
                {
                    return "This Pokémon can have the ability " + ability_list[0].name_pretty + ".";
                }
                else
                {
                    return "This Pokémon has cannot have any abilities.";
                }
                break;
            case 1:
                // Find the hidden ability if it exists
                let hidden_ability = undefined;
                for (let i = 0; i < ability_list.length; i++)
                {
                    if (ability_list[i].is_hidden)
                    {
                        hidden_ability = ability_list[i];
                        break;
                    }
                }
                if (hidden_ability === undefined)
                {
                    return "This Pokémon does not have any hidden ability.";
                }
                else
                {
                    return "This Pokémon can have the hidden ability " + hidden_ability.name_pretty + ".";
                }
                break;
            default:
                throw new Error("Invalid Random Number (Not between 0 and 1).");
        }

    }

    get ability_fact_hard()
    {
        let ability_list = this.ability_list;
        ability_list = ability_list.sort(() => Math.random() - 0.5);
        switch(Math.floor(Math.random() * 2))
        {
            case 0:
                if (ability_list.length > 0)
                {
                    return "This Pokémon can have the ability " + ability_list[0].name_pretty + " or potentially one or two other abilities.";
                }
                else
                {
                    return "This Pokémon cannot have any ability.";
                }
            case 1:
                // Print how many non-hidden abilities the pokemon has
                let non_hidden_abilities = 0;
                for (let i = 0; i < ability_list.length; i++)
                {
                    if (!ability_list[i].is_hidden)
                    {
                        non_hidden_abilities++;
                    }
                }
                if (non_hidden_abilities === 1)
                {
                    return "This Pokémon has one non-hidden ability.";
                }
                else
                {
                    return "This Pokémon has two non-hidden abilities.";
                }
            default:
                throw new Error("Invalid Random Number (Not between 0 and 1).");
                break;
        }
    }

    get_ability_fact(difficulty) // Supply difficulty as integer
    {
        switch(difficulty)
        {
            case 1:
                return this.ability_fact_easy;
                break
            case 2:
                return this.ability_fact_medium;
                break;
            case 3:
                return this.ability_fact_hard;
                break;
            default:
                throw new Error("Invalid Difficulty:" + difficulty);
                break;
            }
        return null;
    }
}

class PokemonEggGroup // Single egg group
{
    constructor(name, other_pokemon_in)
    {
        this.name = name;
        // Validate other_pokemon_in is an array of ShortPokemon
        switch(typeof(other_pokemon_in))
        {
            case "array":
                for (let i = 0; i < other_pokemon_in.length; i++)
                {
                    if (!(other_pokemon_in[i] instanceof ShortPokemon))
                    {
                        throw new Error("Invalid Type for other_pokemon_in[" + i + "] (must be ShortPokemon): " + typeof(other_pokemon_in[i]));
                    }
                }
                this.other_pokemon_in = other_pokemon_in;
                break;
            case "object":
                if (!(other_pokemon_in instanceof ShortPokemon))
                {
                    throw new Error("Invalid Type for other_pokemon_in (must be ShortPokemon or array of ShortPokemon): " + typeof(other_pokemon_in));
                }
                this.other_pokemon_in = [other_pokemon_in];
                break;
            default:
                throw new Error("Invalid Type for other_pokemon_in (must be ShortPokemon or array of ShortPokemon): " + typeof(other_pokemon_in));
                break;
        }
    }
}

class PokemonEggGroupWrapper // Wraps multiple egg groups together
{
    constructor(egg_groups)
    {
        switch(typeof(egg_groups))
        {
            case "object":
                if (!(egg_groups instanceof PokemonEggGroup))
                {
                    throw new Error("Invalid Type for egg_groups (must be PokemonEggGroup or array of PokemonEggGroup): " + typeof(egg_groups));
                }
                this.egg_groups = [egg_groups];
                break;
            case "array":
                // Validate every item in the array is an instance of PokemonEggGroup
                for (let i = 0; i < egg_groups.length; i++)
                {
                    if (!(egg_groups[i] instanceof PokemonEggGroup))
                    {
                        throw new Error("Invalid Type for egg_groups[" + i + "] (must be PokemonEggGroup): " + typeof(egg_groups[i]));
                    }
                }
                this.egg_groups = egg_groups;
                break;
            default:
                throw new Error("Invalid Type for egg_groups (must be PokemonEggGroup or array of PokemonEggGroup): " + typeof(egg_groups));
                break;
        }
    }

    get egg_groups()
    {
        return this.egg_groups;
    }
    
    get egg_groups_pretty()
    {
        let egg_groups_pretty = [];
        for (let i = 0; i < this.egg_groups.length; i++)
        {
            switch(this.name)
            {
            case "monster":
                egg_groups_pretty.push("Monster");
                break;
            case "water1":
                egg_groups_pretty.push("Water 1");
                break;
            case "bug":
                egg_groups_pretty.push("Bug");
                break;
            case "flying":
                egg_groups_pretty.push("Flying");
                break;
            case "ground":
                egg_groups_pretty.push("Ground");
                break;
            case "fairy":
                egg_groups_pretty.push("Fairy");
                break;
            case "plant":
                egg_groups_pretty.push("Grass");
                break;
            case "humanshape":
                egg_groups_pretty.push("Human-Like");
                break;
            case "water3":
                egg_groups_pretty.push("Water 3");
                break;
            case "mineral":
                egg_groups_pretty.push("Mineral");
                break;
            case "indeterminate":
                egg_groups_pretty.push("Indeterminate");
                break;
            case "water2":
                egg_groups_pretty.push("Water 2");
                break;
            case "ditto":
                egg_groups_pretty.push("Ditto");
                break;
            case "dragon":
                egg_groups_pretty.push("Dragon");
                break;
            case "no-eggs":
                egg_groups_pretty.push("No Eggs");
                break;
            }
        }
        return egg_groups_pretty;
    }

    get egg_group_random() // Returns one of the egg groups at random.
    {
        return this.egg_groups[Math.floor(Math.random() * this.egg_groups.length)];
    }

    get egg_group_random_pretty() // Returns a prettified version of a random egg group.
    {
        let egg_groups_pretty = this.egg_groups_pretty;
        return egg_groups_pretty[Math.floor(Math.random() * egg_groups_pretty.length)];
    }

    get egg_groups_not_in()
    {
        // Compare two lists together and get the items that are in the first list but not the second.
        let egg_groups_not_in = ["Monster", "Water 1", "Bug", "Flying", "Ground", "Fairy", "Grass", "Human-Like", "Water 3", "Mineral", "Indeterminate", "Water 2", "Dragon"];
        let egg_groups_in = this.egg_groups_pretty;
        egg_groups_not_in = egg_groups_not_in.filter(function(obj) { return egg_groups_in.indexOf(obj) == -1; });
        return egg_groups_not_in
    }

    get has_egg_group() // Returns whether or not this Pokemon has an egg group at all.
    { 
        return (this.egg_groups.length === 0 || this.egg_groups[0] === "no-eggs");
    }

    get egg_group_is_ditto()
    {
        return this.egg_groups[0] === "ditto";
    }

    get egg_fact_easy()
    {
        switch(this.has_egg_group)
        {
            case true:
                let groups = this.egg_groups_pretty;
                if (groups.length > 1)
                {
                    return "This Pokémon is in the " + groups[0] + " and " + groups[1] + " egg groups.";
                }
                else
                {
                    return "This Pokémon is in the " + groups[0] + " egg group.";
                }
                break;
            case false:
                return "This Pokémon is not in any egg groups.";
                break;
        }
    }

    get egg_fact_medium()
    {
        switch(this.has_egg_group)
        {
            case true:
                let groups = this.egg_groups_pretty;
                if (groups.length > 1)
                {
                    // Randomize the order of the egg groups array
                    groups = groups.sort(() => Math.random() - 0.5);
                    return "This Pokémon is in the " + groups[0] + " egg group, and possibly one other egg group.";
                }
                else
                {
                    return "This Pokémon is in the " + groups[0] + " egg group, and possibly one other egg group.";
                }
                break;
            case false:
                return "This Pokémon is not in any egg groups.";
                break;
        }
    }

    get egg_fact_hard()
    {
        // Get three random egg groups that this Pokemon is not in.
        let groups = this.egg_groups_not_in;
        groups = groups.sort(() => Math.random() - 0.5);
        groups = groups.slice(0, 3);
        return "This Pokémon is not in the " + groups[0] + ", " + groups[1] + ", or " + groups[2] + " egg groups.";
    }

    get_random_egg_fact(difficulty)
    {
        if (this.egg_group_is_ditto) // We don't want to give them this one, it would be way too easy.
        {
            return null;
        }
        switch(difficulty)
        {
            case 1:
                return this.egg_fact_easy;
                break
            case 2:
                return this.egg_fact_medium;
                break;
            case 3:
                return this.egg_fact_hard;
                break;
            default:
                throw new Error("Invalid Difficulty:" + difficulty);
                break;
            }
        return null;
    }
}

class PokemonEvolutionChainPokemon
{
    constructor(resource_name, name_pretty)
    {
        this.resource_name = resource_name;
        this.name = name_pretty;
    }

    get name_lowercase()
    {
        return this.name.toLowerCase();
    }
}

class PokemonEvolutionChain // Tracks all Pokemon in an evolution chain.
{
    constructor(pokemon_list)
    {
        // Make sure every pokemon here is an instance of PokemonEvolutionChainPokemon
        if (typeof(pokemon_list) !== "array")
        {
            throw new Error("Invalid Type for pokemon_list: " + typeof(pokemon_list));
        }
        for (let i = 0; i < pokemon_list.length; i++)
        {
            if (!(pokemon_list[i] instanceof PokemonEvolutionChainPokemon))
            {
                throw new Error("Invalid Type for pokemon_list[" + i + "]: " + typeof(pokemon_list[i]));
            }
        }
        this.pokemon_list = pokemon_list;
    }

    pokemon_is_related(pokemon_name) // Returns whether or not the given pokemon is in this evolution chain.
    {
        for (let i = 0; i < this.pokemon_list.length; i++)
        {
            if (this.pokemon_list[i].name_lowercase === pokemon_name.toLowerCase())
            {
                return true;
            }
        }
        return false;
    }
}

class PokemonGender
{
    constructor(gender_rate, has_gender_differences) // Constructs the data from how it's stored on PokeAPI
    {
        this.has_gender_differences = has_gender_differences;
        switch(gender_rate)
        {
            case -1:
                this.has_gender = false;
                this.gender_rate = null;
                break;
            default:
                this.has_gender = true;
                this.gender_rate = gender_rate / 8;
                break;
        }
    }

    get gender_rate_male() // Returns null if has no gender.
    {
        if (!this.has_gender)
        {
            return null;
        }
        return this.gender_rate;
    }

    get gender_rate_female() // Returns null if has no gender.
    {
        if (!this.has_gender)
        {
            return null;
        }
        return 1 - (this.gender_rate);
    }

    get gender_rate_male_percent() // Returns null if has no gender.
    {
        if (!this.has_gender)
        {
            return null;
        }
        return this.gender_rate * 100;
    }

    get gender_rate_female_percent() // Returns null if has no gender.
    {
        if (!this.has_gender)
        {
            return null;
        }
        return 100 - (this.gender_rate * 100) ;
    }

    get gender_rate() // Returns null if has no gender.
    {
        if (!this.has_gender)
        {
            return null;
        }
        return {"m": this.gender_rate_male, "f": this.gender_rate_female};
    }

    get gender_fact_easy() // Returns a fact string
    {
        let female_chance = this.gender_rate * 100;
        let male_chance = 100 - female_chance;
        if (!this.has_gender)
        {
            return "This Pokémon does not have a gender."
        }
        switch(female_chance)
                {
                    case 100:
                        if (Math.floor(Math.random() * 2) === 0) // We use some randomness here to vary the output.
                        {
                            return "This Pokémon can never be male.";
                        }
                        else
                        {
                            return "This Pokémon is always female.";
                        }
                        break;
                    case 0:
                        if (Math.floor(Math.random() * 2) === 0) // We use some randomness here to vary the output.
                        {
                            return "This Pokémon can never be female.";
                        }
                        else
                        {
                            return "This Pokémon is always male.";
                        }
                        break;
                    default:
                        if (Math.floor(Math.random() * 2) === 0) // We use some randomness here to vary the output.
                        {
                            return "This Pokémon has a " + String(Math.trunc(male_chance)) + "% chance of being male and a " + String(Math.trunc(female_chance)) + "% chance of being female.";
                        }
                        else
                        {
                            return "This Pokémon has a " + String(Math.trunc(female_chance)) + "% chance of being female and a " + String(Math.trunc(male_chance)) + "% chance of being male.";
                        }
                        break;
                }
    }

    get gender_fact_medium() // Returns a fact string
    {
        let female_chance = this.gender_rate * 100;
        let male_chance = 100 - female_chance;
        if (!this.has_gender)
        {
            return "This Pokémon does not have a gender."
        }
        switch(Math.floor(Math.random() * 4))
        {
            case 0:
                switch(this.has_gender_differences)
                {
                    case true:
                        return "This Pokémon has visible gender differences.";
                        break;
                    case false:
                        return "This Pokémon has no visible gender differences.";
                }
                break;
            default:
                switch(female_chance)
                {
                    case 100:
                        if (Math.floor(Math.random() * 2) === 0) // We use some randomness here to vary the output.
                        {
                            return "This Pokémon can never be male.";
                        }
                        else
                        {
                            return "This Pokémon is always female.";
                        }
                        break;
                    case 0:
                        if (Math.floor(Math.random() * 2) === 0) // We use some randomness here to vary the output.
                        {
                            return "This Pokémon can never be female.";
                        }
                        else
                        {
                            return "This Pokémon is always male.";
                        }
                        break;
                    default:
                        if (Math.floor(Math.random() * 2) === 0) // We use some randomness here to vary the output.
                        {
                            return "This Pokémon has a " + String(Math.trunc(male_chance)) + "% chance of being male and a " + String(Math.trunc(female_chance)) + "% chance of being female.";
                        }
                        else
                        {
                            return "This Pokémon has a " + String(Math.trunc(female_chance)) + "% chance of being female and a " + String(Math.trunc(male_chance)) + "% chance of being male.";
                        }
                        break;
                }
                break;
        }
        
    }

    get gender_fact_hard() // Returns a fact string
    {
        let female_chance = this.gender_rate * 100;
        let male_chance = 100 - female_chance;
        if (!this.has_gender)
        {
            switch(Math.floor(Math.random() * 2))
            {
                case 0:
                    return "This Pokémon does not have a gender."
                    break;
                case 1:
                    return "This Pokémon does not have visible gender differences.";
                    break;
                default:
                    throw new Error("Invalid Random Number (Not between 0 and 1).");
            }
        }
        switch(Math.floor(Math.random() * 2))
        {
            case 0:
                switch(this.has_gender_differences)
                {
                    case true:
                        return "This Pokémon has visible gender differences.";
                        break;
                    case false:
                        return "This Pokémon has no visible gender differences.";
                }
                break;
            case 1:
                switch(female_chance)
                {
                    case 100:
                        if (Math.floor(Math.random() * 2) === 0) // We use some randomness here to vary the output.
                        {
                            return "This Pokémon can never be male.";
                        }
                        else
                        {
                            return "This Pokémon is always female.";
                        }
                        break;
                    case 0:
                        if (Math.floor(Math.random() * 2) === 0) // We use some randomness here to vary the output.
                        {
                            return "This Pokémon can never be female.";
                        }
                        else
                        {
                            return "This Pokémon is always male.";
                        }
                        break;
                    default:
                        if (this.gender_rate_female === this.gender_rate_male)
                        {
                            return "This Pokémon has an equal chance to be either male or female.";
                        }
                        else if (this.gender_rate_female > this.gender_rate_male)
                        {
                            return "This Pokémon is more likely to be female than male.";
                        }
                        else
                        {
                            return "This Pokémon is more likely to be male than female."
                        }
                        break;
                }
                break;
            default:
                throw new Error("Invalid Random Number (Not between 0 and 1).");
        }
    }

    get_gender_fact(difficulty)
    {
        switch(difficulty)
        {
            case 1:
                return this.gender_fact_easy;
                break
            case 2:
                return this.gender_fact_medium;
                break;
            case 3:
                return this.gender_fact_hard;
                break;
            default:
                throw new Error("Invalid Difficulty:" + difficulty);
                break;
            }
        return null;
    }
}

class PokemonGeneration
{
    constructor(generation_name, main_region, main_region_prettified)
    {
        this.name = generation_name;
        this.main_region = main_region // Expects a PokemonRegion object.
    }

    get generation_name_pretty()
    {
        switch(this.name)
        {
            case "generation-i":
                return "Generation I";
                break;
            case "generation-ii":
                return "Generation II";
                break;
            case "generation-iii":
                return "Generation III";
                break;
            case "generation-iv":
                return "Generation IV";
                break;
            case "generation-v":
                return "Generation V";
                break;
            case "generation-vi":
                return "Generation VI";
                break;
            case "generation-vii":
                return "Generation VII";
                break;
            case "generation-viii":
                return "Generation VIII";
                break;
            case "generation-ix":
                return "Generation IX";
                break;
            default:
                throw new Error("Invalid Generation Name: " + this.name);
                break;
        }
    }

    get alternate_generation_fact_easy() // 25% chance of alternate fact
    {

    }

    get alternative_generation_fact_medium() // 50% chance of alternate fact.
    {

    }

    get alternative_generation_fact_hard() // 75% chance of alternate fact.
    {

    }

    get generation_fact_easy() // 25% chance of alternate fact
    {
        return "This Pokémon is from " + this.main_region_prettified + ".";
    }

    get generation_fact_medium() // 50% chance of alternate fact.
    {
        return "This Pokémon is from " + this.main_region_prettified + ".";
    }

    get generation_fact_hard() // 75% chance of alternate fact.
    {
        return "This Pokémon is from " + this.main_region_prettified + ".";
    }
}

class PokemonMove // Manages the move itself
{
    constructor(id_number, resource_name, name_pretty)
    {
        this.id_number = id_number;
        this.resource_name = resource_name;
        this.name = name_pretty;
    }
}

class PokemonMoveWrapper // Wraps multiple moves together
{
    constructor(move_list)
    {
        // Validate every item in movelist is a PokemonMove
        for (let i = 0; i < move_list.length; i++)
        {
            if (!(move_list[i] instanceof PokemonMove))
            {
                throw new Error("Invalid Type for move_list[" + i + "]: " + typeof(move_list[i]));
            }
        }
        this.move_list = move_list;
    }

    get move_fact_easy() // Give up to 5 moves.
    {
        if (this.move_list.length <= 0)
        {
            throw new Error("Move list is empty.");
        }
        // Randomise the move list
        let move_list = this.move_list.sort(() => Math.random() - 0.5);
        switch(this.move_list.length)
        {
            case 1:
                return "This Pokémon can learn " + move_list[0].name + ".";
                break;
            case 2:
                return "This Pokémon can learn " + move_list[0].name + " and " + move_list[1].name + ".";
                break;
            case 3:
                return "This Pokémon can learn " + move_list[0].name + ", " + move_list[1].name + ", and " + move_list[2].name + ".";
                break;
            case 4:
                return "This Pokémon can learn " + move_list[0].name + ", " + move_list[1].name + ", " + move_list[2].name + ", and " + move_list[3].name + ".";
                break;
            default:
                return "This Pokémon can learn " + move_list[0].name + ", " + move_list[1].name + ", " + move_list[2].name + ", " + move_list[3].name + ", and " + move_list[4].name + ".";
                break;
        }
    }

    get move_fact_medium() // Give up to 3 moves.
    {
        if (this.move_list.length <= 0)
        {
            throw new Error("Move list is empty.");
        }
        // Randomise the move list
        let move_list = this.move_list.sort(() => Math.random() - 0.5);
        switch(this.move_list.length)
        {
            case 1:
                return "This Pokémon can learn " + move_list[0].name + ".";
                break;
            case 2:
                return "This Pokémon can learn " + move_list[0].name + " and " + move_list[1].name + ".";
                break;
            default:
                return "This Pokémon can learn " + move_list[0].name + ", " + move_list[1].name + ", and " + move_list[2].name + ".";
                break;
        }
    }

    get move_fact_hard() // Give only one move.
    {
        if (this.move_list.length <= 0)
        {
            throw new Error("Move list is empty.");
        }
        // Randomise the move list
        let move_list = this.move_list.sort(() => Math.random() - 0.5);
        return "This Pokémon can learn " + move_list[0].name + ".";
    }

    get_move_fact(difficulty)
    {
        switch(difficulty)
        {
            case 1:
                return this.move_fact_easy;
                break
            case 2:
                return this.move_fact_medium;
                break;
            case 3:
                return this.move_fact_hard;
                break;
            default:
                throw new Error("Invalid Difficulty:" + difficulty);
                break;
        }
    }
}

class PokemonNameLocalisation // Handles an individual localisation of a pokemon's name.
{
    constructor(name, language)
    {
        this.name = name;
        this.language = language;
    }
}

class PokemonNameLocalisationWrapper // Wraps all Pokemon name localisations.
{
    constructor(localisations)
    {
        switch(typeof(localisations))
        {
            case "object":
                if (localisations instanceof PokemonNameLocalisation)
                {
                    this.localisations = [localisations];
                }
                else
                {
                    throw new Error("Invalid Type for localisations: " + typeof(localisations));
                }
                break;
            case "array":
                for (let i = 0; i < localisations.length; i++)
                {
                    if (!(localisations[i] instanceof PokemonNameLocalisation))
                    {
                        throw new Error("Invalid Type for localisations[" + i + "]: " + typeof(localisations[i]));
                    }
                }
                this.localisations = localisations;
                break;
        }
    }

    get localisation_fact_easy()
    {
        // Remove the English localisation
        let localisations = this.localisations;
        for (let i = 0; i < localisations.length; i++)
        {
            if (localisations[i].language === "en")
            {
                localisations.splice(i, 1);
                break;
            }
        }
        // Randomise the localisations
        localisations = localisations.sort(() => Math.random() - 0.5);
        return "This Pokémon is called " + localisations[0].name + " in another language.";
    }

    get localisation_fact_medium() // TODO: differentiate these a bit with some more localisation fun
    {
        // Remove the English localisation
        let localisations = this.localisations;
        for (let i = 0; i < localisations.length; i++)
        {
            if (localisations[i].language === "en")
            {
                localisations.splice(i, 1);
                break;
            }
        }
        // Randomise the localisations
        localisations = localisations.sort(() => Math.random() - 0.5);
        return "This Pokémon is called " + localisations[0].name + " in another language.";
    }

    get localisation_fact_hard() // TODO: Differentiate these in some way
    {
        // Remove the English localisation
        let localisations = this.localisations;
        for (let i = 0; i < localisations.length; i++)
        {
            if (localisations[i].language === "en")
            {
                localisations.splice(i, 1);
                break;
            }
        }
        // Randomise the localisations
        localisations = localisations.sort(() => Math.random() - 0.5);
        return "This Pokémon is called " + localisations[0].name + " in another language.";
    }

    get_localisation_fact(difficulty)
    {
        switch(difficulty)
        {
            case 1:
                return this.localisation_fact_easy;
                break
            case 2:
                return this.localisation_fact_medium;
                break;
            case 3:
                return this.localisation_fact_hard;
                break;
            default:
                throw new Error("Invalid Difficulty:" + difficulty);
                break;
        }
    }
}

class PokemonHabitat // We made this an object because it makes it easier to expand later.
{
    constructor(habitat_name, habitat_pokemon)
    {
        this.name = habitat_name;
        // Verify habitat_pokemon is either an instance of ShortPokemon or an array of ShortPokemon
        switch(typeof(habitat_pokemon))
        {
            case "object":
                if (!(habitat_pokemon instanceof ShortPokemon))
                {
                    throw new Error("Invalid Type for habitat_pokemon (must be ShortPokemon or array of ShortPokmeon): " + typeof(habitat_pokemon));
                }
                this.pokemon = [habitat_pokemon];
                break;
            case "array":
                for (let i = 0; i < habitat_pokemon.length; i++)
                {
                    if (!(habitat_pokemon[i] instanceof ShortPokemon))
                    {
                        throw new Error("Invalid Type for habitat_pokemon[" + i + "] (must be ShortPokemon): " + typeof(habitat_pokemon[i]));
                    }
                }
                this.pokemon = habitat_pokemon;
                break;
            default:
                throw new Error("Invalid Type for habitat_pokemon (must be ShortPokemon or array of ShortPokemon): " + typeof(habitat_pokemon));
                break;
        }
    }

    get habitat_fact_easy()
    {

    }

    get habitat_fact_medium()
    {

    }

    get habitat_fact_hard()
    {

    }
}

class PokemonHabitatWrapper
{
    constructor(habitats)
    {
        switch(typeof(habitats))
        {
            case "object":
                if (!(habitats instanceof PokemonHabitat))
                {
                    throw new Error("Invalid Type for habitats: " + typeof(habitats));
                }
                this.habitats = [habitats];
                break;
            case "array":
                this.habitats = habitats;
                break;
            default:
                throw new Error("Invalid Type for habitats: " + typeof(habitats));
                break;
        }
    }

    get habitat_fact_easy()
    {
        
    }

    get habitat_fact_medium()
    {

    }

    get habitat_fact_hard()
    {

    }
}

class PokemonShape
{

}

class PokemonSize
{

}

class PokemonSpecialType // Handles Baby, Legendary, and Mythical information.
{
    constructor(is_baby, is_legendary, is_mythical)
    {
        this.is_baby = is_baby;
        this.is_legendary = is_legendary;
        this.is_mythical = is_mythical;
    }

    get special_type_fact_easy()
    {
        if (this.is_baby)
        {
            return "This Pokémon is a baby Pokémon.";
        }
        else if (this.is_legendary)
        {
            return "This Pokémon is a legendary Pokémon.";
        }
        else if (this.is_mythical)
        {
            return "This Pokémon is a mythical Pokémon.";
        }
        else
        {
            return "This Pokémon is not a baby, legendary, or mythical Pokémon.";
        }
    }

    get special_type_fact_medium()
    {
        if (this.is_baby)
        {
            return "This Pokémon is not a legendary or mythical Pokémon.";
        }
        else if (this.is_legendary)
        {
            return "This Pokémon is not a baby or mythical Pokémon.";
        }
        else if (this.is_mythical)
        {
            return "This Pokémon is not a baby or legendary Pokémon.";
        }
        else
        {
            switch(Math.floor(Math.random() * 3))
            {
                case 0:
                    return "This Pokémon is not a baby or legendary Pokémon.";
                    break;
                case 1:
                    return "This Pokémon is not a baby or mythical Pokémon.";
                    break;
                default:
                    return "This Pokémon is not a legendary or mythical Pokémon.";
                    break;
            }
        }
    }

    get special_type_fact_hard()
    {
        if (this.is_baby)
        {
            switch(Math.floor(Math.random() * 2))
            {
                case 0:
                    return "This Pokémon is not a legendary Pokémon.";
                    break;
                default:
                    return "This Pokémon is not a mythical Pokémon.";
                    break;
            }
        }
        else if (this.is_legendary)
        {
            switch(Math.floor(Math.random() * 2))
            {
                case 0:
                    return "This Pokémon is not a baby Pokémon.";
                    break;
                default:
                    return "This Pokémon is not a mythical Pokémon.";
                    break;
            }
        }
        else if (this.is_mythical)
        {
            switch(Math.floor(Math.random() * 2))
            {
                case 0:
                    return "This Pokémon is not a baby Pokémon.";
                    break;
                default:
                    return "This Pokémon is not a legendary Pokémon.";
                    break;
            }
        }
        else
        {
            switch(Math.floor(Math.random() * 3))
            {
                case 0:
                    return "This Pokémon is not a baby Pokémon.";
                    break;
                case 1:
                    return "This Pokémon is not a legendary Pokémon.";
                    break;
                default:
                    return "This Pokémon is not a mythical Pokémon.";
                    break;
            }
        }
    }

    get_special_type_fact(difficulty)
    {
        switch(difficulty)
        {
            case 1:
                return this.special_type_fact_easy;
                break
            case 2:
                return this.special_type_fact_medium;
                break;
            case 3:
                return this.special_type_fact_hard;
                break;
            default:
                throw new Error("Invalid Difficulty:" + difficulty);
                break;
        }
    }
}

class PokemonStats
{

}

class PokemonType // Single type
{

}

class PokemonTypeWrapper // Wraps multiple types
{

}

class Pokemon
{
    
}
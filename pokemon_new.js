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

class PokemonAbility // Manages the ability itself. We store the English stuff in short, and the other languages in localisations.
{
    constructor(resource_name, name_pretty, desc_long, desc_short, is_hidden, localisations)
    {
        this.resource_name = resource_name; // Expect string
        this.name_pretty = name_pretty; // Expect string
        this.desc_long = desc_long; // Expect string
        this.desc_short = desc_short;
        this.is_hidden = is_hidden;
        this.localisations = localisations;
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
class PokemonEggGroupWrapper // Wraps multiple egg groups together
{
    constructor(egg_groups)
    {
        switch(typeof(egg_groups))
        {
            case "string":
                this.egg_groups = [egg_groups];
                break;
            case "array":
                this.egg_groups = egg_groups;
                break;
            default:
                throw new Error("Invalid Type for egg_groups: " + typeof(egg_groups));
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
    constructor(name, type, power, accuracy, damage_type, pp, effect, effect_chance)
    {
        
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
}

class PokemonNameLocalisation // Handles an individual localisation of a pokemon's name.
{

}

class PokemonNameLocalisationWrapper // Wraps all Pokemon name localisations.
{

}

class PokemonRegion
{

}

class PokemonShape
{

}

class PokemonSize
{

}

class PokemonSpecialType // Handles Baby, Legendary, and Mythical information.
{

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
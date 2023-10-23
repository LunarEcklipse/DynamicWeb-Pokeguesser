/* DIFFICULTY INTEGERS 
1 - Easy
2 - Normal
3 - Hard
*/

function convert_egg_group_name(name) // Makes egg group names pretty.
{
    switch(name)
    {
        case "monster":
            return "Monster";
            break;
        case "water1":
            return "Water 1";
            break;
        case "bug":
            return "Bug";
            break;
        case "flying":
            return "Flying";
            break;
        case "ground":
            return "Field";
            break;
        case "fairy":
            return "Fairy";
            break;
        case "plant":
            return "Grass";
            break;
        case "humanshape":
            return "Human-Like";
            break;
        case "water3":
            return "Water 3";
            break;
        case "mineral":
            return "Mineral";
            break;
        case "indeterminate":
            return "Amorphous";
            break;
        case "water2":
            return "Water 2";
            break;
        case "ditto":
            return "Ditto";
            break;
        case "dragon":
            return "Dragon";
            break;
        case "no-eggs":
            return "no-eggs"; // We return this as a special case because it's used to detect when no egg group exists.
            break;
    }
}

class PokemonGender
{
    constructor(gender_rate, has_gender_differences)
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

    get gender_rate_female()
    {
        return this.gender_rate * 100;
    }

    get gender_rate_male()
    {
        return 100 - (this.gender_rate * 100);
    }

    get gender_string()
    {
        switch(this.has_gender)
        {
            case true:
                let female_chance = this.gender_rate * 100;
                let male_chance = 100 - female_chance;
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
                        
                }
                break;
            default:
                return "This Pokémon never has any gender.";
                break;
        }
    }

    get_gender_differences_string()
    {
        switch(this.has_gender_differences)
        {
            case true:
                return "This Pokémon has visible gender differences.";
                break;
            default:
                return "This Pokémon does not have visible gender differences.";
                break;
        }
    }
}

class PokemonEggGroup
{
    constructor(name)
    {
        this.name = name;
    }

    get name()
    {
        return this.name;
    }

    get name_prettified() // Returns a nice-looking version of the egg group name.
    {
        switch(this.name)
        {
        case "monster":
            return "Monster";
            break;
        case "water1":
            return "Water 1";
            break;
        case "bug":
            return "Bug";
            break;
        case "flying":
            return "Flying";
            break;
        case "ground":
            return "Field";
            break;
        case "fairy":
            return "Fairy";
            break;
        case "plant":
            return "Grass";
            break;
        case "humanshape":
            return "Human-Like";
            break;
        case "water3":
            return "Water 3";
            break;
        case "mineral":
            return "Mineral";
            break;
        case "indeterminate":
            return "Amorphous";
            break;
        case "water2":
            return "Water 2";
            break;
        case "ditto":
            return "Ditto";
            break;
        case "dragon":
            return "Dragon";
            break;
        case "no-eggs":
            return "no-eggs"; // We return this as a special case because it's used to detect when no egg group exists.
            break;
        }
    }
}

class PokemonBaseStats
{
    constructor(base_hp, base_atk, base_def, base_spatk, base_spdef, base_speed)
    {
        this.base_hp = base_hp;
        this.base_atk = base_atk;
        this.base_def = base_def;
        this.base_spatk = base_spatk;
        this.base_spdef = base_spdef;
        this.base_speed = base_speed;
    }

    get stats()
    {
        return {"HP": this.base_hp, "Attack": this.base_atk, "Defense": this.base_def, "Special Attack": this.base_spatk, "Special Defense": this.base_spdef, "Speed": this.base_speed};
    }

    get stats_in_order()
    {
        return [{"n": "HP", "v": this.base_hp}, {"n": "Attack", "v": this.base_atk}, {"n": "Defense", "v": this.base_def}, {"n": "Special Attack", "v": this.base_spatk}, {"n": "Special Defense", "v": this.base_spdef}, {"n": "Speed", "v": this.base_speed}];
    }

    get highest_base_stat()
    {
        let highest_stat = Math.max(this.base_hp, this.base_atk, this.base_def, this.base_spatk, this.base_spdef, this.base_speed);
        switch(highest_stat)
        {
            case this.base_hp:
                return "HP";
                break;
            case this.base_atk:
                return "Attack";
                break;
            case this.base_def:
                return "Defense";
                break;
            case this.base_spatk:
                return "Special Attack";
                break;
            case this.base_spdef:
                return "Special Defense";
                break;
            case this.base_speed:
                return "Speed";
                break;
        }
    }

    get lowest_base_stat()
    {
        let lowest_stat = Math.min(this.base_hp, this.base_atk, this.base_def, this.base_spatk, this.base_spdef, this.base_speed);
        switch(lowest_stat)
        {
            case this.base_hp:
                return "HP";
                break;
            case this.base_atk:
                return "Attack";
                break;
            case this.base_def:
                return "Defense";
                break;
            case this.base_spatk:
                return "Special Attack";
                break;
            case this.base_spdef:
                return "Special Defense";
                break;
            case this.base_speed:
                return "Speed";
                break;
        }
    }

    
}

class PokemonTypes
{
    constructor(types)
    {
        switch(types.length)
        {
            case 1:
                this.type1 = types[0];
                this.type2 = null;
                break;
            case 2:
                this.type1 = types[0];
                this.type2 = types[1];
                break;
            default:
                this.type1 = null;
                this.type2 = null;
                break;
        }
    }

    get type_string_both() // Gets the string for the type. If there is only one type, it will return that type. If there are two types, it will return both types separated by "and".
    {
        switch(this.type2)
        {
            case null:
                return this.type1.charAt(0).toUpperCase() + this.type1.slice(1);
                break;
            default:
                return this.type1.charAt(0).toUpperCase() + this.type1.slice(1) + " and " + this.type2.charAt(0).toUpperCase() + this.type2.slice(1);
                break;
        }
    }

    get type_string_only_one() // For harder difficulties.
    {
        switch(this.type2)
        {
            case null:
                return this.type1.charAt(0).toUpperCase() + this.type1.slice(1);
                break;
            default:
                switch(Math.floor(Math.random() * 2))
                {
                    case 0:
                        return this.type1.charAt(0).toUpperCase() + this.type1.slice(1);
                        break;
                    case 1:
                        return this.type2.charAt(0).toUpperCase() + this.type2.slice(1);
                        break;
                }
                break;
        }
    }
}

class PokemonSize
{
    constructor(height_cm, weight_kg)
    {
        this.height = height_cm;
        this.weight = weight_kg;
    }

    static convert_cm_to_inches(cm)
    {
        return cm / 2.54;
    }

    static convert_kg_to_lbs(kg)
    {
        return kg * 2.20462;
    }

    get_height_string(difficulty_integer)
    {
        switch(difficulty_integer)
        {
            case 1: // += 0%
                return "This Pokémon is " + String(this.height.toFixed(2)) + " cm tall.";
                break;
            case 2: // +- 25%
                let rand_min = this.height * (Math.floor((100 - (Math.random() * 25))) / 100); // Calculates the minimum.
                let rand_max = this.height * (Math.floor((100 + (Math.random() * 25))) / 100); // Calculates the maximum.
                return "This Pokémon is between " + String(rand_min.toFixed(2)) + " and " + String(rand_max.toFixed(2)) + " cm tall.";
                break;
            case 3: // +- 50% plus they only get greater than or less than.
                switch(Math.floor(Math.random() * 2))
                {
                    case 0:
                        let rand_min = this.height * (Math.floor((100 - (Math.random() * 50))) / 100); // Calculates the minimum.
                        return "This Pokémon is taller than " + String(rand_min.toFixed(2)) + " cm.";
                        break;
                    case 1:
                        let rand_max = this.height * (Math.floor((100 + (Math.random() * 50))) / 100); // Calculates the maximum.
                        return "This Pokémon is shorter than " + String(rand_max.toFixed(2)) + " cm.";
                        break;
                }
                break;
        }
    }


    get_weight_string(difficulty_integer)
    {
        switch(difficulty_integer)
        {
            case 1:
                return "This Pokémon weighs " + String(this.weight.toFixed(2)) + " kg.";
                break;
            case 2:
                let rand_min = this.weight * (Math.floor((100 - (Math.random() * 25))) / 100); // Calculates the minimum.
                let rand_max = this.weight * (Math.floor((100 + (Math.random() * 25))) / 100); // Calculates the maximum.
                return "This Pokémon weighs between " + String(rand_min.toFixed(2)) + " and " + String(rand_max.toFixed(2)) + " kg.";
                break;
            case 3:
                switch(Math.floor(Math.random() * 2))
                {
                    case 0:
                        let rand_min = this.weight * (Math.floor((100 - (Math.random() * 50))) / 100); // Calculates the minimum.
                        return "This Pokémon weighs more than " + String(rand_min.toFixed(2)) + " kg.";
                        break;
                    case 1:
                        let rand_max = this.weight * (Math.floor((100 + (Math.random() * 50))) / 100); // Calculates the maximum.
                        return "This Pokémon weighs less than " + String(rand_max.toFixed(2)) + " kg.";
                        break;
                }
                break;   
        }
    }
}

class Pokemon
{
    constructor(name, dex_number, color, egg_groups, gender_data, genera, original_generation, growth_rate, is_baby, is_legendary, is_mythical, shape, num_varieties, pokemon_size, official_artwork, base_stats, moves, pokemon_types, pokemon_abilities)
    {
        // convert - in name to spaces
        name = name.replace(/-/g, " "); // Handles edge cases on the API where dashes replace spaces.
        this.name = name;
        this.dex_num = dex_number, 
        this.color = color;
        this.egg_groups = egg_groups;
        this.gender_data = gender_data;
        this.genera = genera;
        this.original_generation = original_generation;
        this.growth_rate = growth_rate;
        this.is_baby = is_baby;
        this.is_legendary = is_legendary;
        this.is_mythical = is_mythical;
        this.shape = shape;
        this.num_varieties = num_varieties;
        this.pokemon_size = pokemon_size;
        this.official_artwork = official_artwork;
        this.base_stats = base_stats;
        this.pokemon_types = pokemon_types;
        this.moves = moves;
        this.pokemon_abilities = pokemon_abilities;
    }

    get_random_facts(difficulty_integer) // Generates the random fact pool for the pokemon.
    {
        let fact_pool = []
        for (let i = 0; i < 15; ++i)
        {
            switch(i)
            {
                case 0: // Type
                    if (difficulty_integer < 2)
                    {
                        let type_string = this.pokemon_types.type_string_both;
                        fact_pool.push("This Pokémon is a " + type_string + " type.");
                        break;
                    }
                    else
                    {
                        let type_string = this.pokemon_types.type_string_only_one;
                        fact_pool.push("This Pokémon has the " + type_string + " type, and possibly one other type.");
                        break;
                    }
                    break;
                case 1: // Pokemon Generation
                    fact_pool.push("This Pokémon was introduced in " + String(this.original_generation) + ".");
                    break;
                case 2: // Egg Groups
                    if (this.egg_groups.length === 0)
                    {
                        fact_pool.push("This Pokémon is not in any egg groups.");
                        break;
                    }
                    else
                    {
                        if (this.egg_groups[0] === "no-eggs")
                        {
                            fact_pool.push("This Pokémon is not in any egg groups.");
                            break;
                        }
                        if (this.egg_groups[0] === "ditto")
                        {
                            break; // We don't let them see the ditto egg group because that would make it waaaaay too easy.
                        }
                        if (difficulty_integer > 1)
                        {
                            fact_pool.push("This Pokémon is in the " + convert_egg_group_name(this.egg_groups[Math.floor(Math.random() * this.egg_groups.length)]) + " egg group and possibly one other egg group.");
                            break;
                        }
                        else
                        {
                            switch(this.egg_groups.length)
                            {
                                case 1:
                                    fact_pool.push("This Pokémon is in the " + convert_egg_group_name(this.egg_groups[0]) + " egg group.");
                                    break;
                                case 2:
                                    fact_pool.push("This Pokémon is in the " + convert_egg_group_name(this.egg_groups[0]) + " and " + convert_egg_group_name(this.egg_groups[1]) + " egg groups.");
                                    break;
                            }
                        }
                    }
                    break;
                case 3: // Baby/Legendary/Mythical
                    switch(difficulty_integer)
                    {
                        case 1: // Easy
                            if (this.is_baby)
                            {
                                fact_pool.push("This Pokémon is a baby Pokémon.");
                                break;
                            }
                            else if (this.is_legendary)
                            {
                                fact_pool.push("This Pokémon is a legendary Pokémon.");
                                break;
                            }
                            else if (this.is_mythical)
                            {
                                fact_pool.push("This Pokémon is a mythical Pokémon.");
                                break;
                            }
                            else
                            {
                                fact_pool.push("This Pokémon is not a baby, legendary, or mythical Pokémon.");
                                break;
                            }
                            break;
                        case 2: // Medium
                            if (Math.floor(Math.random() * 3) === 0) // If this is true, we tell them what it isn't.
                            {
                                if (this.is_baby)
                                {
                                    fact_pool.push("This Pokémon is not a legendary or mythical Pokémon.");
                                    break;
                                }
                                else if (this.is_legendary)
                                {
                                    fact_pool.push("This Pokémon is not a baby or mythical Pokémon.");
                                    break;
                                }
                                else if (this.is_mythical)
                                {
                                    fact_pool.push("This Pokémon is not a baby or legendary Pokémon.");
                                    break;
                                }
                                else
                                {
                                    // The possible permutations are [1,2], [1,3], and [2,3]. For the sake of consistency, we always need to make sure these are in order.
                                    switch(Math.floor(Math.random() * 3))
                                    {
                                        case 0:
                                            fact_pool.push("This Pokémon is not a legendary or mythical Pokémon.");
                                            break;
                                        case 1:
                                            fact_pool.push("This Pokémon is not a baby or mythical Pokémon.");
                                            break;
                                        case 2:
                                            fact_pool.push("This Pokémon is not a baby or legendary Pokémon.");
                                            break;
                                    }
                                }
                            }
                            else
                            {
                                if (this.is_baby)
                                {
                                    fact_pool.push("This Pokémon is a baby Pokémon.");
                                    break;
                                }
                                else if (this.is_legendary)
                                {
                                    fact_pool.push("This Pokémon is a legendary Pokémon.");
                                    break;
                                }
                                else if (this.is_mythical)
                                {
                                    fact_pool.push("This Pokémon is a mythical Pokémon.");
                                    break;
                                }
                                else
                                {
                                    // The possible permutations are [1,2], [1,3], and [2,3]. For the sake of consistency, we always need to make sure these are in order.
                                    switch(Math.floor(Math.random() * 3))
                                    {
                                        case 0:
                                            fact_pool.push("This Pokémon is not a legendary or mythical Pokémon.");
                                            break;
                                        case 1:
                                            fact_pool.push("This Pokémon is not a baby or mythical Pokémon.");
                                            break;
                                        case 2:
                                            fact_pool.push("This Pokémon is not a baby or legendary Pokémon.");
                                            break;
                                    }
                                }
                            }
                            break;
                        case 3: // Hard
                            if (Math.floor(Math.random() * 3) === 0) // We tell them what it is.
                            {
                                if (this.is_baby)
                                {
                                    fact_pool.push("This Pokémon is a baby Pokémon.");
                                    break;
                                }
                                else if (this.is_legendary)
                                {
                                    fact_pool.push("This Pokémon is a legendary Pokémon.");
                                    break;
                                }
                                else if (this.is_mythical)
                                {
                                    fact_pool.push("This Pokémon is a mythical Pokémon.");
                                    break;
                                }
                                else
                                {
                                    switch(Math.floor(Math.random() * 3))
                                    {
                                        case 0:
                                            fact_pool.push("This Pokémon is not a baby Pokémon.");
                                            break;
                                        case 1:
                                            fact_pool.push("This Pokémon is not a legendary Pokémon.");
                                            break;
                                        case 2:
                                            fact_pool.push("This Pokémon is not a mythical Pokémon.");
                                            break;
                                    }
                                }
                            }
                            else // We tell them what it isn't.
                            {
                                if (this.is_baby)
                                {
                                    switch(Math.floor(Math.random()) * 2)
                                    {
                                        case 0:
                                            fact_pool.push("This Pokémon is not a legendary Pokémon.");
                                            break;
                                        case 1:
                                            fact_pool.push("This Pokémon is not a mythical Pokémon.");
                                            break;
                                    }
                                }
                                else if (this.is_legendary)
                                {
                                    switch(Math.floor(Math.random()) * 2)
                                    {
                                        case 0:
                                            fact_pool.push("This Pokémon is not a baby Pokémon.");
                                            break;
                                        case 1:
                                            fact_pool.push("This Pokémon is not a mythical Pokémon.");
                                            break;
                                    }
                                }
                                else if (this.is_mythical)
                                {
                                    switch(Math.floor(Math.random()) * 2)
                                    {
                                        case 0:
                                            fact_pool.push("This Pokémon is not a baby Pokémon.");
                                            break;
                                        case 1:
                                            fact_pool.push("This Pokémon is not a legendary Pokémon.");
                                            break;
                                    }
                                }
                                else
                                {
                                    // Pick one at random.
                                    switch(Math.floor(Math.random() * 3))
                                    {
                                        case 0:
                                            fact_pool.push("This Pokémon is not a baby Pokémon.");
                                            break;
                                        case 1:
                                            fact_pool.push("This Pokémon is not a legendary Pokémon.");
                                            break;
                                        case 2:
                                            fact_pool.push("This Pokémon is not a mythical Pokémon.");
                                            break;
                                    }
                                }
                            }
                            break;
                    }
                    break;
                case 4: // Base Color
                    fact_pool.push("This Pokemon's main color is " + this.color + ".");
                    break;
                case 5: // Genera Description
                    fact_pool.push("This Pokémon is known as the " + this.genera + ".");
                    break;
                case 6: // Number of Varieties. On easy and medium, specifies the number of varieties. On hard, specifies if there is only one variety or not.
                    switch(this.num_varieties)
                    {
                        case 1:
                            fact_pool.push("This Pokémon has only one variety.");
                            break;
                        default:
                            if (difficulty_integer < 2)
                            {
                                fact_pool.push("This Pokémon has " + String(this.num_varieties) + " varieties.");
                            }
                            else
                            {
                                fact_pool.push("This Pokémon has more than one variety.");
                            }
                            break;
                    }
                    break;
                case 7: // Height: Exact on easy, +/- 25% on medium, +/- 50% on hard.
                    fact_pool.push(this.pokemon_size.get_height_string(difficulty_integer));
                    break;
                case 8: // Weight: Exact on easy, +/- 25% on medium, +/- 50% on hard.
                    fact_pool.push(this.pokemon_size.get_weight_string(difficulty_integer));
                    break;
                case 9: // Base Stats
                    switch(difficulty_integer) // We don't do highest/lowest on easy. On medium highest/lowest is a 25% chance. On hard it's a 50% chance.
                    {
                        case 1:
                            let stat_array = this.base_stats.get_stats_in_order();
                            stat_array = stat_array.sort(() => 0.5 - Math.random());
                            stat_array = stat_array.slice(0, 3);
                            fact_pool.push("This Pokémon has a base " + stat_array[0].n + " of " + String(stat_array[0].v) + ", a base " + stat_array[1].n + " of " + String(stat_array[1].v) + ", and a base " + stat_array[2].n + " of " + String(stat_array[2].v) + ".");
                        case 2:
                            switch(Math.floor(Math.random() * 4))
                            {
                                case 0:
                                    switch(Math.floor(Math.random() * 2))
                                    {
                                        case 0: // Lowest
                                            fact_pool.push("This Pokémon's lowest base stat is " + this.base_stats.get_lowest_base_stat() + ".");
                                            break;
                                        case 1: // Highest
                                            fact_pool.push("This Pokémon's highest base stat is " + this.base_stats.get_highest_base_stat() + ".");
                                            break;
                                    }
                                    break;
                                default:
                                    let stat_array = this.base_stats.get_stats_in_order();
                                    stat_array = stat_array.sort(() => 0.5 - Math.random());
                                    stat_array = stat_array.slice(0, 2);
                                    fact_pool.push("This Pokémon has a base " + stat_array[0].n + " of " + String(stat_array[0].v) + " and a base " + stat_array[1].n + " of " + String(stat_array[1].v) + ".");
                                    break;
                            }
                        case 3:
                            switch(Math.floor(Math.random() * 2))
                            {
                                case 0:
                                    switch(Math.floor(Math.random() * 2))
                                    {
                                        case 0: // Lowest
                                            fact_pool.push("This Pokémon's lowest base stat is " + this.base_stats.get_lowest_base_stat() + ".");
                                            break;
                                        case 1: // Highest
                                            fact_pool.push("This Pokémon's highest base stat is " + this.base_stats.get_highest_base_stat() + ".");
                                            break;
                                    }
                                    break;
                                default:
                                    let stat_array = this.base_stats.get_stats_in_order();
                                    stat_array = stat_array.sort(() => 0.5 - Math.random());
                                    stat_array = stat_array.slice(0, 1);
                                    fact_pool.push("This Pokémon has a base " + stat_array[0].n + " of " + String(stat_array[0].v) + ".");
                                    break;
                            }
                    }
                    break;
                case 10: // Move Pool (5 on easy, 4 on medium, 3 on hard)
                    let move_array = this.moves.sort(() => 0.5 - Math.random()); // Randomizes the move array.
                    switch(difficulty_integer)
                    {
                        case 1: // Easy - 5
                            fact_pool.push("This Pokémon can learn the moves: " + move_array[0] + ", " + move_array[1] + ", " + move_array[2] + ", " + move_array[3] + ", and " + move_array[4] + ".");
                            break;
                        case 2: // Normal - 4
                            fact_pool.push("This Pokémon can learn the moves: " + move_array[0] + ", " + move_array[1] + ", " + move_array[2] + ", and " + move_array[3] + ".");
                            break;
                        case 3: // Hard - 3
                            fact_pool.push("This Pokémon can learn the moves: " + move_array[0] + ", " + move_array[1] + ", and " + move_array[2] + ".");
                            break;
                    }
                    break;
                case 11: // Gender data
                    fact_pool.push(this.gender_data.get_gender_string());
                    break;
                case 12: // Growth rate
                    fact_pool.push("This Pokémon has a " + this.growth_rate + " growth rate.");
                    break;
                case 13: // Shape
                    if (this.shape === null)
                    {
                        fact_pool.push("This Pokémon does not have a defined shape.");
                        break;
                    }
                    else
                    {
                        fact_pool.push("This Pokémon has the " + this.shape + " shape.");
                        break;
                    }
                    break;
                case 14: // Abilities
                    switch(difficulty_integer)
                    {
                        case 1: // Easy
                            let ability_array = this.pokemon_abilities.sort(() => 0.5 - Math.random());
                            switch(this.pokemon_abilities.length)
                            {
                                case 0:
                                    fact_pool.push("This Pokémon cannot have any abilities.");
                                case 1:
                                    fact_pool.push("This Pokémon can have the " + ability_array[0] + " ability.");
                                    break;
                                case 2:
                                    fact_pool.push("This Pokémon can have the " + ability_array[0] + " and " + ability_array[1] + " abilities.");
                                    break;
                                default:
                                    fact_pool.push("This Pokémon can have the " + ability_array[0] + ", " + ability_array[1] + ", and " + ability_array[2] + " abilities.");
                                    break;
                            }
                            break;
                        case 2: // Medium
                            if (this.pokemon_abilities.length > 2)
                            {
                                // slice the array to 2.
                                let ability_array = this.pokemon_abilities.sort(() => 0.5 - Math.random());
                                ability_array = this.pokemon_abilities.slice(0, 2);
                                fact_pool.push("This Pokémon can have the " + ability_array[0] + " and " + ability_array[1] + " abilities.");
                                break;
                            }
                            else if (this.pokemon_abilities.length === 2)
                            {
                                let ability_array = this.pokemon_abilities.sort(() => 0.5 - Math.random());
                                fact_pool.push("This Pokémon can have the " + ability_array[0] + " and " + ability_array[1] + " abilities.");
                                break;
                            }
                            else if (this.pokemon_abilities.length === 1)
                            {
                                fact_pool.push("This Pokémon can have the " + this.pokemon_abilities[0] + " ability.");
                                break;
                            }
                            else
                            {
                                fact_pool.push("This Pokémon cannot have any abilities.");
                                break;
                            }
                            break;
                        case 3: // Hard
                            if (this.pokemon_abilities.length >= 1)
                            {
                                let ability_array = this.pokemon_abilities.sort(() => 0.5 - Math.random());
                                ability_array = ability_array.slice(0,1);
                                fact_pool.push("This Pokémon can have the " + ability_array[0] + " ability.");
                            }
                            else
                            {
                                fact_pool.push("This Pokémon cannot have any abilities.");
                            }
                            break;
                    }
                    break;
            }
        }
        return fact_pool;
    }

    select_random_facts(difficulty_integer)
    {
        /*
            7 on easy, 5 on medium, 3 on hard
            === POSSIBLE FACTS ===
            /- Type (Both on easy and medium, only one on hard)
            /- Original Generation
            /- Egg Groups (All on easy, only one one medium and hard)
            - Is a Baby
            - Is a Legendary
            - Is a Mythical
            - Base Color
            - Genera Description
            - The number of varieties this pokemon has
            - Height (Exact on easy, range on medium and hard)
            - Weight (Exact on easy, range on medium and hard)
            - 3/2/1 Base Stats (Based on difficulty)
            - Move pool (5 on easy, 4 on medium, 3 on hard)
            - Abilities (3 on easy, 2 on medium, 1 on hard)

        */
        let fact_pool = this.get_random_facts();
        fact_pool = fact_pool.sort(() => 0.5 - Math.random());
        switch(difficulty_integer)
        {
            case 1: // Easy
                fact_pool = fact_pool.slice(0, 7);
                break;
            case 2:
                fact_pool = fact_pool.slice(0, 5);
                break;
            case 3:
                fact_pool = fact_pool.slice(0, 3);
                break;
            default: // Default to normal in case of breakdown for whatever reason. This shouldn't happen.
                console.warn("Difficulty integer was not 1, 2, or 3. Defaulting to normal difficulty...")
                fact_pool = fact_pool.slice(0, 5);
                break;
        }
        return fact_pool;
    }
}

const base_url = "https://pokeapi.co/api/v2/"; // Base URL for the API. All calls will be appended to this URL.

function get_pokemon_count() // Gets the total number of pokemon available to select from the API. Used for random number generation.
{
    let count = 0;
    $.ajax({
        url: base_url + "pokemon-species/",
        type: "GET",
        dataType: "json",
        async: false,
        success: function(data) {
            count = data.count;
        }
    });
    return count;
}

function get_list_of_all_pokemon_names(count) // Fetches all of the pokemon names into a list. This is used for the autocomplete feature.
{
    let pokemon_names = [];
    $.ajax({
        url: base_url + "pokemon-species/?limit=" + String(count),
        type: "GET",
        dataType: "json",
        async: false,
        success: function(data) {
            data.results.forEach((pokemon) => {
                pokemon_names.push(pokemon.name);
                // if the pokemon name has a dash in it, add another entry with the dash repalced with a space.
                if (pokemon.name.includes("-"))
                {
                    pokemon_names.push(pokemon.name.replace(/-/g, " "));
                }

            });
            pokemon_names.push("nidoran"); // We add this separately because the API handles Nidoran weirdly.
        }
    });
    return pokemon_names;
}

function get_random_pokemon(num_available)
{
    let dex_num = Math.ceil(Math.random() * num_available); // Picks a random number between 1 and whatever the pokemon is. Because it uses an API it should automatically update whenever more are made.
    let pokemon = undefined;
    $.ajax({
        url: base_url + "pokemon-species/" + String(dex_num),
        type: "GET",
        dataType: "json",
        async: false,
        success: function(species_data)
        {
            let name = undefined; // By fetching names this way, we don't have problems where the resource name and the pokemon name don't match up.
            for (let i = 0; i < species_data.names.length; ++i)
            {
                if (species_data.names[i].language.name === "en")
                {
                    name = species_data.names[i].name;
                    break;
                }
            }
            name = name.toLowerCase(); // Converts the whole thing to lowercase.
            let color = species_data.color.name;
            let egg_groups = [];
            species_data.egg_groups.forEach((egg_group) => {
                egg_groups.push(egg_group.name);
            });
            let gender_data = new PokemonGender(species_data.gender_rate, species_data.has_gender_differences)
            let genera = undefined;
            species_data.genera.forEach((genus) => {
                if (genus.language.name === "en")
                {
                    genera = genus.genus;
                }
            });
            let original_generation = get_pokemon_generation(species_data.generation.url);
            let growth_rate = species_data.growth_rate.name;
            let is_baby = species_data.is_baby;
            let is_legendary = species_data.is_legendary;
            let is_mythical = species_data.is_mythical;
            let shape = undefined;
            if (species_data.shape !== null)
            {
                shape = species_data.shape.name;
            }
            else
            {
                shape = null;
            }
            let num_varieties = species_data.varieties.length;
            
            let game_data = get_pokemon_game_data(dex_num);
            let abilities = [];
            game_data.abilities.forEach((ability) => {
                abilities.push(get_pokemon_ability(ability.ability.url));
            });
            let height_cm = game_data.height * 10; // Original measures in decameters, so we convert to cm.
            let weight_kg = game_data.weight / 10; // Original measures in hectograms, so we convert to kg.
            let pokemon_size = new PokemonSize(height_cm, weight_kg);
            let official_artwork = game_data.sprites.other["official-artwork"].front_default;
            let pokemon_types = [];
            game_data.types.forEach((type) => {
                pokemon_types.push(type.type.name);
            });
            pokemon_types = new PokemonTypes(pokemon_types);
            let base_stats = new PokemonBaseStats(game_data.stats[0].base_stat, game_data.stats[1].base_stat, game_data.stats[2].base_stat, game_data.stats[3].base_stat, game_data.stats[4].base_stat, game_data.stats[5].base_stat);
            let move_urls = []; // We only need to keep 3 moves at random as clues, so we only request those three.
            game_data.moves.forEach((move) => {
                move_urls.push(move.move.url);
            });
            move_urls = move_urls.sort(() => 0.5 - Math.random()).slice(0, 5); // Randomly sort the array and then take the first three elements.
            let pokemon_moves = [];
            move_urls.forEach((url) => {
                pokemon_moves.push(get_pokemon_move(url));
            });
            pokemon = new Pokemon(name, dex_num, color, egg_groups, gender_data, genera, original_generation, growth_rate, is_baby, is_legendary, is_mythical, shape, num_varieties, pokemon_size, official_artwork, base_stats, pokemon_moves, pokemon_types, abilities);
        }
    });
    return pokemon;
}

function get_pokemon_game_data(dex_num) // Gets game-specific data of a pokemon. This includes the pokemon's abilities, types, and egg groups.
{   
    let out = undefined;
    $.ajax({
        url: base_url + "pokemon/" + dex_num,
        type: "GET",
        dataType: "json",
        async: false,
        success: function(data)
        {
            out = data;
        }
    });
    return out;
}

function get_pokemon_generation(url)
{
    let out = undefined;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        async: false,
        success: function(data)
        {
            data.names.forEach((name) => {
                if (name.language.name === "en")
                {
                    out = name.name;
                }
            })
        }
    });
    return out;
}

function get_pokemon_ability(url) // Returns a string with the ability name
{
    let name_out = null;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        async: false,
        success: function(data)
        {
            out = data;
            data.names.forEach((name) => {
                if (name.language.name === "en")
                {
                    name_out = name.name;
                }
            })
        }
    });
    return name_out;
}

function get_pokemon_move(url)
{
    let move_out = null;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        async: false,
        success: function(data)
        {
            data.names.forEach((name) => {
                if (name.language.name === "en")
                {
                    move_out = name.name;
                }
            });
        }
    });
    return move_out;
}
// This is a rewrite of pokemon.js to improve readability and expandability

class GameDifficulty
{
    constructor(difficulty)
    {
        this.difficulty = difficulty;
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
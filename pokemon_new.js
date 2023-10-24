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

    get gender_rate_male() // Returns
    {
        return this.gender_rate;
    }

    get gender_rate_female()
    {
        return 1 - (this.gender_rate);
    }

    get gender_rate_male_percent() // Returns
    {
        return this.gender_rate * 100;
    }

    get gender_rate_female_percent()
    {
        return 100 - (this.gender_rate * 100) ;
    }

    get gender_rate()
    {
        return {"m": this.gender_rate_male, "f": this.gender_rate_female};
    }

    get gender_fact_easy() // Returns a fact string
    {

    }

    get gender_fact_medium()
    {

    }

    get gender_fact_hard()
    {

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
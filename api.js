class InternalAPI
{
    static async get_alternative_generation_facts()
    {
        console.log("Starting fetch...");
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
        return out;
    }
}


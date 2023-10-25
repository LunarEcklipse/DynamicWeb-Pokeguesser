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
                error: function(xhr, status, error)
                {
                    console.error("fuck" + status + xhr);
                }
            });
        }
        catch (error)
        {
            console.error("Could not return alternative_generation_facts.json: " + error);
        }
        return out;
    }
}


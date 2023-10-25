# This file generates the cache files for the project.

import requests
import json
import os

absolute_path = os.path.abspath(__file__) # Ensures the current working directory is correct.
directory_name = os.path.dirname(absolute_path)
os.chdir(directory_name)

base_url: str = "https://pokeapi.co/api/v2/"
cache_folder_base_path: str = "../cache/"
name_cache_filepath: str = cache_folder_base_path + "pokemon_name_cache.json"

class PokemonRaw:
    def __init__(self, name, url):
        self.name = name
        self.url = url

class PokemonLanguageNames:
    def __init__(self, region: str, localized_name: str):
        self.region = region
        self.localized_name = localized_name

class PokemonName:
    def __init__(self, resource_name: str, localisations: list):
        self.name = resource_name
        self.localisations = localisations


def get_pokemon_count() -> int:
    response = requests.get(base_url + "pokemon-species")
    if response.status_code == 200:
        return response.json()["count"]
    else:
        raise Exception("Failed to get pokemon count.")

def get_pokemon_resource_name_list(count: int) -> list:
    pokemon_list: list = []
    response = requests.get(base_url + "pokemon-species?limit=" + str(count))
    if response.status_code == 200:
        res = response.json()
        for i in res["results"]:
            pokemon_list.append(PokemonRaw(i["name"], i["url"]))
    else:
        raise Exception("Failed to get pokemon resource name list.")
    return pokemon_list

def get_pokemon(pokemon: PokemonRaw) -> PokemonName:
    print("Getting pokemon: " + pokemon.name)
    response = requests.get(pokemon.url)
    if response.status_code == 200:
        localisations: list = []
        for i in response.json()["names"]:
            localisations.append(PokemonLanguageNames(i["language"]["name"], i["name"]))
        return PokemonName(pokemon.name, localisations)
    else:
        raise Exception("Failed to get pokemon.")

def write_to_name_cache(output: list):
    output_json: list = []
    for i in output:
        localisation_list: list = []
        for j in i.localisations:
            localisation_list.append({"language_code": j.region, "localised_name": j.localized_name})
        output_json.append({"name": i.name, "localisations": localisation_list})
    with open(name_cache_filepath, "w", encoding="utf-8") as f:
        json.dump(output_json, f, ensure_ascii=False, indent=4)

def main():
    pokemon_count: int = get_pokemon_count()
    pokemon_name_resource_list: list = get_pokemon_resource_name_list(pokemon_count)
    pokemon_name_list: list = [] 
    for i in pokemon_name_resource_list:
        pokemon_name_list.append(get_pokemon(i))
    write_to_name_cache(pokemon_name_list)
    print("Done!")

if __name__ == "__main__":
    main()

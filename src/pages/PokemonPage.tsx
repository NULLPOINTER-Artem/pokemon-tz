import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import { SinglePokemon } from "../api/types";
import { getPokemonByName } from "../api/modules/pokemon";

export default function PokemonPage() {
  const navigate = useNavigate();
  const { name } = useParams();
  const [thePokemon, setThePokemon] = useState<SinglePokemon | null>(null)

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const abortSignal = new AbortController();
    const fetchPokemons = async () => {
      const response = await getPokemonByName({
        name,
        signal: abortSignal.signal
      });

      if (response && response.status === 200) {
        // console.log('response');
        // console.dir(response);
        setThePokemon(response.data);
      }
    };

    fetchPokemons();

    return () => {
      abortSignal.abort();
    }
  }, []);

  return (
    <DefaultLayout>
      <button type="button" onClick={handleBack}>
        Back
      </button>
      <h1>Hello! {name}</h1>
      {thePokemon && thePokemon.sprites.other["official-artwork"].front_default && <img src={thePokemon.sprites.other["official-artwork"].front_default} alt="image pokemon" />}
    </DefaultLayout>
  )
}

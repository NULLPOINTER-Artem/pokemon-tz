import { useEffect, useState } from "react";
import { useNavigate, useParams, createSearchParams } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import { SinglePokemon } from "../api/types";
import { getPokemonByName } from "../api/modules/pokemon";
import IconImport from "../components/IconImport";
import {
  getIdFromURL
} from '../utils/utils';

import styles from './pokemon-page.module.scss';

type PokemonType = {
  id: number,
  name: string,
  url: string,
}

type PokemonSkill = {
  id: number,
  name: string,
}

export default function PokemonPage() {
  const navigate = useNavigate();
  const { name } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [thePokemon, setThePokemon] = useState<SinglePokemon | null>(null);
  const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>([]);
  const [pokemonSkills, setPokemonSkills] = useState<PokemonSkill[]>([]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSelectType = (id: number) => {
    navigate({
      pathname: '/',
      search: createSearchParams({
        type: id.toString(),
      }).toString(),
    })
  };

  useEffect(() => {
    const abortSignal = new AbortController();
    const fetchPokemons = async () => {
      setIsLoading(true);

      const response = await getPokemonByName({
        name,
        signal: abortSignal.signal
      });

      if (response && response.status === 200) {
        setThePokemon(response.data);
        setPokemonTypes(response.data.types.map((typeItem) => {
          return {
            id: getIdFromURL(typeItem.type.url),
            name: typeItem.type.name,
            url: typeItem.type.url
          }
        }));
        setPokemonSkills(response.data.moves.map((skillItem) => {
          return {
            id: getIdFromURL(skillItem.move.url),
            name: skillItem.move.name,
            url: skillItem.move.url
          }
        }));
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 0)
    };

    fetchPokemons();

    return () => {
      abortSignal.abort();
    }
  }, []);

  return (
    <DefaultLayout>
      <div className={`${styles["pokemon-page"]} ${isLoading && styles["pokemon-page--loading"]}`}>
        <button className={styles["pokemon-page__btn-back"]} title="Back" type="button" onClick={handleBack}>
          <IconImport
            className={styles["pokemon-page__btn-back-icon"]}
            name-icon="back-arrow"
          />
        </button>

        {!isLoading ? (
          <>
            <div className={styles["pokemon-page__image-block"]}>
              <figure>
                {thePokemon && thePokemon.sprites.other["official-artwork"].front_default && (
                  <img className={styles["pokemon-page__img"]} src={thePokemon.sprites.other["official-artwork"].front_default} alt={thePokemon.id + ''} />
                )}
                <figcaption className={styles["pokemon-page__caption"]}>
                  {thePokemon?.name}
                  {thePokemon && thePokemon.sprites.other["showdown"].front_default && (
                    <img className={styles["pokemon-page__caption-icon"]} src={thePokemon.sprites.other["showdown"].front_default} alt={thePokemon.name} />
                  )}
                </figcaption>
              </figure>
            </div>

            <div className={styles["pokemon-page__block-list"]}>
              <div className={styles["pokemon-page__block-heading"]}>
                Types
              </div>

              {pokemonTypes.length ? (
                <ul className={styles["pokemon-page__list"]}>
                  {pokemonTypes.map((pokemonTypeItem) => (
                    <li
                      className={`${styles["pokemon-page__item"]} ${styles["pokemon-page__item--selective"]}`}
                      title={`Search other pokemon with ${pokemonTypeItem.name} type`}
                      key={pokemonTypeItem.id}
                      onClick={() => handleSelectType(pokemonTypeItem.id)}
                    >
                      {pokemonTypeItem.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className={styles["pokemon-page__list--empty"]}>
                  Pokemon has no types.
                </div>
              )}
            </div>

            <div className={styles["pokemon-page__block-list"]}>
              <div className={styles["pokemon-page__block-heading"]}>
                Skills
              </div>

              {pokemonSkills.length ? (
                <ul className={styles["pokemon-page__list"]}>
                  {pokemonSkills.map((pokemonMoveItem) => (
                    <li className={styles["pokemon-page__item"]} key={pokemonMoveItem.id}>
                      {pokemonMoveItem.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className={styles["pokemon-page__list--empty"]}>
                  Pokemon has no skills.
                </div>
              )}
            </div>
          </>
        ) : (
          <IconImport
            className={styles['loading-icon']}
            name-icon="loading"
          />
        )}
      </div>
    </DefaultLayout>
  )
}

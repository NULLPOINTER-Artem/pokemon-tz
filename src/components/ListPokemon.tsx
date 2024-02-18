import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Pagination } from '@mui/material';
import { getPokemons } from "../api/modules/pokemon";
import { Pokemon, PokemonsResponse } from '../api/types';
import PokemonItem from "./PokemonItem";
import { SelectChangeEvent } from '@mui/material/Select';

import styles from './list-pokemon.module.scss';
import SearchPokemon from "./SearchPokemon";
import { AxiosResponse } from "axios";
import SelectTypePokemon from "./SelectTypePokemon";

const getOffsetByPage = (page: number, limit: number) => limit * ((page && page > 0 ? page : 1) - 1);
const getPageCount = (count: number, limit: number) => Math.ceil(count / limit);

export default function ListPokemon() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [listPokemon, setListPokemon] = useState<Pokemon[]>([]);

  // Pagination Block State
  const limit: number = 20;
  const currPage = Number(searchParams.get('page'));
  const [page, setPage] = useState<number>(currPage && currPage > 0 ? currPage : 1);
  const [countPages, setCountPages] = useState<number>(1);
  const resetPagination = () => {
    if (page > 1 || countPages > 1) {
      setCountPages(1);
      setPage(1);
    }
  };
  const handleSetList = (response: Pokemon[] | AxiosResponse<PokemonsResponse, any>) => {
    if (Array.isArray(response)) {
      setListPokemon(response);
    } else {
      const theResponse: AxiosResponse<PokemonsResponse, any> = response as AxiosResponse<PokemonsResponse, any>;
      setListPokemon(theResponse.data.results);
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  // Pokemon Type
  const [selectedType, setSelectedType] = useState(searchParams.get('type') ?? '');
  const handleSelectType = (event: SelectChangeEvent) => {
    setSelectedType(event.target.value);
    resetPagination();
  };

  // Pagination Block Actions
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Fetch Pokemons Block
  useEffect(() => {
    const abortSignal = new AbortController();

    const fetchPokemons = async () => {
      const response = await getPokemons({
        limit,
        offset: getOffsetByPage(page, limit),
        signal: abortSignal.signal
      });

      if (response && response.status === 200) {
        handleSetList(response);

        setCountPages(getPageCount(response.data.count, limit));
        setSearchParams(params => {
          params.set('page', page.toString());
          params.delete('type');
          return params;
        });
      }
    };

    if (!selectedType) fetchPokemons();

    return () => {
      abortSignal.abort();
    }
  }, [page, selectedType]);

  return <>
    <div className={styles["header-list"]}>
      <SelectTypePokemon
        handleSelectType={handleSelectType}
        handleSetList={handleSetList}
        selectedType={selectedType}
      />

      <SearchPokemon />
    </div>

    {listPokemon.length ? (
      <ul className={styles.list}>
        {listPokemon.map((pokemonItem: Pokemon) => (
          <PokemonItem key={pokemonItem.url} pokemon={pokemonItem} />
        ))}
      </ul>
    ) : (
      <div className={styles["list--empty"]}>
        No Pokemon were found.
      </div>
    )}


    {(!selectedType && listPokemon.length) && (
      <Pagination
        className={styles.pagination}
        classes={{
          ul: 'material-pagination'
        }}
        count={countPages}
        page={page}
        shape="rounded"
        onChange={handleChangePage}
      />
    )}
  </>
}

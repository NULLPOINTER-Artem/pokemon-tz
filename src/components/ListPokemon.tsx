import { useEffect, useState } from "react";
import { Pagination } from '@mui/material';
import { getPokemons } from "../api/modules/pokemon";
import { Pokemon } from '../api/types';
import PokemonItem from "./PokemonItem";

import styles from './list-pokemon.module.scss';
import { useSearchParams } from "react-router-dom";

const getOffsetByPage = (page: number, limit: number) => limit * (page - 1);
const getPageCount = (count: number, limit: number) => Math.ceil(count / limit);

export default function ListPokemon() {
  let [searchParams, setSearchParams] = useSearchParams();

  const limit: number = 20;
  const currPage = Number(searchParams.get('page'));
  const [page, setPage] = useState<number>(currPage && currPage > 0 ? currPage : 1);
  const [countPages, setCountPages] = useState<number>(1);
  const [listPokemon, setListPokemon] = useState<Pokemon[]>([]);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const abortSignal = new AbortController();
    const fetchPokemons = async () => {
      const response = await getPokemons({
        limit,
        offset: getOffsetByPage(page, limit),
        signal: abortSignal.signal
      });

      if (response && response.status === 200) {
        setListPokemon(response.data.results);
        setCountPages(getPageCount(response.data.count, limit));
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        setSearchParams(params => {
          params.set('page', page.toString());

          return params;
        })
      }
    };

    fetchPokemons();

    return () => {
      abortSignal.abort();
    }
  }, [page]);

  return <>
    <ul className={styles.list}>
      {listPokemon.map((pokemonItem: Pokemon) => (
        <PokemonItem key={pokemonItem.url} pokemon={pokemonItem} />
      ))}
    </ul>

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
  </>
}

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Pagination } from '@mui/material';
import { getPokemons, getPokemonsByType, getPokemonTypes, TransformedPokemonTypes } from "../api/modules/pokemon";
import { Pokemon } from '../api/types';
import PokemonItem from "./PokemonItem";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import styles from './list-pokemon.module.scss';

const getOffsetByPage = (page: number, limit: number) => limit * ((page && page > 0 ? page : 1) - 1);
const getPageCount = (count: number, limit: number) => Math.ceil(count / limit);

export default function ListPokemon() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [listPokemon, setListPokemon] = useState<Pokemon[]>([]);

  // Type Block State
  const [fetchedTypes, setFetchedTypes] = useState<TransformedPokemonTypes[]>([]);
  const [selectedType, setSelectedType] = useState(searchParams.get('type') ?? '');
  const resetType = () => {
    setSelectedType('');
  }

  // Pagination Block State
  const limit: number = 20;
  const currPage = Number(searchParams.get('page'));
  const [page, setPage] = useState<number>(currPage && currPage > 0 ? currPage : 1);
  const [countPages, setCountPages] = useState<number>(1);
  const resetPagination = () => {
    setCountPages(1);
    setPage(1);
  };

  // Type Block Actions
  const handleSelectType = (event: SelectChangeEvent) => {
    setSelectedType(event.target.value);
    resetPagination();
  };

  // Pagination Block Actions
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    resetType();
  };

  const handleSearchByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(`name ${event.target.value}`);
  };

  // Fetch Pokemons Block
  useEffect(() => {
    const abortSignal = new AbortController();

    const fetchPokemons = async () => {
      if (selectedType) {
        const response = await getPokemonsByType({
          type: +selectedType,
          signal: abortSignal.signal
        });

        if (response) {
          setListPokemon(response);
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });

          setSearchParams(params => {
            params.set('type', selectedType);
            params.delete('page');
            return params;
          });
        }

        return;
      }

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
          params.delete('type');
          return params;
        });
      }
    };

    fetchPokemons();

    return () => {
      abortSignal.abort();
    }
  }, [page, selectedType]);

  // Hook fires once at the mount process
  useEffect(() => {
    // Fetch the pokemon types
    const abortSignal = new AbortController();

    const fetchTypes = async () => {
      setFetchedTypes(await getPokemonTypes({
        signal: abortSignal.signal,
      }) ?? []);
    };

    fetchTypes();

    return () => {
      abortSignal.abort();
    }
  }, []);

  return <>
    <div className={styles["header-list"]}>
      <FormControl classes={{ root: 'material-select' }} sx={{ minWidth: 120 }} size="small">
        <InputLabel id="type-pokemon">
          Type
        </InputLabel>
        <Select
          labelId="type-pokemon"
          value={selectedType}
          label="Type"
          onChange={handleSelectType}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {fetchedTypes.map((typeItem) => (
            <MenuItem key={typeItem.id} className={`${styles["select-item"]}`} value={typeItem.id}>
              {typeItem.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        classes={{ root: `${styles["search-input"]}` }}
        label="Search By Name"
        variant="standard"
        size="small"
        onChange={handleSearchByName}
      />
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

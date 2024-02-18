import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useState, useEffect, ReactNode } from "react";
import { TransformedPokemonTypes, getPokemonTypes, getPokemonsByType } from "../api/modules/pokemon";
import { useSearchParams } from "react-router-dom";

import styles from './select-type-pokemon.module.scss';

type SelectTypePokemonProps = {
  handleSetList: Function,
  selectedType: string,
  handleSelectType: (event: SelectChangeEvent<string>, child: ReactNode) => void,
};

export default function SelectTypePokemon({ selectedType, handleSelectType, handleSetList }: SelectTypePokemonProps) {
  let [searchParams, setSearchParams] = useSearchParams();

  const [fetchedTypes, setFetchedTypes] = useState<TransformedPokemonTypes[]>([]);

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

  useEffect(() => {
    const abortSignal = new AbortController();

    const fetchPokemons = async () => {
      const response = await getPokemonsByType({
        type: +selectedType,
        signal: abortSignal.signal
      });

      if (response) {
        handleSetList(response);

        setSearchParams(params => {
          params.set('type', selectedType);
          params.delete('page');
          return params;
        });
      }
    };

    if (selectedType) fetchPokemons();

    return () => {
      abortSignal.abort();
    }
  }, [selectedType]);

  return (
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
  )
}

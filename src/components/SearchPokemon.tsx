import useDebounce from "../hooks/useDebounce";
import { useDispatch } from "react-redux";
import { addNotifyAsync } from "../store/slices/notify";
import { AppDispatch } from "../store/store";
import { TextField } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { getPokemonByName } from "../api/modules/pokemon";
import ModalNotFoundPokemon from "./ModalNotFoundPokemon";

import styles from './search-input.module.scss';

export default function SearchPokemon() {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpenModalFound, setIsOpenModalFound] = useState<boolean>(false);
  let foundPokemonName = useRef<string>('');

  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearch = useDebounce<string>(searchValue, 500);

  const fetchPokemon = async (controller: AbortController) => {
    const response = await getPokemonByName({
      name: debouncedSearch.toLowerCase(),
      signal: controller.signal
    });

    if (response) {
      // Found
      foundPokemonName.current = response.data.name;
      setIsOpenModalFound(true);
      return;
    }

    // Not found
    dispatch(addNotifyAsync({
      message: `No pokemon named "${debouncedSearch}" were found`,
      severity: 'warning'
    }));
  };

  useEffect(() => {
    const controller = new AbortController();

    if (debouncedSearch) fetchPokemon(controller);

    return () => {
      controller.abort();
    }
  }, [debouncedSearch]);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const handleKeyUpSearchInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && debouncedSearch) {
      const controller = new AbortController();
      fetchPokemon(controller);
    }
  };

  const handleCloseModal = () => {
    setIsOpenModalFound(false);
  }

  return <>
    <TextField
      classes={{ root: `${styles["search-input"]}` }}
      label="Search By Name"
      variant="standard"
      size="small"
      onChange={handleSearchInput}
      onKeyUp={handleKeyUpSearchInput}
    />

    <ModalNotFoundPokemon
      isOpen={isOpenModalFound}
      foundPokemonName={foundPokemonName.current}
      handleClose={handleCloseModal}
    />
  </>
};

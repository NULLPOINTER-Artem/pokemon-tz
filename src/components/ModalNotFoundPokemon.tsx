import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { PropsWithChildren } from "react";

import styles from './modal-not-found-pokemon.module.scss';

type ModalNotFoundPokemonProps = PropsWithChildren<{
  isOpen: boolean,
  foundPokemonName: string,
  handleClose: () => void,
}>;

export default function ModalNotFoundPokemon({ isOpen, foundPokemonName, handleClose }: ModalNotFoundPokemonProps) {
  const navigate = useNavigate();

  const handleRouteToPokemon = () => {
    if (foundPokemonName) navigate(`/${foundPokemonName}`);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="found-pokemon-title"
      aria-describedby="found-pokemon-description"
      classes={{
        container: styles["not-found-modal"],
      }}
    >
      <DialogTitle id="found-pokemon-title">
        You Found It!
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="found-pokemon-description">
          Would you like to look at it?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          No
        </Button>
        <Button onClick={handleRouteToPokemon}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

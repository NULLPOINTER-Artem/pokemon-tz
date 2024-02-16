import { Link } from "react-router-dom";
import { Pokemon } from '../api/types';
import IconImport from "./IconImport";

import styles from './pokemon-item.module.scss';

type PokemonItemProps = {
  pokemon: Pokemon,
}

export default function PokemonItem({ pokemon }: PokemonItemProps) {
  return (
    <li className={styles.item}>
      <Link className={styles.link} to={pokemon.name}>
        <div className={styles["flip-card"]}>
          <div className={styles["flip-card__front"]}>
            {pokemon.name}
          </div>
          <div className={styles["flip-card__back"]}>
            <IconImport
              name-icon="pikachu"
            />
          </div>
        </div>
      </Link>
    </li>
  )
}

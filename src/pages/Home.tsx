import ListPokemon from "../components/ListPokemon";
import DefaultLayout from "../layouts/DefaultLayout";

import styles from './home.module.scss';

export default function Home() {
  return (
    <DefaultLayout className={styles.home}>
      <section className={styles["home__pokemon-list"]}>
        <ListPokemon />
      </section>
    </DefaultLayout>
  )
}

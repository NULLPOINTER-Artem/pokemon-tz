import IconImport from './IconImport';
import styles from './the-header.module.scss';

export default function TheHeader() {
  return (
    <header className={styles.header}>
      <IconImport
        className={`${styles['header-logo']}`}
        name-icon='pokemon-text'
      />

      <IconImport
        className={`${styles['header-icon']} ${styles.bounce}`}
        name-icon='pokemon-logo'
      />
    </header>
  )
}

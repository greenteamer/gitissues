import styles from './Header.styl';
import React from 'react';


const Header = () => (
  <header className={styles.header}>
    <h1><a href="#/">React Stylus Webpack boilerplate</a></h1>
    <h2>A starter kit for creating applications using react and stylus</h2>
    <a className={styles.stylusLogo} href="https://learnboost.github.io/stylus/" />
    <a className={styles.reactLogo} href="https://facebook.github.io/react/" />
  </header>
);

export default Header;

import React, { FC, useState } from 'react';

import styles from './Header.module.scss';

interface Props {
  degAge: number;
  defYears: number;
  onChange: (age: number, years: number) => void;
}

export const Header: FC<Props> = ({onChange, defYears, degAge}) => {
  const [age, setAge] = useState(degAge);
  const [years, setYears] = useState(defYears);
  return (
    <div className={styles.root}>
      <span className={styles.input}>
        <span>age:</span>
        <input
          type="number"
          value={age}
          onChange={e => {
            setAge(+e.target.value);
            onChange(+e.target.value, years);
          }}
        />
      </span>

      <span className={styles.input}>
        <span>years:</span>
        <input
          type="number"
          value={years}
          onChange={e => {
            setYears(+e.target.value);
            onChange(age, +e.target.value);
          }}
        />
      </span>
    </div>
  )
};
import React, { FC, useState } from 'react';
import debounce from 'lodash/debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons'
import { Header } from 'components/Header';

import styles from './LifeGrid.module.scss';

const AGE = 35;
const YEARS = 85;
const WEEKS_IN_YEAR = 52;

interface Cell {
  active: boolean;
  current: boolean;
}

const onChange = debounce((setData: any, age: number, years: number) => {
  setData({age, years})
}, 500);

export const LifeGrid: FC = () => {
  const [{age, years}, setData] = useState({age: AGE, years: YEARS});
  const cells: Cell[] = [...Array(years * WEEKS_IN_YEAR)].map((_, index) => {
    return {
      active: index + 1 < age * WEEKS_IN_YEAR,
      current: (index + 1) === age * WEEKS_IN_YEAR,
    }
  });
  return (
    <div className={styles.root}>
      <Header
        degAge={age}
        defYears={years}
        onChange={(age, years) => onChange(setData, age, years)}
      />

      <div className={styles.cells}>
        {cells.map(({ current, active }, index) => {
          let icon, color;
          switch (true) {
            case index === cells.length - 1:
              icon = faSkullCrossbones;
              color = 'red';
              break;
            case active:
              icon = faCoffee;
              color = '#777';
              break;
            default:
              icon = faCoffee;
              color = 'white';
          }
          return (
            <FontAwesomeIcon
              key={index}
              className={styles.cell}
              icon={icon}
              color={color}
              size={index === cells.length - 1 ? '2x' : 'xs'}
            />
          )
        })}
      </div>
    </div>
  );
};
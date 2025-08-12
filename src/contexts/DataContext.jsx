import React, { useEffect, useRef, useState } from 'react';
import { SystemDataInstance } from '../data/system';
import { PlanetDataInstance } from '../data/planet';
import { BuildingDataInstance } from '../data/building';

const DataContext = React.createContext();
export default DataContext;

const CURRENT_VERSION = 1;

export function DataProvider({ children }) {
  const [counter, setCounter] = useState(0);
  const loadedRef = useRef(false);

  const values = {
    counter,
    loaded: loadedRef.current,
  };

  const saveData = () => {
    if (!loadedRef.current) return;
    const data = {
      version: CURRENT_VERSION,
      systems: SystemDataInstance.getData(),
      planets: PlanetDataInstance.getData(),
      buildings: BuildingDataInstance.getData(),
    }

    localStorage.setItem('colony-chain-save', JSON.stringify(data));
  }

  const loadData = () => {
    let item = localStorage.getItem('colony-chain-save');
    if (!item) return;
    item = JSON.parse(item);

    if (item.version !== CURRENT_VERSION) {
      console.error(`Saved data version is ${item.version}, not ${CURRENT_VERSION}`);
      return;
    }

    SystemDataInstance.setAll(item.systems);
    PlanetDataInstance.setAll(item.planets);
    BuildingDataInstance.setAll(item.buildings);
  }

  useEffect(() => {
    SystemDataInstance.on('change', () => {
      setCounter((counter) => ++counter);
      saveData();
    }, true);

    PlanetDataInstance.on('change', () => {
      setCounter((counter) => ++counter);
      saveData();
    }, true);

    BuildingDataInstance.on('change', () => {
      setCounter((counter) => ++counter);
      saveData();
    }, true);

    loadData();
    loadedRef.current = true;
  }, []);

  return <DataContext.Provider value={values}>
    {children}
  </DataContext.Provider>
}
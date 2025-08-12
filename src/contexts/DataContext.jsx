import React, { useEffect, useState } from 'react';
import { SystemDataInstance } from '../data/system';
import { PlanetDataInstance } from '../data/planet';

const DataContext = React.createContext();
export default DataContext;

export function DataProvider({ children }) {
  const [counter, setCounter] = useState(0);

  const values = {
    counter,
  };

  useEffect(() => {
    SystemDataInstance.on('change', () => {
      setCounter((counter) => ++counter);
    }, true);

    PlanetDataInstance.on('change', () => {
      setCounter((counter) => ++counter);
    }, true);
  }, []);

  return <DataContext.Provider value={values}>
    {children}
  </DataContext.Provider>
}
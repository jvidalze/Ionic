import { Storage } from '@capacitor/storage';
import React, { useState } from 'react';
import { ApplicationContextModel } from '../models/applicationContext.model';
import { Character } from '../models/character.model';
import ApplicationContext from './ApplicationContext';

const ApplicationContextProvider: React.FC = (props) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const refreshCharacters = (characters: Character[]) => {
    setCharacters(characters);
  };

  const refreshAuthenticated = async () => {
    const { value } = await Storage.get({ key: 'IS_AUTHENTICATED' });
    setIsAuthenticated(value !== null ? true : false);
  };

  refreshAuthenticated();

  const applicationContext: ApplicationContextModel = {
    characters,
    refreshCharacters,
    isAuthenticated,
    refreshAuthenticated,
  };

  return (
    <ApplicationContext.Provider value={applicationContext}>
      {props.children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;

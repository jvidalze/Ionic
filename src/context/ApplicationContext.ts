import React from 'react';
import { ApplicationContextModel } from '../models/applicationContext.model';

const ApplicationContext = React.createContext<ApplicationContextModel>({
  characters: [],
  refreshCharacters: () => {},
  isAuthenticated: false,
  refreshAuthenticated: () => {},
});

export default ApplicationContext;

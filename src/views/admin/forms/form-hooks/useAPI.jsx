import React, { useContext, useState, useEffect, createContext } from 'react';
import { APIContext } from '../../providers/APIContextProvider';
const useAPI = () => useContext(APIContext);

export default useAPI;
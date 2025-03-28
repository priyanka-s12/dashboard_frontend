import { createContext, useContext, useState, useEffect } from 'react';
import useAxios from '../custom/useAxios';

const LeadContext = createContext();

const useLead = () => useContext(LeadContext);
export default useLead;

export const LeadProvider = ({ children }) => {
  const {
    data: leads,
    loading,
    error,
    getData: getLeads,
  } = useAxios('https://anvaya-dashboard-backend.vercel.app/api/leads');

  const {
    data: agents,
    loading: agentsLoading,
    error: agentsError,
    getData: getAgents,
  } = useAxios('https://anvaya-dashboard-backend.vercel.app/api/agents');

  const { data: tags } = useAxios(
    'https://anvaya-dashboard-backend.vercel.app/api/tags'
  );

  return (
    <LeadContext.Provider
      value={{
        leads,
        loading,
        error,
        getLeads,
        agents,
        agentsLoading,
        agentsError,
        getAgents,
        tags,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};

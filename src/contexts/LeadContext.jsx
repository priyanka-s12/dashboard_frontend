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

  const { data: tags, getData: getTags } = useAxios(
    'https://anvaya-dashboard-backend.vercel.app/api/tags'
  );

  const { data: totalLeads, getData: getTotalLeads } = useAxios(
    'https://anvaya-dashboard-backend.vercel.app/report/pipeline'
  );

  const { data: leadsStatus, getData: getLeadsStatus } = useAxios(
    'https://anvaya-dashboard-backend.vercel.app/report/leads-by-status'
  );

  const { data: leadsByAgent, getData: getLeadsByAgent } = useAxios(
    'https://anvaya-dashboard-backend.vercel.app/report/closed-by-agent'
  );

  const { data: leadsClosed, getData: getLeadsClosed } = useAxios(
    'https://anvaya-dashboard-backend.vercel.app/report/last-week'
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
        getTags,
        totalLeads,
        getTotalLeads,
        leadsStatus,
        getLeadsStatus,
        leadsByAgent,
        getLeadsByAgent,
        leadsClosed,
        getLeadsClosed,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};

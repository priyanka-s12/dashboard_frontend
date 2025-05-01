# Anvaya CRM

Anvaya CRM app focuses on lead management with defined steps for each lead's lifecycle. We can assign sales agents to leads and allow users to add comments or updates to each lead.

## Features

1. Dashboard
    - Sidebar navigation (Leads, Sales, Agents, Reports).
    - Display of leads categorized by status (New, Contacted, etc.).
    - Quick filters to easily switch between lead statuses.
2. Lead Management
    - Leads are following a defined workflow of statuses means each lead will go through New → Contacted → Qualified → Proposal Sent → Closed
    - Leads can be updated throughout their lifecycle to reflect their current stage.
    - Each lead is assigned to a sales agent.
    - You can see all leads with its key details, and add, update, delete lead
    - Similarly can add sales agent,  tag too.
3. Comments/ updates
    - Each lead has comment section to add updates about the lead
    - Can see all comments related to that lead, including timestamps and author
4. **URL-based filtering**:
    - Filters for lead status, sales agent, and tags will be reflected in the URL for easy navigation and sharing of filtered lead views.
    - Filters are reflected in the URL for easy navigation and sharing of filtered lead views.
        - Filter options to filter by lead status, agent, source, tag, priority
        - Sort by time to close.
5. **Reports and Visualizations**:
    - Useing Chart.js for visualizing lead progress and report data.
        - Leads closed last week (bar chart).
        - Lead distribution by status (pie chart).
        - Lead distribution by sales agent (bar chart).
        - Total leads in the pipeline and closed (bar chart).

## Tech Stack

- **Frontend** - React (with Vite), React Router for URL-based filtering, Axios for API calls, Chart.js for visualizations.
- **Backend -** Express.js with RESTful APIs, Mongoose for database interactions with MongoDB.
- **Database -** MongoDB with models for leads, sales agents, comments, and tags.
- **Deployment -** Vercel

## To run locally

```
git clone https://github.com/priyanka-s12/dashboard_frontend.git
cd dashboard_frontend
npm install
npm run dev
```

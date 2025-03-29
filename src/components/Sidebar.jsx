import { NavLink, Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  return (
    <div>
      {location.pathname === '/' ? (
        <nav className="navbar justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item d-flex">
              <i
                className="bi bi-house-fill ms-2"
                style={{ fontSize: '1.5rem' }}
              ></i>
              <NavLink className="nav-link ms-3" to="/">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item d-flex">
              <i
                className="bi bi-people-fill ms-2"
                style={{ fontSize: '1.5rem' }}
              ></i>
              <NavLink className="nav-link ms-3" to="/leads">
                Leads
              </NavLink>
            </li>
            <li className="nav-item d-flex">
              <i
                className="bi bi-receipt ms-2"
                style={{ fontSize: '1.5rem' }}
              ></i>
              <NavLink className="nav-link ms-3" to="/sales">
                Sales
              </NavLink>
            </li>
            <li className="nav-item d-flex">
              <i
                className="bi bi-person-circle ms-2"
                style={{ fontSize: '1.5rem' }}
              ></i>
              <NavLink className="nav-link ms-3" to="/agents">
                Agents
              </NavLink>
            </li>
            <li className="nav-item d-flex">
              <i
                className="bi bi-bar-chart-fill ms-2"
                style={{ fontSize: '1.5rem' }}
              ></i>
              <NavLink className="nav-link ms-3">Reports</NavLink>
            </li>
            <li className="nav-item d-flex">
              <i
                className="bi bi-gear-fill ms-2"
                style={{ fontSize: '1.5rem' }}
              ></i>
              <NavLink className="nav-link ms-3" to="/">
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className="navbar justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item d-flex justify-content-center">
              <i
                className="bi bi-arrow-left me-2"
                style={{ fontSize: '1.5rem' }}
              ></i>
              <Link to="/" className="nav-link">
                <h6>Back to Dashboard</h6>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default Sidebar;

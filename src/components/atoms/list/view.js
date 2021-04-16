import { NavLink } from "react-router-dom"
import NavUnlisted from './styled'


function List() {
    return (
      <NavUnlisted>
        <NavLink to="/" activeClassName="current" exact>
          <li>Entrar</li>
        </NavLink>
        <NavLink to="/register" activeClassName="current" exact>
          <li>Registrarse</li>
        </NavLink>
      </NavUnlisted>
    );
  }
  
  export default List;
  
  
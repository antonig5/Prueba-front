import { FaRegUserCircle } from "react-icons/fa";
const Nav = () => {
  return (
    <nav>
      <ul>
        <div>
          <li>
            <div className="logo">
              <span className="logo-top">QUICKBET</span>
              <div className="logo-middle">
                <div className="logo-separator"></div>
                MOVIES
                <div className="logo-separator"></div>
              </div>
            </div>
          </li>
          <li>
            <a href="/">Popular</a>
          </li>
          <li>
            <a href="/">Favorites</a>
          </li>
        </div>
        <li className="profile">
          <a href="/profile" aria-label="Profile">
            <FaRegUserCircle size={26} />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

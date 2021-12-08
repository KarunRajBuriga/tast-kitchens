import {withRouter, Link} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'

import {BsJustify} from 'react-icons/bs'
import {ImCancelCircle} from 'react-icons/im'
import './index.css'

class Header extends Component {
  state = {
    showRoutes: false,
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  onClickShowRoutes = () => {
    this.setState(prevState => ({
      showRoutes: !prevState.showRoutes,
    }))
  }

  render() {
    const {showRoutes} = this.state
    return (
      <>
        <div className="header-desktop-container">
          <div className="header-logo-name-container">
            <img
              src="https://i.imgur.com/Ncgq2Tm.png"
              alt="website logo"
              className="header-logo"
            />
            <h1 className="header-app-name ">Tasty Kitchen</h1>
          </div>
          <div className="navbar-desktop-routers-container">
            <ul className="nav-menu">
              <li className="nav-menu-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>

              <li className="nav-menu-item">
                <Link to="/cart" className="nav-link">
                  Cart
                  {/* {renderCartItemsCount()} */}
                </Link>
              </li>
            </ul>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="header-mobile-container">
          <div className="header-mobile-logo-dropdown-container">
            <div className="header-logo-name-container">
              <img
                src="https://i.imgur.com/Ncgq2Tm.png"
                alt="website logo"
                className="header-logo"
              />
              <h1 className="header-app-name ">Tasty Kitchen</h1>
            </div>
            <BsJustify onClick={this.onClickShowRoutes} />
          </div>

          {showRoutes ? (
            <div className="routes-bar-container">
              <div className="navbar-desktop-routers-container">
                <ul className="nav-menu">
                  <li className="nav-menu-item">
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </li>

                  <li className="nav-menu-item">
                    <Link to="/cart" className="nav-link">
                      Cart
                      {/* {renderCartItemsCount()} */}
                    </Link>
                  </li>
                </ul>
                <button
                  type="button"
                  className="logout-desktop-btn"
                  onClick={this.onClickLogout}
                >
                  Logout
                </button>
              </div>
              <ImCancelCircle
                className="cancel-logo"
                onClick={this.onClickShowRoutes}
              />
            </div>
          ) : null}
        </div>
      </>
    )
  }
}

export default withRouter(Header)

import React from 'react';
import './NavComponent.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink} from 'reactstrap';

class NavComponent extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      shouldHide: Boolean
    };
  }
    componentWillMount() {
             const token = localStorage.getItem('token');
              
              if (token != null) { this.setState({shouldHide: false}) }

              console.log('token', token) 
          }

handleLogout = event => {
      localStorage.removeItem('token');
          localStorage.removeItem('binfo');
                localStorage.removeItem('uinfo');



     const tk = Object.assign({}, this.state, {
        token: false     

      })
  
    window.location.reload()
   };
   
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <div className="headerBar">
          <span className="headerLogo">Eric Ribeiro</span>
        </div>
        <div>
          <Navbar className="navBar" light expand="md">
            <NavbarBrand></NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                 <div><NavLink href="/">Home</NavLink></div>
                </NavItem>
                <NavItem>
                  <NavLink href="/about">About</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/service">Bookings</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="">Blog</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/signup">SignUp</NavLink>
                </NavItem>
                 <div className={this.state.shouldHide ? 'hidden' : ""}>
                 <NavItem>
                  <NavLink href="/admin">Admin</NavLink>
                </NavItem>
                   </div>
                   <NavItem>
                  <NavLink href="/reset">Reset</NavLink>
                </NavItem>
              <div className={this.state.shouldHide ? 'hidden' : ""}>
                    <NavItem>
                  <NavLink href="/user_board">User Board</NavLink>
                </NavItem>
                </div>
                <div className={this.state.shouldHide ? 'hidden' : "logout"}>
       <button bssize="large" type="button" onClick={this.handleLogout}>Logout</button>

     </div>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      </div>
    );
  }
};

export default NavComponent;
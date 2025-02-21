const Studentsidebar = ({ onClick, open, sidebar }) => {
    // other state hooks...
  
    // Set 'open' state to always be true to keep sidebar open.
   
  
    return (
      <div>
        <div>
          <div className={"sidebar active"}>
            <div className="logo-content">
              <div className="logo px-4 py-2 ">
                <img src={aviar} alt="Aviar" width={"80%"} height={"100%"} />
              </div>
              {/* <FontAwesomeIcon
                icon={faBars}
                size="1x"
                onClick={() => {
                  onClick(!open);
                }}
                className="menu-button "
              /> */}
            </div>
            {/* Sidebar Content */}
            <div>
              {/* Sidebar Menu List */}
              <div className="nav-list">
                <div>
                  {/* Profile and Menu */}
                  <div className="menu-list">
                    <NavLink
                      to={"/Updatestudentdetail"}
                      activeClassName="main-nav-active-style"
                    >
                      <FontAwesomeIcon
                        icon={faIdCard}
                        title="My Profile"
                        size="1x"
                        className="menu-icon me-3"
                      />
                      My Profile
                    </NavLink>
                  </div>
                  {/* Rest of your navigation items... */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <PublicFooter />
      </div>
    );
  };
  
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Progress } from 'reactstrap';

const propTypes = {
  notif: PropTypes.bool,
  accnt: PropTypes.bool,
  tasks: PropTypes.bool,
  mssgs: PropTypes.bool,
};
const defaultProps = {
  notif: false,
  accnt: false,
  tasks: false,
  mssgs: false,
};

class HeaderDropdown extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  dropNotif() {
    const itemsCount = 1;
    return (
      <Dropdown nav className="d-md-down-none" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          <i className= "fa fa-bell-o"></i><Badge pill color="danger">{itemsCount}</Badge>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header tag="div" className="text-center"><strong>You have {itemsCount} notifications</strong></DropdownItem>
          <DropdownItem><i className="icon-user-follow text-success"></i> New user registered</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  dropAccnt() {
    return (
      <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          <img src="http://americanmuslimconsumer.com/2013/wp-content/uploads/2013/09/blank-user.jpg" className="img-avatar" alt="admin@bootstrapmaster.com" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
          <DropdownItem><i className="fa fa-user"></i>User Profile</DropdownItem>
          <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
          <DropdownItem><i className="fa fa-user"></i> Manage Account</DropdownItem>
          <DropdownItem><i className="fa fa-wrench"></i> Organization Profile</DropdownItem>
          <DropdownItem><i className="fa fa-usd"></i> Organization Manager</DropdownItem>
          <DropdownItem><i className="fa fa-file"></i> Organization Details</DropdownItem>
          <DropdownItem><i className="fa fa-file"></i> User Database</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={this.props.onLogout}><i className="fa fa-lock"></i> Logout</DropdownItem>
          {/*<DropdownItem><i className="fa fa-lock"></i> Logout</DropdownItem>*/}
        </DropdownMenu>
      </Dropdown>
    );
  }

  dropTasks() {
    const itemsCount = 15;
    return (
      <Dropdown nav className="d-md-down-none" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          <i className="icon-list"></i><Badge pill color="warning">{itemsCount}</Badge>
        </DropdownToggle>
        <DropdownMenu right className="dropdown-menu-lg">
          <DropdownItem header tag="div" className="text-center"><strong>You have {itemsCount} pending tasks</strong></DropdownItem>
          <DropdownItem>
            <div className="small mb-1">Upgrade NPM &amp; Bower <span
              className="float-right"><strong>0%</strong></span></div>
            <Progress className="progress-xs" color="info" value={0} />
          </DropdownItem>
          <DropdownItem>
            <div className="small mb-1">ReactJS Version <span className="float-right"><strong>25%</strong></span>
            </div>
            <Progress className="progress-xs" color="danger" value={25} />
          </DropdownItem>
          <DropdownItem>
            <div className="small mb-1">VueJS Version <span className="float-right"><strong>50%</strong></span>
            </div>
            <Progress className="progress-xs" color="warning" value={50} />
          </DropdownItem>
          <DropdownItem>
            <div className="small mb-1">Add new layouts <span className="float-right"><strong>75%</strong></span>
            </div>
            <Progress className="progress-xs" color="info" value={75} />
          </DropdownItem>
          <DropdownItem>
            <div className="small mb-1">Angular 2 Cli Version <span className="float-right"><strong>100%</strong></span></div>
            <Progress className="progress-xs" color="success" value={100} />
          </DropdownItem>
          <DropdownItem className="text-center"><strong>View all tasks</strong></DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  dropMssgs() {
    const itemsCount = 7;
    return (
      <Dropdown nav className="d-md-down-none" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          <i className="icon-envelope-letter"></i><Badge pill color="info">{itemsCount}</Badge>
        </DropdownToggle>
        <DropdownMenu right className="dropdown-menu-lg">
          <DropdownItem header tag="div"><strong>You have {itemsCount} messages</strong></DropdownItem>
          <DropdownItem href="#">
            <div className="message">
              <div className="pt-3 mr-3 float-left">
                <div className="avatar">
                  <img src={'assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  <span className="avatar-status badge-success"></span>
                </div>
              </div>
              <div>
                <small className="text-muted">John Doe</small>
                <small className="text-muted float-right mt-1">Just now</small>
              </div>
              <div className="text-truncate font-weight-bold"><span className="fa fa-exclamation text-danger"></span> Important message</div>
              <div className="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
              </div>
            </div>
          </DropdownItem>
          <DropdownItem href="#">
            <div className="message">
              <div className="pt-3 mr-3 float-left">
                <div className="avatar">
                  <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  <span className="avatar-status badge-warning"></span>
                </div>
              </div>
              <div>
                <small className="text-muted">Jane Doe</small>
                <small className="text-muted float-right mt-1">5 minutes ago</small>
              </div>
              <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
              <div className="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
              </div>
            </div>
          </DropdownItem>
          <DropdownItem href="#">
            <div className="message">
              <div className="pt-3 mr-3 float-left">
                <div className="avatar">
                  <img src={'assets/img/avatars/5.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  <span className="avatar-status badge-danger"></span>
                </div>
              </div>
              <div>
                <small className="text-muted">Janet Doe</small>
                <small className="text-muted float-right mt-1">1:52 PM</small>
              </div>
              <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
              <div className="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
              </div>
            </div>
          </DropdownItem>
          <DropdownItem href="#">
            <div className="message">
              <div className="pt-3 mr-3 float-left">
                <div className="avatar">
                  <img src="http://americanmuslimconsumer.com/2013/wp-content/uploads/2013/09/blank-user.jpg" className="img-avatar" alt="U" />
                  <span className="avatar-status badge-info"></span>
                </div>
              </div>
              <div>
                <small className="text-muted">Joe Doe</small>
                <small className="text-muted float-right mt-1">4:03 AM</small>
              </div>
              <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
              <div className="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
              </div>
            </div>
          </DropdownItem>
          <DropdownItem href="#" className="text-center"><strong>View all messages</strong></DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  render() {
    const { notif, accnt, tasks, mssgs } = this.props;
    return (
        notif ? this.dropNotif() :
          accnt ? this.dropAccnt() :
            tasks ? this.dropTasks() :
              mssgs ? this.dropMssgs() : null
    );
  }
}

HeaderDropdown.propTypes = propTypes;
HeaderDropdown.defaultProps = defaultProps;

export default HeaderDropdown;

import React, {Component} from "react";
import { BrowserRouter, Route, Link} from "react-router-dom";
import axios from "axios";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { Button} from 'reactstrap';
class Things extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      name: '',
      thingList: [],
      projectForm: '',
      organization: ''
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.goToThing = this.goToThing.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    axios.post("/api/things/thingList", {clientToken: sessionStorage.getItem("clientToken")})
    .then(res=> {
      this.setState({"email": res.data.client.email, thingList: res.data.things, organization: res.data.organization})
    });
  }

  goToThing(uniqueId) {
    this.props.history.push('/thing/'+uniqueId);
  }

  goToLogin() {
    this.props.history.push('/login');
  }

  logout() {
    sessionStorage.clear();
    this.props.history.push('/');
  }

  render(){
    const { email, thingList, projectForm, organization} = this.state;
    const columns = [{
      Header: 'Things ID',
      accessor: 'uniqueId'
    }, {
      Header: 'Thing Name',
      accessor: 'name',
    }, {
      Header: 'Thing Description',
      accessor: 'description'
    }, {
      Header: 'Thing Brand',
      accessor: 'brand'
    }, {
      Header: 'Things Attributes',
      accessor: 'uri'
    }, {
      Header: 'Assigned Yet ?',
      accessor: 'associationStatus',
      Cell: ({value}) => String(value)
    }, {
      Header: 'Action',
      Cell: ({ row }) => (<Button block onClick={(e) => this.goToThing(row.uniqueId)} color="primary">View</Button>)
    }];
    return(
        <ReactTable
          data={thingList}
          columns={columns}
          onFetchData={this.fetchData}
          noDataText="Not available"
          getTrProps ={(state, rowInfo) => {
            if (rowInfo && rowInfo.row) {
              return {
                onClick: (e) => {
                  this.setState({
                    selected: rowInfo.index,
                  })
                }
              }
            } else {
              return {}
            }
          }}
          />
    )
  }
}

export default Things

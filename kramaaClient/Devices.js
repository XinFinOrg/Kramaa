import React, {Component} from "react";
import { BrowserRouter, Route, Link} from "react-router-dom";
import axios from "axios";
import ProjectForm from './ProjectForm';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { Button} from 'reactstrap';
class Devices extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      name: '',
      deviceList: [],
      organization: ''
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.goToDevice = this.goToDevice.bind(this);
  }


  componentDidMount() {
    axios.post("/api/devices/deviceList", {clientToken: sessionStorage.getItem("clientToken")})
    .then(res=> {
      this.setState({
        deviceList: res.data.deviceList
      })
    });
  }


  goToDevice(uniqueId) {
    console.log(uniqueId);
    this.props.history.push('/device/'+uniqueId);
  }

  render(){
    const { email, deviceList, organization} = this.state;
    const columns = [{
      Header: 'Device ID',
      accessor: 'uniqueId'
    }, {
      Header: 'Device URN',
      accessor: 'urn',
    }, {
      Header: 'Device Blockchain ID',
      accessor: 'tokenId'
    }, {
      Header: 'Association Status',
      accessor: 'associationStatus',
      Cell: ({value}) => String(value)
    }, {
      Header: 'Transaction Hash',
      accessor: 'transactionHash'
    }, {
      Header: 'Action',
      Cell: ({ row }) => (<Button block onClick={(e) => this.goToDevice(row.uniqueId)} color="primary">View</Button>)
    }];
    return(
        <ReactTable
          data={deviceList}
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

export default Devices

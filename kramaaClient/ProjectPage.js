import React, {Component} from "react";
import { BrowserRouter, Route, Link} from "react-router-dom";
import axios from "axios";

class ProjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: '',
      projectABI: '',
      projectAddress: '',
      totalSupply: '',
      deviceForm: '',
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.renderNewDeviceForm = this.renderNewDeviceForm.bind(this);
    this.mintTokenFormHandler = this.mintTokenFormHandler.bind(this);
  }

  mintTokenFormHandler(from, to, tokenURI) {
    axios.post('/api/projects/mintNewToken', {projectAddress: this.state.projectAddress, tokenIDFrom: from, tokenIDTo: to, tokenURI: tokenURI, clientToken: sessionStorage.getItem("clientToken")})
    .then(res => {
      console.log(res);
    })
  }

  renderNewDeviceForm() {
    this.setState({'deviceForm': <MintTokenForm parentHandler = {this.mintTokenFormHandler} totalSupply= {parseInt(this.state.totalSupply)+1}/>});
  }

  componentDidMount() {
    axios.post('/api/projects/getProjectInfo', {'projectID': this.props.match.params.projectID, clientToken: sessionStorage.getItem("clientToken")}).then(res => {
      console.log(res);
      this.setState({
        projectName: res.data.project.name,
        projectABI: res.data.project.tokenContractABI,
        projectAddress: res.data.project.tokenContractAddress,
        totalSupply: res.data.totalSupply
      })
    })
  }
  render(){
    const {projectName, projectABI, projectAddress, deviceForm, totalSupply} = this.state;
    return(
      <div>
        <Link to="/dashboard"><button>Back to Dashboard</button></Link><br />
        Your Project: {projectName} <br />
        Your Project Address: {projectAddress} <br />
        Total Tokens Minted : {totalSupply} <br />
        <button onClick= {this.renderNewDeviceForm}>Add new device </button> <br/>
        {deviceForm}
      </div>
    )
  }
}

class MintTokenForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      tokenIDTo: '',
      tokenURI: '',
      deviceType: 'RFID',
      deviceURNPrefix: '',
      deviceURNFromPostfix: '',
      deviceURNToPostfix: '',
      number: 0
    };
    this.setTokenCount = this.setTokenCount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    console.log("name", name, "value", value);
    this.setState({ [name]: value });
  }

  setTokenCount(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({tokenIDTo: this.props.totalSupply+parseInt(this.state.number)-1});
  }

  onSubmitForm(e) {
    e.preventDefault();
    this.props.parentHandler(
      this.props.totalSupply,
      this.state.tokenIDTo,
      this.state.tokenURI,
      this.state.deviceURNPrefix,
      this.state.deviceURNFromPostfix,
      this.state.deviceURNToPostfix
    )
  }

  render(){
    const {tokenIDTo, tokenURI, number, deviceType,deviceURNPrefix, deviceURNFromPostfix, deviceURNToPostfix} = this.state;
    return(
      <div>
      <form name="form">
        <label htmlFor="username">How many devices do you wish to register?</label>
        <input type="number" name="number" value= {number} onChange= {this.handleChange}/>
        <button className="btn btn-primary" onClick = {this.setTokenCount}>Generate</button>
        <label htmlFor="username">Token ID From</label>
        <input type="number" readOnly name="tokenIDFrom" value= {this.props.totalSupply} />
        <label htmlFor="username">To</label>
        <input type="number" name="tokenIDTo" value= {tokenIDTo} onChange={this.handleChange} /> <br/>
        <label htmlFor="username">Token URI</label>
        <input type="text" name="tokenURI" value= {tokenURI} onChange={this.handleChange} /> <br/>
        <label htmlFor="username">Device URN: From</label>
        <input type="text" name="deviceURNPrefix" value= {deviceURNPrefix} onChange={this.handleChange} />
        <input type="text" name="deviceURNFromPostfix" value= {deviceURNFromPostfix} onChange={this.handleChange} />
        <label htmlFor="username">To</label>
        <input type="text" name="deviceURNPrefix" value= {deviceURNPrefix} onChange={this.handleChange} />
        <input type="text" name="deviceURNToPostfix" value= {deviceURNToPostfix} onChange={this.handleChange} /> <br />
        <label htmlFor="username">Device Type</label>
        <select name= "deviceType" value= {deviceType} onChange={this.handleChange}>
          <option value="RFID">RFID</option>
          <option value="NFC">NFC</option>
          <option value="BLE">BLE</option>
          <option value="LORAWAN">LORAWAN</option>
          <option value="WIFI">WIFI</option>
          <option value="4G">4G</option>
          <option value="5G">5G</option>
        </select><br/>
        <button className="btn btn-primary" onClick = {this.onSubmitForm}>Register new device</button>
      </form>
      </div>
    )
  }
}

export default ProjectPage;

import React, { Component, Suspense } from 'react';
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Label, Input, FormText,Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import axios from "axios";

class RegisterDeviceModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      tokenIDTo: '',
      deviceType: 'RFID',
      deviceURN: '',
      number: 0,
      protocol: 'MQTT',
      registryID: '',
      sensor: '',
      selectedProject: '',
      isLoading: false,
      totalSupply: ''
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.fetchTokenSupply = this.fetchTokenSupply.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  loading = () => <div className="animated fadeIn pt-1 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  handleChange(e) {
    const { name, value } = e.target;
    console.log("name", name, "value", value);
    this.setState({ [name]: value });
    if(name== "selectedProject"){
      this.fetchTokenSupply(value);
      this.forceUpdate();
    }
    else if(name=="number"){
      this.setState({tokenIDTo: this.state.totalSupply+parseInt(value)-1});
    }
    this.forceUpdate();
  }

  fetchTokenSupply(projectName) {
    axios.post('/api/projects/getTokenSupply', { projectName: projectName})
    .then(res=> {
      this.setState({
        totalSupply: parseInt(res.data.totalSupply)+1
      })
    });
  }
  componentDidMount() {
    this.setState({
      totalSupply: this.props.totalSupply
    });
  }

  onSubmitForm(e) {
    e.preventDefault();
    this.props.parentHandler(
      this.state.totalSupply,
      this.state.tokenIDTo,
      {protocol: this.state.protocol, registryID: this.state.registryID, sensor: this.state.sensor},
      this.state.deviceURN,
      this.state.selectedProject
    )
  }

  render() {
    const {tokenIDTo, selectedProject, number,protocol, deviceType, registryID, sensor, deviceURN, isLoading, totalSupply} = this.state;
    let dropdownRender = [<option key= "" name= "" value="">Select Project</option>];
    let j;
    for(var i=0;i<this.props.projectList.length; i++){
      j= this.props.projectList[i];
      dropdownRender.push(<option key= {j} name= {j} value={j}>{j}</option>);
    }
    let button;
    if(!isLoading){
      button = <Button color="primary" onClick = {this.onSubmitForm} >Create Project</Button>;
    }
    else {
      button = <div className="sk-folding-cube">
        <div className="sk-cube1 sk-cube"></div>
        <div className="sk-cube2 sk-cube"></div>
        <div className="sk-cube4 sk-cube"></div>
        <div className="sk-cube3 sk-cube"></div>
      </div>;
    }

    return (
      <div className="animated fadeIn">
      <Suspense fallback={this.loading()}>
        <Row>
          <Col>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}><strong>New Device Registration </strong></ModalHeader>
              <ModalBody>
              <Form className="form-horizontal">
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Project Name</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" name= "selectedProject" value= {selectedProject} onChange={this.handleChange} id="select">
                      {dropdownRender}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Number of devices</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="number" name="number" value= {number} onChange={this.handleChange}  id="text-input" placeholder="Number of Devices" />
                    <FormText color="muted">How many devices do you wish to register?</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Device Blockchain ID From</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="number" name="tokenIDFrom" disabled readOnly value= {totalSupply} placeholder="Text" />
                    <FormText color="muted"></FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Device Blockchain ID To</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="number" name="tokenIDTo" readOnly value= {tokenIDTo} placeholder="Text" />
                    <FormText color="muted"></FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Device URN</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" name="deviceURN" value= {deviceURN} onChange={this.handleChange} id="text-input"  placeholder="Text" />
                    <FormText color="muted">Enter Device URN</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Registry ID</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" name="registryID" value= {registryID} onChange={this.handleChange} id="text-input"  placeholder="Text" />
                    <FormText color="muted">Enter Device Registry ID</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Sensor</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" name="sensor" value= {sensor} onChange={this.handleChange} id="text-input"  placeholder="Text" />
                    <FormText color="muted">Enter the sensor your device is using</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Select Device Type</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" name= "deviceType" value= {deviceType} onChange={this.handleChange} id="select">
                    <option value="RFID">RFID</option>
                    <option value="NFC">NFC</option>
                    <option value="BLE">BLE</option>
                    <option value="LORAWAN">LORAWAN</option>
                    <option value="WIFI">WIFI</option>
                    <option value="4G">4G</option>
                    <option value="5G">5G</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Select Protocol</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" name= "protocol" value= {protocol} onChange={this.handleChange} id="select">
                    <option value="MQTT">MQTT</option>
                    <option value="HTTP">HTTP</option>
                    </Input>
                  </Col>
                </FormGroup>
              </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick = {this.onSubmitForm} >Register new device</Button>
              </ModalFooter>
            </Modal>
          </Col>
        </Row>
      </Suspense>
      </div>
    );
  }
}

export default RegisterDeviceModal;

import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Label, Input, FormText,Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

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
      sensor: ''
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  handleChange(e) {
    const { name, value } = e.target;
    console.log("name", name, "value", value);
    this.setState({ [name]: value });
    if(name=="number"){
      this.setState({tokenIDTo: this.props.totalSupply+parseInt(value)-1});
    }
    this.forceUpdate();
  }

  onSubmitForm(e) {
    e.preventDefault();
    this.props.parentHandler(
      this.props.totalSupply,
      this.state.tokenIDTo,
      {protocol: this.state.protocol, registryID: this.state.registryID, sensor: this.state.sensor},
      this.state.deviceURN,
    )
  }

  render() {
    let projectName;
    console.log(this.props.projectName);
    if(this.props.projectName==null){
      projectName= "None";
    }
    else{
      projectName = this.props.projectName;
    }
    const {tokenIDTo, number,protocol, deviceType, registryID, sensor, deviceURN} = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
          <Card className="text-white bg-primary text-center">
            <CardBody onClick= {this.toggle}>
              <blockquote className="card-bodyquote">
                <p>Add new device</p>
                <footer>+<i className="cui-tablet icons font-2xl d-block mt-4"></i></footer>
              </blockquote>
            </CardBody>
          </Card>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}><strong>New Device Registration </strong></ModalHeader>
              <ModalBody>
              <Form className="form-horizontal">
                <FormGroup row>
                  <Col md="3">
                    <Label>Project Name</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <p className="form-control-static">{projectName}</p>
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
                    <Label htmlFor="text-input">Token ID From</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="number" name="tokenIDFrom" disabled value= {this.props.totalSupply} placeholder="Text" />
                    <FormText color="muted"></FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Token ID To</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="number" name="tokenIDTo" value= {tokenIDTo} placeholder="Text" />
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
      </div>
    );
  }
}

export default RegisterDeviceModal;

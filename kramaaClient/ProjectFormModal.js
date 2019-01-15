import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Label, Input, FormText,Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

class ProjectFormModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: '',
      description: '',
      tokenName: '',
      tokenSymbol: '',
      industry: '',
      subIndustry: '',
      subIndustryList: ''
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleIndustryChange = this.handleIndustryChange.bind(this);
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
  }

  handleIndustryChange(e) {
    const { name, value } = e.target;
    console.log("name", name, "value", value);
    this.setState({ [name]: value });
    switch(value){
      case "1": console.log("1");
                break;
    }
  }

  onSubmitForm(e) {
    e.preventDefault();
    this.props.parentHandler(this.state.name, this.state.industry, this.state.subIndustry, this.state.tokenName, this.state.tokenSymbol)
  }

  render() {
    const {name, description, industry, subIndustry, tokenName, tokenSymbol} = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
          <Card className="text-white bg-primary text-center">
            <CardBody onClick= {this.toggle}>
              <blockquote className="card-bodyquote">
                <p>Create new project</p>
                <footer>+<i className="cui-tablet icons font-2xl d-block mt-4"></i></footer>
              </blockquote>
            </CardBody>
          </Card>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}><strong>New Project Form</strong></ModalHeader>
              <ModalBody>
              <Form className="form-horizontal">
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Project Name</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" name="name" value= {name} onChange={this.handleChange}  id="text-input" placeholder="Text" />
                    <FormText color="muted">This is a help text</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Project Description</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" id="text-input" name="text-input" placeholder="Text" />
                    <FormText color="muted">Describe your project</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Token Name</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" name="tokenName" value= {tokenName} onChange={this.handleChange} id="text-input"  placeholder="Text" />
                    <FormText color="muted">This is a help text</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Token Symbol</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" name="tokenSymbol" value= {tokenSymbol} onChange={this.handleChange} id="text-input"  placeholder="Text" />
                    <FormText color="muted">This is a help text</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Select Industry</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" name="industry" value= {industry} onChange={this.handleIndustryChange} id="select">
                      <option value="0">Please select</option>
                      <option value="1">Smart City</option>
                      <option value="2">Building</option>
                      <option value="3">Energy</option>
                      <option value="4">Automobile</option>
                      <option value="5">Retail</option>
                      <option value="6">Healthcare</option>
                      <option value="7">Agriculture</option>
                      <option value="8">Supply Chain</option>
                      <option value="9">Industry</option>
                      <option value="10">Other</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Sub Industry</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" name="subIndustry" value= {subIndustry} onChange={this.handleChange} id="text-input" placeholder="Text" />
                    <FormText color="muted">This is a help text</FormText>
                  </Col>
                </FormGroup>
              </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick = {this.onSubmitForm} >Create Project</Button>
              </ModalFooter>
            </Modal>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProjectFormModal;

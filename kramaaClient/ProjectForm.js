import React, {Component, Suspense} from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';

class ProjectForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      description: '',
      tokenName: '',
      tokenSymbol: '',
      industry: '',
      subIndustry: '',
      subIndustryList: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleIndustryChange = this.handleIndustryChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }
  loading = () => <div className="animated fadeIn pt-1 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

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

  render(){
    const {name, description, industry, subIndustry, tokenName, tokenSymbol} = this.state;
    return(
      <div>
      <Row>
        <Col xs="12" md="6">
          <Card>
            <CardHeader>
              <strong>New Project Form</strong>
            </CardHeader>
            <CardBody>
            <Suspense fallback={this.loading()}>
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
            </Suspense>
            </CardBody>
            <CardFooter>
              <Button type="submit" onClick = {this.onSubmitForm} size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
      </div>
    )
  }
}

export default ProjectForm;

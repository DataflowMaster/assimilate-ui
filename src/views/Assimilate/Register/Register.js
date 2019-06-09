import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import {newUser} from "../../../functions/newUser";

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onClickRegister = this.onClickRegister.bind(this);
    this.state = {
      username: '',
      email : '',
      password: '',
      rpassword: '',
      name: '',
      lastname: ''
    };
  }
  handleChange(e){
    switch (e.target.id) {
      case ('username'):
        this.state.username = e.target.value;
        break;
      case 'email':
        this.state.email = e.target.value;
        break;
      case 'password':
        this.state.password = e.target.value;
        break;
      case 'rpassword':
        this.state.rpassword = e.target.value;
        break;
      case 'name':
        this.state.name = e.target.value;
        break;
      case 'lastname':
        this.state.lastname = e.target.value;
        break
    }
  }
  onClickRegister(){
    if(this.state.password === this.state.rpassword){
      newUser({
        username: this.state.username,
        email : this.state.email,
        password: this.state.password,
        name: this.state.name,
        lastname: this.state.lastname,
        institute : {
          id : 1
        }
      });
      this.props.history.push("/");
    }
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="username" onChange={this.handleChange} placeholder="username"  autoComplete="username" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="email" onChange={this.handleChange} placeholder="Email" autoComplete="email" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" id="password" onChange={this.handleChange} placeholder="Password" autoComplete="new-password" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" id="rpassword" onChange={this.handleChange} placeholder="Repeat password" autoComplete="new-password" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="name" onChange={this.handleChange} placeholder="Fist name" autoComplete="name" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="lastname" onChange={this.handleChange} placeholder="Last name" autoComplete="lastname" />
                    </InputGroup>
                    <Button color="success" onClick={this.onClickRegister}  block>Crear cuenta</Button>
                  </Form>
                </CardBody>
                {/*<CardFooter className="p-4">*/}
                {/*  <Row>*/}
                {/*    <Col xs="12" sm="6">*/}
                {/*      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>*/}
                {/*    </Col>*/}
                {/*    <Col xs="12" sm="6">*/}
                {/*      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>*/}
                {/*    </Col>*/}
                {/*  </Row>*/}
                {/*</CardFooter>*/}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;

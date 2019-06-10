import React, { Component } from 'react';
import {getMethods} from "../../../functions/getMethods";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row, Table, ModalHeader, ModalBody, ModalFooter, Modal,
} from 'reactstrap';
import {postMethod} from "../../../functions/postMethod";

const TableMethods = (props) =>{
  const methods = props.methods;
  const method = methods.map((method) =>
    <tr key={method.idmethods} >
      <td > {method.idmethods} </td>
      <td> {method.name} </td>
      <td> {method.observation} </td>
      <td>
        {/*<Button block outline color="dark" onClick={props.toggleModal} > Delete </Button>*/}
      </td>
    </tr>
  );
  return (
    <tbody>{method}</tbody>
  );
};

class Methods extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.saveMethod = this.saveMethod.bind(this);
    this.changeInput = this.changeInput.bind(this);

    this.state = {
      modalAdd: false,
      collapse: true,
      fadeIn: true,
      timeout: 300,
      isLoading: false,
      formMethod: "",
      formDes : ""
    };
    getMethods(this.props.user.token).then((res)=>{
      this.setState({ isLoading : true, methods : res});
    })
    console.log(this.state)
  }

  changeInput(e){
    if(e.target.id === "name"){
      this.state.formMethod = e.target.value
    }
    if(e.target.id === "description"){
      this.state.formDes= e.target.value
    }
  }
  saveMethod(){
    postMethod({
      name : this.state.formMethod,
      observation : this.state.formDes
    },this.props.user.token).then( ()=> {
      getMethods(this.props.user.token).then(res => {
        this.setState({ methods : res});
      });
      this.toggleModal();
    })
  }

  toggleModal() {
    this.setState({
      modalAdd: !this.state.modalAdd,
    });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {
    if(this.state.isLoading)
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
              <Card>
                <CardHeader>
                  <i className="icon-notebook-"></i>Methods
                  <div className="card-header-actions">
                    <Button color="link" className="card-header-action btn-plus" onClick={this.toggleModal}><i className="icon-plus"></i> Add</Button>
                    <Button color="link" className="card-header-action btn-minimize" data-target="#collapseExample" onClick={this.toggle}><i className="icon-arrow-up"></i></Button>
                    {/*<Button color="link" className="card-header-action btn-close" onClick={this.toggleFade}><i className="icon-close"></i></Button>*/}
                  </div>
                </CardHeader>
                <Collapse isOpen={this.state.collapse} id="collapseExample">
                  <CardBody>
                    <Modal isOpen={this.state.modalAdd} toggle={this.toggleModal} className={this.props.className}>
                      <ModalHeader toggle={this.toggleModal}>New Methods</ModalHeader>
                      <ModalBody>
                        <Form id="formMethod" >
                          <FormGroup>
                            <Label htmlFor="company" > Name </Label>
                            <Input type="text" id="name" onChange={this.changeInput} placeholder="Enter the name of the ability" />
                          </FormGroup>
                          <FormGroup>
                            <Label htmlFor="vat" > Description </Label>
                            <Input type="text" id="description" onChange={this.changeInput} placeholder="ability abstract" />
                          </FormGroup>
                        </Form>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={this.saveMethod}>Add new Method</Button>{' '}
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                      </ModalFooter>
                    </Modal>
                    <Table hover bordered striped responsive size="sm">
                      <thead>
                      <tr>
                        <th>id</th>
                        <th>Method</th>
                        <th>observation</th>
                        <th> </th>
                      </tr>
                      </thead>
                      < TableMethods methods={this.state.methods} />
                    </Table>
                  </CardBody>
                </Collapse>
              </Card>
            </Fade>
          </Col>
        </Row>
      </div>
    );
    else
      return (
        <div className="animated fadeIn pt-1 text-center">Loading...</div>
      )
  }
}

export default Methods;

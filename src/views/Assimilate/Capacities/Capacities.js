import React, { Component } from 'react';
import {getAbilities} from "../../../functions/getAbilities";
import {postAbility} from "../../../functions/postAbility";
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

// getAbilities();

  const TableCapacities = (props) =>{
    const abilities = props.abilities;
    const ability = abilities.map((ability) =>
      <tr key={ability.idability} >
        <td > {ability.idability} </td>
        <td> {ability.name} </td>
        <td> {ability.type} </td>
        <td>
          {/*<Button block outline color="dark" onClick={props.toggleModal} > Delete </Button>*/}
        </td>
      </tr>
    );
    return (
      <tbody>{ability}</tbody>
    );
  };

class Capacities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalAdd: false,
      collapse: true,
      fadeIn: true,
      timeout: 300,
      isLoading: false,
      formAbility : '',
      formType : ''
    };
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.saveAbility = this.saveAbility.bind(this);
    this.changeInput = this.changeInput.bind(this);

    getAbilities(this.props.user.token).then((res => {
      this.setState({ isLoading : true, abilities : res});
    }));

  }

  changeInput(e){
    if(e.target.id === "name")
      this.state.formAbility = e.target.value;
    if(e.target.id === "type")
      this.state.formType = e.target.value;
  }

  saveAbility(){
    postAbility({
      name: this.state.formAbility,
      type: this.state.formType
    },this.props.user.token).then(result =>{
      getAbilities(this.props.user.token).then((res => {
        this.setState({ abilities : res});
      }));
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
                  <i className="icon-rocket"></i>Capacities
                  <div className="card-header-actions">
                    <Button color="link" className="card-header-action btn-plus" onClick={this.toggleModal}><i className="icon-plus"></i> Add</Button>
                    <Button color="link" className="card-header-action btn-minimize" data-target="#collapseExample" onClick={this.toggle}><i className="icon-arrow-up"></i></Button>
                    {/*<Button color="link" className="card-header-action btn-close" onClick={this.toggleFade}><i className="icon-close"></i></Button>*/}
                  </div>
                </CardHeader>
                <Collapse isOpen={this.state.collapse} id="collapseExample">
                  <CardBody>
                    <Modal isOpen={this.state.modalAdd} toggle={this.toggleModal} className={this.props.className}>
                      <ModalHeader toggle={this.toggleModal}>Add Ability</ModalHeader>
                      <ModalBody>
                        <Form id="formCapacities" >
                          <FormGroup>
                            <Label htmlFor="company" > Name </Label>
                            <Input type="text" id="name" onChange={this.changeInput} placeholder="Enter the name of the ability" />
                          </FormGroup>
                          <FormGroup>
                            <Label htmlFor="vat" > Type </Label>
                            <Input type="text" id="type" onChange={this.changeInput} placeholder="ability abstract" />
                          </FormGroup>
                        </Form>
                      </ModalBody>
                      <ModalFooter>

                        <Button type="submit" color="primary" onClick={this.saveAbility} form="formCapacities" >Add new Capacity</Button>
                        <Button type="reset" color="secondary" onClick={this.toggleModal}>Cancel</Button>
                      </ModalFooter>
                    </Modal>
                    <Table hover bordered striped responsive size="sm">
                      <thead>
                      <tr >
                        <th>id</th>
                        <th>Capacity</th>
                        <th>Type</th>
                        <th> </th>
                      </tr>
                      </thead>
                      <TableCapacities abilities={this.state.abilities} />
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
      );
  }
}

export default Capacities;

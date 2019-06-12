import React, { Component } from 'react';
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
  Row, Table, ListGroupItem, ListGroup, ModalHeader, ModalBody, ModalFooter, Modal,
} from 'reactstrap';
import {getModules} from "../../../functions/getModules";
import {getAbilities} from "../../../functions/getAbilities";
import {postModule} from "../../../functions/postModule";

const TableModules = (props) =>{
  const modules = props.modules;
  const module = modules.map((module,index) =>
    <tr key={module.idmodules} >
      <td > {module.idmodules} </td>
      <td> {module.name} </td>
      <td> {module.descripcion} </td>
      <td>
        <ListGroup>
        {
          module.objectives.map((objective) =>
              <ListGroupItem key={objective.idability} className="justify-content-between" >
                {objective.name} | {objective.type} <Badge className="float-right" pill> {objective.degree_importance} </Badge>
              </ListGroupItem>
          )
        }
        </ListGroup>
      </td>
      <td>
        <Button id={index} block outline color="dark" onClick={props.clickDelete} > Delete </Button>
      </td>
    </tr>
  );
  return (
    <tbody>{module}</tbody>
  );
};


class Modules extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.saveModule = this.saveModule.bind(this);
    this.addCapacity = this.addCapacity.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.delCapacity = this.delCapacity.bind(this);
    this.clickDelete = this.clickDelete.bind(this);
    this.addDegreOfImportance = this.addDegreOfImportance.bind(this);
    this.state = {
      modalAdd: false,
      collapse: true,
      fadeIn: true,
      timeout: 300,
      isLoadingAbilities: false,
      isLoadinModule:false,
      abilitytoSave: []
    };

    getModules(this.props.user.token,this.props.user.idprofessor).then(res => {

      if(typeof  res.error === "undefined"){
        this.setState({ isLoadinModule:true, modules : res})
      }else{

        this.setState({ isLoadinModule:true, modules : []})
      }
    });
    getAbilities(this.props.user.token).then((res => {
      this.setState({ isLoadingAbilities : true, abilities : res});
    }));

  }

  changeInput(e){
    if(e.target.id === "name")
      this.setState({ name : e.target.value });
    if(e.target.id === "description")
      this.setState({ des : e.target.value });
  }

  addCapacity(e){
    let index = Number( e.target.value) - 1;
    let add = {
      ability_idability : e.target.value,
      text : e.target.options[index].text
    };
    let newvalue = this.state.abilitytoSave;
    newvalue.push(add);
    this.setState({
      abilitytoSave: newvalue
    })
  }

  addDegreOfImportance(e){
    this.state.abilitytoSave[e.target.id].degree_importance = e.target.value;
  }

  delCapacity(e){
    let del = this.state.abilitytoSave;
    del.splice(e.target.id,1);
    this.setState({
      abilitytoSave: del
    })
  }

  clickDelete(e){
    let del = this.state.modules;
    del.splice(e.target.id,1);
    this.setState({
      modules: del
    })
  }

  saveModule(){
    postModule({
      name : this.state.name,
      descripcion : this.state.des,
      professor_idprofessor : this.props.user.idprofessor,
      professor_institution_idCentroEstudio : this.props.user.idinstitucion,
      abilities: this.state.abilitytoSave
    },this.props.user.token).then(result => {

        getModules(this.props.user.token,this.props.user.idprofessor).then(res => {
          this.setState({ modules : res})
        });
        this.toggleModal()
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
    if(this.state.isLoadinModule && this.state.isLoadingAbilities)
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
              <Card>
                <CardHeader>
                  <i className="icon-layers"> </i> Modules
                  <div className="card-header-actions">

                    <Button color="link" className="card-header-action btn-plus" onClick={this.toggleModal}><i className="icon-plus"></i> Add</Button>
                    <Button color="link" className="card-header-action btn-minimize" data-target="#collapseExample" onClick={this.toggle}><i className="icon-arrow-up"></i></Button>
                    {/*<Button color="link" className="card-header-action btn-close" onClick={this.toggleFade}><i className="icon-close"></i></Button>*/}
                  </div>
                </CardHeader>
                <Collapse isOpen={this.state.collapse} id="collapseExample">
                  <CardBody>
                    <Modal isOpen={this.state.modalAdd} toggle={this.toggleModal} className={this.props.className}>
                      <ModalHeader toggle={this.toggleModal}>Add Module</ModalHeader>
                      <ModalBody>
                        <Form id="formCapacities" >
                          <FormGroup>
                            <Label htmlFor="company" > Name </Label>
                            <Input type="text" id="name" onChange={this.changeInput} placeholder="Enter the name of the method" />
                          </FormGroup>
                          <FormGroup>
                            <Label htmlFor="company" > Desciption </Label>
                            <Input type="text" id="description" onChange={this.changeInput} placeholder="Enter a description" />
                          </FormGroup>
                          <Card>
                            <CardBody>
                              <Table hover bordered striped responsive size="sm">
                                <thead>
                                <tr>
                                  <th>Ability</th>
                                  <th>degree_importance </th>
                                  <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                  this.state.abilitytoSave.map( (ability,index) =>
                                    <tr key={ability.ability_idability}>
                                      <th> {ability.text} </th>
                                      <th><Input  id={index} type="number" min="1" max="100" onChange={this.addDegreOfImportance} /></th>
                                      <th>  <i className="fa fa-window-close" id={index} onClick={this.delCapacity}> </i> </th>
                                    </tr>
                                  )
                                }
                                </tbody>
                              </Table>
                            </CardBody>
                          </Card>
                          <Input id='aby' type="select" onChange={this.addCapacity}>
                            {
                            this.state.abilities.map(ability =>
                              <option key={ability.idability} value={ability.idability}>{ability.name} | {ability.type}</option>
                            )
                          }
                          </Input>
                        </Form>
                      </ModalBody>
                      <ModalFooter>
                        <Button type="submit" color="primary" onClick={this.saveModule} form="formCapacities" >Add new Module</Button>
                        <Button type="reset" color="secondary" onClick={this.toggleModal}>Cancel</Button>
                      </ModalFooter>
                    </Modal>
                    <Table hover bordered striped responsive size="sm">
                      <thead>
                      <tr>
                        <th>id</th>
                        <th>Module</th>
                        <th>Descripción</th>
                        <th>Ability</th>
                        <th></th>
                      </tr>
                      </thead>
                      < TableModules
                        modules={this.state.modules}
                        details={this.state.detail}
                        showDetails={this.showDetails}
                        clickDelete={this.clickDelete}
                      />
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

export default Modules;

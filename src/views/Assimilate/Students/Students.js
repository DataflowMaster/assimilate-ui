import React, { Component } from 'react';
import {getStudents} from "../../../functions/getStudents";
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
  Row, Table, ButtonDropdown, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import {postStudent} from "../../../functions/postStudent";
import {getModules} from "../../../functions/getModules";

const TableStudents = (props) =>{
  const students = props.students;
  const student = students.map((student,index) =>
    <tr key={student.idstudent} >
      <td > {student.idstudent} </td>
      <td> {student.name} </td>
      <td> {student.lastname} </td>
      <td> {student.email} </td>
      <td> {student.phone} </td>
      <td> {student.observation} </td>
      <td>
        <Button id={index} block outline color="dark" onClick={props.clickDelete} > Delete </Button>
      </td>
    </tr>
  );
  return (
    <tbody>{student}</tbody>
  );
};

class Students extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.addModules = this.addModules.bind(this);
    this.saveStudent = this.saveStudent.bind(this);
    this.clickDelete = this.clickDelete.bind(this);

    this.state = {
      modalAdd: false,
      collapse: true,
      fadeIn: true,
      timeout: 300,
      isLoading: false,
      isLoadinModule:false,
      formName:'',
      forLastnam:'',
      formEmail:'',
      formPhone:0,
      formObs:'',
      formModule:0,
      students:[]
    };

    getStudents(this.props.user.token,this.props.user.idprofessor).then( res => {
      console.log(res,"student")
      this.setState({ isLoading : true, students : res});
    })
    getModules(this.props.user.token,this.props.user.idprofessor).then(res => {
      if(typeof  res.error === "undefined")
        this.setState({ isLoadinModule:true, modules : res})
      else
        this.setState({ isLoadinModule:true, modules : []})
    });

  }

  changeInput(e){
    if(e.target.id === "name")
      this.state.formName = e.target.value
    if(e.target.id === "lastname")
      this.state.forLastnam = e.target.value
    if(e.target.id === "email")
      this.state.formEmail = e.target.value
    if(e.target.id === "phone")
      this.state.formPhone = e.target.value
    if(e.target.id === "observation")
      this.state.formObs = e.target.value
  }

  saveStudent(){
    postStudent({
      name : this.state.formName,
      lastname : this.state.forLastnam,
      email : this.state.formEmail,
      phone : this.state.formPhone,
      observation : this.state.formObs,
      modules_idmodules: this.state.formModule,
      modules_professor_idprofessor: this.props.user.idprofessor,
      modules_professor_institution_idCentroEstudio:this.props.user.idinstitucion

    },this.props.user.token).then( ()=> {
      getStudents(this.props.user.token,this.props.user.idprofessor).then(res => {
        this.setState({ students : res});
      });
      this.toggleModal();
    })
  }
  addModules(e){
    this.setState({
      formModule : e.target.value
    })
  }

  clickDelete(e){
    let del = this.state.students;
    del.splice(e.target.id,1);
    this.setState({
      students: del
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
    if (this.state.isLoading && this.state.isLoadinModule)
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
              <Card>
                <CardHeader>
                  <i className="icon-people"></i> Students
                  <div className="card-header-actions">
                    <Button color="link" className="card-header-action btn-plus" onClick={this.toggleModal}><i className="icon-plus"></i> Add</Button>
                    <Button color="link" className="card-header-action btn-minimize" data-target="#collapseExample" onClick={this.toggle}><i className="icon-arrow-up"></i></Button>
                    {/*<Button color="link" className="card-header-action btn-close" onClick={this.toggleFade}><i className="icon-close"></i></Button>*/}
                  </div>
                </CardHeader>
                <Collapse isOpen={this.state.collapse} id="collapseExample">
                  <CardBody>
                    <Modal isOpen={this.state.modalAdd} toggle={this.toggleModal} className={this.props.className}>
                      <ModalHeader toggle={this.toggleModal}>New Student</ModalHeader>
                      <ModalBody>
                        <Form id="formstudent" >
                          <FormGroup>
                            <Label htmlFor="company" > Name </Label>
                            <Input type="text" id="name" onChange={this.changeInput} placeholder="Name" />
                          </FormGroup>
                          <FormGroup>
                            <Label htmlFor="vat" > LastName </Label>
                            <Input type="text" id="lastname" onChange={this.changeInput} placeholder="LastName" />
                          </FormGroup>
                          <FormGroup>
                            <Label htmlFor="vat" > Email </Label>
                            <Input type="email" id="email" onChange={this.changeInput} placeholder="Email" />
                          </FormGroup>
                          <FormGroup>
                            <Label htmlFor="vat" > Phone </Label>
                            <Input type="number" id="phone" onChange={this.changeInput} placeholder="Phone" />
                          </FormGroup>
                          <FormGroup>
                            <Label htmlFor="vat" > Observation </Label>
                            <Input type="text" id="observation" onChange={this.changeInput} placeholder="Observation" />
                          </FormGroup>
                          <FormGroup>
                            <Label htmlFor="vat" > Modules </Label>
                            <Input id="modules" type="select" onChange={this.addModules} name="modules">
                              <option >Select ... </option>
                              {
                                this.state.modules.map((module) =>
                                  <option key={module.idmodules} value={module.idmodules}>{module.name} </option>
                                )
                              }
                            </Input>
                          </FormGroup>
                        </Form>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={this.saveStudent}>Add new Student</Button>{' '}
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                      </ModalFooter>
                    </Modal>
                    <Table hover bordered striped responsive size="sm">
                      <thead>
                      <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>lastname</th>
                        <th>email</th>
                        <th>phone</th>
                        <th>observation</th>
                        <th> </th>
                      </tr>
                      </thead>
                      < TableStudents students={this.state.students}  clickDelete={this.clickDelete} />
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

export default Students;

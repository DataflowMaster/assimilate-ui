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

const TableStudents = (props) =>{
  const students = props.students;
  const student = students.map((student) =>
    <tr key={student.idstudent} >
      <td > {student.idstudent} </td>
      <td> {student.name} </td>
      <td> {student.lastname} </td>
      <td> {student.email} </td>
      <td> {student.phone} </td>
      <td> {student.observation} </td>
      <td>
        <Button block outline color="dark" onClick={props.toggleModal} > Delete </Button>
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
    this.state = {
      modalAdd: false,
      collapse: true,
      fadeIn: true,
      timeout: 300,
      isLoading: false
    };

    getStudents(this.props.user.token,this.props.user.idprofessor).then( res => {
      this.setState({ isLoading : true, students : res});
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
    if (this.state.isLoading)
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
                      <ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
                      <ModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={this.toggleModal}>Add new Student</Button>{' '}
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
                      < TableStudents students={this.state.students}  />
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

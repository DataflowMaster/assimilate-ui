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
  Row, Table, ListGroupItem, ListGroup,
} from 'reactstrap';
import {getModules} from "../../../functions/getModules";

const TableModules = (props) =>{
  const modules = props.modules;
  const module = modules.map((module) =>

    <tr key={module.idability} >
      <td > {module.idability} </td>
      <td> {module.module} </td>
      <td> {module.descripcion} </td>
      <td>
        <ListGroup>
        <ListGroupItem className="justify-content-between">Cras justo odio <Badge className="float-right" pill>14</Badge></ListGroupItem>
        <ListGroupItem className="justify-content-between">Dapibus ac facilisis in <Badge className="float-right" pill>2</Badge></ListGroupItem>
        <ListGroupItem className="justify-content-between">Morbi leo risus <Badge className="float-right" pill
                                                                                  color="warning">1</Badge></ListGroupItem>
        </ListGroup>
      </td>
      <td>
        <Button block outline color="dark" onClick={props.toggleModal} > Update </Button>
        <Button block outline color="dark" onClick={props.toggleModal} > Delete </Button>
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

    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      isLogin: false
    };
    getModules(this.props.user.token,this.props.user.idprofessor).then(res => {
      this.setState({ isLoading : true, modules : res})
    })
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
                  <i className="icon-layers"></i>Modules
                  <div className="card-header-actions">
                    <Button color="link" className="card-header-action btn-plus" onClick={this.renderAbilites}><i className="icon-plus"></i> Add</Button>
                    <Button color="link" className="card-header-action btn-minimize" data-target="#collapseExample" onClick={this.toggle}><i className="icon-arrow-up"></i></Button>
                    {/*<Button color="link" className="card-header-action btn-close" onClick={this.toggleFade}><i className="icon-close"></i></Button>*/}
                  </div>
                </CardHeader>
                <Collapse isOpen={this.state.collapse} id="collapseExample">
                  <CardBody>
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

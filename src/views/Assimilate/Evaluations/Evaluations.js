import React, { Component, lazy, Suspense } from 'react';
import {Bar, Line, Radar} from 'react-chartjs-2';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import {getEvaluations} from "../../../functions/getEvaluations";
import {getModules} from "../../../functions/getModules";
import {getEvaluationObjectives} from "../../../functions/getEvaluationObjectives";
import {getStudents} from "../../../functions/getStudents";
import {getMethods} from "../../../functions/getMethods";
import {postEvaluation} from "../../../functions/postEvaluation";

const Widget03 = lazy(() => import('../../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

// Card Chart 1
const cardChartData1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandPrimary,
      borderColor: 'rgba(255,255,255,.55)',
      data: [65, 59, 84, 84, 51, 55, 40],
    },
  ],
};

const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}


// Card Chart 2
const cardChartData2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandInfo,
      borderColor: 'rgba(255,255,255,.55)',
      data: [1, 18, 9, 17, 34, 22, 11],
    },
  ],
};

const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 3
const cardChartData3 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40],
    },
  ],
};

const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 4
const cardChartData4 = {
  labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.3)',
      borderColor: 'transparent',
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
    },
  ],
};

const cardChartOpts4 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
        barPercentage: 0.6,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
};

// Social Box Chart
const socialBoxData = [
  { data: [65, 59, 84, 84, 51, 55, 40], label: 'facebook' },
  { data: [1, 13, 9, 17, 34, 41, 38], label: 'twitter' },
  { data: [78, 81, 80, 45, 34, 12, 40], label: 'linkedin' },
  { data: [35, 23, 56, 22, 97, 23, 64], label: 'google' },
];

const makeSocialBoxData = (dataSetNo) => {
  const dataset = socialBoxData[dataSetNo];
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        backgroundColor: 'rgba(255,255,255,.1)',
        borderColor: 'rgba(255,255,255,.55)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const socialChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

// sparkline charts
const sparkLineChartData = [
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: 'New Clients',
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Recurring Clients',
  },
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: 'Pageviews',
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Organic',
  },
  {
    data: [78, 81, 80, 45, 34, 12, 40],
    label: 'CTR',
  },
  {
    data: [1, 13, 9, 17, 34, 41, 38],
    label: 'Bounce Rate',
  },
];

const makeSparkLineData = (dataSetNo, variant) => {
  const dataset = sparkLineChartData[dataSetNo];
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        backgroundColor: 'transparent',
        borderColor: variant ? variant : '#c2cfd6',
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const sparklineChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
  legend: {
    display: false,
  },
};

// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

const mainChart = {
  labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data1,
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'transparent',
      borderColor: brandSuccess,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data2,
    },
    {
      label: 'My Third dataset',
      backgroundColor: 'transparent',
      borderColor: brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5],
      data: data3,
    },
  ],
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'ability_idability',
    position: 'nearest',
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250,
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

const radar = {
  labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(179,181,198,0.2)',
      borderColor: 'rgba(179,181,198,1)',
      pointBackgroundColor: 'rgba(179,181,198,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(179,181,198,1)',
      data: [65, 59, 90, 81, 56, 55, 40],
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      data: [28, 48, 40, 19, 96, 27, 100],
    },
  ],
};
class Info extends Component{
  constructor(props){
    super(props);
    this.state = {
      idevaluation : 0,
      observation : '',
      objectives:[]
    }
  }
  render() {
    return () =>
      <div className="avatar"
           onClick={this.props.showFullInfo}
        // data-idevaluation={evaluation.idevaluations}
        // data-obsMethod={evaluation.observation}
        // data-objectives={evaluation.objectives}
      >
        <img src={'assets/img/avatars/1.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
      </div>
  }
}

const TableEvaluation = (props) => {
  const evaluations = props.evaluations;
  const evaluation = evaluations.map((evaluation) =>
    <tr key={evaluation.idevaluations} onClick={() => props.showFullInfo(evaluation)}>
      <td className="text-center">
        <div className="avatar">
          <img src={'assets/img/avatars/1.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
        </div>
      </td>
      <td>
        <div>{evaluation.student} {evaluation.lastname} </div>
        <div className="small text-muted">
          <span> {evaluation.obsStudent} </span>
        </div>
      </td>
      <td>
        <span>{evaluation.module }</span>
      </td>
      <td>
        <div className="clearfix">
          <div className="float-left">
            <strong>60%</strong>
          </div>
          <div className="float-right">
            <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
          </div>
        </div>
        <Progress className="progress-xs" color="success" value="60" />
      </td>
      <td className="text-center">
        {evaluation.method}
      </td>
      <td className="text-center">
        {
          (evaluation.state === 1)&& <sup className="px-1"><Badge pill color="danger">&nbsp;</Badge></sup> ||
          (evaluation.state === 2)&& <sup className="px-1"><Badge pill color="success">&nbsp;</Badge></sup>  ||
          (evaluation.state === 0)&& <sup className="px-1"><Badge pill color="secondary">&nbsp;</Badge></sup>
        }
      </td>
      <td>
        <div className="small text-muted">Date of creation</div>
        <strong>{convertDatetime (evaluation.date)}</strong>
      </td>
    </tr>
  );
  return (
    <tbody>{evaluation}</tbody>
  )
};

function convertDatetime(date){
  let aux = new Date(date);
  let months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  return aux.getFullYear() + " de " + months[aux.getMonth()] + " de " + aux.getDate()
}

class Evaluations extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.showFullInfo = this.showFullInfo.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.addModules = this.addModules.bind(this);
    this.saveNewEvaluation = this.saveNewEvaluation.bind(this);
    this.addCapacity = this.addCapacity.bind(this);
    this.delCapacity = this.delCapacity.bind(this);
    this.addMethod = this.addMethod.bind(this);
    this.addStudents = this.addStudents.bind(this);
    this.state = {
      modalAdd: false,
      dropdownOpen: false,
      radioSelected: 2,
      isLoading: false,
      isLoadinModule: false,
      isLoadingStudent:false,
      isLoadingMethods:false,
      selectRowEvaluation: {},
      formModule: [],
      repEvaluationObjectives:[],
      abilitytoSave: [],
      formMethod : 0,
      formStudent : 0,
      saveModule:0
    }
    getEvaluations(this.props.user.token,this.props.user.idprofessor).then( res => {
      if(typeof res.error === "undefined")
        this.setState({ isLoading : true, evaluations : res, selectRowEvaluation : res[0] });
      else
        this.setState({ isLoading : true, evaluations : []});
    })
    getModules(this.props.user.token,this.props.user.idprofessor).then(res => {
      if(typeof  res.error === "undefined")
        this.setState({ isLoadinModule:true, modules : res})
      else
        this.setState({ isLoadinModule:true, modules : []})
    });
    getStudents(this.props.user.token,this.props.user.idprofessor).then( res => {
      this.setState({ isLoadingStudent : true, students : res});
    })
    getMethods(this.props.user.token).then((res)=>{
      this.setState({ isLoadingMethods : true, methods : res});
    })
    console.log(props)
  }
  saveNewEvaluation(){
    let today = new Date()
    let mounth = (today.getMonth() + 1);
    let ev = {
      date : today.getFullYear()+"-"+mounth+"-"+today.getDate() ,
      state : 1,
      methods_idmethods : this.state.formMethod,
      student_idstudent : this.state.formStudent,
      withObjectives :  []
    }

    this.state.abilitytoSave.map( abilities => {
      ev.withObjectives.push({
        objectives_modules_idmodules : this.state.saveModule,
        objectives_modules_professor_idprofessor: this.props.user.idprofessor,
        objectives_modules_pro_ins_idCentroEstudio: this.props.user.idinstitucion,
        objectives_ability_idability: abilities.ability_idability,
        score : 0.0
      })
    })
    postEvaluation(ev,this.props.user.token).then( ()=>{
      getEvaluations(this.props.user.token,this.props.user.idprofessor).then( res => {
        if(typeof res.error === "undefined")
          this.setState({ isLoading : true, evaluations : res, selectRowEvaluation : res[0] });
        else
          this.setState({ isLoading : true, evaluations : []});
        this.toggleModal();
      })
    })
    console.log(ev)
  }
  addMethod(e){
    this.setState({
      formMethod : e.target.value
    })
  }
  addStudents(e){
    this.setState({
      formStudent : e.target.value
    })
  }
  delCapacity(e){
    let del = this.state.abilitytoSave;
    del.splice(e.target.id,1);
    this.setState({
      abilitytoSave: del
    })
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
  addModules(e){
    this.state.modules.map( module => {
      if(module.idmodules === Number(e.target.value) ){
        this.setState({
          formModule : module.objectives
        })
      }
    });
    this.state.saveModule = e.target.value;
    getEvaluationObjectives(this.props.user.token, e.target.value ).then( eo => {
      this.setState({
        repEvaluationObjectives : eo
      })
    })

  }

  showFullInfo(e){
    this.setState( {
      selectRowEvaluation : e
    });
    console.log(e)
  }
  toggleModal() {
    this.setState({
      modalAdd: !this.state.modalAdd,
    });
  }
  toggle(){
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  render() {
    if(this.state.isLoading && this.state.isLoadinModule && this.state.isLoadingStudent && this.state.isLoadingMethods)
    return (
      <div className="animated fadeIn">
        {/*<Row>*/}
        {/*  <Col xs="12" sm="6" lg="3">*/}
        {/*    <Card className="text-white bg-info">*/}
        {/*      <CardBody className="pb-0">*/}
        {/*        <ButtonGroup className="float-right">*/}
        {/*          <ButtonDropdown id='card1' isOpen={this.state.card1} toggle={() => { this.setState({ card1: !this.state.card1 }); }}>*/}
        {/*            <DropdownToggle caret className="p-0" color="transparent">*/}
        {/*              <i className="icon-settings"></i>*/}
        {/*            </DropdownToggle>*/}
        {/*            <DropdownMenu right>*/}
        {/*              <DropdownItem>Action</DropdownItem>*/}
        {/*              <DropdownItem>Another action</DropdownItem>*/}
        {/*              <DropdownItem disabled>Disabled action</DropdownItem>*/}
        {/*              <DropdownItem>Something else here</DropdownItem>*/}
        {/*            </DropdownMenu>*/}
        {/*          </ButtonDropdown>*/}
        {/*        </ButtonGroup>*/}
        {/*        <div className="text-value">9.823</div>*/}
        {/*        <div>Members online</div>*/}
        {/*      </CardBody>*/}
        {/*      <div className="chart-wrapper mx-3" style={{ height: '70px' }}>*/}
        {/*        <Line data={cardChartData2} options={cardChartOpts2} height={70} />*/}
        {/*      </div>*/}
        {/*    </Card>*/}
        {/*  </Col>*/}

        {/*  <Col xs="12" sm="6" lg="3">*/}
        {/*    <Card className="text-white bg-primary">*/}
        {/*      <CardBody className="pb-0">*/}
        {/*        <ButtonGroup className="float-right">*/}
        {/*          <Dropdown id='card2' isOpen={this.state.card2} toggle={() => { this.setState({ card2: !this.state.card2 }); }}>*/}
        {/*            <DropdownToggle className="p-0" color="transparent">*/}
        {/*              <i className="icon-location-pin"></i>*/}
        {/*            </DropdownToggle>*/}
        {/*            <DropdownMenu right>*/}
        {/*              <DropdownItem>Action</DropdownItem>*/}
        {/*              <DropdownItem>Another action</DropdownItem>*/}
        {/*              <DropdownItem>Something else here</DropdownItem>*/}
        {/*            </DropdownMenu>*/}
        {/*          </Dropdown>*/}
        {/*        </ButtonGroup>*/}
        {/*        <div className="text-value">9.823</div>*/}
        {/*        <div>Members online</div>*/}
        {/*      </CardBody>*/}
        {/*      <div className="chart-wrapper mx-3" style={{ height: '70px' }}>*/}
        {/*        <Line data={cardChartData1} options={cardChartOpts1} height={70} />*/}
        {/*      </div>*/}
        {/*    </Card>*/}
        {/*  </Col>*/}

        {/*  <Col xs="12" sm="6" lg="3">*/}
        {/*    <Card className="text-white bg-warning">*/}
        {/*      <CardBody className="pb-0">*/}
        {/*        <ButtonGroup className="float-right">*/}
        {/*          <Dropdown id='card3' isOpen={this.state.card3} toggle={() => { this.setState({ card3: !this.state.card3 }); }}>*/}
        {/*            <DropdownToggle caret className="p-0" color="transparent">*/}
        {/*              <i className="icon-settings"></i>*/}
        {/*            </DropdownToggle>*/}
        {/*            <DropdownMenu right>*/}
        {/*              <DropdownItem>Action</DropdownItem>*/}
        {/*              <DropdownItem>Another action</DropdownItem>*/}
        {/*              <DropdownItem>Something else here</DropdownItem>*/}
        {/*            </DropdownMenu>*/}
        {/*          </Dropdown>*/}
        {/*        </ButtonGroup>*/}
        {/*        <div className="text-value">9.823</div>*/}
        {/*        <div>Members online</div>*/}
        {/*      </CardBody>*/}
        {/*      <div className="chart-wrapper" style={{ height: '70px' }}>*/}
        {/*        <Line data={cardChartData3} options={cardChartOpts3} height={70} />*/}
        {/*      </div>*/}
        {/*    </Card>*/}
        {/*  </Col>*/}

        {/*  <Col xs="12" sm="6" lg="3">*/}
        {/*    <Card className="text-white bg-danger">*/}
        {/*      <CardBody className="pb-0">*/}
        {/*        <ButtonGroup className="float-right">*/}
        {/*          <ButtonDropdown id='card4' isOpen={this.state.card4} toggle={() => { this.setState({ card4: !this.state.card4 }); }}>*/}
        {/*            <DropdownToggle caret className="p-0" color="transparent">*/}
        {/*              <i className="icon-settings"></i>*/}
        {/*            </DropdownToggle>*/}
        {/*            <DropdownMenu right>*/}
        {/*              <DropdownItem>Action</DropdownItem>*/}
        {/*              <DropdownItem>Another action</DropdownItem>*/}
        {/*              <DropdownItem>Something else here</DropdownItem>*/}
        {/*            </DropdownMenu>*/}
        {/*          </ButtonDropdown>*/}
        {/*        </ButtonGroup>*/}
        {/*        <div className="text-value">9.823</div>*/}
        {/*        <div>Members online</div>*/}
        {/*      </CardBody>*/}
        {/*      <div className="chart-wrapper mx-3" style={{ height: '70px' }}>*/}
        {/*        <Bar data={cardChartData4} options={cardChartOpts4} height={70} />*/}
        {/*      </div>*/}
        {/*    </Card>*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="icon-graph"></i> Evaluations - {this.state.selectRowEvaluation.method}
                <div className="card-header-actions">
                  <Button color="link" className="card-header-action btn-plus" onClick={this.toggleModal}><i className="icon-plus"></i> Add</Button>
                  <Button color="link" className="card-header-action btn-plus" onClick={this.renderAbilites}><i className="icon-graph"></i> Evaluate </Button>
                  {/*<Button color="link" className="card-header-action btn-close" onClick={this.toggleFade}><i className="icon-close"></i></Button>*/}
                </div>
              </CardHeader>
              <CardBody>
                <Modal isOpen={this.state.modalAdd} toggle={this.toggleModal} className={this.props.className}>
                  <ModalHeader toggle={this.toggleModal}>New Evaluationst</ModalHeader>
                  <ModalBody>
                    <Form id="formevaluation" >
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
                      <FormGroup>
                        <Label htmlFor="vat" > Students </Label>
                        <Input id="modules" type="select" onChange={this.addStudents} name="modules">
                          <option >Select ... </option>
                          {
                            this.state.students.map((student) =>
                              <option key={student.idstudent} value={student.idstudent}>{student.name} {student.lastname} | {student.phone} </option>
                            )
                          }
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="vat" > Abilities </Label>
                        <Card>
                          <CardBody>
                            <Table hover bordered striped responsive size="sm">
                              <thead>
                              <tr>
                                <th>Ability</th>
                                <th></th>
                              </tr>
                              </thead>
                              <tbody>
                              {
                                this.state.abilitytoSave.map( (ability,index) =>
                                  <tr key={ability.ability_idability}>
                                    <th> {ability.text} </th>
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
                            this.state.formModule.map(obj =>
                              <option key={obj.idability} value={obj.idability}>{obj.name} | {obj.type}</option>
                            )
                          }
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="vat" > Methods </Label>
                        <Input id="methods" type="select" onChange={this.addMethod} name="modules">
                          <option >Select ... </option>
                          {
                            this.state.methods.map((method) =>
                                <option key={method.idmethods} value={method.idmethods}>{method.name} </option>
                            )
                          }
                        </Input>
                      </FormGroup>
                    </Form>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.saveNewEvaluation}>Add new Evaluation</Button>{' '}
                    <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                  </ModalFooter>
                </Modal>
                <Row>
                  <Col xs="12" md="6" xl="6">
                    <hr className="mt-0" />
                    {this.state.selectRowEvaluation.objectives.map( e =>
                      <div key={e.idability} className="progress-group mb-4">
                        <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          {e.name}
                        </span>
                        </div>
                        <div className="progress-group-bars">
                          <Progress className="progress-xs" color="info" value="0" />
                          <Progress className="progress-xs" color="danger" value={e.score} />
                        </div>
                      </div>
                    )}
                  </Col>
                  <Col xs="12" md="6" xl="6">
                    <br/>
                    <hr className="mt-0" />
                    <ul>
                      <h5> {this.state.selectRowEvaluation.student} {this.state.selectRowEvaluation.lastname}</h5>
                      <hr className="mt-0" />
                      <div className="chart-wrapper">
                        <Radar data={radar} />
                      </div>
                      <br/>
                      <hr className="mt-0" />
                      <h6>Description of method:</h6>
                      <p> {this.state.selectRowEvaluation.observation} </p>
                    </ul>
                  </Col>
                </Row>
                <br />
                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                  <tr>
                    <th className="text-center"><i className="icon-people"></i></th>
                    <th>Student</th>
                    <th className="text-center">Module</th>
                    <th>Degree of achievement</th>
                    <th className="text-center">Method</th>
                    <th className="text-center">State</th>
                    <th>Date Activity</th>
                  </tr>
                  </thead>
                  <TableEvaluation evaluations={this.state.evaluations} showFullInfo={this.showFullInfo} />
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
    else
      return(
        <div className="animated fadeIn pt-1 text-center">Loading...</div>
      )
  }
}

export default Evaluations;

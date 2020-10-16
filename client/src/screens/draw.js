import React from 'react'
import {Container, Row, Col, Button, Form} from  'react-bootstrap'
import CanvasDraw from 'react-canvas-draw'
import {HuePicker} from 'react-color'

import API from '../API'

class DrawScreen extends React.Component {
    state = {
        color: "#ff0000",
        secondColor: "#ff0000",
        eraser: false,
        brushRadius: 10,
        height: 500,
        width: 500
      };
	constructor(props){
		super(props)
        this.state = {appear: true}
        this.form = React.createRef()
        this.onFormSubmit = this.onFormSubmit.bind(this)
	}

	componentDidMount(){
        console.log('hi')
	}

	componentWillUnmount(){
		console.log('bye')
	}

    handleChangeComplete = (colors) =>{
        this.setState({color:colors.hex, secondColor:colors.hex});
    };

    async onFormSubmit(e){
		e.preventDefault()
		const [name, title] = ['name', 'title'].map((name) => document.getElementById(name).value)
		const content = this.saveableCanvas.getSaveData()
		let response = await API.submit_drawing(name, title, content)
	}
	render(){
        let eraserText = 'Erase'
        if (this.state.eraser)
        eraserText ='Draw'

		return (
			<Container>
				<Row>
                <Col><h1 id="title-string">Draw</h1></Col>
				</Row>
                
				<Row>
                    <Col>
                    </Col>
                    <Col>
                    <div>
                    <HuePicker
                    color={this.state.color}
                    onChangeComplete={this.handleChangeComplete}
                   />
                    </div>
                    </Col>
                    <Col>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <div className= "classNames tools">
                    
                    <Button 
                        style={{
                            position: "absolute",left:"85px",top:"0px"
                          }}
                        onClick={() => {
                        this.setState({eraser: !this.state.eraser}, () => {
                            if (this.state.eraser)
                            this.setState({color: '#ffffff'})
                            else this.setState({ color: this.state.secondColor})

                        })}}
                        >
                    {eraserText}
                    </Button>

                    <Button variant="success"
                    style={{
                        position: "absolute",left:"-100px",top:"0px"
                      }}
                        onClick={() => {
                        localStorage.setItem(
                            "savedDrawing",
                            this.saveableCanvas.getSaveData()
                        );
                        }}
                    >
                        Save
                    </Button>
                    <Button variant="danger"
                    style={{
                        position: "absolute",left:"-40px",top:"0px"
                      }}
                        onClick={() => {
                        this.saveableCanvas.clear();
                        }}
                    >
                        Clear
                    </Button>
                    <Button variant="warning"
                    style={{
                        position: "absolute",left:"23px",top:"0px"
                      }}
                        onClick={() => {
                        this.saveableCanvas.undo();
                        }}
                    >
                        Undo
                    </Button>
                    
                    <div>
                        <div class="text"> 
                        Brush-Radius:
                        </div>

                        <input
                        type="range"
                        min="1"
                        max="50"
                        class="custom-range"
                        value={this.state.brushRadius}
                        onChange={e =>
                            this.setState({ brushRadius: parseInt(e.target.value, 10) })
                        }
                        style={{
                            position: "absolute",left:"-110px",top:"100px"
                          }}
                        />
                    </div>
                   <div class="form-group">
                        <Form className="form-group" ref={this.form} onSubmit={this.onFormSubmit}>
                        <h3>Publish Drawing</h3>
                        <div class="name">
                            <Form.Group controlId="name">
                            <Form.Label className="required">Your Name</Form.Label>
                            <Form.Control type="text" name="name" required/>
                        </Form.Group>
                        </div>
                        <div class="title">
                             <Form.Group controlId="title">
                            <Form.Label className="required">Drawing Title</Form.Label>
                            <Form.Control type="text" name="title" required />
                        </Form.Group>
                        </div>
                        <Form.Check 
                            type="switch"
                            id="custom-switch"
                            type="submit"
                            label="Check this switch"
                        />


                    </Form>
                   </div>
                   
                    </div>
                    </Col>
               
                    <Col className="text-center">
						<CanvasDraw ref={canvasDraw => (this.canvas = canvasDraw)} className="shadow-lg draw-canvas" hideGrid={true}
                        ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                        brushColor={this.state.color}
                        brushRadius={this.state.brushRadius}
                        canvasHeight={this.state.height}
                        canvasWidth={this.state.width}
                        style={{
                            position: "absolute",left:"-20px",top:"0px"
                          }}
                        />
					</Col>

                    <Col>
                    <Button variant = "success"
                    style={{
                        position: "absolute",left:"325px",top:"-50px"
                      }}
                    onClick={() => {
                        this.loadableCanvas.loadSaveData(
                        localStorage.getItem("savedDrawing")
                        );
                    }}
                    >
                    Playback of Saved Drawing
                    </Button>
                    <CanvasDraw ref={canvasDraw => (this.canvas = canvasDraw)} className="shadow-lg draw-canvas" hideGrid={true}
                    disabled
                    ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
                    saveData={localStorage.getItem("savedDrawing")}
                    style={{
                        position: "absolute",left:"215px",top:"0px"
                      }}
                    />
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                
                </Row>
			</Container>
		)
	}

}

export default DrawScreen
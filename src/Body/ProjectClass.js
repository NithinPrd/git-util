import { Button, Checkbox, Col, Divider, List, Row } from "antd";
import axios from "axios";
import React from "react";

class ProjectClass extends React.Component {

    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            isLoading: true,
            changesData: "",
            branchData: "",
            newStages: [],
            newUnstages: [],
            location: this.props.path
        }
    }

    componentDidMount() {
        this.getBranches()
        this.getChanges()
    }

    getChanges = () => 
        axios.post(
            process.env.REACT_APP_BRANCHCHANGES_URL,
            { path: this.state.location },
            { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
        ).then((response) => {
            console.log(response)
            this.setState({changesData: response.data, isLoading: false})
        }).catch(err => console.log(err))

    getBranches = () => 
        axios.post(
            process.env.REACT_APP_BRANCHDATA_URL,
            { path: this.state.location },
            { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
        ).then((response) => {
            console.log(response)
            this.setState({branchData: response.data, isLoading: false})
        }).catch(err => console.log(err))

    stageChanges = () => {
        axios.post(
            process.env.REACT_APP_STAGECHANGES_URL,
            { path: this.state.location },
            { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
        ).then((response) => {
            console.log(response)
            this.setState({changesData: response.data, isLoading: false})
        }).catch(err => console.log(err))
    }

    // const stagingHandler = (checkedValue) => {
    //     console.log("Printing checked value")
    //     console.log(checkedValue)
    // }

    render() {
        if(this.state.isLoading) {
            return(
                <div>Page is loading</div>
            )
        }
        console.log(this.state)
        return(
            <div >
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={12}>
                        <Row>
                            <Col span={24}>
                            <List
                            size="large"
                            header={<List.Item>Staged</List.Item>}
                            bordered
                            dataSource={this.state.changesData.staged}
                            renderItem={item => <List.Item><Checkbox>{item}</Checkbox></List.Item>}
                            />
                            </Col>
                        </Row>
                        <Divider />
                        <Row>
                            <Col span={24}>
                            <List
                            size="large"
                            header={<List.Item actions={[<Button danger>Stage</Button>]}>Unstaged</List.Item>}
                            bordered
                            dataSource={this.state.changesData.unstaged}
                            renderItem={item => <List.Item><Checkbox>{item}</Checkbox></List.Item>}
                            />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Col span={24}>
                            <List
                            size="large"
                            header={<div style={{position: "sticky"}}>Branches</div>}
                            bordered
                            dataSource={this.state.branchData}
                            renderItem={item => <List.Item><Checkbox>{item}</Checkbox></List.Item>}
                            />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                            <Button type="primary" style={{margin: "10px"}}>Push</Button>
                            <Button style={{margin: "10px"}}>Reset</Button>
                            </Col>
                        </Row>
                        
                    </Col>
                </Row>
            </div>
        )
    }

}

export default ProjectClass
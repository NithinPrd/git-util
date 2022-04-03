import { Button, Checkbox, Col, Divider, List, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Project(props) {

    const location = useLocation()
    const root = location.state.root
    console.log(process.env.REACT_APP_BRANCHDATA_URL)
    const [isLoading, setLoading] = useState(true)
    const [changesData, setChangesData] = useState({staged: ["1"], unstaged: ["2"]})
    const [branchData, setBranchData] = useState()
    var newStages = []
    var newUnstages = []

    console.log(root)

    useEffect(() => {
        getBranches()
        getChanges()
    }, [])

    const getChanges = () => 
        axios.post(
            process.env.REACT_APP_BRANCHCHANGES_URL,
            { path: root },
            { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
        ).then((response) => {
            console.log(response)
            setChangesData(response.data)
            setLoading(false)
        }).catch(err => console.log(err))

    const getBranches = () => 
        axios.post(
            process.env.REACT_APP_BRANCHDATA_URL,
            { path: root },
            { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
        ).then((response) => {
            console.log(response)
            setBranchData(response.data)
            setLoading(false)
        }).catch(err => console.log(err))

    const stageChanges = () => {
        axios.post(
            process.env.REACT_APP_STAGECHANGES_URL,
            { path: root },
            { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
        ).then((response) => {
            console.log(response)
            setBranchData(response.data)
            setLoading(false)
        }).catch(err => console.log(err))
    }

    const stagingHandler = (checkedValue) => {
        console.log("Printing checked value")
        console.log(checkedValue)
    }

    if(isLoading) {
        return(
            <div>Page is loading</div>
        )
    }

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
                        dataSource={changesData.staged}
                        renderItem={item => <List.Item><Checkbox>{item}</Checkbox></List.Item>}
                        />
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={24}>
                        <List
                        size="large"
                        header={<List.Item actions={[<Button danger onClick={stageChanges()}>Stage</Button>]}>Unstaged</List.Item>}
                        bordered
                        dataSource={changesData.unstaged.concat(changesData.staged)}
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
                        dataSource={branchData}
                        renderItem={item => <List.Item><Checkbox onChange={stagingHandler()}>{item}</Checkbox></List.Item>}
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

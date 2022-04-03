import { Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Workspaces from '../Data/Workspaces.json'

export default class Home extends React.Component {
    render() {
        const gridStyle = {
            width: '25%',
            textAlign: 'center',
          };
        console.log(Workspaces)
        const workspaces = Workspaces.map((workspace) => 
            <Card title={workspace.name} key={workspace.name}>
                {workspace.projects.map((project) => 
                <>
                    <Link to="/project" path={project.path}><Card.Grid style={gridStyle}>{project.name}</Card.Grid></Link>
                </>
                )}
                
            </Card>
        )
        return(
            <>
                {workspaces}
            </>
        )
    }
}
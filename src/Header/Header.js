import { Button, PageHeader } from "antd";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";

export default function Header(props) {
    return(
        <>
            <PageHeader
            className="site-page-header"
            title='Git-Util'
            subTitle='One stop for all utils'
            extra={[
                <Link to="/"><Button key="3">Push</Button></Link>,
                <Link to="/operations"><Button key="2">Operations</Button></Link>,
                <Button key="1" type="primary">
                  Manage Repos
                </Button>,
                <UserMenu />
              ]}
            />
        </>
    )
}
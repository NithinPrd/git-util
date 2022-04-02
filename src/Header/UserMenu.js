import { UserOutlined } from "@ant-design/icons";
import { Avatar, Popover } from "antd";

export default function UserMenu(props) {
    const content = (
        <div>
          <p>Content</p>
          <p>Content</p>
        </div>
      );
    return(
        <div>
            <Popover placement="topRight" title="User Menu" content={content} trigger="click">
            <Avatar icon={<UserOutlined />} />
            </Popover>
        </div>
    )
}
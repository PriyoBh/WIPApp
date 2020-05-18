import React from "react";
import { Menu, Button, Container } from "semantic-ui-react";

interface IProps {
  openCreateForm: () => void;
}

const NavBar:React.FC<IProps> = ({openCreateForm}) => {
  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header>
            <img
              src="/assets/logo.png"
              alt="logo"
              style={{ marginRight: "10px" }}
            />
            WIPApp
          </Menu.Item>
          <Menu.Item id="Activities" name="Activities" />
          <Menu.Item>
            <Button onClick={openCreateForm} id="create_activity" positive content="Create Activity" />
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
};

export default NavBar;

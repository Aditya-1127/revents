import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Dropdown, Image, Menu } from "semantic-ui-react";
import { useDispatch,useSelector } from "react-redux";
import { signOutUser } from "../auth/authActions";

export default function SignedInMenu() {
  const dispatch = useDispatch();
  const history = useHistory();
  const {currentUser} = useSelector(state => state.auth)
  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src={currentUser.photoURL || 'assets/user.png'} />
      <Dropdown pointing="top left" text={currentUser.email}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="/createEvent"
            text="Create Event"
            icon="plus"
          />
          <Dropdown.Item text="My Profile" icon="user" />
          <Dropdown.Item
            onClick={() => {
              dispatch(signOutUser());
              history.push("/");
            }}
            text="Sign Out"
            icon="power"
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}

import React from "react";
import LoginForm form "../login-form/login-form";
import {connect} from "react-redux";

const Header = ({isLogged}) => {
	return (
		<>
			isLogged && <div>name</div>
			isLogged && <LoginForm/>
		</>
	);
};

const mapStateToProps = ({APP}) => ({
  isLogged: APP.isLogged,
});

export default connect(mapStateToProps)(Header);
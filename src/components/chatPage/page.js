import React from 'react';
import { connect } from 'react-redux';
import { Navbar } from '../Navbar';
import { Header } from './Header';
import Menu from './menu';

export class SearchPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			menu: 'hidden',
		};
	}

	onShowMenu = () => {	
		const menu = 'visible';
		this.setState(() => ({ menu }));
	}
	
	onHideMenu = () => {	
		const menu = 'hidden';
		this.setState(() => ({ menu }));
	}

	render() {
		return (
			<div className="l-flex-container">
				<div className="l-header">
					<Header
						menu={this.state.menu}
						showMenu={this.onShowMenu}
						hideMenu={this.onHideMenu}
					/>
				</div>
				<div className="l-nav"><Navbar /></div>
				<div
					className={`l-menu c-menu c-menu--white 
						${this.state.menu === "hidden" ? "" : "l-menu__show"}
					`}
				>
					<Menu />
				</div>
				<div className="l-main l-main__search c-main c-main--white">
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		notif: state.notif.notification,
	};
};

export default connect(mapStateToProps, undefined)(SearchPage);

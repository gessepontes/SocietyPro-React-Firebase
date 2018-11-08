import React, { Component, Fragment } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';

import { Link } from 'react-router-dom'

class MenuComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
		};
	}


	handleClick = () => {
		this.setState(state => ({ open: !state.open }));
	};

	render() {
		const { onClick } = this.props

		return (
			<Fragment>
				<ListItem onClick={onClick} component={Link} to="/" button>
					<Icon>home</Icon>
					<ListItemText primary="Home" />
				</ListItem>
				<ListItem onClick={onClick} button component={Link} to="/team-list">
					<Icon>flag</Icon>
					<ListItemText primary="Time" />
				</ListItem>
				<ListItem onClick={onClick} button component={Link} to="/player-list">
					<Icon>group</Icon>
					<ListItemText primary="Atletas" />
				</ListItem>
				<ListItem onClick={onClick} button component={Link} to="/field-list">
					<Icon>language</Icon>
					<ListItemText primary="Campo" />
				</ListItem>		
				<ListItem onClick={onClick} button component={Link} to="/field-list">
					<Icon>gamepad</Icon>
					<ListItemText primary="Amistosos" />
				</ListItem>

				<ListItem onClick={this.handleClick}>
					<Icon>settings</Icon>
					<ListItemText inset primary="Campeonato" />
					{this.state.open ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
				</ListItem>
				<Collapse in={this.state.open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding style={{ marginLeft: 10 }}>
						<ListItem onClick={onClick} button component={Link} to="/pre-inscription">
							<Icon>check_circle</Icon>
							<ListItemText inset primary="Pré-Inscrição" />
						</ListItem>

						<ListItem onClick={onClick} button component={Link} to="/player-inscription-list">
							<Icon>backup</Icon>
							<ListItemText inset primary="Inscrição de Jogador" />
						</ListItem>

						<ListItem onClick={onClick} button component={Link} to="/match-report-list">
							<Icon>pageview</Icon>
							<ListItemText inset primary="Súmulas" />
						</ListItem>

						<ListItem onClick={onClick} button component={Link} to="/suspended-players-list">
							<Icon>error</Icon>
							<ListItemText inset primary="Suspensos" />
						</ListItem>

						<ListItem button>
							<Icon>warning</Icon>
							<ListItemText inset primary="Cartões" />
						</ListItem>

						<ListItem button>
							<Icon>grade</Icon>
							<ListItemText inset primary="Artilharia" />
						</ListItem>

						<ListItem button>
							<Icon>games</Icon>
							<ListItemText inset primary="Partidas" />
						</ListItem>

						<ListItem button>
							<Icon>accessibility</Icon>
							<ListItemText inset primary="BID" />
						</ListItem>

						<ListItem button>
							<Icon>note</Icon>
							<ListItemText inset primary="Classificação" />
						</ListItem>
					</List>
				</Collapse>

				<ListItem onClick={onClick} button component={Link} to="/field-list">
					<Icon>security</Icon>
					<ListItemText primary="Arbitros" />
				</ListItem>
				<ListItem onClick={onClick} button component={Link} to="/field-list">
					<Icon>accessibility</Icon>
					<ListItemText primary="Artilharia" />
				</ListItem>
				<ListItem onClick={onClick} button component={Link} to="/field-list">
					<Icon>supervisor_account</Icon>
					<ListItemText primary="Frequência" />
				</ListItem>
			</Fragment>
		)
	}
}

export default (MenuComponent);
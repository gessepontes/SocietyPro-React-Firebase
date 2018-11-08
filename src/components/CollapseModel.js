import React, { Component } from 'react'

import Collapse from '@material-ui/core/Collapse';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

class CollapseModel extends Component {
	render() {
		const { keyCollapse, open, onClick, onClickDelete, color, colorDelete } = this.props

		return (
			<Collapse key={keyCollapse} component="li" in={open} timeout="auto" unmountOnExit>
				<BottomNavigation
					showLabels
				>
					<BottomNavigationAction onClick={onClick} label="Editar" icon={<EditIcon color={color} />} />
					<BottomNavigationAction onClick={onClickDelete} label="Excluir" icon={<DeleteIcon color={colorDelete} />} />
				</BottomNavigation>
			</Collapse>

		)
	}
}

export default (CollapseModel);
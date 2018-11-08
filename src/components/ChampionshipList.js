import React, { Component } from 'react'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import * as moment from 'moment';
import 'moment/locale/pt-br';

class ChampionshipList extends Component {

	renderRows() {

		const { pic_path, list, onClick } = this.props

		const listChampionship = list || []
		
		return listChampionship.map(bc => (
			<div key={bc.id}>
				<ListItem divider key={bc.id} dense button onClick={onClick}>
					<Avatar src={pic_path + bc.logo} alt={bc.sNome} />
					<ListItemText primary={bc.sNome} secondary={`Período: ${moment(bc.dDataInicio).format('DD/MM/YYYY')} a ${moment(bc.dDataFim).format('DD/MM/YYYY')}`} />
				</ListItem>
			</div>
		))
	}

	render() {
		return (
			<List>
				{this.renderRows()}
			</List>
		)
	}
}

export default (ChampionshipList);
import { Component } from 'react'

class TitleComponent extends Component {
	check = (page) => {
		const page_array = page.split('/');

		if (page_array.length > 2) {
			page = `/${page_array[1]}/`
		}

		switch (page) {
			case "/team-list":
				return "Times"
			case "/team":
				return "Novo time"
			case "/team/":
				return "Editar time"
			case "/player-list":
				return "Jogadores"
			case "/player":
				return "Novo jogador"
			case "/player/":
				return "Editar jogador"
			case "/field-list":
				return "Campos"
			case "/field-add":
				return "Campos"
			default:
				return "SocietyPro"
		}
	}

	render() {
		const { page } = this.props

		return (
			this.check(page)
		)
	}
}

export default (TitleComponent);
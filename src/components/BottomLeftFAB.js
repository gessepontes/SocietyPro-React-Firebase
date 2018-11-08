import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

import AddIcon from '@material-ui/icons/Add';

class BottomLeftFAB extends Component {
	render() {
		const {  variant, color, onClick } = this.props

		const style={
			position: 'fixed',
			zIndex:3,
			right:30,
			bottom: 35,
		}

		return (

			<Button
                onClick={onClick}
                color={color}
                variant={variant}
                style={style}
                mini
				>
				< AddIcon />
			</Button>

		)
	}
}

export default (BottomLeftFAB);
import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
	},
	muiButton: {
		borderRadius: 20,
		backgroundColor: '#2a608d',
	},
}));

export default function Header() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar
				position="static"
				style={{ backgroundColor: '#f0f1f3', color: '#818181' }}
			>
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						<Link to="/" style={{ textDecoration: 'none' }}>
							Locations
						</Link>
					</Typography>
					<Link to="/create-location" style={{ textDecoration: 'none' }}>
						<Button
							variant="contained"
							color="primary"
							className={classes.muiButton}
						>
							<AddIcon />
							Add Location
						</Button>
					</Link>
				</Toolbar>
			</AppBar>
		</div>
	);
}

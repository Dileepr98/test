import React, { Fragment, useState } from 'react';
import MuiPhoneNumber from 'material-ui-phone-number';
import { UsaStates } from 'usa-states';

import {
	Typography,
	TextField,
	Grid,
	Paper,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	Checkbox,
	Select,
	MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import Header from './header';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		margin: 'auto',
		maxWidth: 700,
		color: theme.palette.text.secondary,
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: '25ch',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		margin: 'auto',
		width: 'fit-content',
	},
}));

const defaultfacilityTimes = [
	{
		day: 'Sunday',
		is_select: false,
		from_time: '',
		to_time: '',
	},
	{
		day: 'Monday',
		is_select: false,
		from_time: '',
		to_time: '',
	},
	{
		day: 'Tuesday',
		is_select: false,
		from_time: '',
		to_time: '',
	},
	{
		day: 'Wednesday',
		is_select: false,
		from_time: '',
		to_time: '',
	},
	{
		day: 'Thursday',
		is_select: false,
		from_time: '',
		to_time: '',
	},
	{
		day: 'Friday',
		is_select: false,
		from_time: '',
		to_time: '',
	},
	{
		day: 'Saterday',
		is_select: false,
		from_time: '',
		to_time: '',
	},
];

const formFields = {
	locationName: '',
	addressLine: '',
	city: '',
	state: '',
	addressLine2: '',
	suite: '',
	zipcode: '',
	phoneno: '',
	timezone: '',
	appintment_tool: '',
	time_facility: [],
};

const CreateLocation = () => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const { enqueueSnackbar } = useSnackbar();
	const [formValues, setFormValues] = useState(formFields);
	const [formValidation, setFormValidation] = useState(formFields);

	const [facilityTimes, setFacilityTimes] = useState(defaultfacilityTimes);
	const [, setApllyAll] = useState('');
	var usStates = new UsaStates();
	var statesNames = usStates.arrayOf('names');

	const handleChange = (event, day) => {
		let updatedTime = [...facilityTimes];
		if (event.target.type === 'checkbox') {
			updatedTime = facilityTimes.map((ftime) => {
				if (ftime.day === day) {
					ftime['is_select'] = !ftime.is_select;
				}
				return ftime;
			});
		} else {
			updatedTime = facilityTimes.map((ftime) => {
				if (ftime.day === day) {
					ftime[event.target.name] = event.target.value;
				}
				return ftime;
			});
		}
		setFacilityTimes(updatedTime);
	};
	const openFacilityPopup = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const disableEnterKesy = (e) => {
		e.preventDefault();
	};

	const handleApplyToAll = (day, fromTime, toTime) => {
		const updatedTime = [...facilityTimes];
		const setfacilityTime = updatedTime.map((ftime) => {
			if (ftime.is_select === true) {
				ftime['from_time'] = fromTime;
				ftime['to_time'] = toTime;
				ftime['is_select'] = true;
			}
			return ftime;
		});

		setFacilityTimes(setfacilityTime);
		setApllyAll('hello world');
	};

	const handleChangeValue = (e) => {
		const changeValue = { ...formValues };
		const removeValidation = { ...formValidation };
		console.log();
		let value;
		let name;
		if (typeof e === 'string') {
			value = e;
			name = 'phoneno';
		} else {
			value = e.target.value;
			name = e.target.name;
		}

		changeValue[name] = value;
		removeValidation[name] = '';
		setFormValues(changeValue);
		setFormValidation(removeValidation);
	};

	const formValidations = () => {
		let error = true;
		const checkValue = { ...formValues };
		const validation = { ...formValidation };
		if (!checkValue.locationName) {
			error = false;
			validation.locationName = 'This field is required!';
		}
		if (!checkValue.addressLine) {
			error = false;
			validation.addressLine = 'This field is required!';
		}
		if (!checkValue.city) {
			error = false;
			validation.city = 'This field is required!';
		}
		if (!checkValue.state) {
			error = false;
			validation.state = 'This field is required!';
		}
		if (!checkValue.addressLine2) {
			error = false;
			validation.addressLine2 = 'This field is required!';
		}
		if (!checkValue.timezone) {
			error = false;
			validation.timezone = 'This field is required!';
		}
		if (!checkValue.phoneno) {
			error = false;
			validation.phoneno = 'This field is required!';
		}
		if (!checkValue.zipcode) {
			error = false;
			validation.zipcode = 'This field is required!';
		}
		if (!checkValue.appintment_tool) {
			error = false;
			validation.appintment_tool = 'This field is required!';
		}
		if (!checkValue.suiteno) {
			error = false;
			validation.suiteno = 'This field is required!';
		}
		setFormValidation(validation);
		return error;
	};

	const submitForm = (e) => {
		e.preventDefault();
		if (formValidations()) {
			const dataTosend = { ...formValues };
			dataTosend.time_facility = [...facilityTimes];
			let locationList = localStorage.getItem('locationList');
			if (locationList) {
				locationList = JSON.parse(locationList);
				const updatedList = locationList.concat(dataTosend);
				localStorage.setItem('locationList', JSON.stringify(updatedList));
				console.log(updatedList);
			} else {
				localStorage.setItem('locationList', JSON.stringify([dataTosend]));
			}
			setFacilityTimes(defaultfacilityTimes);
			setFormValues(formFields);
			enqueueSnackbar('Location Submit Successfully', { variant: 'success' });
		}
	};
	return (
		<Fragment>
			<Header />
			<Typography
				component="div"
				style={{ backgroundColor: '#f0f1f3', height: '100vh' }}
			>
				<div className={classes.root}>
					<Paper className={classes.paper}>
						<Typography variant="h6" display="block" gutterBottom>
							Add Locations
						</Typography>
						<form onSubmit={submitForm}>
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<TextField
										id="standard-full-width"
										label="Location Name"
										style={{ margin: 8 }}
										fullWidth
										margin="normal"
										error={formValidation.locationName}
										name="locationName"
										value={formValues.locationName}
										onChange={handleChangeValue}
										helperText={formValidation.locationName}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										id="standard-full-width"
										label="Addpress Line `"
										style={{ margin: 8 }}
										fullWidth
										margin="normal"
										error={formValidation.addressLine}
										name="addressLine"
										value={formValues.addressLine}
										onChange={handleChangeValue}
										helperText={formValidation.addressLine}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										id="standard-full-width"
										label="Suite No."
										style={{ margin: 8 }}
										fullWidth
										margin="normal"
										error={formValidation.suiteno}
										name="suiteno"
										value={formValues.suiteno}
										onChange={handleChangeValue}
										helperText={formValidation.suiteno}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										id="standard-full-width"
										label="Address Line 2"
										style={{ margin: 8 }}
										fullWidth
										margin="normal"
										error={formValidation.addressLine2}
										name="addressLine2"
										value={formValues.addressLine2}
										onChange={handleChangeValue}
										helperText={formValidation.addressLine2}
									/>
								</Grid>
								<Grid item xs={12} sm={3}>
									<TextField
										id="standard-full-width"
										label="City"
										style={{ margin: 8 }}
										fullWidth
										margin="normal"
										error={formValidation.city}
										name="city"
										value={formValues.city}
										onChange={handleChangeValue}
										helperText={formValidation.city}
									/>
								</Grid>
								<Grid item xs={12} sm={3}>
									<Select
										id="standard-full-width"
										label="State"
										style={{ margin: 8 }}
										fullWidth
										margin="normal"
										error={formValidation.state}
										name="state"
										value={formValues.state}
										onChange={handleChangeValue}
										helperText={formValidation.state}
									>
										{statesNames &&
											statesNames.map((statename) => {
												return (
													<MenuItem value={statename}>{statename}</MenuItem>
												);
											})}
									</Select>
								</Grid>
								<Grid item xs={12} sm={3}>
									<TextField
										id="standard-full-width"
										label="Zipcode"
										style={{ margin: 8 }}
										fullWidth
										margin="normal"
										error={formValidation.zipcode}
										name="zipcode"
										value={formValues.zipcode}
										onChange={handleChangeValue}
										helperText={formValidation.zipcode}
									/>
								</Grid>
								<Grid item xs={12} sm={3}>
									<MuiPhoneNumber
										id="standard-full-width"
										label="Phone number"
										defaultCountry={'us'}
										style={{ margin: 8 }}
										error={formValidation.phoneno}
										value={formValues.phoneno}
										onChange={handleChangeValue}
										name="phoneno"
										margin="normal"
										helperText={formValidation.phoneno}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										id="standard-full-width"
										label="Time Zone"
										style={{ margin: 8 }}
										fullWidth
										margin="normal"
										error={formValidation.timezone}
										name="timezone"
										value={formValues.timezone}
										onChange={handleChangeValue}
										helperText={formValidation.timezone}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										id="standard-full-width"
										label="Facility Times"
										style={{ margin: 8 }}
										fullWidth
										margin="normal"
										onMouseDownCapture={openFacilityPopup}
										onKeyPress={disableEnterKesy}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										id="standard-full-width"
										label="Appintment Pool"
										style={{ margin: 8 }}
										fullWidth
										margin="normal"
										error={formValidation.appintment_tool}
										name="appintment_tool"
										value={formValues.appintment_tool}
										onChange={handleChangeValue}
										helperText={formValidation.appintment_tool}
									/>
								</Grid>
								<Grid item xs={6}></Grid>
								<Grid item xs={3}>
									<Button
										type="submit"
										fullWidth
										variant="contained"
										color="secondary"
										className={classes.submit}
									>
										Cancel
									</Button>
								</Grid>
								<Grid item xs={3}>
									<Button
										type="submit"
										fullWidth
										variant="contained"
										color="primary"
										className={classes.submit}
									>
										Save
									</Button>
								</Grid>
							</Grid>
						</form>
					</Paper>
				</div>
			</Typography>
			<Dialog
				fullWidth={true}
				maxWidth={'md'}
				open={open}
				onClose={handleClose}
				scroll={'body'}
				aria-labelledby="scroll-dialog-title"
				aria-describedby="scroll-dialog-description"
			>
				<DialogTitle id="max-width-dialog-title">Facility Times</DialogTitle>
				<DialogContent dividers={false}>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={3}></Grid>
						<Grid item xs={12} sm={3}>
							Form
						</Grid>
						<Grid item xs={12} sm={3}>
							To
						</Grid>
						<Grid item xs={12} sm={3}></Grid>

						{facilityTimes &&
							facilityTimes.map((el, index) => {
								return (
									<Fragment key={index}>
										<Grid item xs={12} sm={3}>
											<FormControlLabel
												control={
													<Checkbox
														name="is_select"
														checked={el.is_select}
														onChange={(e) => handleChange(e, el.day)}
													/>
												}
												label={el.day}
											/>
										</Grid>
										<Grid item xs={12} sm={3}>
											<TextField
												name="from_time"
												type="time"
												size="small"
												variant="outlined"
												value={el.from_time}
												onChange={(e) => handleChange(e, el.day)}
											/>
										</Grid>
										<Grid item xs={12} sm={3}>
											<TextField
												name="to_time"
												type="time"
												size="small"
												variant="outlined"
												value={el.to_time}
												onChange={(e) => handleChange(e, el.day)}
											/>
										</Grid>
										<Grid item xs={12} sm={3}>
											<Button
												variant="outlined"
												color="primary"
												size="small"
												onClick={() =>
													handleApplyToAll(el.day, el.from_time, el.to_time)
												}
											>
												Apply to All Checked
											</Button>
										</Grid>
									</Fragment>
								);
							})}
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button
						type="submit"
						onClick={handleClose}
						variant="contained"
						color="secondary"
						className={classes.submit}
					>
						Cancel
					</Button>

					<Button
						type="submit"
						onClick={handleClose}
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
};

export default CreateLocation;

import React, { Fragment, useEffect, useState } from 'react';

import { Typography, IconButton } from '@material-ui/core';
import Header from './header';
import MUIDataTable from 'mui-datatables';
import {
	DeleteOutline as DeleteOutlineIcon,
	Edit as EditIcon,
} from '@material-ui/icons';

const Home = () => {
	const [locations, setLocations] = useState([]);
	useEffect(() => {
		const locationList = localStorage.getItem('locationList');
		console.log(JSON.parse(locationList));
		setLocations(JSON.parse(locationList));
	}, []);

	const deleteLocation = (ID) => {
		let locationList = localStorage.getItem('locationList');
		locationList = JSON.parse(locationList);

		const updatedList = locationList.filter((el, InDx) => {
			return InDx !== ID;
		});
		localStorage.setItem('locationList', JSON.stringify(updatedList));
		setLocations(updatedList);
	};
	const columns = [
		{
			name: 'location_name',
			label: 'Location Name',
			options: {
				sort: false,
			},
		},
		{
			name: 'address',
			label: 'Address',
			options: {
				sort: false,
			},
		},
		{
			name: 'phone_no',
			label: 'Phone No.',
			options: {
				sort: false,
			},
		},
		{
			name: 'id',
			label: '  ',
			options: {
				ort: false,
				customBodyRender: (id) => (
					<Fragment>
						<IconButton tooltip="Edit location" style={{ cursor: 'pointer' }}>
							<EditIcon
								color="yellow"
								onClick={() => {
									alert('Edit functionality is pending');
								}}
							/>
						</IconButton>
						<IconButton tooltip="Delete location" style={{ cursor: 'pointer' }}>
							<DeleteOutlineIcon
								color="secondary"
								onClick={() => deleteLocation(id)}
							/>
						</IconButton>
					</Fragment>
				),
			},
		},
	];
	let data = [];
	if (locations) {
		data = locations.map((location, index) => {
			return {
				location_name: location.locationName,
				address: `${location.addressLine} ${location.addressLine2} ${location.suite} ${location.zipcode}`,
				phone_no: location.phoneno,
				id: index,
			};
		});
	}
	const options = {
		filter: false,
		download: false,
		print: false,
		search: false,
		viewColumns: false,
		responsive: 'standard',
		selectableRows: false,
	};

	return (
		<Fragment>
			<Header />
			<Typography
				component="div"
				style={{ backgroundColor: '#f0f1f3', height: '100vh' }}
			>
				<MUIDataTable
					title={''}
					data={data}
					columns={columns}
					options={options}
				/>
			</Typography>
		</Fragment>
	);
};

export default Home;

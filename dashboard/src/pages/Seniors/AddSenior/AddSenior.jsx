import React, { Component } from 'react'
import Select from 'react-select';
import TopBar from '../../../components/TopBar/TopBar'

import './AddSenior.css'
import { createSenior } from '../../../actions/senior';
import { connect } from 'react-redux';

import seniorService from '../../../services/senior.service';
class AddSenior extends Component {
	constructor(props) {
		super(props);

		this.onChangeName = this.onChangeName.bind(this);
		this.onChangelastname = this.onChangelastname.bind(this);
		this.onChangeTelephone = this.onChangeTelephone.bind(this);
		this.onChangeSex = this.onChangeSex.bind(this);
		this.onChangeBirthDate = this.onChangeBirthDate.bind(this);
		this.onChangeInterests = this.onChangeInterests.bind(this);
		this.onChangeCin = this.onChangeCin.bind(this);
		this.saveSenior = this.saveSenior.bind(this);
		this.newSenior = this.newSenior.bind(this);
		this.state = {
			name: "",
			lastname: "",
			telephone: "",
			sexOption: "",
			birthDate: "",
			interests: "",
			cin: "",
			residance: "",
			famSituation: "",
			fileId: "",

			seniorImg: "../../../../assets/img/images/avartar.png",
			selectedFile: null,
			published: false,
			submitted: false,
		};


	}

	imageHandler = (e) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				this.setState({ seniorImg: reader.result, selectedFile: e.target.files[0] })


			}
		}
		console.log("this is image " + this.state.seniorImg)
		reader.readAsDataURL(e.target.files[0])
	}
	onChangeName = (e) => {
		this.setState({
			name: e.target.value,
		});
	}
	onChangelastname = (e) => {
		this.setState({
			lastname: e.target.value,
		});
	}
	onChangeTelephone = (e) => {
		this.setState({
			telephone: e.target.value,
		});
	}
	onChangeSex = (e) => {
		this.setState({
			sexOption: e.target.value,
		});
	}
	onChangeBirthDate = (e) => {
		this.setState({
			birthDate: e.target.value,
		});
	}
	onChangeInterests = (value) => {
		this.setState({
			interests: value,
		});
	}

	onChangeCin = (e) => {
		this.setState({
			cin: e.target.value,
		});
	}
	onFileChange = event => {

		// Update the state
		this.setState({ seniorImg: event.target.files[0] });

	};
	saveSenior = (e) => {
		e.preventDefault();

		// Create an object of formData
		const formData = new FormData();

		// Update the formData object
		formData.append(
			"file",
			this.state.selectedFile,
		);
		seniorService.upload(formData).then(res => {
			this.setState({
				fileId: res.data.id,
			})

		}).then(() => {
			let senior = {
				name: this.state.name,
				lastname: this.state.lastname,
				dateOfBirth: this.state.birthDate,
				sex: this.state.sexOption,
				cin: this.state.cin,
				telephone: this.state.telephone,
				residance: this.state.residance,
				famillySituation: this.state.famSituation,
				centerOfInterest: this.state.interests.value,
				file: this.state.fileId,
			};
			console.log('Senior = > ' + JSON.stringify(senior));
			this.setState({ published: true, });

			seniorService.create(senior);

		})




	}
	newSenior() {
		this.setState({
			id: null,
			name: "",
			lastname: "",
			published: false,
			submitted: false,
		});
	}

	render() {
		const options = [
			{ value: 'reading', label: '📖 Reading' },
			{ value: 'watching', label: '📺 Watching' },
			{ value: 'playing', label: '♟️ Playing' },
			{ value: 'listening', label: '📻 Listening' }
		]

		return (
			<div className='addSenior'>

				<TopBar title={'Form'} />
				<div className="wrapper">
					<div className="wrapper wrapper--w680">
						<div className="cardd cardd-4">
							<div className="cardd-body">
								<h2 className="title" style={{ lettreSpacing: '10px', textTransform: "uppercase" }}>New Senior is here :</h2>
								<form >
									<div className="form-header">
										<div className="avartar">
											<div className='image-preview' >
												<img src={this.state.seniorImg} alt="seniorpic" />
											</div>
											<div className="avartar-picker">
												<input type="file" name="file-1[]" id="file-1" className="inputfile" data-multiple-caption="{count} files selected" multiple onChange={this.imageHandler} />
												<label htmlFor="file-1">
													<i className="zmdi zmdi-camera"></i>
													<span>Choose Picture</span>
												</label>
											</div>
										</div>
									</div>

									<div className="rowoo rowoo-space">
										<div className="col-2">
											<div className="input-groupp">
												<label className="label">first name</label>
												<input
													className="input--style-4"
													type="text"
													name="name"
													value={this.state.name}
													onChange={this.onChangeName} />
											</div>
										</div>
										<div className="col-2">
											<div className="input-groupp">
												<label className="label">last name</label>
												<input
													className="input--style-4"
													type="text"
													name="lastName"
													value={this.state.lastname}
													onChange={this.onChangelastname} />
											</div>
										</div>
									</div>
									<div className="rowoo rowoo-space">
										<div className="col-2">
											<div className="input-groupp">
												<label className="label">Birthday</label>
												<div className="input-groupp-icon">
													<input className="input--style-4" type="date"
														value={this.state.birthDate}
														onChange={this.onChangeBirthDate}
														name="birthday"
														format="{0:yyyy-MM-dd}" />

												</div>
											</div>
										</div>
										<div className="col-2" id='gender'>
											<div className="input-groupp">
												<label className="label">Gender</label>
												<div className="p-t-10">
													<label className="radio-container m-r-45">Male
														<input checked={this.state.sexOption === "male"}
															onChange={this.onChangeSex}
															type="radio"
															value="male" />
														<span className="checkmark"></span>
													</label>
													<label className="radio-container">Female
														<input
															checked={this.state.sexOption === "female"}
															onChange={this.onChangeSex}
															type="radio"
															value="female" />
														<span className="checkmark"></span>
													</label>
												</div>
											</div>
										</div>
									</div>
									<div className="rowoo rowoo-space">
										<div className="col-2">
											<div className="input-groupp">
												<label className="label">CIN</label>
												<input className="input--style-4"
													type="number"
													name="cin"
													value={this.state.cin}
													onChange={this.onChangeCin} />
											</div>
										</div>
										<div className="col-2">
											<div className="input-groupp">
												<label className="label">Phone Number</label>
												<input
													className="input--style-4"
													type="number"
													name="telephone"
													value={this.state.telephone}
													onChange={this.onChangeTelephone} />
											</div>
										</div>
									</div>

									<div className="input-groupp">
										<label className="label">Interests</label>
										<div className="rs-select2 js-select-simple select--no-search">
											<Select
												onChange={this.onChangeInterests}
												options={options}
												isClearable
												placeholder="Select Interest 🎲"
											/>

										</div>
									</div>


									<div className="p-t-15">
										<button className="btn btn--radius-2 btn--blue" type="submit" onClick={this.saveSenior}>Submit</button>
									</div>
								</form>
							</div>
						</div>
					</div>




				</div>
			</div>
		)
	}
}


export default connect(null, { createSenior })(AddSenior);

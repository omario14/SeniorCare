import React, { Component } from 'react'
import Select from 'react-select';
import './AddSenior.css'
import { createSenior } from '../../../actions/senior';
import { connect } from 'react-redux';
import seniorService from '../../../services/senior.service';
import { Button, ButtonGroup, Grid, InputAdornment, Slider } from '@mui/material';
import { GiBodyHeight, GiHealthPotion, GiReturnArrow, GiWeightScale } from 'react-icons/gi';
import MuiInput from '@mui/material/Input';
import { Navigate } from 'react-router-dom';
import styled from '@emotion/styled';
const Input = styled(MuiInput)`
  width: 62px;
`;

class AddSenior extends Component {
	constructor(props) {
		super(props);


		this.onChangeInterests = this.onChangeInterests.bind(this);
		this.onChange = this.onChange.bind(this);
		this.saveSenior = this.saveSenior.bind(this);
		this.newSenior = this.newSenior.bind(this);
		this.onChangeWeight = this.onChangeWeight.bind(this);
		this.onChangeHeight = this.onChangeHeight.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.state = {
			senior: null,
			name: "",
			lastname: "",
			telephone: "",
			sexOption: "male",
			birthDate: "",
			interests: "",
			cin: "",
			adress: "",
			famSituation: "",
			height: 150,
			weight: 70,
			fileId: null,
			seniorImg: "../../../../assets/img/images/avartar.png",
			selectedFile: null,
			published: false,
			submitted: false,
			errors: {},

		};


	}

	imageHandler = (e) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				this.setState({ seniorImg: reader.result, selectedFile: e.target.files[0] })


			}
		}
		reader.readAsDataURL(e.target.files[0])
	}

	onChangeInterests = (value) => {
		this.setState({
			interests: value,
		});
	}
	onChangefamSituation = (value) => {
		this.setState({
			famSituation: value.value,
		});
	}

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	onChangeWeight = (event) => {
		this.setState({
			weight: event.target.value === '' ? '' : Number(event.target.value)
		});
	}
	onChangeHeight = (event) => {
		this.setState({
			height: event.target.value === '' ? '' : Number(event.target.value)
		});
	}

	handleBlur = () => {
		if (this.state.weight < 20) {
			this.setState({
				weight: 20
			})
		} else if (this.state.weight > 300) {
			this.setState({
				weight: 300
			})
		}
	};
	formValidation = () => {
		const { name, lastname, birthDate, famSituation, cin, telephone } = this.state;
		let isValid = true;
		const errors = {};
		if (name.trim().length < 1) {
			errors.nameError = "Name is empty !"
			isValid = false;
		}
		if (!/^[A-Za-z_ ]*$/.test(name.trim())) {
			errors.nameError = "Name must contain only Letters !"
			isValid = false;
		}
		if (lastname.trim().length < 1) {
			errors.lastnameError = "Lastname is empty !"
			isValid = false;
		}
		if (birthDate.trim().length < 1) {
			errors.birthDateError = "Birth Date is empty !"
			isValid = false;
		}
		if (!/^[A-Za-z]*$/.test(lastname.trim())) {
			errors.lastnameError = "Lastname must contain only Letters !"
			isValid = false;
		}
		if (cin.trim().length < 8 || cin.trim().length > 8) {
			errors.cinError = "Cin length must be 8  !"
			isValid = false;
		}
		if ((0 < telephone.trim().length && telephone.trim().length < 8) || telephone.trim().length > 8) {
			errors.telephoneError = "Telephone length must be 8   !"
			isValid = false;
		}
		if (!famSituation) {
			errors.famSituationError = " Please choose a situation !"
			isValid = false;
		}
		this.setState({ errors });
		return isValid;
	}

	saveSenior = (e) => {
		e.preventDefault();
		const isValid = this.formValidation();
		if (isValid) {


			const { addSeniorPage } = this.props;
			// Create an object of formData
			const formData = new FormData();
			// Update the formData object
			formData.append(
				"file",
				this.state.selectedFile,
			);


			if (this.state.selectedFile) {
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
						adress: this.state.adress,
						famillySituation: this.state.famSituation,
						centerOfInterest: this.state.interests.value,
						file: this.state.fileId,
						weight: this.state.weight,
						height: this.state.height,
					};



					seniorService.create(senior).then((res) => {

						
						this.setState({
							published: true,
							senior: res.data
						});
						let archive = {
							idArch: `arch-${res.data.id}-${new Date().toISOString().split("T")[0]}`,
							senior: res.data.id,
							date: new Date().toISOString().split("T")[0],
							checkedBreakfast: 0,
							checkedLunch: 0,
							checkedDinner: 0,
						}
						seniorService.addToArchive(archive)


					})
					addSeniorPage(1)


				})


			} else {
				let senior = {
					name: this.state.name,
					lastname: this.state.lastname,
					dateOfBirth: this.state.birthDate,
					sex: this.state.sexOption,
					cin: this.state.cin,
					telephone: this.state.telephone,
					adress: this.state.adress,
					famillySituation: this.state.famSituation,
					centerOfInterest: this.state.interests.value,
					file: this.state.fileId,
					weight: this.state.weight,
					height: this.state.height,
				};
				this.setState({ published: true, });

				seniorService.create(senior).then((res) => {

					this.setState({
						senior: res.data
					})
					let archive = {
						idArch: `arch-${this.state.senior.id}-${new Date().toISOString().split("T")[0]}`,
						senior: this.state.senior.id,
						date: new Date().toISOString().split("T")[0],
						checkedBreakfast: 0,
						checkedLunch: 0,
						checkedDinner: 0,
					}
					seniorService.addToArchive(archive)

					addSeniorPage(1)
				})



			}
		}

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
		const famSituationOptions = [
			{ value: 'married ', label: 'Married  (M)' },
			{ value: 'divorced ', label: 'Divorced (D)' },
			{ value: 'single', label: 'Single (S)' },
			{ value: 'widowed ', label: 'Widowed (W)' }
		]
		const { addSeniorPage } = this.props;
		const { user: currentUser } = this.props;

		if (!currentUser) {
			return <Navigate to="/notFound" />;

		}




		return (
			<section className="timeline_area section_padding_130">
				<div
					style={{
						position: "absolute",
						top: "8px",
						left: "15px",
					}}
				>
					<ButtonGroup variant="text" aria-label="text button group">
						<Button onClick={() => addSeniorPage()}>
							<GiReturnArrow /> &nbsp;&nbsp; Return
						</Button>

					</ButtonGroup>
				</div>

				<div className='addSenior mt-6'>

					<div className="wrapper">

						<div className="wrapper wrapper--w680">
							<div className="cardd cardd-4">
								<div className="cardd-body">

									<h2 className="title" style={{ lettreSpacing: '10px', textTransform: "uppercase" }}>New Senior is here :</h2>
									<form >
										<div className="form-header">
											<div className="avartar">
												<div className='image-preview text-center' >
													<img src={this.state.seniorImg} alt="seniorpic" />
												</div>
												<div className="avartar-picker text-center">
													<input type="file" name="file-1[]" id="file-1" className="inputfile " data-multiple-caption="{count} files selected" accept="image/png, image/jpeg" onChange={this.imageHandler} />
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
													<label className="label">first name *</label>
													<input
														className="input--style-4"
														type="text"
														name="name"
														value={this.state.name}
														onChange={this.onChange} />
													<span className="text-sm text-danger">{this.state.errors["nameError"]} </span>
												</div>

											</div>
											<div className="col-2">
												<div className="input-groupp">
													<label className="label">last name *</label>
													<input
														className="input--style-4"
														type="text"
														name="lastname"
														value={this.state.lastname}
														onChange={this.onChange} />
													<span className="text-sm text-danger">{this.state.errors["lastnameError"]} </span>
												</div>
											</div>
										</div>


										<div className="rowoo rowoo-space">
											<div className="col-2">
												<div className="input-groupp">
													<label className="label">Birthday *</label>
													<div className="input-groupp-icon">
														<input className="input--style-4" type="date"
															value={this.state.birthDate}
															onChange={this.onChange}
															name="birthDate"
															format="{0:yyyy-MM-dd}"
															max={"1997-01-01"} />
														<span className="text-sm text-danger">{this.state.errors["birthDateError"]} </span>

													</div>
												</div>
											</div>

											<div className="col-2" id='gender'>
												<div className="input-groupp">
													<label className="label">Gender</label>
													<div className="p-t-10">
														<label className="radio-container m-r-45">Male
															<input checked={this.state.sexOption === "male"}
																onChange={this.onChange}
																type="radio"
																value="male"
																name='sexOption' />
															<span className="checkmark"></span>
														</label>
														<label className="radio-container">Female
															<input
																checked={this.state.sexOption === "female"}
																onChange={this.onChange}
																type="radio"
																value="female"
																name="sexOption" />
															<span className="checkmark"></span>
														</label>
													</div>
												</div>
											</div>
										</div>

										<div className="rowoo rowoo-space">
											<div className="col-2">
												<div className="input-groupp">
													<label className="label">Adress</label>
													<input className="input--style-4"
														type="text"
														name="adress"
														value={this.state.adress}
														onChange={this.onChange} />

												</div>
											</div>



											<div className="col-2">
												<div className="input-groupp">
													<label className="label">Situation *</label>
													<div className="rs-select2 js-select-simple select--no-search">
														<Select
															onChange={this.onChangefamSituation}
															name="famSituation"
															options={famSituationOptions}
															isClearable
															placeholder="Situation..."
														/>
														<span className="text-sm text-danger">{this.state.errors["famSituationError"]} </span>
													</div>
												</div>
											</div>
										</div>
										<div className="rowoo rowoo-space">
											<div className="col-2">
												<div className="input-groupp">
													<label className="label">CIN *</label>
													<input className="input--style-4"
														type="number"
														name="cin"
														value={this.state.cin}
														onChange={this.onChange} />
													<span className="text-sm text-danger">{this.state.errors["cinError"]} </span>
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
														onChange={this.onChange} />
													<span className="text-sm text-danger">{this.state.errors["telephoneError"]} </span>
												</div>
											</div>
										</div>
										<div className="rowoo rowoo-space">
											<div className="col-2">
												<div className="input-groupp">
													<label className="label">Height *</label>
													<Grid container spacing={2} alignItems="center">
														<Grid item>
															<GiBodyHeight />
														</Grid>
														<Grid item xs>
															<Slider
																value={typeof this.state.height === 'number' ? this.state.height : 110}
																onChange={this.onChangeHeight}
																aria-labelledby="input-slider"
																name="height"
																min={110}
																max={290}
															/>
														</Grid>
														<Grid item>
															<Input
																value={this.state.height}
																size="small"
																onChange={this.onChangeHeight}

																name="height"
																inputProps={{
																	step: 10,
																	min: 110,
																	max: 290,
																	type: 'number',
																	'aria-labelledby': 'input-slider',
																}}
																endAdornment={<InputAdornment position="end">cm</InputAdornment>}
															/>

														</Grid>
													</Grid>

												</div>
											</div>
											<div className="col-2">
												<div className="input-groupp">
													<label className="label">Weight *</label>
													<Grid container spacing={2} alignItems="center">
														<Grid item>
															<GiWeightScale />
														</Grid>
														<Grid item xs>
															<Slider
																value={typeof this.state.weight === 'number' ? this.state.weight : 20}
																onChange={this.onChangeWeight}
																aria-labelledby="input-slider"
																name="weight"
																min={20}
																max={300}
															/>
														</Grid>
														<Grid item>
															<Input
																value={this.state.weight}
																size="small"
																onChange={this.onChangeWeight}
																onBlur={this.handleBlur}
																name="weight"
																inputProps={{
																	step: 10,
																	min: 20,
																	max: 300,
																	type: 'number',
																	'aria-labelledby': 'input-slider',
																}}
																endAdornment={<InputAdornment position="end">kg</InputAdornment>}
															/>

														</Grid>
													</Grid>

												</div>
											</div>
										</div>

										<div className="input-groupp">
											<label className="label">Interests</label>
											<div className="rs-select2 js-select-simple select--no-search">
												<Select
													onChange={this.onChangeInterests}
													name="interests"
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
			</section>
		)
	}
}
function mapStateToProps(state) {
	const { user } = state.auth;
	return {
		user,
	};
}


export default connect(mapStateToProps, { createSenior })(AddSenior);

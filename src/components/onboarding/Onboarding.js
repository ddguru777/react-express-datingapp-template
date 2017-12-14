import React from 'react';
import { connect } from 'react-redux';
import { pick } from 'ramda';
import { Progress, Button } from 'element-react';
import 'element-theme-default';

import OnboardingProfile from './OnboardingProfile';
import OnboardingGender from './OnboardingGender';
import OnboardingPhoto from './OnboardingPhoto';
import OnboardingTags from './OnboardingTags';
import OnboardingLocation from './OnboardingLocation';

import { step, stepBack, saveUserData } from '../../actions/onboarding';

export class Onboarding extends React.Component {

	getProfile = (formState) => {
		this.props.saveUserData('SERVER/SAVE_PROFILE', pick(['fname', 'lname', 'nickname', 'birthDate'], formState));
	};

	getGender = (genderState) => {
		this.props.saveUserData('SERVER/SAVE_GENDER', pick(['gender', 'orientation'], genderState));
	
		/* 
		 * [ ] Save gender in redux 
		 * [ ] Step  
		 *
		 * */
	};

	getTags = (tags) => {
		this.setState({ 
			profile: {
				...this.state.profile,	
				tags 
			}
		});
		this.props.stepInc();
	};

	getPhoto = (photos) => {
		this.setState({ 
			profile: {
				...this.state.profile,	
				photos 
			}
		});

		this.props.stepInc();
	};

	getLocation = (location) => {
		this.setState({
			profile: {
				...this.state.profile,	
				location 
			}
		});		
		this.props.stepInc();
	};
	

	render () {

		const step = this.props.step; 

		const { 
			fname, 
			lname, 
			nickname,
			location,
			gender,
			orientation,
			birthDate,
			tags,
			photos
		} = this.props.profile; 

		return (
			<div className="page-header">
				<div className="content-container">
					{step != 0 &&  <Button onClick={this.props.stepBack} plain={true} type="info" icon="arrow-left"></Button>}

					{step == 0 && 
							<OnboardingProfile 
								fname={fname}
								lname={lname}
								nickname={nickname}
								birthDate={birthDate ? new Date(birthDate) : ''}
								getProfile={this.getProfile}
								minAge={18}
					/>}
					{step == 1 && 
							<OnboardingGender 
								getGender={this.getGender}		
								gender={gender}
								orientation={orientation}
					/>}
					{step == 2 && 
							<OnboardingPhoto 
								getPhoto={this.getPhoto}
								photos={photos}
					/>}
					{step == 3 && 
							<OnboardingTags
								getTags={this.getTags}
								tags={tags}
					/>}
					{step == 4 && 
							<OnboardingLocation 
								getLocation={this.getLocation}
								latitude={location ? location.latitude : 0}
								longitude={location ? location.longitude : 0}
					/>}

					{step == 5 && <button>Discover people</button>}

					<br />
					<Progress percentage={step / 5.0 * 100} status={step == 5 ? "success" : undefined }/> 


				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	stepInc: () => dispatch(step()),
	stepBack: () => dispatch(stepBack()),
	saveUserData: (emitMessage, profile) => dispatch(saveUserData(emitMessage, profile))
});

const mapStateToProps = (state, props) => ({
	profile: state.user,
	step: state.onboarding.step
});

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);

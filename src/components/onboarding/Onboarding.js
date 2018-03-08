import React from 'react';
import { connect } from 'react-redux';
import { pick } from 'ramda';
import { Progress, Button } from 'element-react';
import 'element-theme-default';
import { Redirect } from 'react-router-dom';

import OnboardingProfile from './OnboardingProfile';
import OnboardingGender from './OnboardingGender';
import OnboardingPhoto from './OnboardingPhoto';
import OnboardingTags from './OnboardingTags';
import OnboardingLocation from './OnboardingLocation';
import OnboardingBio from './OnboardingBio';

import { step, stepBack, saveUserData } from '../../actions/onboarding';

export class Onboarding extends React.Component {

	getProfile = (formState) => {
		this.props.saveUserData('SERVER/SAVE_PROFILE', pick(['fname', 'lname', 'nickname', 'birthDate'], formState));
	};

	getGender = (genderState) => {
		this.props.saveUserData('SERVER/SAVE_GENDER', pick(['gender', 'orientation'], genderState));
	};

	getPhoto = (photos) => {
		console.log(photos, typeof(photos), 'getPhoto');
		this.props.saveUserData('SERVER/SAVE_PHOTOS', photos);
	};

	getTags = (tags) => {
		this.props.saveUserData('SERVER/SAVE_TAGS', { tags });
	};

	getLocation = (location) => {
		this.props.saveUserData('SERVER/SAVE_LOCATION', location);
	};

	getBio = (bio) => {
		this.props.saveUserData('SERVER/SAVE_BIO', bio);
	};
	
	completeOnboarding = () => {
		this.props.saveUserData('SERVER/COMPLETE_ONBOARDING', {});
	};
	
	render () {

		const { step, isOnboarding } = this.props; 

		const { 
			fname, 
			lname, 
			nickname,
			location,
			gender,
			orientation,
			birthDate,
			tags,
			photos,
			occupation,
			bio
		} = this.props.profile; 

		if (!isOnboarding)
			return (<Redirect to="/dashboard"/>);

		return (
			<div className="l-onb-bg">
				<div className="l-onb-container">

					{step == 0 && 
							<OnboardingProfile 
								fname={this.props.fname}
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
								initialPhotos={photos}
					/>}
					{step == 3 && 
							<OnboardingTags
								getTags={this.getTags}
								tags={tags}
					/>}
					{step == 4 && 
							<OnboardingBio
								getBio={this.getBio}
								bio={bio}
								occupation={occupation}
					/>}
					{step == 5 && 
							<OnboardingLocation 
								getLocation={this.getLocation}
								completeOnboarding={this.completeOnboarding}
								latitude={location ? location.latitude : 0}
								longitude={location ? location.longitude : 0}
								geolocationAllowed={location && location.geolocationAllowed ? true : false}
					/>}

					<div className="l-onb-progress">
						<Progress percentage={step / 5.0 * 100} showText={false} /> 
					</div>
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

const mapStateToProps = (state) => ({
	profile: state.user,
	fname: state.user.fname,
	step: state.onboarding.step,
	isOnboarding: state.auth.isOnboarding
});

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);

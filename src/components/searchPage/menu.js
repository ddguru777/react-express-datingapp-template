import React from 'react';
import { connect } from 'react-redux';
import { Slider } from 'antd';
import ChipInput from 'material-ui-chip-input';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Select } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import MapWithAMarker from './map';
import { updateAge } from '../../actions/search';

const Option = Select.Option;

// FOR TEST PURPOSE ONLY, TO MOVE IN ENV
const GOOGLE_GEOLOCATION_API_KEY = 'AIzaSyC3VByoAFwfYTsXvC5GgS0F6mEiJuoku2Y';
//AIzaSyC2Z8zLwy0uT8hd8qyBgfMmoqpKJRZwRkI

const style = () => {
	const { innerWidth } = window;

	switch (true) {
		case (innerWidth < 321): 
			return { width: 270 }; 
			break;
		case (innerWidth < 769): 
			return { width: 300 }; 
			break;
		default:	
			return { width: 330 }; 
	}
};

export class SearchMenu extends React.Component {
	constructor(props) {
		super(props);
		
		const filters = this.props.searchParams;		
		this.state = {
			distanceRange: [filters.distance.min, filters.distance.max],	
			ageRange: [filters.age.min, filters.age.max],	
			popularityRange: [filters.popularity.min, filters.popularity.max],	
			tags: filters.tags ? filters.tags : [],
			sort: filters.sortBy,	
		};
	}

	onSort = (value) => {
		const sort = value;
		this.setState(() => ({ sort }));
	}

	getDistance = (value) => {
		const distanceRange = value;
		this.setState(() => ({ distanceRange }));
	}
	
	getAge = (value) => {
		const ageRange = value;
		this.setState(() => ({ ageRange }));
	}
	
	getPopularity = (value) => {
		const popularityRange = value;
		this.setState(() => ({ popularityRange }));
	}
	
	handleAddtag = (tag) => {
		const tags = [...this.state.tags, tag];
		this.setState({ tags });
	};	 

	handleDeletetag = (tag, index) => {
		const tags = this.state.tags.filter((elem) => elem !== tag);
		this.setState({ tags });
	};	 

	getTags	= () => {
		const tags = this.state.tags.map((tag) => tag.toLowerCase().trim());
		this.props.getTags(tags);
	};

	getProfiles = (i = 0) => {
		const state = this.state;
		const data = {
			...state,
			nextProfileIndex: i,
		};
		this.props.getProfiles(data);
		
		if (i === 0) {
			this.props.getProfilesCount(data);
		}
	}

	debouncedGet = _.debounce(this.getProfiles , 300);

	componentDidUpdate = (prevProps, prevState) => {
		if (JSON.stringify(prevState) != JSON.stringify(this.state)) {
			this.props.onChangedFilters(0);
		}
		if 	(
				(prevProps.focusedProfile == this.props.focusedProfile) &&
				(JSON.stringify(prevState) != JSON.stringify(this.state) || prevProps.profiles != this.props.profiles)
			)
		{
			if (prevProps.profiles == this.props.profiles) {
				this.debouncedGet();
			} else {
				this.debouncedGet(this.props.profiles);
			}
		}
	}
	
	componentWillMount =  () => {
		this.props.updateAge(this.props.userProfile.birthdate);
		this.getProfiles();
	}
	
	getMapZoom = (maxDistance) => {
		if (maxDistance < 10) {
			return 11;
		} else if ( maxDistance < 17) {
			return 10;
		} else if ( maxDistance < 40) {
			return 9;
		} else if ( maxDistance < 75) {
			return 8;
		} else if ( maxDistance < 75) {
			return 8;
		} else if ( maxDistance < 99) {
			return 7;
		} else {
			return 5;
		}
	};

	formatPhoto = (url) => {
		url = url.replace(/v[0-9]+\//i, "g_face,c_thumb,w_40,h_40,r_max/e_shadow/");
		url = url.replace(/\.[0-9a-z]+$/i, ".png");
		return url;
	}

	getFocusedProfile = (profile) => {
		if (!profile) {
			return false;
		}
		return {
			lat: parseFloat(profile.latitude),
			lon: parseFloat(profile.longitude),
			photo: this.formatPhoto(profile.photos[0]),
		};
	}
	
	getUserProfile = (profile) => {
		
		return {
			lat: parseFloat(profile.location.latitude),
			lon: parseFloat(profile.location.longitude),
			photo: this.formatPhoto(profile.photos[0]),
		};
	}
	
	render() {
		const focusedProfile = this.getFocusedProfile(this.props.focusedProfile);
		const userProfile = this.getUserProfile(this.props.userProfile);
		return (
			<div className="c-menu__wrapper">
				<div className="c-menu__title-container">
					<h2 className="c-menu__title">Filters</h2>
					<div>
						<p className="c-sort__title">Sort by</p>
						<Select defaultValue={this.state.sort} style={{ width: 120 }} onChange={this.onSort}>
							<Option value="distance">distance</Option>
							<Option value="birthdate">age</Option>
							<Option value="score">score</Option>
						</Select>
					</div>
				</div>
				<div className="c-slider">
					<div className="c-slider__text-box">
						<p className="c-slider__text c-slider__title">Distance (km)</p>
						<div>
							<p className="c-slider__text c-slider__value">{ this.state.distanceRange[0] }</p>
							<p className="c-slider__text">-</p>
							<p className="c-slider__text c-slider__value">
								{ this.state.distanceRange[1] == 100 ? "100+" : this.state.distanceRange[1] }
							</p>
						</div>
					</div>
					<Slider range defaultValue={this.state.distanceRange} onChange={this.getDistance} />
				</div>
				<div className="c-slider">
					<div className="c-slider__text-box">
						<p className="c-slider__text c-slider__title">Age</p>
						<div>
							<p className="c-slider__text c-slider__value">{ this.state.ageRange[0] }</p>
							<p className="c-slider__text">-</p>
							<p className="c-slider__text c-slider__value">
								{ this.state.ageRange[1] == 100 ? "100+" : this.state.ageRange[1] }
							</p>
						</div>
					</div>
					<Slider range min={18} defaultValue={this.state.ageRange} onChange={this.getAge} />
				</div>
				<div className="c-slider">
					<div className="c-slider__text-box">
						<p className="c-slider__text c-slider__title">Popularity</p>
						<div>
							<p className="c-slider__text c-slider__value">{ this.state.popularityRange[0] }</p>
							<p className="c-slider__text">-</p>
							<p className="c-slider__text c-slider__value">
								{ this.state.popularityRange[1] == 1000 ? "1000+" : this.state.popularityRange[1] }
							</p>
						</div>
					</div>
					<Slider range max={1000} defaultValue={this.state.popularityRange} onChange={this.getPopularity} />
				</div>
				<div className="c-menu__title-container c-menu__title-container--solo">
					<h2 className="c-menu__title">Tags</h2>
				</div>
				<div className="c-menu__tag-n-map">
					<MuiThemeProvider>
						<div className="c-menu__tags">
							<ChipInput
								value={this.state.tags}
								onRequestAdd={(tag) => this.handleAddtag(tag)}
								onRequestDelete={(tag, index) => this.handleDeletetag(tag, index)}
								underlineStyle={{ }}
								hintText={'Add some tags (ex. cats, introvert, yoga, ...)'}
								chipContainerStyle={{
									backgroundColor: 'red'
								}}
								underlineFocusStyle={{
									borderBottom: '2px solid #fc2b68'
								}}
								style={style()}
							/>
						</div>
					</MuiThemeProvider>
					<div className="c-menu__map">
						<MapWithAMarker
						  googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_GEOLOCATION_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
						  loadingElement={<div style={{ height: `100%` }} />}
						  containerElement={<div style={{ height: `400px` }} />}
						  mapElement={<div style={{ height: `100%` }} />}
						  zoom={this.getMapZoom(this.state.distanceRange[1])}
						  me={userProfile}
						  profile={focusedProfile}
						/>
					</div>
				</div>
			</div>
		);
	}
}

const birthdateToAgeRange = (birthdate) => {
    if (birthdate === null) {
        birthdate = '1990-04-05 22:00:00+00';
    }
    let age = moment().diff(birthdate, 'years');
    const min = age - 5 < 18 ? 18 : age - 5;
    const max = age + 5 > 100 ? 100 : age + 5;
    return { min, max };
}

const mapDispatchToProps = (dispatch) => ({
	updateAge: (birthdate) => dispatch(updateAge(birthdateToAgeRange(birthdate))),
	getProfiles: (data) => dispatch({
		type: 'SERVER/GET_PROFILES',
		data
	}),
	getProfilesCount: (data) => dispatch({
		type: 'SERVER/GET_PROFILES_COUNT',
		data
	})
});

const mapStateToProps = (state) => {
	return {
		focusedProfile: state.search.focusedProfile,
		userProfile: state.user,
		searchParams: 	{
							distance: state.search.distance,
							age: state.search.age,
							popularity: state.search.popularity,
							tags: state.search.tags,
							sortBy: state.search.sortBy,
						},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchMenu);

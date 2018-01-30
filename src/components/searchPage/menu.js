import React from 'react';
import { connect } from 'react-redux';
import { Slider } from 'antd';
import ChipInput from 'material-ui-chip-input';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MapWithAMarker from './map';

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
		
		this.state = {
			distanceRange: [5, 40],	
			ageRange: [24, 34],	
			popularityRange: [50, 400],	
			tags: this.props.tags ? this.props.tags : []
		};
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

	getMapZoom = (maxDistance) => {
		if (maxDistance < 6) {
			return 14;
		} else if ( maxDistance < 11) {
			return 12;
		} else if ( maxDistance < 25) {
			return 11.5;
		} else if ( maxDistance < 50) {
			return 11;
		} else if ( maxDistance < 75) {
			return 10.5;
		} else if ( maxDistance < 99) {
			return 10;
		} else {
			return 5;
		}
	};

	render() {
		return (
			<div className="c-menu__wrapper">
				<div className="c-menu__title-container">
					<h2 className="c-menu__title">Filters</h2>
					<div>
						<p className="c-sort__title">Sort by</p>
						<select className="c-onb-form__input--select">
							<option value="0">distance</option>
							<option value="1">age</option>
							<option value="2">popularity</option>
						</select>
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
								hintText={'Add some tags (ex. Cool, Cat, ...)'}
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
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		notif: state.notif.notification,
	};
};

export default connect(mapStateToProps, undefined)(SearchMenu);

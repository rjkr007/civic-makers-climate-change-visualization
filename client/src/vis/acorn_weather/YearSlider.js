import React from "react";


class YearSlider extends React.Component {
    /**
     * A time slider which allows selecting
     * how many days before today (or today)
     *
     * @param props possible params:
     *              * numDays -> number of days you can go back by
     */
    constructor(props) {
        super(props);
        this.extraStyles = props.extraStyles || {};
        this.state = {
            year: props['year']
        };
        this.minYear = props['minYear'];
        this.maxYear = props['maxYear'];
    }

    /*******************************************************************
     * HTML Template
     *******************************************************************/

    render() {
        return (
            <form className="map-slider-container"
                  ref={el => this.mapSliderCont = el}
                  style={{display: "flex"}}>
                <label className="map-slider-item"
                       style={{width: "7em", textAlign: "center", ...this.extraStyles}}>Year&nbsp;slider:</label>
                <input className="map-slider-item"
                       ref={el => {this.mapSlider = el}}
                       style={{flexGrow: "1", ...this.extraStyles}}
                       onChange={() => this.__onChange()}
                       type="range" step="1"
                       min={this.props.minYear}
                       max={this.props.maxYear}
                       defaultValue={this.props.year} />
                <label className="map-slider-item"
                       ref={el => {this.mapSliderLabel = el}}
                       style={{width: "6em", textAlign: "center", ...this.extraStyles}}>{
                           this.state.year
                       }</label>
            </form>
        )
    }

    /**
     * Event for when the slider changes value
     *
     * @private
     */
    __onChange() {
        let newValue = this.mapSlider.value;

        if (!this.state.value || this.state.value.getTime() !== newValue) {
            this.setState({
                year: newValue
            });
        }

        if (this.props.onChange) {
            this.props.onChange(newValue);
        }
    }

    /*******************************************************************
     * Hide/show
     *******************************************************************/

    /**
     * Hide this time slider control
     */
    hide() {
        this.mapSliderCont.style.display = 'none';
    }

    /**
     * Show this time slider control
     */
    show() {
        this.mapSliderCont.style.display = 'flex';
    }

    /*******************************************************************
     * Get value
     *******************************************************************/

    /**
     * Get the current value of the slider as a DateType
     *
     * @returns {DateType}
     */
    getValue() {
        return this.state.year;
    }

    /**
     *
     * @param year
     */
    setValue(year) {
        this.setState({ year: year });
    }
}

export default YearSlider;

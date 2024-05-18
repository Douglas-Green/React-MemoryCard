/** @format */

import {Component} from "react";
import PropTypes from "prop-types";
import "./App.css";

class CardView extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (!this.props.matched && !this.props.imageUp) {
      this.props.onClick(this.props.id, this.props.image);
    }
  }

  render() {
    const {image, imageUp, matched} = this.props;
    const imPath = imageUp ? `/images/${image}.png` : `/images/back.png`;

    let className = "Card";
    if (matched) {
      className += " Matched";
    }

    return (
      <img
        className={className}
        src={imPath}
        alt="memory card"
        onClick={this.onClick}
      />
    );
  }
}

CardView.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.number.isRequired,
  imageUp: PropTypes.bool.isRequired,
  matched: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CardView;

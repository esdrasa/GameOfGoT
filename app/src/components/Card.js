import React, { Component } from "react";

export default class Card extends Component {
  render() {
    return (
      <article
        onAnimationEnd={this.props.animationEndHandler}
        className={`characterCard ${this.props.addicionalClass}`}
      >
        <header
          className={`characterCard-header__wrapper ${
            this.props.isCharacterAlive ? "" : "--isDead"
          }`}
        >
          <h1 className="characterCard-name">{this.props.characterName}</h1>
        </header>
        <ul className="characterCard-body">
          <li className="characterCard-culture">
            Culture: {this.props.characterCulture}
          </li>
          <li className="characterCard-gender">
            Gender: {this.props.characterGender}
          </li>
        </ul>
        <footer className="choaracterCard-seasonAppearence">
          Featured in {this.props.characterSeasonAppearence} seasons
        </footer>
      </article>
    );
  }
}

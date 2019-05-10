import React from "react";
import axios from "axios";
import "./App.css";
import Card from "./components/Card.js";
import Button from "./components/Button.js";
import CardLoading from "./components/CardLoading.js";

const IS_LOADING = "IS_LOADING";
const IS_ENTERING = "IS_ENTERING";
const IS_LEAVING = "IS_LEAVING";
const IS_VISIBLE = "IS_VISIBLE";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      characters: [],
      actualCharacter: 0,
      statusCard: IS_LOADING
    };
  }

  componentDidMount() {
    axios({
      method: "GET",
      url:
        "https://www.anapioficeandfire.com/api/characters?page=2&pageSize=100"
    }).then(response => {
      this.setState(state => {
        return {
          characters: response.data,
          statusCard: IS_ENTERING
        };
      });
    });
  }

  renderCard = () => {
    const character = this.state.characters[this.state.actualCharacter];
    switch (this.state.statusCard) {
      default:
      case IS_LOADING:
        return <CardLoading />;
      case IS_ENTERING:
        return (
          <Card
            addicionalClass="--cardIn"
            characterName={character.name}
            characterCulture={character.culture}
            characterGender={character.gender}
            characterSeasonAppearence={character.tvSeries.length}
            isCharacterAlive={Boolean(character.died)}
            animationEndHandler={() => {
              this.setState({ statusCard: IS_VISIBLE });
            }}
          />
        );
      case IS_VISIBLE:
        return (
          <Card
            characterName={character.name}
            characterCulture={character.culture}
            characterGender={character.gender}
            characterSeasonAppearence={character.tvSeries.length}
            isCharacterAlive={Boolean(character.died)}
          />
        );
      case IS_LEAVING:
        return (
          <Card
            addicionalClass="--cardOut"
            characterName={character.name}
            characterCulture={character.culture}
            characterGender={character.gender}
            characterSeasonAppearence={character.tvSeries.length}
            isCharacterAlive={Boolean(character.died)}
            animationEndHandler={() => {
              this.setState(state => ({
                actualCharacter: Math.floor(
                  Math.random() * state.characters.length
                ),
                statusCard: IS_ENTERING
              }));
            }}
          />
        );
    }
  };

  render() {
    return (
      <main className="appRoot__wrapper">
        {this.renderCard()}
        <Button
          onClickr={click => {
            this.setState(state => {
              return {
                statusCard: IS_LEAVING
              };
            });
          }}
        />
      </main>
    );
  }
}

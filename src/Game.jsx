/** @format */

import {Component} from "react";
import "./App.css";
import CardView from "./CardView";
import MemoryCards from "./MemoryCards";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turnNo: 1,
      pairsFound: 0,
      numClicksWithinTurn: 0,
      firstId: undefined,
      secondId: undefined,
    };

    this.onCardClicked = this.onCardClicked.bind(this);
    this.onPlayAgain = this.onPlayAgain.bind(this);
    this.memoryCards = new MemoryCards();
  }

  componentDidMount() {
    this.initGame();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  initGame() {
    this.memoryCards.generateCardSet();
    this.setState({
      turnNo: 1,
      pairsFound: 0,
      numClicksWithinTurn: 0,
      firstId: undefined,
      secondId: undefined,
    });
  }

  getCardViews() {
    return this.memoryCards.cards.map(c => (
      <CardView
        key={c.id}
        id={c.id}
        image={c.image}
        imageUp={c.imageUp}
        matched={c.matched}
        onClick={this.onCardClicked}
      />
    ));
  }

  clearCards(id1, id2) {
    if (this.state.numClicksWithinTurn !== 2) {
      return;
    }
    this.memoryCards.flipCard(this.state.firstId, false);
    this.memoryCards.flipCard(this.state.secondId, false);
    this.setState(prevState => ({
      firstId: id1,
      secondId: id2,
      numClicksWithinTurn: 0,
      turnNo: prevState.turnNo + 1,
    }));
  }

  onCardClicked(id) {
    if (
      this.state.numClicksWithinTurn === 0 ||
      this.state.numClicksWithinTurn === 2
    ) {
      if (this.state.numClicksWithinTurn === 2) {
        clearTimeout(this.timeout);
        this.clearCards(this.state.firstId, this.state.secondId);
      }
      this.memoryCards.flipCard(id, true);
      this.setState({
        firstId: id,
        numClicksWithinTurn: 1,
      });
    } else if (this.state.numClicksWithinTurn === 1) {
      this.memoryCards.flipCard(id, true);
      this.setState({
        secondId: id,
        numClicksWithinTurn: 2,
      });

      if (this.memoryCards.cardsHaveIdenticalImages(id, this.state.firstId)) {
        this.memoryCards.setCardAsMatched(this.state.firstId, true);
        this.memoryCards.setCardAsMatched(id, true);
        this.setState(prevState => ({
          pairsFound: prevState.pairsFound + 1,
          firstId: undefined,
          secondId: undefined,
          turnNo: prevState.turnNo + 1,
          numClicksWithinTurn: 0,
        }));
      } else {
        this.timeout = setTimeout(() => {
          this.clearCards(this.state.firstId, this.state.secondId);
        }, 5000);
      }
    }
  }

  onPlayAgain() {
    this.initGame();
  }

  render() {
    const cardViews = this.getCardViews();
    let gameStatus = (
      <div className="Game-status">
        <div>Turn: {this.state.turnNo}</div>
        <div>Pairs found: {this.state.pairsFound}</div>
      </div>
    );

    if (this.state.pairsFound === this.memoryCards.NUM_IMAGES) {
      gameStatus = (
        <div className="Game-status">
          <div>GAME COMPLETE!</div>
          <div>You used {this.state.turnNo - 1} turns</div>
          <div>
            <button onClick={this.onPlayAgain}>Play again?</button>
          </div>
        </div>
      );
    }

    return (
      <div className="Game">
        <header className="Game-header">
          <div className="Game-title">A Memory game in React</div>
        </header>
        <div>{gameStatus}</div>
        <div className="CardContainer">{cardViews}</div>
      </div>
    );
  }
}

export default Game;

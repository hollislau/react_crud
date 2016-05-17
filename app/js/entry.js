/* eslint-disable max-len */
const React = require("react");
const ReactDOM = require("react-dom");
const update = require("react-addons-update");
const request = require("superagent");
const baseUrl = "http://localhost:3000/api/startrekchars";

var StarTrek = React.createClass({
  getInitialState: function () {
    return {
      characters: []
    };
  },

  componentDidMount: function () {
    request
      .get(baseUrl)
      .end((err, res) => {
        if (err) return console.error(err);

        this.setState({
          characters: JSON.parse(res.text)
        });
      });
  },

  addChar: function (char) {
    this.setState({
      characters: this.state.characters.concat([char])
    });
  },

  updateChar: function (index, char) {
    this.setState({
      characters: update(this.state.characters, { $splice: [[index, 1, char]] })
    });
  },

  removeChar: function (index) {
    this.setState({
      characters: update(this.state.characters, { $splice: [[index, 1]] })
    });
  },

  render: function () {
    return (
      <section>
        <h2>Add A New Character</h2>
        <AddChar addNew={ this.addChar }/>
        <h2>Your Collection</h2>
        <CharList editChar={ this.updateChar } delChar={ this.removeChar } chars={ this.state.characters }/>
      </section>
    );
  }
});

var AddChar = React.createClass({
  propTypes: {
    addNew: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      newChar: {}
    };
  },

  updateNewChar: function (e) {
    var nextState = this.state.newChar;

    nextState[e.target.name] = e.target.value;
    this.setState({
      newChar: nextState
    });
  },

  handleAddNew: function (e) {
    var char = this.state.newChar;

    e.preventDefault();

    for (var key in char) {
      if (!char[key]) delete char[key];
    }

    request
      .post(baseUrl)
      .send(char)
      .end((err, res) => {
        if (err) return console.error(err);

        this.props.addNew(JSON.parse(res.text));
        this.setState({
          newChar: {}
        });
      });
  },

  render: function () {
    return (
      <form onSubmit={ this.handleAddNew }>
        <label> Name <input type="text" name="name" value={ this.state.newChar.name } onChange={ this.updateNewChar }/></label>
        <label> Gender <input type="text" name="gender" value={ this.state.newChar.gender } onChange={ this.updateNewChar }/></label>
        <label> Rank <input type="text" name="rank" value={ this.state.newChar.rank } onChange={ this.updateNewChar }/></label>
        <label> Weapon <input type="text" name="weapon" placeholder="Phaser" value={ this.state.newChar.weapon } onChange={ this.updateNewChar }/></label>
        <label> Power <input type="text" name="power" value={ this.state.newChar.power } onChange={ this.updateNewChar }/></label>
        <label> Ship <input type="text" name="ship" placeholder="Enterprise" value={ this.state.newChar.ship } onChange={ this.updateNewChar }/></label>
        <button>Create</button>
      </form>
    );
  }
});

var CharList = React.createClass({
  propTypes: {
    chars: React.PropTypes.array.isRequired,
    delChar: React.PropTypes.func.isRequired,
    editChar: React.PropTypes.func.isRequired
  },

  handleDelChar: function (char) {
    request
      .del(baseUrl + "/" + char._id)
      .end((err) => {
        var index;

        if (err) return console.error(err);

        index = this.props.chars.indexOf(char);
        this.props.delChar(index);
      });
  },

  render: function () {
    var listChars = this.props.chars.map((character, index) => {
      return (
        <li key={ character._id }>
          { character.name } | Gender: { character.gender } | Rank: { character.rank } |
          Weapon: { character.weapon } | Power: { character.power } | Ship: { character.ship }
          <EditChar editChar={ this.props.editChar } char={ character } idx={ index }/>
          <button onClick={() => {this.handleDelChar(character);}}>Delete</button>
        </li>
      );
    });
    return (
      <ul>
        { listChars }
      </ul>
    );
  }
});

var EditChar = React.createClass({
  propTypes: {
    char: React.PropTypes.object.isRequired,
    editChar: React.PropTypes.func.isRequired,
    idx: React.PropTypes.number.isRequired
  },

  getInitialState: function () {
    return {
      modChar: this.props.char
    };
  },

  updateModChar: function (e) {
    var nextState = this.state.modChar;

    nextState[e.target.name] = e.target.value;
    this.setState({
      modChar: nextState
    });
  },

  handleEditChar: function (e) {
    var char = this.state.modChar;

    e.preventDefault();

    for (var key in char) {
      if (!char[key]) delete char[key];
    }

    char._id = this.props.char._id;

    request
      .put(baseUrl + "/" + this.props.char._id)
      .send(char)
      .end((err) => {
        if (err) return console.error(err);

        this.props.editChar(this.props.idx, char);
        this.setState({
          modChar: this.state.modChar
        });
      });
  },

  render: function () {
    return (
      <form onSubmit={ this.handleEditChar }>
        <label> Name <input type="text" name="name" value={ this.state.modChar.name } onChange={ this.updateModChar }/></label>
        <label> Gender <input type="text" name="gender" value={ this.state.modChar.gender } onChange={ this.updateModChar }/></label>
        <label> Rank <input type="text" name="rank" value={ this.state.modChar.rank } onChange={ this.updateModChar }/></label>
        <label> Weapon <input type="text" name="weapon" value={ this.state.modChar.weapon } onChange={ this.updateModChar }/></label>
        <label> Power <input type="text" name="power" value={ this.state.modChar.power } onChange={ this.updateModChar }/></label>
        <label> Ship <input type="text" name="ship" value={ this.state.modChar.ship } onChange={ this.updateModChar }/></label>
        <button>Update</button>
      </form>
    );
  }
});

ReactDOM.render(<StarTrek/>, document.getElementById("app"));

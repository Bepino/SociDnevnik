import React from 'react';
import ReactDOM from 'react-dom'
import './App.css';
import * as microsoftTeams from "@microsoft/teams-js";
import tempset from "./tempset.json"

/**
 * The 'GroupTab' component renders the main tab content
 * of your app.
 */
class Tab extends React.Component {
  constructor(props){
    super(props)

    this.state = {
        username: 'AII@eduemail',
        password: 'Šifra',
        predmet: 'None'
      };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.HandleClickIspit = this.HandleClickIspit.bind(this);
    this.HandleClickBilj = this.HandleClickBilj.bind(this);
    this.HandleClickIzost = this.HandleClickIzost.bind(this);
    this.HandleClickVlad = this.HandleClickVlad.bind(this);
  }

  //React lifecycle method that gets called once a component has finished mounting
  //Learn more: https://reactjs.org/docs/react-component.html#componentdidmount
  componentDidMount(){
    // Get the user context from Teams and set it in the state
    microsoftTeams.getContext((context, error) => {
      this.setState({
        context: context
      });
    });
    // Next steps: Error handling using the error object
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name
    this.setState({[name]: value});  
  }

  //form submit
  handleSubmit(event) {
    //content page
    event.preventDefault();
    let html = tempset.predmeti[0][1];
    //eslint-disable-next-line
    let content = <div dangerouslySetInnerHTML={{__html : [html.replace(/\"/g, '"').slice(2, html.length-2)]}}></div>;
    ReactDOM.render(content, document.getElementById("root"));

    ReactDOM.render(<div>{tempset.predmeti[0][0]}</div>, document.getElementById('root-header'));

    // Predmet botuni
    let predmeti = [];
      tempset.predmeti.forEach(element => {
          // eslint-disable-next-line
          predmeti.push(<li key={element[0]}><button id={element[0].replace(/ /g, '-')} onClick={this.handleClick}>{element[0]}</button></li>);
      });;

    let menu = <ul>{predmeti}</ul>;
    ReactDOM.render(menu, document.getElementById("menu-predmeti"));
    
    //Info o učeniku
    ReactDOM.render(<div>
      <div className="info-name">{tempset.ime} {tempset.prezime}</div>
      <div className="info-skola">{tempset.razred} | {tempset.skola}</div>
      <div className="info-razrednik">Razrednik: {tempset.razrednik}</div>
      </div>
      , document.getElementById("user-info"));

    //Menu botuni za ispit/bilj/izostanci ...
    ReactDOM.render(<div className="menu-buttons">
      <button onClick={this.HandleClickIspit}>Ispiti</button>
      <button onClick={this.HandleClickBilj}>Bilješke</button>
      <button onClick={this.HandleClickIzost}>Izostanci</button>
      <button onClick={this.HandleClickVlad}>Vladanje</button>
      </div>,document.getElementById('menu-content'))

  }

  //When we click the vladanje button in perticular
  HandleClickVlad(event) {
    event.preventDefault();

    //never put an unnecessary escape character in my life, not even my father
    // eslint-disable-next-line
    let html = <div className="vladanje" dangerouslySetInnerHTML={{__html : [tempset.vladanja.replace(/\"/g, '"').slice(2, tempset.vladanja.length-2)]}}></div>;

    ReactDOM.render(html ,document.getElementById('root'))
    ReactDOM.render(<div>Vladanje</div>, document.getElementById('root-header'))
  }

  //When we click the izostanci button in perticular
  HandleClickIzost(event) {
    event.preventDefault();

    //never put an unnecessary escape character in my life, not even my father
    // eslint-disable-next-line
    let html = <div className="izostanci" dangerouslySetInnerHTML={{__html : [tempset.izostanci.replace(/\"/g, '"').slice(2, tempset.izostanci.length-2)]}}></div>;

    ReactDOM.render(html ,document.getElementById('root'))
    ReactDOM.render(<div>Izostanci</div>, document.getElementById('root-header'))
  }

  //When we click the bilj button in perticular
  HandleClickBilj(event) {
    event.preventDefault();

    //never put an unnecessary escape character in my life, not even my father
    // eslint-disable-next-line
    let html = <div className="biljeske" dangerouslySetInnerHTML={{__html : [tempset.biljeske.replace(/\"/g, '"').slice(2, tempset.biljeske.length-2)]}}></div>;

    ReactDOM.render(html ,document.getElementById('root'))
    ReactDOM.render(<div>Bilješke</div>, document.getElementById('root-header'))
  }

  //When we click the ispit button in perticular
  HandleClickIspit(event) {
    event.preventDefault();

    //never put an unnecessary escape character in my life, not even my father
    // eslint-disable-next-line
    let html = <div className="ispiti" dangerouslySetInnerHTML={{__html : [tempset.ispiti.replace(/\"/g, '"').slice(2, tempset.ispiti.length-2)]}}></div>;

    ReactDOM.render(html ,document.getElementById('root'))
    ReactDOM.render(<div>Ispiti</div>, document.getElementById('root-header'))
  }

  //when a menu button is pressed
  handleClick(event) {
      event.preventDefault();

      // uses button id to get what subject we need
      let html;
      tempset.predmeti.forEach(element => {
        if(element[0] === event.target.id.replace(/-/g, ' ')) {
          html = element[1];
          return;
        }
      });
      // so we get the purest of htmls
      // eslint-disable-next-line
      let content = <div className="content" dangerouslySetInnerHTML={{__html : [html.replace(/\"/g, '"').slice(1, html.length-1)]}}></div>;
      ReactDOM.render(content, document.getElementById('root'))

      let title = <span>{event.target.id.replace(/-/g, ' ')}</span>;
      ReactDOM.render(title, document.getElementById('root-header'))
  }

  render() {
      return (
      <div className="loginpage">
        <h1>NOTE : </h1>
        <form onSubmit={this.handleSubmit}>        
          <label>
            E-mail:<br/>
            <input type="email" name="username" value={this.state.username} onChange={this.handleChange} />       
          </label><br/><br/>
          <label>
            Password:<br/>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />       
          </label><br/><br/>
          <input type="submit" value="Submit" />
        </form>
      </div>
      );
  }
}
export default Tab;
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      query: '',
      breweries: [],
	};
	this.handleChange = this.handleChange.bind(this);
  }

  // Code is invoked after the component is mounted/inserted into the DOM tree.
  componentDidMount() {
    const url ='https://api.openbrewerydb.org/breweries?by_state=' + encodeURI('wisconsin');

    fetch(url)
	  .then(result => result.json())
	  .then(result => {
	    this.setState({
	      breweries: result,
	  })
	})
  }

  handleChange(e){
	this.setState({
		query: e.target.value,
	});
  }

  render() {
	const lowerQuery = this.state.query.toLowerCase();
    const filteredBreweryList = this.state.breweries.slice().filter( item => item.name.toLowerCase().indexOf( lowerQuery ) !== -1 );

    return (
      <div>
		<div className='centered'>
		  <h1>{this.props.title}</h1>
          <SearchInput handleChange={(e)=>this.handleChange(e) } query={this.state.query} onClick={() => this.setState({query: ''})} />
		</div>
		<div>
		  <h3>List of Wisconsin Breweries</h3>
		  <BreweryList items={filteredBreweryList.sort((a,b) => a.name.localeCompare(b.name)) }/>
		</div>
		<div className='centered'>
		  Data Source: <a href="https://www.openbrewerydb.org/">Open Brewery DB</a>
		</div>
	  </div>
    );
  }
}

class SearchInput extends React.Component {

  render() {
    return (
	  <div>
	    <input id='query'
	      onChange={(e) => this.props.handleChange(e)}
	      value = {this.props.query}
  		  placeholder="search"/>
  		  <button
  		    onClick={() => this.props.onClick()}>
  		   Clear
  		  </button>

	  </div>
    );
  }
}

class BreweryList extends React.Component {
  constructor(props){
    super(props);
    console.log(props);
  }

  render() {
    return (
      <ul>
          {this.props.items.map(item => (
		     <li key={item.id}>{item.id + ' - ' + item.name}</li>
        ))}
      </ul>
    );
  }
}

ReactDOM.render(
	<App title="NML React Brewery Filter Example"/>,
	document.getElementById('root')
);
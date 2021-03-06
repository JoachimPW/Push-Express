import React, { Component } from 'react';
import Header from './Header';
class News extends Component {

  render() {
    let newsList = []
    this.props.news.forEach(elm => {
      newsList.push(<React.Fragment>
        <article>
          <div class="col-lg-12">
            <div class="card">
              <h1>{elm.title}</h1>
              <h3>{elm.date}</h3>
              <p>{elm.text}</p>
            </div>
            <hr></hr>
          </div>
        </article>
      </React.Fragment>)

    });
    return (
      <React.Fragment>
      
            <Header></Header>
            <div class="container"> 
              <div class="col-lg-12"> 
                  <h1>Nyheder</h1>
              </div>
                 {newsList}
            </div>
    

      </React.Fragment>
    );

  }
}

export default News;

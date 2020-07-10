import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import AddAuthorForm from "./AddAuhorForm";

const authors = [
  {
    name: 'Mark Twain',
    imageUrl: 'images/authors/marktwain.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['The Adventures of Hukleberry Finn','Life on the Mississippi','Roughing']
  },
  {
    name: 'Joseph Conrad',
    imageUrl: 'images/authors/josephconrad.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['Heart of Darkness']
  },
  {
    name: 'J.K.Rowling',
    imageUrl: 'images/authors/jkrowling.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['Harry Potter Series', 'Ruining Childhood Starter Pack']
  }
];

function getTurnData(authors){
  const allBooks = authors.reduce(function(p,c,i){return p.concat(c.books);
  },[]);
  const fourRandomBooks = shuffle(allBooks).slice(0,4);
  const answer = sample(fourRandomBooks);

  return{
    books: fourRandomBooks,
    author: authors.find((author)=>
    author.books.some((title)=>
    title === answer))
  }
}


function resetState(){
  return {
    turnData: getTurnData(authors),
    highlight: ''
  };
}
let state = resetState();

function onAnswerSelected(answer){
  const isCorrect = state.turnData.author.books.some((book) => book === answer);
  state.highlight = isCorrect ? 'correct': 'wrong';
  render();
}


function App(){
  return <AuthorQuiz {...state}
  onAnswerSelected={onAnswerSelected}
  onContinue={()=>{
    state = resetState();
    render();
  }}/>;
}

const AuthorWrapper = withRouter(({history}) =>
   <AddAuthorForm onAddAuthor={(author) => {
    authors.push(authors);
    history.push('/')
  }}/>
);

function render(){
  ReactDOM.render(
  <BrowserRouter>
    <React.Fragment>
      <Route exact path="/" component={App} />
      <Route path="/add" component={AuthorWrapper} />
    </React.Fragment>
  </BrowserRouter>, document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
render();
serviceWorker.unregister();

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './privateRoute';

import Navigation from './Navigation';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import CourseBrowse from './pages/CourseBrowse';
import MyCourses from './pages/MyCourses';
import SearchPage from './pages/SearchPage';
import Course from './pages/Course';
import FacilitatorList from './pages/FacilitatorList';
import StudentList from './pages/StudentList';
import CourseForum from './pages/CourseForum';
import ForumTopic from './pages/ForumTopic';
import DiscussionThreads from './pages/DiscussionThreads';
import NewForumEntry from './pages/NewForumEntry';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Navigation></Navigation>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/Home" component={MainPage} />
          <Route exact path="/Login" component={LoginPage} />
          <Route exact path="/CourseBrowse" component={CourseBrowse} />
          <PrivateRoute exact path="/MyCourses" component={MyCourses} />
          <Route exact path="/Search" component={SearchPage} />
          <Route exact path="/Course" component={Course} />
          <Route exact path="/FacilitatorList" component={FacilitatorList} />
          <Route exact path="/StudentList" component={StudentList} />
          <Route exact path="/CourseForum" component={CourseForum} />
          <Route exact path="/ForumTopic" component={ForumTopic} />
          <Route exact path="/DiscussionThreads" component={DiscussionThreads} />
          <Route exact path="/NewForumEntry" component={NewForumEntry} />
        </Switch>
      </Router>
    );
  }
}

export default App;

// For debugging purposes
//
// <h1>USER DATABASE</h1>
// <div className="App-intro">
//   {this.state.data.map((user, i) => (
//     <div key={`${i}-user`}>
//       <span key={`${i}-name`}>Name: {user.name} | </span>
//       <span key={`${i}-uid`}>uid: {user.uid} | </span>
//       <span key={`${i}-pass`}>pass: {user.pass} | </span>
//       <span key={`${i}-faculty`}>faculty: {user.faculty}</span>
//     </div>
//   ))}
// </div>

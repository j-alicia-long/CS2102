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
import Account from './pages/Account';
import ManageStudent from './pages/ManageStudent';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Navigation />
        </div>
        <div>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/Home" component={MainPage} />
            <Route exact path="/Login" component={LoginPage} />
            <Route exact path="/CourseBrowse" component={CourseBrowse} />
            <Route exact path="/Course" component={Course} />
            <Route exact path="/FacilitatorList" component={FacilitatorList} />
            <Route exact path="/Search" component={SearchPage} />
            <Route exact path="/StudentList" component={StudentList} />
            <Route exact path="/ForumTopic" component={ForumTopic} />
            <Route exact path="/ManageStudent" component={ManageStudent} />
            <Route exact path="/CourseForum" component={CourseForum} />
            <PrivateRoute exact path="/Account" component={Account} />
            <PrivateRoute exact path="/MyCourses" component={MyCourses} />
            <PrivateRoute exact path="/DiscussionThreads" component={DiscussionThreads} />
            <PrivateRoute exact path="/NewForumEntry" component={NewForumEntry} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

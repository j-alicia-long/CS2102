import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./privateRoute";

import Navigation from "./Navigation";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import MyCourses from "./pages/MyCourses";
import CourseSearch from "./pages/CourseSearch";
import Course from "./pages/Course";
import FacilitatorList from "./pages/FacilitatorList";
import StudentList from "./pages/StudentList";
import CourseForum from "./pages/CourseForum";
import ForumTopic from "./pages/ForumTopic";
import DiscussionThreads from "./pages/DiscussionThreads";
import NewForumEntry from "./pages/NewForumEntry";
import Account from "./pages/Account";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Navigation></Navigation>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/Home" component={MainPage} />
          <Route exact path="/Login" component={LoginPage} />
          <PrivateRoute exact path="/Account" component={Account} />
          <PrivateRoute exact path="/MyCourses" component={MyCourses} />
          <PrivateRoute exact path="/Search" component={CourseSearch} />
          <PrivateRoute exact path="/Course" component={Course} />
          <PrivateRoute
            exact
            path="/FacilitatorList"
            component={FacilitatorList}
          />
          <PrivateRoute exact path="/StudentList" component={StudentList} />
          <PrivateRoute exact path="/CourseForum" component={CourseForum} />
          <PrivateRoute exact path="/ForumTopic" component={ForumTopic} />
          <PrivateRoute
            exact
            path="/DiscussionThreads"
            component={DiscussionThreads}
          />
          <PrivateRoute exact path="/NewForumEntry" component={NewForumEntry} />
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

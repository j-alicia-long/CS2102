import React from "react";
import "../App.css";
import CourseNavBar from "./CourseNavBar";

import { Icon } from "@iconify/react";
import accountIcon from "@iconify/icons-mdi/account";
import { Navbar, Card } from "react-bootstrap";

class FacilitatorList extends React.Component {
  render() {
    return (
      <div>
        <Navbar className="navbar">This is Nav Bar</Navbar>
        <div className="body">
          <CourseNavBar />
          <div className="facil-list-bg rounded">
            <div className="facil-layout">
              <Card className="facil-card">
                <Icon icon={accountIcon} className="account-icon" />
                <Card.Body>
                  <Card.Text>
                    <h4>John Doe</h4>
                    <p>Lecturer</p>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="facil-card">
                <Icon icon={accountIcon} className="account-icon" />
                <Card.Body>
                  <Card.Text>
                    <h4>Doe John</h4>
                    <p>Teaching Assistant</p>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="facil-card">
                <Icon icon={accountIcon} className="account-icon" />
                <Card.Body>
                  <Card.Text>
                    <h4>Crystal</h4>
                    <p>Teaching Assistant</p>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="facil-card">
                <Icon icon={accountIcon} className="account-icon" />
                <Card.Body>
                  <Card.Text>
                    <h4>Bruce</h4>
                    <p>Teaching Assistant</p>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="facil-card">
                <Icon icon={accountIcon} className="account-icon" />
                <Card.Body>
                  <Card.Text>
                    <h4>Tom</h4>
                    <p>Teaching Assistant</p>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="facil-card">
                <Icon icon={accountIcon} className="account-icon" />
                <Card.Body>
                  <Card.Text>
                    <h4>Vannessa</h4>
                    <p>Teaching Assistant</p>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="facil-card">
                <Icon icon={accountIcon} className="account-icon" />
                <Card.Body>
                  <Card.Text>
                    <h4>Tris</h4>
                    <p>Teaching Assistant</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FacilitatorList;

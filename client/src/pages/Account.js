import React from "react";
import { authService } from "../authService";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card, Form, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import accountIcon from "@iconify/icons-mdi/account";
import keyVariant from "@iconify/icons-mdi/key-variant";

class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      faculty: "",
      userId: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setDetails();
  }

  componentDidUpdate() {
    if (this.state.name) {
      return;
    }
    this.setDetails();
  }

  setDetails() {
    const user = authService.getUser();
    if (user) {
      this.setState({
        name: user.name,
        faculty: user.faculty,
        userId: user.uid,
        password: user.pass,
        oldPassword: "",
        newPassword: ""
      });
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.password !== this.state.oldPassword) {
      alert("Wrong password!");
    } else {
      fetch(`/users/${this.state.userId}`, {
        method: "PUT",
        body: JSON.stringify({
          name: this.state.name,
          faculty: this.state.faculty,
          pass: this.state.newPassword
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        if (res.status === 201) {
          alert("Password changed successfully");
          this.setState({ password: this.state.newPassword });
        } else {
          alert("Error please try again");
        }
      });
    }
  };

  render() {
    return (
      <div>
        {/* Account Information */}
        <Container className="mt-4">
          <Card>
            <Card.Header>
              <Card.Title
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0"
                }}
              >
                <Icon icon={accountIcon} style={{ margin: "0 1rem 0 0" }} />
                Account Information
              </Card.Title>
            </Card.Header>
            <Card.Body style={{ padding: "4rem 6rem" }}>
              <Row style={{ marginBottom: "1rem" }}>
                <Col sm={2}>
                  <strong>Name</strong>
                </Col>
                <Col sm={10}>{this.state.name}</Col>
              </Row>
              <Row style={{ marginBottom: "1rem" }}>
                <Col sm={2}>
                  <strong>Faculty</strong>
                </Col>
                <Col sm={10}>{this.state.faculty}</Col>
              </Row>
              <Row>
                <Col sm={2}>
                  <strong>User ID</strong>
                </Col>
                <Col sm={10}>{this.state.userId}</Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
        {/*  Password */}
        <Container className="mt-4">
          <Card>
            <Card.Header>
              <Card.Title
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0"
                }}
              >
                <Icon icon={keyVariant} style={{ margin: "0 1rem 0 0" }} />
                Update Password
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group as={Row} controlId="formOldPassword">
                  <Form.Label column sm={2}>
                    Old Password
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      name="oldPassword"
                      type="password"
                      placeholder="Old Password"
                      onChange={this.handleChange}
                      required
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formNewPassword">
                  <Form.Label column sm={2}>
                    New Password
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      name="newPassword"
                      type="password"
                      placeholder="New Password"
                      onChange={this.handleChange}
                      required
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Col sm={{ span: 10 }}>
                    <Button type="submit" variant="danger">
                      Update
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

export default Account;

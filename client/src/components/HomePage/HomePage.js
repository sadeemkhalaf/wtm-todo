import React, { Component } from 'react';
import TodosService from '../../service/todo.service';
import AuthCheck, { authenticationService } from '../../service/authCheck.service';
import { Redirect } from 'react-router-dom';
// rsuite components
import { Alert, Row, Col, Tag, Input, Form, IconButton, FlexboxGrid, Icon, Button, Toggle, Navbar, Nav, Panel } from 'rsuite';
// import default style
import 'rsuite/dist/styles/rsuite-default.css';
import './HomePage.css';

export class HomePage extends Component {
    _isMounted = false;
    subscriptions;

    constructor(props) {
        super(props);
        this.getTodos = this.getTodos.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.editTodo = this.editTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);

        this.onChangeDetails = this.onChangeDetails.bind(this);
        this.onChangeCompleted = this.onChangeCompleted.bind(this);

        this.state = {
            todos: [],
            completedTodos: [],
            title: '',
            todoDetails: '',
            isCompleted: false,
            loggedIn: authenticationService.loginStatusValue
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.subscriptions = authenticationService.isLoggedIn.subscribe((value) => this.setState({ loggedIn: value }));
        this.getTodos();
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.subscriptions.unsubscribe();
    }

    // input event
    onChangeDetails(value) {
        this.setState({ todoDetails: value })
    }

    onChangeCompleted(value) {
        this.setState({ isCompleted: value })
    }

    async getTodos() {
        todosList = await TodosService.GetAllTodos();
        const undoneTodos = todosList.data.filter((todo) => todo.isCompleted === false);
        const doneTodos = todosList.data.filter((todo) => todo.isCompleted === true);
        this.setState({ todos: undoneTodos, completedTodos: doneTodos });
    }

    async addTodo() {
        const todoDetails = this.state.todoDetails;
        const isCompleted = this.state.isCompleted;
        this.setState({ todoDetails: '', isCompleted: false });
        const result = await TodosService.AddTodo({ todoDetails, isCompleted }).then(() => {
            Alert.success(`a new task is added!`, 3000);
            this.getTodos();
        }, error => {
            Alert.error(`task failed to be added!`, 3000);
        });
    }

    async editTodo(todo) {
        await TodosService.UpdateTodo(todo).then(() => {
            Alert.success(`your task is updated!`, 3000);
            this.getTodos();
        }, error => {
            Alert.error(`your task failed to update!`, 3000);
        })
    }

    async deleteTodo(id) {
        await TodosService.DeleteTodo(id).then((result) => {
            Alert.success(`task deleted, way to go!`, 3000);
            this.getTodos();
        }, error => {
            Alert.error(`task failed to be deleted!`, 3000);
        });
    }

    logout() {
        AuthCheck.logout();
    }

    todoStatus(status) {
        const isCompleted = status;
        return (
            <span
                style={{
                    paddingLeft: 15,
                    fontSize: 12,
                    color: isCompleted ? 'green' : 'red'
                }}
            >
                <Tag color={isCompleted ? 'green' : 'red'}>{isCompleted ? 'done' : 'not completed'}</Tag>

            </span>
        );
    }

    RedirectTo() {
        return this.state.loggedIn ? <Redirect push to={'/home'} /> : <Redirect push to={'/login'} />
    }

    render() {
        return (
            <div>
                {this.RedirectTo()}
                <Navbar>
                    <Navbar.Header>
                        <span className="navbar-brand">TODOs</span>
                    </Navbar.Header>
                    <Navbar.Body>
                        <Nav>
                            <Nav.Item icon={<Icon icon="home" />} >Home</Nav.Item>
                        </Nav>
                        <Nav pullRight>
                            <Nav.Item href="/login" onClick={this.logout} icon={<Icon icon="sign-out" />} >Logout</Nav.Item>
                        </Nav>
                    </Navbar.Body>
                </Navbar>

                <div className="App-container">
                    <Form className="todo-input-box" >
                        <h6>Start Adding Todos</h6>
                        <Input
                            onChange={this.onChangeDetails}
                            componentClass="textarea"
                            rows={3}
                            style={{ width: 300, resize: 'auto' }}
                            value={this.state.todoDetails}
                            placeholder="add todo details ..."
                        />
                        <div className="flex-box space-between">
                            <div>
                                <Toggle size="sm" onChange={this.onChangeCompleted}
                                    value={this.state.isCompleted}
                                />
                                <span style={{ fontSize: 12, fontWeight: "bold" }}>  Completed</span>
                            </div>
                            <Button style={{ margin: 10, fontSize: 12 }} onClick={this.addTodo}>
                                <Icon icon="plus" style={{ fontSize: 12, marginRight: 10 }}></Icon>
                     Add
                    </Button>
                        </div>
                    </Form>
                    <Row className="flex-box">
                        <Col md={12} sm={12}>
                            <h3>Todos</h3>
                            <FlexboxGrid>
                                {this.state.todos.map((item) => (
                                    <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 240, margin: 4 }} key={item['_id']}>
                                        <div className="flex-box space-between">
                                            <IconButton
                                                icon={<Icon icon="minus-circle" />}
                                                appearance="subtle"
                                                size="md"
                                                onClick={() => this.deleteTodo(item._id)}
                                            />
                                            <div style={{ margin: 10, fontSize: 13 }}>
                                                <span>completed?
                                                <Toggle size="sm" onChange={() => this.editTodo(item)}
                                                    /></span>
                                            </div>
                                        </div>
                                        <Panel>
                                            <p>
                                                <small>{item.todoDetails}</small>
                                            </p>
                                            {this.todoStatus(item.isCompleted)}
                                        </Panel>
                                    </Panel>
                                ))}
                            </FlexboxGrid>
                        </Col>
                        <Col md={12} sm={12}>
                            <h3>Completed Tasks</h3>
                            <FlexboxGrid>
                                {this.state.completedTodos.map((item) => (
                                    <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 240, margin: 4 }} key={item['_id']}>
                                        <div className="flex-box space-between">
                                            <IconButton
                                                icon={<Icon icon="minus-circle" />}
                                                appearance="subtle"
                                                size="md"
                                                onClick={() => this.deleteTodo(item._id)}
                                            />
                                            <div style={{ margin: 10, fontSize: 13 }}>
                                                <span>incomplete?
                                                <Toggle size="sm" onChange={() => this.editTodo(item)}
                                                    /></span>
                                            </div>
                                        </div>
                                        <Panel>
                                            <p>
                                                <small>{item.todoDetails}</small>
                                            </p>
                                            {this.todoStatus(item.isCompleted)}
                                        </Panel>
                                    </Panel>
                                ))}
                            </FlexboxGrid>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

import React, { Component } from 'react';
import TodosService from '../../service/todo.service';
import AuthService from '../../service/auth.service';

// rsuite components
import { Tag, Input, FlexboxGrid, Icon, Button, Toggle, Navbar, Nav, Panel } from 'rsuite';
// import default style
import 'rsuite/dist/styles/rsuite-default.css';
import './HomePage.css';

export class HomePage extends Component {

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
            isCompleted: false

        }
    }

    componentDidMount() {
        this.getTodos();
    }

    // input event
    onChangeDetails(value) {
        this.setState({ todoDetails: value })
    }
    onChangeCompleted(value) {
        this.setState({ isCompleted: value })
    }

    async getTodos() {
        let todosList = await TodosService.GetAllTodos();
        this.setState({ todos: todosList.data });
    }

    async addTodo() {
        const todoDetails = this.state.todoDetails;
        const isCompleted = this.state.isCompleted;
        await TodosService.AddTodo({ todoDetails, isCompleted }).then((result) => {
            console.log(result);
            this.componentDidMount();
            this.setState({ todoDetails: '', isCompleted: false });
        }, error => {
            console.warn(error);
        });
    }

    editTodo(id) {

    }

    deleteTodo(id) {

    }

    logout() {
        AuthService.Logout();
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

    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <a className="navbar-brand">TODOs</a>
                    </Navbar.Header>
                    <Navbar.Body>
                        <Nav>
                            <Nav.Item icon={<Icon icon="home" />} >Home</Nav.Item>
                        </Nav>
                        <Nav pullRight>
                            <Nav.Item onClick={this.logout} icon={<Icon icon="sign-out" />} >Logout</Nav.Item>
                        </Nav>
                    </Navbar.Body>
                </Navbar>

                <div className="App-container">
                    <div className="todo-input-box">
                        <Input
                            onChange={this.onChangeDetails}
                            componentClass="textarea"
                            rows={3}
                            style={{ width: 300, resize: 'auto' }}
                            placeholder="add todo details ..."
                        />
                        <div>
                            <Toggle size="sm" onChange={this.onChangeCompleted} />
                            <span style={{ fontSize: 12, fontWeight: "bold" }}>  Completed</span>

                        </div>
                    </div>
                    <Button style={{ margin: 10, fontSize: 12 }} onClick={this.addTodo}>
                        <Icon icon="plus" style={{ fontSize: 12, marginRight: 10 }}></Icon>
                     Add
                    </Button>
                    <FlexboxGrid>
                        {this.state.todos.map((item) => (
                            <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 240, margin: 4 }} key={item['_id']}>
                                <Panel header="TODO">
                                    <p>
                                        <small>{item.todoDetails}</small>
                                    </p>
                                    {this.todoStatus(item.isCompleted)}
                                </Panel>
                            </Panel>
                        ))}
                    </FlexboxGrid>
                </div>
            </div>
        );
    }
}

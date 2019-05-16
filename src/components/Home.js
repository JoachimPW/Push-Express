import React, { Component } from 'react'
import News from "./News.js";
import Calendar from "./Calendar.js"
import Header from "./Header.js";
import gif from '../../src/wifi-4.4s-253px.gif';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "HEJ",
            title: "DAV",
            news: [],
            days: [],
            status: "",
            gif: ""
        }
        this.sendNoti = this.sendNoti.bind(this);
        this.checkStatus = this.checkStatus.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(() => this.checkStatus(), 1000);

        //https://express-push.herokuapp.com/
        // http://localhost:9090
        fetch('https://express-push.herokuapp.com/getNews')
            .then(response => response.json())
            .then(data => this.setState({ news: data }))

        fetch('https://express-push.herokuapp.com/getDays')
            .then(response => response.json())
            .then(data => this.setState({ days: data }))
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    checkStatus() {
        if (!navigator.onLine) {
            console.log("OFFLINE")
            this.setState({
                status: "Offline",
                gif: <img src={gif} />
            })
        }
        else if (navigator.onLine) {
            this.setState({
                status: "Online",
                gif: ""
            })
        }
    };

    sendNoti(text, title) {
        fetch('https://express-push.herokuapp.com/api/push_message', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                text: text,
                title: title
            }),
        }).catch(error => console.error(error));
    }

    render() {

        return (
            <Router>
                <React.Fragment>
                    <Switch>
                        <Route exact path={"/"}
                            render={(props) =>
                                <React.Fragment>
                                    <div className="wrapper">
                                        <div id="content">
                                            <Header></Header>
                                            <div>
                                                <h1>{this.state.status}</h1>
                                                <img style={{ display: "none" }} src={gif} />
                                                {this.state.gif}
                                            </div>
                                            <div>
                                                <div class="no-display-push">
                                                    <div className="container">
                                                        <h1>Push Notifications</h1>
                                                        <button onClick={() => this.sendNoti(this.state.text, this.state.title)}>SEND NOTI</button>
                                                        <p>This page will try to display Notifications from Web Push messages.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="front-wrapper">
                                                <h1><span>Kinder</span>garten</h1>
                                                <img src="https://unixtitan.net/images/ballon-vector-kids-3.png" />
                                                <a href="/news" ><button className="btn btn-primary center-block"> News </button></a>
                                                <a href="/calendar"><button className="btn btn-primary center-block"> Calendar </button></a>
                                            </div>
                                        </div></div>
                                </React.Fragment>
                            }
                        />
                        <Route exact path={"/News"}
                            render={(props) =>
                                <React.Fragment>
                                    <News {...props} news={this.state.news} />
                                </React.Fragment>}
                        />

                        <Route exact path={"/Calendar"}
                            render={(props) =>
                                <React.Fragment>
                                    <Calendar {...props} days={this.state.days} />
                                </React.Fragment>}
                        />
                    </Switch>
                </React.Fragment>
            </Router>
        )
    }
}

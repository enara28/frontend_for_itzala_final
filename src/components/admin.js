import React, {Component} from "react";
import axios from "axios";

import Header from './header';
import Footer from "./footer";
import User from "./user";

export default class Admin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            producto: "",
            tiempo: "",
            precio: "",
            errorText: "",
            users: []
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errorText: ""
    });
    }

    handleSubmit(event) {
        axios.post("http://localhost:5000/menu-item", {
            "producto": this.state.producto,
            "tiempo": this.state.tiempo,
            "precio": this.state.precio
        }).then(response => console.log(response)).catch(error => console.log(error))
        event.preventDefault();
    }

    get_all_users() {
            axios.get(`http://localhost:5000/usuarios`, {withCredentials: true})
            .then(response => {
                this.setState({
                    users: response.data.result
                }), console.log(response.data.result)
            })
            .catch(err => console.log("error mio", err))
        }
    
    componentDidMount() {
        if (this.props.status == "admin"){
            this.get_all_users()
        }
    }

    usersInfo() {
        return this.state.users.map(user => {
                return <User key={user.id} user={user} />;
        });
    }

    render() {
        return(
            <div>
                <Header/>
                <div className="general-body">
                    <div>Admin page</div>
                    <div>{this.usersInfo()}</div>
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            type="text"
                            name="producto"
                            placeholder="Producto"
                            value={this.state.producto}
                            onChange={this.handleChange}
                            autoComplete="on"
                        />
                        <input 
                            type="number"
                            name="tiempo"
                            placeholder="Tiempo(1, 2 o 3)"
                            value={this.state.tiempo}
                            onChange={this.handleChange}
                            autoComplete="on"
                        />
                        {/* <select 
                            value={this.state.tiempo}
                            onChange={this.handleChange}
                            name="tiempo"
                        >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select> */}
                        <input 
                            type="number"
                            name="precio"
                            placeholder="Precio"
                            value={this.state.precio}
                            onChange={this.handleChange}
                            autoComplete="on"
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <Footer/>
            </div>
        )
    }
}
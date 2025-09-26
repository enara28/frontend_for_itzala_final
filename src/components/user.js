import React, {Component} from "react";

export default class User extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        
        const {usuario, email} = this.props.user

        return(          
            <div>
                <div className="username">
                    Usuario: {usuario}
                </div>
                <div className="email">
                    Email: {email}
                </div>
            </div>
        )
    }
}
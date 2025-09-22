import React, {Component} from "react";

export default class User extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        
        const {username, email} = this.props.user

        return(          
            <div>
                <div className="username">
                    Username: {username}
                </div>
                <div className="email">
                    Email: {email}
                </div>
                <div className="address">
                    Optionally adress goes here
                </div>
            </div>
        )
    }

}
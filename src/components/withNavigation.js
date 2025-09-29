import React from "react";
import { useNavigate } from "react-router";

const withNavigation = (Component) => {
    return (props) => {
        let navigation = useNavigate();
        return <Component navigation={navigation} {...props}/>
    }
}
export default withNavigation;
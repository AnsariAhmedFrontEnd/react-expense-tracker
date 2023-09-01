import { Fragment } from "react";
import NavigationBar from "./NavigationBar";

const Layout = (props) => {
    return(
        <Fragment>
        <NavigationBar/>
        {props.children}
        <footer/>
        </Fragment>
    )
};

export default Layout;
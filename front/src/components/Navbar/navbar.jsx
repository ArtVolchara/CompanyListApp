import React from 'react';
import { connect } from 'react-redux'

import { logoutFetchAC } from '../../redux/actions/actions';

import './navbar.css';

import { LinkContainer } from 'react-router-bootstrap'

import {
    Nav,
    NavItem,
    NavLink,
    Container,
} from 'reactstrap';

class MyNavbar extends React.Component {

    async logout() {
        //logout на сервер
        await this.props.logoutFetch()
    }

    render() {
        return (
            <Container className={"nav"}>
                <Nav tabs>
                    {this.props.isLoggedIn ?
                        <>
                            <LinkContainer to="/">
                                <NavItem>
                                    <NavLink active>HOME</NavLink>
                                </NavItem>
                            </LinkContainer>
                            <LinkContainer to="/login" onClick={this.logout.bind(this)}>
                                <NavItem>
                                    <NavLink active>LOGOUT</NavLink>
                                </NavItem>
                            </LinkContainer>
                        </>
                        :
                        <>
                            <LinkContainer to="/login">
                                <NavItem>
                                    <NavLink active>LOGIN</NavLink>
                                </NavItem>
                            </LinkContainer>
                            <LinkContainer to="/registration">
                                <NavItem>
                                    <NavLink active>REGISTRATION</NavLink>
                                </NavItem>
                            </LinkContainer>
                        </>
                    }
                </Nav>
            </Container>
        )
    }
}
function mapStateToProps(store) {
    return {
        isLoggedIn: store.isLoggedIn
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logoutFetch: () => dispatch(logoutFetchAC())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar)

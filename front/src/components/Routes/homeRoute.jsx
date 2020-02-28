
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux'
import { isLoggedFetchAC } from '../../redux/actions/actions';

class HomeRoute extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      loading: true,
    }
  }

  async componentDidMount() {
        //проверка авторизации
        this.props.isLoggedFetch()
        this.setState({
          isLoggedIn: this.props.isLoggedIn,
          loading: false
        })
      }
    
  
  render() {
    const Component = this.props.Component;
    return (
      <Route
      {...this.props}
      render={props => (
          this.props.isLoggedIn === true
          ? <Component {...props} />
          : this.state.loading
          ? <span className={'statustext'}>loading</span>
          : <Redirect to='/' />
        )}
        />
    )
  }
}

function mapStateToProps(store) {
  return {
    isLoggedIn: store.isLoggedIn,
  }
}


function mapDispatchToProps(dispatch) {
  return {
    isLoggedFetch: () => dispatch(isLoggedFetchAC())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeRoute)


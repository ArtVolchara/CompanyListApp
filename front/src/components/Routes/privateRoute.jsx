import React from 'react';
// import { useEffect } from "react"
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { isLoggedFetchAC } from '../../redux/actions/actions';

import Preloader from "../Preloader/preloader"
// import { useDispatch, useSelector, shallowEqual } from 'react-redux'



class PrivateRoute extends React.PureComponent {
  async componentDidMount() {
    //проверка авторизации
    await this.props.isLoggedFetch()
  }
  render() {
    const Component = this.props.Component;
    return (
      <Route
      {...this.props}
        render={props => (
          this.props.isLoggedIn === true
          ? <Component {...props} />
          : this.props.isLoggedLoadingFetch
          ? <Preloader/>
              : <Redirect to='/login' />
              )}
              />
    )
  }
}
function mapStateToProps(store) {
  return {
    isLoggedIn: store.isLoggedIn,
    isLoggedLoadingFetch: store.isLoggedLoadingFetch
  }
}
function mapDispatchToProps(dispatch) {
  return {
    isLoggedFetch: () => dispatch(isLoggedFetchAC())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)

// export default function PrivateRoute(props) {
//   const Component = props.Component;
//   const isLoggedFetch = useDispatch(isLoggedFetchAC)
//   useEffect(isLoggedFetch)
//   const isLoggedIn = useSelector(store => store.isLoggedIn)
//   const isLoggedLoadingFetch = useSelector(store => store.isLoggedLoadingFetch)
//   return (
//     <Route
//       {...props}
//       render={props => (
//         isLoggedIn === true
//           ? <Component {...props} />
//           : isLoggedLoadingFetch
//             ? <Preloader />
//             : <Redirect to='/login' />
//       )}
//     />
//   )
// }
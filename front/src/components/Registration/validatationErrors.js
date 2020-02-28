export default async function validationErrors(state, props) {
    if (state.usernameValid && state.passwordValid) {
        await props.setRegistrationStatus("")   
    } else if (state.usernameValid && !state.passwordValid) {
        await props.setRegistrationStatus("Password must be longer than 6 and shorter than 25 characters. Only latin letters and digits allowed.")
    } else if (!state.usernameValid && state.passwordValid) {
        await props.setRegistrationStatus("Username must be longer than 6 and shorter than 25 characters. Only latin letters and digits allowed.")
    } else if ((!state.usernameValid && state.passwordValid) || (state.username.length === 0 && state.password.length === 0)) {
        await props.setRegistrationStatus("Username and password must be longer than 6 and shorter than 25 characters. Only latin letters and digits allowed.")
    } else if (state.username === state.password) {
        await props.setRegistrationStatus("Username shouldn't be equal to password")
    }
}
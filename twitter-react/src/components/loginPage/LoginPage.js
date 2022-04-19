function LoginPage(){
    return <div className="loginPage">
        <h1> Log in</h1>
        <form>
            <input type="text" name="username"></input>
            <input type="password" name="password"></input>
            <button type="submit">Login</button>
        </form>
    </div>
}

export default LoginPage;
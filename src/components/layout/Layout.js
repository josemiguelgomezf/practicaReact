import Header from './Header'
import Footer from './Footer'

function Layout({ children, title, isLogged, onLogout }) {
    return (
        <div>
            <Header isLogged={isLogged} onLogout={onLogout}/>
            <main>
                <h2>{title}</h2>
                <section>{children}</section>
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
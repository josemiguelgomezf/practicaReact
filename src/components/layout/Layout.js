import Header from './Header'
import Footer from './Footer'
import './Layout.css'

function Layout({ children, title, isLogged, onLogout }) {
    return (
        <div>
            <Header isLogged={isLogged} onLogout={onLogout} />
            <div className="Layout">
            <h1>{title}</h1>
            <main>
                <section>{children}</section>
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default Layout;
import Header from './Header'
import Footer from './Footer'

function Layout({ children, title, isLogged }) {
    return (
        <div>
            <Header isLogged/>
            <main>
                <h2>{title}</h2>
                <section>{children}</section>
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
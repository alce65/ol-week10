import './footer.css';
export function Footer() {
    return (
        <footer>
            <address>ISDI Coders</address>
            <p>{new Date().toLocaleDateString()}</p>
        </footer>
    );
}

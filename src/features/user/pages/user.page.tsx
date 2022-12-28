import { Login } from '../components/login/login';
import { LoginSimple } from '../components/login.simple/login.simple';

export default function UserPage() {
    return (
        <>
            <h2>User Page</h2>
            <Login></Login>
            <LoginSimple></LoginSimple>
        </>
    );
}

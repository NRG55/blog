import { Link } from "react-router";
import Input from "./Input";

const AuthForm = ({ type, onSubmit, errors }) => {

    return (
        <form
            onSubmit={onSubmit} 
            className="w-[80%] max-w-100 -mt-60"
        >
            <h1 className="text-3xl text-center mb-18">
                {type === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>

            {
                errors && errors.map((error, i) => (
                    <p key={"error-" + i}>
                        {error.msg}
                    </p>
                ))
            }

            <Input
                type="text"
                name="username"
                placeholder="Username"
                required
            />

            <Input
                type="password"
                name="password"
                placeholder="Password"
                required
            />

            {
                type === 'signup' &&

                <Input
                    type="password"
                    name="passwordConfirmation"
                    placeholder="Confirm password"
                    required
                />              
            }

            <button
                type="submit"
                className="w-full bg-black text-white rounded-xs py-2 px-6 mt-6 hover:bg-black/80"                
            >
                { type === 'signup' ? 'Sign up' : 'Log in' }
            </button>

            {
                type === 'signup'
                ?
                <p className="mt-15 text-gray-400 text-center">
                    Already have an account?
                    <Link to="/auth/login" className="underline text-black ml-2">
                        Log in
                    </Link>

                </p>
                :
                <p className="mt-15 text-gray-400 text-center">
                    Don't have an account?
                    <Link to="/auth/signup" className="underline text-black ml-2">
                        Sign up
                    </Link>
                </p>
            }

            <div className="relative w-full flex items-center gap-2 my-6 opacity-10 text-black font-bold">
                <hr className="w-1/2 border-black" />
                <p>OR</p>
                <hr className="w-1/2 border-black" />
            </div>

            <p className="text-gray-400 text-center">
                Continue without signing in
                <Link to="/" className="underline text-black ml-2">
                    Home
                </Link>
            </p>
        </form>
    )

};

export default AuthForm;
import Input from "./Input";

const AuthForm = ({ onSubmit, errors }) => {

    return (
        <form
            onSubmit={ onSubmit } 
            className="w-[80%] max-w-100"
        >
            <h1 className="text-3xl mb-12">
                Admin login
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

            <button
                type="submit"
                className="w-full bg-black text-white rounded-xs py-2 px-6 mt-6 hover:bg-black/80"                
            >
                Log in
            </button>            
        </form>
    )

};

export default AuthForm;
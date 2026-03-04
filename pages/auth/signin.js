import { getProviders, signIn as signIntoProvider } from "next-auth/react";
function signIn({ providers }) {
    return (
        <div>
            <h1>Im signin page</h1>
            {providers && Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button onClick={() => signIntoProvider(provider.id)}>
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    );
}
export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    };
}

export default signIn;
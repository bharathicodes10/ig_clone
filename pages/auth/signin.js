import { getProviders,signIn } from "next-auth/react";
function signIn({ providers }) {
    return (
        <div>
            <h1>Im signin page</h1>
        </div>
    );
}
export async function getServerSideProps() {
    const providers = getProviders();
    return {
        props: {
            providers
        },
    }
}

export default signIn;

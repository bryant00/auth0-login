// This import is only included in the server build, because it's only used by getServerSideProps
import auth0 from "../../lib/auth0"
import Layout from "../../components/layout"

function Profile({ user }) {
    return (
        <Layout user={user}>
            <h1>Profile</h1>

            <div>
                <h3>Profile (server rendered)</h3>
                <img src={user.picture} alt="user picture" className="pic" />
                <p>nickname: {user.nickname}</p>
                <p>name: {user.name}</p>
                <pre>{JSON.stringify(user, null, 2)}</pre>
                <style jsx>{`
                    .pic {
                        height: 100px;
                    }
                `}</style>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req, res }) {
    // Here you can check authentication status directly before rendering the page,
    // however the page would be a serverless function, which is more expensive and
    // slower than a static page with client side authentication
    const sess = await auth0.getSession(req)
    console.log(sess)
    const { user } = sess

    if (!user) {
        res.writeHead(302, {
            Location: "/api/login",
        })
        res.end()
        return
    }

    return { props: { user } }
}

export default Profile

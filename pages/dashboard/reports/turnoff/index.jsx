import { decrypt } from "../../../api/auth/lib";
import turnOffInstances from "./../../../../public/images/turnoff.png"

export default function TurnOffInstances() {
    return (
        <div className="pb-[50px] pt-[30px] px-[50px] text-center">
            <div className="text-center text-xl font-medium mt-1 mb-4">
                Turn off all the instances after the business working hours
            </div>
            <img src={turnOffInstances.src} className="w-full h-full rounded-md shadow-lg" alt="turn-off-instances" />
        </div>
    );
}


export async function getServerSideProps(context) {
    const { req, res } = context;

    const token = req?.cookies['token']
    const payload = await decrypt(token)
    if (!payload || payload === null || payload === undefined) {
        res.setHeader('Set-Cookie', [
            'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;',
        ]);
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    } else {
        return {
            props: {
                username: payload?.username,
                email: payload?.email,
                role: payload?.role
            }
        }
    }
}
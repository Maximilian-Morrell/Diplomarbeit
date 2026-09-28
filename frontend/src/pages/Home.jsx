import MainHeader from "../components/header/MainHeader"
import Dashboard from "../components/home/Dashboard"

export default function Home() {

    return (
        <div sx={{width:'100%'}}>
            <MainHeader></MainHeader>
            <Dashboard></Dashboard>
        </div>
    )
}
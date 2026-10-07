import MainHeader from "../components/header/MainHeader"
import TripDashboard from "../components/Trips/TripDashboard"

export default function Trips() {

    return (
        <div sx={{width:'100%'}}>
            <MainHeader></MainHeader>
            <TripDashboard></TripDashboard>
        </div>
    )
}
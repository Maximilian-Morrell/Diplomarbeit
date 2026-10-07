import MainHeader from "../Components/Header/MainHeader"
import TripDashboard from "../components/Trips/TripDashboard"

export default function Trips() {

    return (
        <div sx={{width:'100%'}}>
            <MainHeader></MainHeader>
            <TripDashboard></TripDashboard>
        </div>
    )
}
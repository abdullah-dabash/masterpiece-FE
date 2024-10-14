import Footer from "../footer";
import Navbar from "../nav";
import BestSellingProducts from "./bestSeling";
import BrowseByCategory from "./category";
import HeroSection from "./header";
import Newarrival from "./newarrival";
import Featured from "./featured";
import HighEndFeatures from "./whyHighEnd";
function Home (){

    return(
        <>
        <Navbar/>
        <HeroSection/>
        <BestSellingProducts/>
        <BrowseByCategory/>
        <Featured/>
        <HighEndFeatures/>
        <Newarrival/>
        <Footer/>
        </>
    )
};

export default Home;
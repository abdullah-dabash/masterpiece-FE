import Footer from "../footer";
import Navbar from "../nav";
import BestSellingProducts from "./bestSeling";
import BrowseByCategory from "./category";
import FlashSale from "./flash";
import HeroSection from "./header";
import Newarrival from "./newarrival";
import Featured from "./featured";
import HighEndFeatures from "./whyHighEnd";
function Home (){

    return(
        <>
        <Navbar/>
        <HeroSection/>
        <FlashSale/>
        <BestSellingProducts/>
        <BrowseByCategory/>
        <Featured/>
        
        <Newarrival/>
        <HighEndFeatures/>
        <Footer/>
        </>
    )
};

export default Home;
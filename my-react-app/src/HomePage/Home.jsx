import Footer from "../footer";
import Navbar from "../nav";
import BestSellingProducts from "./bestSeling";
import BrowseByCategory from "./category";
import FlashSale from "./flash";
import HeroSection from "./header";
import { RevealBento } from "./newarrival";

function Home (){

    return(
        <>
        <Navbar/>
        <HeroSection/>
        <FlashSale/>
        <BrowseByCategory/>
        <BestSellingProducts/>
        <RevealBento/>
        <Footer/>
        </>
    )
};

export default Home;
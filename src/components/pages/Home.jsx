import { GiTakeMyMoney, GiRapidshareArrow, GiCardBurn } from "react-icons/gi";
import { MdOutlineVerified } from "react-icons/md";

const Home = () => {
  return (
    <div className="w-full mx-auto bg-color2 text-color1 p-6 rounded-md lg:grid grid-cols-2 gap-4">
      <div className="text-2xl text-center col-span-2 mb-8 font-bold">
        Welcome to Viper Casino
      </div>
      <div className="">
        <div className="ti">
          <GiTakeMyMoney /> Play 2 EARN FOR FREE
        </div>
        <div className="content mb-4">
          At Venom Viper Casino, you have the opportunity to play using $VViper,
          the Viper Casino native token on Venom Blockchain that can be claimed
          from the faucet on the website. The faucet provides a way for players
          to receive free $VViper, allowing them to enjoy the casino games and
          potentially win rewards without spending their own money.
        </div>
      </div>
      <div className="">
        <div className="ti">
          <GiRapidshareArrow /> Low House Edge
        </div>
        <div className="content mb-4">
          At Vviper, we take pride in offering an unparalleled gambling
          experience with a significant advantage in your favor. Our commitment
          to providing exceptional odds is evident through our exceptionally low
          house edge, setting us apart from traditional casinos and other
          platforms.
        </div>
      </div>
      <div className="">
        <div className="ti">
          <MdOutlineVerified /> No KYC
        </div>
        <div className="content mb-4">
          At Vviper, we revolutionize the gambling experience by eliminating the
          burdensome process of user registration and Know Your Customer (KYC)
          requirements. We firmly believe in providing a seamless and
          hassle-free gaming environment, allowing you to focus solely on the
          thrill of placing bets and winning.
        </div>
      </div>
      <div className="">
        <div className="ti">
          <GiCardBurn /> Fair Betting
        </div>
        <div className="content mb-4">
          At Vviper, we prioritize fairness and transparency in every aspect of
          our betting system. To ensure the integrity of our games, we have
          implemented a cutting-edge technology called Chainlink VRF (Verifiable
          Random Function) combined with transparent odds displayed publicly in
          our game smart contracts.
        </div>
      </div>
    </div>
  );
};

export default Home;

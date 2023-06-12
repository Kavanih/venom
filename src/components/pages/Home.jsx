const Home = () => {
  return (
    <div className="w-4/5 mx-auto bg-color2 text-color1 p-6 rounded-md grid grid-cols-2">
      <div className="">
        <div className="ti">Low House Edge</div>
        <div className="content mb-4">
          At Vviper, we take pride in offering an unparalleled gambling
          experience with a significant advantage in your favor. Our commitment
          to providing exceptional odds is evident through our exceptionally low
          house edge, setting us apart from traditional casinos and other
          platforms.
        </div>
      </div>
      <div className="">
        <div className="ti">No KYC</div>
        <div className="content mb-4">
          At Vviper, we revolutionize the gambling experience by eliminating the
          burdensome process of user registration and Know Your Customer (KYC)
          requirements. We firmly believe in providing a seamless and
          hassle-free gaming environment, allowing you to focus solely on the
          thrill of placing bets and winning.
        </div>
      </div>
      <div className="col-span-2">
        <div className="ti">Provably Fair Betting</div>
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

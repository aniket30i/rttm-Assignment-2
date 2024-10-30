import notif from "../assets/icon/notif.png";
const Navbar = () => {
  return (
    <div className="bg-custom-yellow-primary h-20 px-2">
      <div className="flex justify-between p-2">
        <div className="flex flex-col justify-start">
          <h2 className="text-4xl font-bold">TaskBoard</h2>
          <p className="ml-1">See your task here</p>
        </div>
        <div>
          <img src={notif} alt="bell-icon" className="h-9" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

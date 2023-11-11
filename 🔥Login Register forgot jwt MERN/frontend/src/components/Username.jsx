import React from "react";

const Username = () => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello Again!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
          </div>

          <form action="" className="py-1">
            <div className="profile flex justify-center py-4">
              <img src="" alt="avatar" />
            </div>

            <div className="textbox">
              <input type="text" name="" id="" placeholder="Username" />
              <button type="submit"> Let's Go</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Username;

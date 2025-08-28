import Header from "@/components/Header";
import ProjectHeader from "@/components/ProjectHeader";
import Sidebar from "@/components/Siderbar";
import React from "react";

function page() {
  return (
    <div className="w-[1400px] h-[1024px] bg-gray-200 mx-auto ">
      <div className="w-full h-[80px] bg-white text-white flex items-center px-4">
        <Header />
      </div>
      <div className="w-full h-[calc(100vh-4rem)] bg-gray-100 flex">
        <div className="w-[288px] h-full bg-red-100">
          <Sidebar />
        </div>
        <div className="w-full h-full bg-blue-100 space-y-4 overflow-y-auto">
      
            <div className="h-[174px] w-full bg-green-300 border-t-1">
              <ProjectHeader/>
            </div>
         
          <div>Tasks board</div>
        </div>
      </div>
    </div>
  );
}

export default page;

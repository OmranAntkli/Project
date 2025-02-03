import { useNavigate } from "react-router-dom";
import reactLogo from "../assets/login.svg"; 
function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
         <div className="hidden md:flex w-full md:w-1/2 items-center justify-center">
             <img
               src={reactLogo}
               alt="React logo"
               className="w-3/4 max-w-md object-cover" 
             />
           </div>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate("/add-issue")}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
        >
          add Isuue
        </button>
        <button
          onClick={() => navigate("/issues")}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
         Show isuue
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;

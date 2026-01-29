import RegisterForm from "./RegisterForm";
import { GrTechnology } from "react-icons/gr";

const Register = async () => {
  return (
    <section className="fix-height container m-auto px-7 flex items-center justify-center ">
      <div className="m-auto bg-white rounded-sm border-blue-900 border-2 p-5 w-full md:w-2/3 max-w-[500px]">
        <div className="flex justify-center mb-4">
          <GrTechnology size={48} color="#1c398e" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-5 text-center">
          Register
        </h1>
        <RegisterForm />
      </div>
    </section>
  );
};

export default Register;

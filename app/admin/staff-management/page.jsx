import DashboardLayout from "@/components/layouts/DashboardLayout";
import { SearchIcon } from "@/svgs";
import Table from "./Table";
import Link from "next/link";
import { getToken } from "@/utils/authHelpers";
import WithAuth from "@/components/withAuth";

const StaffManagement = () => {
  return (
    <DashboardLayout header="Admin">
      <div className="lg:flex lg:justify-between w-[95%] pb-8">
        <div className="w-full pb-4 lg:pb-8">
          <h1 className="text-black font-bold text-2xl">Staff Management</h1>
          <p className="text-gray-600 text-sm">
            view all your staff list below
          </p>
        </div>
        <div className="w-full lg:w-[15%]">
          <Link href="/admin/create-staff">
            <button className="text-sm bg-[#46B038] text-white py-2 px-4 w-fit rounded-md">
              Create Staff
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-white rounded-lg">
        <div className="flex gap-x-4 text-sm pl-4 pt-2 text-gray-400">
          <p>All</p>
          <p>Actve</p>
          <p>Suspended</p>
        </div>
        <form className="px-4 pt-8 pb-4">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <span>{SearchIcon}</span>
            </div>
            <input
              type="search"
              id="search"
              className="rounded-2xl text-white bg-gray-100 block w-full p-3 ps-10 text-sm text-white-900"
              placeholder="Search"
            />
          </div>
        </form>
        <Table />
      </div>
    </DashboardLayout>
  );
};

export default WithAuth(StaffManagement);

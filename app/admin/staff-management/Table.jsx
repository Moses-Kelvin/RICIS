"use client";
import TableSkeleton from "@/components/skeleton-loaders/TableSkeleton";
import { baseUrl } from "@/lib/configs";
import { getToken } from "@/utils/authHelpers";
import { formatDate } from "@/utils/helpers";
import { time } from "@/utils/time&dates";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const tableHeader = [
  "Staff Name",
  "Role",
  "Email Address",
  "Satus",
  "Date Applied",
];

const tableData = [
  {
    staffname: "Sheila Daniels",
    email: "Sheiladaniel@gmail.com",
    status: "active",
    dateApplied: {
      date: "26/3/2024",
      time: "16:34:04",
    },
  },
  {
    staffname: "Sheila Daniels",
    email: "Sheiladaniel@gmail.com",
    status: "active",
    dateApplied: {
      date: "26/3/2024",
      time: "16:34:04",
    },
  },
  {
    staffname: "Sheila Daniels",
    email: "Sheiladaniel@gmail.com",
    status: "inactive",
    dateApplied: {
      date: "26/3/2024",
      time: "16:34:04",
    },
  },
  {
    staffname: "Sheila Daniels",
    email: "Sheiladaniel@gmail.com",
    status: "active",
    dateApplied: {
      date: "26/3/2024",
      time: "16:34:04",
    },
  },
  {
    staffname: "Sheila Daniels",
    email: "Sheiladaniel@gmail.com",
    status: "active",
    dateApplied: {
      date: "26/3/2024",
      time: "16:34:04",
    },
  },
  {
    staffname: "Sheila Daniels",
    email: "Sheiladaniel@gmail.com",
    status: "inactive",
    dateApplied: {
      date: "26/3/2024",
      time: "16:34:04",
    },
  },
  {
    staffname: "Sheila Daniels",
    email: "Sheiladaniel@gmail.com",
    status: "active",
    dateApplied: {
      date: "26/3/2024",
      time: "16:34:04",
    },
  },
  {
    staffname: "Sheila Daniels",
    email: "Sheiladaniel@gmail.com",
    status: "active",
    dateApplied: {
      date: "26/3/2024",
      time: "16:34:04",
    },
  },
  {
    staffname: "Sheila Daniels",
    email: "Sheiladaniel@gmail.com",
    status: "inactive",
    dateApplied: {
      date: "26/3/2024",
      time: "16:34:04",
    },
  },
];

const Table = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchStaff = async () => {
    try {
      const token = getToken();
      const fetchData = await axios.get(`${baseUrl}/staff`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(fetchData);
      setData(fetchData?.data?.data?.staffs);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const router = useRouter();

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="w-full overflow-x-scroll lg:overflow-x-hidden z-[-10] rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right">
        <thead className={`text-sm bg-dark-gray text-gray-400 py-4`}>
          <tr className="whitespace-nowrap">
            {tableHeader.map((data, index) => (
              <th key={index} scope="col" className="lg:px-6 px-4 py-3">
                {data}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {data?.map((data, index) => {
            const columns = Object.keys(data);
            return (
              <tr
                key={index}
                className="text-sm border-b-[1px] border-b-gray-300 border-b-solid cursor-pointer"
                onClick={() => {
                  router.push(
                    `/admin/staff-management/${data.id}?id=${data.id}`
                  );
                }}
              >
                {/* {columns.map((col, idx) =>
                                    col === "dateApplied" ?
                                        <td key={idx} className="px-6 py-4">
                                            <p>{data.dateApplied.date}</p>
                                            <p>{data.dateApplied.time}</p>
                                        </td> :
                                        <td key={idx}
                                            className={`px-6 py-4 ${data[col] === "active" ? "text-[#69CB5C]" : data[col] === "inactive" ? "text-[#EABD52]" : "text-black"}  ${col === "status" && ""}`}>
                                            <span className={`${data[col] === "active" ? "rounded-xl bg-green-100 p-1.5" : data[col] === "inactive" ? "rounded-xl bg-orange-50 p-1.5" : "rounded-0 bg-none"}`}>{data[col]}</span>
                                        </td>
                                )} */}
                <td className={`px-6 py-4  `}>{data.name}</td>
                <td className={`px-6 py-4  `}>
                  {data.is_admin ? "Admin" : "Staff"}
                </td>
                <td className={`px-6 py-4`}>{data.email}</td>
                <td
                  className={`px-6 py-4 ${
                    data?.status.toLowerCase() === "active"
                      ? "text-[#69CB5C]"
                      : data?.status.toLowerCase() === "suspended"
                      ? "text-[#EABD52]"
                      : "text-black"
                  }  `}
                >
                  <div
                    className={
                      data?.status.toLowerCase() === "active"
                        ? "bg-[#69CB5C1F] py-[4px] px-[8px] rounded-[12px] w-fit text-[12px] "
                        : "bg-[#EABD521F] py-[4px] px-[8px] rounded-[12px] w-fit text-[12px] "
                    }
                  >
                    {data.status}
                  </div>
                </td>
                <td className={`px-6 py-4 `}>
                  {time.formatDate(data?.created_at)} at{" "}
                  {time.formatTime(data?.created_at)}{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
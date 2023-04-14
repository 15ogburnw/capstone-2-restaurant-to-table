import { useState, useRef } from "react";

import useSWR, { preload } from "swr";
import useClickOutside from "@/lib/hooks/useClickOutside";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useSWRMutation, { mutate } from "swr/mutation";
import { ToastContainer, toast } from "react-toastify";
import { useUser } from "@supabase/auth-helpers-react";

export default function AddMenuModal() {
  const [newMenuName, setNewMenuName] = useState("");

  const modalRef = useRef(null);
  const [showing, setShowing] = useClickOutside(modalRef);
  const user = useUser();

  // TODO: ALERTS AREN'T DISAPPEARING ON THE MODAL PAGE AFTER IT IS CLOSED. MODAL POPS UP EVERY TIME I CLICK ON THE PAGE OUTSIDE OF IT, EVEN IF ITS CLOSED

  const { data, error, isLoading, mutate } = useSWR("/api/user/menus");

  const handleChange = (e) => {
    const newVal = e.target.value;
    setNewMenuName(newVal);
  };

  const createMenu = async (url, { arg }) => (
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ arg }).then((res) => res.json()),
    }
  );

  const { trigger, isMutating } = useSWRMutation(
    "/api/user/menus",
    createMenu,
    {
      optimisticData: (data) => [
        ...data,
        { name: newMenuName, user_id: user.id },
      ],
      rollbackOnError: true,
      onError: (error) => {
        console.log(error.code, error.message, error.status);
        setToast({
          message:
            "Something went wrong! Unable to create your menu at this time",
          type: "danger",
        });
      },
    }
  );

  mutate([...data, menuName]);
  setMenuName("");
};

if (error) return <>{console.error(error)}</>;
if (isLoading)
  return (
    <div className="w-screen h-screen flex flex-col bg-white z-10 justify-center items-center text-center">
      <Loading />
    </div>
  );
return (
  <div
    ref={modalRef}
    className=" fixed z-20 m-auto h-[40%] sm:h-1/3 max-w-sm inset-x-0 inset-y-0 p-4 bg-white rounded-lg overflow-hidden shadow-[-2px_-8px_24px_-6px_rgba(0,0,0,0.3)]  sm:p-6"
  >
    <div className="">
      <div>
        <div className="mt-4 text-center">
          <h3
            className="font-medium leading-6 text-gray-800 capitalize "
            id="modal-title"
          >
            Create a New Menu
          </h3>

          <p className="mt-2 text-sm text-gray-500 ">
            Curate a custom collection: Just give your new menu a name and get
            started organizing your favorite recipes however you like!
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <label
          className="text-sm text-gray-700 font-bold"
          htmlFor="menu-name"
        >
          Menu Name
        </label>

        <input
          type="text"
          name="menu-name"
          id="menu-name"
          placeholder="Enter a menu name"
          onChange={handleChange}
          value={menuName}
          className="flex h-10 px-4  text-sm text-gray-700 bg-white border border-gray-200 rounded-md  w-full mt-2  focus:border-emerald-400 focus:ring-emerald-300 focus:ring-opacity-40  focus:outline-none focus:ring"
        />

        {alert ? (
          <p classNameName="text-red-500 font-semibold text-center">
            {alert}
          </p>
        ) : null}

        <div className="sm:mt-6 flex flex-col items-center sm:flex-row  sm:-mx-2">
          <button
            onClick={() => setShowModal(false)}
            className="w-full px-4 py-3 my-2 sm:my-0 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2  hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
          >
            Cancel
          </button>

          <button
            type="submit"
            className=" w-full px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-emerald-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-emerald-500 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40"
          >
            Create Your Menu
          </button>
        </div>
      </form>
    </div>
  </div>
);
}

import { useCallback, useEffect, useState } from "react";

import useSWR, { preload } from "swr";
import useClickOutside from "@/lib/hooks/useClickOutside";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useSWRMutation, { mutate } from "swr/mutation";
import { toast } from "react-toastify";
import { useUser } from "@supabase/auth-helpers-react";
import ClientOnlyPortal from "../HOF/ClientOnlyPortal";

export default function AddMenuModal({ modalButtonRef }) {
  const [open, setOpen] = useState(false);
  const [newMenuName, setNewMenuName] = useState("");
  const user = useUser();
  const { data: menus } = useSWR("/api/user/menus");

  // TODO: ALERTS AREN'T DISAPPEARING ON THE MODAL PAGE AFTER IT IS CLOSED. MODAL POPS UP EVERY TIME I CLICK ON THE PAGE OUTSIDE OF IT, EVEN IF ITS CLOSED

  useEffect(() => {
    const modalButton = modalButtonRef.current;
    if (modalButton) {
      console.log(modalButton);
      modalButton.addEventListener("click", () => {
        setOpen((open) => !open);
      });
      return () => modalButton.removeEventListener("click");
    }
  }, [modalButtonRef]);

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
        toast({
          message:
            "Something went wrong! Unable to create your menu at this time",
          type: "danger",
        });
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault(e);
    trigger({ name: newMenuName, user_id: user.id });
    setShowing(false);
  };

  return (
    <>
      {open && (
        <ClientOnlyPortal selector="#modals">
          <div className=" fixed z-20 m-auto h-[40%] sm:h-1/3 max-w-sm inset-x-0 inset-y-0 p-4 bg-white rounded-lg overflow-hidden shadow-[-6px_6px_20px_2px_rgba(0,0,0,0.3)]  sm:p-6">
            <div className="">
              <div className="relative">
                <XMarkIcon
                  onClick={() => setShowing(false)}
                  className=" hover:cursor-pointer right-1 -mr-1 -mt-3 absolute w-7 h-7 hover:stroke-[3px] stroke-[2px]"
                ></XMarkIcon>
                <div className="mt-2 text-center">
                  <h3
                    className="font-medium leading-6 text-gray-800 "
                    id="modal-title"
                  >
                    Create a New Menu
                  </h3>

                  <p className="mt-1 text-sm text-gray-500 ">
                    Curate a custom collection: Just give your new menu a name
                    and get started organizing your favorite recipes however you
                    like!
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-2 flex-auto">
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
                  value={newMenuName}
                  className="flex h-10 px-4  text-sm text-gray-700 bg-white border border-gray-200 rounded-md  w-full mt-1  focus:border-emerald-400 focus:ring-emerald-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />

                {toast.message && showing ? (
                  <p className="text-red-500 font-semibold sm:-mb-5 mt-1 text-sm text-center">
                    {toast.message}
                  </p>
                ) : null}

                <div className="sm:mt-7 flex flex-col items-center sm:flex-row  sm:-mx-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowing(false);
                    }}
                    className="w-full px-4 py-3 my-3 sm:my-0 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-300 rounded-md sm:w-1/2 sm:mx-2  hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSubmit}
                    onMouseEnter={() =>
                      preload("/api/user/menus", (url) =>
                        fetch(url).then((res) => res.json())
                      )
                    }
                    className=" w-full px-4 py-3  text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-emerald-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40"
                  >
                    Create Your Menu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </ClientOnlyPortal>
      )}
    </>
  );
}

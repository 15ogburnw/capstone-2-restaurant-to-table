import { useState } from "react";

import useSWR from "swr";
import Loading from "../Loading";

export default function AddMenuModal({ setShowModal }) {
  const [menuName, setMenuName] = useState("");
  const [alert, setAlert] = useState("");

  const { data, error, isLoading, mutate } = useSWR("/api/user/menus");

  const handleChange = (e) => {
    const newVal = e.target.value;
    setMenuName(newVal);
  };

  const handleSubmit = (e) => {
    e.preventDefault(e);
    setAlert("");
    if (data?.menus.length > 0 && data.menus.includes(menuName)) {
      setAlert("You already have a menu with this name, try a different one!");
    } else if (!menuName) setAlert("Please enter a name for your menu!");
    createMenu();
  };

  const createMenu = async () => {
    await fetch("/api/user/menus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: menuName }),
    })
      .then((res) => res.json())
      .catch((e) => console.error(e));

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
      className="fixed  inset-x-0 top-1/4 z-10 overflow-y-auto transition duration-300 ease-in-out"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
          <div>
            <div className="mt-4 text-center">
              <h3
                className="font-medium leading-6 text-gray-800 capitalize "
                id="modal-title"
              >
                Create a New Menu
              </h3>

              <p className="mt-2 text-sm text-gray-500 ">
                Curate a custom collection: Just give your new menu a name and
                get started organizing your favorite recipes however you like!
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

            <div className="sm:mt-6 sm:flex sm:items-center sm:-mx-2">
              <button
                onClick={() => setShowModal(false)}
                className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-emerald-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-emerald-500 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40"
              >
                Create Your Menu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

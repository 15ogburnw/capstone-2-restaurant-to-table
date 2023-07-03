import Swal from "sweetalert2";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { useContext } from "react";
import ToastContext from "@/lib/contexts/ToastContext";

const NewMenuModal = () => {
  const showToast = useContext(ToastContext);
  const user = useUser();
  const supabase = useSupabaseClient();
  const {
    data,
    error: menusError,
    mutate: mutateMenus,
  } = useSWR("/api/user/menus");
  const [currentMenuNames, setCurrentMenuNames] = useState();

  useEffect(() => {
    if (data) {
      setCurrentMenuNames(data.menus?.map((menu) => menu.name));
    }
  }, [data]);

  useEffect(() => {
    Swal.mixin({
      title: "Create a New Menu",
      text: "Create a custom menu: Just give your new menu a name and get started organizing your favorite recipes however you like!",
      customClass: {
        confirmButton:
          "bg-primary-500 text-xl py-1.5 ml-4 leading-none focus:outline-none px-2 border-4 border-primary-500   text-primary-500 focus:outline-2 focus:outline-offset-2 hover:enabled:bg-transparent hover:enabled:text-primary-500 text-white font-bold inline-flex items-center justify-center shadow-md shadow-primary-700  transition  hover:enabled:scale-105 disabled:shadow-none disabled:opacity-70 cursor-pointer",
        cancelButton:
          "bg-primary-700 text-xl py-1.5 leading-none focus:outline-none px-2 border-4 border-primary-700   text-primary-700 focus:outline-2 focus:outline-offset-2 hover:bg-transparent hover:text-primary-700 text-white font-bold inline-flex items-center justify-center shadow-md shadow-primary-70 transition hover:scale-105 ",
      },
      icon: "warning",
      iconColor: "#e57373",
      showCancelButton: true,
      confirmButtonText: "Create Your Menu",
      cancelButtonText: "Cancel",
      input: "text",
      inputLabel: "Menu Name",
      inputPlaceholder: "Enter the name for your menu",
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (!value) {
            resolve("You need to write something!");
          } else if (currentMenuNames?.includes(value)) {
            resolve("You already have a menu with that name!");
          } else {
            console.log(currentMenuNames);
            resolve();
          }
        });
      },
      showLoaderOnConfirm: true,
      preConfirm: async (value) => {
        if (user) {
          const { error } = await supabase
            .from("menus")
            .insert({ name: value, user_id: user.id });
          if (error) {
            showToast("error", {
              text: "Something went wrong while creating this menu! Please try again",
            });
            return false;
          } else {
            showToast("success", {
              text: `Recipe ${value} was successfully created! Start searching for recipes to add to it now!`,
            });
            await mutateMenus();
          }
        }
      },
      reverseButtons: true,
      buttonsStyling: false,
    }).bindClickHandler("data-add-menu-modal");
  }, [currentMenuNames, mutateMenus, supabase, user, showToast]);

  if (menusError)
    return showToast("error", {
      text: "There was a problem fetching your menus! Please try again",
    });

  return <template id="add-menu-modal"></template>;
};

export default NewMenuModal;

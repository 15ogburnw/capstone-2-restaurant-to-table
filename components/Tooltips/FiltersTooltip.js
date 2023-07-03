import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export default function FiltersTooltip() {
  return (
    <div className="flex flex-col justify-center items-center">
      <button
        className=" w-full mt-2 mx-1 rounded-md  disabled:bg-primary-500/70 disabled:cursor-wait hover:enabled:bg-primary-700 p-2 font-bold hover:enabled:text-white disabled:text-white text-primary-700"
        disabled={favsMutating ? true : false}
        onClick={(e) => {
          e.stopPropagation();
          favsTrigger();
        }}>
        {favsMutating ? (
          <span className="flex items-center justify-center">
            <FontAwesomeIcon
              className="inline font-bold mr-2"
              icon={faCircleNotch}
              spin
            />
            <span>Loading</span>
          </span>
        ) : isFavorite ? (
          "Remove From Favorites"
        ) : (
          "Add To Favorites"
        )}
      </button>
      <button
        className="my-2 mx-1 w-full rounded-md disabled:bg-primary-500/70 disabled:cursor-wait hover:enabled:bg-primary-700 p-2 font-bold hover:enabled:text-white disabled:text-white text-primary-700"
        onClick={(e) => {
          e.stopPropagation();
          menuTrigger();
        }}
        disabled={menuMutating ? true : false}>
        {menuMutating ? (
          <span className="flex items-center justify-center">
            <FontAwesomeIcon
              className="inline font-bold mr-2"
              icon={faCircleNotch}
              spin
            />
            <span>Loading</span>
          </span>
        ) : (
          <>
            <span>Remove From Menu</span>
          </>
        )}
      </button>
    </div>
  );
}

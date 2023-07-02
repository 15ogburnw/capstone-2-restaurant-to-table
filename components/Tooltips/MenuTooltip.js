export default function MenuTooltip({ isFavorite }) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        console.log("you clicked the tooltip");
      }}
      className="text-center">
      <div className="mt-2 mx-1 rounded-md hover:bg-primary-700 p-2 font-bold hover:text-white text-primary-700">
        {isFavorite ? "Remove Favorite" : "Add Favorite"}
      </div>
      <div className="mt-2 mx-1 rounded-md hover:bg-primary-700 p-2 font-bold hover:text-white text-primary-700">
        Remove From Menu
      </div>
    </div>
  );
}

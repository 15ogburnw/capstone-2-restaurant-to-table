import Swal from "sweetalert2";

const SuccessToast = Swal.mixin({
  customClass: {
    popup: "flex flex-row items-center justify-center mt-3",
  },
  toast: true,
  icon: "success",
  width: "40vw",
  iconColor: "#7EBE82",
  showConfirmButton: false,
  position: "top",

  timer: 2000,
});

export default SuccessToast;

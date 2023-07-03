import Swal from "sweetalert2";

const ErrorToast = Swal.mixin({
  customClass: {
    popup: "flex flex-row items-center justify-center mt-3",
  },
  toast: true,
  icon: "error",
  width: "40vw",
  iconColor: "#e57373",
  showConfirmButton: false,
  position: "top",
  timer: 3000,
});

export default ErrorToast;

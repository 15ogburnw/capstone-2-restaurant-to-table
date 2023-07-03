import Swal from "sweetalert2";

const ErrorToast = Swal.mixin({
  toast: true,
  icon: "error",
  width: "40vw",
  iconColor: "#e57373",
  showConfirmButton: false,
  position: "top",
  timer: 3000,
});

export default ErrorToast;

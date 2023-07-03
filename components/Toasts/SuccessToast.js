import Swal from "sweetalert2";

const SuccessToast = Swal.mixin({
  toast: true,
  icon: "success",
  width: "40vw",
  iconColor: "#7EBE82",
  showConfirmButton: false,
  position: "top",
  timer: 2000,
});

export default SuccessToast;

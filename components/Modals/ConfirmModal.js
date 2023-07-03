import Swal from "sweetalert2";

const ConfirmModal = Swal.mixin({
  customClass: {
    confirmButton:
      "text-white font-bold text-lg bg-primary-600 mx-2 hover:bg-primary-400 hover:text-primary-800 px-4 py-2 rounded-md",
    cancelButton:
      "text-white font-bold text-lg bg-red-500 hover:bg-red-300 mx-2 hover:text-red-800 px-4 py-2 rounded-md",
  },
  icon: "warning",
  iconColor: "#e57373",
  showCancelButton: true,

  reverseButtons: true,
  buttonsStyling: false,
});

export default ConfirmModal;

import swal from "sweetalert2";

const Toast = swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500
});

export default Toast;

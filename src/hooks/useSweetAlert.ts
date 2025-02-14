import Swal from "sweetalert2";

interface SweetAlert {
  showLoading: (message?: string) => void;
  close: () => void;
  showSuccess: (message?: string, title?: string) => void;
  showError: (message?: string, title?: string) => void;
}

const useSweetAlert = (): SweetAlert => {
  return {
    showLoading: (message = "Processing...") => {
      Swal.fire({
        title: message,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    },

    close: () => {
      Swal.close();
    },

    showSuccess: (message = "Success!", title = "Success") => {
      Swal.fire({
        icon: "success",
        title,
        text: message,
      });
    },

    showError: (message = "Something went wrong!", title = "Error") => {
      Swal.fire({
        icon: "error",
        title,
        text: message,
      });
    },
  };
};

export default useSweetAlert;

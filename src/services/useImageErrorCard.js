import ErrorImage from "../assets/img/error-image.svg";

export const useImageErrorCard = error => {
  error.target.src = ErrorImage;
};

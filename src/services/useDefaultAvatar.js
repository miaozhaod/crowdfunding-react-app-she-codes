import DefaultAvatar from "../assets/img/default-avatar.svg";

export const useDefaultAvatar = error => {
  error.target.src = DefaultAvatar;
};

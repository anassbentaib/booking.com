import { useDispatch, useSelector } from "react-redux";
import { closeSearchModal, openSearchModal } from "../state/SearchSlice";

const useSearchModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: any) => state.searchModal.isOpen);

  const onOpen = () => {
    dispatch(openSearchModal());
  };

  const onClose = () => {
    dispatch(closeSearchModal());
  };

  return {
    isOpen,
    onOpen,
    onClose,
  };
};

export default useSearchModal;

import { IconType } from "react-icons";

interface MenuItemProps {
  onClick: () => void;
  label: string;
  icon: IconType;
  color?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  icon: Icon,
  label,
  color,
}) => {
  return (
    <div
      onClick={onClick}
      className="
        px-4 
        py-3 
        z-100
bg-white
        hover:bg-neutral-100 
        transition
        font-semibold
      "
    >
      <div className="flex items-center flex-1 px-1">
        <Icon className="h-5 w-5 mr-3" color={color} />
        {label}
      </div>
    </div>
  );
};

export default MenuItem;

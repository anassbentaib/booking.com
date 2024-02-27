import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button/Button";
import Heading from "../../ui/Heading/Heading";
import Navbar from "../Navbar/Navbar";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters",
  showReset,
}) => {
  const router = useNavigate();
  return (
    <div>
      <div>
        <Navbar isUser />
      </div>
      <div className="min-h-[100vh] flex flex-col gap-2 justify-center items-center text-black">
        <Heading center title={title} subTitle={subtitle} small />
        <div className="w-48 mt-4">
          {showReset && (
            <Button
              isBorder
              label="Remove all fillters"
              onClick={() => router("/")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EmptyState;

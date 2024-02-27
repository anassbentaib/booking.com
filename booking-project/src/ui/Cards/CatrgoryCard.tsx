interface CategoryCardProps {
  onClick: (value: string) => void;
  description?: string;
  label: string;
  selected?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  onClick,
  label,
  selected,
  description,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-md border-2 p-4 flex flex-col gap-3 hover:border-blue-500 transition cursor-pointer
      min-h-[18vh]
  ${selected ? "border-blue-500" : "border-neutral-200"}
    `}
    >
      <div className="font-semibold">{label}</div>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default CategoryCard;

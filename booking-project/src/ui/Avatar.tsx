interface AvatarProps {
  src?: string | null;
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <div className="hover:bg-white hover:bg-opacity-15 rounded-md w-[40px] h-[40px] flex items-center justify-center c">
      <img
        src={src || undefined}
        className="w-[25px] h-[25px] rounded-full cursor-pointer"
      />
    </div>
  );
};

export default Avatar;

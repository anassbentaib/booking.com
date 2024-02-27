import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { TbPhotoPlus } from "react-icons/tb";
import { FaTrashCan } from "react-icons/fa6";
import { toast } from "react-hot-toast";

const cloudName = "dcq0jzieu";
const uploadPreset = "dadpy0jh";
interface ImageUploadProps {
  onChange: (values: string[]) => void;
  values: string[];
  handleImageDelete: () => void;
}
const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  values,
  handleImageDelete,
}) => {
  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      try {
        const newImageCount = values.length + acceptedFiles.length;
        const remainingSlots = Math.max(6 - values.length, 12 - values.length);

        const uploadPromises = acceptedFiles
          .slice(0, remainingSlots)
          .map(async (file: any) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", uploadPreset);

            const response = await fetch(
              `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
              {
                method: "POST",
                body: formData,
              }
            );

            if (response.ok) {
              const data = await response.json();
              return data.secure_url;
            } else {
              console.error("Image upload failed:", response.statusText);
              return null;
            }
          });

        const uploadedUrls = await Promise.all(uploadPromises);
        const filteredUrls = uploadedUrls.filter((url) => url !== null);

        if (newImageCount >= 6 && newImageCount <= 12) {
          onChange([...values, ...filteredUrls]);
        } else if (newImageCount > 12) {
          toast.error("Exceeded the maximum limit of 12 images");
        } else {
          toast.error("Did not reach the minimum limit of 8 images");
        }
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    },
    [onChange, values]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  return (
    <div className="min-w-[100px] sm:min-w-full md:min-w-full lg:min-w-[100px] xl:min-w-[100px] 2xl:min-w-[100px] max-w-[750px]">
      <div className="relative h-full ">
        {values && values.length > 0 && (
          <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 p-4">
            {values.map((url) => (
              <div key={url} className="relative rounded-md overflow-hidden">
                <div
                  className="z-10 absolute top-4 right-0 cursor-pointer 
                  text-red-600
                  "
                  onClick={handleImageDelete}
                >
                  <FaTrashCan className="h-3 w-3" color="" />
                </div>
                <div>
                  <img
                    className="object-cover w-full h-[100px] my-3"
                    alt="Image"
                    src={url}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        {...getRootProps()}
        className="
        min-w-[100px] sm:min-w-full md:min-w-full lg:min-w-[100px] xl:min-w-[100px] 2xl:min-w-[100px] max-w-[750px]
            w-full
            relative
            cursor-pointer
            hover:opacity-70
            transition
            border-dashed 
            border-2 
            p-20 
            border-neutral-300
            flex
            flex-col
            justify-center
            items-center
            gap-4
            text-neutral-600
          "
      >
        <input {...getInputProps()} />
        <TbPhotoPlus size={50} />
        <div className="font-semibold text-lg">Click to upload</div>
      </div>
    </div>
  );
};

export default ImageUpload;

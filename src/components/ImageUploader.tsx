import { FileInput, Label } from "flowbite-react";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface ImageUploaderProps {
  setImageData: Dispatch<SetStateAction<string | null>>;
  imageData: string | null;
}

const ImageUploader = ({ imageData, setImageData }: ImageUploaderProps) => {
  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataURL = reader.result as string;
        // Pass dataURL to parent component
        setImageData(dataURL);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <Label
        htmlFor="image"
        className="flex place-content-center border p-16 rounded-lg border-dashed text-gray-400 cursor-pointer"
      >
        click to add a photo
      </Label>
      <FileInput
        accept="image/*"
        onChange={handleFileInputChange}
        id="image"
        className="hidden"
      />
      {imageData && (
        <img src={imageData} alt="Uploaded" width={150} className="mx-auto" />
      )}
    </div>
  );
};

export default ImageUploader;

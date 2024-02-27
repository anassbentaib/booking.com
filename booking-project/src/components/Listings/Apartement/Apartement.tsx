import { useMemo, useState } from "react";
import { house1, house2, location1, location2 } from "../../../assets";
import PropertyCard from "../../../ui/Cards/PropertyCard";
import Input from "../../../ui/Input/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ListingForm from "../../../ui/form/ListingForm";
import { CategoryItems, lastItem } from "../../../Constants";
import CategoryCard from "../../../ui/Cards/CatrgoryCard";
import { BsQuestionCircle } from "react-icons/bs";
import CountrySelect from "../../../ui/Input/CountrySelect";
import Counter from "../../../ui/Input/Counter";
import ImageUpload from "../../../ui/Input/ImageUpload";
import toast from "react-hot-toast";
import { CreateListing } from "../../../api";
import { useNavigate, useParams } from "react-router-dom";
import CreateCard from "../../../ui/Cards/CreateCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../types";

enum STEPS {
  PROPERTIES = 0,
  CATEGORYS = 1,
  LOCATION = 2,
  INFO = 3,
  DESCRIPTION = 4,
  IMAGES = 5,
  PRICE = 6,
  READY = 7,
}

const Apartement = () => {
  const [step, setStep] = useState(STEPS.PROPERTIES);
  const { currentUser } = useSelector((state: RootState) => state?.user);

  const [loading, setIsLoading] = useState(false);
  const { type } = useParams();
  const history = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      location: "",
      price: 1,
      imageSrc: [],
      propertyName: "",
      propertyDescription: "",
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      type: type,
      street: "",
      zipCode: "",
      city: "",
      category: CategoryItems?.[0]?.title,
      property: "oneAppartement",
      subProperty: "multiple-yes",
      numberOfProperties: 0,
    },
  });
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");
  const category = watch("category");
  const property = watch("property");
  const subProperty = watch("subProperty");
  const handleImageDelete = (indexToDelete: any) => {
    const updatedUrls = [...imageSrc];
    updatedUrls.splice(indexToDelete, 1);
    setCustomValue("imageSrc", updatedUrls);
  };

  const onNext = () => {
    setIsLoading(true);
    setStep((value) => value + 1);
    setIsLoading(false);
  };
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };
  const onBack = () => {
    if (step !== STEPS.PROPERTIES) {
      return setStep((value) => value - 1);
    }
    history("/create-listings/become-a-host");
  };
  const headingTitel = useMemo(() => {
    if (step === STEPS.PROPERTIES) {
      return "How many apartments are you listing?";
    } else if (step === STEPS.CATEGORYS) {
      return "From the list below, which property category is the best fit for your place?";
    } else if (step === STEPS.LOCATION) {
      return "Where is the property you're listing?";
    } else if (step === STEPS.INFO) {
      return "Share some basics about your place";
    }
    if (step === STEPS.DESCRIPTION) {
      return "How would you describe your place?";
    }
    if (step === STEPS.IMAGES) {
      return "What does your place look like?";
    }
    if (step === STEPS.PRICE) {
      return "How much do you charge per night?";
    }
  }, [step]);

  const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    if (step !== STEPS.READY) {
      return onNext();
    }
    if (step === STEPS.READY) {
      setIsLoading(true);
      try {
        const locationLabel = data.location
          ? data.location.label?.replace(/\s+/g, "-").toLowerCase()
          : null;
        const category = data.category?.replace(/\s+/g, "-").toLowerCase();
        const city = data.city?.replace(/\s+/g, "-").toLowerCase();
        const newData = {
          ...data,
          userId: currentUser?.id,
          location: locationLabel,
          city: city,
          category: category,
        };
        await CreateListing(newData);

        toast.success("Listing created!");

        setStep(STEPS.PROPERTIES);
      } catch (error) {
        toast.error("Somthing went wrong");
      } finally {
        setIsLoading(false);
      }
    }
  };
  const actionLabel = useMemo(() => {
    if (step === STEPS.READY) {
      return undefined;
    }
    return "Continue";
  }, [step]);
  const secondaryActionLabel = useMemo(() => {
    return "Back";
  }, [step]);
  let bodyContent = (
    <div>
      <div className=" border border-gray-300 bg-white ">
        <div className="w-full">
          <PropertyCard
            title="One apartment"
            subTitle="Guests have access to the entire place and don't have to share it with the host or other guests."
            src={house1}
            onClick={() => setValue("property", "oneAppartement")}
            selected={property === "oneAppartement"}
          />
        </div>
        <div className="">
          <PropertyCard
            title="Multiple apartments"
            src={house2}
            subTitle="Guests have access to the entire place and don't have to share it with the host or other guests."
            onClick={() => setValue("property", "multiple")}
            selected={property === "multiple"}
          />
        </div>
        {property === "multiple" && (
          <>
            <p className="px-5 py-3">
              Are these properties at the same address or building?
            </p>
            <div className="">
              <PropertyCard
                title="Yes, these apartments are at the same address or building"
                src={location1}
                onClick={() => setValue("subProperty", "multiple-yes")}
                selected={subProperty === "multiple-yes"}
              />
            </div>
            <div className="">
              <PropertyCard
                title="No, these apartments are at different addresses or buildings"
                onClick={() => setValue("subProperty", "multip-no")}
                selected={subProperty === "multip-no"}
                src={location2}
              />
            </div>
            <div className="px-3 pb-4">
              <Input
                id="numberOfProperties"
                type="number"
                text="Number of properties"
                register={register}
                errors={errors}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
  if (step === STEPS.CATEGORYS) {
    bodyContent = (
      <div>
        <div className="w-full h-full relative mx-auto p-5">
          {CategoryItems?.length && (
            <div
              className="grid gap-5 grid-cols-1 
                  sm:grid-cols-1 md:grid-cols-2 
                  lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 pb-10 "
            >
              {CategoryItems.map((item) => (
                <div key={item.title} className="col-span-1 ">
                  <CategoryCard
                    onClick={(category) => setCustomValue("category", category)}
                    selected={category === item.title}
                    label={item.title}
                    description={item.description}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            <div className="">
              <div className=" cursor-pointer">
                <BsQuestionCircle size={23} color="#3b82f6" />
              </div>
            </div>
            <p className="text-blue-500 cursor-pointer">
              I don't see my property type on the list
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="p-7">
        <p className="text-sm">
          We may send a letter to confirm the location of your property, so make
          sure that the address is correct – it`s difficult to make changes to
          this later.
        </p>
        <div className="py-4">
          <CountrySelect
            value={location}
            onChange={(value) => setCustomValue("location", value)}
            id="location"
            errors={errors}
            required
            register={register}
          />
        </div>
        <div className="py-3">
          <Input
            id="street"
            type="text"
            disabled={loading}
            register={register}
            errors={errors}
            text="Street name and house number"
            placeholder="Start typing your adress"
            required
          />
        </div>

        <div className="py-3">
          <Input
            id="zipCode"
            text="Zip code"
            type="text"
            disabled={loading}
            register={register}
            errors={errors}
            placeholder="Zip Code"
            required
          />
        </div>
        <div className="py-3">
          <Input
            id="city"
            type="text"
            placeholder="City"
            disabled={loading}
            register={register}
            errors={errors}
            text="City"
            required
          />
        </div>
      </div>
    );
  }
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="px-5 py-3 w-full min-w-[200px] sm:min-w-[600px] md:min-w-[] lg:min-w-[600px] xl:min-w-[600px] 2xl:min-w-[700px]">
        <div className="w-full">
          <div className="py-3 w-full">
            <Counter
              onChange={(value) => setCustomValue("guestCount", value)}
              value={guestCount}
              title="Guests"
              subtitle="How many guests do you allow?"
            />
          </div>

          <hr />
          <Counter
            onChange={(value) => setCustomValue("roomCount", value)}
            value={roomCount}
            title="Rooms"
            subtitle="How many rooms do you have?"
          />
        </div>
        <hr className="" />
        <div className="py-3">
          <Counter
            onChange={(value) => setCustomValue("bathroomCount", value)}
            value={bathroomCount}
            title="Bathrooms"
            subtitle="How many bathrooms do you have?"
          />
        </div>
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="p-7 w-full min-w-full  md:min-w-[] lg:min-w-[700px] xl:min-w-[700px] 2xl:min-w-[700px]">
        <div className="pb-4">
          <Input
            id="propertyName"
            text="Property Name"
            placeholder="Write the name of your property"
            disabled={loading}
            register={register}
            errors={errors}
            required
          />
        </div>
        <hr />
        <div className="py-1 w-full">
          <Input
            id="propertyDescription"
            text="Description"
            placeholder="Short and sweet works best!"
            disabled={loading}
            register={register}
            errors={errors}
            required
          />
        </div>
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="min-w-[100px] sm:min-w-full md:min-w-full lg:min-w-[100px] xl:min-w-[100px] 2xl:min-w-[100px] max-w-[750px]">
        <ImageUpload
          onChange={(value) => setCustomValue("imageSrc", value)}
          values={imageSrc}
          handleImageDelete={handleImageDelete}
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="p-7">
        <div className="py-3">
          <h1 className="font-bold text-lg">
            How can your guests pay for their stay?
          </h1>
          <p className="text-sm ">
            Online, when they make a reservation. Booking.com will facilitate
            your guests’ payments with the Payments by Booking.com service.
          </p>
        </div>
        <Input
          id="price"
          text="Set your price"
          placeholder="How much do you charge per night?"
          FormatPrice
          type="number"
          disabled={loading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.READY) {
    bodyContent = (
      <div className="p-2 mx-2">
        <CreateCard
          item={lastItem[0]}
          onSubmit={handleSubmit(onSubmit)}
          disabled={loading}
          secondaryAction={onBack}
        />
      </div>
    );
  }
  return (
    <div>
      <ListingForm
        steps={step}
        STEPS={STEPS}
        subTitle={headingTitel}
        bodyContent={bodyContent}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        disabled={loading}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.READY ? undefined : onBack}
      />
    </div>
  );
};

export default Apartement;

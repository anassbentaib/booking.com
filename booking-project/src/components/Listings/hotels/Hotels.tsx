import { useMemo, useState } from "react";
import { house1, house2 } from "../../../assets";
import PropertyCard from "../../../ui/Cards/PropertyCard";
import Input from "../../../ui/Input/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ListingForm from "../../../ui/form/ListingForm";
import { CategoryItems, lastItem, hotelsItems } from "../../../Constants";
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
  CATEGORYS = 0,
  PROPERTIES = 1,
  LOCATION = 2,
  INFO = 3,
  DESCRIPTION = 4,
  IMAGES = 5,
  PRICE = 6,
  READY = 7,
}

const Hotels = () => {
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
      queenBed: 1,
      kingBed: 1,
      twinBed: 1,
      city: "",
      category: CategoryItems?.[0]?.title,
      property: "oneAppartement",
      subProperty: "multiple-yes",
      numberOfProperties: 2,
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
  const queenBed = watch("queenBed");
  const kingBed = watch("kingBed");
  const twinBed = watch("twinBed");
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
      try {
        setIsLoading(true);
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
      <div className="w-full h-full relative mx-auto p-5">
        {hotelsItems?.length && (
          <div
            className="grid gap-5 grid-cols-1 
                  sm:grid-cols-1 md:grid-cols-2 
                  lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 pb-10 "
          >
            {hotelsItems.map((item) => (
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
            <div className="cursor-pointer ">
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

  if (step === STEPS.PROPERTIES) {
    bodyContent = (
      <div>
        <div className=" border border-gray-300 bg-white ">
          <div className="w-full">
            <PropertyCard
              title="One serviced apartment"
              subTitle="One serviced apartment with one or multiple rooms that guests can book"
              src={house1}
              onClick={() => setValue("property", "oneAppartement")}
              selected={property === "oneAppartement"}
            />
          </div>
          <div className="">
            <PropertyCard
              title="Multiple condo hotels"
              src={house2}
              subTitle="Multiple condo hotels with one or multiple rooms that guests can book"
              onClick={() => setValue("property", "multiple")}
              selected={property === "multiple"}
            />
          </div>
          {property === "multiple" && (
            <div className="px-3 pb-4">
              <Input
                id="numberOfProperties"
                type="number"
                text="Number of properties"
                register={register}
                errors={errors}
              />
            </div>
          )}
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
            id="location"
            errors={errors}
            required
            register={register}
            value={location}
            onChange={(value) => setCustomValue("location", value)}
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
              subtitle="How many guests can stay in this room?"
            />
          </div>

          <hr />
          <div className="py-3">
            <Counter
              onChange={(value) => setCustomValue("roomCount", value)}
              value={roomCount}
              title="Full bed(s)"
              subtitle="How many Full bed(s) do you have?"
            />
          </div>
        </div>
        <hr className="" />
        <div className="py-3">
          <Counter
            onChange={(value) => setCustomValue("queenBed", value)}
            value={queenBed}
            title="Queen bed(s)"
            subtitle="How many Queen bed(s) do you have?"
          />
        </div>
        <hr className="" />

        <div className="py-3">
          <Counter
            onChange={(value) => setCustomValue("kingBed", value)}
            value={kingBed}
            title="King bed(s)"
            subtitle="How many King bed(s) do you have?"
          />
        </div>
        <hr className="" />
        <div className="py-3">
          <Counter
            onChange={(value) => setCustomValue("twinBed", value)}
            value={twinBed}
            title="Twin bed(s)"
            subtitle="How many Twin bed(s) do you have?"
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
      <div className="p-9 mx-9">
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
  );
};

export default Hotels;

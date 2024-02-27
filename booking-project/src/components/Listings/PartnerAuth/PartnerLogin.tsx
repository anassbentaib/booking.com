import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { ImFacebook2 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { GrApple } from "react-icons/gr";
import { toast } from "react-hot-toast";
import { Login } from "../../../api";
import Input from "../../../ui/Input/Input";
import Button from "../../../ui/Button/Button";
import PartnerLoginForm from "../../../ui/PartnerForm/PartnerLoginForm";

enum STEPS {
  EMAIL = 0,
  PASSWORD = 1,
}

const Signup = () => {
  const [step, setStep] = useState(STEPS.EMAIL);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PASSWORD) {
      return "Login";
    }
    return "Continue with email";
  }, [step]);

  const titleLabel = useMemo(() => {
    if (step === STEPS.PASSWORD) {
      return "Enter your password";
    }
    return "Login to your account";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.EMAIL) {
      return undefined;
    }

    return "Back";
  }, [step]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ data:", data);
    if (step !== STEPS.PASSWORD) {
      onNext();
    }
    if (step === STEPS.PASSWORD) {
      setLoading(true);
      try {
        const response = await Login(data);

        const user = response.data;

        localStorage.setItem("user_token", user?.accessToken);

        toast.success("Logged in!");
        reset();
        window.location.assign("/create-listings/become-a-host");
      } catch (error: any) {
        toast.error("Something went wrong!");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  let bodyContent = (
    <div>
      <div className="text-start  mt-1">
        <Input
          id="email"
          type="email"
          text="Email address"
          placeholder="Enter your email address"
          disabled={loading}
          register={register}
          errors={errors}
          required
          icon
        />
      </div>
    </div>
  );

  if (step === STEPS.PASSWORD) {
    bodyContent = (
      <div className="py-3">
        <Input
          id="password"
          text="Password"
          placeholder="Enter your password"
          disabled={loading}
          type="password"
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  let footerContent = (
    <div>
      <div className="my-3 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
        <p className="mx-4 py-3 mb-0 text-center  text-sm">
          or use one of these options
        </p>
      </div>
      <div className="gap-2 sm:gap-3 md:gap-9 lg:gap-9 xl:gap-9 2xl:gap-9 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
        <Button outline onClick={() => {}} icon={ImFacebook2} color="#316FF6" />
        <Button outline onClick={() => {}} icon={FcGoogle} />
        <Button outline onClick={() => {}} icon={GrApple} />
      </div>
    </div>
  );

  if (step === STEPS.PASSWORD) {
    footerContent = (
      <div>
        <div className="my-3 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center  py-3  text-sm">or</p>
        </div>
        <div className="px">
          <Button
            onClick={() => {}}
            label="Sign in with a verification link"
            color="#316FF6"
            isBorder
          />
          <div className="pt-3">
            <Button
              onClick={() => {}}
              label="Forgot your password?"
              isBlueTransparent
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PartnerLoginForm
        title={titleLabel}
        disabled={loading}
        actionLable={actionLabel}
        formBody={bodyContent}
        footerContent={footerContent}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.EMAIL ? undefined : onBack}
        onSubmit={handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default Signup;

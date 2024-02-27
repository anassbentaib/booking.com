import { useMemo, useState } from "react";
import Input from "../../ui/Input/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { ImFacebook2 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { GrApple } from "react-icons/gr";
import Button from "../../ui/Button/Button";
import SignupForm from "../../ui/form/SignupForm";
import { toast } from "react-hot-toast";
import { Register } from "../../api";
import { useNavigate } from "react-router-dom";
enum STEPS {
  EMAIL = 0,
  PASSWORD = 1,
}

const Signup = () => {
  const [step, setStep] = useState(STEPS.EMAIL);
  const [loading, setLoading] = useState(false);
  const router = useNavigate();
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
      return "Register";
    }
    return "Continue with email";
  }, [step]);

  const titleLabel = useMemo(() => {
    if (step === STEPS.PASSWORD) {
      return "Enter your password";
    }
    return "Create an account";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.EMAIL) {
      return undefined;
    }

    return "Back";
  }, [step]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.PASSWORD) {
      onNext();
    }
    if (step === STEPS.PASSWORD) {
      setLoading(true);
      try {
        await Register(data);
        toast.success("Registred!");
        reset();
        window.location.assign("/sign-in");
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
      <div>
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
        <div className="py-2">
          <Input
            type="password"
            id="confirmPassword"
            text="Confirm Password"
            placeholder="Confirm your password"
            disabled={loading}
            register={register}
            errors={errors}
            required
          />
        </div>
      </div>
    );
  }

  let footerContent = (
    <div>
      <div className="my-1 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
        <p className="mx-4 py-1 mb-0 text-center  text-sm">or</p>
      </div>
      <Button
        isBorder
        label="Already have an account?"
        onClick={() => router("/sign-in")}
      />
    </div>
  );

  // if (step === STEPS.PASSWORD) {
  //   footerContent = (
  //     <div>
  //       <div className="my-3 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
  //         <p className="mx-4 mb-0 text-center  py-3  text-sm">or</p>
  //       </div>
  //       <div className="px">
  //         <Button
  //           onClick={() => window.location.assign("/sign-in")}
  //           label="Already have an account ?"
  //           color="#316FF6"
  //           isBorder
  //         />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div>
      <SignupForm
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

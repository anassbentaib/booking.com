import { useMemo, useState } from "react";
import Input from "../../ui/Input/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../../ui/Button/Button";
import { toast } from "react-hot-toast";
import LoginForm from "../../ui/form/LoginForm";
import { Login } from "../../api";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import {
  signInStart,
  signInSuccess,
  signInFailure,
  signOut,
} from "../../state/userSlice";
import { useNavigate } from "react-router-dom";
enum STEPS {
  EMAIL = 0,
  PASSWORD = 1,
}

const Signup = () => {
  const router = useNavigate();
  const [step, setStep] = useState(STEPS.EMAIL);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
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

  const onSubmit: SubmitHandler<FieldValues> = async (data:any) => {
    if (step !== STEPS.PASSWORD) {
      onNext();
    }

    if (step === STEPS.PASSWORD) {
      setLoading(true);
      dispatch(signInStart());

      try {
        const response = await Login(data);
       
        const decodedToken = jwtDecode(response.data.accessToken);
       
        const user = response.data;
        if (user.success === false) {

          dispatch(signInFailure(user));
          return;
        }

        dispatch(signInSuccess(decodedToken));
        localStorage.setItem("userInfo", JSON.stringify(decodedToken));

        toast.success("Logged in!");
        window.location.assign("/");
        reset();
      } catch (error: any) {
        toast.error("Something went wrong!");
        console.log(error);
        dispatch(signInFailure(error));
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
      <div className="my-1 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
        <p className="mx-4 py-1 mb-0 text-center  text-sm">or</p>
      </div>
      <Button
        isBorder
        label="Don't have an account?"
        onClick={() => router("/sign-up")}
      />
    </div>
  );

  if (step === STEPS.PASSWORD) {
    footerContent = (
      <div>
        <div className="my-1 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center  py-3  text-sm">or</p>
        </div>
        <div className="px">
          <Button
            onClick={() => {}}
            label="Sign in with a verification link"
            color="#316FF6"
            isBorder
          />
          <div className="pt-1">
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
      <LoginForm
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

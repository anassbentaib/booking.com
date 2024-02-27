import { useMemo, useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "react-hot-toast";
import { PartnerLogin, PartnerRegister, Register } from "../../../api";
import Input from "../../../ui/Input/Input";
import Button from "../../../ui/Button/Button";
import PartnerSignupForm from "../../../ui/PartnerForm/PartnerSignupForm";
import "react-phone-input-2/lib/style.css";
import ReactPhoneInput from "react-phone-input-2";
import { jwtDecode } from "jwt-decode";
import {
  signInFailure,
  signInSuccess,
  signOut,
} from "../../../state/partnerSlice";
import { useDispatch } from "react-redux";
enum STEPS {
  EMAIL = 0,
  CONTACT = 1,
  PASSWORD = 2,
}

const PartnerSignup = () => {
  const [step, setStep] = useState(STEPS.EMAIL);
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const onSwitch = () => {
    setIsSignup((mode) => !mode);
  };
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      phoneNumber: "",
      confirmPassword: "",
    },
  });

  const onBack = () => {
    if (isSignup) {
      setStep((value) => value - 2);
    } else {
      setStep((value) => value - 1);
    }
  };
  const onNext = () => {
    if (isSignup) {
      setStep((value) => value + 2);
    } else {
      setStep((value) => value + 1);
    }
  };

  const actionLabel = useMemo(() => {
    if (isSignup) {
      if (step === STEPS.PASSWORD) {
        return "Sign in";
      } else if (step === STEPS.EMAIL) {
        return "Next";
      }
    } else if (step === STEPS.CONTACT) {
      return "Next";
    } else {
      if (step === STEPS.PASSWORD) {
        return "Register";
      } else if (step === STEPS.EMAIL) {
        return "Continue";
      }
    }
    return "";
  }, [isSignup, step]);

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
      if (isSignup) {
        setLoading(true);
        try {
          const email = data?.email;
          const password = data?.password;
          const response = await PartnerLogin(email, password);
          const partner = response.data;
          const decodedToken = jwtDecode(response.data.accessToken);
          const user = response.data;
          if (user.success === false) {
            console.log("NOT DID IT");

            dispatch(signInFailure(user));
            return;
          }

          if (decodedToken.exp) {
            const expTimestamp = decodedToken.exp;
            const expDate = new Date(expTimestamp * 1000);
            const isTokenExpired = expDate < Date.now() / 1000;
            if (isTokenExpired) {
              dispatch(signOut());
              localStorage.removeItem("userInfo");
              window.location.assign("/sign-in");
              return;
            }
          }

          dispatch(signInSuccess(decodedToken));
          localStorage.setItem("parnterInfo", JSON.stringify(decodedToken));

          toast.success("Logged in!");
          window.location.assign("/");
          reset();
          localStorage.setItem("partner_token", partner?.accessToken);

          toast.success("Logged In!");
          reset();
          // window.location.assign("/create-listings/become-a-host");
        } catch (error: any) {
          toast.error("Something went wrong!");
          console.log(error);
          dispatch(signInFailure(error));
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(true);
        try {
          await PartnerRegister(data);
          setStep(STEPS.EMAIL);
          toast.success("Registred!");
          reset();
          setIsSignup(true);
          // onSwitch();
          // window.location.assign("/create-listings/become-a-host");
        } catch (error: any) {
          toast.error("Something went wrong!");
          console.log(error);
        } finally {
          setLoading(false);
        }
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

  if (!isSignup) {
    if (step === STEPS.CONTACT) {
      bodyContent = (
        <div>
          <Input
            id="firstname"
            text="First Name"
            placeholder=" "
            disabled={loading}
            type="text"
            register={register}
            errors={errors}
            required
            icon
          />
          <div className="py-2">
            <Input
              id="lastname"
              text="Last Name"
              placeholder=" "
              disabled={loading}
              register={register}
              type="text"
              errors={errors}
              required
              icon
            />
          </div>
          <Controller
            control={control}
            name="phoneNumber"
            rules={{ required: true }}
            render={({ field: { ref, ...field } }) => (
              <ReactPhoneInput
                {...field}
                inputExtraProps={{
                  ref,
                  required: true,
                  autoFocus: true,
                }}
                containerStyle={{
                  width: "100%",
                  border: "1px solid",
                  borderRadius: "5px",
                  background: "transparent",
                }}
                inputStyle={{
                  background: "transparent",
                  border: "none",
                }}
                country={"ma"}
                countryCodeEditable={false}
                specialLabel={"Player Mobile Number"}
              />
            )}
          />
          {/* <div className="py-2">
            <PhoneInput
              country={"us"}
              enableAreaCodes={true}
              inputProps={{
                name: "phone",
                country: "us",
                required: true,
                autoFocus: true,
              }}
              value={formaData.phone}
              onChange={handleOnChange}
              containerStyle={{
                width: "100%",
                border: "1px solid",
                borderRadius: "5px",
                background: "transparent",
              }}
              inputStyle={{
                background: "transparent",
                border: "none",
              }}
            />
          </div> */}
        </div>
      );
    }
  }
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
          icon
        />
        {!isSignup && (
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
              icon
            />
          </div>
        )}
      </div>
    );
  }

  let footerContent = (
    <div>
      <div className="my-3 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 py-1" />
      <div className="">
        <p className="text-[12px] text-center py-2">
          Questions about your property or the Extranet? Check out
          <span className="text-[#316FF6] cursor-pointer"> Partner Help </span>
          or ask another partner in the
          <span className="text-[#316FF6] cursor-pointer">
            {" "}
            Partner Community.{" "}
          </span>
          <div className="pt-4">
            {" "}
            <Button
              isBorder
              label={!isSignup ? "Sign in" : "Create your partner account"}
              onClick={onSwitch}
            />
          </div>{" "}
        </p>
      </div>
    </div>
  );
  if (!isSignup) {
    if (step === STEPS.CONTACT) {
      footerContent = <></>;
    }
  }
  if (step === STEPS.PASSWORD) {
    footerContent = (
      <>
        {isSignup && (
          <div className="pt-4">
            <Button isBlueTransparent label="Forgot your password?" />
          </div>
        )}
      </>
    );
  }

  return (
    <div className="bg-white">
      <PartnerSignupForm
        title={
          isSignup
            ? "Sign in to manage your property"
            : "Create your partner account"
        }
        disabled={loading}
        actionLable={actionLabel}
        formBody={bodyContent}
        footerContent={footerContent}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.EMAIL ? undefined : onBack}
        onSubmit={handleSubmit(onSubmit)}
        subTitle={
          !isSignup && "Create an account to list and manage your property."
        }
      />
    </div>
  );
};

export default PartnerSignup;

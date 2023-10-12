import { Avatar, Button, Spinner } from "flowbite-react";
import { Dispatch, SetStateAction, useState } from "react";
import { FaFingerprint, FaLock } from "react-icons/fa6";

import { FaCheckCircle } from "react-icons/fa";
import { SaveToFirestore } from "../api/hooks/fetchCollections";
import { defaultUser } from "../api/contexts/reducer";
import { useForm } from "react-hook-form";
import useLocalStorage from "../api/hooks/useLocalStorage";

const validationSchema = {
  cardholderName: {
    required: "Cardholder name is required",
  },
  cardNumber: {
    required: "Card number is required",
    pattern: {
      value: /^[0-9]{16,19}$/,
      message: "Invalid card number",
    },
  },
  expiryMonth: {
    required: "Expiry month is required",
  },
  expiryYear: {
    required: "Expiry year is required",
  },
  cvv: {
    required: "CVV is required",
    pattern: {
      value: /^[0-9]{3,4}$/,
      message: "Invalid CVV",
    },
  },
};

interface Props {
  setHasPaid: Dispatch<SetStateAction<boolean>>;
  hasPaid: boolean;
}
const PaymentForm = ({ setHasPaid, hasPaid }: Props) => {
  const [processing, setProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [user] = useLocalStorage("tour-user", defaultUser);

  const onSubmit = (data) => {
    setProcessing(true);
    console.log(data);
    try {
      SaveToFirestore("payment", {
        ...data,
        userId: user.uid,
        user: user.email,
      });

      setHasPaid(true);
    } catch (error) {
      console.log("🚀 ~ file: CheckoutForm.tsx:61 ~ onSubmit ~ error:", error);
    }
    setProcessing(false);
  };

  if (processing)
    return (
      <center className="p-10">
        <Spinner size="xl" color="purple" />
      </center>
    );

  if (hasPaid)
    return (
      <center className="p-10 h-full">
        <FaCheckCircle size="200" color="green" />
        <span className="py-6">Payment completed</span>
      </center>
    );

  return (
    <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="my-2 mx-auto w-fit">
        <Avatar.Group className="mx-auto">
          <Avatar
            stacked
            rounded
            img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQhdYb55fQWl-l1crnKmIate1c5ESGdTY2dQ&usqp=CAU"
          />
          <Avatar
            stacked
            rounded
            img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0JSblPpt_wUrEASGBZLdPdVgzbmxuGMUvKQ&usqp=CAU"
          />
          <Avatar
            stacked
            rounded
            img="https://branditechture.agency/brand-logos/wp-content/uploads/wpdm-cache/Verve-900x0.png"
          />
        </Avatar.Group>
      </div>
      <div className="p-4">
        <div className="space-y-10">
          <div className="w-full">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="cardholderName">Name</label>
              <input
                defaultValue={user.displayName || ""}
                className="rounded-full flex-1 ring-1  focus:bg-purple-100 ring-purple-500 p-4"
                placeholder="e.g. Richard Bovell"
                id="cardholderName"
                type="text"
                {...register("cardholderName", {
                  required: validationSchema.cardholderName.required,
                })}
              />
              {errors.cardholderName && (
                <span className="text-red-600">
                  {errors.cardholderName.message as string}
                </span>
              )}
            </div>
          </div>
          <div className="number">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                required
                className="rounded-full flex-1 ring-1  focus:bg-purple-100 ring-purple-500 p-4"
                id="cardNumber"
                type="text"
                maxLength={19}
                placeholder="8888-8888-8888-8888"
                {...register("cardNumber", {
                  required: validationSchema.cardNumber.required,
                  pattern: validationSchema.cardNumber.pattern,
                })}
              />
              {errors.cardNumber && (
                <span className="text-red-600">
                  {errors.cardNumber.message as string}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-4 items-center justify-between">
            <div className="">
              <div className="flex gap-1 items-center">
                <label htmlFor="expiry-date">Expiry</label>
                <select
                  id="expiry-date"
                  className="rounded-full flex-1 ring-1  focus:bg-purple-100 ring-purple-500 p-2"
                  {...register("expiryMonth", {
                    required: validationSchema.expiryMonth.required,
                  })}
                >
                  <option>MM</option>
                  <option value="1">01</option>
                  <option value="2">02</option>
                  <option value="3">03</option>
                  <option value="4">04</option>
                  <option value="5">05</option>
                  <option value="6">06</option>
                  <option value="7">07</option>
                  <option value="8">08</option>
                  <option value="9">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
                <span>/</span>
                <select
                  className="rounded-full flex-1 ring-1  focus:bg-purple-100 ring-purple-500 p-2"
                  id="expiry-year"
                  {...register("expiryYear", {
                    required: validationSchema.expiryYear.required,
                  })}
                >
                  <option>YYYY</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                </select>
              </div>
              {errors.expiryMonth && (
                <span className="text-red-600">
                  {errors.expiryMonth.message as string}
                </span>
              )}
              {errors.expiryYear && (
                <span>{errors.expiryYear.message as string}</span>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex gap-2 items-center ml-6">
                <label htmlFor="cvv" className="text-xs font-semibold">
                  CVC/CVV
                </label>
                <input
                  required
                  type="text"
                  className="rounded-full flex-1 ring-1 w-20  focus:bg-purple-100 ring-purple-500 p-2"
                  maxLength={4}
                  placeholder="123"
                  {...register("cvv", {
                    required: validationSchema.cvv.required,
                    pattern: validationSchema.cvv.pattern,
                  })}
                />
                <FaFingerprint />
              </div>
              {errors.cvv && (
                <span className="text-red-600 text-sm">
                  {errors.cvv.message as string}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Button type="submit" className="mb-6" pill color="purple" fullSized>
          <FaLock className="mx-4" /> Confirm and Pay
        </Button>
      </div>
    </form>
  );
};

export default PaymentForm;

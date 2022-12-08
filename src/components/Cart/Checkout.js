import React from "react";
import { useForm } from "react-hook-form";
import styles from "./Checkout.module.css";

const Checkout = ({ cancel, submit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();
  const submitHandler = (data) => {
    submit(data);
    reset();
  };
  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
        <div className={styles.control}>
          <label htmlFor="name" className="">
            Your Name
          </label>
          <input
            type="text"
            className=""
            {...register("name", {
              required: "Name is Required!",
              maxLength: 30,
            })}
            onKeyUp={() => {
              trigger("name");
            }}
          />
          <div>
            {errors.name && (
              <small className="text-danger">{errors.name.message}</small>
            )}
          </div>
        </div>

        <div className={styles.control}>
          <label className="">Phone Number</label>
          <input
            type="Tel"
            {...register("phone", {
              required: "Phone is Required",
              pattern: {
                value:
                  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                message: "Invalid phone no",
              },
            })}
            onKeyUp={() => {
              trigger("phone");
            }}
            className=""
          />
          <div>
            {errors.phone && (
              <small className="text-danger">{errors.phone.message}</small>
            )}
          </div>
        </div>

        <div className={styles.control}>
          <label className="">Address</label>
          <input
            type="text"
            {...register(
              "Address",
              { required: "Address is Required" },
              {
                minLength: {
                  value: 10,
                  message: "Minimum Required length is 10",
                },
              }
            )}
            onKeyUp={() => {
              trigger("Address");
            }}
            className=""
          />
          <div>
            {errors.Address && (
              <small className="text-danger">{errors.Address.message}</small>
            )}
          </div>
        </div>

        <div className={styles.control}>
          <label className="">Special Instruction</label>
          <textarea
            type="text"
            {...register("message", {
              required: false,
            })}
            onKeyUp={() => {
              trigger("message");
            }}
            rows={5}
            className=""
          />
        </div>
        <div>
          {errors.message && (
            <small className="text-danger">{errors.message.message}</small>
          )}
        </div>

        <div className={styles.actions}>
          <button type="submit" value="Send message" className={styles.submit}>
            Submit Order
          </button>
          <button
            type="button"
            value="Cancel Order"
            className=" "
            onClick={() => cancel()}
          >
            Cancel Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;

//import { useFormik } from "formik";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

/* import * as yup from 'yup';

let signInSchema = yup.object().shape({
  email: yup.string().email().required().min(3,"email must be min 3 characters"),
  password: yup.number().required().positive().integer(),
 
}); */

interface Inputs {
  email: string;
  password: string;
}
function login() {
  const [Login, setLogin] = useState(false);
  const { singIn, singUp } = useAuth(); //to use our customized hook

  /* const {values,errors,handleChange, setFieldValue} =useFormik({
    initialValues:{
      email:"",
      passowrd:""
    },
    onSubmit:(values)=>{

    },
    validationSchema:signInSchema
  }) */
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    console.log(Login);

    if (!Login) {
      await singIn(email, password);
    } else {
      await singUp(email, password);
    }
  };

  return (
    <div
      className="relative flex h-screen w-auto flex-col
     bg-black md:bg-transparent justify-center items-center"
    >
      <Head>
        <title>Netflix</title>
        <link rel="stylesheet" href="/favicon.ico" />
      </Head>
      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
      ></Image>

      <img
        src="https://rb.gy/ulxxee"
        alt=""
        className="absolute  left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 ml-4 h-auto px-4 py-10 space-y-4  bg-black/75 max-w-md
        md:mt-10 md:max-w-md md:px-14  "
      >
        <h1 className="text-4xl font-semibold ">Sign In</h1>
        <div className="relative  space-y-2 ">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="p-1 text-[13px] font-light text-orange-500">
                This field is required
              </span>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="p-1 text-[13px] font-light text-orange-500">
                This field is required
              </span>
            )}
          </label>
        </div>
        <button
          type="submit"
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
          onClick={() => {
            setLogin(false);
          }}
        >
          Sing In
        </button>
        <div className="text-[gray]">
          New to Netflix?{" "}
          <button
            type="submit"
            className="text-white  hover:underline "
            onClick={() => {
              setLogin(true);
            }}
          >
            Sing up now
          </button>
        </div>
      </form>
    </div>
  );
}

export default login;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/AddSchool.module.css";
import { useRouter } from "next/router";

const AddSchool = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      console.log("Submitted data:", data);

      const response = await fetch("http://localhost:3001/api/addSchool", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.schoolName,
          address: data.address,
          city: data.city,
          state: data.state,
          contact: data.contact,
          image: data.image,
          email_id: data.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to insert data");
      }

      const result = await response.json();

      console.log("Data inserted:", result);

      await router.push("/showSchool");
    } catch (error) {
      console.error("Error inserting data into MySQL:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Add School information</h1>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label htmlFor="schoolName">School Name:</label>
            <input
              {...register("schoolName", {
                required: "School Name is required",
              })}
              id="schoolName"
            />
            {errors.schoolName && (
              <p className="error">{errors.schoolName.message}</p>
            )}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">Address:</label>
            <input
              {...register("address", { required: "Address is required" })}
              id="address"
            />
            {errors.address && (
              <p className="error">{errors.address.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="city">City:</label>
            <input
              {...register("city", { required: "City is required" })}
              id="city"
            />
            {errors.city && <p className="error">{errors.city.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="state">State:</label>
            <input {...register("state")} id="state" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="contact">Contact:</label>
            <input {...register("contact")} id="contact" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="image">Image:</label>
            <input type="file" {...register("image")} id="image" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input type="email" {...register("email")} id="email" />
          </div>

          <div className={styles.formGroup}>
            <button className="button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSchool;

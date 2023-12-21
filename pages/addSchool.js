import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/AddSchool.module.css";
import { useRouter } from "next/router";
import Layout from "../Components/Layout";

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
  
      const formData = new FormData();
      formData.append("name", data.schoolName);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("contact", data.contact);
      formData.append("image", data.image[0]); 
      formData.append("email_id", data.email);
  
      const response = await fetch("http://localhost:3001/api/addSchool", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to insert data");
      }
  
      const result = await response.json();
  
  
      await router.push("/showSchool");
    } catch (error) {
      console.error("Error inserting data into MySQL:", error.message);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <Layout>   
      <div className={styles.container}>
      <div className={styles.card}>
        <h1>Add School information</h1>
        {isLoading && <p>Loading...</p>}
        {error && <p className={styles.error}>Error: {error.message}</p>}
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
              <p className={styles.error}>{errors.schoolName.message}</p>
            )}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">Address:</label>
            <input
              {...register("address", { required: "Address is required" })}
              id="address"
            />
            {errors.address && (
              <p className={styles.error}>{errors.address.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="city">City:</label>
            <input
              {...register("city", { required: "City is required" })}
              id="city"
            />
            {errors.city && <p className={styles.error}>{errors.city.message}</p>}
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
        {errors.schoolName || errors.address || errors.city ? (
          <div className={styles.warningContainer}>
            <p className={styles.error}>Please fill in all required fields.</p>
          </div>
        ) : null}
      </div>
    </div>
    </Layout>
 
  );
};

export default AddSchool;

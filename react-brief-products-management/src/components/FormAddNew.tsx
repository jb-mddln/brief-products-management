import React from "react";
import { Product } from "../models/Product";
import { Category } from "../models/Category";
import { useFormik } from "formik";
import * as Yup from "yup";

interface FormAddNewProps {
  type: string | undefined;
}

type FormValues = Product | Category;

const productSchema: Yup.AnyObjectSchema = Yup.object().shape({
  id: Yup.number()
    .typeError("L'Id doit être un nombre")
    .required("Un Id est requis")
    .positive("L'Id doit être positif"),
  name: Yup.string().required("Un nom est requis"),
  description: Yup.string().required("Une description est requise"),
  price: Yup.number()
    .typeError("L'Id doit être un nombre")
    .required("un prix est requis")
    .positive("Le prix doit être positif"),
  stock: Yup.number()
    .typeError("L'Id doit être un nombre")
    .required("Un stock est requis")
    .positive("Le stock doit être positif"),
});

const categorySchema: Yup.AnyObjectSchema = Yup.object().shape({
  id: Yup.number()
    .typeError("L'Id doit être un nombre")
    .required("Un Id est requis")
    .positive("L'Id doit être positif"),
  name: Yup.string().required("Un nom est requis"),
  description: Yup.string().required("Une description est requise"),
});

const getInitialValueAndSchema = (
  type: string | undefined
): { initialValue: FormValues; validationSchema: Yup.AnyObjectSchema } => {
  let initialValue: FormValues = {} as FormValues;
  let validationSchema: Yup.AnyObjectSchema = Yup.object().shape({});

  if (type === "products") {
    initialValue = {
      id: 0,
      name: "",
      description: "",
      image: new Uint8Array(),
      price: 0,
      stock: 0,
    } as Product;
    validationSchema = productSchema;
  } else if (type === "categories") {
    initialValue = {
      id: 0,
      name: "",
      description: "",
      image: new Uint8Array(),
    } as Category;
    validationSchema = categorySchema;
  }

  return { initialValue, validationSchema };
};

const FormAddNew: React.FC<FormAddNewProps> = ({ type }) => {
  const { initialValue, validationSchema } = getInitialValueAndSchema(type);

  const formikPost = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = (values: FormValues) => {
    console.log("Form submitted with values:", values);
  };

  return (
    <form onSubmit={formikPost.handleSubmit}>
      {Object.keys(formikPost.errors).map((fieldName, index) => {
        if (
          formikPost.touched[fieldName as keyof FormValues] &&
          formikPost.errors[fieldName as keyof FormValues]
        ) {
          return (
            <div key={index} className="alert alert-danger">
              <h3 className="alert-title">Erreur</h3>
              <p className="alert-content">
                {formikPost.errors[fieldName as keyof FormValues]}
              </p>
            </div>
          );
        }
        return null;
      })}
      <label>
        Id:
        <input type="text" name="id" onChange={formikPost.handleChange} />
      </label>
      <label>
        Nom:
        <input type="text" name="name" onChange={formikPost.handleChange} />
      </label>
      <label>
        Description:
        <input
          type="text"
          name="description"
          onChange={formikPost.handleChange}
        />
      </label>
      <label>
        Description:
        <input type="file" name="image" onChange={formikPost.handleChange} />
      </label>
      {type === "products" && (
        <>
          <label>
            Stock:
            <input
              type="text"
              name="stock"
              onChange={formikPost.handleChange}
            />
          </label>
          <label>
            Price:
            <input
              type="text"
              name="price"
              onChange={formikPost.handleChange}
            />
          </label>
        </>
      )}
      {type === "categories" && (
        <>
          <label>
            Products:
            <input
              type="text"
              name="products"
              onChange={formikPost.handleChange}
            />
          </label>
        </>
      )}
      <button className="button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default FormAddNew;

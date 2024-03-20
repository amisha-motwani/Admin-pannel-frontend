import * as Yup from "yup";

export const formSchema = Yup.object({
    name: Yup.string().min(2).max(30).required("Please enter the name of the product"),
    price:Yup.string().min(1).required("Please enter the price of the product"),
    description:Yup.string().min(1).required("Please enter description")
})
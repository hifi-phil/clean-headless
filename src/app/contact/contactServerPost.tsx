"use server";
import { postApiV1ContactPostContactForm } from "@/api-clean/contact/contact";
import { EmailForm } from "@/api-clean/model";

export const postContactForm = async (emailForm: EmailForm) => {
    return postApiV1ContactPostContactForm(emailForm);
}
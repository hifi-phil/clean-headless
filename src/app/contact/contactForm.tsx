"use client";
import { getDictionValue } from "@/helpers/dictionary";
import { useState } from "react";
import { EmailForm, TranslationModel } from "@/api-clean/model";
import { postContactForm } from "./contactServerPost";
import { ContactContentResponseModel } from "@/api/model";
import HTMLParser from 'html-react-parser';

export default function ContactForm(props: {
  dictionaryItems: TranslationModel[];
  pageContent?: ContactContentResponseModel
}) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleSubmit = async () => {
    const formData : EmailForm = {
        name: name,
        email: email,
        message: message,
    };

    const response = await postContactForm(formData);

    if (response.status === 200) {
        setIsSuccess(true);
    } else {
        setIsError(true);
    }
  };

  if(isSuccess) {
    return <>
        {HTMLParser(props.pageContent?.properties?.successMessage?.markup!)}
    </>
  }
  else if (isError) {
    return <>
        {HTMLParser(props.pageContent?.properties?.errorMessage?.markup!)}
    </>
  }
  else {
      return (
        <>
            {HTMLParser(props.pageContent?.properties?.instructionMessage?.markup!)}
            <div className="row">
            <form className="text-left my-4">
                <div className="form-floating">
                    <input
                    required
                    asp-for="@Model.Name"
                    className="form-control"
                    id="name"
                    type="text"
                    placeholder="Enter your name..."
                    onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="Name">
                    {getDictionValue(props.dictionaryItems, "ContactForm.Name")}
                    </label>
                    <span asp-validation-for="@Model.Name" className="text-danger"></span>
                </div>
                <div className="form-floating">
                    <input
                    required
                    type="email"
                    asp-for="@Model.Email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email..."
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="Email">
                    {getDictionValue(props.dictionaryItems, "ContactForm.Email")}
                    </label>
                    <span asp-validation-for="@Model.Email" className="text-danger"></span>
                </div>
                <div className="form-floating">
                    <textarea
                    required
                    asp-for="@Model.Message"
                    className="form-control"
                    id="message"
                    placeholder="Enter your message here..."
                    rows={5}
                    style={{ height: "12rem" }}
                    onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    <label htmlFor="Message">
                    {getDictionValue(props.dictionaryItems, "ContactForm.Message")}
                    </label>
                    <span asp-validation-for="@Model.Message" className="text-danger"></span>
                </div>
            </form>
            <br />
            <div className="form-floating">
                <button
                className="btn btn-primary text-uppercase float-end"
                id="submitButton"
                type="button"
                onClick={handleSubmit}
                >
                {getDictionValue(props.dictionaryItems, "ContactForm.Send")}
                </button>
            </div>
            </div>
        </>
      );
  }
}

import { useState, useContext } from "react";
// user context
import { UserContext } from "../../contexts/user.context";
// Input Form
import FormInput from "../form-input/form-input.component";
// Button
import Button from "../button/button.component";
// styles
import "./sign-in-form.styles.scss";

// Firebase
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

// formfield object
const defaultFormFields = {
  email: "",
  password: "",
};

// Sign in component
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // user context
  const { setCurrentUser } = useContext(UserContext);

  // reset form fields
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  // form submit action for Sign up using email and password
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      // Pass the user object to the user context
      setCurrentUser(user);

      // reset from fields after successful user sign in
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        alert("Wrong Email & Password Combination");
      } else {
        console.log(error);
      }
    }
  };

  // updating the input field with its input value and updating the formfield object
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account</h2>
      <span>Sign in with your Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

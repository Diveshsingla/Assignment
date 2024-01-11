import { FormEvent, useReducer } from "react";
import { useStoredJoineeList } from "./JoineContext.tsx";
import "../styles.css";
const AddJoinees = () => {
  const { handleJoin } = useStoredJoineeList();

  interface FormState {
    name: string;
    email: string;
  }

  type FormAction =
    | { type: "SET_FIELD"; field: string; value: string }
    | { type: "CLEAR_FIELDS" };

  const formReducer = (state: FormState, action: FormAction): FormState => {
    switch (action.type) {
      case "SET_FIELD":
        // console.log(action.value);
        return { ...state, [action.field]: action.value };

      case "CLEAR_FIELDS":
        return { name: "", email: "" };
      default:
        return state;
    }
  };

  const [formState, dispatch] = useReducer(formReducer, {
    name: "",
    email: "",
  });

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState.name && formState.email) {
      // Generate unique hex code

      // Update subscribers state
      handleJoin(formState);

      // Clear input fields
      dispatch({ type: "CLEAR_FIELDS" });
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-heading">
        <text>Join </text>
        <text className="heading-part">Unique Schools</text>
      </h1>
      <form onSubmit={handleFormSubmit}>
        <div className="form-div">
          <input
            className="form-input"
            type="text"
            placeholder="Name"
            value={formState.name}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "name",
                value: e.target.value,
              })
            }
          />
        </div>
        <div className="form-div">
          <input
            className="form-input"
            type="email"
            placeholder="Email"
            value={formState.email}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "email",
                value: e.target.value,
              })
            }
          />
        </div>
        <div className="form-div">
          <input
            className="form-input"
            readOnly={true}
            value={"16 digit HEX Code"}
          />
        </div>
        <div style={{ paddingTop: "25px" }}>
          <button className="form-button" type="submit">
            Join
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJoinees;

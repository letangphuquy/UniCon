import Link from "next/link"
import FormElement from "./FormElement"
import {REGEX} from "@/CONST"

const Form = ({ title, desc, user, setUser, handleSubmit, readonly, setReadonly}) => {
  return ( user &&
    <section className="w-full max-w-full flex-between flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient"> {`Profile of ${title}`} </span>
      </h1>
      <p className="desc text-left max-w-md"> {desc} </p>
      <form
        onSubmit={handleSubmit}
        className="form"
        >
        <FormElement
          label="Username"
          user={user}
          setUser={setUser}
          field="username"
          readonly={readonly}
          // sanitize={(s) => s.length <= 50 ? "" : "Name shouldn't exceed 50 characters"}
          sanitize={(s) => {
            // return s.match(/^(?=.{2,30}$)(?![_.])(?!.*[_.]{2})[\p{L}\p{Mn}\p{Pd}a-zA-Z ]+(?<![_.])$/u) 
            return s.match(REGEX) 
              ? "" : "Your name should consist of letters (support for multiple handwriting) . or _ and have length in range [6,30]" 
          }}
        />
        <FormElement 
          label="Email"
          user={user}
          setUser={setUser}
          field="email"
          readonly={true}
        />
        <FormElement 
          label="About"
          user={user}
          setUser={setUser}
          field="about"
          readonly={readonly}
          sanitize={(s) => s.length <= 500 ? "" : "About shouldn't exceed 500 characters"}
          />
        <FormElement 
          label="Institution"
          user={user}
          setUser={setUser}
          field="institution"
          readonly={readonly}
          sanitize={(s) => s.length <= 50 ? "" : "Institution name shouldn't exceed 50 characters"}
        />
        <div className="flex-end mx-3 mb-5 gap-4">
          {(!readonly) &&
            <button 
              type="button"
              className="outline_btn text-gray-500 text-sm"
              onClick={() => {
                setReadonly(true) 
              }} 
            >
              Cancel
            </button>
          }
          <button
            type={readonly ? "button" : "submit"}
            onClick={async (e) => {
              // console.log("Clicked at ", readonly, " got ", e);
              if (!readonly) await handleSubmit(e);
              setReadonly((state) => !state)
            }}
            className={readonly ? "orange_btn" : "green_btn"}
          >
            {readonly ? "Edit" : "Save"}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form
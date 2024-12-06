
import { Input } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"

import { Provider } from "@/components/ui/provider"

import LocationSelector from "./location"

const Demo = () => {
  return (
    <Field invalid label="Email" errorText="This field is required">
      <Input placeholder="Enter your email" />
    </Field>
  )
}





export default function NewStudentForm() {
  return (
  <>
    <Provider>
      <Demo></Demo>  
    </Provider>

    <LocationSelector></LocationSelector>
    </>
  );
}

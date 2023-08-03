import { useParams } from "react-router-dom";

export default function Portal() {
  const { id } = useParams();
  
  return (<>
    <h1 className="">welcome to portal. quiz id: {id}</h1>
    </>
  )
}
import { useNavigate } from "react-router-dom"

function Back() {
    const navigate=useNavigate()
  return (
    <div onClick={()=>navigate(-1)} className="cursor-pointer">👈Back</div>
  )
}

export default Back
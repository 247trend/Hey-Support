import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { createTicket, reset } from "../features/tickets/ticketSlice"
import Loader from "../components/Loader"
import BackButton from "../components/BackButton"

const NewTicket = () => {
  const { user } = useSelector((state) => state.auth)
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.tickets)

  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product, setProduct] = useState("product A")
  const [description, setDescription] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      dispatch(reset())
      navigate("/tickets")
    }

  }, [dispatch, isError, isSuccess, message, navigate])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createTicket({ product, description }))
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" value={name} className="form-control" disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input type="email" value={email} className="form-control" disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              value={product}
              id="product"
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="product A">product A</option>
              <option value="product B">product B</option>
              <option value="product C">product C</option>
              <option value="product D">product D</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
          <br />
        </form>
      </section>
    </>
  )
}

export default NewTicket

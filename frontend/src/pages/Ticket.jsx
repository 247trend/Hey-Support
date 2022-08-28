import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { getTicket, reset, closeTicket } from "../features/tickets/ticketSlice"
import BackButton from "../components/BackButton"
import Loader from "../components/Loader"
import { toast } from "react-toastify"

const Ticket = () => {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector((state) => state.tickets)
  const dispatch = useDispatch()
  const { ticketId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, message, ticketId])

  const onClose = () => {
    dispatch(closeTicket(ticketId))
    toast.success("Ticket Closed")
    navigate("/tickets")
  }

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <h3>Something Went Wrong</h3>
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>{ticket.status}</span>
        </h2>
        <h3>Data Submitted: {new Date(ticket.createdAt).toLocaleString()}</h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of the issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>

      {ticket.status !== "Closed" && (
        <button onClick={onClose} className="btn btn-block btn-danger">
          Close
        </button>
      )}
    </div>
  )
}

export default Ticket

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getTickets, reset } from "../features/tickets/ticketSlice"
import Loader from "../components/Loader"
import BackButton from "../components/BackButton"

const Tickets = () => {
  const { tickets, isLoading, isSuccess } = useSelector((state)=>state.tickets)

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getTickets())
  },[dispatch])

  if (isLoading) {
    return <Loader />
  }

  return (
    <div>Tickets</div>
  )
}

export default Tickets
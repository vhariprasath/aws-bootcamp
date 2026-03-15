import React, { Fragment } from 'react'
import Hotel from './Hotel'

export default function HotelList(props) {
  return <Fragment>
    {
      props.hotelList.map((hotel, i) => {
        return <Hotel hotel={hotel} key={i}
          incrementRoomsBooked={props.incrementRoomsBooked}
          index={i}
          decreamentRoomsBooked={props.decreamentRoomsBooked}
        ></Hotel>
      })}
   
  </Fragment>
}

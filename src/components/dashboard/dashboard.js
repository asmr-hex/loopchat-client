import React from 'react'
import './dashboard.css'

const Dashboard = (props) => {
  return(
    <div className='dashboard'>
      {props.session.id}
    </div>
  )
}

export default Dashboard

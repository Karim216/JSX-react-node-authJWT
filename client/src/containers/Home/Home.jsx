import React, { Fragment } from 'react'
import Loading from '../../components/Loading/Loading'
import Header from '../../components/Header/Header'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <Fragment>
      <Header />
      <Outlet />
    </Fragment>
  )
}

export default Home
import { useState } from 'react'
import { Image, Layout } from 'antd'
import { Link } from 'react-router-dom'

function Details() {

  return (
    <Layout.Content>
      <Link to={'/'}>{'Home'}</Link>
      <Image
        width={200}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
    </Layout.Content>
  )
}

export default Details

import { useState } from 'react'
import { Avatar, Layout, List as ListAnt, Typography } from 'antd'
import { ListPageWrapperSC } from './ListStyles'
import { Link } from 'react-router-dom'

function List() {
  
  const data = [
    {
      title: 'Ant Design Title 2',
    },
  ]
  return (
      <Layout.Content>
        <Link to={'animes/1'}>{'primeiro'}</Link>
        <ListAnt
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <ListAnt.Item>
          <ListAnt.Item.Meta
          avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
          title={<a href="https://ant.design">{item.title}</a>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
          </ListAnt.Item>
          )}
        />
      </Layout.Content>
  )
}

export default List

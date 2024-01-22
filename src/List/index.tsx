import { useState } from 'react'
import { Avatar, List as ListAnt } from 'antd'
import { ListPageWrapperSC } from './ListStyles'

function List() {
  
  const data = [
    {
      title: 'Ant Design Title 1',
    },
  ]
  return (
    <ListPageWrapperSC>
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
    </ListPageWrapperSC>
  )
}

export default List

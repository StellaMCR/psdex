import { useState } from 'react'
import { Avatar, Layout, List as ListAnt, Typography, Input, Skeleton, Spin } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { getAnimesList } from './getAnimesList';
import { IAnimeListItem } from './types';

const { Search } = Input;
const { Content } = Layout;
const { Title } = Typography;

function List() {
  
  const [data, setData] = useState<IAnimeListItem[]>([])
  const [loading, setLoading] = useState(false)

  async function searchAnimeByName(name: string) {
    setLoading(true)
    const response = await getAnimesList(name)
    setData(response.data)
    setLoading(false)
  }

  return (
      <Content>
        <Title>Lista de Animes</Title>
        <Search placeholder='Pesquise pelo nome do anime' onSearch={searchAnimeByName}/>
        { loading ? 
          <Spin tip="Loading" size="large"/>
        :
        <ListAnt
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <ListAnt.Item key={item.id}>
            <ListAnt.Item.Meta
              avatar={<Avatar src={item.imageUrl} />}
              title={item.title}
              description={`${item.rating}`}
              />
            </ListAnt.Item>
            )}
            />
          }
      </Content>
  )
}

export default List

import { useEffect, useState } from 'react'
import { Avatar, Layout, List as ListAnt, Typography, Input, Spin, Pagination } from 'antd'
import { Link } from 'react-router-dom'
import { PAGE_SIZE, getAnimesList } from './getAnimesList';
import { IAnimeListItem, IPagination } from './types';

const { Search } = Input;
const { Content } = Layout;
const { Title } = Typography;

function List() {
  
  const [data, setData] = useState<IAnimeListItem[]>([])
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    hasNextPage: false,
    total: 0
  })
  const [loading, setLoading] = useState(false)
  const [nameToSearchFor, setNameToSearchFor ] = useState<string | undefined>(undefined)

  async function searchAnimeByName(name?: string, page?: number) {
    setLoading(true)
    const response = await getAnimesList(name, page)
    setData(response.data)
    setPagination(response.pagination)
    setLoading(false)
  }

  const onChangePage = (page: number) => {
    searchAnimeByName(nameToSearchFor, page)
  }

  const goToDetails = (id: number) => {
    
  }

  useEffect(() => {
    searchAnimeByName()
  }, [])
  

  return (
      <Content>
        <Title>Lista de Animes</Title>
        <Search 
        placeholder='Pesquise pelo nome do anime' 
        onSearch={(name) => {
          searchAnimeByName(name, 1)
          setNameToSearchFor(name)
          }}/>
        { loading ? 
          <Spin tip="Loading" size="large"/>
        :
        <ListAnt
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <ListAnt.Item 
              key={item.id}
              actions={[<Link to={`animes/${item.id}`}>Ver detalhes</Link>]}
              >
                <ListAnt.Item.Meta
                  avatar={<Avatar src={item.imageUrl} />}
                  title={item.title}
                  description={`${item.rating}`}
                  />
            </ListAnt.Item>
          )}
          />
        }
          <Pagination 
            current={pagination.currentPage} 
            total={pagination.total}
            pageSize={PAGE_SIZE}
            onChange={onChangePage}
            showSizeChanger={false}
            showTotal={(total) => `Total de ${total} items`}
            />
      </Content>
  )
}

export default List

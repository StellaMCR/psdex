import { useEffect, useState } from 'react'
import { Avatar, Layout, List as ListAnt, Typography, Input, Spin, Pagination, Space, Grid } from 'antd'
import { Link } from 'react-router-dom'
import { PAGE_SIZE, getAnimesList } from './getAnimesList';
import { IAnimeListItem, IPagination } from './types';
import { listContentStyle, spaceDesktopStyle, spaceMobileStyle } from './listStyles';

const { Search } = Input
const { Content } = Layout
const { Title } = Typography
const { useBreakpoint } = Grid

function List() {
  
  const screen = useBreakpoint()
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

  useEffect(() => {
    searchAnimeByName()
  }, [])
  

  return (
      <Content style={listContentStyle}>
        <Title>Animes List</Title>
        <Space 
        direction='vertical'
        style={!screen.md ? spaceMobileStyle : spaceDesktopStyle}
        >
        <Search 
        placeholder='Pesquise pelo nome do anime' 
        onSearch={(name) => {
          searchAnimeByName(name, 1)
          setNameToSearchFor(name)
          }}/>
        { loading ? 
          <Space>
            <Spin tip="Loading" size="large"/>
          </Space>
            :
            <>
            <ListAnt
            itemLayout="horizontal"
            bordered
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
            
            <Pagination 
              current={pagination.currentPage} 
              total={pagination.total}
              pageSize={PAGE_SIZE}
              onChange={onChangePage}
              showSizeChanger={false}
              showTotal={(total) => `Total ${total}`}
              responsive
              />
            </>
        }
          </Space>
      </Content>
  )
}

export default List

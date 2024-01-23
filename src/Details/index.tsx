import { useEffect, useState } from 'react'
import { Image, Layout, Skeleton, Typography, Grid, Space, Card } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { getAnimesById } from './getAnimeById';
import { IAnimeDetails } from './types';
import { NOT_FOUND_IMAGE } from '../Assets/notefoundimage';
import { detailsContentStyle, imageCardStyle, spaceMobileStyle } from './detailsStyles';
import ReactPlayer from 'react-player';
import { spaceDesktopStyle } from '../List/listStyles';

const { Content } = Layout;
const { Title, Text, Paragraph} = Typography;
const { useBreakpoint } = Grid

function Details() {

  const screen = useBreakpoint()
  const { animeId } = useParams();
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IAnimeDetails | undefined>(undefined)

  async function getDetails() {
    if (animeId === '' || !animeId)
    return
    setLoading(true)
    const response = await getAnimesById(animeId)
    setData(response)
    setLoading(false)
  }

  useEffect(() => {
   getDetails()
  }, [])
  

  return (
    <Content style={detailsContentStyle}>
      
      <Link to={'/'}>
        <Space>
          <Title level={3} >{`< Back to list`}</Title>
        </Space>
      </Link>

      <Space 
      direction={!screen.md ? 'vertical' : 'horizontal' }
      style={!screen.md ? spaceMobileStyle : spaceDesktopStyle}>
        <Space direction={!screen.md ? 'vertical' : 'horizontal' }>
         <Card 
         bordered 
         loading={loading}
         style={imageCardStyle}
         >
          <Image
              width={'400px'}
              src={data?.imageUrl}
              fallback={NOT_FOUND_IMAGE}
              />
         </Card>
         <Card bordered loading={loading}>
          {data?.japaneseTitle && <Title level={3}>{data.japaneseTitle}</Title>}
          {data?.title && <Title level={4}>{data.title}</Title>}
          {data?.rating && <Title level={5}>{data.rating}</Title>}
          {data?.synopsis && <Paragraph>{data.synopsis}</Paragraph>}
         </Card>
          </Space>
         {data?.trailerUrl && 
        <Card bordered loading={loading}>
            <ReactPlayer url={data.trailerUrl} width={'100%'}/>
        </Card>
      }
      </Space>
    </Content>
  )
}

export default Details

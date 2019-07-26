import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'redux-react-hook'
import actionCreator from '@/store/actionCreator'
import { withRouter } from 'react-router'

import TopicCard from '@/components/topicCard'
import PullList from '@/components/pullList'
import { Loader } from 'semantic-ui-react'
import Utils from '@/utils'
import { usePrevious } from '@/hooks'
import cnodeSDK from '@/utils/cnodeSDK'
import helper from '@/utils/cacheHelper'

import './topic.scss'

const cacheHelper = new helper (60 * 1000)

const Topic = (props) => {
  const limit = 20 
  const { history, location } = props
  const { tab } = Utils.searchToQuery(location.search)

  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [complete, setComplete] = useState(false)
  const prevTab = usePrevious(tab)
  const lockFetch = useRef(false)
  const dispatch = useDispatch()

  const loadMore = () => {
    lockFetch.current = false
    setPage(page => page + 1)
  }
  const readArticle = item => {
    dispatch(actionCreator.setArticle(item))
    history.push(`/article/${item.id}`)
  }

  const resetState = () => {
    lockFetch.current = false
    setPage(1)
    setList([])
    setComplete(false)
  }

  // 分类变化 重置部分数据
  useEffect(() => {
    resetState()
  }, [tab])

  // 当页数和分类变化时触发（引入缓存）
  useEffect(() => {

    let request

    // [ hack fix bug]
    if (prevTab !== tab && page !== 1) return

    const CACHE_KEY = 'topic_' + tab

    if (page === 1 && cacheHelper.check(CACHE_KEY)) {
      const { list, page, complete } = cacheHelper.get(CACHE_KEY)
      lockFetch.current = true
      setList(list)
      setPage(Number(page))
      setComplete(complete)
    } else {
      if (complete || lockFetch.current) return

      request = cnodeSDK.getTopicsByTab(tab, page, limit)
      request.then(res => {
        const data = res.data.data
        if (data.length < limit) setComplete(true)

        setList(list => {
          const newList = page === 1 ? data : list.concat(data)
          cacheHelper.set(CACHE_KEY, {
            list: newList,
            page: page,
            complete: complete
          })
          return newList
        })
      })
    }

    return () => {
      request = null
    }

    // eslint-disable-next-line
  }, [tab, page, complete])

  return (
    <div className="topic-list">
    {
      list.length 
      ? <PullList complete={complete} toEndHandler={loadMore}>
        {
          list.map(item => {
            return (
              <TopicCard
                key={item.id}
                data={item}
                onClick={item => readArticle(item)}
              />
            )
          })
        }
        </PullList>
      : <Loader active inline='centered' size="medium">玩命加载中</Loader>
    }
    </div>
  )
}

export default withRouter(Topic)
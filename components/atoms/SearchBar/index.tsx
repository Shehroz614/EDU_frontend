import React, { useState, useRef, useEffect } from 'react'
import styled from '@emotion/styled'
import SearchBarIcon from '../../../public/static/icons/search-bar-icon'
import SearchHistoryIcon, {
  SearchResultIcon,
} from '../../../public/static/icons/search-history-icon'
import { useRouter } from 'next/router'
import { addSearchQuery } from '@helpers/searchHelper'
import axios from 'axios'
import routes from '@configs/api'
import { useTranslation } from 'react-i18next'

type Props = {
  text?: string
  opacity?: string //opacity of the Text
  fontSize?: string //font size of the Text
  textColor?: string
  placeholder?: string
  width?: string
}

//row will be: icon passed, text passed.

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
`

const SearchBarWrapper = styled.div<{ width: string }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.width ? props.width : '100%')};
  background-color: white;
  /* border: 1px solid rgba(151, 151, 151, 0.25); */
  border-left: 1px solid black;
  align-items: center;
  /* justify-content: center; */
  box-sizing: border-box;
  z-index: 2;
  height: 21px;
  position: relative;
  @media (max-width: 1100px) {
    border: 0;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
`

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1rem;
  margin-left: 25px;
  margin-right: 10px;
`

const InputWrapper = styled.div`
  display: flex;
  margin: auto 0;
  padding: 0rem 0rem;
  width: 100%;
`

const Input = styled.input`
  font-size: 0.875rem;
  color: #1a1e3d;
  border: none;
  width: 85%;
  ::placeholder {
    color: #1a1e3d;
  }
`

const SearchResultsWrapper = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  /* height: 14rem; */
  width: ${(props) => (props.width ? props.width : '100%')};
  margin-top: 23px;
  padding-bottom: 0.5rem;
  background-color: white;
  /* box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.08); */
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`

const SearchResultRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  padding: 0.3rem;
  margin-left: 1rem;
  margin-top: 0.5rem;
  cursor: pointer;
`

const SearchResultRowIcon = styled.div`
  width: 1rem;
  height: 1rem;
`
const SearchResultRowText = styled.div`
  font-size: 0.9rem;
  opacity: 0.68;
  margin-left: 0.5rem;
`

// const DropdownSeparator = styled.div`
//   height: 1px;
//   /* background-color: rgba(151, 151, 151, 0.1); */
//   background-image: url('static/Line 4.png');
//   margin: 0 1rem 0 1.5rem;
// `

// const historyArray: string[] = [
//   'Css for the beginers',
//   'how to play piano',
//   'piano',
//   'musical instruments',
// ]

const getSearchResults = (array: string[]) => {
  //initially we will be looking on the search history array, but ones the user types something we will be sending request with that info,
  //but also not immediately only when the user stopped typing or ones in a second to make the server more efficient.
  //The search history array will be stored in redux.

  return array?.map((section: any) => {
    const router = useRouter()
    return (
      section && (
        <>
          <SearchResultRowWrapper
            onClick={() => {
              addSearchQuery(section?._id)
              router.push(
                {
                  pathname: '/',
                  query: {
                    search: `${encodeURIComponent(section?._id) || '%20'}`,
                  },
                },
                undefined,
                { shallow: true }
              )
            }}
          >
            {section?.type === 'history' ? (
              <SearchResultRowIcon>
                <SearchHistoryIcon />
              </SearchResultRowIcon>
            ) : (
              <SearchResultRowIcon>
                <SearchResultIcon />
              </SearchResultRowIcon>
            )}
            <SearchResultRowText>{section?._id}</SearchResultRowText>
          </SearchResultRowWrapper>
        </>
      )
    )
  })
}

const SearchBar: React.FunctionComponent<Props> = (props) => {
  const { t } = useTranslation('common')
  const { width = '', placeholder } = props

  //const { state, dispatch } = useSearchContext();
  const [searchActive, setSearchActive] = useState(false)

  //to hide search dropdown
  const node = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleClick)
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  const handleClick = (e: MouseEvent): void => {
    if (node!.current!.contains(e.target as Node)) {
      // inside click
      return
    }
    // outside click

    setSearchActive(false)
  }

  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(
    decodeURIComponent((router.query.search || '')?.toString()).trim()
  )

  //const [tm, setTm] = useState<ReturnType<typeof setTimeout>>(setTimeout(() => {},1));
  const [suggestionTm, setSuggestionTm] = useState<
    ReturnType<typeof setTimeout>
  >(setTimeout(() => {}, 1))
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    const getInitialSuggestions = async () => {
      const url = `${routes.BASE}/api/search/courses/suggestions?search=`

      const tokenId = localStorage.getItem('tokenId')

      let config = {}

      if (tokenId) {
        config = {
          headers: {
            Authorization: `Bearer ${tokenId}`,
          },
        }
      }

      if (suggestions.length == 0) {
        setSuggestions((await axios.get(url, config))?.data)
      }
    }
    getInitialSuggestions()
  }, [])

  useEffect(() => {
    if (router.isReady) {
      setSearchQuery(
        decodeURIComponent((router.query.search || '')?.toString()).trim()
      )
    }
    setSearchActive(false)
  }, [router])

  const handleOnChange = (text: any) => {
    // if(router.asPath.split('/')[1] === "courses2"){
    // clearTimeout(tm);
    // setTm(setTimeout( async () => {
    //   await router.push({
    //       pathname: `/courses2/${encodeURIComponent(text.target.value) || "%20"}${getEmptyFiltersURL()}`,
    //       query: {}
    //     },
    //     undefined, { shallow: true })
    //     }, 200)
    //   )
    // }
    setSearchQuery(text.target.value)

    const url = `${
      routes.BASE
    }/api/search/courses/suggestions?search=${encodeURIComponent(
      text.target.value
    )}`
    const tokenId = localStorage.getItem('tokenId')
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }

    clearTimeout(suggestionTm)
    setSuggestionTm(
      setTimeout(async () => {
        if (text.target.value.length > 1) {
          setSuggestions((await axios.get(url, config))?.data)
        }
      }, 500)
    )
    setSearchActive(true)
  }

  const handleOnKeyDown = async (event: any) => {
    if (event.key === 'Enter') {
      await addSearchQuery(searchQuery)
      router.push(
        {
          pathname: '/',
          query: {
            search: `${
              encodeURIComponent(searchQuery?.split('.').join(' ')) || '%20'
            }`,
          },
        },
        undefined,
        { shallow: true }
      )
      setSearchActive(false)
    }
  }

  // const { t } = useTranslation('common')

  return (
    <MainWrapper ref={node}>
      <SearchBarWrapper width={width}>
        <InputWrapper>
          <Icon>
            <SearchBarIcon />
          </Icon>
          <Input
            placeholder={
              placeholder ? placeholder : t('header.searchAnyCourse')
            }
            value={searchQuery}
            onClick={() => {
              setSearchActive(true)
            }}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
          ></Input>
        </InputWrapper>
        {suggestions.length > 0 && (
          <span style={{ width: '100%' }}>
            {searchActive && (
              <SearchResultsWrapper>
                {getSearchResults(suggestions)}
              </SearchResultsWrapper>
            )}
          </span>
        )}
      </SearchBarWrapper>
    </MainWrapper>
  )
}

export default SearchBar

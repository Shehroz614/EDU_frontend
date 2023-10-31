import styled from '@emotion/styled'
import { colors } from '@configs/styles/config'

const HeaderContainer = styled.div`
  height: 89px;
  width: 100%;
  background-color: white;
  display: flex;
  -ms-display: flex;
  justify-content: center;
  padding: 0.5rem 2.5vw;
  /* Medium devices (landscape tablets, 768px and up) */
  @media (max-width: 650px) {
    padding: 0 2.5vw;
    height: 180px;
    padding-bottom: 1.1rem;
    border-bottom: 1px solid #ededed;
  }
`
const InternalWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  align-items: center;
  justify-content: space-between;
  display: flex;
  @media (max-width: 650px) {
    flex-direction: column;
  }
`
const Logo = styled.div`
  display: flex;
  min-width: 4rem;
  height: 100%;
  flex-shrink: 1;
  justify-content: center;
  -ms-display: flex;
  cursor: pointer;
  /* background-color: ${colors.uguPurple}; */
`
const CategoriesButton = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 6rem;
  margin: 0 34px;
  width: max-content;
  margin-right: 24px;
  cursor: pointer;

  @media (max-width: 1100px) {
    display: none;
  }
`
const SearchBarWrapper = styled.div`
  width: 100%;
`
const AuthorWrapper = styled.div`
  display: none;
  @media (min-width: 1100px) {
    display: flex;
  }
`
const TeacherButton = styled.div`
  display: flex;
  align-items: center;
  background: ${colors.uguBrightPurple};
  color: white;
  border-radius: 10px;
  padding: 12px;
  width: max-content;
  -ms-display: flex;
  font-size: 15px;
  margin-left: 2rem;
  cursor: pointer;
`
const ButtonsWrapper = styled.div`
  display: none;

  @media (min-width: 1000px) {
    display: flex;
    height: 100%;
    align-items: center;
    padding-left: 4rem;
  }
`
const ButtonWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.2rem;
  width: 3rem;
  -ms-display: flex;
  @media (max-width: 1250px) {
    display: none;
  }
`
const LoginButton = styled.button`
  height: 100%;
  font-size: 0.875rem;
  margin-left: 1rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`
const ProfileButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.75rem;
  width: 2.75rem;
  border: 2px solid #ffffff;
  border-radius: 2rem;
  background-color: #f8f8f8;
  box-shadow: 1px 1px 15px 10px #f6f6f6;
  @media (max-width: 1000px) {
    display: none;
  }
`
const ProfileIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  border-radius: 2rem;
`
const HamburgerMenu = styled.div`
  display: flex;
  border-radius: 15px;
  /* border: 1px solid ${colors.uguPurple}; */
  /* width: 1.3rem; */
  height: 1.2rem;
  align-self: center;
  margin-left: auto;
  padding: 0 1rem;
  :hover {
    cursor: pointer;
  }
  @media (min-width: 992px) {
    display: none;
  }
`

const Badge = styled.div`
  background-color: rgba(113, 129, 255, 1);
  color: white;
  height: 15px;
  width: 15px;
  border: 3px solid;
  border-radius: 15px;
  font-size: 10px;
  position: absolute;
  display: flex;
  top: 1.45rem;
  right: 6px;
  padding: 3px 4px;
  font-weight: bold;
  /* outline: 3px solid white; */
  line-height: 8px;
`

export const SearchFiltersWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid black;
  height: 55px;
  border-radius: 30px;
  margin-left: 50px;
  width: 70%;
  @media (max-width: 1000px) {
    width: 100%;
  }

  @media (max-width: 650px) {
    margin-left: 0;
  }
`

export {
  HeaderContainer,
  InternalWrapper,
  Logo,
  CategoriesButton,
  SearchBarWrapper,
  AuthorWrapper,
  TeacherButton,
  ButtonsWrapper,
  ButtonWrapper,
  LoginButton,
  ProfileButton,
  ProfileIcon,
  HamburgerMenu,
  Badge,
}

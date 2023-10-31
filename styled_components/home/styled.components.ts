import { colors } from '@configs/styles/config'
import styled from '@emotion/styled'

export const LandingWrapper = styled.div`
  max-width: 100vw;
`

export const UpperBlock = styled.div`
  position: relative;
  max-width: 100vw;
`

export const GradientOneWrapper = styled.div`
  position: absolute;
  top: 390;
  left: 80;
  width: 40vw;
`

export const Gradient1 = styled.div`
  background: linear-gradient(225deg, #ffc000 -4.63%, #7181ff 87.29%);
  width: 28vw;
  height: 28vw;
  border-radius: 50%;
  opacity: 0.3;
  filter: blur(50px) brightness(120%) saturate(150%);
  max-width: 500px;
  max-height: 500px;
  @media (max-width: 500px) {
    width: 50vw;
    height: 50vw;
    opacity: 0.45;
  }
`

export const Gradient2 = styled.div`
  border-radius: 712px;
  opacity: 0.5;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(255, 0, 245, 0.47) 0%,
    rgba(32, 57, 255, 0.07) 100%
  );
  filter: blur(50px);
  z-index: 1;
  width: 31vw;
  height: 31vw;
  max-width: 500px;
  max-height: 500px;
  border-radius: 50%;
  @media (max-width: 500px) {
    height: 80vw;
    width: 80vw;
    opacity: 0.7;
  }
`

export const UpperBlockWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1467px;
  min-height: 10px;
  /* mix-blend-mode: multiply; */
  margin: auto;
  z-index: 2;
  @media (max-width: 1561px) {
    padding: 0 30px;
  }
  @media (max-width: 500px) {
    padding: 0 10px;
  }
`

export const SloganBlock = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 100px;
  @media (max-width: 1561px) {
    margin-top: 40px;
  }
  @media (max-width: 700px) {
    margin-top: 10px;
  }
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`

export const UpperSlogan = styled.div`
  font-family: 'Sofia Pro';
  font-weight: bold;
  font-size: 80px;
  color: #1a1e3d;
  position: relative;
  z-index: 3;
  @media (max-width: 1561px) {
    font-size: 5vw;
  }
  @media (max-width: 500px) {
    width: 100%;
    font-size: 35px;
  }
`

export const GetStartedButton = styled.div`
  display: flex;
  border-radius: 10px;
  background-color: ${colors.uguBrightPurple};
  box-shadow: 0px 15px 60px 0px rgba(0, 0, 0, 0.08);
  color: #fff;
  font-size: 1.2rem;
  width: max-content;
  padding: 14px 32px;
  font-family: 'Sofia Pro';
  margin-top: 30px;
  transition: 0.2s;
  cursor: pointer;
  :hover {
    background-color: ${colors.uguBrightBlue};
  }
  @media (max-width: 1561px) {
    font-size: 1.3vw;
  }
  @media (max-width: 1000px) {
    font-size: 1rem;
  }
  @media (max-width: 700px) {
    font-size: 0.875rem;
    padding: 10px 11px;
  }
`

export const IconWrapper = styled.div`
  position: relative;
  width: 496px;
  @media (max-width: 1561px) {
    width: 35%;
  }
  @media (max-width: 500px) {
    width: 100%;
    margin-top: 80px;
    padding: 0px 40px;
  }
`

export const HeaderWrapper = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 500px) {
    padding: 0 10px;
    height: 80px;
  }
`

export const MenuButtonsWrapper = styled.div`
  display: flex;
  gap: 30px;
  margin-left: 50px;
  margin-top: 5px;
  @media (max-width: 1130px) {
    display: none;
  }
`

export const MenuButton = styled.div`
  font-size: 18px;
  cursor: pointer;
  color: #1b1f3e;
  transition: 0.2s;
  margin-bottom: 3px;
  :hover {
    color: #7181ff;
  }
`

export const LeftHeader = styled.div`
  display: flex;
  align-items: center;
`

export const JoinUsButton = styled.div`
  background-color: ${colors.uguBrightPurple};
  color: white;
  border-radius: 10px;
  width: 120px;
  height: 60px;
  font-size: 18px;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
  transition: 0.2s;
  :hover {
    background-color: ${colors.uguBrightBlue};
  }
  @media (max-width: 1130px) {
    display: none;
  }
`

export const FeaturesButtons = styled.div`
  width: 100%;
  max-width: max-content;
  margin: 50px auto;
  margin-top: 120px;
  padding: 10px;
  display: flex;
  overflow-x: auto;
  gap: 50px;
  padding-bottom: 50px;
  scroll-margin-inline-start: -200px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 1561px) {
    margin-top: 70px;
  }
  @media (max-width: 1030px) {
    padding: 1.2vw 2vw;
    gap: 30px;
  }
  @media (max-width: 700px) {
    padding: 0.5vw 1.6vw;
    gap: 20px;
  }
`

export const FeatureButton = styled.div`
  border-radius: 22px;
  font-size: 30px;
  /* background: ${colors.uguPurple}; */
  background: linear-gradient(98.21deg, #7181ff 1.27%, #ffc000 97.89%),
    linear-gradient(0deg, #ffffff, #ffffff);
  padding: 1px;
  width: max-content;
  cursor: pointer;
  box-shadow: 0px 15px 60px 0px #0000000d;
  @media (max-width: 1561px) {
    font-size: 2vw;
    border-radius: 17px;
  }
  @media (max-width: 700px) {
    font-size: 14px;
  }
`

export const FeatureButtonInner = styled.div`
  background-color: white;
  border-radius: 21px;
  padding: 25px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  width: 355px;
  height: 100%;
  @media (max-width: 1561px) {
    width: max-content;
    padding: 1.7vw 3vw;
    border-radius: 15px;
  }
  @media (max-width: 1030px) {
    padding: 1.2vw 30px;
    gap: 1rem;
  }
  @media (max-width: 700px) {
    padding: 0.5vw 25px;
  }
`

export const OurPartnersWrapper = styled.div`
  margin: 100px auto;
  width: 100%;
  max-width: 1467px;
`

export const OurPartnersHeader = styled.div`
  font-size: 50px;
  font-family: 'Sofia Pro';
  font-weight: 500;
  text-align: center;
  @media (max-width: 1200px) {
    font-size: 4.25vw;
  }
  @media (max-width: 700px) {
    font-size: 30px;
  }
`

export const PartnersList = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`

export const PartnerImageWrapper = styled.div`
  height: 55px;
  align-items: center;
  display: flex;
  filter: brightness(0) invert(0.7);
  cursor: pointer;
  transition: 0.2s;
  margin: 30px 25px 20px 25px;
  @media (max-width: 850px) {
    margin: 20px 16px 0px 16px;
  }
  :hover {
    filter: brightness(1) invert(0);
  }
`

export const EdugramForWrapper = styled.div`
  margin-top: 200px;
  @media (max-width: 1143px) {
    padding: 0 20px;
  }
  @media (max-width: 415px) {
    padding: 0 5px;
  }
`

export const EdugramForHeader = styled.div`
  font-size: 90px;
  font-family: 'Sofia Pro';
  font-weight: 500;
  text-align: center;
  @media (max-width: 1561px) {
    font-size: 5vw;
  }
  @media (max-width: 600px) {
    font-size: 30px;
  }
`

export const EdugramForText = styled.div`
  font-size: 22px;
  width: 100%;
  max-width: 1000px;
  text-align: center;
  margin: 10px auto;
  @media (max-width: 1561px) {
    font-size: 1.4vw;
  }
  @media (max-width: 1143px) {
    font-size: 16px;
  }
`

export const EdugramForButtonsWrapper = styled.div`
  display: flex;
  gap: 35px;
  margin: auto;
  width: max-content;
  margin-top: 30px;
  @media (max-width: 941px) {
    gap: 20px;
  }
  @media (max-width: 415px) {
    gap: 10px;
  }
`

export const EdugramForButtonCreator = styled.div`
  background-color: #1a1e3d;
  padding: 17px 60px;
  aspect-ratio: 3;
  color: white;
  font-size: 26px;
  border-radius: 19px;
  @media (max-width: 1561px) {
    font-size: 1.7vw;
    padding: 1.08vw 3.84vw;
    border-radius: 13px;
  }
  @media (max-width: 941px) {
    font-size: 16px;
    padding: 0 0;
    width: 108px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  @media (max-width: 360px) {
    font-size: 13px;
    width: 90px;
  }
`

export const EdugramForButton = styled.div`
  border: 1px solid #1a1e3d;
  padding: 17px 60px;
  aspect-ratio: 3;
  font-size: 26px;
  border-radius: 19px;
  @media (max-width: 1561px) {
    font-size: 1.7vw;
    padding: 1.08vw 3.84vw;
    border-radius: 13px;
  }
  @media (max-width: 941px) {
    font-size: 16px;
    padding: 0 0;
    width: 108px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  @media (max-width: 360px) {
    font-size: 13px;
    width: 90px;
  }
`

export const BenefitsForCreatorsWrapper = styled.div`
  background-color: rgba(238, 238, 255, 0.4);
  width: 100%;
  display: flex;
  min-height: 10px;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: 100px 20px;
  margin-top: 70px;
  mix-blend-mode: multiply;
  align-items: center;
  z-index: 2;
  @media (max-width: 1100px) {
    padding-top: 20px;
  }
`

export const BenefitsForCreatorsHeader = styled.div`
  font-size: 70px;
  font-family: 'Sofia Pro';
  font-weight: 500;
  @media (max-width: 1561px) {
    font-size: 4.5vw;
  }
  @media (max-width: 700px) {
    font-size: 30px;
  }
  @media (max-width: 375px) {
    padding: 3px !important;
  }
`

export const BenefitsForCreatorsSubHeader = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
  @media (max-width: 1561px) {
    font-size: 1.3vw;
  }
  @media (max-width: 1233px) {
    font-size: 16px;
  }
`

export const BenefitWrapper = styled.div`
  background-color: white;
  border-radius: 20px;
  width: 100%;
  max-width: 1440px;
  height: 100% !important;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  box-shadow: 0px 15px 60px 0px #7181ff08;
  padding: 74px 50px;
  @media (max-width: 1561px) {
    padding: 5vw 3.5vw;
  }
  @media (max-width: 1000px) {
    padding: 50px 30px;
  }
  @media (max-width: 755px) {
    flex-direction: column;
    padding: 20px 20px;
  }
`

export const BenefitIndex = styled.div`
  border-radius: 50%;
  background-color: #f8f8ff;
  font-family: 'Sofia Pro';
  font-weight: bold;
  font-size: 1.875rem;
  text-align: center;
  min-width: 69px;
  max-height: 69px;
  aspect-ratio: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #1a1e3d;
  margin-right: 30px;
  margin-top: -8px;
  @media (max-width: 1561px) {
    font-size: 1.8vw;
    min-width: 5vw;
    min-height: 5vw;
    max-height: 5vw;
  }
  @media (max-width: 1000px) {
    font-size: 18px;
    min-width: 50px;
    max-width: 50px;
    min-height: 50px;
  }
  @media (max-width: 755px) {
    margin-bottom: 20px;
    margin-top: 0;
  }
`

export const BenefitTextWrapper = styled.div``

export const BenefitTextHeader = styled.div`
  font-family: 'Sofia Pro';
  font-weight: bold;
  font-size: 36px;
  color: #1a1e3d;
  margin-bottom: 20px;
  @media (max-width: 1561px) {
    font-size: 2.3vw;
  }
  @media (max-width: 1000px) {
    font-size: 23px;
  }
`

export const BenefitsIconBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  margin-left: 100px;
  @media (max-width: 755px) {
    display: none;
  }
`

export const BenefitsIconWrapper = styled.div`
  width: 225px;
  height: 225px;
  border-radius: 21px;
  display: flex;
  padding: 20%;
  align-items: center;
  justify-content: center;
  background-color: #f8f8ff;
  @media (max-width: 1561px) {
    width: 14.5vw;
    height: 14.5vw;
  }
  @media (max-width: 1000px) {
    width: 146px;
    height: 146px;
  }
`

export const ImageWrapper = styled.div`
  display: flex;
`

export const ProgressBG = styled.div`
  width: 225px;
  height: 8px;
  border-radius: 8px;
  background-color: #f8f8ff;
  margin: 20px 0;
  margin-bottom: 10px;
  @media (max-width: 1561px) {
    width: 14.5vw;
  }
  @media (max-width: 1000px) {
    width: 146px;
  }
`

export const ProgressFill = styled.div`
  width: 80%;
  height: 8px;
  border-radius: 8px;
  background-color: #7382fc;
`

export const HamburgerWrapper = styled.div`
  display: none;
  @media (max-width: 1130px) {
    display: block;
    width: 35px;
    height: 35px;
    margin-right: 10px;
  }
  @media (max-width: 800px) {
    width: 4.2vw;
    height: 4.2vw;
  }
  @media (max-width: 600px) {
    width: 28px;
    height: 28px;
    margin-right: 0px;
  }
`

export const JoinUsButtonBenefits = styled.div`
  background-color: ${colors.uguBrightPurple};
  color: white;
  border-radius: 10px;
  padding: 17px 25px;
  width: max-content;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  transition: 0.2s;
  :hover {
    background-color: ${colors.uguBrightBlue};
  }
  min-height: 40px;
  display: flex;
  align-items: center;
  @media (max-width: 1561px) {
    font-size: 1.2vw;
    padding: 1vw 25px;
  }
  @media (max-width: 1000px) {
    font-size: 12px;
  }
`

export const ContactiWithSpecialist = styled.div`
  background-color: ${colors.uguBrightPurple};
  color: white;
  border-radius: 10px;
  padding: 17px 25px;
  width: max-content;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  transition: 0.2s;
  :hover {
    box-shadow: 0px 15px 60px 0px rgba(0, 0, 0, 0.1);
    background-color: ${colors.uguBrightBlue};
  }
  min-height: 40px;
  display: flex;
  align-items: center;
  @media (max-width: 1561px) {
    font-size: 1.2vw;
    padding: 1vw 25px;
  }
  @media (max-width: 1000px) {
    font-size: 12px;
  }
  @media (max-width: 500px) {
    font-size: 17px;
    padding: 15px 30px;
    margin-top: 10px;
  }
`

export const HasAlreadyJoint = styled.div`
  font-size: 18px;
  color: '#545666';
  @media (max-width: 1561px) {
    font-size: 1.1vw;
  }
  @media (max-width: 1000px) {
    font-size: 12px;
  }
`

export const BenefitIndexText = styled.div`
  @media (max-width: 755px) {
    flex-direction: column;
    width: 100%;
  }
`

export const IndexIconWrapper = styled.div`
  @media (max-width: 755px) {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
`

export const SmallIconWrapper = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  padding: 0.5rem;
  background-color: #f8f8ff;
  display: none;
  @media (max-width: 755px) {
    display: flex;
  }
`

export const OurGoalGlobalWrapper = styled.div`
  width: 100%;
  padding: 0 20px;
  @media (max-width: 755px) {
    padding: 0;
  }
`

export const StillHaveQuestionsGlobalWrapper = styled.div`
  width: 100%;
  padding: 0 20px;
  @media (max-width: 755px) {
    padding: 20px;
  }
  @media (max-width: 425px) {
    padding: 8px;
  }
`

export const OurGoalWrapper = styled.div`
  background-color: #1a1e3d;
  margin: 70px auto;
  border-radius: 21px;
  padding: 30px;
  width: 100%;
  max-width: 1467px;
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  @media (max-width: 755px) {
    border-radius: 0px;
  }
`
export const GoalCardsWrapper = styled.div`
  width: 100%;
  max-width: 1467px;
  position: relative;
  height: 760px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* padding-top: 3rem; */
  @media (max-width: 1024px) {
    height: 646px;
  }
  @media (max-width: 755px) {
    border-radius: 0px;
    height: 456px;
  }
`

export const StillHaveQuestionsWrapper = styled.div`
  background-color: #1a1e3d;
  margin: 70px auto;
  border-radius: 21px;
  padding: 50px;
  width: 100%;
  max-width: 1467px;
  position: relative;
  height: 820px;
  display: flex;
  margin-top: 0px;
  flex-direction: column;
  justify-content: space-around;
  padding-top: 70px;
  @media (max-width: 425px) {
    padding: 40px 10px;
  }
`

export const OurGoal = styled.div`
  color: white;
  font-size: 70px;
  font-family: 'Sofia Pro';
  font-weight: 500;
  left: 50%;
  width: 100%;
  text-align: center;
  text-align: center;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  margin-top: 20px;
  @media (max-width: 1024px) {
    font-size: 50px;
  }
  @media (max-width: 755px) {
    font-size: 30px;
  }
`

export const BenefitsBlocks = styled.div`
  width: 100%;
  max-width: 1467px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px auto;
  padding: 0 20px;
  @media (max-width: 375px) {
    padding: 0 10px;
  }
`

export const BenefitBlock = styled.div`
  padding: 35px;
  font-family: 'Sofia Pro';
  font-weight: bold;
  font-size: 36px;
  border: 1px solid #c9c9df;
  border-radius: 20px;
  aspect-ratio: 1;
  width: 320px;
  height: 320px;
  transition: box-shadow 0.2s ease-in-out;
  :hover {
    border: none;
    /* box-shadow: rgba(113, 129, 255, 0.2) 0px 7px 29px 0px; */
    box-shadow: rgba(113, 129, 255, 0.2) 0px 48px 100px 0px;
  }
  @media (max-width: 1561px) {
    font-size: 2.3vw;
    padding: 2.3vw;
    width: 20vw;
    height: 20vw;
  }
  @media (max-width: 800px) {
    width: 160px;
    height: 161px;
    font-size: 18px;
    padding: 18px;
  }
  @media (max-width: 375px) {
    width: 145px;
    height: 161px;
    font-size: 15px;
  }
`

export const BenefitBlocksWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin-bottom: 70px;
  margin-top: 30px;
  justify-content: center;
  @media (max-width: 1561px) {
    gap: 3.5vw;
    margin-bottom: 40px;
  }
  @media (max-width: 375px) {
    gap: 8px;
  }
`

export const HowItWorksWrapper = styled.div`
  width: 100%;
  max-width: 1517px;
  margin: auto;
  padding: 30px 50px;
  @media (max-width: 730px) {
    padding: 20px 5%;
  }
`

export const HowItWorksLineOne = styled.div`
  display: flex;
  @media (max-width: 730px) {
    flex-direction: column;
    align-items: center;
  }
`

export const CurveOne = styled.div`
  border: 2px dashed #7282fd;
  height: auto;
  width: 4%;
  border-bottom-left-radius: 40px;
  border-right-color: white;
  border-top-color: white;
  @media (max-width: 730px) {
    display: none;
  }
`

export const HowItWorksTextWrapper = styled.div`
  width: 41%;
  padding-left: 10px;
  padding-bottom: 40px;
  border-bottom: 2px dashed #7282fd;
  @media (max-width: 730px) {
    border: 0;
    width: 100%;
    padding: 0;
    border-left: 2px dashed #7282fd;
    padding-left: 20px !important;
  }
`

export const HowItWorksHeader = styled.div`
  font-size: 50px;
  font-family: 'Sofia Pro';
  font-weight: bold;
  margin-bottom: 10px;
  @media (max-width: 1330px) {
    font-size: 3.7vw;
  }
  @media (max-width: 730px) {
    font-size: 20px;
  }
`

export const HowItWorksText = styled.div`
  font-size: 20px;
  @media (max-width: 1330px) {
    font-size: 1.5vw;
  }
  @media (max-width: 730px) {
    font-size: 14px;
  }
`

export const StepNumber = styled.div`
  background-color: white;
  color: #7282fd;
  font-size: 50px;
  width: 55px;
  height: 70px;
  margin-left: -25px;
  @media (max-width: 1330px) {
    font-size: 3.7vw;
    height: 5.2vw;
    width: 3.8vw;
    margin-left: -1.9vw;
  }
`

export const RightImageWrapper = styled.div`
  width: 45%;
  text-align: right;
  margin-left: 10%;
  padding-right: 100px;
  padding-bottom: 10px;
  position: relative;
  @media (max-width: 1561px) {
    padding-right: 5vw;
  }
  @media (max-width: 730px) {
    margin: 4px !important;
    padding: 0 !important;
    display: flex;
    align-items: center;
    width: 100%;
    padding-top: 70px !important;
    padding-bottom: 20px !important;
    border-left: 2px dashed #7282fd;
  }
`

export const LeftImageWrapper = styled.div`
  border-bottom: 2px dashed #7282fd;
  width: 41%;
  text-align: left;
  padding-left: 6%;
  margin-left: 4%;
  padding-bottom: 100px;
  padding-top: 100px;
  padding-right: 20px;
  position: relative;
  display: flex;
  align-items: center;
  @media (max-width: 1561px) {
    padding-left: 5vw;
    padding-bottom: 7.4vw;
    padding-top: 7.4vw;
  }
  @media (max-width: 730px) {
    border: 0;
    margin: 4px !important;
    padding: 0 !important;
    padding-top: 70px !important;
    padding-bottom: 20px !important;
    width: 100%;
    border-left: 2px dashed #7282fd;
  }
`

export const CurveTwo = styled.div`
  border: 2px dashed #7282fd;
  height: auto;
  width: 4%;
  border-bottom-right-radius: 40px;
  border-top-right-radius: 40px;
  border-left-color: white;
  margin-top: -2px;
  margin-left: 2px;
  padding-top: 12%;
  @media (max-width: 730px) {
    display: none;
  }
`

export const HowItWOrksLineTwo = styled.div`
  display: flex;
  align-items: center;
`

export const TextTwoWrapper = styled.div`
  width: 45%;
  height: 100%;
  padding-top: 12%;
  padding-left: 60px;
  @media (max-width: 730px) {
    width: 100%;
    padding: 0 !important;
    border-left: 2px dashed #7282fd;
    padding-left: 20px !important;
  }
`

export const CurveThree = styled.div`
  border: 2px dashed #7282fd;
  height: auto;
  width: 4%;
  border-bottom-left-radius: 40px;
  border-top-left-radius: 40px;
  border-right-color: white;
  margin-top: -2px;
  margin-left: 0px;
  margin-right: 2px;
  padding-top: 12%;
  @media (max-width: 730px) {
    display: none;
    border: 0;
  }
`

export const JoinEdugramWrapper = styled.div`
  background-color: #f8f8ff;
  width: 100%;
  padding: 20px;
  margin-top: -20px;
  padding-bottom: 0;
  @media (max-width: 730px) {
    margin-top: 30px;
  }
`

export const JoinEdugramInnerWrappery = styled.div`
  width: 100%;
  max-width: 1467px;
  display: flex;
  margin: auto;
  align-items: center;
  overflow: hidden;
`

export const FooterWrapper = styled.div`
  width: 100%;
  max-width: 1500px;
  display: flex;
  justify-content: space-between;
  margin: auto;
  margin-top: 103px;
  padding: 30px;
  border-bottom: 1px solid #ccc;
  @media (max-width: 1024px) {
    flex-direction: column;
    margin-top: 30px;
  }
`

export const FooterHeading = styled.div`
  font-size: 30px;
  font-family: 'Sofia Pro';
  font-weight: bold;
  color: #2d3353;
  margin-bottom: 10px;
  @media (max-width: 1561px) {
    font-size: 1.9vw;
  }
  @media (max-width: 1020px) {
    font-size: 20px;
  }
`

export const FooterInfoBlock = styled.div`
  width: max-content;
  margin-top: 20px;
  margin-bottom: 30px;
`

export const FooterText = styled.div`
  font-size: 20px;
  color: #54586c;
  margin-top: 15px;
  @media (max-width: 1561px) {
    font-size: 1.2vw;
  }
  @media (max-width: 1290px) {
    font-size: 16px;
  }
`

export const FooterInfoWrapper = styled.div`
  display: flex;
  gap: 7%;
  flex: 1;
  justify-content: flex-end;
  margin-left: 60px;
  flex-wrap: wrap;
  margin-right: 0;
  @media (max-width: 1024px) {
    margin: 0;
    justify-content: space-between;
    margin-top: 30px;
  }
`

export const MenuWrapper = styled.div`
  width: 100vw;
  background-color: white;
  position: absolute;
  left: 0;
  padding: 0 30px;
  top: 100px;
  transition: 0.3s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  z-index: 100;
  box-shadow: 0px 45px 60px 0px rgba(0, 0, 0, 0.08);
  @media (max-width: 500px) {
    top: 70px;
  }
  @media (min-width: 1131px) {
    display: none;
  }
`

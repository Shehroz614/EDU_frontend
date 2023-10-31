import React from 'react'
import { AIIcon } from '@public/static/icons/landingPageIcons/ai-icon'
import { CollaborativeCreationIcon } from '@public/static/icons/landingPageIcons/collaborative-creation-icon'
import { FreeAudioTranslationIcon } from '@public/static/icons/landingPageIcons/free-audio-translation-icon'
import { OnlineCourseIcon } from '@public/static/icons/landingPageIcons/online-course-icon'
import { QuizBenefitIcon } from '@public/static/icons/landingPageIcons/quiz-benefit-icon'
import { SmartPricingIcon } from '@public/static/icons/landingPageIcons/smart-pricing'
import { TiersBenefitIcon } from '@public/static/icons/landingPageIcons/tiers-benefit-icon'
import { SubscriptionsIcon } from '@public/static/icons/landingPageIcons/subscriptions-icon'
import { TimedReleasedIcon } from '@public/static/icons/landingPageIcons/timed-release-icon'
import { VersionsBenefitIcon } from '@public/static/icons/landingPageIcons/version-benefit-icon'
import { TaxFilesBenefitIcon } from '@public/static/icons/landingPageIcons/tax-files-benefit-icon'
import { StudentConnectBenefitIcon } from '@public/static/icons/landingPageIcons/student-connect-benefit-icon'
import { DeepInsightsBenefitIcon } from '@public/static/icons/landingPageIcons/deep-insights-benefit-icon'
import { EduAlertBenefitIcon } from '@public/static/icons/landingPageIcons/edu-alert-benefit-icon'
import { GrowFollowersIcon } from '@public/static/icons/landingPageIcons/grow-followers-icon'
import { CouponBenefitIcon } from '@public/static/icons/landingPageIcons/coupon-benefit-icon'
import { EffortlessPaymentIcon } from '@public/static/icons/landingPageIcons/effortless-payment-icon'
import { PriceControllIcon } from '@public/static/icons/landingPageIcons/price-controll-icon'
import { ContentDonationsIcon } from '@public/static/icons/landingPageIcons/content-donations-icon'
import { BundledCoursesIcon } from '@public/static/icons/landingPageIcons/bundledCoursesIcon'
import { LiveCourseIcon } from '@public/static/icons/landingPageIcons/live-course-icon'
import { EduMentorIcon } from '@public/static/icons/landingPageIcons/edu-mentor-icon'
import { EduBlogsIcon } from '@public/static/icons/landingPageIcons/edu-blogs-icon'
import { InviteAndEarnIcon } from '@public/static/icons/landingPageIcons/invite-and-earn-icon'
import { DigitalStoreIcon } from '@public/static/icons/landingPageIcons/digital-store-icon'
import { LearnAnywhereIcon } from '@public/static/icons/landingPageIcons/learn-anywhere-icon'
import { UniversalSubtitlesIcon } from '@public/static/icons/landingPageIcons/universal-subtitles-icon'
import { CourseAnalyticsIcon } from '@public/static/icons/landingPageIcons/course-analytics-icon'
import { AuthorDashboardIcon } from '@public/static/icons/landingPageIcons/author-dashboard-icon'
import { Edugram500Icon } from '@public/static/icons/landingPageIcons/edugram-500-icon'
import { CourseDropIcon } from '@public/static/icons/landingPageIcons/course-drop-icon'
import { ShieldIcon } from '@public/static/icons/landingPageIcons/shield-icon'
import { CustomFeatureIcon } from '@public/static/icons/landingPageIcons/custom-feature-icon'
import { TransparentRevenueIcon } from '@public/static/icons/landingPageIcons/transparent-revenue-icon'
import { ToolkitGoalIcon } from '@public/static/icons/landingPageIcons/toolkit-goal-icon'
import { IgniteReachIcon } from '@public/static/icons/landingPageIcons/ignite-reach-icon'
import { SkyRocketEarningsIcon } from '@public/static/icons/landingPageIcons/sky-rocket-icon'

type MainAuthorBenefits = {
  titleKey: string
  descriptionKey: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}

type EdugramGoal = MainAuthorBenefits

type AuthorBenefit = {
  titleKey: string
  descriptionKey: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  soon: boolean
}

export const authorBenefits: AuthorBenefit[] = [
  {
    titleKey: 'authorBenefits.courses',
    descriptionKey: 'authorBenefits.coursesDescription',
    icon: OnlineCourseIcon,
    soon: false,
  },
  {
    titleKey: 'authorBenefits.smartPricing',
    descriptionKey: 'authorBenefits.smartPricingDescription',
    icon: SmartPricingIcon,
    soon: false,
  },
  {
    titleKey: 'authorBenefits.aiBoost',
    descriptionKey: 'authorBenefits.aiBoostDescription',
    icon: AIIcon,
    soon: false,
  },
  {
    titleKey: 'authorBenefits.easyCreation',
    descriptionKey: 'authorBenefits.easyCreationDescription',
    icon: QuizBenefitIcon,
    soon: false,
  },
  {
    titleKey: 'authorBenefits.audioTranslations',
    descriptionKey: 'authorBenefits.audioTranslationsDescription',
    icon: FreeAudioTranslationIcon,
    soon: true,
  },
  {
    titleKey: 'authorBenefits.courseVersions',
    descriptionKey: 'authorBenefits.courseVersionsDescription',
    icon: VersionsBenefitIcon,
    soon: false,
  },
  {
    titleKey: 'authorBenefits.collaborativeCreation',
    descriptionKey: 'authorBenefits.collaborativeCreationDescription',
    icon: CollaborativeCreationIcon,
    soon: true,
  },
  {
    titleKey: 'authorBenefits.timedRelease',
    descriptionKey: 'authorBenefits.timedReleaseDescription',
    icon: TimedReleasedIcon,
    soon: false,
  },
  {
    titleKey: 'authorBenefits.subscriptions',
    descriptionKey: 'authorBenefits.subscriptionsDescription',
    icon: SubscriptionsIcon,
    soon: true,
  },
  {
    titleKey: 'authorBenefits.subscriptionTiers',
    descriptionKey: 'authorBenefits.subscriptionTiersDescription',
    icon: TiersBenefitIcon,
    soon: true,
  },
  {
    titleKey: 'authorBenefits.contentDonations',
    descriptionKey: 'authorBenefits.contentDonationsDescription',
    icon: ContentDonationsIcon,
    soon: true,
  },
  {
    titleKey: 'authorBenefits.bundledCourses',
    descriptionKey: 'authorBenefits.bundledCoursesDescription',
    icon: BundledCoursesIcon,
    soon: false,
  },

  {
    titleKey: 'authorBenefits.eduBlogs',
    descriptionKey: 'authorBenefits.eduBlogsDescription',
    icon: EduBlogsIcon,
    soon: false,
  },
  {
    titleKey: 'authorBenefits.courseTiers',
    descriptionKey: 'authorBenefits.courseTiersDescription',
    icon: TiersBenefitIcon,
    soon: false,
  },
  {
    titleKey: 'authorBenefits.authorDashboard',
    descriptionKey: 'authorBenefits.authorDashboardDescription',
    icon: AuthorDashboardIcon,
    soon: false,
  },
  {
    titleKey: 'authorBenefits.courseAnalytics',
    descriptionKey: 'authorBenefits.courseAnalyticsDescription',
    icon: CourseAnalyticsIcon,
    soon: false,
  },
  {
    titleKey: 'authorBenefits.taxFiles',
    descriptionKey: 'authorBenefits.taxFilesDescription',
    icon: TaxFilesBenefitIcon,
    soon: false,
  },
  {
    titleKey: 'authorBenefits.studentConnect',
    descriptionKey: 'authorBenefits.studentConnectDescription',
    icon: StudentConnectBenefitIcon,
    soon: false,
  },
  {
    titleKey: 'authorBenefits.deepInsights',
    descriptionKey: 'authorBenefits.deepInsightsDescription',
    icon: DeepInsightsBenefitIcon,
    soon: false,
  },
  {
    titleKey: 'authorBenefits.growFollowers',
    descriptionKey: 'authorBenefits.growFollowersDescription',
    icon: GrowFollowersIcon,
    soon: false,
  },
  {
    titleKey: 'authorBenefits.eduAlerts',
    descriptionKey: 'authorBenefits.eduAlertsDescription',
    icon: EduAlertBenefitIcon,
    soon: false,
  },
  {
    titleKey: 'authorBenefits.couponsAndDeals',
    descriptionKey: 'authorBenefits.couponsAndDealsDescription',
    icon: CouponBenefitIcon,
    soon: false,
  },
  {
    titleKey: 'authorBenefits.effortlessPayments',
    descriptionKey: 'authorBenefits.effortlessPaymentsDescription',
    icon: EffortlessPaymentIcon,
    soon: false,
  },
  {
    titleKey: 'authorBenefits.universalSubtitles',
    descriptionKey: 'authorBenefits.universalSubtitlesDescription',
    icon: UniversalSubtitlesIcon,
    soon: true,
  },

  {
    titleKey: 'authorBenefits.priceControl',
    descriptionKey: 'authorBenefits.priceControlDescription',
    icon: PriceControllIcon,
    soon: false,
  },
  {
    titleKey: 'authorBenefits.liveStreams',
    descriptionKey: 'authorBenefits.liveStreamsDescription',
    icon: LiveCourseIcon,
    soon: true,
  },
  {
    titleKey: 'authorBenefits.eduMentor',
    descriptionKey: 'authorBenefits.eduMentorDescription',
    icon: EduMentorIcon,
    soon: true,
  },
  {
    titleKey: 'authorBenefits.digitalShop',
    descriptionKey: 'authorBenefits.digitalShopDescription',
    icon: DigitalStoreIcon,
    soon: true,
  },
  {
    titleKey: 'authorBenefits.inviteAndEarn',
    descriptionKey: 'authorBenefits.inviteAndEarnDescription',
    icon: InviteAndEarnIcon,
    soon: true,
  },
  {
    titleKey: 'authorBenefits.quizzes',
    descriptionKey: 'authorBenefits.quizzesDescription',
    icon: QuizBenefitIcon,
    soon: true,
  },
  {
    titleKey: 'authorBenefits.learnAnywhere',
    descriptionKey: 'authorBenefits.learnAnywhereDescription',
    icon: LearnAnywhereIcon,
    soon: false,
  },
]

export const mainAuthorBenefits: MainAuthorBenefits[] = [
  {
    titleKey: 'mainAuthorBenefits.edugram500',
    descriptionKey: 'mainAuthorBenefits.edugram500Description',
    icon: Edugram500Icon,
  },
  {
    titleKey: 'mainAuthorBenefits.easyCourseCreation',
    descriptionKey: 'mainAuthorBenefits.easyCourseCreationDescription',
    icon: OnlineCourseIcon,
  },
  {
    titleKey: 'mainAuthorBenefits.createInOneDrop',
    descriptionKey: 'mainAuthorBenefits.createInOneDropDescription',
    icon: CourseDropIcon,
  },
  {
    titleKey: 'mainAuthorBenefits.eduAI',
    descriptionKey: 'mainAuthorBenefits.eduAIDescription',
    icon: AIIcon,
  },
  {
    titleKey: 'mainAuthorBenefits.freeAudioTranslation',
    descriptionKey: 'mainAuthorBenefits.freeAudioTranslationDescription',
    icon: FreeAudioTranslationIcon,
  },
  {
    titleKey: 'mainAuthorBenefits.robustContentSecurity',
    descriptionKey: 'mainAuthorBenefits.robustContentSecurityDescription',
    icon: ShieldIcon,
  },
  {
    titleKey: 'mainAuthorBenefits.customFeatureDevelopment',
    descriptionKey: 'mainAuthorBenefits.customFeatureDevelopmentDescription',
    icon: CustomFeatureIcon,
  },
  {
    titleKey: 'mainAuthorBenefits.transaprentRevenue',
    descriptionKey: 'mainAuthorBenefits.transaprentRevenueDescription',
    icon: TransparentRevenueIcon,
  },
]

export const edugramGoals: EdugramGoal[] = [
  {
    titleKey: 'edugramGoals.authorsToolkit',
    descriptionKey: 'edugramGoals.authorsToolkitDescription',
    icon: ToolkitGoalIcon,
  },
  {
    titleKey: 'edugramGoals.marketingAi',
    descriptionKey: 'edugramGoals.marketingAiDescription',
    icon: IgniteReachIcon,
  },
  {
    titleKey: 'edugramGoals.earningsSolutions',
    descriptionKey: 'edugramGoals.earningsSolutionsDescription',
    icon: SkyRocketEarningsIcon,
  },
]

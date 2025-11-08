import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)

export const useDisplay = () => {
  const xsAndDown = breakpoints.smallerOrEqual('xs')
  const smAndDown = breakpoints.smallerOrEqual('sm')
  const mdAndDown = breakpoints.smallerOrEqual('md')
  const lgAndUp = breakpoints.greaterOrEqual('lg')
  const mdAndUp = breakpoints.greaterOrEqual('md')
  const xlAndUp = breakpoints.greaterOrEqual('xl')

  return {
    xs: xsAndDown,
    smAndDown,
    mdAndDown,
    mdAndUp,
    lgAndUp,
    xlAndUp,
  }
}

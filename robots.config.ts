import { NodeIncomingMessage } from 'h3'

export default [
  { UserAgent: '*' },
  // { Allow: '/' },
  { BlankLine: true },
  { Comment: 'Comment here' },

  // Be aware that this will NOT work on target: 'static' mode
  {
    Sitemap: (req: NodeIncomingMessage) =>
      `https://${req.headers.host}/sitemap.xml`,
  },
]

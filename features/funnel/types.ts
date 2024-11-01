
type FunnelBlock=  {
  id: string
  type: "text" | "image" | "list" | "button"
  text?: string
  color?: string
  align?: string
  src?: string
  alt?: string
  items?: Array<{
    id: string
    title: string
    description: string
    src: string
  }>
  bgColor?: string
}

type FunnelPage = {
  id: string
  blocks: FunnelBlock[]
}

type  Funnel = {
  name: string
  bgColor: string
  pages: FunnelPage[]
}
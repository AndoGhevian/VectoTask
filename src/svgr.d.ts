declare module '*.svg' {
  import { FC, SVGProps } from 'react'
  const content: FC<SVGProps<SVGElement> & { title?: string }>
  export default content
}

declare module '*.svg?url' {
  const content: any
  export default content
}

import { lzma } from '@napi-rs/lzma'

import Argon2 from './argon2'
import Bcrypt from './bcrypt'
import Xxhash from './xxhash'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { JsonWebToken } from './jwt'

const pkgList = [
  {
    name: '@node-rs/argon2',
    component: Argon2,
  },
  {
    name: '@node-rs/bcrypt',
    component: Bcrypt,
  },
  {
    name: '@node-rs/xxhash',
    component: Xxhash,
  },
  {
    name: '@node-rs/jsonwebtoken',
    component: JsonWebToken,
  },
]

console.log(lzma.compressSync('Hello, world!'))

export default function Component() {
  return (
    <div className="tw-mx-auto tw-max-w-2xl">
      <header className="tw-text-center tw-py-8">
        <h1 className="tw-text-4xl tw-font-bold">
          @node-rs packages playground
        </h1>
        <p className="tw-mt-2 tw-text-lg">
          Demo the <code>@node-rs/argon2</code>, <code>@node-rs/bcrypt</code>,
          <code>@node-rs/jieba</code> and <code>@node-rs/xxhash</code> packages
        </p>
      </header>
      {/* fixme: using two .map() calls due to the way this component behaves */}
      <Tabs defaultValue={pkgList[0].name}>
        <TabsList>
          {pkgList.map((item) => (
            <TabsTrigger
              value={item.name}
              key={item.name}
              disabled={!item.component}
            >
              {item.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {pkgList.map((item) => (
          <TabsContent value={item.name} key={`${item.name}-component`}>
            {item.component != null && <item.component />}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

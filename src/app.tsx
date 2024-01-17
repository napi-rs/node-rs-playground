import { useState } from 'react'

import Argon2 from './argon2'
import Bcrypt from './bcrypt'
import Xxhash from './xxhash'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from './components/ui/navigation-menu'

enum Package {
  Argon2 = '@node-rs/argon2',
  Bcrypt = '@node-rs/bcrypt',
  Jieba = '@node-rs/jieba',
  Xxhash = '@node-rs/xxhash',
}

export default function Component() {
  const [pkg, setPackage] = useState<Package>(Package.Argon2)
  let SubComponent = Argon2
  switch (pkg) {
    case Package.Argon2:
      SubComponent = Argon2
      break
    case Package.Bcrypt:
      SubComponent = Bcrypt
      break
    case Package.Xxhash:
      SubComponent = Xxhash
      break
  }
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
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} tw-cursor-pointer`}
              onSelect={() => {
                setPackage(Package.Argon2)
              }}
              active={pkg === Package.Argon2}
            >
              <code>@node-rs/argon2</code>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} tw-cursor-pointer`}
              onSelect={() => {
                setPackage(Package.Bcrypt)
              }}
              active={pkg === Package.Bcrypt}
            >
              <code>@node-rs/bcrypt</code>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem
            className="tw-cursor-not-allowed"
            value={Package.Jieba}
          >
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()}`}
              active={pkg === Package.Jieba}
            >
              <code>@node-rs/jieba</code>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem value={Package.Xxhash}>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} tw-cursor-pointer`}
              onSelect={() => {
                setPackage(Package.Xxhash)
              }}
              active={pkg === Package.Xxhash}
            >
              <code>@node-rs/xxhash</code>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="tw-container tw-h-10"></div>
      <SubComponent />
    </div>
  )
}

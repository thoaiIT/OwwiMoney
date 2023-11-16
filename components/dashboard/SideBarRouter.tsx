import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import React, { forwardRef } from 'react';

interface ListItemProps extends React.ComponentProps<'a'> {
  className?: string;
  title: string;
  children: React.ReactNode;
}

const SideBarRouter = () => {
  const pathname = usePathname();

  const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
    ({ className, children, title, ...props }, forwardedRef) => (
      <li>
        <NavigationMenu.Link asChild>
          <a
            className={clsx(
              'focus:shadow-[0_0_0_2px] focus:shadow-violet7 hover:bg-mauve3 block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors',
              className,
            )}
            {...props}
            ref={forwardedRef as React.Ref<HTMLAnchorElement>}
          >
            <div className="text-violet12 mb-[5px] font-medium leading-[1.2]">{title}</div>
            <p className="text-mauve11 leading-[1.4]">{children}</p>
          </a>
        </NavigationMenu.Link>
      </li>
    ),
  );

  return (
    <NavigationMenu.Root className="relative z-[1] flex w-screen justify-center">
      <NavigationMenu.List className="center shadow-blackA4 m-0 flex list-none rounded-[6px] bg-white p-1 shadow-[0_2px_10px]">
        <NavigationMenu.Item>
          <NavigationMenu.Content className="absolute top-0 left-0 w-full sm:w-auto">
            <ul className="m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[600px] sm:grid-flow-col sm:grid-rows-3">
              <ListItem
                title="Introduction"
                href="/primitives/docs/overview/introduction"
              >
                Build high-quality, accessible design systems and web apps.
              </ListItem>
              <ListItem
                title="Getting started"
                href="/primitives/docs/overview/getting-started"
              >
                A quick tutorial to get you up and running with Radix Primitives.
              </ListItem>
              <ListItem
                title="Styling"
                href="/primitives/docs/guides/styling"
              >
                Unstyled and compatible with any styling solution.
              </ListItem>
              <ListItem
                title="Animation"
                href="/primitives/docs/guides/animation"
              >
                Use CSS keyframes or any animation library of your choice.
              </ListItem>
              <ListItem
                title="Accessibility"
                href="/primitives/docs/overview/accessibility"
              >
                Tested in a range of browsers and assistive technologies.
              </ListItem>
              <ListItem
                title="Releases"
                href="/primitives/docs/overview/releases"
              >
                Radix Primitives releases and their changelogs.
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default SideBarRouter;

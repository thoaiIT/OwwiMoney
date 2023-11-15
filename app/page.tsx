import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CommonCard } from '../components/card';
import ThemeSwitch from '../ui/components/theme-switch';
import CommonCombobox from '../components/combobox';

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
  {
    value: 'js',
    label: 'Javascript',
  },
  {
    value: 'html',
    label: 'HTML',
  },
  {
    value: 'css',
    label: 'CSS',
  },
];
export default function Home() {
  return (
    <div className="ml-6">
      Home
      <ThemeSwitch />
      <CommonCard className="w-96">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
          <CommonCombobox
            optionsProp={frameworks}
            widthSelection={400}
            maxVisibleItems={5}
            placeholder={'Select framework...'}
          />
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </CommonCard>
    </div>
  );
}

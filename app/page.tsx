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
            options={frameworks}
            widthSelection={500}
            maxVisibleItems={4}
          />
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </CommonCard>
    </div>
  );
}

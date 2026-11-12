import { getPoll } from '@/lib/content';
import PollClient from './PollClient';

export default function Home() {
  const { title, intro, options } = getPoll();
  return <PollClient title={title} intro={intro} options={options} />;
}

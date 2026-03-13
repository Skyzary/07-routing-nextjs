import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getNotes } from '../../../../lib/api';
import NotesFilterClient from './NotesFilter.client';

export default async function FilteredNotesPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const activeTag = slug?.[0]; // Змінив tag на slug
  const queryClient = new QueryClient();

  // Використовуємо activeTag, отриманий з slug
  const tagForApi = activeTag && activeTag !== 'all' ? activeTag : undefined;

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, tagForApi],
    queryFn: () => getNotes(undefined, 1, tagForApi),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesFilterClient tag={activeTag} />
    </HydrationBoundary>
  );
}

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getNotes } from '../../../../lib/api';
import NotesClient from './Notes.client'; // Змінив імпорт на Notes.client

export default async function FilteredNotesPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const activeTag = slug?.[0];
  const queryClient = new QueryClient();

  // Використовуємо activeTag, отриманий з slug
  const tagForApi = activeTag && activeTag !== 'all' ? activeTag : undefined;

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, tagForApi],
    queryFn: () => getNotes(undefined, 1, tagForApi),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={activeTag} />
    </HydrationBoundary>
  );
}

import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: '1e8nVuRaxA3XlRKBHmIZGMHLIj5uWZt4gxq9gVrtTQg', 
});

export async function fetchUnsplashPhotos(query = 'AI', perPage = 10) {
  try {
    const result = await unsplash.search.getPhotos({
      query,
      perPage,
    });

    if (result.errors) {
      console.error('Unsplash API Error:', result.errors);
      return [];
    }

    const { results } = result.response;

    return results.map((photo) => ({
      id: photo.id,
      title: photo.description || 'No Title',
      text: photo.alt_description || 'No Description',
      image_source: photo.urls?.regular || '',
    }));
  } catch (error) {
    console.error('Fetch Unsplash Error:', error);
    return [];
  }
}

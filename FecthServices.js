import {
  availableLanguages,
  s3,
  getMovieSubtitle,
} from './services/useGetAvailableTracks';
const makeRequest = async () => {
  let token =
    'eyJraWQiOiJrY3JZSllTZVM0VkFlcUpqXC9jVXdrV2dtTVF0TlI4N3Fxbk1DRVpVNHJOOD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxYWQ3NDNmMC00YTM2LTQ0NGItOGI2MC02NGEzOGEyOWRjODAiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiIsInVzLWVhc3QtMV9obXZacVBJdU5fYnJhaW5BenVyZUFkIl0sInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4gb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE1OTM1NTgyMDYsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX2htdlpxUEl1TiIsImV4cCI6MTU5NDA1NDk4OSwiaWF0IjoxNTk0MDUxMzg5LCJ2ZXJzaW9uIjoyLCJqdGkiOiIxNTQ5OWQzNy0zMjM4LTQzZDItODZhMy02N2Q0NDdkZmM2MDUiLCJjbGllbnRfaWQiOiI1azdmMGQ0NnUyaWExbjh2N281YzZqNXRvMSIsInVzZXJuYW1lIjoiYnJhaW5BenVyZUFkX2JyYWludGVzdEBncnVwb2JpbWJvLmNvbSJ9.mqdQGVa0-fGW_IK2ga4zKM8vbR2topSzlIxnBzLQ-6mOq2pCVwf5Pl-CZmpoo7__g1Dh8OYJ68xRkEfVYtjT2-YrWv9tCkYv7HVyqf-jfJJwJnwXMfu6hpbLCMrbrdzOwOMnkggexOWuXRw0yCiRSSFabizzNiD0J3WGqJW1MNwdoe1hw0X5Oz4Upa1hz8LLfE4qx9mS6tTU0RJYN8vLrQ-mCfCrBomuZqeJ6VlrYmHqiywBk8XTarfk5g4l2aatnj09Zc4j7GrqWd_vIPhp1I9_7rES9X_Y15u4cRdwQeiWJ-1z83_24Bgt3ddY7HHxWXBSBABfU0Hc5A9CTLOL7Q';
  let request = await fetch(
    'https://staging.admin.brain-gbuniversity.com/api/videos',
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  let resp = await request.json();
  let videos = resp['hydra:member'].map(
    (video) => video.mediaVideo.publicUrls.reference,
  );
  let providerReference = resp['hydra:member'][0].mediaVideo.providerReference;
  let track = await s3(getMovieSubtitle(providerReference, 'es'), {
    level: 'private',
    expires: 60 * 60 * 24,
  });
  console.log('======================================================');
  console.log(track);
  console.log('=============================================');
  return videos;
};

export {makeRequest};

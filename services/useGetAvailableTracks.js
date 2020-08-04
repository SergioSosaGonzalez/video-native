import {Storage} from 'aws-amplify';
const getObjectId = (providerReference) => {
  const parts = providerReference.split('.');
  const [objectId] = parts;

  return objectId;
};

const availableLanguages = ['en', 'es', 'pt', 'fr', 'zh', 'tr'];
const s3 = async (request, configurations = {level: 'private'}) => {
  return Storage.get(request, configurations);
};
const getMovieSubtitle = (providerReference, language) => {
  const objectId = getObjectId(providerReference);

  return `media/${objectId}/results/transcript-${language}.srt`;
};
export {s3, availableLanguages, getMovieSubtitle};

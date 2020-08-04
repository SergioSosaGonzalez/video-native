import {AWSS3Provider} from '@aws-amplify/storage';

/**
 * We override `AWSS3Provider` provider to avoid get a non-existent path for our project.
 */
export class MyStorageProvider extends AWSS3Provider {
  _prefix(opt) {
    if ('private' === opt.level) {
      return 'private/us-east-1:1e759287-b368-4e95-a80e-82399b83cbf4/';
    }

    return super._prefix(opt);
  }
}

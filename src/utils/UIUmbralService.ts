import UmbralService from '@decloudlabs/stk-v2/lib/services/umbralService';

export default class UIUmbralService extends UmbralService {
    convertToUmbralCapsule(capsuleBytes: number[]) {
        console.log('capsuleBytes: ', capsuleBytes);
        return super.convertToUmbralCapsule(capsuleBytes);
    }
}

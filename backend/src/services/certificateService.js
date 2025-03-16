import { getUserPoints } from '../models/userModel.js';
import { createCertificate } from '../models/certificateModel.js';

const checkAndGenerateCertificate = async (userId) => {
  const points = await getUserPoints(userId);
  const milestones = [20, 50, 100];
  for (const milestone of milestones) {
    if (points >= milestone) {
      await createCertificate(userId, milestone);
    }
  }
};

export { checkAndGenerateCertificate };